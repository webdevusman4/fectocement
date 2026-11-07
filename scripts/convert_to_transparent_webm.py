import cv2
import numpy as np
import subprocess
import imageio_ffmpeg
import os
import sys
import time

def main():
    input_path = 'public/Untitled design.mp4'
    output_webm = 'public/Untitled design.webm'
    output_webm_safe = 'public/untitled-design.webm'

    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found")
        sys.exit(1)

    cap = cv2.VideoCapture(input_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    print(f"Source video: {w}x{h} @ {fps:.1f} fps, {total_frames} frames")

    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

    # Kernel for slight morphological cleanup & edge defringing
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))

    cmd = [
        ffmpeg_exe, '-y',
        '-f', 'rawvideo', '-vcodec', 'rawvideo',
        '-s', f'{w}x{h}', '-pix_fmt', 'bgra', '-r', str(fps),
        '-i', '-',
        '-c:v', 'libvpx-vp9',
        '-pix_fmt', 'yuva420p',
        '-b:v', '0',
        '-crf', '24',
        '-quality', 'good',
        '-speed', '2',
        '-tile-columns', '2',
        '-frame-parallel', '1',
        '-threads', '4',
        '-g', '30',
        output_webm
    ]

    print("Starting VP9 alpha encoder pipe...")
    t0 = time.time()
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stderr=subprocess.PIPE)

    frame_idx = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        b, g, r = frame[:, :, 0], frame[:, :, 1], frame[:, :, 2]
        cand_white = (b > 230) & (g > 230) & (r > 230)

        cand_bg = cand_white.astype(np.uint8) * 255
        num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(cand_bg, connectivity=4)

        border_labels = set()
        border_labels.update(labels[0, :])
        border_labels.update(labels[-1, :])
        border_labels.update(labels[:, 0])
        border_labels.update(labels[:, -1])
        border_labels.discard(0)

        is_bg = np.isin(labels, list(border_labels))
        fg_mask = np.where(is_bg, 0, 255).astype(np.uint8)

        # 1-pixel erosion on foreground to pull edge inwards away from white boundary
        fg_eroded = cv2.erode(fg_mask, kernel, iterations=1)

        # Slight Gaussian blur for anti-aliasing
        alpha = cv2.GaussianBlur(fg_eroded, (3, 3), 0.8)

        # Unmultiply defringing to remove any faint white halo
        a_norm = (alpha.astype(float) / 255.0)[:, :, None]
        rgb = frame.astype(float)
        a_safe = np.maximum(a_norm, 0.08)
        clean_rgb = np.clip((rgb - 255.0 * (1.0 - a_norm)) / a_safe, 0, 255).astype(np.uint8)

        rgba = cv2.cvtColor(clean_rgb, cv2.COLOR_BGR2BGRA)
        rgba[:, :, 3] = alpha

        try:
            proc.stdin.write(rgba.tobytes())
        except (BrokenPipeError, OSError):
            break

        frame_idx += 1
        if frame_idx % 50 == 0 or frame_idx == total_frames:
            elapsed = time.time() - t0
            fps_proc = frame_idx / elapsed if elapsed > 0 else 0
            print(f"Processed frame {frame_idx}/{total_frames} ({fps_proc:.1f} fps)")

    proc.stdin.close()
    stdout, stderr = proc.communicate()
    cap.release()

    t1 = time.time()
    print(f"Conversion complete in {t1 - t0:.2f}s! Exit code: {proc.returncode}")

    if proc.returncode != 0:
        print("FFmpeg error:", stderr.decode('utf-8', errors='ignore')[-500:])
        sys.exit(proc.returncode)

    if os.path.exists(output_webm):
        size_mb = os.path.getsize(output_webm) / (1024 * 1024)
        print(f"Generated {output_webm} ({size_mb:.2f} MB)")
        # Mirror to URL-safe filename
        import shutil
        shutil.copy2(output_webm, output_webm_safe)
        print(f"Mirrored to {output_webm_safe}")

if __name__ == '__main__':
    main()


'use client';
/**
 * PlantDepth — 2.5D depth layer for PlantAnatomy.
 *
 * Draws the aerial photo with WebGL and shifts every pixel by its depth (from depth.png),
 * so near hillside, the plant and far mountains move at different speeds.
 * It does NOT replace your camera: it reads your existing x / y / cameraScale MotionValues.
 *
 *  usePlantDepth(...)      → the 3D "brain": hover, breathe, parallax offsets. Gives you camX/camY/camScale
 *                            to put on the canvas div (so markers follow the hover too).
 *  <PlantDepthCanvas/>     → the WebGL picture. Put it in the STAGE div, *outside* the transformed canvas div.
 *  useDepthShift(...)      → per-marker offset so a marker stays glued to its building while depth moves.
 *
 * If your project imports from "motion/react" instead of "framer-motion", change the import below.
 */
import { useEffect, useMemo, useRef, type CSSProperties, type MutableRefObject } from 'react';
import { motionValue, useAnimationFrame, useTransform, type MotionValue } from 'framer-motion';

/* ----------------------------- tuning ----------------------------- */
export const DEPTH_3D = {
  swayPx: 26,        // idle drift of the nearest pixels at rest (screen px)
  pointerPx: 30,     // extra drift from mouse / phone tilt
  flightGain: 0.05,  // how strongly camera speed separates depth layers during a flight
  flightMaxPx: 70,   // cap on that separation (screen px)
  dollyGain: 0.14,   // near things grow faster than far ones while zooming
  hoverPx: 8,        // the whole view floats like a hovering drone (screen px)
  breathe: 0.007,    // slow zoom in/out at rest (0.7%)
  pivotBehind: 0.18, // pivot sits behind the selected part so it moves too (0 = selected part locked still)
};

/* ----------------------------- springs ----------------------------- */
type Spring = { k: number; c: number; m: number; v: number; vel: number; target: number };
const spring = (k: number, c: number, m: number, v = 0): Spring => ({ k, c, m, v, vel: 0, target: v });
function stepSpring(s: Spring, dt: number) {
  const a = (-s.k * (s.v - s.target) - s.c * s.vel) / s.m;
  s.vel += a * dt;
  s.v += s.vel * dt;
}

export type PlantDepth = {
  /** put these on the canvas div instead of x / y / cameraScale */
  camX: MotionValue<number>;
  camY: MotionValue<number>;
  camScale: MotionValue<number>;
  /** internal: read by PlantDepthCanvas and useDepthShift */
  offX: MotionValue<number>;
  offY: MotionValue<number>;
  dolly: MotionValue<number>;
  focus: MotionValue<number>;
  size: MutableRefObject<{ canvasW: number; canvasH: number }>;
  draw: MutableRefObject<(() => void) | null>;
};

type Options = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  /** your cameraScale (scaleMV × pullSpring) */
  scale: MotionValue<number>;
  canvasW: number;
  canvasH: number;
  /** depth of the active node (PlantNode.depth) */
  focusDepth: number;
  /** false for reduced motion, or to turn the 3D off */
  enabled?: boolean;
};

export function usePlantDepth({ x, y, scale, canvasW, canvasH, focusDepth, enabled = true }: Options): PlantDepth {
  const mv = useMemo(
    () => ({
      hoverX: motionValue(0),
      hoverY: motionValue(0),
      breathe: motionValue(1),
      offX: motionValue(0),
      offY: motionValue(0),
      dolly: motionValue(0),
      focus: motionValue(Math.max(0, focusDepth - DEPTH_3D.pivotBehind)),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const size = useRef({ canvasW, canvasH });
  size.current = { canvasW, canvasH };
  const draw = useRef<(() => void) | null>(null);

  const springs = useRef({
    offX: spring(40, 13, 1),
    offY: spring(40, 13, 1),
    dolly: spring(40, 13, 1),
    focus: spring(22, 14, 2, Math.max(0, focusDepth - DEPTH_3D.pivotBehind)),
  });
  useEffect(() => {
    springs.current.focus.target = Math.max(0, focusDepth - (enabled ? DEPTH_3D.pivotBehind : 0));
  }, [focusDepth, enabled]);

  // mouse / phone tilt
  const ptr = useRef({ x: 0, y: 0, at: -1e9 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      ptr.current = { x: (e.clientX / innerWidth) * 2 - 1, y: (e.clientY / innerHeight) * 2 - 1, at: performance.now() };
    };
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      ptr.current = {
        x: Math.max(-1, Math.min(1, e.gamma / 25)),
        y: Math.max(-1, Math.min(1, (e.beta - 45) / 25)),
        at: performance.now(),
      };
    };
    addEventListener('pointermove', onMove, { passive: true });
    addEventListener('deviceorientation', onTilt);
    return () => {
      removeEventListener('pointermove', onMove);
      removeEventListener('deviceorientation', onTilt);
    };
  }, []);

  useAnimationFrame((time, delta) => {
    const dt = Math.min(0.05, delta / 1000);
    const t = time / 1000;
    const s = springs.current;

    let ox = 0, oy = 0, dl = 0;
    if (enabled) {
      ox += DEPTH_3D.swayPx * Math.sin(t * 0.35);
      oy += DEPTH_3D.swayPx * 0.45 * Math.sin(t * 0.23 + 1.3);
      const fade = Math.max(0, 1 - (performance.now() - ptr.current.at) / 4000);
      ox += -ptr.current.x * DEPTH_3D.pointerPx * fade;
      oy += -ptr.current.y * DEPTH_3D.pointerPx * 0.6 * fade;
      let fx = x.getVelocity() * DEPTH_3D.flightGain;
      let fy = y.getVelocity() * DEPTH_3D.flightGain;
      const fm = Math.hypot(fx, fy);
      if (fm > DEPTH_3D.flightMaxPx) { fx *= DEPTH_3D.flightMaxPx / fm; fy *= DEPTH_3D.flightMaxPx / fm; }
      ox += fx; oy += fy;
      dl = Math.max(-0.06, Math.min(0.06, (scale.getVelocity() / Math.max(scale.get(), 0.5)) * DEPTH_3D.dollyGain));
    }
    s.offX.target = ox; s.offY.target = oy; s.dolly.target = dl;
    for (const k of ['offX', 'offY', 'dolly'] as const) stepSpring(s[k], dt);
    for (let i = 0; i < 4; i++) stepSpring(s.focus, dt / 4);

    mv.offX.set(s.offX.v);
    mv.offY.set(s.offY.v);
    mv.dolly.set(s.dolly.v);
    mv.focus.set(s.focus.v);
    mv.hoverX.set(enabled ? DEPTH_3D.hoverPx * Math.sin(t * 0.27) : 0);
    mv.hoverY.set(enabled ? DEPTH_3D.hoverPx * 0.55 * Math.sin(t * 0.19 + 0.7) : 0);
    mv.breathe.set(enabled ? 1 + DEPTH_3D.breathe * Math.sin(t * 0.16) : 1);

    draw.current?.();
  });

  const camX = useTransform([x, mv.hoverX], ([a, b]: number[]) => a + b);
  const camY = useTransform([y, mv.hoverY], ([a, b]: number[]) => a + b);
  const camScale = useTransform([scale, mv.breathe], ([a, b]: number[]) => a * b);

  return { camX, camY, camScale, offX: mv.offX, offY: mv.offY, dolly: mv.dolly, focus: mv.focus, size, draw };
}

/**
 * Offset (canvas-local px) that keeps a marker on its building while the depth moves.
 * Use on the marker element that sits inside the scaled canvas div: style={{ x: shift.x, y: shift.y }}
 */
export function useDepthShift(depth: PlantDepth, panX: number, panY: number, nodeDepth: number) {
  const calc = (axis: 'x' | 'y') =>
    ([off, dl, f, s, cam]: number[]) => {
      const { canvasW, canvasH } = depth.size.current;
      const L = axis === 'x' ? canvasW : canvasH;
      const pan = axis === 'x' ? panX : panY;
      const d = nodeDepth - f;
      const u = (pan / 100 - 0.5) * L;     // marker, canvas-local px from centre
      const c = -cam / s;                   // screen centre, canvas-local px
      return (off * d) / s + (u - c) * dl * d;
    };
  const x = useTransform([depth.offX, depth.dolly, depth.focus, depth.camScale, depth.camX], calc('x'));
  const y = useTransform([depth.offY, depth.dolly, depth.focus, depth.camScale, depth.camY], calc('y'));
  return { x, y };
}

/* ----------------------------- WebGL layer ----------------------------- */
const VS = `#version 300 es
in vec2 aPos; uniform vec2 uView; out vec2 vPos;
void main(){ vPos = vec2(aPos.x, -aPos.y) * 0.5 * uView; gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FS = `#version 300 es
precision highp float;
uniform sampler2D uImg, uDepth;
uniform vec2 uCanvas, uT, uOff, uCenter;
uniform float uS, uDolly, uFocus;
in vec2 vPos; out vec4 outColor;
void main(){
  vec2 uv = (vPos - uT) / uS / uCanvas + 0.5;            // same mapping as the CSS transform
  vec2 q = uv;
  for (int i = 0; i < 6; i++) {                           // content at q is drawn at q + disp(q)
    float d = texture(uDepth, q).r - uFocus;
    q = uv - (uOff * d + (q - uCenter) * uDolly * d);
  }
  // Feather the outer 2.5% of the photo into the section navy. Normal framings keep that band off-screen
  // (the camera clamp holds the edge >= 2.5% outside); stages with a PlantNode.view edge reveal show it.
  vec2 e = smoothstep(vec2(0.0), vec2(0.025), q) * smoothstep(vec2(0.0), vec2(0.025), 1.0 - q);
  vec3 col = texture(uImg, clamp(q, vec2(0.0005), vec2(0.9995))).rgb;
  outColor = vec4(mix(vec3(0.043, 0.071, 0.271), col, e.x * e.y), 1.0);
}`;

type CanvasProps = {
  depth: PlantDepth;
  /** big image for desktops (e.g. 6000px webp) */
  src: string;
  /** ≤4096px image for phones / small GPUs */
  srcSmall: string;
  /** grayscale depth map, white = near */
  depthSrc: string;
  className?: string;
  style?: CSSProperties;
  /** true when the 3D picture is showing; false → show your normal <Image> instead */
  onStatus?: (ok: boolean) => void;
};

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`failed to load ${src}`));
    img.src = src;
  });
}

export function PlantDepthCanvas({ depth, src, srcSmall, depthSrc, className, style, onStatus }: CanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const statusRef = useRef(onStatus);
  statusRef.current = onStatus;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let disposed = false;
    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'high-performance' });
    if (!gl) { statusRef.current?.(false); return; }

    const compile = (type: number, source: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, source);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) || 'shader error');
      return sh;
    };
    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) || 'link error');
    } catch (e) {
      console.warn('[PlantDepth] 3D disabled:', e);
      statusRef.current?.(false);
      return;
    }
    gl.useProgram(prog);
    const U = Object.fromEntries(
      ['uView', 'uImg', 'uDepth', 'uCanvas', 'uT', 'uS', 'uOff', 'uCenter', 'uDolly', 'uFocus'].map((n) => [n, gl.getUniformLocation(prog, n)]),
    ) as Record<string, WebGLUniformLocation | null>;
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const textures: WebGLTexture[] = [];
    const makeTex = (unit: number, img: HTMLImageElement, mip: boolean) => {
      gl.activeTexture(gl.TEXTURE0 + unit);
      const t = gl.createTexture()!;
      textures.push(t);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      if (mip) {
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        const aniso = gl.getExtension('EXT_texture_filter_anisotropic');
        if (aniso) gl.texParameterf(gl.TEXTURE_2D, aniso.TEXTURE_MAX_ANISOTROPY_EXT, 4);
      } else gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      return t;
    };

    // size + visibility
    let cssW = canvas.clientWidth, cssH = canvas.clientHeight, visible = true;
    const ro = new ResizeObserver(() => { cssW = canvas.clientWidth; cssH = canvas.clientHeight; });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);

    let ready = false;
    const draw = () => {
      if (!ready || !visible || document.hidden || !cssW || !cssH) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(cssW * dpr), h = Math.round(cssH * dpr);
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl.viewport(0, 0, w, h);

      const { canvasW, canvasH } = depth.size.current;
      const S = depth.camScale.get(), TX = depth.camX.get(), TY = depth.camY.get();
      gl.uniform2f(U.uView, cssW, cssH);
      gl.uniform2f(U.uCanvas, canvasW, canvasH);
      gl.uniform2f(U.uT, TX, TY);
      gl.uniform1f(U.uS, S);
      gl.uniform2f(U.uOff, depth.offX.get() / (S * canvasW), depth.offY.get() / (S * canvasH));
      gl.uniform2f(U.uCenter, -TX / S / canvasW + 0.5, -TY / S / canvasH + 0.5);
      gl.uniform1f(U.uDolly, depth.dolly.get());
      gl.uniform1f(U.uFocus, depth.focus.get());
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    depth.draw.current = draw;

    const maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
    const useBig = maxTex >= 6000 && canvas.clientWidth >= 760;
    Promise.all([loadImage(useBig ? src : srcSmall), loadImage(depthSrc)])
      .then(([img, dep]) => {
        if (disposed) return;
        makeTex(0, img, true);
        makeTex(1, dep, false);
        gl.uniform1i(U.uImg, 0);
        gl.uniform1i(U.uDepth, 1);
        ready = true;
        draw();
        statusRef.current?.(true);
      })
      .catch((e) => {
        console.warn('[PlantDepth] 3D disabled:', e);
        if (!disposed) statusRef.current?.(false);
      });

    return () => {
      disposed = true;
      if (depth.draw.current === draw) depth.draw.current = null;
      ro.disconnect();
      io.disconnect();
      // free GPU memory but keep the context: React Strict Mode re-runs this effect on the same canvas
      textures.forEach((t) => gl.deleteTexture(t));
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, srcSmall, depthSrc]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', ...style }}
    />
  );
}

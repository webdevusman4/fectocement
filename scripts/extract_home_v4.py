#!/usr/bin/env python3
"""Create an isolated source snapshot of the current V3 homepage.

The snapshot is intentionally code-complete: it copies the homepage routes,
the components resolved by the current tsconfig path aliases, hooks, motion
tokens, global CSS, build config, and the complete public asset tree.

Run from the repository root:
    python3 scripts/extract_home_v4.py
"""
from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "versions" / "home-v4"
SOURCE = OUT / "source"

HOME_ROUTES = [
    "app/home-1/page.tsx",
    "app/home-2/page.tsx",
    "app/home1/page.tsx",
    "app/home2/page.tsx",
    "app/sample-home/page.tsx",
    "app/sample-v3/page.tsx",
]

CONFIG_FILES = [
    "package.json",
    "package-lock.json",
    "next.config.mjs",
    "postcss.config.js",
    "tailwind.config.js",
    "tsconfig.json",
    "README.md",
]


def rewrite_component_aliases(text: str) -> str:
    text = re.sub(r"@/components/([A-Za-z0-9_]+)", r"./\1", text)
    text = re.sub(r"@/hooks/([A-Za-z0-9_]+)", r"../hooks/\1", text)
    text = re.sub(r"@/lib/([A-Za-z0-9_]+)", r"../lib/\1", text)
    return text


def rewrite_page_aliases(text: str, prefix: str) -> str:
    return re.sub(r"@/components/([A-Za-z0-9_]+)", rf"{prefix}/components/\1", text)


def write_text(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text)


def copy_text(src: Path, dst: Path, transform=lambda s: s) -> None:
    write_text(dst, transform(src.read_text()))


def main() -> None:
    if OUT.exists():
        shutil.rmtree(OUT)
    SOURCE.mkdir(parents=True)

    copied: list[str] = []

    # Main homepage and root layout / global CSS.
    copy_text(ROOT / "app/page.tsx", SOURCE / "page.tsx", lambda s: rewrite_page_aliases(s, "."))
    copy_text(
        ROOT / "app/layout.tsx",
        SOURCE / "layout.tsx",
        lambda s: s.replace("@/components/SmoothScroll", "./components/SmoothScroll"),
    )
    copy_text(ROOT / "app/globals.css", SOURCE / "globals.css")
    copied += [
        "app/page.tsx -> source/page.tsx",
        "app/layout.tsx -> source/layout.tsx",
        "app/globals.css -> source/globals.css",
    ]

    # Existing homepage variant route wrappers, kept for reference.
    for rel in HOME_ROUTES:
        name = rel.removeprefix("app/")
        copy_text(
            ROOT / rel,
            SOURCE / "routes" / name,
            lambda s: rewrite_page_aliases(s, "../.."),
        )
        copied.append(f"{rel} -> source/routes/{name}")

    # tsconfig resolves @/* to ./src/* first; these are the components actually
    # rendered by the current homepage. Relative imports inside them remain valid.
    for src in sorted((ROOT / "src/components").glob("*.tsx")):
        copy_text(src, SOURCE / "components" / src.name, rewrite_component_aliases)
        copied.append(f"src/components/{src.name} -> source/components/{src.name}")

    for src in sorted((ROOT / "src/hooks").glob("*.ts")):
        copy_text(src, SOURCE / "hooks" / src.name)
        copied.append(f"src/hooks/{src.name} -> source/hooks/{src.name}")

    for src in sorted((ROOT / "src/lib").glob("*.ts")):
        copy_text(src, SOURCE / "lib" / src.name)
        copied.append(f"src/lib/{src.name} -> source/lib/{src.name}")

    for rel in CONFIG_FILES:
        dst_name = "README.original.md" if rel == "README.md" else Path(rel).name
        copy_text(ROOT / rel, OUT / "config" / dst_name)
        copied.append(f"{rel} -> config/{dst_name}")

    copy_text(ROOT / "docs/motion-rules.md", OUT / "docs/motion-rules.md")
    copied.append("docs/motion-rules.md -> docs/motion-rules.md")

    # Complete public tree, including video assets and nested image folders.
    shutil.copytree(ROOT / "public", OUT / "public", dirs_exist_ok=True)
    public_files = sorted(p for p in (OUT / "public").rglob("*") if p.is_file())
    for p in public_files:
        copied.append(f"public/{p.relative_to(OUT / 'public').as_posix()} -> public/{p.relative_to(OUT / 'public').as_posix()}")

    # Local asset manifest: helps spot missing optional/background assets.
    asset_ext = r"\.(?:jpg|jpeg|png|svg|webp|mp4|webm|gif|avif|pdf|ico)"
    asset_refs: set[str] = set()
    for p in list((SOURCE / "components").glob("*.tsx")) + [
        SOURCE / "page.tsx",
        SOURCE / "layout.tsx",
    ]:
        for match in re.finditer(r"[\"'`]([^\"'`]*" + asset_ext + r")[\"'`]", p.read_text(), re.I):
            ref = match.group(1)
            if ref.startswith("/"):
                asset_refs.add(ref)
    assets = [
        {
            "url": ref,
            "existsInCopiedPublic": (OUT / "public" / ref.lstrip("/")).exists(),
        }
        for ref in sorted(asset_refs)
    ]

    manifest = {
        "name": "home-v4 baseline",
        "sourceCommit": "086fd68909eccb44cbc9094ada726eea555b4e01",
        "sourceRoute": "/",
        "liveRoute": "/home-v4",
        "sourceOfTruth": "src/components/* (tsconfig resolves @/* to ./src/* before ./*)",
        "copiedFileCount": len(copied),
        "publicFileCount": len(public_files),
        "publicBytes": sum(p.stat().st_size for p in public_files),
        "assets": assets,
        "files": copied,
    }
    write_text(OUT / "manifest.json", json.dumps(manifest, indent=2) + "\n")
    print(f"Created {OUT.relative_to(ROOT)} with {len(copied)} copied files")
    print(f"Public assets: {len(public_files)} files, {manifest['publicBytes']:,} bytes")


if __name__ == "__main__":
    main()

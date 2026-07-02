#!/usr/bin/env python3
"""
Logo path generator — official All Import isotype -> logo-paths.ts

Pipeline (unchanged architecture):
  1. asset -> color masks -> potrace     (potrace ONLY produces paths)
  2. normalize to logo frame             (O center origin, outer R = 1.5, y-up)
  3. MANUAL semantic assignment          (EXPECT table, developer-declared)
  4. emit TypeScript

Robustness layer (this revision): exact-tolerance matching replaced by
IoU confidence scoring per contour, one-to-one, deterministic:

  confidence >= 95%   -> auto-assign
  90% <= conf < 95%   -> assign with explicit WARNING log
  confidence < 90%    -> SystemExit (no silent guessing)

Leftover contours or unmatched pieces still abort. Semantics stay 100%
developer-controlled via EXPECT; the scoring only absorbs minor asset
drift (re-exports, recompression), never reinterprets the logo.

Deps: pip install pillow numpy potracer
Run:  python3 scripts/generate-logo-paths.py   (from web/)
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image
import potrace

ROOT = Path(__file__).resolve().parent.parent
ASSET = ROOT / "public" / "brand" / "isotype.jpg"
OUT = ROOT / "src" / "components" / "intro" / "logo-paths.ts"

# ---------------------------------------------------------------------------
# MANUAL SEMANTIC TABLE — the developer-declared truth.
# Expected pixel bboxes (x0, y0, x1, y1) in the 2000x2000 asset, taken from
# the contour inventory. Confidence is IoU against these boxes.
# ---------------------------------------------------------------------------
EXPECT = {
    "bolt_tip":    (636, 418, 1303, 1143),
    "bolt_tail":   (518, 1192, 779, 1679),
    "bolt_sliver": (832, 1103, 955, 1217),
    "halo":        (832, 962, 1243, 1425),
    "bracket_tl":  (310, 586, 489, 752),
    "bracket_tr":  (1435, 586, 1597, 752),
    "bracket_bl":  (310, 1477, 472, 1628),
    "bracket_br":  (1431, 1475, 1595, 1628),
}
AUTO_T = 0.95   # >= : auto-assign
WARN_T = 0.90   # >= : assign + warning; below: abort


def iou(a, b):
    """Intersection-over-union of two (x0, y0, x1, y1) boxes."""
    ix0, iy0 = max(a[0], b[0]), max(a[1], b[1])
    ix1, iy1 = min(a[2], b[2]), min(a[3], b[3])
    iw, ih = max(0.0, ix1 - ix0), max(0.0, iy1 - iy0)
    inter = iw * ih
    area_a = (a[2] - a[0]) * (a[3] - a[1])
    area_b = (b[2] - b[0]) * (b[3] - b[1])
    union = area_a + area_b - inter
    return inter / union if union > 0 else 0.0


def main():
    img = Image.open(ASSET).convert("RGB")
    a = np.asarray(img).astype(int)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    H, W = r.shape

    white = (r > 180) & (g > 180) & (b > 180)
    cyan = (b > 140) & (g > 140) & (r < 130)

    ys, xs = np.nonzero(white)
    cx = (xs.min() + xs.max()) / 2
    cy = (ys.min() + ys.max()) / 2
    outer_r_px = (xs.max() - xs.min()) / 2
    S = 1.5 / outer_r_px

    def nx(x):
        return round((x - cx) * S, 4)

    def ny(y):
        return round((cy - y) * S, 4)

    def curve_bbox(c):
        pts = [(c.start_point.x, c.start_point.y)] + [
            (s.end_point.x, s.end_point.y) for s in c.segments
        ]
        pxs = [p[0] for p in pts]
        pys = [p[1] for p in pts]
        return min(pxs), min(pys), max(pxs), max(pys)

    def is_frame(c):
        x0, y0, x1, y1 = curve_bbox(c)
        return (x1 - x0) > W * 0.95 and (y1 - y0) > H * 0.95

    def trace(mask):
        p = potrace.Bitmap(mask).trace(turdsize=30, alphamax=1.0, opttolerance=0.2)
        return [c for c in p.curves if not is_frame(c)]

    def curve_to_d(c):
        sp = c.start_point
        d = [f"M {nx(sp.x)} {ny(sp.y)}"]
        for seg in c.segments:
            if seg.is_corner:
                p, e = seg.c, seg.end_point
                d.append(f"L {nx(p.x)} {ny(p.y)} L {nx(e.x)} {ny(e.y)}")
            else:
                c1, c2, e = seg.c1, seg.c2, seg.end_point
                d.append(
                    f"C {nx(c1.x)} {ny(c1.y)} {nx(c2.x)} {ny(c2.y)} {nx(e.x)} {ny(e.y)}"
                )
        d.append("Z")
        return " ".join(d)

    wcurves = trace(white)
    ccurves = trace(cyan)

    print("=== CONTOUR INVENTORY ===")
    for i, c in enumerate(wcurves):
        print(f"  white[{i}] bbox={tuple(round(v) for v in curve_bbox(c))}")
    for i, c in enumerate(ccurves):
        print(f"  cyan[{i}]  bbox={tuple(round(v) for v in curve_bbox(c))}")

    # -----------------------------------------------------------------------
    # Confidence-scored one-to-one assignment. Deterministic: all (piece,
    # contour) pairs scored, then greedily locked from highest confidence
    # down (ties broken by name, then index).
    # -----------------------------------------------------------------------
    pairs = []
    for name, exp in EXPECT.items():
        for i, c in enumerate(ccurves):
            score = iou(curve_bbox(c), exp)
            if score > 0:
                pairs.append((score, name, i))
    pairs.sort(key=lambda t: (-t[0], t[1], t[2]))

    assigned, used = {}, set()
    print("=== ASSIGNMENT (confidence) ===")
    for score, name, i in pairs:
        if name in assigned or i in used:
            continue
        if score < WARN_T:
            continue  # below floor: never assign; handled as missing below
        tag = "OK  " if score >= AUTO_T else "WARN"
        if score < AUTO_T:
            print(
                f"  WARNING: {name} <- cyan[{i}] at {score * 100:.1f}% — "
                f"below auto threshold ({AUTO_T * 100:.0f}%), review the asset"
            )
        print(f"  [{tag}] {name:12s} <- cyan[{i}]  confidence {score * 100:.1f}%")
        assigned[name] = i
        used.add(i)

    missing = set(EXPECT) - set(assigned)
    if missing:
        best = {
            m: max((s for s, n, _ in pairs if n == m), default=0.0) for m in missing
        }
        detail = ", ".join(f"{m} (best {best[m] * 100:.1f}%)" for m in sorted(missing))
        raise SystemExit(f"ABORT: pieces below {WARN_T * 100:.0f}% floor: {detail}")

    leftover = set(range(len(ccurves))) - used
    if leftover:
        raise SystemExit(f"ABORT: unassigned cyan contours: {sorted(leftover)}")

    if len(wcurves) != 2:
        raise SystemExit(f"ABORT: expected 2 white contours (outer+hole), got {len(wcurves)}")

    def D(name):
        return curve_to_d(ccurves[assigned[name]])

    brackets_ts = []
    for key in ["bracket_tl", "bracket_tr", "bracket_bl", "bracket_br"]:
        c = ccurves[assigned[key]]
        x0, y0, x1, y1 = curve_bbox(c)
        brackets_ts.append(
            f"  {{ d: `{curve_to_d(c)}`, cx: {nx((x0 + x1) / 2)}, cy: {ny((y0 + y1) / 2)} }}, // {key}"
        )

    ring_d = " ".join(curve_to_d(c) for c in wcurves)
    out = f"""/**
 * Official All Import isotype — REAL vector paths, MANUAL semantics.
 *
 * GENERATED by scripts/generate-logo-paths.py — do not edit by hand.
 * potrace only produces paths; each contour is assigned one-to-one to its
 * logo piece by IoU confidence against the developer-declared EXPECT table
 * (>=95% auto, 90-95% warn, <90% abort). No automatic clustering.
 *
 * Source asset: public/brand/isotype.jpg (2000x2000).
 * Frame: O center at origin, outer O radius = 1.5 units, y-up.
 */

/** White O ring: outer contour + italic hole (winding-resolved). */
export const RING_D = `{ring_d}`;

/** Bolt, upper piece: the double tip. */
export const BOLT_TIP_D = `{D('bolt_tip')}`;

/** Bolt, lower piece: the long tail. */
export const BOLT_TAIL_D = `{D('bolt_tail')}`;

/** Bolt fragment visible inside the O hole. */
export const BOLT_SLIVER_D = `{D('bolt_sliver')}`;

/** Cyan halo rim hugging the O — part of the O's look, not the bolt. */
export const HALO_D = `{D('halo')}`;

/** Corner brackets, explicit order: TL, TR, BL, BR. */
export const BRACKETS: Array<{{ d: string; cx: number; cy: number }}> = [
{chr(10).join(brackets_ts)}
];
"""
    OUT.write_text(out)
    print(f"OK — wrote {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    sys.exit(main())

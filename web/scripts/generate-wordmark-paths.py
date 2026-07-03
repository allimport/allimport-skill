#!/usr/bin/env python3
"""
Full-logo path generator — official All Import WORDMARK -> logo-full-paths.ts

Same architecture as generate-logo-paths.py (potrace only produces paths;
semantics are developer-declared with IoU confidence: >=95% auto, 90-95%
warn, <90% abort), extended to the complete logo:

  White: every letter of "All Import" (A l l I m p o r t), each letter a
         named piece; holes (A, p, o) attached to their letter by
         containment and resolved by winding at extrude time.
  Cyan:  bolt (double tip + tail + sliver through the o), halo rim, and
         the four corner brackets.

Frame: letters bbox center at origin, TOTAL LETTER WIDTH = 7.0 units, y-up.
Also emits O_CENTER / O_HALF_H (scan beam targeting) and FRAME metrics.

Deps: pip install pillow numpy potracer
Run:  python3 scripts/generate-wordmark-paths.py   (from web/)
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image
import potrace

ROOT = Path(__file__).resolve().parent.parent
ASSET = ROOT / "public" / "brand" / "wordmark.jpg"
OUT = ROOT / "src" / "components" / "intro" / "logo-full-paths.ts"

# ---------------------------------------------------------------------------
# MANUAL SEMANTIC TABLES — declared from the contour inventory (2000x2000).
# ---------------------------------------------------------------------------
EXPECT_WHITE_OUTER = {  # letter outers, reading order
    "A":  (375, 905, 564, 1069),
    "l1": (577, 895, 655, 1069),
    "l2": (650, 895, 728, 1069),
    "I":  (793, 905, 872, 1069),
    "m":  (871, 941, 1102, 1069),
    "p":  (1106, 941, 1270, 1114),
    "o":  (1283, 941, 1426, 1070),
    "r":  (1443, 940, 1542, 1069),
    "t":  (1545, 914, 1638, 1069),
}
EXPECT_WHITE_HOLE = {  # holes, attached to their letter
    "A": (463, 950, 505, 1003),
    "p": (1174, 977, 1225, 1035),
    "o": (1328, 976, 1381, 1035),
}
EXPECT_CYAN = {
    "bolt_tip":    (1276, 819, 1450, 1009),
    "bolt_tail":   (1246, 1022, 1306, 1148),
    "bolt_sliver": (1328, 999, 1358, 1030),
    "halo":        (1326, 964, 1429, 1082),
    "bracket_tl":  (338, 829, 391, 882),
    "bracket_tr":  (1608, 829, 1662, 881),
    "bracket_bl":  (338, 1118, 390, 1169),
    "bracket_br":  (1608, 1118, 1662, 1169),
}
AUTO_T = 0.95
WARN_T = 0.90

TOTAL_LETTER_WIDTH = 7.0  # units across the letters bbox


def iou(a, b):
    ix0, iy0 = max(a[0], b[0]), max(a[1], b[1])
    ix1, iy1 = min(a[2], b[2]), min(a[3], b[3])
    inter = max(0.0, ix1 - ix0) * max(0.0, iy1 - iy0)
    ua = (a[2] - a[0]) * (a[3] - a[1])
    ub = (b[2] - b[0]) * (b[3] - b[1])
    u = ua + ub - inter
    return inter / u if u > 0 else 0.0


def assign(curves, expect, bbox_of, label):
    """Confidence-scored one-to-one assignment with the standard rules."""
    pairs = []
    for name, exp in expect.items():
        for i, c in enumerate(curves):
            s = iou(bbox_of(c), exp)
            if s > 0:
                pairs.append((s, name, i))
    pairs.sort(key=lambda t: (-t[0], t[1], t[2]))
    out, used = {}, set()
    for s, name, i in pairs:
        if name in out or i in used or s < WARN_T:
            continue
        tag = "OK  " if s >= AUTO_T else "WARN"
        if s < AUTO_T:
            print(f"  WARNING: {label}:{name} at {s*100:.1f}% — review asset")
        print(f"  [{tag}] {label}:{name:12s} <- [{i}]  {s*100:.1f}%")
        out[name] = i
        used.add(i)
    missing = set(expect) - set(out)
    if missing:
        raise SystemExit(f"ABORT: {label} unmatched below {WARN_T*100:.0f}%: {sorted(missing)}")
    return out, used


def main():
    a = np.asarray(Image.open(ASSET).convert("RGB")).astype(int)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    H, W = r.shape

    white = (r > 180) & (g > 180) & (b > 180)
    cyan = (b > 140) & (g > 140) & (r < 130)

    def curve_bbox(c):
        pts = [(c.start_point.x, c.start_point.y)] + [
            (s.end_point.x, s.end_point.y) for s in c.segments
        ]
        xs = [p[0] for p in pts]
        ys = [p[1] for p in pts]
        return min(xs), min(ys), max(xs), max(ys)

    def is_frame(c):
        x0, y0, x1, y1 = curve_bbox(c)
        return (x1 - x0) > W * 0.95 and (y1 - y0) > H * 0.95

    def trace(mask):
        p = potrace.Bitmap(mask).trace(turdsize=30, alphamax=1.0, opttolerance=0.2)
        return [c for c in p.curves if not is_frame(c)]

    wcurves = trace(white)
    ccurves = trace(cyan)

    # Normalization frame: letters bbox center = origin, width = 7 units.
    lx0 = min(curve_bbox(c)[0] for c in wcurves)
    ly0 = min(curve_bbox(c)[1] for c in wcurves)
    lx1 = max(curve_bbox(c)[2] for c in wcurves)
    ly1 = max(curve_bbox(c)[3] for c in wcurves)
    cx, cy = (lx0 + lx1) / 2, (ly0 + ly1) / 2
    S = TOTAL_LETTER_WIDTH / (lx1 - lx0)

    def nx(x):
        return round((x - cx) * S, 4)

    def ny(y):
        return round((cy - y) * S, 4)

    def curve_to_d(c):
        sp = c.start_point
        d = [f"M {nx(sp.x)} {ny(sp.y)}"]
        for seg_ in c.segments:
            if seg_.is_corner:
                p, e = seg_.c, seg_.end_point
                d.append(f"L {nx(p.x)} {ny(p.y)} L {nx(e.x)} {ny(e.y)}")
            else:
                c1, c2, e = seg_.c1, seg_.c2, seg_.end_point
                d.append(
                    f"C {nx(c1.x)} {ny(c1.y)} {nx(c2.x)} {ny(c2.y)} {nx(e.x)} {ny(e.y)}"
                )
        d.append("Z")
        return " ".join(d)

    print("=== ASSIGNMENT ===")
    w_out, w_used = assign(wcurves, EXPECT_WHITE_OUTER, curve_bbox, "white-outer")
    rest = [i for i in range(len(wcurves)) if i not in w_used]
    w_holes, h_used = assign(
        [wcurves[i] for i in rest],
        EXPECT_WHITE_HOLE,
        curve_bbox,
        "white-hole",
    )
    w_holes = {k: rest[v] for k, v in w_holes.items()}
    if len(w_used) + len(h_used) != len(wcurves):
        raise SystemExit("ABORT: leftover white contours")

    c_out, c_used = assign(ccurves, EXPECT_CYAN, curve_bbox, "cyan")
    if len(c_used) != len(ccurves):
        raise SystemExit("ABORT: leftover cyan contours")

    # Letter paths: outer + (hole if any), winding-resolved at parse time.
    letters_ts = []
    for name in EXPECT_WHITE_OUTER:
        d = curve_to_d(wcurves[w_out[name]])
        if name in w_holes:
            d += " " + curve_to_d(wcurves[w_holes[name]])
        letters_ts.append(f"  {{ name: `{name}`, d: `{d}` }},")

    D = lambda n: curve_to_d(ccurves[c_out[n]])
    bolt_d = " ".join(D(n) for n in ["bolt_tip", "bolt_tail", "bolt_sliver"])

    brackets_ts = []
    for key in ["bracket_tl", "bracket_tr", "bracket_bl", "bracket_br"]:
        c = ccurves[c_out[key]]
        x0, y0, x1, y1 = curve_bbox(c)
        brackets_ts.append(
            f"  {{ d: `{curve_to_d(c)}`, cx: {nx((x0+x1)/2)}, cy: {ny((y0+y1)/2)} }}, // {key}"
        )

    ob = curve_bbox(wcurves[w_out["o"]])
    o_cx, o_cy = nx((ob[0] + ob[2]) / 2), ny((ob[1] + ob[3]) / 2)
    o_half_h = round((ob[3] - ob[1]) / 2 * S, 4)

    out = f"""/**
 * Official All Import WORDMARK — complete logo as real vector paths.
 *
 * GENERATED by scripts/generate-wordmark-paths.py — do not edit by hand.
 * potrace only produces paths; every contour is pinned to its piece by IoU
 * confidence against developer-declared tables (>=95% auto, 90-95% warn,
 * <90% abort). Letters carry their holes (A, p, o), winding-resolved.
 *
 * Source: public/brand/wordmark.jpg (2000x2000).
 * Frame: letters bbox center at origin, letter width = 7 units, y-up.
 */

export interface LetterPath {{
  name: string;
  d: string;
}}

/** Every letter of "All Import", reading order. The `o` is the isotype O. */
export const LETTERS: LetterPath[] = [
{chr(10).join(letters_ts)}
];

/** Bolt: double tip + tail + sliver through the o — one striking piece. */
export const BOLT_D = `{bolt_d}`;

/** Cyan halo rim hugging the o. */
export const HALO_D = `{D('halo')}`;

/** Corner brackets, explicit order: TL, TR, BL, BR. */
export const BRACKETS: Array<{{ d: string; cx: number; cy: number }}> = [
{chr(10).join(brackets_ts)}
];

/** The o's center and half-height in logo frame — scan beam targeting. */
export const O_CENTER: [number, number] = [{o_cx}, {o_cy}];
export const O_HALF_H = {o_half_h};
"""
    OUT.write_text(out)
    print(f"OK — wrote {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    sys.exit(main())

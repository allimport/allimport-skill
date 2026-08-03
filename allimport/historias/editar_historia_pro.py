# -*- coding: utf-8 -*-
"""Historia de restock — version pro (v2).
Corrige respecto a v1:
  - el acento cyan ahora funciona aunque la frase se corte entre dos lineas
    (se marca palabra por palabra, no buscando la frase entera en cada linea)
  - franja del medio mas oscura: la foto se insinua pero no compite (pedido original)
"""
from PIL import Image, ImageEnhance, ImageDraw, ImageFont, ImageOps

W, H = 1080, 1920
SRC = "/root/.claude/uploads/8fdc1470-5f4d-5f95-8da7-f4e6bf19173e/872d3ef3-1785350157506.png"
DST = "/home/user/allimport-skill/historias/generadas/restock-07-pro.jpg"
FD  = "/home/user/allimport-skill/historias/fonts"

WHITE = (250, 250, 250)
INK   = (16, 17, 20)
CYAN  = (0, 212, 212)
SOFT  = (208, 213, 222)
DARK  = (10, 12, 16)

BOLD = f"{FD}/MontserratAlternates-Bold.ttf"
SEMI = f"{FD}/MontserratAlternates-SemiBold.ttf"
MED  = f"{FD}/MontserratAlternates-Medium.ttf"
def f(p, s): return ImageFont.truetype(p, s)

# ---------- fondo con degradado ----------
im = ImageOps.exif_transpose(Image.open(SRC)).convert("RGB")
im = ImageOps.fit(im, (W, H), Image.LANCZOS)
im = ImageEnhance.Color(im).enhance(0.5)
im = ImageEnhance.Brightness(im).enhance(1.05)

veil = Image.new("RGB", (W, H), DARK)
mask = Image.new("L", (1, H)); px = mask.load()
TOP, MID = 0.95, 0.84          # MID mas alto que antes -> foto mas velada
for y in range(H):
    t = y / H
    if   t < 0.34: a = TOP
    elif t < 0.46: a = TOP - (t - 0.34) / 0.12 * (TOP - MID)
    elif t < 0.68: a = MID
    elif t < 0.80: a = MID + (t - 0.68) / 0.12 * (0.94 - MID)
    else:          a = 0.94
    px[0, y] = int(a * 255)
canvas = Image.composite(veil, im, mask.resize((W, H)))

d = ImageDraw.Draw(canvas)
MX = 88

# ---------- helpers ----------
def wrap_tokens(tokens, font, maxw):
    """tokens = [(palabra, es_acento)]; devuelve lineas de tokens."""
    lines, cur = [], []
    for tok in tokens:
        probe = " ".join(w for w, _ in cur + [tok])
        if cur and d.textlength(probe, font=font) > maxw:
            lines.append(cur); cur = [tok]
        else:
            cur.append(tok)
    if cur: lines.append(cur)
    return lines

def draw_tokens(x, y, line, font, base, hi):
    space = d.textlength(" ", font=font)
    cx = x
    for i, (w, is_hi) in enumerate(line):
        d.text((cx, y), w, font=font, fill=(hi if is_hi else base))
        cx += d.textlength(w, font=font) + (space if i < len(line) - 1 else 0)

def tokenize(text, accent):
    """Marca como acento las palabras que forman la frase 'accent'."""
    words = text.split()
    acc = accent.split()
    flags = [False] * len(words)
    for i in range(len(words) - len(acc) + 1):
        # comparacion tolerante a puntuacion pegada (ej. "acá,")
        if all(words[i + j].strip(",.;:!?") == acc[j] for j in range(len(acc))):
            for j in range(len(acc)): flags[i + j] = True
            break
    return list(zip(words, flags))

def wrap_plain(text, font, maxw):
    return [" ".join(w for w, _ in ln)
            for ln in wrap_tokens([(w, False) for w in text.split()], font, maxw)]

def pill(x, y_top, text, font, pad_x=28, pad_y=18, radius=20):
    bb = font.getbbox(text); tw = bb[2] - bb[0]
    asc, desc = font.getmetrics(); box_h = asc + desc + pad_y * 2
    d.rounded_rectangle((x, y_top, x + tw + pad_x * 2, y_top + box_h),
                        radius=radius, fill=WHITE)
    d.text((x + pad_x - bb[0], y_top + pad_y + asc), text, font=font, fill=INK, anchor="ls")
    return box_h

# ---------- titular ----------
fh = f(BOLD, 78)
y = 300
for ln in ["acá volvimos", "con todo"]:
    y += pill(MX, y, ln, fh) + 14

# ---------- bajada ----------
fs = f(MED, 40)
y += 26
for ln in wrap_plain("consultame precios y productos disponibles", fs, 860):
    d.text((MX, y), ln, font=fs, fill=SOFT); y += 54

# ---------- CTA con acento cyan ----------
fc = f(SEMI, 44)
cta = "si querés revender o invertir, hablame por acá y te cuento cómo arranqué yo"
lines = wrap_tokens(tokenize(cta, "hablame por acá"), fc, 900)
y = H - 200 - (len(lines) - 1) * 62
for ln in lines:
    draw_tokens(MX, y, ln, fc, WHITE, CYAN); y += 62

canvas.save(DST, "JPEG", quality=95)
print("OK ->", DST, "| lineas CTA:", len(lines),
      "| acento aplicado:", any(fl for ln in lines for _, fl in ln))

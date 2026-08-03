# -*- coding: utf-8 -*-
"""
All Import - Editor de fotos para historias de Instagram.
Pone tus fotos REALES a pantalla completa, con la marca All Import, precio y texto.
NO instala nada (solo Pillow; el CORRER lo instala la 1ra vez).

USO:
  1. Poné tus fotos en esta misma carpeta.
  2. Nombrá cada foto por producto: tws.jpg, parlante.jpg, powerbank.jpg,
     kit.jpg, lightning.jpg, usbc.jpg, vaper.jpg, figuritas.jpg
     (podés tener varias: tws-1.jpg, tws-2.jpg, etc.)
  3. Doble clic en CORRER_EDITAR.bat
  4. Las historias listas salen en la subcarpeta "historias".
"""
import os, glob, re
try:
    from PIL import Image, ImageEnhance, ImageDraw, ImageFont, ImageOps
except ImportError:
    print("Falta Pillow. Corré CORRER_EDITAR.bat que lo instala."); raise SystemExit

NAVY=(10,15,26); CYAN=(0,212,212); WHITE=(248,250,250); RED=(226,42,42); CELESTE=(120,180,235)
CARPETA=os.path.dirname(os.path.abspath(__file__))
SALIDA=os.path.join(CARPETA,"historias"); os.makedirs(SALIDA,exist_ok=True)
import glob as _g
FONTS=_g.glob("/usr/share/fonts/**/DejaVuSans-Bold.ttf",recursive=True) or \
      _g.glob("C:/Windows/Fonts/arialbd.ttf") or _g.glob("C:/Windows/Fonts/*ARIALBD*")
FB=FONTS[0] if FONTS else None
def F(s): return ImageFont.truetype(FB,s) if FB else ImageFont.load_default()

# producto -> (palabras en el nombre del archivo, titulo, precio, subtexto, badge, color_badge)
PRODUCTOS=[
 (["figu","figus","panini","mundial"], "Figus del Mundial 2026","$3.000 c/u","Desde 10u  ->  $2.500 c/u","ULTIMAS · NO TRAEMOS MAS",RED),
 (["tws","auricular","airpod"],        "Auriculares TWS","$32.000","Cancelacion de ruido · probalos antes de pagar","DISPONIBLE",CYAN),
 (["parlante","jbl","speaker"],        "Parlante Bluetooth","$35.000","Sonido potente · luces que bailan","DISPONIBLE",CYAN),
 (["power","bateria","baterry","battery"], "Power Bank magnetico","$35.000","Se pega al telefono · carga sin cables","DISPONIBLE",CYAN),
 (["kit","combo"],                     "Kit de carga completo","$55.000","Cable + cubo 20W · listo para usar","DISPONIBLE",CYAN),
 (["lightning","lignig","iphone"],     "Cargador 20W para iPhone","$28.000","Carga rapida · cable reforzado","DISPONIBLE",CYAN),
 (["usbc","usb-c","tipoc","android"],  "Cargador 20W USB-C","$28.000","Android y notebook · carga rapida","DISPONIBLE",CYAN),
 (["vaper","vape","elfbar"],           "Vaper premium","$35.000","Consulta sabores disponibles","DISPONIBLE",CYAN),
]
def match(nombre):
    n=nombre.lower()
    for keys,*rest in PRODUCTOS:
        if any(k in n for k in keys): return rest
    return None

def wrap(d,t,f,mw):
    out=[];cur=""
    for w in t.split():
        if d.textbbox((0,0),(cur+" "+w).strip(),font=f)[2]<=mw: cur=(cur+" "+w).strip()
        else: out.append(cur);cur=w
    if cur:out.append(cur)
    return out
def fit(d,t,s0,mw):
    s=s0
    while s>34 and d.textbbox((0,0),t,font=F(s))[2]>mw:s-=2
    return F(s)
def ct(d,cx,y,t,f,fill):
    b=d.textbbox((0,0),t,font=f); d.text((cx-(b[2]-b[0])/2,y),t,font=f,fill=fill); return b[3]-b[1]
def pill(d,cx,y,t,f,bg,fg,px=54,py=24):
    b=d.textbbox((0,0),t,font=f);w=b[2]-b[0];h=b[3]-b[1]
    d.rounded_rectangle([cx-w/2-px,y,cx+w/2+px,y+h+py*2],radius=(h+py*2)//2,fill=bg)
    d.text((cx-w/2,y+py-b[1]),t,font=f,fill=fg); return y+h+py*2

def editar(src,dst,titulo,precio,sub,badge,cbadge):
    im=ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    im=ImageEnhance.Brightness(im).enhance(1.05); im=ImageEnhance.Contrast(im).enhance(1.10)
    im=ImageEnhance.Color(im).enhance(1.12); im=ImageEnhance.Sharpness(im).enhance(1.15)
    W,H=1080,1920
    canvas=ImageOps.fit(im,(W,H),Image.LANCZOS)
    scr=Image.new("L",(W,H),0); sd=ImageDraw.Draw(scr)
    for y in range(H):
        a=0
        if y<430:a=int(165*(1-y/430))
        if y>H-860:a=int(225*((y-(H-860))/860))
        sd.line([(0,y),(W,y)],fill=min(a,240))
    canvas=Image.composite(Image.new("RGB",(W,H),NAVY),canvas,scr)
    d=ImageDraw.Draw(canvas)
    d.rectangle([0,0,W-1,H-1],outline=CYAN,width=14)
    ct(d,W//2,64,"A L L   I M P O R T",F(58),CYAN)
    ct(d,W//2,132,"Cordoba · Entrega en mano",F(36),WHITE)
    fgb = WHITE if cbadge==RED else NAVY
    pill(d,W//2,200,badge,F(50),cbadge,fgb)
    y=H-760
    for ln in wrap(d,titulo,F(90),960):
        ct(d,W//2,y,ln,fit(d,ln,90,960),WHITE); y+=104
    y+=14
    y=pill(d,W//2,y,precio,F(118),CYAN,NAVY,px=60,py=26)+24
    ct(d,W//2,y,sub,fit(d,sub,58,980),WHITE); y+=86
    ct(d,W//2,y,"Escribinos por WhatsApp",F(44),CELESTE)
    canvas.save(dst,"JPEG",quality=93)

print("Editando fotos...\n")
n=0
for src in sorted(glob.glob(os.path.join(CARPETA,"*.jpg"))+glob.glob(os.path.join(CARPETA,"*.jpeg"))+glob.glob(os.path.join(CARPETA,"*.png"))):
    base=os.path.basename(src)
    if base.lower().startswith("editar"): continue
    info=match(base)
    if not info:
        print(f"  [?] {base}: no reconoci el producto (nombrala tws/parlante/vaper/etc.)"); continue
    dst=os.path.join(SALIDA, os.path.splitext(base)[0]+"_historia.jpg")
    try:
        editar(src,dst,*info); n+=1; print(f"  [OK] {base} -> {info[0]}")
    except Exception as e:
        print(f"  [X] {base}: {e}")
print(f"\nLISTO. {n} historias en la carpeta 'historias'.")
input("\nApreta ENTER para cerrar...")

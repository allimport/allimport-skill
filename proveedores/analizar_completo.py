# -*- coding: utf-8 -*-
"""
Analizador COMPLETO de chats de WhatsApp - All Import.
Logica: CADA FOTO = un producto (le pega el precio cercano si existe).
Ademas agrega los precios sueltos (texto) que no tengan foto.
Asi NO se pierde ningun producto. NO instala nada.
Genera: Informe_COMPLETO.html  y  Productos_COMPLETO.csv
"""

# ====== AJUSTES ======
DIAS_ATRAS = 9999          # ultimos N dias (desde hoy hacia atras). Poné 9999 para TODO.
INCLUIR_COMBOS = False   # False = sin combos
# =====================

import os, re, glob, struct, zlib, csv, html, base64
from datetime import datetime, timedelta
from collections import defaultdict

CARPETA = os.path.dirname(os.path.abspath(__file__))
FOTOS_DIR = os.path.join(CARPETA, "_fotos_extraidas")
os.makedirs(FOTOS_DIR, exist_ok=True)
LIMITE = datetime.now() - timedelta(days=DIAS_ATRAS) if DIAS_ATRAS < 9000 else datetime(2000,1,1)
IMG_EXT = (".jpg", ".jpeg", ".png", ".webp")

def leer_zip(path):
    data = open(path, "rb").read(); texto=None; imgs={}; off=0
    while off < len(data)-4 and data[off:off+4]==b'PK\x03\x04':
        n=struct.unpack('<H',data[off+26:off+28])[0]; m=struct.unpack('<H',data[off+28:off+30])[0]
        comp=struct.unpack('<I',data[off+18:off+22])[0]
        fn=data[off+30:off+30+n].decode('utf-8','replace'); start=off+30+n+m
        try:
            if comp>0: raw=zlib.decompress(data[start:start+comp],-15); nxt=start+comp
            else:
                d=zlib.decompressobj(-15); raw=d.decompress(data[start:])+d.flush()
                nxt=start+(len(data[start:])-len(d.unused_data)); nxt+=16 if data[nxt:nxt+4]==b'PK\x07\x08' else 12
        except Exception:
            raw=b''; nxt=data.find(b'PK\x03\x04',start)
            if nxt<0: break
        low=fn.lower()
        if low.endswith(".txt") and raw: texto=raw.decode('utf-8','replace')
        elif low.endswith(IMG_EXT) and raw and not os.path.basename(low).startswith("stk"):
            imgs[os.path.basename(fn)]=raw
        off=nxt
    return texto, imgs

def nombre_proveedor(path):
    b=re.sub(r"^Chat de WhatsApp con\s*","",os.path.basename(path))
    return re.sub(r"\.(txt|zip)$","",b,flags=re.I).strip()

LINEA=re.compile(r"^(\d{1,2})/(\d{1,2})/(\d{2}),\s*\d{1,2}:\d{2}\s*-\s*(.*?):\s(.*)$")
SIST=re.compile(r"(se uni[oó]|sali[oó]|cre[oó] el|cambi[oó]|a[nñ]adi[oó]|los mensajes|cifrado|elimin|videollamada|llamada perdida|se te a[nñ]adi)",re.I)
IMG_FILE=re.compile(r"((?:IMG|PHOTO)[\w\-]*\.(?:jpg|jpeg|png|webp))",re.I)
IMG_OMIT=re.compile(r"(imagen omitida|image omitted)",re.I)
OTRO_ADJ=re.compile(r"(STK-|VID-|AUD|PTT|DOC-|video omitido|sticker omitido|audio omitido|gif omitido)",re.I)
NUM=r"(\d{1,3}(?:[.\s]\d{3})+|\d{2,7}(?:[.,]\d{1,3})?|\d{3,7})"
COMBO=re.compile(r"\bcombo|surtido\b",re.I)

BAD_AFTER=re.compile(r"^\s*(w|watt|watts|ml|mah|lt|lts|litros?|gb|tb|puffs?|pufs|pulg|kg|cm|mm|volt|hz|pcs|und|unidad(?:es)?|personas|figuritas|album|álbum|sobres?|piezas?|mah|l\b)\b",re.I)
PALABRA_PRECIO=re.compile(r"\$|pesos?|c/u|c/i|cada|docena|por mayor|mayorista|\bunidad\b|precio|vale|\bsale\b|\bqueda|lo dejo|liquidaci",re.I)
def parse_precio(t):
    tl=t.lower().replace("u$d","usd").replace("us$","usd").replace("u$s","usd")
    if re.search(r"http|\.jpg|\.jpeg|\.png|\.vcf|\.opus|\.mp4|\.webp|archivo adjunto|omitid|multimedia",tl): return None
    mon="USD" if re.search(r"\busd\b|d[oó]lar",tl) else "ARS"
    uni="docena" if re.search(r"docena|x ?12",tl) else ("por mayor" if re.search(r"por mayor|x mayor|mayorista",tl) else "unidad")
    hay=bool(PALABRA_PRECIO.search(tl))
    cands=[]  # (prioridad, posicion, valor)
    # $ + mil
    for m in re.finditer(r"\$\s*(\d{1,3}(?:[.,]\d{1,2})?)\s*(mil|k|lucas)\b",tl):
        cands.append((3,m.start(),int(float(m.group(1).replace(',','.'))*1000)))
    # $ + miles con puntos
    for m in re.finditer(r"\$\s*(\d{1,3}(?:\.\d{3})+)",tl):
        cands.append((3,m.start(),int(re.sub(r"[.\s]","",m.group(1)))))
    # $ + entero
    for m in re.finditer(r"\$\s*(\d{3,7})(?![\d.])",tl):
        cands.append((3,m.start(),int(m.group(1))))
    # numero + mil (sin $), no pegado a letra/guion
    for m in re.finditer(r"(?<![\w\-])(\d{1,3}(?:[.,]\d{1,2})?)\s*(mil|lucas)\b",tl):
        cands.append((2,m.start(),int(float(m.group(1).replace(',','.'))*1000)))
    # miles con puntos, no seguido de unidad rara
    for m in re.finditer(r"(?<![\w\-.])(\d{1,3}(?:\.\d{3})+)",tl):
        if BAD_AFTER.match(tl[m.end():]): continue
        cands.append((2,m.start(),int(re.sub(r"[.\s]","",m.group(1)))))
    # entero suelto SOLO si hay palabra de precio
    if hay:
        for m in re.finditer(r"(?<![\w\-])(\d{3,7})(?![\w])",tl):
            v=int(m.group(1))
            if 2018<=v<=2031: continue           # año (Mundial 2026, etc.)
            if BAD_AFTER.match(tl[m.end():]): continue
            cands.append((1,m.start(),v))
    # dolares chicos
    if mon=="USD":
        for m in re.finditer(r"(?<![\w\-])(\d{1,4}(?:[.,]\d{1,2})?)\s*(?:usd|d[oó]lar|c/u|cada)",tl):
            v=float(m.group(1).replace(",","."))
            if 0.5<=v<=100000: cands.append((2,m.start(),round(v,2)))
    if not cands: return None
    cands.sort(key=lambda c:(-c[0],c[1]))
    v=cands[0][2]
    if isinstance(v,int) and v<200 and not (mon=="USD" or uni=="docena"): return None
    if isinstance(v,int) and v>90000000: return None
    return v,mon,uni

# ---- procesar ----
items=[]
print("Leyendo TODO (puede tardar con los grupos grandes)...\n")
for path in sorted(glob.glob(os.path.join(CARPETA,"*.zip"))):
    prov=nombre_proveedor(path)
    texto,imgs=leer_zip(path)
    if not texto: print(f"  [X] {prov}: no se pudo leer"); continue
    pref=re.sub(r'[^\w\- ]','',prov)[:35]
    guardadas={}
    for nm,raw in imgs.items():
        dest=os.path.join(FOTOS_DIR,f"{pref}__{nm}")
        try: open(dest,"wb").write(raw); guardadas[nm]=dest
        except Exception: pass
    # parsear mensajes
    M=[]
    for ln in texto.splitlines():
        mm=LINEA.match(ln)
        if not mm: continue
        d,mo,y,autor,msg=mm.groups()
        try: f=datetime(2000+int(y),int(mo),int(d))
        except ValueError: continue
        M.append((f,autor,msg.strip()))
    usados=set(); prod=[]; vistos=set()
    def es_adjunto(t): return bool(IMG_FILE.search(t) or IMG_OMIT.search(t) or OTRO_ADJ.search(t))
    def precio_de_foto(i,autor):
        # busca el precio DESPUES de la foto (salta nombres de archivo y otras fotos)
        pasadas=0
        for j in range(i+1, min(len(M), i+6)):
            if M[j][1]!=autor: continue
            t=M[j][2]
            if es_adjunto(t): continue
            if not INCLUIR_COMBOS and COMBO.search(t): return None,None,None
            pr=parse_precio(t)
            if pr: return j,pr,t
            pasadas+=1
            if pasadas>=2: break   # si pasan 2 mensajes sin precio, ya no es de esta foto
        return None,None,None
    # PASO 1: cada foto = un producto
    for i,(f,autor,msg) in enumerate(M):
        if SIST.search(msg) or f<LIMITE: continue
        if OTRO_ADJ.search(msg): continue
        fm=IMG_FILE.search(msg); es_omit=IMG_OMIT.search(msg)
        if not fm and not es_omit: continue
        imgfile=fm.group(1) if fm else None
        img_path=guardadas.get(imgfile,"") if imgfile else ""
        j,pr,ptxt=precio_de_foto(i,autor)
        if j is not None: usados.add(j)
        clave=(imgfile or f"omit{i}",)
        if clave in vistos: continue
        vistos.add(clave)
        precio,mon,uni=(pr if pr else (None,"ARS","-"))
        detalle=(ptxt.strip()[:160] if pr else "(producto — mirá la foto)")
        prod.append({"fecha":f,"prov":prov,"precio":precio,"moneda":mon,"unidad":uni,
                     "texto":detalle,"img":img_path,
                     "oferta":bool(re.search(r"oferta|liquidaci|promo|[uú]ltim",detalle,re.I))})
    # PASO 2: precios sueltos (texto) que no fueron de ninguna foto
    for i,(f,autor,msg) in enumerate(M):
        if i in usados or SIST.search(msg) or f<LIMITE: continue
        if es_adjunto(msg): continue
        pr=parse_precio(msg)
        if not pr: continue
        if not INCLUIR_COMBOS and COMBO.search(msg): continue
        clave=(msg.lower()[:45],pr[0])
        if clave in vistos: continue
        vistos.add(clave)
        prod.append({"fecha":f,"prov":prov,"precio":pr[0],"moneda":pr[1],"unidad":pr[2],
                     "texto":msg[:160],"img":"","oferta":bool(re.search(r"oferta|liquidaci|promo|[uú]ltim",msg,re.I))})
    items+=prod
    con_precio=sum(1 for p in prod if p["precio"])
    print(f"  [OK] {prov}: {len(prod)} productos ({con_precio} con precio, {len(prod)-con_precio} solo foto) · {len(imgs)} fotos")

items.sort(key=lambda x:(x["prov"],x["fecha"]))

# CSV
with open(os.path.join(CARPETA,"Productos_COMPLETO.csv"),"w",newline="",encoding="utf-8-sig") as fp:
    w=csv.writer(fp,delimiter=";")
    w.writerow(["Fecha","Proveedor","Precio","Moneda","Venta por","Oferta","Texto","Foto"])
    for it in items:
        w.writerow([it["fecha"].strftime("%d/%m/%Y"),it["prov"],it["precio"] or "(en la foto)",it["moneda"],
                    it["unidad"],"Si" if it["oferta"] else "No",it["texto"],
                    os.path.basename(it["img"]) if it["img"] else ""])

# HTML
def img_tag(p):
    if not p or not os.path.exists(p): return '<div class="nf">sin<br>foto</div>'
    try:
        b=open(p,"rb").read()
        if len(b)>600000: return '<div class="nf">foto<br>grande</div>'
        ext="jpeg" if p.lower().endswith(("jpg","jpeg")) else ("png" if p.lower().endswith("png") else "webp")
        return f'<img src="data:image/{ext};base64,{base64.b64encode(b).decode()}">'
    except Exception: return '<div class="nf">sin<br>foto</div>'

provs=sorted(set(it["prov"] for it in items))
H=['<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Productos COMPLETO - All Import</title>',
'''<style>body{font-family:Segoe UI,Roboto,sans-serif;background:#0a0f1a;color:#e8f0f0;margin:0;padding:14px}
h1{color:#00d4d4;font-size:20px}h2{color:#00d4d4;border-bottom:2px solid #00d4d4;padding-bottom:5px;margin-top:22px}
.n{background:#111a26;border-left:3px solid #00d4d4;padding:11px;border-radius:5px;font-size:13px;line-height:1.5;margin:10px 0}
.card{display:flex;gap:12px;background:#111a26;border-radius:8px;padding:9px;margin:7px 0;align-items:center}
.card img{width:85px;height:85px;object-fit:cover;border-radius:6px;flex:0 0 85px}
.nf{width:85px;height:85px;display:flex;align-items:center;justify-content:center;background:#0a0f1a;color:#556;border-radius:6px;font-size:11px;text-align:center;flex:0 0 85px}
.info{flex:1}.p{color:#00d4d4;font-weight:700;font-size:17px}.pf{color:#c9a227;font-weight:700;font-size:14px}
.fe{color:#7a8a94;font-size:12px}.tx{margin-top:3px;font-size:13px;line-height:1.3}.of{background:#00d4d4;color:#0a0f1a;font-size:10px;font-weight:700;padding:1px 6px;border-radius:3px}</style>''']
H.append('<h1>Productos COMPLETO — All Import</h1>')
sinp=sum(1 for it in items if not it["precio"])
H.append(f'<div class="n"><b>{len(items)} productos</b> de <b>{len(provs)} proveedores</b> · ultimos {DIAS_ATRAS} dias · sin combos<br>'
         f'Cada FOTO es un producto. {len(items)-sinp} tienen precio en texto; {sinp} el precio esta EN LA FOTO (miralo ahi).</div>')
pp=defaultdict(list)
for it in items: pp[it["prov"]].append(it)
for prov in provs:
    H.append(f'<h2>{html.escape(prov)} <span style="color:#7a8a94;font-size:14px">— {len(pp[prov])}</span></h2>')
    for it in pp[prov]:
        of='<span class="of">OFERTA</span>' if it["oferta"] else ''
        precio=(f'<span class="p">${it["precio"]:,} {it["moneda"]}</span> <small>({it["unidad"]})</small>'
                if it["precio"] else '<span class="pf">precio EN LA FOTO</span>')
        H.append(f'<div class="card">{img_tag(it["img"])}<div class="info">'
                 f'<span class="fe">{it["fecha"].strftime("%d/%m/%Y")}</span> {of}<br>{precio}'
                 f'<div class="tx">{html.escape(it["texto"])}</div></div></div>')
open(os.path.join(CARPETA,"Informe_COMPLETO.html"),"w",encoding="utf-8").write("\n".join(H))

print(f"\n==================================================")
print(f"  LISTO. {len(items)} productos de {len(provs)} proveedores.")
print(f"  ({len(items)-sinp} con precio en texto, {sinp} con precio en la foto)")
print(f"==================================================")
print("Abri:  Informe_COMPLETO.html  (doble clic)")
input("\nApreta ENTER para cerrar...")

# agent/catalogo.py — Catálogo de productos con sus fotos
# Generado por AgentKit

"""
Fuente única de productos con imagen, usada por la herramienta enviar_foto
en agent/brain.py. Las fotos están publicadas en el sitio de GitHub Pages
de All Import (repo allimport-skill, carpeta web/public/products/).
"""

IMG_BASE_URL = "https://allimport.github.io/allimport-skill/products"

PRODUCTOS = {
    "remera": {"nombre": "Camiseta Argentina", "imagen": f"{IMG_BASE_URL}/remera/01.webp"},
    "remera-messi": {"nombre": "Camiseta Messi 10", "imagen": f"{IMG_BASE_URL}/remera-messi/01.webp"},
    "tws": {"nombre": "Auriculares TWS Pro", "imagen": f"{IMG_BASE_URL}/tws/01.webp"},
    "combo": {"nombre": "Kit iPhone Premium", "imagen": f"{IMG_BASE_URL}/combo/01.webp"},
    "parlante": {"nombre": "Parlante Bluetooth RGB", "imagen": f"{IMG_BASE_URL}/parlante/01.webp"},
    "battery": {"nombre": "Batería Magnética 5000mAh", "imagen": f"{IMG_BASE_URL}/battery/01.webp"},
    "cable-lightning": {"nombre": "Cargador USB-C a Lightning + 20W", "imagen": f"{IMG_BASE_URL}/cable-lightning/01.webp"},
    "cable-usbc": {"nombre": "Cargador USB-C a USB-C + 20W", "imagen": f"{IMG_BASE_URL}/cable-usbc/01.webp"},
    "vaper": {"nombre": "Vaper Descartable Premium", "imagen": f"{IMG_BASE_URL}/vaper/01.webp"},
}

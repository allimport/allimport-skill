# agent/tools.py — Herramientas que Gemini puede invocar durante la charla
# Generado por AgentKit

"""
Acciones reales que el agente puede ejecutar además de responder texto:
guardar la ficha del cliente, mandar una foto de producto, y avisarle al
dueño del negocio cuando hace falta un humano. agent/brain.py las expone
a Gemini como "function calling" y las ejecuta cuando el modelo las pide.
"""

import os
import logging
from dotenv import load_dotenv

from agent.memory import guardar_cliente
from agent.providers import obtener_proveedor
from agent.catalogo import PRODUCTOS

load_dotenv()
logger = logging.getLogger("agentkit")

OWNER_WHATSAPP_NUMBER = os.getenv("OWNER_WHATSAPP_NUMBER")


async def registrar_cliente(
    telefono: str,
    nombre: str | None = None,
    estado: str | None = None,
    producto_interes: str | None = None,
    encuentro: str | None = None,
    notas: str | None = None,
) -> dict:
    """Guarda o actualiza la ficha de este cliente."""
    await guardar_cliente(
        telefono,
        nombre=nombre,
        estado=estado,
        producto_interes=producto_interes,
        encuentro=encuentro,
        notas=notas,
    )
    return {"ok": True}


async def enviar_foto(telefono: str, producto_id: str) -> dict:
    """Manda por WhatsApp la foto real de un producto del catálogo."""
    producto = PRODUCTOS.get(producto_id)
    if not producto:
        return {"ok": False, "error": f"No existe el producto '{producto_id}'"}
    proveedor = obtener_proveedor()
    enviado = await proveedor.enviar_media(telefono, producto["nombre"], producto["imagen"])
    return {"ok": enviado}


async def escalar_a_humano(telefono: str, motivo: str) -> dict:
    """Avisa por WhatsApp al dueño del negocio que un cliente necesita atención humana."""
    if not OWNER_WHATSAPP_NUMBER:
        logger.warning("OWNER_WHATSAPP_NUMBER no configurado, no se pudo escalar")
        return {"ok": False, "error": "No hay número configurado para avisar al dueño"}
    proveedor = obtener_proveedor()
    texto = f"Un cliente ({telefono}) necesita tu atención: {motivo}"
    enviado = await proveedor.enviar_mensaje(OWNER_WHATSAPP_NUMBER, texto)
    return {"ok": enviado}

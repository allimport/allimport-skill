# agent/tools.py — Herramientas del agente
# Generado por AgentKit

"""
Herramientas específicas de All Import: catálogo/precios, horario y toma de pedidos.
"""

import os
import yaml
import logging

logger = logging.getLogger("agentkit")


def cargar_info_negocio() -> dict:
    """Carga la información del negocio desde business.yaml."""
    try:
        with open("config/business.yaml", "r", encoding="utf-8") as f:
            return yaml.safe_load(f)
    except FileNotFoundError:
        logger.error("config/business.yaml no encontrado")
        return {}


def obtener_horario() -> dict:
    """Retorna el horario de atención del negocio."""
    info = cargar_info_negocio()
    return {"horario": info.get("negocio", {}).get("horario", "No disponible")}


def buscar_en_knowledge(consulta: str) -> str:
    """Busca información relevante (catálogo, precios, FAQ) en /knowledge."""
    resultados = []
    knowledge_dir = "knowledge"

    if not os.path.exists(knowledge_dir):
        return "No hay archivos de conocimiento disponibles."

    for archivo in os.listdir(knowledge_dir):
        ruta = os.path.join(knowledge_dir, archivo)
        if archivo.startswith(".") or not os.path.isfile(ruta):
            continue
        try:
            with open(ruta, "r", encoding="utf-8") as f:
                contenido = f.read()
                if consulta.lower() in contenido.lower():
                    resultados.append(f"[{archivo}]: {contenido[:500]}")
        except (UnicodeDecodeError, IOError):
            continue

    if resultados:
        return "\n---\n".join(resultados)
    return "No encontré información específica sobre eso en mis archivos."


# ════════════════════════════════════════════════════════════
# Pedidos: registro simple en memoria del proceso (demo). Para producción,
# reemplazar por una tabla propia en agent/memory.py.
# ════════════════════════════════════════════════════════════
_pedidos: dict[str, list[dict]] = {}


def agregar_al_pedido(telefono: str, producto: str, talle: str | None = None) -> dict:
    """Agrega un producto al pedido en curso de este contacto."""
    item = {"producto": producto, "talle": talle}
    _pedidos.setdefault(telefono, []).append(item)
    return item


def ver_pedido(telefono: str) -> list[dict]:
    """Devuelve el pedido en curso de este contacto."""
    return _pedidos.get(telefono, [])

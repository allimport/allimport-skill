# agent/main.py — Servidor FastAPI + Webhook de WhatsApp
# Generado por AgentKit

"""
Servidor principal del agente de WhatsApp de All Import.
Usa el proveedor Twilio a través de la capa de providers.
"""

import csv
import io
import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import PlainTextResponse, StreamingResponse
from dotenv import load_dotenv

from agent.brain import generar_respuesta
from agent.memory import inicializar_db, guardar_mensaje, obtener_historial, listar_clientes
from agent.providers import obtener_proveedor

load_dotenv()

ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
log_level = logging.DEBUG if ENVIRONMENT == "development" else logging.INFO
logging.basicConfig(level=log_level)
logger = logging.getLogger("agentkit")

proveedor = obtener_proveedor()
PORT = int(os.getenv("PORT", 8000))
ADMIN_TOKEN = os.getenv("ADMIN_TOKEN")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Inicializa la base de datos al arrancar el servidor."""
    await inicializar_db()
    logger.info("Base de datos inicializada")
    logger.info(f"Servidor AgentKit corriendo en puerto {PORT}")
    logger.info(f"Proveedor de WhatsApp: {proveedor.__class__.__name__}")
    yield


app = FastAPI(title="All Import — Agente de WhatsApp", version="1.0.0", lifespan=lifespan)


@app.get("/")
async def health_check():
    """Endpoint de salud para Railway/monitoreo."""
    return {"status": "ok", "service": "agentkit"}


@app.get("/clientes.csv")
async def exportar_clientes(token: str = ""):
    """
    Exporta la ficha de todos los clientes como CSV (se abre directo en Excel).
    Protegido con ADMIN_TOKEN — sin ese token en el .env, el endpoint queda
    deshabilitado (nunca expuesto sin protección).
    """
    if not ADMIN_TOKEN or token != ADMIN_TOKEN:
        raise HTTPException(status_code=403, detail="Token inválido o ADMIN_TOKEN no configurado")

    clientes = await listar_clientes()
    buffer = io.StringIO()
    columnas = ["telefono", "nombre", "estado", "producto_interes", "encuentro", "notas", "actualizado"]
    writer = csv.DictWriter(buffer, fieldnames=columnas)
    writer.writeheader()
    writer.writerows(clientes)
    buffer.seek(0)

    return StreamingResponse(
        iter([buffer.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=clientes.csv"},
    )


@app.get("/webhook")
async def webhook_verificacion(request: Request):
    """Verificación GET del webhook (no-op para Twilio)."""
    resultado = await proveedor.validar_webhook(request)
    if resultado is not None:
        return PlainTextResponse(str(resultado))
    return {"status": "ok"}


@app.post("/webhook")
async def webhook_handler(request: Request):
    """Recibe mensajes de WhatsApp, genera respuesta con Claude y la envía de vuelta."""
    try:
        mensajes = await proveedor.parsear_webhook(request)

        for msg in mensajes:
            if msg.es_propio or not msg.texto:
                continue

            logger.info(f"Mensaje de {msg.telefono}: {msg.texto}")

            # Historial ANTES de guardar el mensaje actual: vacío == primer mensaje
            historial = await obtener_historial(msg.telefono)

            respuesta = await generar_respuesta(msg.texto, historial, msg.telefono)

            await guardar_mensaje(msg.telefono, "user", msg.texto)
            await guardar_mensaje(msg.telefono, "assistant", respuesta)

            await proveedor.enviar_mensaje(msg.telefono, respuesta)

            logger.info(f"Respuesta a {msg.telefono}: {respuesta}")

        return {"status": "ok"}

    except Exception as e:
        logger.error(f"Error en webhook: {e}")
        raise HTTPException(status_code=500, detail=str(e))

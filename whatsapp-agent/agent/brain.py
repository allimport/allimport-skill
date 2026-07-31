# agent/brain.py — Cerebro del agente: conexión con la API de Gemini
# Generado por AgentKit

"""
Lógica de IA del agente. Lee el system prompt de prompts.yaml, le inyecta el
contenido de /knowledge, y genera respuestas usando la API de Google Gemini
(capa gratuita — GEMINI_API_KEY sacada de aistudio.google.com/apikey).
"""

import os
import glob
import yaml
import logging
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger("agentkit")

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
MODEL = "gemini-flash-latest"

KNOWLEDGE_PLACEHOLDER = "{KNOWLEDGE_CATALOGO}"


def cargar_config_prompts() -> dict:
    """Lee toda la configuración desde config/prompts.yaml."""
    try:
        with open("config/prompts.yaml", "r", encoding="utf-8") as f:
            return yaml.safe_load(f) or {}
    except FileNotFoundError:
        logger.error("config/prompts.yaml no encontrado")
        return {}


def cargar_knowledge() -> str:
    """Concatena todos los .txt/.md de /knowledge para inyectarlos en el prompt."""
    partes = []
    for ruta in sorted(glob.glob("knowledge/*.txt")) + sorted(glob.glob("knowledge/*.md")):
        try:
            with open(ruta, "r", encoding="utf-8") as f:
                partes.append(f.read())
        except (UnicodeDecodeError, IOError):
            continue
    return "\n\n".join(partes) if partes else "Sin información adicional cargada."


def cargar_system_prompt(es_primer_mensaje: bool) -> str:
    """
    Arma el system prompt final: reemplaza el placeholder de knowledge y agrega
    una instrucción explícita sobre si corresponde saludar con nombre o no.
    """
    config = cargar_config_prompts()
    base = config.get("system_prompt", "Eres un asistente útil. Responde en español.")
    base = base.replace(KNOWLEDGE_PLACEHOLDER, cargar_knowledge())

    if es_primer_mensaje:
        instruccion = (
            "\n\n## Estado de esta conversación\n"
            "Este ES el primer mensaje de este contacto. Aplicá la regla del "
            "primer mensaje: empezá saludando con \"Hola, soy Agustín Moreno. "
            "¿En qué te puedo ayudar?\" antes de responder."
        )
    else:
        instruccion = (
            "\n\n## Estado de esta conversación\n"
            "Este NO es el primer mensaje de este contacto — ya se presentó antes. "
            "No te vuelvas a presentar ni repitas el nombre, respondé directo."
        )
    return base + instruccion


def obtener_mensaje_error() -> str:
    config = cargar_config_prompts()
    return config.get("error_message", "Lo siento, estoy teniendo problemas técnicos. Por favor intenta de nuevo en unos minutos.")


def obtener_mensaje_fallback() -> str:
    config = cargar_config_prompts()
    return config.get("fallback_message", "Disculpa, no entendí tu mensaje. ¿Podrías reformularlo?")


def _a_formato_gemini(historial: list[dict]) -> list[types.Content]:
    """Gemini usa role 'model' en vez de 'assistant' — traduce el historial."""
    contenidos = []
    for msg in historial:
        role = "model" if msg["role"] == "assistant" else "user"
        contenidos.append(types.Content(role=role, parts=[types.Part(text=msg["content"])]))
    return contenidos


async def generar_respuesta(mensaje: str, historial: list[dict]) -> str:
    """
    Genera una respuesta usando la API de Gemini.

    Args:
        mensaje: El mensaje nuevo del usuario
        historial: Mensajes anteriores de este contacto. Vacío == primer mensaje,
                   así se decide si corresponde el saludo con nombre.

    Returns:
        La respuesta generada por Gemini
    """
    if not mensaje or len(mensaje.strip()) < 2:
        return obtener_mensaje_fallback()

    es_primer_mensaje = len(historial) == 0
    system_prompt = cargar_system_prompt(es_primer_mensaje)

    contenidos = _a_formato_gemini(historial)
    contenidos.append(types.Content(role="user", parts=[types.Part(text=mensaje)]))

    try:
        response = await client.aio.models.generate_content(
            model=MODEL,
            contents=contenidos,
            config=types.GenerateContentConfig(
                system_instruction=system_prompt,
                max_output_tokens=1024,
            ),
        )
        respuesta = response.text
        logger.info("Respuesta generada con Gemini")
        return respuesta
    except Exception as e:
        logger.error(f"Error Gemini API: {e}")
        return obtener_mensaje_error()

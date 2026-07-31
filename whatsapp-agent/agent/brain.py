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

from agent.tools import registrar_cliente, enviar_foto, escalar_a_humano
from agent.catalogo import PRODUCTOS

load_dotenv()
logger = logging.getLogger("agentkit")

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
MODEL = "gemini-flash-latest"
MAX_RONDAS_TOOLS = 4  # límite de idas y vueltas de function calling por mensaje

KNOWLEDGE_PLACEHOLDER = "{KNOWLEDGE_CATALOGO}"

TOOLS = types.Tool(function_declarations=[
    types.FunctionDeclaration(
        name="registrar_cliente",
        description=(
            "Guardá o actualizá lo que sabés de este cliente. Llamala cada vez que "
            "aprendas algo nuevo: su nombre, si compró o decidió no comprar, qué "
            "producto le interesó, o el día/lugar de encuentro que acordaron. "
            "Podés llamarla varias veces en la misma charla."
        ),
        parameters=types.Schema(
            type=types.Type.OBJECT,
            properties={
                "nombre": types.Schema(type=types.Type.STRING, description="Nombre del cliente, si lo dijo"),
                "estado": types.Schema(
                    type=types.Type.STRING,
                    enum=["consultando", "compro", "no_compro"],
                    description="Estado de la venta con este cliente",
                ),
                "producto_interes": types.Schema(type=types.Type.STRING, description="Producto que le interesó o compró"),
                "encuentro": types.Schema(type=types.Type.STRING, description="Día y lugar acordado para la entrega, si se coordinó"),
                "notas": types.Schema(type=types.Type.STRING, description="Cualquier otro dato relevante del cliente"),
            },
        ),
    ),
    types.FunctionDeclaration(
        name="enviar_foto",
        description="Mandá la foto real de un producto del catálogo por WhatsApp.",
        parameters=types.Schema(
            type=types.Type.OBJECT,
            properties={
                "producto_id": types.Schema(
                    type=types.Type.STRING,
                    enum=list(PRODUCTOS.keys()),
                    description="Id del producto (ver catálogo)",
                ),
            },
            required=["producto_id"],
        ),
    ),
    types.FunctionDeclaration(
        name="escalar_a_humano",
        description="Avisale al dueño del negocio que este cliente necesita atención humana (reclamo, algo que no podés resolver, urgente).",
        parameters=types.Schema(
            type=types.Type.OBJECT,
            properties={
                "motivo": types.Schema(type=types.Type.STRING, description="Por qué hace falta un humano"),
            },
            required=["motivo"],
        ),
    ),
])


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


async def _ejecutar_tool(nombre: str, args: dict, telefono: str) -> dict:
    """Despacha una llamada a función que pidió Gemini a la implementación real."""
    try:
        if nombre == "registrar_cliente":
            return await registrar_cliente(telefono, **args)
        if nombre == "enviar_foto":
            return await enviar_foto(telefono, **args)
        if nombre == "escalar_a_humano":
            return await escalar_a_humano(telefono, **args)
        return {"ok": False, "error": f"Herramienta desconocida: {nombre}"}
    except Exception as e:
        logger.error(f"Error ejecutando tool {nombre}: {e}")
        return {"ok": False, "error": str(e)}


async def generar_respuesta(mensaje: str, historial: list[dict], telefono: str) -> str:
    """
    Genera una respuesta usando la API de Gemini, ejecutando las herramientas
    (registrar_cliente, enviar_foto, escalar_a_humano) que el modelo pida en
    el camino.

    Args:
        mensaje: El mensaje nuevo del usuario
        historial: Mensajes anteriores de este contacto. Vacío == primer mensaje,
                   así se decide si corresponde el saludo con nombre.
        telefono: Número del contacto — se lo pasamos a las tools sin que el
                  modelo tenga que repetirlo en cada llamada.

    Returns:
        La respuesta de texto final generada por Gemini
    """
    if not mensaje or len(mensaje.strip()) < 2:
        return obtener_mensaje_fallback()

    es_primer_mensaje = len(historial) == 0
    system_prompt = cargar_system_prompt(es_primer_mensaje)

    contenidos = _a_formato_gemini(historial)
    contenidos.append(types.Content(role="user", parts=[types.Part(text=mensaje)]))

    config = types.GenerateContentConfig(
        system_instruction=system_prompt,
        max_output_tokens=1024,
        tools=[TOOLS],
    )

    try:
        response = await client.aio.models.generate_content(model=MODEL, contents=contenidos, config=config)

        for _ in range(MAX_RONDAS_TOOLS):
            partes = response.candidates[0].content.parts or []
            llamadas = [p.function_call for p in partes if p.function_call]
            if not llamadas:
                break

            contenidos.append(response.candidates[0].content)
            partes_resultado = []
            for llamada in llamadas:
                resultado = await _ejecutar_tool(llamada.name, dict(llamada.args or {}), telefono)
                partes_resultado.append(types.Part.from_function_response(name=llamada.name, response=resultado))
            contenidos.append(types.Content(role="user", parts=partes_resultado))

            response = await client.aio.models.generate_content(model=MODEL, contents=contenidos, config=config)

        respuesta = response.text or obtener_mensaje_fallback()
        logger.info("Respuesta generada con Gemini")
        return respuesta
    except Exception as e:
        logger.error(f"Error Gemini API: {e}")
        return obtener_mensaje_error()

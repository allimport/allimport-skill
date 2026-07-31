# tests/test_local.py — Simulador de chat en terminal
# Generado por AgentKit

"""
Prueba el agente de All Import sin necesitar WhatsApp real.
Simula una conversación en la terminal, contacto nuevo cada vez que corrés
'limpiar' (así se puede probar el saludo del primer mensaje).
"""

import asyncio
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agent.brain import generar_respuesta
from agent.memory import inicializar_db, guardar_mensaje, obtener_historial, limpiar_historial

TELEFONO_TEST = "test-local-001"


async def main():
    await inicializar_db()

    print()
    print("=" * 55)
    print("   All Import — Test Local del Agente")
    print("=" * 55)
    print()
    print("  Escribí mensajes como si fueras un cliente.")
    print("  Comandos especiales:")
    print("    'limpiar'  — borra el historial (para probar el saludo inicial de nuevo)")
    print("    'salir'    — termina el test")
    print()
    print("-" * 55)
    print()

    while True:
        try:
            mensaje = input("Vos: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\n\nTest finalizado.")
            break

        if not mensaje:
            continue

        if mensaje.lower() == "salir":
            print("\nTest finalizado.")
            break

        if mensaje.lower() == "limpiar":
            await limpiar_historial(TELEFONO_TEST)
            print("[Historial borrado — el próximo mensaje va a saludar de nuevo]\n")
            continue

        historial = await obtener_historial(TELEFONO_TEST)

        print("\nAgente: ", end="", flush=True)
        respuesta = await generar_respuesta(mensaje, historial, TELEFONO_TEST)
        print(respuesta)
        print()

        await guardar_mensaje(TELEFONO_TEST, "user", mensaje)
        await guardar_mensaje(TELEFONO_TEST, "assistant", respuesta)


if __name__ == "__main__":
    asyncio.run(main())

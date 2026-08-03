# n8n + Agente de WhatsApp — investigación

Para el objetivo O2 (agente que responde + etiqueta + habla como vos). Investigado 2026.

## Qué es n8n
Automatizador visual (tipo "Zapier open-source"). Conectás nodos: "llega mensaje" →
"pensá con IA" → "respondé" → "guardá en planilla". Self-hosted en Docker = gratis.
Corre en tu compu o en un servidor barato (VPS ~5 USD/mes).

## Stack recomendado (todo gratis salvo tokens Claude)
| Pieza | Rol | Costo |
|---|---|---|
| **n8n** | El cerebro: decide qué hacer con cada mensaje | gratis (self-host Docker) |
| **WAHA** (WhatsApp HTTP API) | Puente con WhatsApp sin API oficial de Meta | gratis (Docker) |
| **Claude API** | Genera la respuesta con tu tono | pagás tokens (barato por chat) |
| **Google Sheets / Excel** | Guarda conversaciones + ficha de cliente (O3) | gratis |

> Alternativa "oficial": WhatsApp Business API de Meta (más trámite, número dedicado).
> WAHA usa tu WhatsApp común — más fácil para arrancar solo.

## Cómo funciona (flujo)
1. Llega mensaje al WhatsApp → WAHA lo manda a n8n (webhook).
2. n8n arma el prompt: system = `VOZ-AGUS.md` + catálogo + reglas + historial del cliente.
3. Claude responde con tu tono.
4. n8n manda la respuesta por WAHA.
5. n8n **etiqueta** (compró/potencial/curioso) y **upsert** la ficha del cliente en la planilla.
6. Si es complejo → no responde solo, te avisa (handoff).

## Horario
Nodo de n8n "solo entre HH:MM y HH:MM". Fuera de hora: responde un mensaje puente
("te leo, mañana te confirmo") y etiqueta, sin cerrar venta.

## Qué necesita de vos (🤝)
- Compu/VPS con Docker (💻).
- Tu número de WhatsApp para vincular WAHA (escaneás QR, como WhatsApp Web).
- API key de Anthropic (Claude) — variable de entorno, nunca en el código.
- Los 3 datos de `OBJETIVOS.md` (voz, horario, si cierra ventas).

## Plantillas base (revisar antes de usar)
- n8n template "AI-powered Telegram & WhatsApp business agent"
- Stack "n8n + Chatwoot + WAHA" (soporte al cliente open-source)
- Guía freeCodeCamp "Self-Hosted WhatsApp Bot with n8n and WAHA"

## Riesgos
- WAHA usa tu WhatsApp personal: no mandar spam masivo (mismo riesgo de ban del video 10).
  Esto es para **responder** a quien te escribe, no para outbound masivo.
- Guardar teléfonos = datos personales: planilla privada, no compartir.

## Próximo paso cuando arranquemos O2
1. Perfil de voz (`VOZ-AGUS.md`) — necesito tus mensajes.
2. Levantar n8n + WAHA en Docker (te doy los comandos).
3. Armar el workflow (webhook → Claude → responder → planilla).
4. Probar con vos mismo antes de abrirlo a clientes.

# 02 — NEGOCIO (All Import: todo lo que necesitás saber del negocio)

Contexto de negocio para tus respuestas y prompts, Gemini. Si algo no está acá, preguntale al dueño — no lo inventes.

## Identidad
- **All Import** · Córdoba, Argentina · Instagram **@allimport.cba** · WhatsApp **+54 9 351 738 3945**.
- Importador y revendedor de **producto físico**, venta directa con **entrega en mano** (el cliente ve el producto antes de pagar).
- El dueño **trabaja solo**. Herramientas pagas: Claude + Gemini (+ Higgsfield si hace falta), ~USD 60/mes. No usa ChatGPT.

## Catálogo actual (fuente única: `web/src/components/site/data.ts`)
- Camisetas de fútbol réplica (Argentina, Messi 10) — $45.000 ARS.
- Auriculares TWS Pro — $32.000 ARS.
- Parlante bluetooth · power bank · cables (lightning / USB-C) · combo · vaper.
- Naming **trademark-safe**: nunca nombrar marcas registradas (no "AirPods", no "JBL", no clubes/ligas). Pendiente: renombrar "Kit iPhone Premium".
- Estados honestos de stock: `disponible` / `ingresando` / `proximo`. Sin escasez falsa.

## Modelo de negocio real (foco desde el PDF del Grupo 1% — vigente)
**El core es mayorista/reventa + mentoría**, no venta minorista suelta. Cliente objetivo:
**18-28 años, con algo de ahorro, que quiere empezar a emprender** (no necesariamente
consumidor final). Loop: contenido en `@_agus_moreno_` (marca personal, no `@allimport.cba`)
atrae emprendedores → el agente de WhatsApp asesora y arma combos → el dueño cierra y
acompaña. Diferencial explícito (frase real del dueño): *"No solo te llevás los mejores
productos de reventa, contás conmigo para lo que sea — eso normalmente te lo venden en
grupos de asesoramiento por más de 150 dólares."*
También existe venta minorista (consumidor final), pero es secundaria.

## Clientes y propuesta de valor
- Cliente primario: quiere emprender, 18-28, Córdoba y alrededores, presupuesto variable.
- Cliente secundario (minorista): consumidor final que compra por impulso o regalo.
- Propuesta: *"Importamos lo que todos quieren, al precio que nadie ofrece, y te lo ponemos en la mano para que lo veas antes de pagar."*
- Diferenciadores: entrega en mano (confianza) · precio por importación directa · trato personal · **mentoría/acompañamiento incluido en la compra mayorista**.

## Canales
- **Hoy:** WhatsApp (agente, ver abajo) + Instagram (marca personal `@_agus_moreno_` es el
  foco de crecimiento; `@allimport.cba` queda de vidriera/catálogo).
- **Futuro:** MercadoLibre + e-commerce propio.
- **Segunda línea de negocio:** vender webs y agentes de WhatsApp a terceros.

## Agente de WhatsApp — reglas de negocio clave
Spec completa en `allimport/contenido/AGENTE-WHATSAPP.md` del repo; acá solo lo que Gemini necesita
saber para no proponer nada que la contradiga:
- **Horario:** 12:00-19:00 (el dueño está en la facu). Fuera de hora: mensaje puente + etiqueta, no cierra nada.
- **El agente NUNCA cobra ni pide pago.** Asesora, arma el pedido, sugiere entrega, y
  **avisa al dueño** (handoff) — el dueño siempre confirma la venta y cobra.
- Flujo: pide nombre → ¿mayorista o minorista? → si mayorista: presupuesto + "¿primera vez
  emprendiendo?" → arma combo → si minorista: asesora el producto puntual.
- **Córdoba capital/cercanías:** sugiere punto de encuentro sin costo (bar, parque, Olmos,
  Buen Pastor) o envío ~precio de un Uber moto.
- **Fuera de Córdoba:** informa 100% pago adelantado + despacho al día siguiente + envío lo
  paga el cliente. En mayorista (~10+ productos) el envío lo gestiona el proveedor.
- **Pago:** solo transferencia y efectivo. El agente informa, no cobra.
- **Garantía:** grabar el momento de abrir el paquete (mayorista); sin daño aparente → reembolso o cambio.
- **Fuera de catálogo:** nunca dice "no tengo" — dice "te lo consigo".
- Stack técnico: n8n + WAHA + Claude API + planilla (ver `allimport/_research/n8n-whatsapp.md`). Sin
  outbound masivo — solo responde a quien escribe (opt-in).

## Restricciones de marketing (INNEGOCIABLES)
- **Meta/Instagram Ads: prohibido anunciar réplicas y vapers** → ban de cuenta. Esos productos van por orgánico + WhatsApp. Accesorios genéricos sí se pueden anunciar.
- **Nada de DMs masivos / spam** en Instagram o WhatsApp → ban. Solo opt-in: se responde a quien escribe o comenta.
- Sin escasez ni urgencia falsas. Sin prometer lo que no se cumple.

## Calendario comercial (Argentina)
Día del Padre (jun) · Día del Niño (ago) · Día de la Madre (oct) · Navidad y Reyes · Hot Sale (may) · Black Friday (nov) · San Valentín (feb) · vuelta al cole (feb-mar).
**Palanca #1: partidos de la Selección / Copa América / Mundial** → pico de venta de camisetas. Cada fecha merece un mini-plan: producto recomendado + mensaje + canal.

## Productos recomendados a sumar (evaluados, no comprados)
Smartwatch · secador estilo Dyson · blind box coleccionable · consola retro · mini proyector. Criterio: livianos, alto margen, regalables.

## Marca y voz
- Colores: navy oscuro `#0a0f1a`, cyan `#00d4d4`, blanco. Tipografía: Montserrat Alternates.
- Estética: "vitrina nocturna" — producto premium sobre fondo negro, intro 3D.
- Voz: argentino, cercano, directo, sin humo. Toda pantalla nueva respeta estos colores y tiene CTA a WhatsApp.

## Datos que NO tenemos (preguntar al dueño antes de planificar con ellos)
- Margen aproximado por categoría · proveedor y tiempos de importación · ticket promedio y volumen mensual · talles de niño en camisetas · si ya hay algún interesado en comprarle una web/agente.

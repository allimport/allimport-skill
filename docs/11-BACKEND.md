# 11 — Backend (FUTURO)

> ⚠️ **Hoy NO existe backend.** Este documento prepara la arquitectura para cuando exista (Ola 4). No inventa detalle: fija principios y decisiones ya tomadas.

## Propósito
Definir de antemano cómo será el backend/producto de All Import, para arrancarlo con estándar.

## Alcance
El producto real (tienda / e-commerce / agente de WhatsApp con estado). Puede vivir en un módulo de este repo o en un repo aparte (decisión de Ola 4).

## Stack previsto
- **Supabase** (Postgres + Auth + Storage + Edge Functions) como backend por defecto.
- Next.js (App Router) para las partes con servidor, si aplica.
- Integraciones: WhatsApp Business API (Meta o Twilio), Meta Graph/Catalog, MercadoLibre API, pagos (a definir).

## Responsabilidades (cuando exista)
Catálogo con stock real, pedidos, clientes, integración WhatsApp/IG, panel.

## Seguridad (obligatoria desde el día 1)
Aplicar los prompts de `_research/prompts-utiles.md`: **RLS** en Supabase, **CORS** restringido, credenciales en **env vars**, **rate limiting**, **sanitizar inputs**. (Origen: videos #04/#12.)

## Migraciones
**Aditivas e idempotentes** (`IF NOT EXISTS`). Versionadas. Probar en branch de Supabase antes de prod. Nunca tocar prod directo.

## Qué NO hacer (todavía)
- No construir backend antes de que el negocio lo pida.
- No adelantar Postgres MCP / staging sin producto (error del informe original de Gemini).

## Herramientas
Supabase (+ MCP), Supabase CLI, migraciones versionadas.

## Errores comunes (a evitar)
- Esquema sin RLS → cualquiera ve datos de otros.
- Secretos en el código.

## Checklist para arrancar el backend
- [ ] ¿El negocio lo necesita? · [ ] ¿Supabase con RLS? · [ ] ¿migraciones idempotentes? · [ ] ¿seed reproducible? · [ ] ¿staging?

## Mejoras futuras
Definir el modelo de datos (productos, pedidos, clientes) cuando se dispare Ola 4.

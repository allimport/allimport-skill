---
name: allimport-crm
description: Gestiona la base de clientes de All Import (planilla con etiquetas compró/potencial/curioso). Use when the user asks to add/update a client, "cargá este cliente", "quién compró", "clientes potenciales", seguimiento de WhatsApp, o exportar la lista. Trabaja sobre proveedores/base-datos-clientes-template.csv y respeta las etiquetas del plan. Datos personales = privados, nunca commitear la planilla real llena.
---

# All Import — CRM de clientes

Maneja la memoria de clientes: quién es, qué compró, en qué etapa está, cómo seguirlo.

## Cuándo usar
- "Cargá/actualizá este cliente", "quién compró", "clientes potenciales", "a quién le hago
  seguimiento", "exportá la lista".
- Cuando el agente de WhatsApp (O2) registra un contacto nuevo.

## Archivo base
`proveedores/base-datos-clientes-template.csv` — separador `;`. Columnas:
`nombre;fecha;producto;monto;pago;envio_retiro;telefono;etiqueta` (+ `notas` opcional).

## Etiquetas (del plan, fijas)
- **compró** — ya compró al menos una vez.
- **potencial** — preguntó por un producto/precio, no cerró.
- **curioso** — interactuó (like/comentario/DM) sin intención clara.

## Reglas
1. Una fila por cliente. Si ya existe (mismo teléfono) → **actualizar**, no duplicar.
2. Fecha `dd/mm/aaaa`. Monto solo número (ARS).
3. Para leer/editar/ordenar/filtrar la planilla usar la skill `xlsx` (o CSV directo).
4. **Privacidad:** la planilla REAL (con teléfonos) es privada. NO commitearla al repo;
   solo se versiona el template vacío. Guardarla local.
5. Seguimiento: potencial → mensaje a las 24-48h; curioso → aportar valor, no vender.

## Salidas útiles
- "Lista de potenciales para seguir hoy" (filtra etiqueta=potencial, ordena por fecha).
- "Clientes que compraron este mes" (etiqueta=compró + rango de fecha).
- Alta rápida desde un mensaje: parsear nombre/producto/monto → agregar fila.

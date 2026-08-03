---
name: allimport-viral-research
description: Investiga qué es viral en el nicho de All Import (emprender 18-28, Córdoba) y por qué, antes de escribir guiones. Use when the user asks "qué está funcionando", "qué es viral", "investigá el mercado", "ideas de reel según tendencia", o antes de generar guiones/historias. Fija el nicho, usa trend-researcher + viral-hook-generator, y devuelve temas + formatos + ganchos con el porqué. Nada de métricas inventadas.
---

# All Import — Viral Research

Método fijo para investigar viralidad ANTES de producir contenido. Evita improvisar.

## Cuándo usar
- Antes de generar guiones/historias de la semana.
- Cuando el usuario pide "qué está funcionando / qué es viral / investigá el mercado".

## Nicho fijo (no re-preguntar)
- Cuenta: marca personal `@_agus_moreno_`.
- Cliente: **18-28 años, con algo de ahorro, quiere empezar a emprender**, Córdoba/Argentina.
- Regla de marca: nunca vender directo, nunca mostrar réplica a cámara, tono argentino.

## Proceso
1. **Fuentes:** usar el agente `trend-researcher` (contains-studio) + búsqueda web para
   temas/formatos que crecen en IG/TikTok en emprendimiento, ventas, "empezar de cero".
2. **Clasificar cada hallazgo** en: TEMA (de qué habla) · FORMATO (cómo: talking-head,
   POV, lista, storytime) · GANCHO (los primeros 3 seg) · **POR QUÉ funciona** (emoción:
   aspiración, miedo a quedarse atrás, prueba social, curiosidad).
3. **Filtrar** a lo que aplica al cliente 18-28 que quiere emprender (descartar lo que no).
4. **Salida:** 5 ideas accionables → cada una con tema + formato + gancho + por qué +
   cómo la baja All Import. Pasar los ganchos por `viral-hook-generator` para variantes.
5. Guardar hallazgos en `contenido/HALLAZGOS-VIRALES.md` (fecha + fuente). Sin inventar números.

## Salida esperada (plantilla)
```
## [fecha] Hallazgos
1. TEMA: ... | FORMATO: ... | GANCHO: "..." | POR QUÉ: ... | ALL IMPORT: ...
```

## Encadena con
- `viral-hook-generator` (variantes de gancho)
- `contenido/GANCHOS-Y-GUIONES.md` (estructura hook→problema→solución→prueba social→CTA)
- `contenido/VOZ-AGUS.md` (que suene a Agus)

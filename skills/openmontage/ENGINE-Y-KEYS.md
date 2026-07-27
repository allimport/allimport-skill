# OpenMontage — motor y keys (aparte de estas skills)

Acá están vendidas **solo las skills** de OpenMontage (el conocimiento/prompts que usa
Claude Code). El **motor de producción de video va aparte** y NO se commiteó al repo
(pesa ~161 MB: GPU/ffmpeg/python/node) — no corresponde meterlo en el repo de la marca.

## Qué funciona sin nada
Las skills se leen como guía. La generación con herramientas locales (Piper TTS, FFmpeg,
Remotion, stock de Archive.org) funciona **solo si instalás el motor** en tu máquina.

## Qué necesita cuenta/keys (🤝, de pago, opcional)
La generación de video/imagen por IA de OpenMontage pide keys en un `.env`:
`FAL_KEY`, `REPLICATE_API_TOKEN`, `HIGGSFIELD_API_KEY/SECRET`, `KLING_API_KEY`,
`GOOGLE_API_KEY`. Todas opcionales; sin ellas cae a alternativas gratis.

## Instalar el motor (💻 en tu máquina, NO en este repo)
```bash
git clone https://github.com/calesthio/OpenMontage && cd OpenMontage
make setup        # revisá el Makefile antes de correrlo
cp .env.example .env   # cargá solo las keys que tengas
```

**Recomendación:** para clips de producto ya tenés **Remotion** en `video/` (más simple,
bajo tu control). OpenMontage recién si querés producción de video pesada.
Fuente: https://github.com/calesthio/OpenMontage

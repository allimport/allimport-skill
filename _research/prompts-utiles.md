# Prompts útiles — biblioteca reutilizable
### Extraídos de los videos/fotos. Copiá y pegá cuando los necesites.

---

## 🔒 Seguridad — "Dile esto a Claude y protegé tu app/web" (#04 + #12)
Cuando tengas el producto con backend, corré estos:

1. **Row Level Security:** "Activá RLS en Supabase para que cada usuario solo vea sus propios datos."
2. **CORS:** "Configurá CORS para que solo mi app pueda hacer peticiones al backend."
3. **Variables de entorno:** "Mové todas las credenciales sensibles a variables de entorno." *(esto ya aplica al `.mcp.json`)*
4. **Rate limiting:** "Agregá rate limiting para limitar peticiones por usuario por minuto."
5. **Sanitizar inputs:** "Sanitizá todos los inputs para prevenir inyecciones SQL."
6. **Buscar vulnerabilidades:** "Revisá mi código y decime qué vulnerabilidades de seguridad tiene. Explicame cada una en términos simples y cómo arreglarla."
7. **Proteger endpoints:** "Analizá mis rutas de API y decime cuáles no tienen autenticación o validación. Dame el código para protegerlas."
8. **Validar datos:** "Revisá dónde recibo datos del usuario y decime si hay riesgo de inyección o datos maliciosos. Mostrame cómo validarlos correctamente."

---

## ⌨️ 5 comandos de Claude Code (#19)
- `/init` → crea `CLAUDE.md` (memoria del proyecto). **Al abrir carpeta nueva.**
- `/context` → muestra % de ventana usada. **Si sentís que se pierde.**
- `/compact` → comprime el chat guardando lo importante. **Antes de que se llene.** (entre tareas distintas, mejor `/clear`)
- `/plan` → modo plan: propone antes de ejecutar. **Cambios grandes/delicados.**
- `/agents` → crea subagentes con tarea fija. **Para repetir el mismo trabajo.**

---

## 🧠 7 prompts genéricos de pensamiento (#09)
1. **Anti-procrastinación:** "Tengo que hacer [tarea]. Partila en 5 micro-pasos de 10 min. Dame el primero ahora."
2. **Editor:** "Reescribí este texto como si lo publicara Harvard Business Review. Cortá lo innecesario, subí la autoridad."
3. **Abogado del diablo:** "Acá está mi idea. Dame las 5 razones por las que va a fracasar. Sé brutal."
4. **Ensayo:** "Simulá una reunión difícil. Sos el cliente escéptico. Yo presento. Empezá."
5. **Insight:** "Analizá este dato y decime qué NO estoy viendo."
6. **Títulos:** "Creá 10 títulos para este post. Los 3 mejores con justificación."
7. **Estratega:** "Sos mi estratega personal. Mi objetivo es [X]. Dame un plan de 30 días, semana por semana, con acciones específicas."

---

## 🛠️ Google Stitch → Claude Code (#11)
```
claude mcp add stitch \
  --transport http \
  --url "https://stitch.googleapis.com/mcp" \
  --header "X-Goog-Api-Key: <TU_API_KEY_PROPIA>"
```
⚠️ Nunca uses la key de un video. Generá la tuya en Google.

---

## 📁 Estructura "segundo cerebro" (#07 + #18)
Carpetas: `About Me` · `Projects` · `Templates` · `Claude Outputs`
Archivos base: `about-me.md` (quién sos, prioridades) · `anti-ai-style.md` (frases que Claude nunca debe usar).
Obsidian: abrir el vault sobre la carpeta `docs/` del repo (mismos archivos, sin sync).

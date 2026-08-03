---
tags: [infra, claude-code, remote-control]
aliases: [Remote Control, Claude en mi compu]
---

# Remote Control — Claude Code corriendo en la compu real

Función de Claude Code que permite controlar, desde el teléfono o el navegador, una
sesión de Claude que corre **en la compu del dueño** (acceso real a archivos, sin
intermediario de capturas). Útil para tareas de infraestructura local (Graphify, scripts,
fotos reales) — no reemplaza esta sesión de la nube para trabajo de repo/contenido.

## Requisito: Node.js
Claude Code CLI necesita Node.js instalado (distinto de Python, que ya está instalado).

### Ver si ya está
PowerShell:
```
node --version
npm --version
```
Si tira números de versión → ya está, saltar a "Instalar Claude Code CLI".
Si da error → instalar Node.js primero.

### Instalar Node.js (si falta)
1. `https://nodejs.org` → botón grande (versión LTS, recomendada).
2. Ejecutar el instalador → Next, Next, Install (dejar todo por defecto).
3. Cerrar y abrir PowerShell de nuevo.
4. Confirmar: `node --version`.

## Instalar Claude Code CLI
```
npm install -g @anthropic-ai/claude-code
```
Cuando termine:
```
claude --version
```
Primera vez puede pedir iniciar sesión con la cuenta de Anthropic (navegador se abre solo).

## Conectar (Remote Control)
1. En PowerShell, pararse en la carpeta del repo:
   ```
   cd "C:\Users\Bangho\Documents\allimport-skill\allimport-skill-claude-skills-workflow-audit-22vj5r"
   ```
2. Correr:
   ```
   claude remote-control
   ```
   (o el atajo `claude rc`)
3. Va a mostrar algo para escanear/vincular, o quedar esperando.
4. En el teléfono: app/web de Claude Code → **Código** → **Conecta tu computadora** →
   seleccionar la compu de la lista.

## Después de conectado
- Desde el teléfono se le puede pedir a Claude que corra comandos reales en esa carpeta:
  `graphify update _research`, correr el editor de fotos, el analizador de WhatsApp, etc.
- Es una sesión **separada** de la de la nube — igual pushea al mismo repo de GitHub.
- Cerrar la ventana de PowerShell corta la conexión.

## Seguridad
Le da a Claude acceso real a esa compu (archivos, comandos). Usar cuando haga falta,
no dejarlo corriendo de fondo sin necesidad.

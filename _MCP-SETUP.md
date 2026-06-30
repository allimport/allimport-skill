# MCP Setup

Ejemplo de `.mcp.json` para los servidores MCP usados por las skills de este repo. Copiá lo que necesites a la raíz del proyecto como `.mcp.json` y ajustá rutas/credenciales.

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    },
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase@latest"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "<your-access-token>"
      }
    },
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--figma-api-key=<your-figma-api-key>"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"]
    },
    "git": {
      "command": "uvx",
      "args": ["mcp-server-git", "--repository", "/path/to/repo"]
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": {
        "CONTEXT7_API_KEY": "<your-context7-key>"
      }
    }
  }
}
```

## Notas
- No commitees tokens/API keys reales: usá variables de entorno o un `.mcp.json` local ignorado por git.
- `filesystem` y `git` necesitan la ruta del repo/directorio permitido ajustada a tu entorno.
- Las skills `playwright-automation`, `browser-automation`, `agent-browser`, `visual-regression-testing` y `webapp-testing` dependen del servidor `playwright`.
- La skill `supabase-automation` / `nextjs-supabase-auth` depende del servidor `supabase`.
- Las skills `figma-generate-design` / `figma-implement-design` dependen del servidor `figma`.
- La skill `context7` depende del servidor `context7`.

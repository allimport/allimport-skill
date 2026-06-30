---
name: context7
description: 'Use when working with libraries or frameworks to get authoritative, up-to-date documentation via Context7 MCP. Expert in latest versions, best practices, and correct API syntax. Use for: Next.js routing, React hooks, Tailwind CSS, Supabase, Prisma, or any library/framework question.'
argument-hint: 'Ask about specific libraries/frameworks (e.g., "Next.js routing", "React hooks", "Tailwind CSS")'
---

# Context7 Documentation Expert

Use Context7 proactively whenever the task depends on **authoritative, current, version-specific external documentation** that is not present in the workspace context.

## When to use Context7

Use Context7 before making decisions or writing code when you need:

- **Framework/library API details** (method signatures, configuration keys, expected behaviors)
- **Version-sensitive guidance** (breaking changes, deprecations, new defaults)
- **Correctness or security-critical patterns** (auth flows, crypto usage)
- **Best-practice implementation constraints** (rate limits, quotas, supported formats)

Also use when:
- The user references a **specific framework/library version** (e.g., "Next.js 15", "React 19")
- You're about to recommend **non-trivial configuration**
- You're unsure whether an API exists, changed names, or got deprecated

Skip Context7 for purely local refactors, formatting, or logic fully derivable from the repo.

## CRITICAL RULE

**BEFORE answering ANY question about a library, framework, or package, you MUST:**

1. **STOP** - Do NOT answer from memory or training data
2. **IDENTIFY** - Extract the library/framework name
3. **CALL** `mcp_context7_resolve-library-id` with the library name
4. **SELECT** - Choose the best matching library ID
5. **CALL** `mcp_context7_get-library-docs` with that library ID
6. **ANSWER** - Use ONLY information from the retrieved documentation

**If you skip steps 3-5, you are providing outdated/hallucinated information.**

## Tool Workflow

```
1. resolve-library-id({ libraryName: "express" })
   → returns matching libraries with scores

2. get-library-docs({
     context7CompatibleLibraryID: "/expressjs/express",
     topic: "middleware"
   })
   → returns current documentation

3. Answer based on retrieved docs
```

## Efficiency Limits

- Do **not** call `resolve-library-id` more than **3 times** per question
- Do **not** call `get-library-docs` more than **3 times** per question
- Pick the best match and proceed; clarify only when the choice materially affects implementation

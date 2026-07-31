#!/usr/bin/env python3
"""Convierte historial de agente/knowledge base en un vault de Obsidian.

Lee mensajes (SQLite o JSON) y/o archivos de una carpeta de knowledge, arma
una entidad (nota .md) por contacto/archivo, detecta relaciones simples por
co-ocurrencia de palabras clave, y escribe el vault con [[wikilinks]] + un
index.md de entrada.
"""
import argparse
import json
import re
import sqlite3
from pathlib import Path


def slug(name: str) -> str:
    return re.sub(r"[^\w\- ]", "", name).strip().replace(" ", "-").lower() or "nota"


def load_sqlite_messages(path: Path) -> dict[str, list[str]]:
    """Espera una tabla con columnas (phone_number|contact, message|content)."""
    by_contact: dict[str, list[str]] = {}
    conn = sqlite3.connect(str(path))
    conn.row_factory = sqlite3.Row
    tables = [r[0] for r in conn.execute(
        "SELECT name FROM sqlite_master WHERE type='table'"
    )]
    for table in tables:
        cols = [r[1] for r in conn.execute(f"PRAGMA table_info({table})")]
        contact_col = next((c for c in cols if c in ("phone_number", "contact", "phone")), None)
        msg_col = next((c for c in cols if c in ("message", "content", "text", "body")), None)
        if not contact_col or not msg_col:
            continue
        for row in conn.execute(f"SELECT {contact_col}, {msg_col} FROM {table}"):
            contact, msg = row[0], row[1]
            if contact is None or msg is None:
                continue
            by_contact.setdefault(str(contact), []).append(str(msg))
    conn.close()
    return by_contact


def load_json_messages(path: Path) -> dict[str, list[str]]:
    data = json.loads(path.read_text(encoding="utf-8"))
    by_contact: dict[str, list[str]] = {}
    items = data if isinstance(data, list) else data.get("messages", [])
    for item in items:
        contact = str(item.get("phone_number") or item.get("contact") or "desconocido")
        msg = item.get("message") or item.get("content") or item.get("text") or ""
        if msg:
            by_contact.setdefault(contact, []).append(str(msg))
    return by_contact


def load_knowledge(folder: Path) -> dict[str, str]:
    entities = {}
    if not folder or not folder.is_dir():
        return entities
    for f in sorted(folder.iterdir()):
        if f.is_file() and f.suffix.lower() in (".txt", ".md"):
            entities[f.stem] = f.read_text(encoding="utf-8", errors="ignore")
    return entities


def detect_links(text: str, all_names: list[str]) -> set[str]:
    found = set()
    lowered = text.lower()
    for name in all_names:
        if len(name) > 2 and name.lower() in lowered:
            found.add(name)
    return found


def write_note(out_dir: Path, name: str, entity_type: str, body: str, links: set[str]) -> None:
    front = f"---\ntype: {entity_type}\ntags: [graphify, {entity_type}]\n---\n\n"
    content = f"# {name}\n\n{body.strip()}\n"
    if links:
        content += "\n## Relacionado\n" + "\n".join(f"- [[{l}]]" for l in sorted(links) if l != name) + "\n"
    (out_dir / f"{slug(name)}.md").write_text(front + content, encoding="utf-8")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--source", type=Path, help="Ruta a sqlite o json con mensajes")
    ap.add_argument("--source-type", choices=["sqlite", "json"], default="sqlite")
    ap.add_argument("--knowledge", type=Path, help="Carpeta con archivos .txt/.md a graphificar")
    ap.add_argument("--out", type=Path, required=True, help="Carpeta destino (vault de Obsidian)")
    args = ap.parse_args()

    args.out.mkdir(parents=True, exist_ok=True)

    contacts: dict[str, list[str]] = {}
    if args.source and args.source.exists():
        if args.source_type == "sqlite":
            contacts = load_sqlite_messages(args.source)
        else:
            contacts = load_json_messages(args.source)

    knowledge = load_knowledge(args.knowledge) if args.knowledge else {}

    all_names = list(contacts.keys()) + list(knowledge.keys())

    for contact, messages in contacts.items():
        body = "\n\n".join(f"> {m}" for m in messages)
        links = detect_links(body, all_names)
        write_note(args.out, contact, "contacto", body, links)

    for name, text in knowledge.items():
        links = detect_links(text, all_names)
        write_note(args.out, name, "knowledge", text, links)

    index_lines = ["---\ntype: index\ntags: [graphify]\n---\n", "# Índice del grafo\n"]
    if contacts:
        index_lines.append("## Contactos\n")
        index_lines += [f"- [[{c}]]" for c in sorted(contacts)]
    if knowledge:
        index_lines.append("\n## Knowledge base\n")
        index_lines += [f"- [[{k}]]" for k in sorted(knowledge)]
    (args.out / "index.md").write_text("\n".join(index_lines) + "\n", encoding="utf-8")

    print(f"Vault generado en {args.out} — {len(contacts)} contactos, {len(knowledge)} notas de knowledge.")


if __name__ == "__main__":
    main()

# agent/memory.py — Memoria de conversaciones y clientes
# Generado por AgentKit

"""
Sistema de memoria del agente. Guarda el historial de conversaciones y una
ficha por cliente (nombre, estado de venta, producto de interés, encuentro
acordado) usando SQLite (local) o PostgreSQL (producción — recomendado,
Render Free no tiene disco persistente).
"""

import os
from datetime import datetime
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, Text, DateTime, select, Integer
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./agentkit.db")

if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

engine = create_async_engine(DATABASE_URL, echo=False)
async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


class Mensaje(Base):
    """Modelo de mensaje en la base de datos."""
    __tablename__ = "mensajes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    telefono: Mapped[str] = mapped_column(String(50), index=True)
    role: Mapped[str] = mapped_column(String(20))  # "user" o "assistant"
    content: Mapped[str] = mapped_column(Text)
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class Cliente(Base):
    """Ficha de cliente — la arma y actualiza el agente durante la charla."""
    __tablename__ = "clientes"

    telefono: Mapped[str] = mapped_column(String(50), primary_key=True)
    nombre: Mapped[str | None] = mapped_column(String(120), nullable=True)
    estado: Mapped[str] = mapped_column(String(30), default="consultando")  # consultando | compro | no_compro
    producto_interes: Mapped[str | None] = mapped_column(String(200), nullable=True)
    encuentro: Mapped[str | None] = mapped_column(String(200), nullable=True)
    notas: Mapped[str | None] = mapped_column(Text, nullable=True)
    actualizado: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


async def inicializar_db():
    """Crea las tablas si no existen."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def guardar_mensaje(telefono: str, role: str, content: str):
    """Guarda un mensaje en el historial de conversación."""
    async with async_session() as session:
        mensaje = Mensaje(
            telefono=telefono,
            role=role,
            content=content,
            timestamp=datetime.utcnow(),
        )
        session.add(mensaje)
        await session.commit()


async def obtener_historial(telefono: str, limite: int = 20) -> list[dict]:
    """
    Recupera los últimos N mensajes de una conversación.
    Una lista vacía significa que este es el primer mensaje del contacto —
    brain.py lo usa para decidir si saludar con el nombre del primer mensaje.
    """
    async with async_session() as session:
        query = (
            select(Mensaje)
            .where(Mensaje.telefono == telefono)
            .order_by(Mensaje.timestamp.desc())
            .limit(limite)
        )
        result = await session.execute(query)
        mensajes = result.scalars().all()
        mensajes.reverse()
        return [{"role": msg.role, "content": msg.content} for msg in mensajes]


async def limpiar_historial(telefono: str):
    """Borra todo el historial de una conversación."""
    async with async_session() as session:
        query = select(Mensaje).where(Mensaje.telefono == telefono)
        result = await session.execute(query)
        mensajes = result.scalars().all()
        for msg in mensajes:
            await session.delete(msg)
        await session.commit()


async def guardar_cliente(telefono: str, **campos) -> None:
    """
    Crea o actualiza la ficha de un cliente. Sólo pisa los campos que vienen
    con valor — así el agente puede llamar esto varias veces en la misma
    charla sin borrar lo que ya sabía (ej: guarda el nombre en un mensaje y
    el producto de interés en otro).
    """
    campos = {k: v for k, v in campos.items() if v not in (None, "")}
    async with async_session() as session:
        cliente = await session.get(Cliente, telefono)
        if cliente is None:
            cliente = Cliente(telefono=telefono, **campos)
            session.add(cliente)
        else:
            for k, v in campos.items():
                setattr(cliente, k, v)
            cliente.actualizado = datetime.utcnow()
        await session.commit()


async def obtener_cliente(telefono: str) -> dict | None:
    """Devuelve la ficha de un cliente, o None si todavía no existe."""
    async with async_session() as session:
        cliente = await session.get(Cliente, telefono)
        if cliente is None:
            return None
        return {
            "telefono": cliente.telefono,
            "nombre": cliente.nombre,
            "estado": cliente.estado,
            "producto_interes": cliente.producto_interes,
            "encuentro": cliente.encuentro,
            "notas": cliente.notas,
        }


async def listar_clientes() -> list[dict]:
    """Devuelve todos los clientes — usado por el export a CSV/Excel."""
    async with async_session() as session:
        result = await session.execute(select(Cliente).order_by(Cliente.actualizado.desc()))
        clientes = result.scalars().all()
        return [
            {
                "telefono": c.telefono,
                "nombre": c.nombre or "",
                "estado": c.estado,
                "producto_interes": c.producto_interes or "",
                "encuentro": c.encuentro or "",
                "notas": c.notas or "",
                "actualizado": c.actualizado.isoformat() if c.actualizado else "",
            }
            for c in clientes
        ]

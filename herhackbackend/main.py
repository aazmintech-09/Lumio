"""Main application entry point"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from app.database import Base, engine
from app.routers import auth
from app.config import settings

from app.models.student import User  # noqa: F401
from app.models.topic import Topic, Concept  # noqa: F401
from app.models.learning import Question, Session, Attempt  # noqa: F401

# Create tables
Base.metadata.create_all(bind=engine)

# Create app
app = FastAPI(
    title="Lumio Adaptive Learning",
    version="0.0.1"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)

# Health check
@app.get("/health")
async def health():
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat()}

@app.get("/api/v1/health")
async def api_health():
    return {"status": "ok", "service": "lumio-api"}

@app.get("/")
async def root():
    return {"message": "Lumio API Running", "docs": "/docs"}
from sqlalchemy import Column, String, Text, Integer, DateTime, UUID, ForeignKey, Boolean, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.database import Base

class Question(Base):
    __tablename__ = "questions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    concept_id = Column(UUID(as_uuid=True), ForeignKey("concepts.id"), nullable=False)
    topic_id = Column(UUID(as_uuid=True), ForeignKey("topics.id"), nullable=False)
    prompt = Column(Text, nullable=False)
    question_type = Column(String(50), nullable=False)
    options = Column(JSON)
    correct_answer = Column(String(255), nullable=False)
    expected_response_time_sec = Column(Integer, default=20)
    difficulty_level = Column(Integer, default=5)
    explanation = Column(Text)
    explanation_visual = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

    concept = relationship("Concept", back_populates="questions")
    topic = relationship("Topic", back_populates="questions")
    attempts = relationship("Attempt", back_populates="question")

class Session(Base):
    __tablename__ = "sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    topic_id = Column(UUID(as_uuid=True), ForeignKey("topics.id"), nullable=False, index=True)
    session_type = Column(String(50), nullable=False)
    started_at = Column(DateTime, default=datetime.utcnow, index=True)
    ended_at = Column(DateTime)
    status = Column(String(50), default="in_progress")

    student = relationship("User", back_populates="sessions")
    attempts = relationship("Attempt", back_populates="session")

class Attempt(Base):
    __tablename__ = "attempts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    session_id = Column(UUID(as_uuid=True), ForeignKey("sessions.id"), nullable=False)
    question_id = Column(UUID(as_uuid=True), ForeignKey("questions.id"), nullable=False)
    concept_id = Column(UUID(as_uuid=True), ForeignKey("concepts.id"), nullable=False)
    student_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    response_given = Column(String(255))
    is_correct = Column(Boolean, nullable=False)
    response_time_ms = Column(Integer, nullable=False)
    attempt_number = Column(Integer, default=1)
    error_category = Column(String(100))
    confidence_level = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

    session = relationship("Session", back_populates="attempts")
    question = relationship("Question", back_populates="attempts")
    student = relationship("User", back_populates="attempts")
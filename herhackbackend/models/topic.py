from sqlalchemy import Column, String, Text, Integer, DateTime, UUID, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.database import Base

class Topic(Base):
    __tablename__ = "topics"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    level = Column(String(50), nullable=False, index=True)
    order_index = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)

    concepts = relationship("Concept", back_populates="topic")
    questions = relationship("Question", back_populates="topic")

    def __repr__(self):
        return f"<Topic {self.title}>"

class Concept(Base):
    __tablename__ = "concepts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    topic_id = Column(UUID(as_uuid=True), ForeignKey("topics.id"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    difficulty_baseline = Column(Integer, default=5)
    prerequisite_concept_ids = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    topic = relationship("Topic", back_populates="concepts")
    questions = relationship("Question", back_populates="concept")

    def __repr__(self):
        return f"<Concept {self.title}>"
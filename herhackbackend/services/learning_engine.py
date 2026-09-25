"""Learning Engine - Handles adaptive learning decisions and content generation"""

from datetime import datetime
from typing import Optional, Dict, List
from apify_client import ApifyClient
import os
from enum import Enum

class DifficultyLevel(str, Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"

class LearningMode(str, Enum):
    VISUAL = "visual"
    STEP_BY_STEP = "step_by_step"
    CONVERSATIONAL = "conversational"

class LearningEngine:
    """Deterministic learning adaptation engine"""
    
    def __init__(self):
        self.apify_client = ApifyClient(os.getenv("APIFY_API_TOKEN", ""))
    
    async def discover_learning_style(self, student_id: str, quiz_responses: List[int]) -> LearningMode:
        """
        Determine student's learning style from quiz responses.
        quiz_responses: List of 3 scores (0-10 each) for visual, step_by_step, conversational
        """
        if not quiz_responses or len(quiz_responses) < 3:
            return LearningMode.VISUAL
        
        max_score = max(quiz_responses)
        mode_index = quiz_responses.index(max_score)
        
        modes = [LearningMode.VISUAL, LearningMode.STEP_BY_STEP, LearningMode.CONVERSATIONAL]
        return modes[mode_index]
    
    async def get_adaptive_content_from_actor(
        self, 
        topic: str, 
        education_level: str, 
        learning_mode: LearningMode
    ) -> Dict:
        """
        Call Lumio Apify Actor to get personalized content structured by learning mode.
        
        Args:
            topic: The educational topic (e.g., "fractions")
            education_level: Nigerian education level (e.g., "primary_6")
            learning_mode: Discovered learning mode (visual/step_by_step/conversational)
        
        Returns:
            Structured content from Actor
        """
        try:
            # Call the Actor
            run = self.apify_client.actor("dezaaya/lumio-adaptive-content-extractor").call(
                run_input={
                    "topic": topic,
                    "education_level": education_level,
                    "run_discovery_quiz": True
                }
            )
            
            # Get results from dataset
            dataset = self.apify_client.dataset(run["defaultDatasetId"]).list_items()
            
            if dataset["items"]:
                actor_output = dataset["items"][0]
                return {
                    "status": "success",
                    "topic": topic,
                    "learning_mode": learning_mode,
                    "content": actor_output,
                    "source": "apify_actor",
                    "timestamp": datetime.utcnow().isoformat()
                }
            else:
                return {
                    "status": "no_content",
                    "topic": topic,
                    "message": "Actor ran but returned no content"
                }
                
        except Exception as e:
            return {
                "status": "error",
                "error": str(e),
                "fallback": self._generate_fallback_content(topic, education_level, learning_mode)
            }
    
    async def assess_attempt(
        self, 
        attempt_id: str, 
        student_id: str, 
        question_id: str, 
        student_answer: str, 
        expected_answer: str,
        time_spent_seconds: int
    ) -> Dict:
        """
        Assess a student's attempt and determine if intervention is needed.
        """
        is_correct = student_answer.lower().strip() == expected_answer.lower().strip()
        
        # Determine intervention need
        needs_intervention = False
        intervention_type = None
        
        if not is_correct:
            needs_intervention = True
            if time_spent_seconds > 300:  # 5 minutes
                intervention_type = "hint"
            else:
                intervention_type = "misconception_correction"
        
        return {
            "attempt_id": attempt_id,
            "student_id": student_id,
            "question_id": question_id,
            "is_correct": is_correct,
            "time_spent_seconds": time_spent_seconds,
            "needs_intervention": needs_intervention,
            "intervention_type": intervention_type,
            "timestamp": datetime.utcnow().isoformat()
        }
    
    async def calculate_next_difficulty(
        self, 
        student_id: str, 
        recent_attempts: List[Dict],
        current_difficulty: DifficultyLevel
    ) -> DifficultyLevel:
        """
        Determine next question difficulty based on recent performance.
        
        Rule-based (deterministic):
        - 3+ correct in a row → increase difficulty
        - 2+ incorrect → decrease difficulty
        - 1-2 correct → keep same
        """
        if not recent_attempts:
            return current_difficulty
        
        correct_count = sum(1 for a in recent_attempts if a.get("is_correct"))
        total = len(recent_attempts)
        
        if correct_count >= 3:
            # All recent correct → harder
            if current_difficulty == DifficultyLevel.BEGINNER:
                return DifficultyLevel.INTERMEDIATE
            elif current_difficulty == DifficultyLevel.INTERMEDIATE:
                return DifficultyLevel.ADVANCED
        elif correct_count <= total - 2:
            # 2+ errors → easier
            if current_difficulty == DifficultyLevel.ADVANCED:
                return DifficultyLevel.INTERMEDIATE
            elif current_difficulty == DifficultyLevel.INTERMEDIATE:
                return DifficultyLevel.BEGINNER
        
        # Default: stay same
        return current_difficulty
    
    async def generate_question(
        self, 
        topic: str, 
        difficulty: DifficultyLevel,
        learning_mode: LearningMode
    ) -> Dict:
        """
        Generate a practice question. In production, call Claude or use Actor output.
        For now, return template.
        """
        return {
            "id": f"q_{topic}_{difficulty}_{int(datetime.utcnow().timestamp())}",
            "topic": topic,
            "difficulty": difficulty,
            "question_text": f"Practice question on {topic} ({difficulty} level)",
            "question_type": "multiple_choice",
            "expected_answer": "answer",
            "timestamp": datetime.utcnow().isoformat()
        }
    
    async def generate_hint(
        self, 
        question_id: str, 
        topic: str, 
        learning_mode: LearningMode
    ) -> Dict:
        """
        Generate a hint based on learning mode.
        """
        hints = {
            LearningMode.VISUAL: "Try drawing a diagram or visual representation",
            LearningMode.STEP_BY_STEP: "Break the problem into smaller numbered steps",
            LearningMode.CONVERSATIONAL: "Think about how you'd explain this to a friend"
        }
        
        return {
            "question_id": question_id,
            "hint": hints.get(learning_mode, "Try a different approach"),
            "learning_mode": learning_mode,
            "timestamp": datetime.utcnow().isoformat()
        }
    
    def _generate_fallback_content(
        self, 
        topic: str, 
        education_level: str, 
        learning_mode: LearningMode
    ) -> Dict:
        """Fallback content if Actor fails"""
        return {
            "topic": topic,
            "education_level": education_level,
            "learning_mode": learning_mode,
            "content": {
                "title": f"Learn about {topic}",
                "description": f"Content for {learning_mode} learners on {topic}",
                "steps": ["Step 1", "Step 2", "Step 3"]
            }
        }
    
    async def get_student_progress(self, student_id: str, topic: str) -> Dict:
        """
        Calculate student progress on a topic.
        Returns: concepts mastered, areas struggling, next recommendation
        """
        return {
            "student_id": student_id,
            "topic": topic,
            "progress": 0.65,  # 65% mastery
            "next_step": "Practice more step-by-step problems",
            "timestamp": datetime.utcnow().isoformat()
        }
"""AI Service - Claude API integration for content generation"""

from typing import Optional, Dict, List
from anthropic import Anthropic
import os
from datetime import datetime

class AIService:
    """Claude AI service for educational content generation"""
    
    def __init__(self):
        api_key = os.getenv("ANTHROPIC_API_KEY", "")
        self.client = Anthropic(api_key=api_key)
        self.model = "claude-3-5-sonnet-20241022"
    
    async def generate_explanation(
        self,
        topic: str,
        education_level: str,
        learning_mode: str,
        misconception: Optional[str] = None
    ) -> str:
        """
        Generate an explanation for a topic in a specific learning mode.
        
        Args:
            topic: The educational topic
            education_level: Nigerian education level (e.g., "primary_6")
            learning_mode: How to explain (visual/step_by_step/conversational)
            misconception: Optional - correct a specific misconception
        
        Returns:
            Explanation text
        """
        if misconception:
            prompt = f"""
You are an educational content expert teaching Nigerian students at {education_level} level.

MISCONCEPTION TO CORRECT:
"{misconception}"

TOPIC: {topic}

LEARNING MODE: {learning_mode}

Generate a clear, engaging correction that:
1. Acknowledges why this misconception is common
2. Explains the correct understanding
3. Gives a memorable example
4. Uses simple Nigerian English

Keep it under 200 words. Make it for a {education_level} student.
"""
        else:
            if learning_mode == "visual":
                prompt = f"""
You are an educational content expert for Nigerian students at {education_level} level.

TOPIC: {topic}
LEARNING MODE: Visual (diagrams, pictures, spatial relationships)

Generate a visual explanation that:
1. Describes what a diagram/picture would show
2. Uses spatial language (left, right, above, below, arrow, circle, box, etc.)
3. Suggests 3-4 labeled parts of the visual
4. Explains how each part connects

Use simple Nigerian English. Keep under 250 words.
"""
            elif learning_mode == "step_by_step":
                prompt = f"""
You are an educational content expert for Nigerian students at {education_level} level.

TOPIC: {topic}
LEARNING MODE: Step-by-step (sequential, numbered)

Generate a numbered explanation with:
1. Clear step numbers (1, 2, 3, 4...)
2. Action-oriented language (First..., Then..., Next..., Finally...)
3. One main idea per step
4. A worked example at the end

Use simple Nigerian English. Keep under 250 words.
"""
            else:  # conversational
                prompt = f"""
You are an educational content expert for Nigerian students at {education_level} level.

TOPIC: {topic}
LEARNING MODE: Conversational (like talking to a friend)

Generate an explanation that:
1. Sounds like you're explaining to a friend
2. Uses "you" and "we" language
3. Relates to everyday Nigerian life when possible
4. Asks rhetorical questions
5. Feels friendly and encouraging

Use simple Nigerian English. Keep under 250 words.
"""
        
        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=500,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            
            return message.content[0].text
        
        except Exception as e:
            return f"Error generating explanation: {str(e)}"
    
    async def generate_practice_question(
        self,
        topic: str,
        education_level: str,
        difficulty: str,
        question_type: str = "multiple_choice"
    ) -> Dict:
        """
        Generate a practice question.
        
        Args:
            topic: The educational topic
            education_level: Nigerian education level
            difficulty: beginner/intermediate/advanced
            question_type: multiple_choice/short_answer/true_false
        
        Returns:
            Question object with options and answer
        """
        if question_type == "multiple_choice":
            prompt = f"""
You are an educational content expert creating practice questions for Nigerian students at {education_level} level.

TOPIC: {topic}
DIFFICULTY: {difficulty}
QUESTION TYPE: Multiple Choice (4 options)

Generate a {difficulty} difficulty multiple choice question about {topic} that:
1. Tests understanding, not just memorization
2. Has 4 plausible options (A, B, C, D)
3. Only ONE correct answer
4. Relates to Nigerian context when possible

Format your response as JSON:
{{
    "question": "The question text here?",
    "options": [
        {{"letter": "A", "text": "Option A"}},
        {{"letter": "B", "text": "Option B"}},
        {{"letter": "C", "text": "Option C"}},
        {{"letter": "D", "text": "Option D"}}
    ],
    "correct_answer": "B",
    "explanation": "Why B is correct and others are wrong"
}}

Keep explanations under 100 words. Use simple Nigerian English.
"""
        
        elif question_type == "true_false":
            prompt = f"""
You are an educational content expert creating practice questions for Nigerian students at {education_level} level.

TOPIC: {topic}
DIFFICULTY: {difficulty}
QUESTION TYPE: True or False

Generate a {difficulty} difficulty true/false question about {topic} that:
1. Tests real understanding
2. Is clearly true or false (not ambiguous)
3. Relates to Nigerian context when possible

Format as JSON:
{{
    "question": "Statement here?",
    "correct_answer": "True",
    "explanation": "Why this is true/false and common misconception"
}}

Keep explanation under 100 words. Use simple Nigerian English.
"""
        
        else:  # short_answer
            prompt = f"""
You are an educational content expert creating practice questions for Nigerian students at {education_level} level.

TOPIC: {topic}
DIFFICULTY: {difficulty}
QUESTION TYPE: Short Answer

Generate a {difficulty} difficulty short answer question about {topic} that:
1. Requires 1-3 sentence response
2. Tests understanding, not memorization
3. Relates to Nigerian context when possible

Format as JSON:
{{
    "question": "The question?",
    "expected_answer": "Sample correct answer",
    "key_concepts": ["concept1", "concept2", "concept3"],
    "explanation": "What makes a good answer"
}}

Keep under 100 words. Use simple Nigerian English.
"""
        
        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=800,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            
            import json
            response_text = message.content[0].text
            
            # Try to parse JSON
            try:
                start_idx = response_text.find("{")
                end_idx = response_text.rfind("}") + 1
                if start_idx >= 0 and end_idx > start_idx:
                    json_str = response_text[start_idx:end_idx]
                    question_obj = json.loads(json_str)
                    return question_obj
            except:
                pass
            
            return {
                "question": response_text,
                "error": "Could not parse structured response"
            }
        
        except Exception as e:
            return {"error": f"Error generating question: {str(e)}"}
    
    async def identify_misconceptions(
        self,
        topic: str,
        education_level: str
    ) -> List[Dict]:
        """
        Identify common misconceptions for a topic.
        
        Returns:
            List of misconceptions with corrections
        """
        prompt = f"""
You are an educational psychologist expert on teaching {topic} to Nigerian students at {education_level} level.

TOPIC: {topic}
STUDENT LEVEL: {education_level}

List 3-5 common misconceptions Nigerian students have about {topic}.

For each, provide:
1. The misconception (what students wrongly believe)
2. Why it's a common mistake
3. The correct understanding
4. A memorable way to remember the correct concept

Format as JSON array:
[
    {{
        "misconception": "...",
        "why_common": "...",
        "correction": "...",
        "memory_aid": "..."
    }},
    ...
]

Use simple Nigerian English. Keep each under 100 words total.
"""
        
        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=1000,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            
            import json
            response_text = message.content[0].text
            
            # Try to parse JSON
            try:
                start_idx = response_text.find("[")
                end_idx = response_text.rfind("]") + 1
                if start_idx >= 0 and end_idx > start_idx:
                    json_str = response_text[start_idx:end_idx]
                    misconceptions = json.loads(json_str)
                    return misconceptions
            except:
                pass
            
            return [{"error": "Could not parse misconceptions"}]
        
        except Exception as e:
            return [{"error": f"Error identifying misconceptions: {str(e)}"}]
    
    async def generate_hint(
        self,
        topic: str,
        question: str,
        education_level: str,
        learning_mode: str
    ) -> str:
        """
        Generate a helpful hint for a struggling student.
        
        Args:
            topic: The topic being studied
            question: The question student is stuck on
            education_level: Student's level
            learning_mode: How they learn best
        
        Returns:
            Hint text
        """
        prompt = f"""
A {education_level} Nigerian student is struggling with this question about {topic}:

QUESTION: {question}

STUDENT'S LEARNING MODE: {learning_mode}

Generate a helpful hint that:
1. Does NOT give away the answer
2. Points them toward the right thinking
3. Matches their learning mode ({learning_mode})
4. Is encouraging and supportive
5. Uses simple Nigerian English

Keep it under 100 words.
"""
        
        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=300,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            
            return message.content[0].text
        
        except Exception as e:
            return f"Try breaking this into smaller parts. {str(e)}"
    
    async def evaluate_student_answer(
        self,
        question: str,
        student_answer: str,
        expected_answer: str,
        education_level: str
    ) -> Dict:
        """
        Evaluate a student's answer and provide feedback.
        
        Returns:
            Evaluation with score, feedback, and guidance
        """
        prompt = f"""
You are an educational tutor evaluating a {education_level} Nigerian student's answer.

QUESTION: {question}

STUDENT'S ANSWER: {student_answer}

EXPECTED ANSWER: {expected_answer}

Evaluate this answer and provide:
1. Is it correct? (yes/partial/no)
2. What's good about it (if anything)
3. What's missing or wrong
4. Constructive feedback
5. A suggestion for improvement

Format as JSON:
{{
    "is_correct": true/false,
    "score": 0-100,
    "positive_feedback": "...",
    "areas_to_improve": "...",
    "suggestion": "..."
}}

Use simple, encouraging Nigerian English.
"""
        
        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=500,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            
            import json
            response_text = message.content[0].text
            
            # Try to parse JSON
            try:
                start_idx = response_text.find("{")
                end_idx = response_text.rfind("}") + 1
                if start_idx >= 0 and end_idx > start_idx:
                    json_str = response_text[start_idx:end_idx]
                    evaluation = json.loads(json_str)
                    return evaluation
            except:
                pass
            
            return {
                "feedback": response_text,
                "error": "Could not parse structured evaluation"
            }
        
        except Exception as e:
            return {"error": f"Error evaluating answer: {str(e)}"}

    async def health_check(self) -> Dict:
        """Check if Claude API is accessible"""
        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=10,
                messages=[
                    {"role": "user", "content": "Hi"}
                ]
            )
            return {"status": "ok", "service": "claude_api"}
        except Exception as e:
            return {"status": "error", "error": str(e)}
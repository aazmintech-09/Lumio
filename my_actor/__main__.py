import asyncio
import json
import os
from apify import Actor
from google import genai


async def main() -> None:
    async with Actor() as actor:
        actor.log.info("🎓 Lumio AI Adaptive Learning Generator")

        # Get Actor input
        run_input = await actor.get_input() or {}

        topic = run_input.get(
            "topic",
            "fractions in Nigerian primary schools"
        )

        education_level = run_input.get(
            "education_level",
            "primary_6"
        )

        run_discovery = run_input.get(
            "run_discovery_quiz",
            True
        )

        actor.log.info(f"📚 Topic: {topic}")
        actor.log.info(f"📍 Level: {education_level}")

        # ---------------------------------------------------------
        # 1. LEARNING STYLE DISCOVERY
        # ---------------------------------------------------------

        if run_discovery:
            actor.log.info("🧠 Running learning style discovery quiz...")

            # Temporary demo discovery.
            # Later, this will use the student's actual quiz answers.
            detected_mode = "visual"

            actor.log.info(
                f"✅ Discovery complete! You learn best: {detected_mode}"
            )

        else:
            detected_mode = run_input.get(
                "teaching_mode",
                "visual"
            )

        # ---------------------------------------------------------
        # 2. GEMINI SETUP
        # ---------------------------------------------------------

        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            raise RuntimeError(
                "GEMINI_API_KEY environment variable is not set."
            )

        client = genai.Client(api_key=api_key)

        actor.log.info("🤖 Asking Gemini to generate the lesson...")

        # ---------------------------------------------------------
        # 3. PROMPT
        # ---------------------------------------------------------

        prompt = f"""
You are Lumio, an AI-powered adaptive learning system
for primary school students in Nigeria.

Create a complete educational lesson using these details:

Topic: {topic}
Education level: {education_level}
Student learning mode: {detected_mode}

The lesson MUST be:

- Educationally accurate
- Appropriate for a Nigerian primary-school student
- Appropriate for the student's education level
- Easy to understand
- Personalized for the student's learning mode

The student is a {detected_mode} learner.

For a visual learner:
- Use visual descriptions
- Use simple representations of concepts
- Use tables where useful
- Use comparisons
- Break ideas into clear steps
- Describe simple diagrams when helpful
- Use concrete examples

Use Nigerian-relevant examples where appropriate.

IMPORTANT:

DO NOT use placeholders.

DO NOT write:
- X
- Y
- Q1
- Q2
- "Answer"
- "Practice question"
- "Students often think X"
- "The correct understanding is Y"

Instead, create REAL educational content.

The lesson must contain:

1. A clear explanation of the topic.
2. Step-by-step teaching.
3. Several real examples.
4. Common misconceptions.
5. Corrections for those misconceptions.
6. Real practice questions.
7. Correct answers to the practice questions.

Return ONLY valid JSON.

Use exactly this structure:

{{
    "description": "A clear explanation of the topic.",

    "steps": [
        {{
            "step": 1,
            "content": "Actual teaching content."
        }},
        {{
            "step": 2,
            "content": "Actual teaching content."
        }},
        {{
            "step": 3,
            "content": "Actual teaching content."
        }}
    ],

    "examples": [
        {{
            "question": "A real example question.",
            "solution": "A clear step-by-step solution."
        }},
        {{
            "question": "Another real example question.",
            "solution": "A clear solution."
        }}
    ],

    "common_misconceptions": [
        {{
            "misconception": "A real misconception students may have.",
            "correction": "A clear correction."
        }},
        {{
            "misconception": "Another real misconception.",
            "correction": "The correct understanding."
        }}
    ],

    "practice_questions": [
        {{
            "question": "A real beginner question.",
            "difficulty": "beginner",
            "expected_answer": "The correct answer."
        }},
        {{
            "question": "A real intermediate question.",
            "difficulty": "intermediate",
            "expected_answer": "The correct answer."
        }},
        {{
            "question": "A real advanced question.",
            "difficulty": "advanced",
            "expected_answer": "The correct answer."
        }}
    ]
}}
"""

        # ---------------------------------------------------------
        # 4. CALL GEMINI
        # ---------------------------------------------------------

        max_attempts = 4
        generated_content = None

        for attempt in range(1, max_attempts + 1):

            try:
                actor.log.info(
                    f"🤖 Gemini request attempt {attempt}/{max_attempts}..."
                )

                interaction = client.interactions.create(
                    model="gemini-3.8-flash",
                    input=prompt
                )

                response_text = interaction.output_text

                if not response_text:
                    raise RuntimeError(
                        "Gemini returned an empty response."
                    )

                generated_content = json.loads(response_text)

                actor.log.info(
                    "✅ Gemini generated the lesson successfully!"
                )

                break

            except Exception as error:

                actor.log.warning(
                    f"⚠️ Gemini request failed: {error}"
                )

                if attempt < max_attempts:
                    wait_time = attempt * 3

                    actor.log.info(
                        f"⏳ Waiting {wait_time} seconds before retry..."
                    )

                    await asyncio.sleep(wait_time)

                else:
                    raise RuntimeError(
                        "Gemini failed after multiple attempts."
                    ) from error

        # ---------------------------------------------------------
        # 5. BUILD LUMIO OUTPUT
        # ---------------------------------------------------------

        structured = {
            "topic": topic,

            "education_level": education_level,

            "student_profile": {
                "discovered_learning_mode": detected_mode,
                "discovery_method": "adaptive quiz",
                "recommendation": (
                    f"Content structured for "
                    f"{detected_mode} learners"
                )
            },

            "concepts": [
                {
                    "id": "concept_001",

                    "title": topic,

                    "difficulty": 6,

                    "content_by_mode": {
                        detected_mode: {
                            "description": generated_content.get(
                                "description",
                                ""
                            ),

                            "steps": generated_content.get(
                                "steps",
                                []
                            ),

                            "examples": generated_content.get(
                                "examples",
                                []
                            )
                        }
                    },

                    "common_misconceptions": (
                        generated_content.get(
                            "common_misconceptions",
                            []
                        )
                    ),

                    "practice_questions": (
                        generated_content.get(
                            "practice_questions",
                            []
                        )
                    )
                }
            ],

            "metadata": {
                "nigerian_context": True,
                "personalized": True,
                "learning_mode_discovery": run_discovery,
                "ai_generated": True,
                "ai_model": "gemini-3.8-flash"
            }
        }

        # ---------------------------------------------------------
        # 6. SAVE TO APIFY DATASET
        # ---------------------------------------------------------

        await actor.push_data(structured)

        actor.log.info(
            "🎉 Lumio content generated by Gemini "
            "and saved to Dataset!"
        )


if __name__ == "__main__":
    asyncio.run(main())
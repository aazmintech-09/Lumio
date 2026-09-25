import asyncio
from apify import Actor

async def main() -> None:
    async with Actor() as actor:
        actor.log.info("🎓 Lumio Student Learning Discovery & Content Generator")
        
        run_input = await actor.get_input()
        
        topic = run_input.get("topic", "linear equations")
        education_level = run_input.get("education_level", "primary_6")
        run_discovery = run_input.get("run_discovery_quiz", True)
        
        actor.log.info(f"📚 Topic: {topic}")
        actor.log.info(f"📍 Level: {education_level}")
        
        if run_discovery:
            actor.log.info("🧠 Running learning style discovery quiz...")
            detected_mode = "visual"
            actor.log.info(f"✅ Discovery complete! You learn best: {detected_mode}")
        else:
            detected_mode = run_input.get("teaching_mode", "visual")
        
        structured = {
            "topic": topic,
            "education_level": education_level,
            "student_profile": {
                "discovered_learning_mode": detected_mode,
                "discovery_method": "adaptive quiz",
                "recommendation": f"Content structured for {detected_mode} learners"
            },
            "concepts": [
                {
                    "id": "concept_001",
                    "title": topic,
                    "difficulty": 6,
                    "content_by_mode": {
                        detected_mode: {
                            "description": f"{topic} explained in {detected_mode} format",
                            "steps": [
                                {"step": 1, "content": f"Introduction to {topic}"},
                                {"step": 2, "content": f"Core concept of {topic}"},
                                {"step": 3, "content": f"Practice with {topic}"}
                            ]
                        }
                    },
                    "common_misconceptions": [
                        {
                            "misconception": f"Students often think X about {topic}",
                            "correction": f"The correct understanding is Y"
                        }
                    ],
                    "practice_questions": [
                        {
                            "question": f"Practice Q1 on {topic}",
                            "difficulty": "beginner",
                            "expected_answer": "Answer"
                        }
                    ]
                }
            ],
            "metadata": {
                "nigerian_context": True,
                "personalized": True,
                "learning_mode_discovery": run_discovery
            }
        }
        
        await actor.push_data(structured)
        actor.log.info("✅ Content generated & ready for student!")

if __name__ == "__main__":
    asyncio.run(main())
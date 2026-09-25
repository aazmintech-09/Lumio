# Lumio Student Learning Discovery & Content Generator

**An Apify Actor that discovers how YOU learn best and generates personalized educational content.**

## The Problem

In Nigerian classrooms, teachers teach 40-70 students the same way.

**Facts:**
- 7 in 10 Nigerian children can't read by age 10
- One teacher per 70 students
- When you don't understand one way of teaching, there's no backup

**Result:** You fall behind.

---

## The Solution

This Actor:
1. **Discovers YOUR learning style** through adaptive quiz
2. **Generates content in YOUR mode** (visual, step-by-step, or conversational)
3. **Provides practice questions** targeted to your level
4. **Identifies misconceptions** so you don't get stuck

**Instead of one teacher teaching 70 ways the same way, you get content that fits HOW YOU LEARN.**

---

## How It Works

### Input
```json
{
  "topic": "fractions",
  "education_level": "primary_6",
  "run_discovery_quiz": true
}
```

### What Happens
1. Quick learning style quiz (visual/step-by-step/conversational)
2. System discovers: "You learn best with visual explanations"
3. Generates fractions content using diagrams, visual steps, examples
4. Includes common mistakes & practice questions

### Output
```json
{
  "topic": "fractions",
  "student_profile": {
    "discovered_learning_mode": "visual",
    "recommendation": "Content structured for visual learners"
  },
  "content": {
    "mode": "visual",
    "concepts": [...]
  },
  "practice_questions": [...]
}
```

---

## Why It's Different

✅ **Adaptive Discovery** - Finds YOUR learning style, not guessing
✅ **Personalized Content** - Content in THE way you learn
✅ **Practice Questions** - Targeted to your level & struggle areas
✅ **For African Students** - Built for Nigerian education context
✅ **No Competitor** - No Actor does learning style discovery

---

## Use Cases

- Students preparing for JAMB exams
- Students struggling in one-size-fits-all classrooms
- Tutoring centers personalizing lessons
- EdTech platforms adapting content
- Remote learning in low-bandwidth areas

---

## Monetization

**Pay-per-event:** $0.05 per personalized content generation

---

**Built for SCA 2026 Apify Hackathon**

*Your education, personalized to how YOU learn*
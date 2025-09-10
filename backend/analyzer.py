import re

TECH_SKILLS = [
    "python", "java", "c++", "c#", "javascript", "typescript", "react", "angular", "vue", "node", "express",
    "fastapi", "django", "flask", "spring", "ruby", "rails", "php", "laravel", "go", "rust", "swift", "kotlin",
    "aws", "azure", "gcp", "docker", "kubernetes", "terraform", "ansible", "jenkins", "git", "sql", "mysql",
    "postgresql", "mongodb", "redis", "oracle", "graphql", "rest", "pandas", "numpy", "scikit-learn",
    "tensorflow", "pytorch", "matlab", "hadoop", "spark", "tableau", "powerbi", "selenium", "cicd", "linux",
    "bash", "shell", "html", "css", "sass", "less", "webpack", "babel", "firebase", "heroku", "netlify"
]

SOFT_SKILLS = [
    "leadership", "communication", "teamwork", "management", "problem-solving", "critical thinking",
    "adaptability", "creativity", "collaboration", "ownership", "stakeholder management", "presentation",
    "mentoring", "decision making", "time management", "organization", "conflict resolution", "empathy",
    "negotiation", "active listening", "initiative", "attention to detail", "multitasking", "work ethic",
    "flexibility", "strategic planning", "customer service", "interpersonal skills"
]

TOOLS = [
    "git", "jira", "figma", "excel", "confluence", "slack", "trello", "notion", "microsoft office",
    "google workspace", "zoom", "teams", "asana", "monday.com", "tableau", "powerbi", "outlook", "visio",
    "draw.io", "github", "gitlab", "bitbucket", "postman", "swagger", "docker", "jenkins", "vscode",
    "pycharm", "intellij", "eclipse", "android studio", "xcode"
]

# Assign weights for scoring
WEIGHTS = {
    "tech": 3,
    "tools": 2,
    "soft": 1,
    "other": 0.5
}

def analyze_resume(resume_text: str, job_description: str):
    resume_text = resume_text.lower()
    job_description = job_description.lower()

    # Extract unique job keywords
    job_keywords = re.findall(r"\b\w+\b", job_description)
    job_keywords = list(set(job_keywords))

    matched, missing = [], []
    raw_score = 0
    potential_gain = 0  # impact from missing keywords

    for kw in job_keywords:
        # Decide category weight
        if kw in TECH_SKILLS:
            weight = WEIGHTS["tech"]
        elif kw in TOOLS:
            weight = WEIGHTS["tools"]
        elif kw in SOFT_SKILLS:
            weight = WEIGHTS["soft"]
        else:
            weight = WEIGHTS["other"]

        if kw in resume_text:
            matched.append(kw)
            raw_score += weight
        else:
            missing.append(kw)
            potential_gain += weight

    max_score = (len(job_keywords) * WEIGHTS["tech"]) if job_keywords else 1
    ats_score = round((raw_score / max_score) * 100, 2) if job_keywords else 0
    if ats_score > 100:
        ats_score = 100

    # Convert potential gain → percent impact
    totalImpact = round((potential_gain / max_score) * 100, 2) if job_keywords else 0

    # Strengths & weaknesses
    strengths, weaknesses = [], []
    if any(skill in resume_text for skill in TECH_SKILLS):
        strengths.append("Good technical skills coverage ✅")
    if any(skill in resume_text for skill in SOFT_SKILLS):
        strengths.append("Strong soft skills 🗣️")
    if "experience" in resume_text:
        strengths.append("Experience section present 📄")

    if len(missing) > 5:
        weaknesses.append("Missing many critical keywords ❌")
    if ats_score < 50:
        weaknesses.append("Resume is weakly tailored for this job 📉")
    if "education" not in resume_text:
        weaknesses.append("Education details missing 🎓")

    # Generate AI-style suggestions
    suggestions = []
    for kw in missing:
        if kw in TECH_SKILLS:
            suggestions.append(f"Highlight your {kw} projects in Skills or Experience.")
        elif kw in TOOLS:
            suggestions.append(f"Add {kw} to your Tools & Technologies section.")
        elif kw in SOFT_SKILLS:
            suggestions.append(f"Showcase {kw} in your Experience or Cover Letter.")
        else:
            suggestions.append(f"Include '{kw}' naturally in your resume where relevant.")

    return {
        "score": ats_score,                 # ✅ aligns with frontend
        "totalImpact": totalImpact,         # ✅ new: potential gain in %
        "matched_keywords": matched,
        "missing_keywords": missing,
        "strengths": strengths if strengths else ["No strong points detected"],
        "weaknesses": weaknesses if weaknesses else ["No major weaknesses found"],
        "suggestions": suggestions[:8]      # limit suggestions to top 8
    }

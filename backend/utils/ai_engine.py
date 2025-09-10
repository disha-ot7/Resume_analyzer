import re
import numpy as np
from typing import List, Dict

# Try semantic model; fallback to TF-IDF cosine if not installed
_USE_EMBEDDINGS = True
try:
    from sentence_transformers import SentenceTransformer, util
    _model = SentenceTransformer("all-MiniLM-L6-v2")
except Exception:
    _USE_EMBEDDINGS = False
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity

HARD_SKILLS = [
    "python","java","javascript","react","node","fastapi","django","flask",
    "sql","mongodb","postgres","aws","azure","gcp","docker","kubernetes",
    "git","ci/cd","linux","rest","graphql","pandas","numpy","tensorflow","pytorch"
]

SOFT_SKILLS = [
    "communication","leadership","teamwork","problem solving","time management",
    "adaptability","creativity","critical thinking","collaboration","ownership",
    "stakeholder management","presentation","mentoring","decision making"
]

def _semantic_similarity(a: str, b: str) -> float:
    if _USE_EMBEDDINGS:
        a_emb = _model.encode(a, convert_to_tensor=True, normalize_embeddings=True)
        b_emb = _model.encode(b, convert_to_tensor=True, normalize_embeddings=True)
        return float(util.cos_sim(a_emb, b_emb).cpu().item())
    # TF-IDF fallback
    vect = TfidfVectorizer(stop_words="english", max_features=8000)
    X = vect.fit_transform([a, b])
    sim = cosine_similarity(X[0:1], X[1:2])[0, 0]
    return float(sim)

def _find_keywords(text: str, keywords: List[str]) -> Dict[str, bool]:
    t = " " + re.sub(r"[^a-z0-9+.# ]", " ", text.lower()) + " "
    found = {}
    for kw in keywords:
        pattern = r"\b" + re.escape(kw.lower()) + r"\b"
        found[kw] = bool(re.search(pattern, t))
    return found

def _years_experience(text: str) -> int:
    matches = re.findall(r"(\d+)\+?\s*(years|yrs)", text, flags=re.I)
    if not matches: 
        return 0
    return max(int(m[0]) for m in matches)

def analyze_with_ai(resume_text: str, job_desc: str) -> dict:
    # Core similarity (semantic or TF-IDF)
    sim = _semantic_similarity(resume_text, job_desc)
    ats_score = int(round(sim * 100))

    # Keyword coverage
    jd_tokens = set(re.findall(r"[a-zA-Z#+]+", job_desc.lower()))
    resume_tokens = set(re.findall(r"[a-zA-Z#+]+", resume_text.lower()))
    missing_keywords = sorted(list((jd_tokens - resume_tokens)))[:20]

    # Skill breakdown
    hard_found = _find_keywords(resume_text, HARD_SKILLS)
    soft_found = _find_keywords(resume_text, SOFT_SKILLS)
    hard_pct = int(100 * (sum(hard_found.values()) / max(1, len(HARD_SKILLS))))
    soft_pct = int(100 * (sum(soft_found.values()) / max(1, len(SOFT_SKILLS))))

    skills_breakdown = (
        [{"name": k, "match": 100 if v else 0, "category": "Hard"} for k, v in hard_found.items()] +
        [{"name": k, "match": 100 if v else 0, "category": "Soft"} for k, v in soft_found.items()]
    )

    # Experience extraction
    yrs = _years_experience(resume_text)

    # Suggestions
    suggestions = []
    if ats_score < 70:
        suggestions.append("Tailor your summary to echo role-specific keywords from the JD.")
    if hard_pct < 40:
        suggestions.append("Add a 'Core Technical Skills' section with the most relevant tools/tech.")
    if soft_pct < 40:
        suggestions.append("Highlight collaboration and stakeholder examples to show soft skills.")
    if len(missing_keywords) > 0:
        suggestions.append("Weave missing keywords into bullets where they’re true and measurable.")
    if yrs == 0:
        suggestions.append("Quantify experience (e.g., 'Led 3-person team for 2 years on X').")

    return {
        "ats_score": ats_score,
        "skills_breakdown": skills_breakdown,
        "hard_skills_pct": hard_pct,
        "soft_skills_pct": soft_pct,
        "years_experience": yrs,
        "missing_keywords": missing_keywords,
        "suggestions": suggestions[:8]
    }

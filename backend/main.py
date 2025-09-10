from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from utils.resume_parser import parse_resume 
from analyzer import analyze_resume as analyze_resume_logic

# ✅ Create FastAPI app
app = FastAPI()

# ✅ Allow frontend (React) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Health check route
@app.get("/")
def home():
    return {"message": "Resume Analyzer API is running 🚀"}

# ✅ Resume Analysis endpoint
@app.post("/analyze_resume")
async def analyze_resume_endpoint(
    file: UploadFile = File(...),
    job_description: str = Form(...),
):
    try:
        file_bytes = await file.read()
        # ✅ Pass both file bytes and filename to parse_resume
        resume_text = parse_resume(file_bytes, file.filename)  
        result = analyze_resume_logic(resume_text, job_description)
        return JSONResponse(content=result)
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

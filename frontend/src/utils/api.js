import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 30000
});

export async function analyzeResume(formData) {
  try {
    const res = await API.post("/analyze_resume", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
  } catch (err) {
    console.error("API error:", err);

    if (err.response?.status === 422) {
      throw new Error(
        err.response?.data?.error ||
          "⚠️ Invalid input. Make sure you uploaded a PDF/DOCX and added the job description."
      );
    }

    throw new Error(
      err.response?.data?.error || "❌ Server error. Please try again."
    );
  }
}

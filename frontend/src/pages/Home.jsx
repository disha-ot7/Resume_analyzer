import { useState } from "react";
import UploadForm from "../components/UploadForm";
import { analyzeResume } from "../api";
import toast from "react-hot-toast";

export default function Upload() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);

  const handleUpload = async (file) => {
    if (!jobDescription) {
      toast.error("Please enter a job description.");
      return;
    }

    try {
      const analysis = await analyzeResume(file, jobDescription);
      setResult(analysis);
      toast.success("Resume analyzed successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-semibold mb-4'>Upload Your Resume</h2>

      {/* Job Description Input */}
      <textarea
        className='w-full p-3 border rounded-lg mb-4'
        rows='5'
        placeholder='Paste the job description here...'
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      {/* Upload Form */}
      <UploadForm onUpload={handleUpload} />

      {/* Show Analysis Results */}
      {result && (
        <div className='mt-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6'>
          <h3 className='text-lg font-bold mb-2'>
            ATS Score: {result.ats_score}%
          </h3>
          <p className='mb-2'>
            <strong>Skills Found:</strong> {result.resume_skills.join(", ")}
          </p>
          <p className='mb-2'>
            <strong>Missing Skills:</strong>{" "}
            {result.missing_skills.length > 0
              ? result.missing_skills.join(", ")
              : "None 🎉"}
          </p>
          <p>
            <strong>Suggestions:</strong> {result.suggestions.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}

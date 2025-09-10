import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { analyzeResume } from "../utils/api";

export default function UploadForm() {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
    setError("");
  };

  const handleUpload = async () => {
    if (!resume || !jobDesc) {
      setError("⚠️ Please upload a resume and enter a job description.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", resume);
    formData.append("job_description", jobDesc);

    try {
      const data = await analyzeResume(formData);

      // 👉 pass result to Results page via navigation state
      navigate("/results", { state: { result: data } });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <motion.div
      className='p-8 rounded-2xl shadow-xl bg-gray-800/60 backdrop-blur-lg'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}>
      <h2 className='text-2xl font-bold mb-6 text-center'>
        Upload Resume & Job Description
      </h2>

      {/* Upload Resume */}
      <div className='border-2 border-dashed p-6 rounded-xl text-center hover:border-indigo-500 transition'>
        <input
          type='file'
          accept='.pdf,.doc,.docx'
          onChange={handleFileChange}
          className='hidden'
          id='resumeUpload'
        />
        <label htmlFor='resumeUpload' className='cursor-pointer block'>
          <Upload className='mx-auto w-10 h-10 mb-3 text-indigo-500' />
          <p>Click or drag your resume here</p>
        </label>
        {resume && (
          <div className='mt-3 text-sm font-medium text-indigo-400 flex items-center justify-center gap-2'>
            <FileText className='w-4 h-4' />
            {resume.name}
          </div>
        )}
      </div>

      {/* Job Description */}
      <textarea
        placeholder='Paste job description here...'
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        className='w-full mt-6 p-4 rounded-lg border focus:ring-2 focus:ring-indigo-400 text-white bg-gray-900'
        rows={6}></textarea>

      {/* Error message */}
      {error && (
        <div className='mt-4 flex items-center gap-2 bg-red-800/40 text-red-300 px-4 py-3 rounded-lg'>
          <XCircle className='w-5 h-5' />
          <span>{error}</span>
        </div>
      )}

      {/* Submit Button */}
      <div className='flex justify-center mt-6'>
        <button
          onClick={handleUpload}
          disabled={loading}
          className='px-8 py-3 bg-indigo-600 rounded-xl shadow-md hover:bg-indigo-700 disabled:opacity-50'>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>
    </motion.div>
  );
}

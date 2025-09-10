import { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  XCircle,
  Sparkles,
  Loader2,
  ClipboardList,
  CheckCircle2
} from "lucide-react";
import { analyzeResume } from "./utils/api";
import Results from "./pages/Results"; // ✅ Professional dashboard results

export default function App() {
  const [step, setStep] = useState(1);
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
    setError("");
  };

  const handleUpload = async () => {
    if (!resume || !jobDesc.trim()) {
      setError("⚠️ Please upload a resume and enter a job description.");
      return;
    }

    setLoading(true);
    setResult(null);
    setError("");

    const formData = new FormData();
    formData.append("file", resume);
    formData.append("job_description", jobDesc);

    try {
      const data = await analyzeResume(formData);
      setResult(data);
      setStep(3);
    } catch (err) {
      setError(err.message || "❌ Error analyzing resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step labels
  const steps = ["Upload Resume", "Job Description", "Results"];
  const progress = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <div className='min-h-screen p-8 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative'>
      {/* Header */}
      <motion.header
        className='flex justify-between items-center mb-10'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}>
        <h1 className='text-3xl font-extrabold flex items-center gap-2'>
          <Sparkles className='text-indigo-400' /> AI Resume Analyzer
        </h1>
        <p className='text-gray-400 text-sm'>Powered by FastAPI + React</p>
      </motion.header>

      {/* Stepper */}
      <div className='mb-12'>
        <div className='flex justify-between items-center relative'>
          {steps.map((label, index) => (
            <div key={index} className='flex flex-col items-center flex-1'>
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm transition ${
                  step > index + 1
                    ? "bg-green-500 text-white"
                    : step === index + 1
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}>
                {step > index + 1 ? (
                  <CheckCircle2 className='w-5 h-5' />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`mt-2 text-xs md:text-sm ${
                  step === index + 1
                    ? "text-indigo-400 font-medium"
                    : "text-gray-400"
                }`}>
                {label}
              </span>
            </div>
          ))}
          {/* Progress Bar */}
          <div className='absolute top-5 left-0 w-full h-[2px] bg-gray-700 -z-10'>
            <motion.div
              className='h-[2px] bg-indigo-500'
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div className='max-w-4xl mx-auto'>
        {/* Step 1 - Upload Resume */}
        {step === 1 && (
          <motion.div
            key='step1'
            className='p-8 rounded-2xl shadow-xl bg-gray-800/70 backdrop-blur-lg'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}>
            <h2 className='text-2xl font-bold mb-6 text-center'>
              Step 1: Upload Resume
            </h2>
            <label
              htmlFor='resumeUpload'
              className='block border-2 border-dashed p-8 rounded-xl text-center hover:border-indigo-500 transition cursor-pointer'>
              <input
                type='file'
                accept='.pdf,.doc,.docx'
                onChange={handleFileChange}
                className='hidden'
                id='resumeUpload'
              />
              <Upload className='mx-auto w-12 h-12 mb-3 text-indigo-400' />
              <p className='text-gray-300'>
                {resume
                  ? "✅ Resume Selected"
                  : "Click or drag your resume here"}
              </p>
              {resume && (
                <div className='mt-3 text-sm font-medium text-indigo-400 flex items-center justify-center gap-2'>
                  <FileText className='w-4 h-4' />
                  {resume.name}
                </div>
              )}
            </label>
            <button
              onClick={() => setStep(2)}
              disabled={!resume}
              className='mt-8 px-8 py-3 bg-indigo-600 rounded-xl shadow-md hover:bg-indigo-700 disabled:opacity-50 block mx-auto'>
              Next →
            </button>
          </motion.div>
        )}

        {/* Step 2 - Job Description */}
        {step === 2 && (
          <motion.div
            key='step2'
            className='p-8 rounded-2xl shadow-xl bg-gray-800/70 backdrop-blur-lg'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}>
            <h2 className='text-2xl font-bold mb-6 text-center'>
              Step 2: Paste Job Description
            </h2>
            <div className='flex gap-4'>
              <ClipboardList className='text-indigo-400 w-6 h-6 mt-2' />
              <textarea
                placeholder='Paste the full job description here...'
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                className='w-full mt-2 p-4 rounded-lg border focus:ring-2 focus:ring-indigo-400 text-white bg-gray-900 resize-none'
                rows={7}></textarea>
            </div>
            <p className='text-xs text-gray-500 mt-2 text-right'>
              {jobDesc.length} characters
            </p>

            {error && (
              <div className='mt-4 flex items-center gap-2 bg-red-800/40 text-red-300 px-4 py-3 rounded-lg'>
                <XCircle className='w-5 h-5' />
                <span>{error}</span>
              </div>
            )}

            <div className='flex justify-between mt-6'>
              <button
                onClick={() => setStep(1)}
                className='px-6 py-3 bg-gray-600 rounded-xl hover:bg-gray-700'>
                ← Back
              </button>
              <button
                onClick={handleUpload}
                disabled={loading}
                className='px-8 py-3 bg-indigo-600 rounded-xl shadow-md hover:bg-indigo-700 disabled:opacity-50'>
                Analyze Resume →
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3 - Results */}
        {step === 3 && result && (
          <Results
            result={result}
            onReset={() => {
              setStep(1);
              setResult(null);
              setResume(null);
              setJobDesc("");
            }}
          />
        )}
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className='absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center z-50'>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}>
            <Loader2 className='w-16 h-16 text-indigo-400' />
          </motion.div>
          <motion.p
            className='mt-6 text-lg text-gray-300'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              repeatType: "reverse"
            }}>
            🔍 Analyzing your resume with AI...
          </motion.p>
        </div>
      )}

      {/* Footer */}
      <footer className='mt-12 text-center text-sm text-gray-400'>
        © {new Date().getFullYear()} Resume Analyzer | Built with React,
        Tailwind, Recharts & FastAPI
      </footer>
    </div>
  );
}

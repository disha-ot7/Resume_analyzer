import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";

export default function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onUpload(file);
    }
  };

  return (
    <motion.div
      className='flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      <Card className='w-[600px] bg-black/30 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-xl p-6'>
        <CardContent>
          {/* Title */}
          <motion.h2
            className='text-2xl font-bold text-white mb-6 text-center'
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}>
            📄 Upload Your Resume
          </motion.h2>

          {/* Upload Area */}
          <motion.div
            className={`relative border-2 border-dashed rounded-xl p-10 text-center transition cursor-pointer ${
              dragActive
                ? "border-indigo-400 bg-indigo-500/10"
                : "border-gray-600"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}>
            <input
              type='file'
              id='fileUpload'
              className='hidden'
              onChange={handleFileChange}
              accept='.pdf,.doc,.docx'
            />
            <label
              htmlFor='fileUpload'
              className='cursor-pointer flex flex-col items-center'>
              <UploadCloud className='w-12 h-12 text-indigo-400 mb-3' />
              <p className='text-gray-300 font-medium'>
                {file ? file.name : "Drag & Drop or Click to Upload"}
              </p>
              <p className='text-gray-500 text-sm mt-2'>
                Supported formats: PDF, DOC, DOCX
              </p>
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            className='mt-6 flex justify-center'
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}>
            <Button
              onClick={handleSubmit}
              disabled={!file}
              className={`px-6 py-3 rounded-xl text-lg font-medium shadow-lg transition ${
                file
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                  : "bg-gray-600 text-gray-300 cursor-not-allowed"
              }`}>
              🚀 Upload & Analyze
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

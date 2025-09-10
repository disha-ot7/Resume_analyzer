import { useEffect, useState } from "react";
import ResumeCard from "../components/ResumeCard";

export default function History() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    // TODO: Replace with backend API call
    const storedResumes = [
      {
        name: "John Doe",
        date: "2025-08-01",
        summary: "Strong in Python and ML."
      },
      {
        name: "Jane Smith",
        date: "2025-08-10",
        summary: "Experienced in Web Development."
      }
    ];

    setResumes(storedResumes);
  }, []);

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-semibold mb-4'>Uploaded Resumes</h2>

      {resumes.length === 0 ? (
        <p className='text-gray-500'>No resumes uploaded yet.</p>
      ) : (
        <div className='grid gap-4 md:grid-cols-2'>
          {resumes.map((resume, index) => (
            <ResumeCard key={index} resume={resume} />
          ))}
        </div>
      )}
    </div>
  );
}

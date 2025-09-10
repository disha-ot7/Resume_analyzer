export default function ResumeCard({ resume }) {
  return (
    <div className='p-4 bg-white dark:bg-gray-800 rounded-lg shadow'>
      {/* Candidate Name */}
      <h3 className='text-lg font-semibold'>{resume.name || "Resume"}</h3>

      {/* Upload Date */}
      {resume.date && <p className='text-gray-500'>Uploaded: {resume.date}</p>}

      {/* Summary */}
      {resume.summary && <p className='mt-2'>{resume.summary}</p>}

      {/* ATS Score */}
      {resume.ats_score !== undefined && (
        <p className='mt-3 font-medium'>
          ATS Score: <span className='text-blue-600'>{resume.ats_score}%</span>
        </p>
      )}

      {/* Missing Skills */}
      {resume.missing_skills && resume.missing_skills.length > 0 && (
        <div className='mt-3'>
          <p className='font-medium text-red-600'>Missing Skills:</p>
          <ul className='list-disc list-inside text-sm text-gray-700 dark:text-gray-300'>
            {resume.missing_skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Matched Skills */}
      {resume.matched_skills && resume.matched_skills.length > 0 && (
        <div className='mt-3'>
          <p className='font-medium text-green-600'>Matched Skills:</p>
          <ul className='list-disc list-inside text-sm text-gray-700 dark:text-gray-300'>
            {resume.matched_skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

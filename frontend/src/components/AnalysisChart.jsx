import React from "react";
import Results from "./Results"; // Make sure Results.jsx exists in the same folder

const AnalysisChart = ({ result }) => {
  if (!result) {
    return (
      <div className='p-6 text-center text-gray-400'>
        Upload a resume and job description to see analysis results 🚀
      </div>
    );
  }

  return (
    <div className='p-6'>
      <Results result={result} />
    </div>
  );
};

export default AnalysisChart;

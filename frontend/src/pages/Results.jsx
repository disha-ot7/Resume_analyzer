import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Lightbulb,
  AlertTriangle,
  Star,
  Award
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Results({ result, onReset }) {
  if (!result) return null;

  const {
    score,
    missing_keywords = [],
    matched_keywords = [],
    history = [],
    suggestions = []
  } = result;

  // --- Skills ---
  const TECH_SKILLS = [
    "python",
    "java",
    "c++",
    "c#",
    "javascript",
    "typescript",
    "react",
    "angular",
    "vue",
    "node",
    "express",
    "fastapi",
    "django",
    "flask",
    "spring",
    "aws",
    "azure",
    "gcp",
    "docker",
    "kubernetes",
    "terraform",
    "jenkins",
    "sql",
    "mysql",
    "postgresql",
    "mongodb",
    "pandas",
    "numpy",
    "tensorflow",
    "pytorch",
    "rest",
    "graphql"
  ];
  const SOFT_SKILLS = [
    "leadership",
    "communication",
    "teamwork",
    "management",
    "problem-solving",
    "critical thinking",
    "adaptability",
    "creativity",
    "collaboration",
    "ownership",
    "stakeholder management",
    "presentation",
    "mentoring",
    "decision making",
    "time management",
    "organization",
    "conflict resolution",
    "empathy",
    "negotiation",
    "active listening",
    "initiative",
    "attention to detail",
    "multitasking",
    "work ethic",
    "flexibility",
    "strategic planning",
    "customer service",
    "interpersonal skills"
  ];
  const TOOLS = [
    "git",
    "jira",
    "figma",
    "excel",
    "confluence",
    "slack",
    "trello",
    "notion",
    "microsoft office",
    "google workspace",
    "zoom",
    "teams",
    "asana",
    "monday.com",
    "tableau",
    "powerbi",
    "outlook",
    "visio",
    "draw.io",
    "github",
    "gitlab",
    "bitbucket",
    "postman",
    "swagger",
    "docker",
    "jenkins",
    "vscode",
    "pycharm",
    "intellij",
    "eclipse",
    "android studio",
    "xcode"
  ];

  const isRelevantSkill = (kw) => {
    if (!kw) return false;
    const lower = kw.toLowerCase();
    return (
      TECH_SKILLS.includes(lower) ||
      SOFT_SKILLS.includes(lower) ||
      TOOLS.includes(lower)
    );
  };

  // --- Filter keywords ---
  const filteredMatched = matched_keywords.filter(isRelevantSkill);
  const filteredMissing = missing_keywords.filter(isRelevantSkill);

  // --- AI Suggestions (combine missing + extra suggestions) ---
  const aiSuggestions = Array.from(
    new Set([...filteredMissing, ...suggestions])
  )
    .map((kw) => ({ kw, ...generateSuggestion(kw) }))
    .filter(({ kw }) => isRelevantSkill(kw))
    .sort(
      (a, b) =>
        ({ High: 1, Medium: 2, Low: 3 }[a.priority] -
        { High: 1, Medium: 2, Low: 3 }[b.priority])
    );

  // --- Suggestion rules ---
  function generateSuggestion(kw) {
    const lower = kw.toLowerCase();
    const highSkills = [
      "python",
      "react",
      "sql",
      "java",
      "node",
      "docker",
      "kubernetes",
      "aws",
      "tensorflow",
      "pytorch",
      "rest",
      "graphql",
      "django"
    ];
    const mediumSkills = [
      "management",
      "leadership",
      "strategy",
      "project management",
      "stakeholder management",
      "decision making",
      "mentoring",
      "strategic planning",
      "cicd",
      "agile",
      "scrum"
    ];
    const lowSkills = [
      "communication",
      "teamwork",
      "collaboration",
      "creativity",
      "adaptability",
      "critical thinking",
      "problem-solving",
      "empathy",
      "negotiation",
      "presentation",
      "organization",
      "time management",
      "ownership",
      "active listening",
      "flexibility"
    ];
    if (highSkills.some((skill) => lower.includes(skill)))
      return {
        tip: "Highlight this skill prominently in Skills or Projects.",
        priority: "High"
      };
    if (mediumSkills.some((skill) => lower.includes(skill)))
      return {
        tip: "Demonstrate this skill through experience or achievements.",
        priority: "Medium"
      };
    if (lowSkills.some((skill) => lower.includes(skill)))
      return {
        tip: "Mention in Summary, Cover Letter, or soft skills section.",
        priority: "Low"
      };
    return {
      tip: "Include this skill naturally in your resume if relevant.",
      priority: "Low"
    };
  }

  const priorityStyle = {
    High: "bg-red-500/20 text-red-400 border-red-400/40",
    Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-400/40",
    Low: "bg-green-500/20 text-green-400 border-green-400/40"
  };

  // --- Trend Data ---
  const trendData =
    history.length > 0
      ? history
      : [
          { attempt: 1, score: 45 },
          { attempt: 2, score: 60 },
          { attempt: 3, score: 72 },
          { attempt: 4, score }
        ];

  const verdict =
    score >= 80
      ? "🌟 Excellent — Resume is highly ATS-optimized"
      : score >= 60
      ? "⚠️ Good — Some improvements needed"
      : "❌ Needs Improvement — Many missing elements";
  const verdictColor =
    score >= 80
      ? "text-green-400"
      : score >= 60
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <motion.div
      className='flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 p-6'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      <div className='w-[1100px] bg-black/30 backdrop-blur-xl border border-gray-700 rounded-3xl shadow-2xl p-10'>
        {/* Title */}
        <motion.h2
          className='text-3xl font-extrabold text-white mb-8 flex items-center gap-3'
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}>
          <BarChart3 className='w-8 h-8 text-indigo-400' /> Resume Analysis
          Dashboard
        </motion.h2>

        {/* Overall ATS Summary */}
        <motion.div
          className='mb-10 bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}>
          <div className='flex items-center gap-4'>
            <Award className='w-10 h-10 text-indigo-400' />
            <div>
              <h3 className='text-xl font-semibold text-white'>
                Overall Resume Health
              </h3>
              <p className={`text-sm font-medium ${verdictColor}`}>{verdict}</p>
            </div>
          </div>
          <div className='text-center'>
            <p className='text-sm text-gray-400'>ATS Score</p>
            <p className='text-4xl font-extrabold text-white'>{score}%</p>
          </div>
        </motion.div>

        {/* ATS Donut + Score Trend */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          {/* ATS Donut */}
          <div className='bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg flex justify-center items-center'>
            <div className='relative w-48 h-48 flex items-center justify-center'>
              <svg viewBox='0 0 36 36' className='w-full h-full'>
                <path
                  className='text-gray-700'
                  strokeWidth='3'
                  stroke='currentColor'
                  fill='none'
                  d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                />
                <path
                  strokeWidth='3.5'
                  strokeDasharray={`${score}, 100`}
                  strokeLinecap='round'
                  stroke='url(#gradient)'
                  fill='none'
                  d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                />
                <defs>
                  <linearGradient
                    id='gradient'
                    x1='0%'
                    y1='0%'
                    x2='100%'
                    y2='0%'>
                    <stop offset='0%' stopColor='#6366f1' />
                    <stop offset='100%' stopColor='#10b981' />
                  </linearGradient>
                </defs>
              </svg>
              <div className='absolute text-center'>
                <p className='text-3xl font-extrabold text-white'>{score}%</p>
                <p className='text-xs text-gray-400'>Current Score</p>
              </div>
            </div>
          </div>

          {/* Score Trend */}
          <motion.div
            className='w-full h-72 bg-black/30 rounded-2xl border border-gray-700 p-4'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}>
            <h3 className='text-lg font-semibold text-white mb-4 flex items-center gap-2'>
              <TrendingUp className='w-5 h-5 text-purple-400' /> Score Trend
            </h3>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#333' />
                <XAxis dataKey='attempt' stroke='#aaa' />
                <YAxis domain={[0, 100]} stroke='#aaa' />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderRadius: "10px",
                    border: "1px solid #374151",
                    color: "#fff"
                  }}
                />
                <Line
                  type='monotone'
                  dataKey='score'
                  stroke='#8b5cf6'
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Matched Skills */}
        {filteredMatched.length > 0 && (
          <div className='mt-10'>
            <h3 className='text-xl font-semibold mb-4 flex items-center gap-2'>
              ✅ Matched Skills
            </h3>
            <div className='flex flex-wrap gap-3'>
              {filteredMatched.map((kw, i) => (
                <motion.span
                  key={i}
                  className='px-4 py-2 rounded-full text-sm font-medium bg-green-500/20 text-green-400 border border-green-500/40 shadow-md hover:bg-green-500/30 transition'
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}>
                  {kw}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* Missing Skills (Only Skills) */}
        {filteredMissing.length > 0 && (
          <div className='mt-10'>
            <h3 className='text-xl font-semibold mb-4 flex items-center gap-2'>
              <AlertTriangle className='w-6 h-6 text-red-400' /> Missing Skills
            </h3>
            <div className='flex flex-wrap gap-3'>
              {filteredMissing.map((kw, i) => (
                <motion.span
                  key={i}
                  className='px-4 py-2 rounded-full text-sm font-medium bg-red-500/20 text-red-400 border border-red-500/40 shadow-md hover:bg-red-500/30 transition'
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}>
                  {kw}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* AI Recommendations (Skills + Suggestions) */}
        {aiSuggestions.length > 0 && (
          <div className='mt-10'>
            <h3 className='text-xl font-semibold mb-4 flex items-center gap-2'>
              <Star className='w-6 h-6 text-indigo-400' /> AI Recommendations
            </h3>
            <div className='grid md:grid-cols-2 gap-6'>
              {aiSuggestions.map(({ kw, tip, priority }, i) => (
                <motion.div
                  key={i}
                  className={`p-5 rounded-xl border shadow-lg bg-gray-800/50 ${priorityStyle[priority]} hover:border-indigo-500 transition`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='text-white font-medium'>{kw}</span>
                    <span className='text-xs px-2 py-1 rounded-full bg-black/30 border'>
                      {priority} Priority
                    </span>
                  </div>
                  <p className='text-sm text-gray-300 flex items-center gap-2'>
                    <Lightbulb className='w-4 h-4 text-yellow-400' /> {tip}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Reset */}
        <motion.div
          className='mt-10 flex justify-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}>
          <button
            onClick={onReset}
            className='px-6 py-3 rounded-xl text-lg font-medium shadow-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2'>
            <ArrowLeft className='w-5 h-5' /> Analyze Another Resume
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

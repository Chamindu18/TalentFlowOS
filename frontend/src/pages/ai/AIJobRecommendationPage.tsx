import { useState } from "react";

export default function AIJobRecommendationPage() {
  const [skills, setSkills] = useState("");

  const [jobs, setJobs] = useState<
    {
      rank: number;
      title: string;
      company: string;
      match: number;
      salary: string;
      level: string;
      mode: string;
      demand: string;
      skills: string[];
      missingSkills: string[];
      reason: string;
    }[]
  >([]);

  const generateRecommendations = () => {
    const text = skills.toLowerCase();

    const recommendations = [];

    if (
      text.includes("java") ||
      text.includes("spring") ||
      text.includes("sql")
    ) {
      recommendations.push({
        rank: 1,
        title: "Backend Developer",
        company: "TechCorp",
        match: 95,
        salary: "LKR 300,000 - 450,000",
        level: "Mid Level",
        mode: "Hybrid",
        demand: "High",
        skills: ["Java", "Spring Boot", "SQL", "Docker"],
        missingSkills: ["Microservices", "Azure"],
        reason:
          "Your backend development skills strongly align with current hiring trends.",
      });
    }

    if (
      text.includes("react") ||
      text.includes("typescript")
    ) {
      recommendations.push({
        rank: 2,
        title: "Frontend Developer",
        company: "Creative Labs",
        match: 92,
        salary: "LKR 250,000 - 400,000",
        level: "Junior - Mid Level",
        mode: "Remote",
        demand: "High",
        skills: ["React", "TypeScript", "Tailwind"],
        missingSkills: ["Next.js"],
        reason:
          "Strong frontend technology stack and UI development profile detected.",
      });
    }

    if (
      text.includes("python") ||
      text.includes("machine learning")
    ) {
      recommendations.push({
        rank: 3,
        title: "Data Scientist",
        company: "DataVision",
        match: 90,
        salary: "LKR 350,000 - 500,000",
        level: "Mid Level",
        mode: "Hybrid",
        demand: "Very High",
        skills: [
          "Python",
          "Machine Learning",
          "Pandas",
        ],
        missingSkills: ["TensorFlow"],
        reason:
          "Data analytics and AI capabilities indicate strong potential in data-focused careers.",
      });
    }

    if (
      text.includes("docker") ||
      text.includes("azure") ||
      text.includes("kubernetes")
    ) {
      recommendations.push({
        rank: 4,
        title: "DevOps Engineer",
        company: "CloudWorks",
        match: 89,
        salary: "LKR 350,000 - 550,000",
        level: "Mid Level",
        mode: "Onsite",
        demand: "High",
        skills: [
          "Docker",
          "Azure",
          "Kubernetes",
        ],
        missingSkills: ["Terraform"],
        reason:
          "Cloud infrastructure and deployment skills are highly relevant for DevOps roles.",
      });
    }

    setJobs(recommendations);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-bold">
        AI Job Recommendations
      </h1>

      <p className="text-slate-500 mt-2">
        Discover personalized job opportunities
        based on your skills and career profile.
      </p>

      <div className="bg-white border rounded-2xl p-6 mt-8">
        <label className="font-medium">
          Enter Your Skills
        </label>

        <textarea
          rows={4}
          value={skills}
          onChange={(e) =>
            setSkills(e.target.value)
          }
          placeholder="Example: Java, SQL, Spring Boot, React, Python"
          className="w-full border rounded-lg p-4 mt-3"
        />

        <button
          onClick={generateRecommendations}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg mt-4 hover:bg-indigo-700"
        >
          Generate Recommendations
        </button>
      </div>

      {jobs.length > 0 && (
        <div className="mt-8 space-y-6">
          {jobs.map((job) => (
            <div
              key={job.rank}
              className="bg-white border rounded-2xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-500">
                    Recommendation #{job.rank}
                  </p>

                  <h2 className="text-2xl font-bold">
                    {job.title}
                  </h2>

                  <p className="text-slate-500">
                    {job.company}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-green-600 font-bold text-2xl">
                    {job.match}%
                  </p>

                  <p className="text-sm text-slate-500">
                    Match Score
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div>
                  <p className="text-sm text-slate-500">
                    Salary Range
                  </p>

                  <p className="font-semibold">
                    {job.salary}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Experience
                  </p>

                  <p className="font-semibold">
                    {job.level}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Work Mode
                  </p>

                  <p className="font-semibold">
                    {job.mode}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <p className="font-medium mb-2">
                  Required Skills
                </p>

                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <p className="font-medium mb-2">
                  Skill Gap Analysis
                </p>

                <div className="flex flex-wrap gap-2">
                  {job.missingSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-700">
                  AI Recommendation
                </h3>

                <p className="mt-2 text-slate-600">
                  {job.reason}
                </p>
              </div>

              <div className="mt-4">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                  Market Demand: {job.demand}
                </span>
              </div>

              <button
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
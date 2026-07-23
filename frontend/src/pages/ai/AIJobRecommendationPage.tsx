import { useState } from "react";

export default function AIJobRecommendationPage() {
  const [skills, setSkills] = useState("");
  const [jobs, setJobs] = useState<
    {
      title: string;
      company: string;
      score: number;
    }[]
  >([]);

  const generateRecommendations = () => {
    const text = skills.toLowerCase();

    let recommendations = [];

    if (text.includes("java")) {
      recommendations.push({
        title: "Backend Developer",
        company: "TechCorp",
        score: 95,
      });

      recommendations.push({
        title: "Software Engineer",
        company: "ABC Solutions",
        score: 90,
      });
    }

    if (text.includes("react")) {
      recommendations.push({
        title: "Frontend Developer",
        company: "Creative Labs",
        score: 94,
      });
    }

    if (text.includes("python")) {
      recommendations.push({
        title: "Data Scientist",
        company: "DataVision",
        score: 96,
      });
    }

    if (text.includes("docker")) {
      recommendations.push({
        title: "DevOps Engineer",
        company: "CloudWorks",
        score: 88,
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
        Get personalized job suggestions
        based on your skills.
      </p>

      <div className="bg-white border rounded-2xl p-6 mt-8">
        <textarea
          rows={5}
          value={skills}
          onChange={(e) =>
            setSkills(e.target.value)
          }
          placeholder="Enter skills: React, Java, Python..."
          className="w-full border rounded-lg p-4"
        />

        <button
          onClick={generateRecommendations}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg mt-4"
        >
          Generate Recommendations
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white border rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold">
              {job.title}
            </h2>

            <p className="text-slate-500 mt-2">
              {job.company}
            </p>

            <div className="mt-4">
              <p className="font-medium">
                Match Score
              </p>

              <div className="w-full bg-slate-200 h-3 rounded-full mt-2">
                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{
                    width: `${job.score}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-blue-600 font-semibold">
                {job.score}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import { useState } from "react";

export default function AICareerAssistantPage() {
  const [skills, setSkills] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const [results, setResults] = useState<
    {
      role: string;
      score: number;
    }[]
  >([]);

  const [careerReadiness, setCareerReadiness] =
    useState(0);

  const [missingSkills, setMissingSkills] =
    useState<string[]>([]);

  const [careerOutlook, setCareerOutlook] =
    useState({
      demand: "",
      growth: "",
      salary: "",
      remote: "",
    });

  const skillOptions = [
    "Java",
    "Spring Boot",
    "React",
    "TypeScript",
    "Python",
    "Machine Learning",
    "SQL",
    "Docker",
    "Azure",
    "Kubernetes",
    "Node.js",
    "Power BI",
  ];

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(
        selectedSkills.filter(
          (item) => item !== skill
        )
      );
    } else {
      setSelectedSkills([
        ...selectedSkills,
        skill,
      ]);
    }
  };

  const analyzeSkills = () => {
    const text = (
      skills +
      " " +
      selectedSkills.join(" ")
    ).toLowerCase();

    const recommendations: {
      role: string;
      score: number;
    }[] = [];

    const gaps: string[] = [];

    if (
      text.includes("java") ||
      text.includes("spring") ||
      text.includes("sql")
    ) {
      recommendations.push({
        role: "Backend Developer",
        score: 92,
      });

      recommendations.push({
        role: "Software Engineer",
        score: 88,
      });

      if (!text.includes("docker"))
        gaps.push("Docker");

      if (!text.includes("azure"))
        gaps.push("Azure");

      if (!text.includes("microservices"))
        gaps.push("Microservices");
    }

    if (
      text.includes("react") ||
      text.includes("typescript")
    ) {
      recommendations.push({
        role: "Frontend Developer",
        score: 94,
      });

      recommendations.push({
        role: "UI Engineer",
        score: 87,
      });

      if (!text.includes("next"))
        gaps.push("Next.js");
    }

    if (
      text.includes("python") ||
      text.includes("machine learning")
    ) {
      recommendations.push({
        role: "Data Scientist",
        score: 95,
      });

      recommendations.push({
        role: "AI Engineer",
        score: 91,
      });

      if (!text.includes("tensorflow"))
        gaps.push("TensorFlow");

      if (!text.includes("deep learning"))
        gaps.push("Deep Learning");
    }

    if (
      text.includes("docker") ||
      text.includes("azure") ||
      text.includes("kubernetes")
    ) {
      recommendations.push({
        role: "DevOps Engineer",
        score: 89,
      });

      if (!text.includes("terraform"))
        gaps.push("Terraform");
    }

    let readiness = 40;

    readiness += recommendations.length * 10;

    if (text.includes("sql"))
      readiness += 10;

    if (text.includes("docker"))
      readiness += 10;

    if (text.includes("python"))
      readiness += 10;

    if (text.includes("react"))
      readiness += 10;

    if (readiness > 100)
      readiness = 100;

    if (
      recommendations[0]?.role ===
      "Backend Developer"
    ) {
      setCareerOutlook({
        demand: "High",
        growth: "Excellent",
        salary: "LKR 300,000 - 450,000",
        remote: "Available",
      });
    } else if (
      recommendations[0]?.role ===
      "Frontend Developer"
    ) {
      setCareerOutlook({
        demand: "High",
        growth: "Excellent",
        salary: "LKR 250,000 - 400,000",
        remote: "Highly Available",
      });
    } else if (
      recommendations[0]?.role ===
      "Data Scientist"
    ) {
      setCareerOutlook({
        demand: "Very High",
        growth: "Outstanding",
        salary: "LKR 350,000 - 600,000",
        remote: "Available",
      });
    } else if (
      recommendations[0]?.role ===
      "DevOps Engineer"
    ) {
      setCareerOutlook({
        demand: "High",
        growth: "Excellent",
        salary: "LKR 350,000 - 550,000",
        remote: "Available",
      });
    }

    setResults(recommendations);
    setMissingSkills(gaps);
    setCareerReadiness(readiness);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Hero */}
      <div className="bg-gradient-to-r from-black via-slate-900 to-orange-600 rounded-3xl p-8 text-white">
        <h1 className="text-4xl font-bold">
          🤖 AI Career Assistant
        </h1>

        <p className="mt-3 text-slate-300">
          Discover your ideal career path,
          identify skill gaps and receive
          AI-powered career guidance.
        </p>
      </div>

      {/* Skills Input */}
      <div className="bg-white border rounded-3xl p-8 mt-8 shadow-sm">
        <h2 className="text-xl font-semibold">
          Skills Assessment
        </h2>

        <textarea
          rows={4}
          value={skills}
          onChange={(e) =>
            setSkills(e.target.value)
          }
          placeholder="Enter additional skills..."
          className="w-full border rounded-xl p-4 mt-4"
        />

        <div className="mt-6">
          <p className="font-medium mb-3">
            Select Skills
          </p>

          <div className="flex flex-wrap gap-2">
            {skillOptions.map((skill) => (
              <button
                key={skill}
                onClick={() =>
                  toggleSkill(skill)
                }
                className={`px-4 py-2 rounded-full border transition ${
                  selectedSkills.includes(
                    skill
                  )
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white hover:bg-slate-100"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={analyzeSkills}
          className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl"
        >
          Analyze Career Path
        </button>
      </div>

      {results.length > 0 && (
        <>
          {/* Top Recommendation */}
          <div className="bg-gradient-to-r from-black to-orange-600 text-white rounded-3xl p-8 mt-8">
            <h2 className="text-xl font-semibold">
              ⭐ Top Career Recommendation
            </h2>

            <p className="text-4xl font-bold mt-4">
              {results[0].role}
            </p>

            <p className="mt-3 text-orange-100">
              Based on your selected skills and profile.
            </p>
          </div>

          {/* Row */}
          <div className="grid lg:grid-cols-3 gap-6 mt-8">

            {/* Career Match */}
            <div className="bg-white border rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-orange-600 mb-4">
                Career Match
              </h2>

              {results.slice(0, 3).map(
                (item, index) => (
                  <div
                    key={index}
                    className="mb-5"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">
                        {item.role}
                      </span>

                      <span className="font-bold text-green-600">
                        {item.score}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{
                          width: `${item.score}%`,
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Skill Gap */}
            <div className="bg-white border rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-red-600 mb-4">
                Skill Gap Analysis
              </h2>

              {missingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {missingSkills.map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-3 py-2 bg-red-100 text-red-700 rounded-full text-sm"
                      >
                        ❌ {skill}
                      </span>
                    )
                  )}
                </div>
              ) : (
                <p className="text-green-600">
                  ✅ No major skill gaps
                  found
                </p>
              )}
            </div>

            {/* Roadmap */}
            <div className="bg-white border rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-orange-600 mb-4">
                Learning Roadmap
              </h2>

              <ul className="space-y-3 text-slate-700">
                <li>✅ Build portfolio projects</li>
                <li>✅ Learn Git & GitHub</li>
                <li>✅ Practice system design</li>
                <li>✅ Prepare for interviews</li>
                <li>✅ Earn certifications</li>
              </ul>
            </div>
          </div>

          {/* Readiness */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 mt-8">
            <h2 className="text-2xl font-semibold">
              Career Readiness Score
            </h2>

            <div className="w-full bg-slate-700 h-5 rounded-full mt-6">
              <div
                className="bg-orange-500 h-5 rounded-full"
                style={{
                  width: `${careerReadiness}%`,
                }}
              />
            </div>

            <p className="mt-4 text-4xl font-bold text-orange-400">
              {careerReadiness}%
            </p>
          </div>

          {/* AI Insights */}
          <div className="bg-white border rounded-3xl p-8 mt-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">
              AI Insights
            </h2>

            <div className="space-y-3 text-slate-700">
              <p>
                ✓ Your profile aligns with
                current industry demand.
              </p>

              <p>
                ✓ Multiple career paths are
                available.
              </p>

              <p>
                ✓ Focus on roles above 85%
                match score.
              </p>

              <p>
                ✓ Continue building practical
                projects.
              </p>
            </div>
          </div>

          {/* Growth Outlook */}
          <div className="bg-white border rounded-3xl p-8 mt-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-orange-600 mb-6">
              Career Growth Outlook
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-slate-500">
                  Market Demand
                </p>

                <p className="font-bold text-green-600">
                  {careerOutlook.demand}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Growth Potential
                </p>

                <p className="font-bold text-orange-600">
                  {careerOutlook.growth}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Remote Opportunities
                </p>

                <p className="font-bold">
                  {careerOutlook.remote}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Estimated Salary
                </p>

                <p className="font-bold text-orange-600">
                  {careerOutlook.salary}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
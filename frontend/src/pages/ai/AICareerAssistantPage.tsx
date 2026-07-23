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

  const [careerReadiness, setCareerReadiness] = useState(0);

  const [missingSkills, setMissingSkills] = useState<string[]>([]);

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
      setSelectedSkills(selectedSkills.filter((item) => item !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const analyzeSkills = () => {
    const text = (skills + " " + selectedSkills.join(" ")).toLowerCase();

    const recommendations: {
      role: string;
      score: number;
    }[] = [];

    const gaps: string[] = [];

    let topCareer = "";

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

      topCareer = "Backend Developer";

      if (!text.includes("docker")) gaps.push("Docker");

      if (!text.includes("azure")) gaps.push("Azure");

      if (!text.includes("microservices")) gaps.push("Microservices");
    }

    if (text.includes("react") || text.includes("typescript")) {
      recommendations.push({
        role: "Frontend Developer",
        score: 94,
      });

      recommendations.push({
        role: "UI Engineer",
        score: 87,
      });

      recommendations.push({
        role: "Full Stack Developer",
        score: 84,
      });

      if (!topCareer) {
        topCareer = "Frontend Developer";
      }

      if (!text.includes("next")) gaps.push("Next.js");

      if (!text.includes("testing")) gaps.push("Frontend Testing");
    }

    if (text.includes("python") || text.includes("machine learning")) {
      recommendations.push({
        role: "Data Scientist",
        score: 95,
      });

      recommendations.push({
        role: "AI Engineer",
        score: 91,
      });

      if (!topCareer) {
        topCareer = "Data Scientist";
      }

      if (!text.includes("tensorflow")) gaps.push("TensorFlow");

      if (!text.includes("deep learning")) gaps.push("Deep Learning");
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

      if (!topCareer) {
        topCareer = "DevOps Engineer";
      }

      if (!text.includes("terraform")) gaps.push("Terraform");
    }

    let readiness = 40;

    readiness += recommendations.length * 10;

    if (text.includes("sql")) readiness += 5;

    if (text.includes("docker")) readiness += 10;

    if (text.includes("react")) readiness += 10;

    if (text.includes("python")) readiness += 10;

    if (readiness > 100) {
      readiness = 100;
    }

    setMissingSkills(gaps);
    setCareerReadiness(readiness);
    setResults(recommendations);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-bold">AI Career Assistant</h1>

      <p className="text-slate-500 mt-2">
        Analyze your skills and discover the most suitable career path.
      </p>

      <div className="bg-white border rounded-2xl p-6 mt-8">
        <label className="font-medium">Enter Additional Skills</label>

        <textarea
          rows={4}
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Example: Java, SQL, Spring Boot, Docker"
          className="w-full border rounded-lg p-4 mt-3"
        />

        <div className="mt-6">
          <p className="font-medium mb-3">Select Skills</p>

          <div className="flex flex-wrap gap-2">
            {skillOptions.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-4 py-2 rounded-full border transition ${
                  selectedSkills.includes(skill)
                    ? "bg-indigo-600 text-white border-indigo-600"
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
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg mt-6"
        >
          Analyze Career Path
        </button>
      </div>

      {results.length > 0 && (
        <>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 mt-8">
            <h2 className="text-xl font-semibold">
              ⭐ Top Career Recommendation
            </h2>

            <p className="text-3xl font-bold mt-3">{results[0].role}</p>

            <p className="mt-2 text-indigo-100">
              Based on your current skills and technologies.
            </p>
          </div>

          <div className="grid gap-4 mt-8">
            {results.map((item, index) => (
              <div key={index} className="bg-white border rounded-2xl p-6">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{item.role}</h2>

                    <p className="text-sm text-slate-500">Career Match</p>
                  </div>

                  <div className="text-right">
                    <span className="text-green-600 font-bold text-xl">
                      {item.score}%
                    </span>

                    <p className="text-xs text-slate-500">AI Confidence</p>
                  </div>
                </div>

                <div className="w-full bg-slate-200 h-3 rounded-full mt-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{
                      width: `${item.score}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border rounded-2xl p-6 mt-8">
            <h2 className="text-xl font-semibold">Career Readiness Score</h2>

            <div className="mt-4">
              <div className="w-full bg-slate-200 h-4 rounded-full">
                <div
                  className="bg-indigo-600 h-4 rounded-full"
                  style={{
                    width: `${careerReadiness}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-2xl font-bold text-indigo-600">
                {careerReadiness}%
              </p>
            </div>
          </div>

          <div className="bg-white border rounded-2xl p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Skill Gap Analysis</h2>

            {missingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                  >
                    ❌ {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-green-600">
                ✅ No significant skill gaps found.
              </p>
            )}
          </div>

          <div className="bg-white border rounded-2xl p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Learning Roadmap</h2>

            <ul className="space-y-3 text-slate-600">
              <li>✅ Build portfolio projects</li>

              <li>✅ Learn Git & GitHub</li>

              <li>✅ Practice system design</li>

              <li>✅ Prepare for interviews</li>

              <li>✅ Earn professional certifications</li>
            </ul>
          </div>

          <div className="bg-white border rounded-2xl p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">AI Insights</h2>
            <div className="bg-white border rounded-2xl p-6 mt-8">
              <h2 className="text-xl font-semibold mb-4">
                Career Growth Outlook
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-500">Market Demand</p>

                  <p className="font-bold text-green-600">High</p>
                </div>

                <div>
                  <p className="text-slate-500">Growth Potential</p>

                  <p className="font-bold text-indigo-600">Excellent</p>
                </div>

                <div>
                  <p className="text-slate-500">Remote Opportunities</p>

                  <p className="font-bold">Available</p>
                </div>

                <div>
                  <p className="text-slate-500">Estimated Salary</p>

                  <p className="font-bold text-orange-600">
                    LKR 250,000 - 450,000
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-slate-600">
              <p>✓ Your skills align with current industry demand.</p>

              <p>✓ Multiple career paths are available for your profile.</p>

              <p>✓ Focus on roles with match scores above 85%.</p>

              <p>
                ✓ Continue building practical projects to improve hiring
                potential.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

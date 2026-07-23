import { useState } from "react";

export default function AICareerAssistantPage() {
  const [skills, setSkills] = useState("");

  const [selectedSkills, setSelectedSkills] =
    useState<string[]>(([]));

  const [results, setResults] = useState<
    {
      role: string;
      score: number;
    }[]
  >([]);

  const [careerReadiness, setCareerReadiness] =
    useState(0);

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
    const text =
      (
        skills +
        " " +
        selectedSkills.join(" ")
      ).toLowerCase();

    let recommendations: {
      role: string;
      score: number;
    }[] = [];

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
    }

    if (
      text.includes("react") ||
      text.includes("javascript") ||
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

      recommendations.push({
        role: "Full Stack Developer",
        score: 84,
      });
    }

    if (
      text.includes("python") ||
      text.includes("machine learning") ||
      text.includes("pandas")
    ) {
      recommendations.push({
        role: "Data Scientist",
        score: 95,
      });

      recommendations.push({
        role: "AI Engineer",
        score: 91,
      });
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
    }

    let readiness = 40;

    readiness += recommendations.length * 10;

    if (text.includes("sql"))
      readiness += 5;

    if (text.includes("docker"))
      readiness += 10;

    if (text.includes("react"))
      readiness += 10;

    if (text.includes("python"))
      readiness += 10;

    if (readiness > 100) {
      readiness = 100;
    }

    setCareerReadiness(readiness);
    setResults(recommendations);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-bold">
        AI Career Assistant
      </h1>

      <p className="text-slate-500 mt-2">
        Analyze your skills and discover
        the most suitable career paths.
      </p>

      <div className="bg-white border rounded-2xl p-6 mt-8">
        <label className="font-medium">
          Enter Additional Skills
        </label>

        <textarea
          rows={4}
          value={skills}
          onChange={(e) =>
            setSkills(e.target.value)
          }
          placeholder="Example: Java, Spring Boot, SQL, Docker"
          className="w-full border rounded-lg p-4 mt-3"
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
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-indigo-700"
        >
          Analyze Career Path
        </button>
      </div>

      {results.length > 0 && (
        <>
          <div className="grid gap-4 mt-8">
            {results.map(
              (item, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-2xl p-6"
                >
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold">
                      {item.role}
                    </h2>

                    <span className="text-green-600 font-bold">
                      {item.score}%
                    </span>
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
              )
            )}
          </div>

          <div className="bg-white border rounded-2xl p-6 mt-8">
            <h2 className="text-xl font-semibold">
              Career Readiness Score
            </h2>

            <p className="text-slate-500 mt-2">
              Based on your selected skills
              and career profile.
            </p>

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
            <h2 className="text-xl font-semibold mb-4">
              Recommended Learning Roadmap
            </h2>

            <ul className="space-y-3 text-slate-600">
              <li>
                ✅ Build real-world projects
              </li>

              <li>
                ✅ Learn Git and GitHub
                workflows
              </li>

              <li>
                ✅ Create a professional
                portfolio
              </li>

              <li>
                ✅ Practice technical
                interviews
              </li>

              <li>
                ✅ Earn industry-recognized
                certifications
              </li>
            </ul>
          </div>

          <div className="bg-white border rounded-2xl p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">
              AI Insights
            </h2>

            <div className="space-y-3 text-slate-600">
              <p>
                ✓ Your skill profile aligns
                with current industry demand.
              </p>

              <p>
                ✓ Multiple career paths are
                available based on your
                selected technologies.
              </p>

              <p>
                ✓ Practical project experience
                will significantly increase
                employability.
              </p>

              <p>
                ✓ Focus on opportunities with
                match scores above 85% for the
                best outcomes.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
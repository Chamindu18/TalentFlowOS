export default function AIResumeMatchingPage() {
  const candidates = [
    {
      name: "John Doe",
      skills: ["React", "ASP.NET", "PostgreSQL"],
      score: 92,
      position: "Senior Full Stack Developer",
    },
    {
      name: "Sarah Fernando",
      skills: ["Java", "Spring Boot", "MySQL"],
      score: 88,
      position: "Backend Developer",
    },
    {
      name: "Michael Perera",
      skills: ["Python", "Django", "Docker"],
      score: 85,
      position: "Software Engineer",
    },
    {
      name: "Amanda Jayasinghe",
      skills: ["React", "Node.js", "MongoDB"],
      score: 81,
      position: "Frontend Developer",
    },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-bold">
        AI Resume Matching
      </h1>

      <p className="text-slate-500 mt-2">
        AI-powered candidate screening and position matching.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {candidates.map((candidate) => (
          <div
            key={candidate.name}
            className="bg-white rounded-2xl border p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {candidate.name}
              </h2>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                {candidate.score}%
              </span>
            </div>

            <div className="mt-4">
              <p className="font-medium text-slate-700">
                Skills
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                {candidate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-slate-100 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="font-medium">
                Match Score
              </p>

              <div className="w-full bg-slate-200 rounded-full h-3 mt-2">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{
                    width: `${candidate.score}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-5">
              <span className="font-medium">
                Recommended Position:
              </span>

              <p className="text-indigo-600 font-semibold mt-1">
                {candidate.position}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
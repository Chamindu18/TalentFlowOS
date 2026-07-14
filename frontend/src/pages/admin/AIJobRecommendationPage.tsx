export default function AIJobRecommendationPage() {
  const jobs = [
    {
      title: "Backend Developer",
      score: "90%",
      salary: "LKR 250,000",
    },
    {
      title: "Frontend Developer",
      score: "88%",
      salary: "LKR 220,000",
    },
    {
      title: "QA Engineer",
      score: "85%",
      salary: "LKR 200,000",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">
        AI Job Recommendations
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {jobs.map((job) => (
          <div
            key={job.title}
            className="bg-white border rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold">
              {job.title}
            </h2>

            <p className="text-green-600 mt-3">
              Match Score: {job.score}
            </p>

            <p className="mt-3">
              Salary: {job.salary}
            </p>

            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 rounded bg-slate-100">
                React
              </span>

              <span className="px-3 py-1 rounded bg-slate-100">
                ASP.NET
              </span>

              <span className="px-3 py-1 rounded bg-slate-100">
                SQL
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
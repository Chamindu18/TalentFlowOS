export default function AIJobRecommendationPage() {
  const jobs = [
    "Backend Developer",
    "Frontend Developer",
    "QA Engineer",
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        AI Job Recommendations
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {jobs.map((job) => (
          <div
            key={job}
            className="border rounded-xl p-6"
          >
            <h3 className="font-semibold">
              {job}
            </h3>

            <p className="text-green-600 mt-2">
              Match Score: 90%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
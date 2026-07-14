export default function AIResumeMatchingPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">
        AI Resume Matching
      </h1>

      <div className="bg-white rounded-xl border p-6 mt-8">
        <h2 className="text-2xl font-semibold">
          John Doe
        </h2>

        <div className="mt-4">
          <p className="font-medium">
            Skills
          </p>

          <div className="flex gap-2 mt-2">
            <span className="bg-slate-100 px-3 py-1 rounded">
              React
            </span>

            <span className="bg-slate-100 px-3 py-1 rounded">
              ASP.NET
            </span>

            <span className="bg-slate-100 px-3 py-1 rounded">
              PostgreSQL
            </span>
          </div>
        </div>

        <div className="mt-6">
          <p className="font-medium">
            Match Score
          </p>

          <div className="w-full bg-slate-200 rounded-full h-4 mt-2">
            <div className="bg-green-500 h-4 rounded-full w-[85%]" />
          </div>

          <p className="mt-2">
            85%
          </p>
        </div>

        <div className="mt-6">
          <strong>
            Recommended Position:
          </strong>{" "}
          Backend Developer
        </div>
      </div>
    </div>
  );
}
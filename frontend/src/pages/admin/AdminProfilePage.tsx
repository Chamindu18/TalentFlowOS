export default function AdminProfilePage() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-bold">
        Administrator Profile
      </h1>

      <div className="bg-white rounded-2xl border p-8 mt-8 max-w-2xl">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600">
            A
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              Admin User
            </h2>

            <p className="text-slate-500">
              admin@talentflow.com
            </p>

            <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              Administrator
            </span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div>
            <p className="text-slate-500">
              Department
            </p>

            <p className="font-medium">
              System Administration
            </p>
          </div>

          <div>
            <p className="text-slate-500">
              Location
            </p>

            <p className="font-medium">
              Colombo, Sri Lanka
            </p>
          </div>

          <div>
            <p className="text-slate-500">
              Joined
            </p>

            <p className="font-medium">
              January 2026
            </p>
          </div>

          <div>
            <p className="text-slate-500">
              Status
            </p>

            <p className="font-medium text-green-600">
              Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
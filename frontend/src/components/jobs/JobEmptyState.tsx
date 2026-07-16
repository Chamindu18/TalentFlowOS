import { SearchX } from "lucide-react";

export default function JobEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20">

      <SearchX
        size={56}
        className="text-slate-300"
      />

      <h3 className="mt-5 text-xl font-semibold text-slate-700">
        No Jobs Found
      </h3>

      <p className="mt-2 text-center text-slate-500">
        Try changing your search keywords or filters.
      </p>

    </div>
  );
}
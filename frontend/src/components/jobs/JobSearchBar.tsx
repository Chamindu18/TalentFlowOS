import { Search } from "lucide-react";

interface JobSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JobSearchBar({
  value,
  onChange,
}: JobSearchBarProps) {
  return (
    <div className="relative w-full">

      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        size={20}
      />

      <input
        type="text"
        placeholder="Search by job title, company or location..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-sm shadow-sm outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
      />

    </div>
  );
}
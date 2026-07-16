interface JobFilterProps {
  filter: string;
  onChange: (value: string) => void;
}

const filters = [
  "All",
  "Full Time",
  "Part Time",
  "Remote",
];

export default function JobFilter({
  filter,
  onChange,
}: JobFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">

      {filters.map((item) => (

        <button
          key={item}
          onClick={() => onChange(item)}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
            filter === item
              ? "bg-orange-500 text-white"
              : "bg-white border border-slate-200 text-slate-600 hover:border-orange-500"
          }`}
        >
          {item}
        </button>

      ))}

    </div>
  );
}
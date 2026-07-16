interface JobFilterProps {
  filter: string;
  onChange: (value: string) => void;
}

const filters = [
  "All",
  "Remote",
  "On-site",
  "Full Time",
  "Part Time",
  "Internship",
];

export default function JobFilter({
  filter,
  onChange,
}: JobFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">

      {filters.map((item) => {

        const active = filter === item;

        return (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 ${
              active
                ? "border-orange-500 bg-orange-500 text-white shadow-md"
                : "border-slate-200 bg-white text-slate-600 hover:border-orange-400 hover:text-orange-500"
            }`}
          >
            {item}
          </button>
        );
      })}

    </div>
  );
}
type StatCardProps = {
  value: string;
  label: string;
};

export default function StatCard({
  value,
  label,
}: StatCardProps) {
  return (
    <div
      className="
        group
        rounded-2xl
        p-4
        text-center
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-slate-50
      "
    >
      <h3
        className="
          text-3xl
          font-bold
          text-[#102541]
          transition-colors
          duration-300
          group-hover:text-[#FF8A5B]
        "
      >
        {value}
      </h3>

      <p
        className="
          mt-2
          text-sm
          font-medium
          text-slate-500
        "
      >
        {label}
      </p>
    </div>
  );
}
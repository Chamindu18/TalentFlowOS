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
        relative
        overflow-hidden
        rounded-2xl
        p-4
        text-center
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-slate-50
        sm:p-5
      "
    >
      {/* Hover Glow */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-[#FF8A5B]/5
          to-transparent
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      <div className="relative z-10">
        <h3
          className="
            text-2xl
            font-bold
            tracking-[-0.03em]
            text-[#102541]
            transition-all
            duration-300
            group-hover:text-[#FF8A5B]
            sm:text-3xl
          "
        >
          {value}
        </h3>

        <p
          className="
            mt-2
            text-xs
            font-medium
            uppercase
            tracking-[0.08em]
            text-slate-500
            sm:text-sm
          "
        >
          {label}
        </p>
      </div>
    </div>
  );
}
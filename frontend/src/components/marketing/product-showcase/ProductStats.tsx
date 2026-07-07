import StatCard from "./StatCard";

const stats = [
  {
    value: "50K+",
    label: "Candidates",
  },
  {
    value: "1,200+",
    label: "Companies",
  },
  {
    value: "95%",
    label: "Hiring Success",
  },
  {
    value: "4.9/5",
    label: "Customer Rating",
  },
];

export default function ProductStats() {
  return (
    <div
      className="
        relative
        z-20
        mx-auto
        grid
        gap-3
        rounded-[24px]
        border
        border-slate-100
        bg-white/95
        p-4
        shadow-[0_20px_50px_rgba(15,23,42,0.08)]
        backdrop-blur-sm
        sm:grid-cols-2
        sm:gap-4
        sm:p-5
        lg:w-[92%]
        lg:grid-cols-4
        lg:rounded-[28px]
        lg:p-6
      "
    >
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          value={stat.value}
          label={stat.label}
        />
      ))}
    </div>
  );
}
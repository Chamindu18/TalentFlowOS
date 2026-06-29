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
        mt-8
        grid
        gap-4
        rounded-[28px]
        border
        border-slate-100
        bg-white
        p-6
        shadow-xl
        sm:grid-cols-2
        lg:-mt-10
        lg:w-[92%]
        lg:grid-cols-4
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
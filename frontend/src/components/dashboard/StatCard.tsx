import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: StatCardProps) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            {value}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {subtitle}
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 transition-colors duration-300 group-hover:bg-orange-500">
          <Icon
            className="h-7 w-7 text-orange-600 transition-colors duration-300 group-hover:text-white"
          />
        </div>
      </div>
    </div>
  );
}
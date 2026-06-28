import {
  BriefcaseBusiness,
  CalendarCheck,
  FileCheck2,
} from "lucide-react";

const items = [
  {
    icon: BriefcaseBusiness,
    label: "Applications",
    value: "248",
    color: "bg-[#EDF4FF]",
    text: "text-[#3B82F6]",
    path: "M0 22 C20 8, 40 28, 60 18 S80 12, 100 8",
  },
  {
    icon: CalendarCheck,
    label: "Interviews",
    value: "42",
    color: "bg-[#FFF7E8]",
    text: "text-[#F59E0B]",
    path: "M0 18 C25 30, 45 5, 65 15 S85 20, 100 10",
  },
  {
    icon: FileCheck2,
    label: "Offers",
    value: "18",
    color: "bg-[#EEF5E9]",
    text: "text-[#4B7A39]",
    path: "M0 24 C20 20, 40 10, 60 15 S80 5, 100 2",
  },
];

export default function RecruitmentOverviewCard() {
  return (
    <div
      className="
        animate-float-medium
        w-[260px]
        rounded-[24px]
        border
        border-white/70
        bg-white/92
        p-5
        shadow-[0_20px_50px_rgba(15,23,42,0.08)]
        backdrop-blur-md
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)]
      "
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Dashboard
          </p>

          <h3 className="mt-1 text-base font-bold text-[#102541]">
            Recruitment Overview
          </h3>
        </div>

        <div className="rounded-xl bg-[#FBF4EC] px-2.5 py-1 text-[10px] font-semibold text-[#FF8A5B]">
          Live
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="text-center"
            >
              <div
                className={`
                  mx-auto
                  mb-2
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  ${item.color}
                `}
              >
                <Icon className={`h-4 w-4 ${item.text}`} />
              </div>

              <h4 className="text-xl font-bold text-[#102541]">
                {item.value}
              </h4>

              <p className="mb-2 text-[11px] text-slate-500">
                {item.label}
              </p>

              <div className="h-5">
                <svg
                  viewBox="0 0 100 30"
                  className={`h-full w-full ${item.text}`}
                >
                  <path
                    d={item.path}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
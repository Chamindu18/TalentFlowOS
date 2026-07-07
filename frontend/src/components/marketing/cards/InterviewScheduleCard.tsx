import { CalendarDays, Clock3 } from "lucide-react";

export default function InterviewScheduleCard() {
  return (
    <div
      className="
        animate-float-fast
        group
        w-[200px]
        rounded-[24px]
        border border-white/70
        bg-white/92
        p-4
        shadow-[0_20px_50px_rgba(15,23,42,0.08)]
        backdrop-blur-md
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)]
      "
    >
      <div className="mb-4 flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-2xl
            bg-[#FFF2EB]
          "
        >
          <CalendarDays className="h-5 w-5 text-[#FF8A5B]" />
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Next Interview
          </p>

          <h3 className="text-sm font-bold leading-tight text-[#102541]">
            Senior Frontend Engineer
          </h3>
        </div>
      </div>

      <div className="mb-4 rounded-2xl bg-[#FBF4EC] p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FF8A5B]">
          Tomorrow
        </p>

        <h2 className="mt-1 text-[34px] font-bold leading-none text-[#102541]">
          10:00 AM
        </h2>

        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <Clock3 className="h-3.5 w-3.5" />

          <span>45 Minute Session</span>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
        <img
          src="https://i.pravatar.cc/100?img=32"
          alt="Nethmi Perera"
          className="h-9 w-9 rounded-full object-cover"
        />

        <div>
          <p className="text-sm font-semibold text-[#102541]">
            Nethmi Perera
          </p>

          <p className="text-xs text-slate-500">
            Candidate
          </p>
        </div>
      </div>
    </div>
  );
}
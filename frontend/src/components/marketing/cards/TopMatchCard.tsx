import { Sparkles, TrendingUp } from "lucide-react";

export default function TopMatchCard() {
  return (
    <div
      className="
        animate-float-slow
        w-[200px]
        rounded-[24px]
        border
        border-white/70
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
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF7E9]">
            <Sparkles className="h-4 w-4 text-[#4B7A39]" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#4B7A39]">
              Top Match
            </h3>

            <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
              Candidate
            </p>
          </div>
        </div>

        <TrendingUp className="h-4 w-4 text-[#4B7A39]" />
      </div>

      <div className="mb-4 flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/100?img=32"
          alt="Nethmi Perera"
          className="h-12 w-12 rounded-full object-cover ring-2 ring-[#EEF7E9]"
        />

        <div>
          <h4 className="text-sm font-bold text-[#102541]">
            Nethmi Perera
          </h4>

          <p className="text-xs text-slate-500">
            Frontend Engineer
          </p>
        </div>
      </div>

      <div className="mb-4 flex items-end gap-2">
        <span className="text-3xl font-bold text-[#4B7A39]">
          94%
        </span>

        <span className="mb-1 text-xs font-medium text-slate-500">
          Match Score
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {["React", "Next.js", "TS"].map((skill) => (
          <span
            key={skill}
            className="
              rounded-full
              bg-[#EEF7E9]
              px-2.5
              py-1
              text-[11px]
              font-medium
              text-[#4B7A39]
            "
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
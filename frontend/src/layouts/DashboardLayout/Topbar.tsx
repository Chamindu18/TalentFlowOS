import {
  Bell,
  Search,
} from "lucide-react";

export default function Topbar() {
  return (
    <header
      className="
        flex
        h-20
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white
        px-6
      "
    >
      <div className="relative w-full max-w-md">
        <Search
          className="
            absolute
            left-4
            top-1/2
            h-4
            w-4
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          placeholder="Search..."
          className="
            h-12
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            pl-11
            pr-4
            text-sm
            outline-none
            transition-all
            focus:border-[#FF8A5B]
            focus:bg-white
          "
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-slate-100
            transition-colors
            hover:bg-slate-200
          "
        >
          <Bell className="h-5 w-5 text-slate-600" />
        </button>

        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            bg-slate-100
            px-4
            py-2
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-[#FF8A5B]
              font-semibold
              text-white
            "
          >
            CH
          </div>

          <div>
            <p className="text-sm font-semibold text-[#102541]">
              Chamindu
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
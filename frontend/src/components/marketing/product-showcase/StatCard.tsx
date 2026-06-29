import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";

type StatCardProps = {
  value: string;
  label: string;
};

export default function StatCard({
  value,
  label,
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  const getCountConfig = () => {
    if (value.includes("K")) {
      return {
        end: Number(value.replace("K+", "")),
        suffix: "K+",
        decimals: 0,
      };
    }

    if (value.includes("%")) {
      return {
        end: Number(value.replace("%", "")),
        suffix: "%",
        decimals: 0,
      };
    }

    if (value.includes("/5")) {
      return {
        end: Number(value.replace("/5", "")),
        suffix: "/5",
        decimals: 1,
      };
    }

    if (value.includes(",")) {
      return {
        end: Number(value.replace(",", "").replace("+", "")),
        suffix: "+",
        decimals: 0,
      };
    }

    return {
      end: Number(value),
      suffix: "",
      decimals: 0,
    };
  };

  const { end, suffix, decimals } = getCountConfig();

  return (
    <div
      ref={ref}
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
        {isInView ? (
          <CountUp
            end={end}
            duration={2}
            decimals={decimals}
            separator=","
            suffix={suffix}
          />
        ) : (
          "0"
        )}
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
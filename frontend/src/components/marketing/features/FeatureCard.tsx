import { ArrowRight, type LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
};

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  iconBg,
  iconColor,
}: FeatureCardProps) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-slate-100
        bg-white
        p-8
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-3
        hover:shadow-2xl
        hover:shadow-slate-200/60
      "
    >
      {/* Glow Effect */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
          bg-gradient-to-br
          from-white
          via-transparent
          to-[#FFF3EC]
        "
      />

      <div className="relative z-10">
        <div
          className={`
            mb-8
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-3xl
            ${iconBg}
            transition-transform
            duration-500
            group-hover:rotate-6
            group-hover:scale-110
          `}
        >
          <Icon className={`h-10 w-10 ${iconColor}`} />
        </div>

        <h3 className="mb-4 text-3xl font-bold text-[#102541]">
          {title}
        </h3>

        <p className="text-lg leading-8 text-slate-500">
          {description}
        </p>

        <div
          className="
            mt-8
            flex
            items-center
            gap-2
            font-semibold
            text-[#FF8A5B]
            transition-all
            duration-300
            group-hover:translate-x-2
          "
        >
          Learn More

          <ArrowRight className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
import {
  BarChart3,
  CalendarDays,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import DashboardPreview from "./DashboardPreview";
import FeatureItem from "./FeatureItem";

const features = [
  {
    icon: Sparkles,
    title: "Smart Candidate Matching",
    description:
      "AI-powered recommendations that identify the best talent based on skills, experience and cultural fit.",
    color: "bg-[#FFF3EC]",
    iconColor: "text-[#FF8A5B]",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Real-time recruitment insights to help teams make faster and better hiring decisions.",
    color: "bg-[#EEF4FF]",
    iconColor: "text-[#3B82F6]",
  },
  {
    icon: CalendarDays,
    title: "Interview Scheduling",
    description:
      "Automate interview coordination and reduce back-and-forth communication.",
    color: "bg-[#EEF8EE]",
    iconColor: "text-[#22C55E]",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description:
      "Streamline repetitive recruitment tasks so teams can focus on people, not processes.",
    color: "bg-[#FFF7E8]",
    iconColor: "text-[#F59E0B]",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Compliant",
    description:
      "Enterprise-grade security with role-based access control and protected candidate data.",
    color: "bg-[#F3ECFF]",
    iconColor: "text-[#8B5CF6]",
  },
];

export default function ProductShowcaseSection() {
  return (
    <section id="product-showcase" className="bg-[#FCFAF8] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center lg:mb-20">
          <div
            className="
              mx-auto
              mb-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#FFE4D7]
              bg-white
              px-5
              py-2.5
              text-sm
              font-semibold
              text-[#FF8A5B]
              shadow-sm
              transition-all
              duration-300
              hover:scale-105
            "
          >
            ✨ Product Showcase
          </div>

          <h2
            className="
              text-4xl
              font-bold
              tracking-[-0.04em]
              text-[#102541]
              md:text-5xl
              lg:text-6xl
            "
          >
            Why{" "}
            <span className="text-[#FF8A5B]">
              TalentFlow OS?
            </span>

            <br />

            Modern recruitment,
            <br className="hidden md:block" />
            simplified.
          </h2>

          <p
            className="
              mx-auto
              mt-8
              max-w-3xl
              text-lg
              leading-8
              text-slate-500
            "
          >
            From sourcing the right talent to making confident hiring
            decisions, TalentFlow OS helps organizations manage their
            entire recruitment process from one intelligent platform.
          </p>
        </div>

        {/* Content */}
        <div className="grid items-start gap-16 xl:grid-cols-[40%_60%]">
          {/* Left Side Features */}
          <div className="relative">
            <div
              className="
                absolute
                left-6
                top-6
                hidden
                h-[85%]
                w-[2px]
                bg-gradient-to-b
                from-[#FF8A5B]
                via-[#FFD8C8]
                to-transparent
                lg:block
              "
            />

            <div className="space-y-6">
              {features.map((feature) => (
                <FeatureItem
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  color={feature.color}
                  iconColor={feature.iconColor}
                />
              ))}
            </div>
          </div>

          {/* Right Side Dashboard */}
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
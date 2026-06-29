import {
  BarChart3,
  CalendarDays,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import dashboardPreview from "@/assets/product-showcase/dashboardPreview.png";

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

export default function ProductShowcaseSection() {
  return (
    <section className="bg-[#FCFAF8] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20 text-center">
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
              lg:text-xl
            "
          >
            From sourcing the right talent to making confident hiring
            decisions, TalentFlow OS helps organizations manage their
            entire recruitment process from one intelligent platform.
          </p>
        </div>

        {/* Content */}
        <div className="grid gap-16 lg:grid-cols-[38%_62%]">
          {/* Left Features */}
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

            <div className="space-y-8">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="group relative flex gap-6"
                  >
                    {/* Timeline Dot */}
                    <div
                      className="
                        relative
                        z-10
                        hidden
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        border-4
                        border-[#FCFAF8]
                        bg-white
                        shadow-md
                        lg:flex
                      "
                    >
                      <div className="h-3 w-3 rounded-full bg-[#FF8A5B]" />
                    </div>

                    {/* Card */}
                    <div
                      className="
                        flex-1
                        rounded-[28px]
                        bg-white
                        p-6
                        shadow-sm
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:shadow-xl
                      "
                    >
                      <div className="flex items-start gap-5">
                        <div
                          className={`
                            ${feature.color}
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-2xl
                            transition-transform
                            duration-300
                            group-hover:scale-110
                            group-hover:rotate-6
                          `}
                        >
                          <Icon
                            className={`h-8 w-8 ${feature.iconColor}`}
                          />
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-[#102541]">
                            {feature.title}
                          </h3>

                          <p className="mt-3 text-slate-500 leading-7">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Dashboard */}
          <div className="relative">
            <div
              className="
                absolute
                -bottom-12
                -right-12
                h-72
                w-72
                rounded-full
                bg-[#FF8A5B]/10
                blur-3xl
              "
            />

            <div
              className="
                relative
                overflow-hidden
                rounded-[40px]
                border
                border-[#F5E9DF]
                bg-white
                p-4
                shadow-[0_40px_80px_rgba(15,23,42,0.08)]
                transition-all
                duration-500
                hover:-translate-y-2
              "
            >
              <img
                src={dashboardPreview}
                alt="TalentFlow Dashboard"
                className="
                  w-full
                  rounded-[28px]
                  object-cover
                "
              />
            </div>

            {/* Stats Bar */}
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
                lg:w-[90%]
                lg:grid-cols-4
              "
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center"
                >
                  <h3 className="text-3xl font-bold text-[#102541]">
                    {stat.value}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import {
  BarChart3,
  Building2,
  CalendarDays,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Sparkles,
    title: "Smart Candidate Matching",
    description:
      "AI-powered candidate recommendations based on skills, experience and job requirements.",
    iconBg: "bg-[#FFF3EC]",
    iconColor: "text-[#FF8A5B]",
  },
  {
    icon: Users,
    title: "Applicant Tracking",
    description:
      "Track every applicant from application to hiring in one centralized dashboard.",
    iconBg: "bg-[#F3ECFF]",
    iconColor: "text-[#7C3AED]",
  },
  {
    icon: CalendarDays,
    title: "Interview Management",
    description:
      "Schedule, manage and collaborate on interviews with your entire team.",
    iconBg: "bg-[#ECF4FF]",
    iconColor: "text-[#3B82F6]",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description:
      "Gain insights into recruitment performance and hiring efficiency.",
    iconBg: "bg-[#EEF9F2]",
    iconColor: "text-[#16A34A]",
  },
  {
    icon: Building2,
    title: "Company Management",
    description:
      "Manage departments, teams and organization-wide recruitment processes.",
    iconBg: "bg-[#FFF7EC]",
    iconColor: "text-[#F59E0B]",
  },
  {
    icon: ShieldCheck,
    title: "Secure Role-Based Access",
    description:
      "Granular permissions for recruiters, managers, candidates and administrators.",
    iconBg: "bg-[#FFF0F0]",
    iconColor: "text-[#EF4444]",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#FCFAF8] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center sm:mb-20">
          <div
            className="
              mx-auto
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[#FFF3EC]
              px-4
              py-2
              text-xs
              font-semibold
              text-[#FF8A5B]
              sm:px-5
              sm:py-2.5
              sm:text-sm
            "
          >
            ✨ Platform Features
          </div>

          <h2
            className="
              text-3xl
              font-bold
              tracking-[-0.04em]
              text-[#102541]
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
            "
          >
            Recruitment,
            <br />

            simplified for{" "}
            <span className="text-[#FF8A5B]">
              modern teams
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              px-2
              text-base
              leading-7
              text-slate-500
              sm:mt-8
              sm:text-lg
              sm:leading-8
              lg:text-xl
              lg:leading-9
            "
          >
            Everything your organization needs to hire better,
            faster and smarter from a single platform.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconBg={feature.iconBg}
              iconColor={feature.iconColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
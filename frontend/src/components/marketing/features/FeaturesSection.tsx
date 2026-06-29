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
    <section className="bg-[#FCFAF8] py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
              bg-[#FFF3EC]
              px-5
              py-2.5
              text-sm
              font-semibold
              text-[#FF8A5B]
            "
          >
            ✨ Platform Features
          </div>

          <h2
            className="
              text-5xl
              font-bold
              tracking-[-0.04em]
              text-[#102541]
              md:text-6xl
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
              mt-8
              max-w-2xl
              text-xl
              leading-9
              text-slate-500
            "
          >
            Everything your organization needs to hire better,
            faster and smarter from a single platform.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
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
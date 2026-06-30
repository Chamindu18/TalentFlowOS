import { useState } from "react";

import RegisterForm from "@/components/auth/RegisterForm";

import logo from "@/assets/logo/logo.png";

import {
  BarChart3,
  BriefcaseBusiness,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Smart Candidate Matching",
    description:
      "AI-powered recommendations to find the right talent faster.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Hiring",
    description:
      "Analytics and insights for smarter recruitment decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description:
      "Your data is protected with enterprise-grade security.",
  },
];

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] =
    useState<"Candidate" | "Recruiter">(
      "Candidate",
    );

  return (
    <main className="min-h-screen bg-[#FBF4EC]">
      <div
        className="
          mx-auto
          grid
          min-h-screen
          max-w-7xl
          gap-10
          px-6
          py-4
          lg:grid-cols-[45%_55%]
          lg:px-8
        "
      >
        {/* Left Side */}
        <section
          className="
            hidden
            flex-col
            justify-center
            lg:flex
          "
        >
          <div>
            {/* Logo */}
            <img
              src={logo}
              alt="TalentFlow OS"
              draggable={false}
              className="
                h-9
                w-auto
                transition-transform
                duration-300
                hover:scale-105
              "
            />

            {/* Badge */}
            <div
              className="
                mt-8
                inline-flex
                items-center
                gap-2
                rounded-full
                font-semibold
                bg-[#FFF3EC]
                px-4
                py-2
                text-sm
                font-medium
                text-[#FF8A5B]
              "
            >
              <User className="h-4 w-4" />
              Create Account
            </div>

            {/* Heading */}
            <h1
              className="
                mt-5
                text-3xl
                font-bold
                leading-none
                tracking-[-0.04em]
                text-[#1b5096]
              "
            >
              Create Your Account
            </h1>

            <p
              className="
                mt-4
                max-w-lg
                font-medium
                text-base
                leading-7
                text-slate-600
              "
            >
              Join
              <span className="text-[#FF8A5B]">
                {" "}
                TalentFlow OS
              </span>{" "}
              and start your journey to build
              better teams and smarter hiring.
            </p>

            {/* Role Selection */}
            <div className="mt-5">
              <h3
                className="
                  mb-4
                  text-lg
                  font-bold
                  text-[#1b703f]
                "
              >
                Choose your account type
              </h3>

              <div className="space-y-3">
                {/* Candidate */}
                <button
                  type="button"
                  onClick={() =>
                    setSelectedRole(
                      "Candidate",
                    )
                  }
                  className={`
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-3xl
                    border
                    p-4
                    text-left
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    ${
                      selectedRole ===
                      "Candidate"
                        ? "border-[#FF8A5B] bg-[#FFF8F4] shadow-md"
                        : "border-slate-200 bg-white hover:border-[#FFD3BF]"
                    }
                  `}
                >
                  <div className="flex gap-4">
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-[#FFF3EC]
                        text-[#FF8A5B]
                      "
                    >
                      <User className="h-6 w-6" />
                    </div>

                    <div>
                      <h4
                        className="
                          text-xl
                          font-bold
                          text-[#102541]
                        "
                      >
                        I am a Candidate
                      </h4>

                      <p
                        className="
                          mt-1
                          text-base
                          font-medium
                          leading-6
                          text-slate-600
                        "
                      >
                        Find jobs, apply to
                        opportunities and build
                        your career.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`
                      h-7
                      w-7
                      rounded-full
                      border-2
                      transition-all
                      ${
                        selectedRole ===
                        "Candidate"
                          ? "border-[#FF8A5B] bg-[#FF8A5B]"
                          : "border-slate-300"
                      }
                    `}
                  />
                </button>

                {/* Recruiter */}
                <button
                  type="button"
                  onClick={() =>
                    setSelectedRole(
                      "Recruiter",
                    )
                  }
                  className={`
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-3xl
                    border
                    p-4
                    text-left
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    ${
                      selectedRole ===
                      "Recruiter"
                        ? "border-[#FF8A5B] bg-[#FFF8F4] shadow-md"
                        : "border-slate-200 bg-white hover:border-[#FFD3BF]"
                    }
                  `}
                >
                  <div className="flex gap-4">
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-[#FFF3EC]
                        text-[#FF8A5B]
                      "
                    >
                      <BriefcaseBusiness className="h-6 w-6" />
                    </div>

                    <div>
                      <h4
                        className="
                          text-xl
                          font-bold
                          text-[#102541]
                        "
                      >
                        I am a Recruiter
                      </h4>

                      <p
                        className="
                          mt-1
                          text-base
                          font-medium
                          leading-6
                          text-slate-600
                        "
                      >
                        Post jobs, find candidates
                        and hire the best talent.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`
                      h-7
                      w-7
                      rounded-full
                      border-2
                      transition-all
                      ${
                        selectedRole ===
                        "Recruiter"
                          ? "border-[#FF8A5B] bg-[#FF8A5B]"
                          : "border-slate-300"
                      }
                    `}
                  />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="mt-8 space-y-4">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="
                      flex
                      gap-4
                      transition-all
                      duration-300
                      hover:translate-x-2
                    "
                  >
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#FFF3EC]
                        text-[#FF8A5B]
                      "
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <div>
                      <h3
                        className="
                          text-lg
                          font-bold
                          text-[#102541]
                        "
                      >
                        {feature.title}
                      </h3>

                      <p
                        className="
                          mt-1
                          text-sm
                          text-slate-500
                        "
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Right Side */}
        <section
          className="
            flex
            items-center
            justify-center
          "
        >
          <RegisterForm />
        </section>
      </div>
    </main>
  );
}
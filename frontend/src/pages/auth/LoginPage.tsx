import LoginForm from "@/components/auth/LoginForm";

import logo from "@/assets/logo/logo.png";
import loginIllustration from "@/assets/auth/login-illustration.png";

import {
  BarChart3,
  Sparkles,
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
];

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#FBF4EC]">
      <div
        className="
          mx-auto
          grid
          min-h-screen
          max-w-7xl
          gap-8
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
            justify-center
            lg:flex
          "
        >
          <div
            className="
              flex
              max-w-xl
              flex-col
              justify-center
            "
          >
            {/* Logo */}
            <img
              src={logo}
              alt="TalentFlow OS"
              draggable={false}
              className="
                h-10
                w-fit
                transition-transform
                duration-500
                hover:scale-105
              "
            />

            {/* Badge */}
            <div
              className="
                mt-6
                inline-flex
                w-fit
                items-center
                font-semibold
                rounded-full
                bg-[#FFF3EC]
                px-4
                py-2
                text-sm
                font-medium
                text-[#FF8A5B]
              "
            >
              Welcome back! 👋
            </div>

            {/* Heading */}
            <h1
              className="
                mt-4
                text-4xl
                font-bold
                leading-tight
                tracking-[-0.04em]
                text-[#21579c]
                xl:text-5xl
              "
            >
              Welcome Back
            </h1>

            {/* Description */}
            <p
              className="
                mt-3
                max-w-md
                text-base
                leading-7
                font-medium
                text-slate-600
              "
            >
              Sign in to your account and continue
              building amazing teams with
              <span className="text-[#FF8A5B]">
                {" "}
                TalentFlow OS.
              </span>
            </p>

            {/* Features */}
            <div className="mt-8 space-y-4">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="
                      group
                      flex
                      items-start
                      gap-4
                      rounded-2xl
                      p-3
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-white/50
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
                        rounded-2xl
                        bg-[#FFF3EC]
                        text-[#FF8A5B]
                      "
                    >
                      <Icon
                        className="
                          h-6
                          w-6
                          transition-transform
                          duration-300
                          group-hover:scale-110
                          group-hover:rotate-6
                        "
                      />
                    </div>

                    <div>
                      <h3
                        className="
                          text-lg
                          font-bold
                          text-[#102541]
                          transition-colors
                          duration-300
                          group-hover:text-[#FF8A5B]
                        "
                      >
                        {feature.title}
                      </h3>

                      <p
                        className="
                          mt-1
                          text-sm
                          leading-6
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

            {/* Illustration */}
            <img
              src={loginIllustration}
              alt="TalentFlow Illustration"
              draggable={false}
              className="
                mx-auto
                mt-6
                max-h-56
                w-auto
                object-contain
                transition-all
                duration-500
                hover:-translate-y-2
                hover:scale-105
              "
            />
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
          <LoginForm />
        </section>
      </div>
    </main>
  );
}
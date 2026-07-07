import { useState } from "react";

import {
  BarChart3,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";

import logo from "@/assets/logo/logo.png";

import RegisterForm from "@/components/auth/RegisterForm";
import RegisterRoleSelector from "@/components/auth/RegisterRoleSelector";

import type { UserRole } from "@/types/auth";

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] =
    useState<UserRole>("Candidate");

  return (
    <main className="min-h-screen bg-[#FBF4EC]">
      <div
        className="
          mx-auto
          grid
          min-h-screen
          max-w-7xl
          gap-12
          px-6
          py-8
          lg:grid-cols-[46%_54%]
          lg:px-8
        "
      >
        {/* Left Panel */}

        <section
          className="
            order-2
            flex
            flex-col
            justify-center
            lg:order-1
          "
        >
          <div className="mx-auto w-full max-w-xl lg:max-w-none">

            {/* Logo */}

            <img
              src={logo}
              alt="TalentFlow OS"
              draggable={false}
              className="
                h-10
                w-auto
                transition-transform
                duration-300
                hover:scale-105
              "
            />

            {/* Badge */}

            <div
              className="
                mt-3
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#fadbc8]
                px-4
                py-2
                text-sm
                font-bold
                text-[#FF8A5B]
              "
            >
              <User className="h-4 w-4" />

              Create Account
            </div>

            {/* Heading */}

            <h1
              className="
                mt-3
                text-4xl
                font-bold
                leading-tight
                tracking-[-0.04em]
                text-[#102541]
              "
            >
              Create Your
              <br />

              TalentFlow Account
            </h1>

            <p
              className="
                mt-5
                max-w-xl
                text-base
                font-medium
                leading-8
                text-slate-600
              "
            >
              Join
              <span className="font-bold text-[#FF8A5B]">
                {" "}
                TalentFlow OS
              </span>{" "}
              and streamline hiring with an
              intelligent recruitment platform
              built for candidates,
              recruiters and hiring managers.
            </p>

            {/* Role Selector */}

            <div className="mt-5">
              <RegisterRoleSelector
                selectedRole={selectedRole}
                onRoleChange={setSelectedRole}
              />
            </div>

               

          </div>
        </section>

        {/* Right Panel */}

        <section
          className="
            order-1
            flex
            items-center
            justify-center
            lg:order-2
          "
        >
          <div className="w-full max-w-xl">
                        <RegisterForm
              role={selectedRole}
            />

            

          </div>
        </section>
                 {/* End Right Panel */}
      </div>
    </main>
  );
} 
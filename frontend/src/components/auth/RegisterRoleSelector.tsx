import {
  BriefcaseBusiness,
  Building2,
  User,
  type LucideIcon,
} from "lucide-react";

import type { UserRole } from "@/types/auth";

interface RegisterRoleSelectorProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

interface RoleOption {
  role: UserRole;
  title: string;
  description: string;
  icon: LucideIcon;
}

const roles: RoleOption[] = [
  {
    role: "Candidate",
    title: "Candidate",
    description:
      "Find jobs, build your professional profile and apply to opportunities.",
    icon: User,
  },
  {
    role: "Recruiter",
    title: "Recruiter",
    description:
      "Manage vacancies, discover candidates and recruit top talent.",
    icon: BriefcaseBusiness,
  },
  {
    role: "HiringManager",
    title: "Hiring Manager",
    description:
      "Review candidates, schedule interviews and collaborate with recruiters to make hiring decisions.",
    icon: Building2,
  },
];

export default function RegisterRoleSelector({
  selectedRole,
  onRoleChange,
}: RegisterRoleSelectorProps) {
  return (
    <div className="w-full">
      <h3 className="mb-2 text-lg font-bold text-[#102541]">
        Choose your account type
      </h3>

      <div className="space-y-4">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected =
            selectedRole === role.role;

          return (
            <button
              key={role.role}
              type="button"
              aria-pressed={isSelected}
              onClick={() =>
                onRoleChange(role.role)
              }
              className={`
                group
                flex
                w-full
                items-center
                justify-between
                rounded-3xl
                border
                p-5
                text-left
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg

                ${
                  isSelected
                    ? "border-[#FF8A5B] bg-[#FFF8F4] shadow-lg"
                    : "border-slate-200 bg-white hover:border-[#FFD3BF]"
                }
              `}
            >
              <div className="flex gap-4">
                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#FFF3EC]
                    text-[#FF8A5B]
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                >
                  <Icon className="h-7 w-7" />
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#102541]">
                    {role.title}
                  </h4>

                  <p
                    className="
                      mt-1
                      text-sm
                      leading-6
                      text-slate-600
                    "
                  >
                    {role.description}
                  </p>
                </div>
              </div>

              <div
                className={`
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  transition-all

                  ${
                    isSelected
                      ? "border-[#FF8A5B] bg-[#FF8A5B]"
                      : "border-slate-300"
                  }
                `}
              >
                {isSelected && (
                  <div className="h-2.5 w-2.5 rounded-full bg-white" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
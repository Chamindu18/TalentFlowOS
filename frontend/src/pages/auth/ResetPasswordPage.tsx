import {
  KeyRound,
  Lock,
  ShieldCheck,
} from "lucide-react";

import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

import logo from "@/assets/logo/logo.png";
import resetPasswordIllustration from "@/assets/auth/reset-password-illustration.png";

export default function ResetPasswordPage() {
  return (
    <div
      className="
        h-screen
        overflow-hidden
        bg-[#FBF4EC]
        px-4
        py-4
        sm:px-6
        lg:px-10
      "
    >
      <div
        className="
          mx-auto
          grid
          h-full
          max-w-7xl
          items-center
          gap-6
          lg:grid-cols-[45%_55%]
        "
      >
        {/* LEFT SECTION */}
        <div
          className="
            hidden
            flex-col
            justify-center
            lg:flex
          "
        >
          {/* Logo */}
          <img
            src={logo}
            alt="TalentFlow OS"
            className="h-11 w-fit"
          />

          {/* Badge */}
          <div
            className="
              mt-5
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-orange-200
              bg-orange-100
              px-4
              py-2
              text-sm
              font-semibold
              text-[#FF8A5B]
            "
          >
            <KeyRound className="h-4 w-4" />
            Secure Password Reset
          </div>

          {/* Heading */}
          <h1
            className="
              mt-4
              max-w-xl
              text-4xl
              font-bold
              tracking-tighter
              text-[#1F4E8D]
              xl:text-5xl
            "
          >
            Create A New Password
          </h1>

          {/* Description */}
          <p
            className="
              mt-4
              max-w-lg
              text-lg
              font-semibold
              leading-9
              text-slate-600
            "
          >
            Choose a strong password to
            secure your TalentFlow OS
            account and continue your
            journey with confidence.
          </p>

          {/* Features */}
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck
                className="h-5 w-5 text-[#FF8A5B]"
              />

              <span className="text-slate-700">
                Strong Password Protection
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Lock
                className="h-5 w-5 text-[#FF8A5B]"
              />

              <span className="text-slate-700">
                Secure Account Recovery
              </span>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck
                className="h-5 w-5 text-[#FF8A5B]"
              />

              <span className="text-slate-700">
                Enterprise Security Standards
              </span>
            </div>
          </div>

          {/* Illustration */}
          <div className="group mt-6 flex justify-center">
            <img
              src={resetPasswordIllustration}
              alt="Reset Password Illustration"
              className="
                max-h-[240px]
                w-auto
                object-contain
                transition-all
                duration-700
                ease-out
                group-hover:-translate-y-3
                group-hover:scale-110
              "
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div
          className="
            flex
            items-start
            justify-center
            lg:-mt-10
          "
        >
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}
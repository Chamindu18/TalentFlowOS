import {
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";

import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

import logo from "@/assets/logo/logo.png";
import forgotPasswordIllustration from "@/assets/auth/forgot-password-illustration.png";

export default function ForgotPasswordPage() {
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
            <Lock className="h-4 w-4" />
            Secure Account Recovery
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
            Forgot Your Password?
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
            No worries. Enter your registered
            email address and we'll send you
            a secure password reset link.
          </p>

          {/* Features */}
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck
                className="h-5 w-5 text-[#FF8A5B]"
              />

              <span className="text-slate-700">
                Password Reset Protection
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Mail
                className="h-5 w-5 text-[#FF8A5B]"
              />

              <span className="text-slate-700">
                15-Minute Secure Reset Links
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
              src={forgotPasswordIllustration}
              alt="Forgot Password Illustration"
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
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
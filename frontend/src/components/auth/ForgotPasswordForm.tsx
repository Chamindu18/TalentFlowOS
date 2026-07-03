import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import authService from "@/services/auth.service";

export default function ForgotPasswordForm() {
  const [email, setEmail] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const [isSubmitted, setIsSubmitted] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error(
        "Please enter your email address.",
      );

      return;
    }

    try {
      setIsLoading(true);

      await authService.forgotPassword(
        email,
      );

      setIsSubmitted(true);

      toast.success(
        "Password reset email sent.",
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        className="
          w-full
          max-w-xl
          rounded-[36px]
          border
          border-slate-100
          bg-white
          p-10
          text-center
          shadow-[0_20px_60px_rgba(15,23,42,0.08)]
        "
      >
        <div
          className="
            mx-auto
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-[#FFF3EC]
          "
        >
          <Mail
            className="h-10 w-10 text-[#FF8A5B]"
          />
        </div>

        <h2
          className="
            mt-6
            text-3xl
            font-bold
            text-[#102541]
          "
        >
          Check Your Email
        </h2>

        <p
          className="
            mt-4
            text-base
            leading-8
            text-slate-500
          "
        >
          If an account exists for
          <span className="font-semibold">
            {" "}
            {email}
          </span>
          , we've sent a password
          reset link.
        </p>

        <Link
          to="/login"
          className="
            mt-8
            inline-flex
            items-center
            gap-2
            font-semibold
            text-[#FF8A5B]
            transition-colors
            hover:text-[#FF7043]
          "
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div
      className="
        w-full
        max-w-xl
        rounded-[36px]
        border
        border-slate-100
        bg-white
        p-8
        shadow-[0_20px_60px_rgba(15,23,42,0.08)]
      "
    >
      {/* Mobile Header */}
      <div className="mb-6 text-center lg:hidden">
        <h1
          className="
            text-2xl
            font-bold
            tracking-[-0.04em]
            text-[#102541]
          "
        >
          Forgot Password
        </h1>

        <p className="mt-2 text-slate-500">
          Reset your account password securely.
        </p>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block">
        <h2
          className="
            text-2xl
            font-bold
            tracking-[-0.04em]
            bg-gradient-to-r
            from-[#FF8A5B]
            via-[#1B3558]
            to-[#FF8A5B]
            bg-clip-text
            text-transparent
          "
        >
          Forgot Password
        </h2>

        <p
          className="
            mt-3
            text-base
            leading-8
            text-slate-500
          "
        >
          Enter your registered email
          to receive a secure password
          reset link.
        </p>
      </div>

      <form
        className="mt-8 space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Email Address
          </label>

          <div className="relative">
            <Mail
              className="
                absolute
                left-4
                top-1/2
                h-5
                w-5
                -translate-y-1/2
                text-[#FF8A5B]/70
              "
            />

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value,
                )
              }
              placeholder="kasun.perera@talentflow.lk"
              className="
                h-14
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                pl-12
                pr-4
                text-base
                placeholder:text-slate-400
                outline-none
                transition-all
                duration-300
                focus:border-[#FF8A5B]
                focus:bg-white
                focus:ring-4
                focus:ring-[#FF8A5B]/10
              "
            />
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="
            group
            h-14
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-[#FF8A5B]
            to-[#FF7043]
            text-base
            font-semibold
            text-white
            shadow-md
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-2xl
            active:scale-[0.98]
            disabled:opacity-70
          "
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <span className="flex items-center gap-2">
              Send Reset Link

              <ArrowRight
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </span>
          )}
        </Button>

        {/* Back */}
        <p
          className="
            pt-2
            text-center
            text-sm
            text-slate-500
          "
        >
          Remember your password?{" "}
          <Link
            to="/login"
            className="
              font-semibold
              text-[#FF8A5B]
              transition-colors
              duration-300
              hover:text-[#FF7043]
            "
          >
            Sign In
          </Link>
        </p>

        {/* Security Notice */}
        <div
          className="
            mt-6
            flex
            gap-3
            rounded-2xl
            bg-[#FFF8F4]
            p-5
          "
        >
          <ShieldCheck
            className="
              mt-0.5
              h-5
              w-5
              shrink-0
              text-[#FF8A5B]
            "
          />

          <p
            className="
              text-sm
              leading-7
              text-slate-500
            "
          >
            For security reasons,
            password reset links are
            only sent to registered
            accounts.
          </p>
        </div>
      </form>
    </div>
  );
}
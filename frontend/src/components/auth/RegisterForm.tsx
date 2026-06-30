import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function RegisterForm() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  return (
    <div
      className="
        w-full
        max-w-xl
        rounded-[32px]
        border
        border-slate-100
        bg-white
        p-6
        shadow-[0_20px_60px_rgba(15,23,42,0.08)]
        lg:p-7
      "
    >
      {/* Header */}
      <div className="text-center">
        <h2
          className="
            text-3xl
            font-bold
            tracking-[-0.04em]
            text-[#fa6934]
          "
        >
          Create Your Account
        </h2>

        <p
          className="
            mt-2
            text-base
            font-medium
            text-slate-500
          "
        >
          Fill in your details to get started.
        </p>
      </div>

      <form className="mt-7 space-y-4">
        {/* First & Last Name */}
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-[#102541]
              "
            >
              First Name
            </label>

            <div className="relative">
              <User
                className="
                  absolute
                  left-4
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                placeholder="Kasun"
                className="
                  h-12
                  w-full
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  pl-11
                  pr-4
                  text-sm
                  font-medium
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

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-[#102541]
              "
            >
              Last Name
            </label>

            <div className="relative">
              <User
                className="
                  absolute
                  left-4
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                placeholder="Perera"
                className="
                  h-12
                  w-full
                  rounded-2xl
                  font-medium
                  border
                  border-slate-200
                  bg-slate-50
                  pl-11
                  pr-4
                  text-sm
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
        </div>

        {/* Email */}
        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-[#102541]
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
                h-4
                w-4
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="email"
              placeholder="kasun.perera@gmail.com"
              className="
                h-12
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                pl-11
                pr-4
                text-sm
                font-medium
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

        {/* Password */}
        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-[#102541]
            "
          >
            Password
          </label>

          <div className="relative">
            <Lock
              className="
                absolute
                left-4
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              className="
                h-12
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                pl-11
                pr-12
                text-sm
                font-medium
                outline-none
                transition-all
                duration-300
                focus:border-[#FF8A5B]
                focus:bg-white
                focus:ring-4
                focus:ring-[#FF8A5B]/10
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-slate-400
                transition-colors
                hover:text-[#FF8A5B]
              "
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          <p
            className="
              mt-2
              text-xs
              font-medium
              text-slate-500
            "
          >
            Minimum 8 characters with uppercase,
            lowercase and number.
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-[#102541]
            "
          >
            Confirm Password
          </label>

          <div className="relative">
            <Lock
              className="
                absolute
                left-4
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm your password"
              className="
                h-12
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                pl-11
                pr-12
                text-sm
                font-medium
                outline-none
                transition-all
                duration-300
                focus:border-[#FF8A5B]
                focus:bg-white
                focus:ring-4
                focus:ring-[#FF8A5B]/10
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  (prev) => !prev,
                )
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-slate-400
                transition-colors
                hover:text-[#FF8A5B]
              "
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Terms */}
        <label
          className="
            flex
            items-start
            gap-3
            text-xs
            font-medium
            text-slate-600
          "
        >
          <input
            type="checkbox"
            className="
              mt-0.5
              h-4
              w-4
              accent-[#FF8A5B]
            "
          />

          <span>
            I agree to the{" "}
            <Link
              to="/terms"
              className="
                font-medium
                text-[#FF5B1F]
                hover:underline
              "
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="
                font-medium
                text-[#FF5B1F]
                hover:underline
              "
            >
              Privacy Policy
            </Link>
          </span>
        </label>

        {/* Create Account */}
        <Button
          className="
            group
            h-12
            w-full
            rounded-2xl
            bg-linear-to-r
            from-[#FF8A5B]
            to-[#FF5B1F]
            text-sm
            font-semibold
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-2xl
          "
        >
          Create Account

          <ArrowRight
            className="
              ml-2
              h-4
              w-4
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </Button>

        {/* Login */}
        <p
          className="
            pt-1
            text-center
            text-sm
            font-medium
            text-slate-500
          "
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              font-semibold
              text-[#FF5B1F]
              transition-colors
              hover:text-[#ff7843]
            "
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
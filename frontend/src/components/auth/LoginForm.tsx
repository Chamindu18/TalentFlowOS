import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";

export default function LoginForm() {
  const navigate = useNavigate();

  const login = useAuthStore(
    (state) => state.login,
  );

  const isLoading = useAuthStore(
    (state) => state.isLoading,
  );

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(
        "Please enter your email and password.",
      );

      return;
    }

    try {
      await login({
        email,
        password,
      });

      const user =
        useAuthStore.getState().user;

      toast.success(
        "Login successful!",
      );

      switch (user?.role) {
        case "Candidate":
          navigate(
            "/candidate/dashboard",
          );
          break;

        case "Recruiter":
          navigate(
            "/recruiter/dashboard",
          );
          break;

        case "HiringManager":
          navigate("/hiring/dashboard");
          break;

        case "Admin":
          navigate(
            "/admin/dashboard",
          );
          break;

        default:
          navigate("/");
      }
    } catch (error) {
      toast.error(
        "Invalid email or password.",
      );
    }
  };

  return (
    <div
      className="
        w-full
        max-w-lg
        rounded-[36px]
        border
        border-slate-100
        bg-white
        p-5
        shadow-[0_20px_60px_rgba(15,23,42,0.08)]
        sm:p-6
      "
    >
      {/* Mobile Header */}
      <div className="mb-5 text-center lg:hidden">
        <h1
          className="
            text-3xl
            font-bold
            tracking-[-0.04em]
            text-[#102541]
          "
        >
          Welcome Back
        </h1>

        <p className="mt-2 text-slate-500">
          Sign in to continue using TalentFlow
          OS.
        </p>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block">
        <h2
          className="
            text-3xl
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
          Sign In
        </h2>

        <p
          className="
            mt-2
            text-base
            leading-7
            text-slate-500
          "
        >
          Access your recruitment dashboard
          and continue hiring smarter.
        </p>
      </div>

      <form
        className="mt-6 space-y-4"
        onSubmit={handleLogin}
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
                h-12
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

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
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
                h-5
                w-5
                -translate-y-1/2
                text-[#FF8A5B]/70
              "
            />

            <input
              id="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value,
                )
              }
              placeholder="••••••••"
              className="
                h-12
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                pl-12
                pr-12
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

            <button
              type="button"
              onClick={() =>
                setShowPassword(
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
                duration-300
                hover:text-[#FF8A5B]
              "
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <label
            className="
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-slate-700
            "
          >
            <input
              type="checkbox"
              className="
                h-4
                w-4
                accent-[#FF8A5B]
              "
            />

            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="
              text-sm
              font-medium
              text-[#FF8A5B]
              transition-colors
              duration-300
              hover:text-[#ff7843]
            "
          >
            Forgot Password?
          </Link>
        </div>

        {/* Sign In */}
        <Button
          type="submit"
          disabled={isLoading}
          className="
            group
            h-12
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
            hover:scale-[1.02]
            hover:shadow-2xl
            active:scale-[0.98]
            disabled:opacity-70
          "
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing In...
            </>
          ) : (
            <span className="flex items-center gap-2">
              Sign In

              <ArrowRight
                className="
                  h-4
                  w-4
                  transition-all
                  duration-300
                  group-hover:translate-x-1
                  group-hover:scale-110
                "
              />
            </span>
          )}
        </Button>

        {/* Register */}
        <p
          className="
            pt-2
            text-center
            text-sm
            text-slate-500
          "
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className="
              font-semibold
              text-[#FF8A5B]
              transition-colors
              duration-300
              hover:text-[#ff7843]
            "
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
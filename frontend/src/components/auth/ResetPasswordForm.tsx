import { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  ShieldCheck,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import authService from "@/services/auth.service";

export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const token =
    searchParams.get("token");

  const [newPassword, setNewPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showNewPassword,
    setShowNewPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  const [isSuccess, setIsSuccess] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    if (!token) {
      toast.error(
        "Invalid or expired reset link.",
      );

      return;
    }

    if (newPassword.length < 8) {
      toast.error(
        "Password must contain at least 8 characters.",
      );

      return;
    }

    if (
      newPassword !== confirmPassword
    ) {
      toast.error(
        "Passwords do not match.",
      );

      return;
    }

    try {
      setIsLoading(true);

      await authService.resetPassword(
        token,
        newPassword,
      );

      setIsSuccess(true);

      toast.success(
        "Password reset successful.",
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to reset password.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
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
        <div className="text-6xl">
          🎉
        </div>

        <h2
          className="
            mt-6
            text-3xl
            font-bold
            text-[#102541]
          "
        >
          Password Reset Successful
        </h2>

        <p
          className="
            mt-4
            text-base
            leading-8
            text-slate-500
          "
        >
          Your password has been updated
          successfully. You can now sign
          in using your new password.
        </p>

        <Button
          className="
            mt-8
            h-12
            rounded-2xl
            bg-[#FF8A5B]
            px-8
            hover:bg-[#FF7043]
          "
          onClick={() =>
            navigate("/login")
          }
        >
          Back To Login
        </Button>
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
          Reset Password
        </h2>

        <p
          className="
            mt-3
            text-base
            leading-8
            text-slate-500
          "
        >
          Enter your new password below.
          Make sure it's strong and
          unique.
        </p>
      </div>

      <form
        className="mt-8 space-y-6"
        onSubmit={handleSubmit}
      >
        {/* New Password */}
        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
            "
          >
            New Password
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
                text-[#FF8A5B]
              "
            />

            <input
              type={
                showNewPassword
                  ? "text"
                  : "password"
              }
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value,
                )
              }
              className="
                h-14
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                pl-12
                pr-12
                outline-none
                transition-all
                focus:border-[#FF8A5B]
                focus:ring-4
                focus:ring-[#FF8A5B]/10
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowNewPassword(
                  !showNewPassword,
                )
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            >
              {showNewPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
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
                h-5
                w-5
                -translate-y-1/2
                text-[#FF8A5B]
              "
            />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value,
                )
              }
              className="
                h-14
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                pl-12
                pr-12
                outline-none
                transition-all
                focus:border-[#FF8A5B]
                focus:ring-4
                focus:ring-[#FF8A5B]/10
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword,
                )
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

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
            hover:shadow-2xl
          "
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resetting...
            </>
          ) : (
            <span className="flex items-center gap-2">
              Reset Password

              <ArrowRight
                className="
                  h-4
                  w-4
                  transition-transform
                  group-hover:translate-x-1
                "
              />
            </span>
          )}
        </Button>

        <div
          className="
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
            For your security, you'll be
            signed out of all devices after
            your password is reset.
          </p>
        </div>

        <p
          className="
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
            "
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
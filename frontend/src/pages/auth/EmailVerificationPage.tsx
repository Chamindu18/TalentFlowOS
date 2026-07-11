import { useEffect, useState } from "react";

import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  CheckCircle2,
  Loader2,
  MailCheck,
  XCircle,
} from "lucide-react";

import logo from "@/assets/logo/logo.png";

import authService from "@/services/auth.service";

type VerificationStatus =
  | "loading"
  | "success"
  | "error";

export default function EmailVerificationPage() {
  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const token =
    searchParams.get("token");

  const [status, setStatus] =
    useState<VerificationStatus>(
      "loading",
    );

  const [message, setMessage] =
    useState(
      "Verifying your email address..."
    );

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");

        setMessage(
          "Verification token is missing."
        );

        return;
      }

      try {
        const response =
          await authService.verifyEmail(
            token,
          );

        setStatus("success");

        setMessage(
          response.message,
        );

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error: any) {
        let errorMessage =
          "Email verification failed.";

        if (
          error?.response?.data?.message
        ) {
          errorMessage =
            error.response.data.message;
        }

        setStatus("error");

        setMessage(errorMessage);
      }
    };

    verifyEmail();
  }, [navigate, token]);

  return (
    <main className="min-h-screen bg-[#FBF4EC]">
      <div
        className="
          mx-auto
          flex
          min-h-screen
          max-w-7xl
          items-center
          justify-center
          px-6
        "
      >
        <div
          className="
            w-full
            max-w-lg
            rounded-[36px]
            border
            border-slate-100
            bg-white
            p-8
            shadow-[0_20px_60px_rgba(15,23,42,0.08)]
          "
        >
          <div className="flex justify-center">
            <img
              src={logo}
              alt="TalentFlow OS"
              className="h-10 w-auto"
              draggable={false}
            />
          </div>

          <div className="mt-8 text-center">
            {status === "loading" && (
              <>
                <Loader2
                  className="
                    mx-auto
                    h-16
                    w-16
                    animate-spin
                    text-[#FF8A5B]
                  "
                />

                <h1
                  className="
                    mt-6
                    text-3xl
                    font-bold
                    tracking-[-0.04em]
                    text-[#102541]
                  "
                >
                  Verifying Email
                </h1>

                <p
                  className="
                    mt-4
                    text-base
                    leading-7
                    text-slate-500
                  "
                >
                  {message}
                </p>
              </>
            )}

            {status === "success" && (
              <>
                <CheckCircle2
                  className="
                    mx-auto
                    h-16
                    w-16
                    text-green-500
                  "
                />

                <h1
                  className="
                    mt-6
                    text-3xl
                    font-bold
                    tracking-[-0.04em]
                    text-[#102541]
                  "
                >
                  Email Verified
                </h1>

                <p
                  className="
                    mt-4
                    text-base
                    leading-7
                    text-slate-500
                  "
                >
                  {message}
                </p>

                <p
                  className="
                    mt-4
                    text-sm
                    text-slate-400
                  "
                >
                  Redirecting to login...
                </p>
              </>
            )}            {status === "error" && (
              <>
                <XCircle
                  className="
                    mx-auto
                    h-16
                    w-16
                    text-red-500
                  "
                />

                <h1
                  className="
                    mt-6
                    text-3xl
                    font-bold
                    tracking-[-0.04em]
                    text-[#102541]
                  "
                >
                  Verification Failed
                </h1>

                <p
                  className="
                    mt-4
                    text-base
                    leading-7
                    text-slate-500
                  "
                >
                  {message}
                </p>

                <div
                  className="
                    mt-8
                    rounded-2xl
                    bg-[#FFF7ED]
                    p-4
                    text-sm
                    leading-6
                    text-slate-600
                  "
                >
                  The verification link may be invalid,
                  expired, or has already been used.
                </div>

                <div
                  className="
                    mt-8
                    flex
                    flex-col
                    gap-3
                  "
                >
                  <Link
                    to="/login"
                    className="
                      flex
                      h-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-linear-to-r
                      from-[#FF8A5B]
                      to-[#FF7043]
                      text-base
                      font-semibold
                      text-white
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-xl
                    "
                  >
                    Go to Login
                  </Link>

                  <Link
                    to="/register"
                    className="
                      flex
                      h-12
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      text-base
                      font-semibold
                      text-slate-700
                      transition-all
                      duration-300
                      hover:bg-slate-50
                    "
                  >
                    Create Another Account
                  </Link>
                </div>
              </>
            )}
          </div>

          <div
            className="
              mt-10
              flex
              items-center
              justify-center
              gap-2
              border-t
              border-slate-100
              pt-6
              text-sm
              text-slate-500
            "
          >
            <MailCheck
              className="
                h-4
                w-4
                text-[#FF8A5B]
              "
            />

            <span>
              TalentFlow OS Authentication
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
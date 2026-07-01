import { Link } from "react-router-dom";

import { ArrowLeft, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-slate-50
        px-6
      "
    >
      <div className="max-w-lg text-center">
        <h1
          className="
            text-8xl
            font-black
            text-[#FF5B1F]
          "
        >
          404
        </h1>

        <h2
          className="
            mt-4
            text-3xl
            font-bold
            text-[#102541]
          "
        >
          Page Not Found
        </h2>

        <p
          className="
            mt-4
            text-base
            leading-7
            text-slate-500
          "
        >
          The page you are looking for does not
          exist or may have been moved.
        </p>

        <div
          className="
            mt-8
            flex
            flex-col
            justify-center
            gap-4
            sm:flex-row
          "
        >
          <Button
            asChild
            className="
              h-12
              rounded-2xl
              bg-[#FF5B1F]
              px-6
              hover:bg-[#ff7843]
            "
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="
              h-12
              rounded-2xl
              px-6
            "
          >
            <Link to="/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go to Login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
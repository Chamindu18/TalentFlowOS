import { Link } from "react-router-dom";

import { ArrowLeft, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
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
        <div
          className="
            mx-auto
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-full
            bg-red-100
          "
        >
          <ShieldAlert className="h-12 w-12 text-red-500" />
        </div>

        <h1
          className="
            mt-6
            text-5xl
            font-black
            text-red-500
          "
        >
          403
        </h1>

        <h2
          className="
            mt-4
            text-3xl
            font-bold
            text-[#102541]
          "
        >
          Access Denied
        </h2>

        <p
          className="
            mt-4
            text-base
            leading-7
            text-slate-500
          "
        >
          You do not have permission to
          access this page.
        </p>

        <Button
          asChild
          className="
            mt-8
            h-12
            rounded-2xl
            bg-[#FF5B1F]
            px-6
            hover:bg-[#ff7843]
          "
        >
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
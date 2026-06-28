import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronUp, Menu, X } from "lucide-react";

import logo from "@/assets/logo/logo.png";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Product",
    href: "#",
  },
  {
    title: "Solutions",
    href: "#",
  },
  {
    title: "Resources",
    href: "#",
  },
  {
    title: "Company",
    href: "#",
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FBF4EC]/95 backdrop-blur-md">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center transition-transform duration-300 hover:scale-[1.02]"
        >
          <img
            src={logo}
            alt="TalentFlow OS"
            className="h-24 w-auto object-contain lg:h-35"
            draggable={false}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 lg:flex">
          {navigationItems.map((item) => (
            <button
              key={item.title}
              className="group relative flex items-center gap-1.5 text-[17px] font-medium text-[#102541] transition-all duration-300 hover:text-[#FF8A5B]"
            >
              {item.title}

              <ChevronUp className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />

              <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-[#FF8A5B] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 lg:flex">
          <Link
            to="/login"
            className="
              group
              relative
              overflow-hidden
              rounded-full
              px-5
              py-3
              text-[17px]
              font-medium
              text-[#102541]
              transition-all
              duration-300
              hover:text-[#FF8A5B]
            "
          >
            <span
              className="
                absolute
                inset-0
                scale-90
                rounded-full
                bg-white
                opacity-0
                transition-all
                duration-300
                group-hover:scale-100
                group-hover:opacity-100
              "
            />

            <span
              className="
                absolute
                bottom-2
                left-1/2
                h-0.5
                w-0
                -translate-x-1/2
                bg-[#FF8A5B]
                transition-all
                duration-300
                group-hover:w-4/5
              "
            />

            <span className="relative z-10">Login</span>
          </Link>

          <Button
            asChild
            className="group h-14 rounded-full bg-[#FF8A5B] px-8 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff7843] hover:shadow-xl"
          >
            <Link
              to="/register"
              className="flex items-center gap-3"
            >
              Get Started

              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((previous) => !previous)}
          className="rounded-2xl p-3 text-[#102541] transition-all duration-300 hover:bg-white hover:shadow-md lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <Menu className="h-7 w-7" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-[#EAEAEA] bg-[#FBF4EC] shadow-lg lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6">
            {navigationItems.map((item) => (
              <button
                key={item.title}
                className="flex items-center justify-between rounded-2xl px-4 py-4 text-left text-lg font-medium text-[#102541] transition-all duration-300 hover:bg-white hover:shadow-sm"
              >
                <span>{item.title}</span>

                <ChevronUp className="h-5 w-5 rotate-180" />
              </button>
            ))}

            <div className="mt-6 flex flex-col gap-4">
              <Button
                asChild
                variant="outline"
                className="h-14 rounded-full border-[#102541] text-base font-medium text-[#102541] transition-all duration-300 hover:bg-[#102541] hover:text-white"
              >
                <Link to="/login">Login</Link>
              </Button>

              <Button
                asChild
                className="group h-14 rounded-full bg-[#FF8A5B] text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#ff7843] hover:shadow-lg"
              >
                <Link
                  to="/register"
                  className="flex items-center gap-3"
                >
                  Get Started

                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
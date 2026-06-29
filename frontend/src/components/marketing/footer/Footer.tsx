import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import logo from "@/assets/logo/logo.png";

const quickLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Login",
    href: "/login",
  },
  {
    label: "Get Started",
    href: "/register",
  },
];

const socialLinks = [
  {
    icon: FaInstagram,
    href: "#",
    label: "Instagram",
  },
  {
    icon: FaFacebookF,
    href: "#",
    label: "Facebook",
  },
  {
    icon: FaWhatsapp,
    href: "#",
    label: "WhatsApp",
  },
  {
    icon: FaLinkedinIn,
    href: "#",
    label: "LinkedIn",
  },
  {
    icon: FaGithub,
    href: "#",
    label: "GitHub",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#FBF4EC] px-6 py-12 lg:px-8 lg:py-16">
      <div
        className="
          relative
          mx-auto
          max-w-7xl
          overflow-hidden
          rounded-[40px]
          border
          border-slate-100
          bg-white
          px-8
          py-12
          shadow-[0_20px_60px_rgba(15,23,42,0.06)]
          lg:px-16
        "
      >
        {/* Background Glow */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[300px]
            w-[300px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#FF8A5B]/5
            blur-3xl
          "
        />

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex justify-center">
            <Link to="/">
              <img
                src={logo}
                alt="TalentFlow OS"
                draggable={false}
                className="h-14 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-center
              text-lg
              leading-9
              text-slate-600
            "
          >
            Intelligent recruitment platform that helps
            organizations attract, engage and hire the
            best talent with confidence.
          </p>

          {/* Social Icons */}
          <div
            className="
              mt-10
              flex
              flex-wrap
              justify-center
              gap-4
            "
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="
                    group
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    text-slate-600
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#FF8A5B]
                    hover:text-[#FF8A5B]
                    hover:shadow-lg
                  "
                >
                  <Icon
                    className="
                      h-6
                      w-6
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  />
                </a>
              );
            })}
          </div>

          {/* Quick Links */}
          <div
            className="
              mt-12
              flex
              flex-wrap
              justify-center
              gap-8
              border-t
              border-slate-100
              pt-10
            "
          >
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="
                  text-lg
                  font-medium
                  text-slate-600
                  transition-colors
                  duration-300
                  hover:text-[#FF8A5B]
                "
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="mt-10 text-center">
            <p className="text-base text-slate-500">
              © 2026 TalentFlow OS. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
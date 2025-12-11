"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full z-50 bg-white fixed top-0 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Akdenar Labs"
                width={150}
                height={34}
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop NavLinks */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            {[
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
              { name: "Careers", href: "/career" },
              { name: "Blog", href: "/blogs" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={` relative group cursor-pointer transition-all duration-300 ${
                  pathname === item.href ? "text-orange-500" : ""
                }`}
              >
                {item.name}

                {/* Underline Slide Animation */}
                <span
                  className="
                    absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-500 
                    transition-all duration-300 group-hover:w-full
                  "
                />
              </Link>
            ))}
          </div>
          {/* Desktop Button with Animation */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="
                bg-orange-500 text-white px-5 py-2 rounded-md text-sm font-semibold
                transition-all duration-300 transform
                hover:scale-[1.05] hover:shadow-[0_4px_15px_rgba(255,140,0,0.4)]
                active:scale-[0.98]
              "
            >
              Get in touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center transition-transform active:scale-90"
            onClick={() => setOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl p-6 z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" onClick={() => setOpen(false)}>
            <Image src="/logo.svg" alt="Akdenar Labs" width={140} height={34} />
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="transition-transform active:scale-90"
          >
            <X size={26} />
          </button>
        </div>

        {/* Drawer Nav Items */}
        <div className="inline-flex flex-col gap-6 text-[16px] font-medium text-gray-700">
          {[
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
            { name: "Careers", href: "/career" },
            { name: "Blog", href: "/blogs" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="relative group"
            >
              {item.name}

              {/* Mobile Underline Animation */}
              <span
                className="
                  absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-500 
                  transition-all duration-300 group-hover:w-1/2
                "
              />
            </Link>
          ))}

          {/* CTA Button */}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="
              mt-4 bg-orange-500 text-white px-4 py-2 rounded-md text-center
              transition-all duration-300 hover:scale-[1.05]
              hover:shadow-[0_4px_15px_rgba(255,140,0,0.4)]
            "
          >
            Get in touch
          </Link>
        </div>
      </div>
    </>
  );
}

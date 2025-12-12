"use client";

import { GithubIcon, Instagram, Mail, Twitter } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage({ type: "error", text: "Please enter your email" });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: data.message });
        setEmail(""); // Clear input on success
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to subscribe",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="w-full bg-white pt-16 border-t ">
      <div className="container mx-auto px-6 md:px-12 ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16">
          {/* Logo + Description */}
          <div>
            <img src="/logo.svg" alt="Akdenar" className="h-8 mb-4" />
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Building institutions that stand the test of time. Where
              innovation meets empathy, and technology serves humanity.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-5">
              <div className="size-9 p-1 bg-orange-500 text-white rounded-md flex items-center justify-center">
                <Instagram className="ri-instagram-line" />
              </div>
              <div className="size-9 p-1 bg-orange-500 text-white rounded-md flex items-center justify-center">
                <Twitter className="ri-twitter-line" />
              </div>
              <div className="size-9 p-1 bg-orange-500 text-white rounded-md flex items-center justify-center">
                <GithubIcon className="ri-links-line" />
              </div>
              <div className="size-9 p-1 bg-orange-500 text-white rounded-md flex items-center justify-center">
                <Mail className="ri-mail-line" />
              </div>
            </div>
          </div>

          {/* Company */}
          <div className="hidden md:block md:pl-10 lg:pl-0">
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>Home</li>
              <li>About</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* Our Verticals + Newsletter */}
          <div className="col-span-2 ">
            <div className="flex justify-between">
              <div className="sm:hidden mb-2">
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>Home</li>
                  <li>About</li>
                  <li>Careers</li>
                  <li>Blog</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Our Verticals</h4>
                <ul className="space-y-2 text-gray-600 text-sm mb-6">
                  <li>Deshmitra</li>
                  <li>Akdenar Labs</li>
                </ul>
              </div>

              {/* Get in touch */}
              <div className="flex md:justify-end">
                <button className=" px-4 sm:px-6 py-2 rounded-md bg-orange-500 text-white font-medium shadow hover:bg-orange-600 h-fit">
                  Get in touch
                </button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <h4 className="font-semibold text-lg">
                  Subscribe to our newsletter
                </h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Get the latest updates and news delivered to your inbox.
              </p>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm flex-1 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap transition-all transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Subscribing...
                    </span>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
              {message && (
                <div
                  className={`mt-3 p-3 rounded-lg text-sm flex items-start gap-2 animate-in slide-in-from-top-2 ${
                    message.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {message.type === "success" ? (
                    <svg
                      className="h-5 w-5 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span className="flex-1">{message.text}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#6C7BFF] py-6 mt-2">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between text-sm text-white/90">
          <span>© 2025 Akdenar Ltd.</span>
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">
              Privacy policy
            </span>
            <span className="hover:underline cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

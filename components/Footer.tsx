import { GithubIcon, Instagram, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white pt-16 border-t ">

      <div className="container mx-auto px-6 md:px-12 ">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16">

          {/* Logo + Description */}
          <div>
            <img src="/logo.svg" alt="Akdenar" className="h-8 mb-4" />
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Building institutions that stand the test of time. Where innovation
              meets empathy, and technology serves humanity.
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
            <div className="">
              <h4 className="font-semibold mb-3">Subscribe to our newsletter</h4>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-md border border-gray-300 text-sm w-full"
                />
                <button className="px-5 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#6C7BFF] py-6 mt-2">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between text-sm text-white/90">
          <span>© 2025 Akdenar Ltd.</span>
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">Privacy policy</span>
            <span className="hover:underline cursor-pointer">Terms</span>
          </div>
        </div>
      </div>

    </footer>
  );
}

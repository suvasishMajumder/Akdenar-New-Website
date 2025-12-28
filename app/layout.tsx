import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { HomepageSEOSchemas } from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Base URL for the website - update this for production
const baseUrl = "https://www.akdenar.com";

export const metadata: Metadata = {
  // Basic Meta Tags
  title: {
    default: "Akdenar - India's Leading B2B E-commerce Platform",
    template: "%s | Akdenar",
  },
  description:
    "Akdenar is India's premier B2B e-commerce platform connecting wholesalers, retailers, and manufacturers. Discover bulk deals, verified suppliers, and seamless business transactions.",
  keywords: [
    "B2B e-commerce",
    "wholesale marketplace",
    "bulk buying",
    "Indian suppliers",
    "business marketplace",
    "Akdenar",
    "B2B platform India",
    "wholesale deals",
    "manufacturer directory",
  ],
  authors: [{ name: "Akdenar Team" }],
  creator: "Akdenar",
  publisher: "Akdenar",

  // Favicon and Icons
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.png", sizes: "144x144", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
  },

  // Canonical URL
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },

  // Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: baseUrl,
    siteName: "Akdenar",
    title: "Akdenar - India's Leading B2B E-commerce Platform",
    description:
      "Connect with verified suppliers. Discover bulk deals. Grow your business with Akdenar.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Akdenar B2B E-commerce Platform",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Akdenar - India's Leading B2B E-commerce Platform",
    description:
      "Connect with verified suppliers. Discover bulk deals. Grow your business.",
    images: ["/og-image.png"],
    creator: "@akdenar",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (add your verification codes when available)
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* JSON-LD Structured Data for SEO */}
        <HomepageSEOSchemas />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

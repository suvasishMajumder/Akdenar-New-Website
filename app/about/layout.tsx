import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Akdenar's mission to revolutionize B2B e-commerce in India. Discover our story, values, leadership team, and the vision behind India's leading wholesale marketplace.",
  openGraph: {
    title: "About Akdenar - Our Story & Mission",
    description:
      "Learn about Akdenar's mission to revolutionize B2B e-commerce in India. Meet the team building India's premier wholesale marketplace.",
    url: "https://www.akdenar.com/about",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Akdenar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Akdenar - Our Story & Mission",
    description:
      "Learn about Akdenar's mission to revolutionize B2B e-commerce in India.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

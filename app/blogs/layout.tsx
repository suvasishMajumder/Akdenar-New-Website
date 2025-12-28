import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stay updated with the latest B2B e-commerce trends, business tips, industry insights, and company updates from Akdenar's expert team.",
  openGraph: {
    title: "Akdenar Blog - B2B E-commerce Insights & Stories",
    description:
      "Explore research, engineering breakdowns, product announcements, and everything happening at Akdenar.",
    url: "https://www.akdenar.com/blogs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Akdenar Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akdenar Blog - B2B E-commerce Insights & Stories",
    description:
      "Latest trends, tips, and insights for B2B businesses from the Akdenar team.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/blogs",
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

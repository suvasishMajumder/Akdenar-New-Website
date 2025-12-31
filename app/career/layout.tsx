import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Akdenar team! Explore exciting career opportunities in India's fastest-growing B2B e-commerce company. Work on impactful projects with talented professionals.",
  openGraph: {
    title: "Careers at Akdenar - Join Our Team",
    description:
      "Explore exciting career opportunities at Akdenar. Work on global impact projects with a mission-driven team.",
    url: "https://www.akdenar.com/career",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Careers at Akdenar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Akdenar - Join Our Team",
    description:
      "Explore exciting career opportunities at India's leading B2B e-commerce platform.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/career",
  },
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

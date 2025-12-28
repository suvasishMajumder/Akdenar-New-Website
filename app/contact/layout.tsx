import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Akdenar. We're here to help with your B2B e-commerce needs. Contact our support team for partnerships, queries, or any assistance.",
  openGraph: {
    title: "Contact Akdenar - We're Here to Help",
    description:
      "Get in touch with our team for partnerships, support, or any queries. We're here to help you grow your business.",
    url: "https://www.akdenar.com/contact",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Akdenar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Akdenar - We're Here to Help",
    description:
      "Get in touch with our team for partnerships, support, or any queries.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

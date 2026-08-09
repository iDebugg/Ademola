import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Ademola | Software Engineer",
  description:
    "Portfolio of Ademola, a software engineer focused on JavaScript, React, Next.js, and AI-powered web products.",
  icons: {
    icon: "/myProfile.jpg",
    shortcut: "/myProfile.jpg",
    apple: "/myProfile.jpg",
  },
  openGraph: {
    title: "Ademola | Software Engineer",
    description:
      "Portfolio of Ademola, a software engineer focused on JavaScript, React, Next.js, and AI-powered web products.",
    images: ["/myProfile.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ademola | Software Engineer",
    description:
      "Portfolio of Ademola, a software engineer focused on JavaScript, React, Next.js, and AI-powered web products.",
    images: ["/myProfile.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

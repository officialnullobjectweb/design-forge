import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DesignForge — Your Free Design Command Center",
  description:
    "Aggregating the best FREE UI/UX design resources — shadcn/ui, MagicUI, Framer Motion, Three.js, Lucide Icons, and more. One command, zero cost, premium results.",
  keywords: [
    "free ui components",
    "tailwind css",
    "shadcn ui",
    "framer motion",
    "react components",
    "free design resources",
    "ui library",
    "open source design",
  ],
  openGraph: {
    title: "DesignForge — Free Design Command Center",
    description:
      "18+ free UI/UX resources aggregated in one place. One command setup, premium results.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        {children}
      </body>
    </html>
  );
}

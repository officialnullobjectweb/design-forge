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
    "80+ free UI/UX design resources aggregated in one place. Components, fonts, colors, animations, templates, design skills, and more. One command, zero cost, premium results.",
  keywords: [
    "free ui components", "tailwind css", "shadcn ui", "framer motion",
    "google fonts", "free icons", "design resources", "ui library",
    "open source design", "free templates", "design skills",
  ],
  openGraph: {
    title: "DesignForge — Free Design Command Center",
    description: "80+ free design resources, templates, and skills in one place.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-zinc-900 font-sans">
        {children}
      </body>
    </html>
  );
}

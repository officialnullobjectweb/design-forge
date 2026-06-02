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
  title: "Numb.Design — AI-Powered Frontend Builder. Zero Bloat. Instant Setup.",
  description:
    "Tell your AI agent what you want to build. Numb.Design installs only the packages you need — nothing extra. Premium frontends in 5 minutes from 100% free resources.",
  keywords: [
    "frontend builder", "ai frontend agent", "npm frontend package",
    "react component installer", "tailwind css", "framer motion",
    "shadcn ui", "google fonts", "free icons", "design resources",
    "ui builder", "vibe coding", "ai agent toolkit", "design system cli",
    "landing page builder", "dashboard template", "zero bloat frontend",
    "free ui components", "open source design",
  ],
  openGraph: {
    title: "Numb.Design — AI-Powered Frontend Builder",
    description: "Tell your AI agent what to build. Installs only what you need. Premium frontends in 5 minutes.",
    type: "website",
    siteName: "Numb.Design",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Numb.Design — AI-Powered Frontend Builder",
    description: "Tell your AI agent what to build. Installs only what you need. Premium frontends in 5 minutes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Numb.Design',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS, Windows, Linux',
    description: 'AI-powered frontend builder that installs only the packages you need via a single NPM command. No bloat, no conflicts, premium results.',
    url: 'https://numb.design',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'Numb.Design',
    },
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col bg-white text-zinc-900 font-sans`}>
        {children}
      </body>
    </html>
  );
}

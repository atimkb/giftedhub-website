import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Gifted Hub - Premium Curated Gifting Platform",
  description: "Discover perfect gifts for every occasion at The Gifted Hub. We offer curated gift boxes, personalized gifts, experience gifts, and subscription boxes.",
  keywords: ["gifts", "curated gifts", "personalized gifts", "experience gifts", "subscription boxes", "premium gifts", "The Gifted Hub"],
  authors: [{ name: "The Gifted Hub Team" }],
  openGraph: {
    title: "The Gifted Hub - Premium Curated Gifting Platform",
    description: "Discover perfect gifts for every occasion at The Gifted Hub.",
    url: "https://thegiftedhub.com",
    siteName: "The Gifted Hub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Gifted Hub - Premium Curated Gifting Platform",
    description: "Discover perfect gifts for every occasion at The Gifted Hub.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Editorial grotesk for display type + a clean workhorse sans for body copy.
// In production, swap these for a licensed pairing (e.g. PP Neue Montreal /
// Suisse Int'l) — next/font makes that a one-line change.
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.twinklesinghal.com"),
  title: {
    default: "Twinkle Singhal — Lead Generation & Digital Marketing Specialist",
    template: "%s | Twinkle Singhal",
  },
  description:
    "Twinkle Singhal is a lead generation and digital marketing specialist with 10+ years of experience helping businesses scale through LinkedIn outreach, cold email, SEO, and paid performance ads.",
  openGraph: {
    type: "website",
    siteName: "Twinkle Singhal",
    title: "Twinkle Singhal — Lead Generation & Digital Marketing Specialist",
    description:
      "Qualified B2B leads, measured performance, and business growth across India, USA, UK, Canada & GCC.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-paper text-ink">
        <CursorProvider>
          <SmoothScroll>
            <Header />
            <PageTransition>
              <main>{children}</main>
              <Footer />
            </PageTransition>
          </SmoothScroll>
        </CursorProvider>
      </body>
    </html>
  );
}

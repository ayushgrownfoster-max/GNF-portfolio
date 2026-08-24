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
  metadataBase: new URL("https://www.grownfoster.com"),
  title: {
    default: "Grow N Foster — Creative & Digital Marketing Agency",
    template: "%s | Grow N Foster",
  },
  description:
    "Grow N Foster is a creative and digital marketing agency building measurable growth through branding, performance marketing, SEO, and creative campaigns.",
  openGraph: {
    type: "website",
    siteName: "Grow N Foster",
    title: "Grow N Foster — Creative & Digital Marketing Agency",
    description:
      "Creative thinking, digital expertise, and measurable business impact.",
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

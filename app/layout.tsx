import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { AIChatbot } from "@/components/AIChatbot";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AeroGlass VTOL Portfolio",
  description:
    "The Weightless Core — precision-engineered VTOL systems and interactive WebGL interfaces.",
  keywords: ["VTOL", "drone", "portfolio", "Next.js", "Three.js", "React"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>
            {children}
            {/* Global Floating AI Chatbot */}
            <AIChatbot />
        </Providers>
      </body>
    </html>
  );
}

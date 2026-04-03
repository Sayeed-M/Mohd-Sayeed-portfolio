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
  title: "Mohd Sayeed S Mulla | AI & Aerospace Developer",
  description:
    "Portfolio of Mohd Sayeed S Mulla. Specialized in high-performance autonomous drone design, VTOL logic, WebGL interactive interfaces, and Full-Stack scalable application development.",
  keywords: ["VTOL", "drone", "portfolio", "Next.js", "Three.js", "React", "AI", "Machine Learning", "Aerospace Engineering"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aeroglass-systems.com'),
  openGraph: {
    type: "website",
    title: "Mohd Sayeed S Mulla | AI & Drone Developer",
    description: "Bridging autonomous aerospace systems with cutting-edge full-stack software and 3D web experiences.",
    url: "/",
    siteName: "Mohd Sayeed Portfolio",
    images: [{
      url: "/assets/profile.jpg",
      width: 1200,
      height: 630,
      alt: "Mohd Sayeed S Mulla Professional Portfolio Preview",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohd Sayeed S Mulla | AI & Drone Developer",
    description: "Interactive portfolio detailing projects across Next.js, VTOL systems, and AI processing.",
    images: ["/assets/profile.jpg"],
    creator: "@AeroGlassSystem",
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

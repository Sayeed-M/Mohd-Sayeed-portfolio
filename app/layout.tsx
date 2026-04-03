import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { AIChatbot } from "@/components/AIChatbot";
import { Providers } from "./providers";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohd Sayeed S Mulla | Application / Flutter Developer",
  description:
    "Portfolio of Mohd Sayeed S Mulla. Specialized in high-performance application design, Android/iOS systems, and Full-Stack scalable application development.",
  keywords: ["Application Developer", "Flutter", "portfolio", "Next.js", "Android", "React", "AI", "Machine Learning", "VTOL"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sayeed.dev'),
  openGraph: {
    type: "website",
    title: "Mohd Sayeed S Mulla | Full Stack Developer",
    description: "Bridging intelligent apps with AI & innovation.",
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
    title: "Mohd Sayeed S Mulla | Full Stack Developer",
    description: "Interactive portfolio detailing projects across Next.js, Flutter, Android, and AI.",
    images: ["/assets/profile.jpg"],
    creator: "@MohdSayeed",
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
      <body className="min-h-full flex flex-col relative">
        <Providers>
            {/* The wrapper content flex-grow pushes footer to bottom automatically */}
            <div className="flex-grow flex flex-col">
              {children}
            </div>
            
            {/* Global Static Footer */}
            <Footer />

            {/* Global Floating AI Chatbot */}
            <AIChatbot />
        </Providers>
      </body>
    </html>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Mail, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full relative z-50 mt-auto bg-white/5 dark:bg-white/10 backdrop-blur-md border-t border-white/10 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_-8px_30px_rgba(255,255,255,0.02)]">
      {/* Footer Container */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        
        {/* Top Section / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 items-start text-center md:text-left">
          
          {/* LEFT SECTION */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h2 className="font-display text-2xl font-black text-on-surface tracking-tight">
              MOHD SAYEED S MULLA
            </h2>
            <p className="font-manrope text-sm text-on-surface-variant max-w-sm">
              Application / Flutter Developer<br />
              Building intelligent apps with AI & innovation 🚀
            </p>
            <div className="flex flex-col space-y-2 mt-4 text-sm font-manrope text-on-surface-variant">
              <span className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-xl">📍</span> Belagavi, Karnataka, India
              </span>
              <span className="flex items-center gap-2 justify-center md:justify-start">
                <Phone size={16} /> +91 7880661203
              </span>
              <span className="flex items-center gap-2 justify-center md:justify-start">
                <Mail size={16} /> mohdsayeed1092@gmail.com
              </span>
            </div>
          </div>

          {/* CENTER SECTION */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="font-display text-lg font-bold text-on-surface">Quick Links</h3>
            <nav className="flex flex-col space-y-3 font-manrope text-on-surface-variant text-sm">
              <Link href="/" className="hover:text-primary transition-colors duration-300 ease-in-out">Home</Link>
              <Link href="/about" className="hover:text-primary transition-colors duration-300 ease-in-out">About</Link>
              <Link href="/skills" className="hover:text-primary transition-colors duration-300 ease-in-out">Skills</Link>
              <Link href="/projects" className="hover:text-primary transition-colors duration-300 ease-in-out">Projects</Link>
              <Link href="/experience" className="hover:text-primary transition-colors duration-300 ease-in-out">Experience</Link>
              <Link href="/contact" className="hover:text-primary transition-colors duration-300 ease-in-out">Contact</Link>
            </nav>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <h3 className="font-display text-lg font-bold text-on-surface">Connect</h3>
            
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-on-primary rounded-full font-manrope font-bold hover:scale-105 transition-transform duration-300 ease-in-out shadow-[0_4px_14px_0_rgba(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)]"
            >
              Contact Me
            </Link>

            <div className="flex items-center gap-4 mt-2">
              <a 
                href="https://github.com/Sayeed-M" 
                target="_blank" 
                rel="noreferrer"
                className="p-3 rounded-full bg-surface-container-high border border-outline-variant/30 hover:border-primary/50 hover:text-primary transition-all duration-300 ease-in-out shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noreferrer"
                className="p-3 rounded-full bg-surface-container-high border border-outline-variant/30 hover:border-primary/50 hover:text-primary transition-all duration-300 ease-in-out shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>

            <p className="font-manrope text-sm font-semibold text-on-surface-variant flex flex-wrap gap-2 justify-center md:justify-start">
              <span>Flutter</span> • <span>Android</span> • <span>iOS</span> • <span>AI</span> • <span>CV</span>
            </p>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 pt-8 border-t border-outline-variant/20 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-on-surface-variant font-manrope">
          <p>© {currentYear} MOHD SAYEED S MULLA. All Rights Reserved.</p>
        </div>
        
      </div>
    </footer>
  );
}

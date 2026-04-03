import React from 'react';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 p-6 flex items-center justify-between pointer-events-auto">
      <div className="absolute inset-0 bg-surface/60 backdrop-blur-md border-b border-outline-variant/20 -z-10" />
      <div className="font-display font-bold text-2xl tracking-tight text-on-surface">
         AeroGlass.
      </div>
      <div className="hidden md:flex items-center gap-6 lg:gap-8 font-manrope text-[12px] lg:text-[13px] font-semibold text-on-surface-variant flex-wrap">
         <Link href="/" className="hover:text-primary transition-colors">Home</Link>
         <Link href="/projects" className="hover:text-primary transition-colors">Projects</Link>
         <Link href="/demo" className="hover:text-primary transition-colors">Demos</Link>
         <Link href="/research" className="hover:text-primary transition-colors">Research</Link>
         <Link href="/experience" className="hover:text-primary transition-colors">Experience</Link>
         <Link href="/skills" className="hover:text-primary transition-colors">Skills</Link>
         <Link href="/ai" className="hover:text-primary transition-colors">AI Core</Link>
         <Link href="/resume" className="hover:text-primary transition-colors">Resume</Link>
      </div>
      <div className="flex items-center gap-4">
          <Link href="/admin/login" className="px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-bold hover:bg-primary shadow-sm hover:text-white transition-all">
             Admin Login
          </Link>
      </div>
    </nav>
  );
}

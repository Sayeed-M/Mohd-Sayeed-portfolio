"use client";

import React, { useState } from "react";
import { m } from 'framer-motion';
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("Mohd Sayeed DEV");
  const [password, setPassword] = useState("788Sayeed15");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const inputBase =
    "w-full bg-surface-container-low/60 border border-outline-variant/20 text-on-surface placeholder-on-surface-variant/60 rounded-xl px-4 py-3.5 outline-none font-manrope text-sm transition-all duration-300 focus:bg-white focus:border-primary/40 focus:shadow-[0_0_0_3px_rgba(0,88,188,0.08)]";

  return (
    <main className="min-h-screen bg-surface flex items-center justify-center relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/8 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-tertiary/8 blur-[100px] rounded-full pointer-events-none" />

      <m.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-6"
      >
        {/* Glass Card */}
        <div className="bg-white/60 backdrop-blur-2xl rounded-3xl border border-outline-variant/20 shadow-[0_30px_80px_rgba(20,27,43,0.1)] p-10">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center">
              <Lock size={16} className="text-white" />
            </div>
            <div>
              <p className="font-display font-bold text-on-surface text-lg tracking-tight">
                AeroGlass Admin
              </p>
              <p className="font-manrope text-xs text-on-surface-variant">
                Secure Command Interface
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5"
            noValidate
          >
            {/* Email */}
            <div>
              <label className="block text-xs font-bold font-manrope text-primary uppercase tracking-widest mb-2">
                Commander ID
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className={inputBase}
                placeholder="Mohd Sayeed DEV"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold font-manrope text-primary uppercase tracking-widest mb-2">
                Auth Key
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className={`${inputBase} pr-12`}
                  placeholder="••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <m.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-bold font-manrope text-sm tracking-wide shadow-[0_8px_30px_rgba(0,88,188,0.3)] hover:shadow-[0_12px_40px_rgba(0,88,188,0.4)] transition-shadow mt-2"
            >
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck size={16} />
                Authenticate
              </div>
            </m.button>
          </form>

          <div className="mt-8 pt-6 border-t border-outline-variant/20 text-center">
            <Link
              href="/"
              className="font-manrope text-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              ← Return to Portfolio
            </Link>
          </div>
        </div>
      </m.div>
    </main>
  );
}

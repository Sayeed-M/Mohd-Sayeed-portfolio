"use client";
import React, { useState } from 'react';
import { GlassmorphismPanel } from './GlassmorphismPanel';
import { m } from 'framer-motion';

export function GlassForm() {
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const inputClasses = "w-full bg-[rgba(241,243,255,0.5)] text-on-surface placeholder-on-surface-variant/70 rounded-xl px-4 py-3 outline-none font-manrope transition-all duration-300 border border-transparent focus:bg-[rgba(255,255,255,0.8)]";

    return (
        <GlassmorphismPanel containerType="highest" className="w-full max-w-lg p-8 mx-auto shadow-[0_30px_80px_rgba(20,27,43,0.08)]">
            <h2 className="font-display text-3xl font-bold text-on-surface mb-2">Initialize Link</h2>
            <p className="font-manrope text-sm text-on-surface-variant mb-8">Establish secure comms channel.</p>

            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                <div className="relative group overflow-hidden rounded-xl">
                    <label className="text-xs font-bold font-manrope text-primary uppercase tracking-widest mb-2 block">Identification</label>
                    <input 
                        type="text" 
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className={inputClasses} 
                        placeholder="Name or Callsign"
                    />
                    {/* Animated Underline */}
                    <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-tertiary transition-all duration-500 ease-out"
                         style={{ width: focusedField === 'name' ? '100%' : '0%' }}
                    />
                </div>

                <div className="relative group overflow-hidden rounded-xl">
                    <label className="text-xs font-bold font-manrope text-primary uppercase tracking-widest mb-2 block">Secure Relay</label>
                    <input 
                        type="email" 
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className={inputClasses} 
                        placeholder="Email Address"
                    />
                    <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-tertiary transition-all duration-500 ease-out"
                         style={{ width: focusedField === 'email' ? '100%' : '0%' }}
                    />
                </div>

                <div className="relative group overflow-hidden rounded-xl">
                    <label className="text-xs font-bold font-manrope text-primary uppercase tracking-widest mb-2 block">Payload</label>
                    <textarea 
                        rows={4}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className={`${inputClasses} resize-none`} 
                        placeholder="Transmit data..."
                    />
                    <div className="absolute bottom-1.5 left-0 h-[2px] bg-gradient-to-r from-primary to-tertiary transition-all duration-500 ease-out"
                         style={{ width: focusedField === 'message' ? '100%' : '0%' }}
                    />
                </div>

                <m.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-bold font-manrope tracking-wide shadow-atmospheric hover:shadow-lg transition-shadow mt-4"
                >
                    Transmit Payload
                </m.button>
            </form>
        </GlassmorphismPanel>
    )
}

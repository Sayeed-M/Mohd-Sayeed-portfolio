"use client";
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { m } from 'framer-motion';
import { MapPin, Phone, Mail, Link, Send } from 'lucide-react';
import { GlassmorphismPanel } from '@/components/GlassmorphismPanel';
import { MouseGlowBorder } from '@/components/MouseGlowBorder';

export default function ContactPage() {
    const [focusedField, setFocusedField] = useState<string | null>(null);

    return (
        <main className="min-h-screen bg-surface relative overflow-hidden flex flex-col">
            <Navbar />

            {/* Dark mode background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-surface to-surface pointer-events-none -z-10" />

            <section className="flex-1 w-full pt-32 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 item-center mt-8">
                
                {/* Left Side: Text and Contact Nodes */}
                <div className="flex flex-col justify-center">
                     <m.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                     >
                        <h1 className="font-display text-5xl md:text-6xl font-black text-on-surface tracking-tight mb-4">
                            Initialize <br className="hidden md:block"/> Connection.
                        </h1>
                        <p className="font-manrope text-lg text-on-surface-variant leading-relaxed max-w-md mb-12">
                            Always prepared to discuss innovative systems, robust aerospace UI abstractions, or highly optimized mobile pipelines.
                        </p>
                    </m.div>

                    <div className="flex flex-col gap-6">
                        <ContactNode icon={<MapPin className="text-primary" />} title="Location" val="Belagavi, Karnataka, India" delay={0.2} />
                        <ContactNode icon={<Phone className="text-primary" />} title="Direct Line" val="+91 7880661203" delay={0.3} href="tel:+917880661203" />
                        <ContactNode icon={<Mail className="text-primary" />} title="Email Transmission" val="mohdsayeed1092@gmail.com" delay={0.4} href="mailto:mohdsayeed1092@gmail.com" />
                        <ContactNode icon={<Link className="text-primary" />} title="Repository Source" val="github.com/Sayeed-M" delay={0.5} href="https://github.com/Sayeed-M" />
                    </div>
                </div>

                {/* Right Side: Interactive Glass Form */}
                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center items-center w-full"
                >
                    <MouseGlowBorder className="w-full max-w-md rounded-3xl">
                        <GlassmorphismPanel containerType="highest" className="p-8 w-full rounded-3xl bg-white/40 dark:bg-black/40 border border-white/40 dark:border-white/10 backdrop-blur-2xl shadow-atmospheric relative overflow-hidden">
                            <h3 className="font-display text-2xl font-bold text-on-surface mb-8">System Access Portal</h3>
                            
                            <form className="flex flex-col gap-5 relative z-10" onSubmit={(e) => e.preventDefault()}>
                                {/* Interactive Input Block */}
                                <div className="relative group">
                                    <input 
                                        type="text" 
                                        onFocus={() => setFocusedField('name')} 
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full bg-surface-container-low/50 dark:bg-black/50 border border-outline-variant/30 rounded-xl px-4 pt-6 pb-2 text-on-surface font-manrope font-medium focus:outline-none focus:border-primary/60 transition-all peer" 
                                        placeholder=" "
                                    />
                                    <label className="absolute left-4 top-4 text-on-surface-variant text-sm font-manrope transition-all peer-focus:-translate-y-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:font-bold peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:text-xs">Ident</label>
                                    {focusedField === 'name' && <m.div layoutId="glow" className="absolute -inset-[1px] rounded-xl border border-primary/50 shadow-[0_0_15px_var(--color-primary)] pointer-events-none" />}
                                </div>

                                <div className="relative group">
                                    <input 
                                        type="email" 
                                        onFocus={() => setFocusedField('email')} 
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full bg-surface-container-low/50 dark:bg-black/50 border border-outline-variant/30 rounded-xl px-4 pt-6 pb-2 text-on-surface font-manrope font-medium focus:outline-none focus:border-primary/60 transition-all peer" 
                                        placeholder=" "
                                    />
                                    <label className="absolute left-4 top-4 text-on-surface-variant text-sm font-manrope transition-all peer-focus:-translate-y-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:font-bold peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:text-xs">Comms Frequency (Email)</label>
                                    {focusedField === 'email' && <m.div layoutId="glow" className="absolute -inset-[1px] rounded-xl border border-primary/50 shadow-[0_0_15px_var(--color-primary)] pointer-events-none" />}
                                </div>

                                <div className="relative group">
                                    <textarea 
                                        rows={4}
                                        onFocus={() => setFocusedField('msg')} 
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full bg-surface-container-low/50 dark:bg-black/50 border border-outline-variant/30 rounded-xl px-4 pt-6 pb-2 text-on-surface font-manrope font-medium focus:outline-none focus:border-primary/60 transition-all peer resize-none" 
                                        placeholder=" "
                                    />
                                    <label className="absolute left-4 top-4 text-on-surface-variant text-sm font-manrope transition-all peer-focus:-translate-y-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:font-bold peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:text-xs">Payload (Message)</label>
                                    {focusedField === 'msg' && <m.div layoutId="glow" className="absolute -inset-[1px] rounded-xl border border-primary/50 shadow-[0_0_15px_var(--color-primary)] pointer-events-none" />}
                                </div>

                                <m.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="mt-4 flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-primary to-primary-container rounded-xl text-white font-manrope font-bold text-sm shadow-[0_5px_20px_rgba(0,88,188,0.3)] hover:shadow-[0_8px_30px_rgba(0,88,188,0.5)] transition-all"
                                >
                                    Transmit Data <Send size={16} />
                                </m.button>
                            </form>
                        </GlassmorphismPanel>
                    </MouseGlowBorder>
                </m.div>
            </section>
        </main>
    )
}

function ContactNode({ icon, title, val, delay, href }: { icon: React.ReactNode, title: string, val: string, delay: number, href?: string }) {
    const Component = href ? 'a' : 'div';
    return (
        <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5 }}
        >
            <Component 
                href={href} 
                target={href?.startsWith("http") ? "_blank" : undefined}
                className="flex items-center gap-6 p-4 rounded-2xl bg-surface-container-low/50 border border-outline-variant/20 hover:bg-surface-container-high/50 hover:border-primary/30 transition-all shadow-sm max-w-sm group cursor-pointer"
            >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    {icon}
                </div>
                <div>
                    <p className="font-manrope text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">{title}</p>
                    <p className="font-manrope text-sm font-bold text-on-surface">{val}</p>
                </div>
            </Component>
        </m.div>
    );
}

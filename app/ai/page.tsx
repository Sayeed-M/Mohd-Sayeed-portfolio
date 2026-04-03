import React from 'react';
import { ChatUI } from '@/components/ChatUI';

export const metadata = {
  title: "AI Assistant - AeroGlass Portfolio",
  description: "Interact directly with the portfolio neural core.",
};

export default function AssistantPage() {
   return (
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 bg-[#ffffff]">
         <div className="max-w-7xl mx-auto">
             <div className="text-center mb-8">
                 <h1 className="font-display font-bold text-4xl md:text-5xl text-slate-800 tracking-tight">AI Neural Interface</h1>
                 <p className="font-manrope text-slate-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                     An integrated Google Gemini architecture pipeline trained specifically on this portfolio's telemetry, engineering methodologies, and stack constraints.
                 </p>
             </div>
             <ChatUI />
         </div>
      </main>
   )
}

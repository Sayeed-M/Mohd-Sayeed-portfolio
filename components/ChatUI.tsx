"use client";
import React, { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Bot, Sparkles } from "lucide-react";
import { GlassmorphismPanel } from "./GlassmorphismPanel";
import { MouseGlowBorder } from "./MouseGlowBorder";

interface Message {
  role: "user" | "model";
  parts: string;
}

const SUGGESTIONS = [
  "Show me your projects",
  "What skills do you have?",
  "Tell me about the drone system",
];

export function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      parts: "Welcome to the AeroGlass Interactive Terminal. How can I assist you with project analytics, skills breakdowns, or aerospace concepts today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (overrideMsg?: string) => {
    const textToSend = overrideMsg || input.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = { role: "user", parts: textToSend };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");

      setMessages([...nextMessages, { role: "model", parts: data.reply }]);
    } catch (err) {
      setMessages([
        ...nextMessages,
        {
          role: "model",
          parts: "⚠ Secure channel interrupted. Please retry your transmission.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[70vh] flex flex-col pt-10 perspective-1000">
      <m.div
        initial={{ opacity: 0, y: 30, rotateX: 5 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 w-full relative z-10"
        style={{ transformStyle: "preserve-3d" }}
      >
        <MouseGlowBorder className="h-full rounded-3xl">
          <GlassmorphismPanel containerType="low" className="p-0 h-full flex flex-col rounded-3xl overflow-hidden bg-white/40 backdrop-blur-2xl border-white/40 shadow-[0_30px_60px_rgba(0,0,0,0.08)]">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20 bg-white/30 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0058bc] to-[#00c6ff] flex items-center justify-center shadow-md relative overflow-hidden">
                   <div className="absolute inset-0 bg-white/20 animate-pulse" />
                   <Bot size={24} className="text-white relative z-10" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-slate-800 tracking-tight">AeroGlass AI Core</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                    <span className="font-manrope text-xs font-semibold text-slate-500 uppercase tracking-wider">System Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-[70%] px-5 py-4 rounded-2xl text-[15px] font-manrope leading-relaxed shadow-sm ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-[#0058bc] to-[#0070eb] text-white rounded-br-sm shadow-[0_10px_20px_rgba(0,88,188,0.2)]"
                          : "bg-white/80 text-slate-700 border border-white/50 rounded-bl-sm backdrop-blur-md"
                      }`}
                    >
                      {msg.parts}
                    </div>
                  </m.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <m.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                >
                  <div className="bg-white/80 border border-white/50 backdrop-blur-md rounded-2xl rounded-bl-sm px-6 py-4 flex items-center gap-3 shadow-sm">
                    <Loader2 size={18} className="animate-spin text-[#0058bc]" />
                    <span className="text-sm text-slate-500 font-manrope font-medium">Synthesizing response...</span>
                  </div>
                </m.div>
              )}
              <div ref={bottomRef} className="h-4" />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white/30 backdrop-blur-lg border-t border-white/20">
              {/* Suggestions */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {SUGGESTIONS.map((sug) => (
                    <m.button
                      key={sug}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => sendMessage(sug)}
                      disabled={isLoading}
                      className="px-4 py-2 rounded-full bg-white/50 hover:bg-white/80 border border-white/40 text-xs font-manrope font-semibold text-[#0058bc] transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50"
                    >
                      <Sparkles size={12} />
                      {sug}
                    </m.button>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-3 bg-white/60 rounded-2xl border border-white/50 p-2 shadow-inner focus-within:ring-2 focus-within:ring-[#0058bc]/20 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Commence query transmission..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent px-4 py-2 text-base font-manrope text-slate-800 placeholder-slate-400 outline-none"
                />
                <m.button
                  onClick={() => sendMessage()}
                  disabled={isLoading || !input.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0058bc] to-[#0070eb] text-white flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} className="ml-1" />
                </m.button>
              </div>
            </div>
          </GlassmorphismPanel>
        </MouseGlowBorder>
      </m.div>
    </div>
  );
}

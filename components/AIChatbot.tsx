"use client";

import React, { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, Bot } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "MOHD SAYEED S MULLA Concierge online. I can brief you on engineering specs, project architecture, and the technology stack powering this portfolio. What's your query?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) throw new Error("API Error");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      // Append empty assistant message to stream into
      setMessages([...nextMessages, { role: "assistant", content: "" }]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        
        // Vercel AI SDK streamText sends data formatted as DataStream. 
        // A simple parse approach parses the raw text out of the specialized Vercel formatting.
        const chunk = decoder.decode(value, { stream: true });
        
        // Basic extract for "0: text" vercel formats
        const textParts = chunk.split('\n').filter(line => line.startsWith('0:')).map(line => {
             try { return JSON.parse(line.substring(2)); } catch { return ""; }
        });
        
        assistantMessage += textParts.join('');

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].content = assistantMessage;
          return updated;
        });
      }
    } catch (err) {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: "⚠ Secure channel interrupted. Please retry your transmission.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <m.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-container text-white shadow-[0_8px_30px_rgba(0,88,188,0.4)] flex items-center justify-center transition-all"
        aria-label="Toggle AI Support Chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <m.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={22} />
            </m.div>
          ) : (
            <m.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageSquare size={22} />
            </m.div>
          )}
        </AnimatePresence>
      </m.button>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] md:w-[400px] flex flex-col overflow-hidden rounded-3xl border border-white/30 dark:border-white/10 backdrop-blur-2xl bg-white/70 dark:bg-black/70 shadow-atmospheric"
            style={{ height: "520px" }}
          >
            <div className="flex items-center gap-3 p-4 border-b border-outline-variant/20 dark:border-white/5 bg-gradient-to-r from-primary/5 to-transparent">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-sm">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-surface-on dark:text-gray-200">MOHD SAYEED S MULLA Concierge</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <p className="font-manrope text-xs text-slate-500 dark:text-gray-400">AI System Online</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg, i) => (
                <m.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm font-manrope leading-relaxed ${msg.role === "user" ? "bg-gradient-to-br from-primary to-primary-container text-white rounded-br-md" : "bg-white/80 dark:bg-surface-container-high/60 text-slate-800 dark:text-gray-200 border border-outline-variant/20 dark:border-white/10 rounded-bl-md shadow-sm"}`}>
                    {msg.content}
                  </div>
                </m.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/80 dark:bg-surface-container-high/60 border border-outline-variant/20 dark:border-white/10 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2 shadow-sm">
                    <Loader2 size={14} className="animate-spin text-primary" />
                    <span className="text-xs text-slate-500 dark:text-gray-400 font-manrope">Processing stream...</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={sendMessage} className="p-4 border-t border-outline-variant/20 dark:border-white/5">
              <div className="flex items-center gap-2 bg-slate-100/50 dark:bg-black/50 rounded-2xl border border-outline-variant/20 dark:border-white/10 px-4 py-2 group focus-within:border-primary/50 transition-colors">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Transmit query..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm font-manrope text-slate-800 dark:text-gray-200 placeholder-slate-400 dark:placeholder-gray-500 outline-none w-full"
                />
                <button type="submit" disabled={isLoading || !input.trim()} className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-40 hover:bg-primary/90 transition-colors">
                  <Send size={14} />
                </button>
              </div>
            </form>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

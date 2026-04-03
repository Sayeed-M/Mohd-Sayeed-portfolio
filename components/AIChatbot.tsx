"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Loader2, Bot } from "lucide-react";

interface Message {
  role: "user" | "model";
  parts: string;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      parts:
        "AeroGlass Concierge online. I can brief you on engineering specs, project architecture, and the technology stack powering this portfolio. What's your query?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", parts: input };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
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
          parts:
            "⚠ Secure channel interrupted. Please retry your transmission.",
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
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-tertiary text-white shadow-[0_8px_30px_rgba(0,88,188,0.4)] flex items-center justify-center"
        aria-label="Open AI Concierge"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] md:w-[400px] flex flex-col overflow-hidden rounded-3xl border border-white/30 backdrop-blur-2xl bg-white/70 shadow-[0_30px_80px_rgba(20,27,43,0.15)]"
            style={{ height: "520px" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-outline-variant/20 bg-gradient-to-r from-primary/5 to-tertiary/5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center shadow-atmospheric">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-on-surface">
                  AeroGlass Concierge
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <p className="font-manrope text-xs text-on-surface-variant">
                    AI System Online
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm font-manrope leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-primary to-primary-container text-white rounded-br-md"
                        : "bg-white/80 text-on-surface border border-outline-variant/20 rounded-bl-md shadow-sm"
                    }`}
                  >
                    {msg.parts}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/80 border border-outline-variant/20 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2 shadow-sm">
                    <Loader2 size={14} className="animate-spin text-primary" />
                    <span className="text-xs text-on-surface-variant font-manrope">
                      Processing...
                    </span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-outline-variant/20">
              <div className="flex items-center gap-2 bg-surface-container-low/60 rounded-2xl border border-outline-variant/20 px-4 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Transmit query..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm font-manrope text-on-surface placeholder-on-surface-variant/60 outline-none"
                />
                <motion.button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send size={14} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

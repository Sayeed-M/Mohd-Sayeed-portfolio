"use client";
import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from 'framer-motion';
import { Settings2, Save, X, AlertCircle } from "lucide-react";

interface CMSPanelProps {
  section: string;
  data: any;
  onSave: (newData: any) => void;
}

export function CMSPanel({ section, data, onSave }: CMSPanelProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);

  useEffect(() => {
    setDraft(JSON.stringify(data, null, 2));
  }, [data, isOpen]);

  const handleSave = async () => {
    try {
      const parsed = JSON.parse(draft);
      
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, payload: parsed }),
      });

      if (!res.ok) throw new Error("Failed to save to database");
      
      onSave(parsed);
      setIsOpen(false);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax");
    }
  };

  if (!isAdmin) return null;

  return (
    <>
      {/* Floating Edit Toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform"
      >
        <Settings2 size={18} />
        <span className="font-manrope font-bold text-sm tracking-wide">Edit Page Content</span>
      </button>

      {/* Editor Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <m.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl h-full flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/20"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/10 bg-surface-container-low dark:bg-black/20">
                <div>
                  <h2 className="font-display font-bold text-lg text-on-surface">Live Data Editor</h2>
                  <p className="font-manrope text-xs text-on-surface-variant">Modifying collection: <span className="text-primary font-bold">{section}</span></p>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
                  <X className="text-on-surface" size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-hidden flex flex-col p-6">
                {error && (
                  <div className="mb-4 px-4 py-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 font-manrope text-sm font-semibold">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}
                <p className="font-manrope text-sm text-on-surface-variant mb-2">Edit the JSON object below. You can add image URLs, video links, or new objects to the arrays.</p>
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  className="flex-1 w-full p-4 bg-slate-50 dark:bg-black/40 text-slate-800 dark:text-slate-200 font-mono text-sm rounded-xl border border-outline-variant/20 focus:outline-none focus:border-primary/50 resize-none whitespace-pre"
                  spellCheck={false}
                />
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-outline-variant/10 bg-surface-container-low dark:bg-black/20 flex justify-end gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 rounded-xl font-manrope font-bold text-sm text-on-surface-variant hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-manrope font-bold text-sm shadow-lg shadow-primary/30 hover:scale-105 transition-all"
                >
                  <Save size={16} />
                  Save Changes to Database
                </button>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

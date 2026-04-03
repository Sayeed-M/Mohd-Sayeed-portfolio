"use client";
import React, { useState } from "react";
import { Save, Plus, Trash2, Image as ImageIcon, Film, FileText } from "lucide-react";
import { m } from "framer-motion";

interface CMSProps {
  initialData: any;
}

const TABS = ["projects", "experience", "research", "demos", "resume", "skills"];

export function DashboardCMS({ initialData }: CMSProps) {
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (newData: any) => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: activeTab, payload: newData[activeTab] }),
      });
      if (res.ok) {
        // Success
      }
    } catch (e) {
      console.error(e);
    }
    setIsSaving(false);
  };

  const handleArrayChange = (index: number, field: string, value: any) => {
    const updatedArray = [...data[activeTab]];
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    const newData = { ...data, [activeTab]: updatedArray };
    setData(newData);
  };

  const handleAddItem = () => {
    const newItem = { id: Date.now().toString(), title: "New Item", description: "" };
    const newData = { ...data, [activeTab]: [newItem, ...(data[activeTab] || [])] };
    setData(newData);
  };

  const handleDeleteItem = (index: number) => {
    const updatedArray = [...data[activeTab]];
    updatedArray.splice(index, 1);
    const newData = { ...data, [activeTab]: updatedArray };
    setData(newData);
  };

  const renderActiveTabEditor = () => {
    const items = data[activeTab] || [];
    
    if (activeTab === "skills") {
      return (
        <div className="p-6">
          <p className="text-on-surface-variant font-manrope text-sm mb-4">Skills categories are complex structures. Use the advanced editor here.</p>
          <textarea
            className="w-full h-96 p-4 bg-surface dark:bg-black/40 text-on-surface font-mono text-sm rounded-xl border border-outline-variant/30"
            value={JSON.stringify(items, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                setData({ ...data, skills: parsed });
              } catch {}
            }}
          />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-6 p-6">
        {items.map((item: any, i: number) => (
          <div key={item.id || i} className="bg-surface dark:bg-surface-container/20 border border-outline-variant/20 rounded-xl p-5 relative group">
            <button 
               onClick={() => handleDeleteItem(i)}
               className="absolute top-4 right-4 p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={18} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-manrope text-xs font-bold text-on-surface-variant mb-1">Title / Name</label>
                <input 
                  type="text" 
                  value={item.title || item.name || ""} 
                  onChange={(e) => handleArrayChange(i, item.title !== undefined ? 'title' : 'name', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-black/50 border border-outline-variant/30 text-on-surface outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block font-manrope text-xs font-bold text-on-surface-variant mb-1">Subtitle / Role / Date</label>
                <input 
                  type="text" 
                  value={item.subtitle || item.role || item.date || ""} 
                  onChange={(e) => handleArrayChange(i, item.subtitle !== undefined ? 'subtitle' : (item.role !== undefined ? 'role' : 'date'), e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-black/50 border border-outline-variant/30 text-on-surface outline-none focus:border-primary"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block font-manrope text-xs font-bold text-on-surface-variant mb-1">Description / Content</label>
              <textarea 
                value={item.description || item.content || ""} 
                onChange={(e) => handleArrayChange(i, item.description !== undefined ? 'description' : 'content', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-black/50 border border-outline-variant/30 text-on-surface outline-none focus:border-primary resize-y min-h-[80px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-outline-variant/10 pt-4 mt-4">
               <div>
                  <label className="flex items-center gap-1 font-manrope text-xs font-bold text-on-surface-variant mb-1"><ImageIcon size={14} /> Image URL</label>
                  <input type="text" value={item.imageUrl || ""} onChange={(e) => handleArrayChange(i, 'imageUrl', e.target.value)} placeholder="https://..." className="w-full px-3 py-1.5 rounded-lg bg-surface border border-outline-variant/20 text-xs" />
               </div>
               <div>
                  <label className="flex items-center gap-1 font-manrope text-xs font-bold text-on-surface-variant mb-1"><Film size={14} /> Video URL</label>
                  <input type="text" value={item.videoUrl || ""} onChange={(e) => handleArrayChange(i, 'videoUrl', e.target.value)} placeholder="https://..." className="w-full px-3 py-1.5 rounded-lg bg-surface border border-outline-variant/20 text-xs" />
               </div>
               <div>
                  <label className="flex items-center gap-1 font-manrope text-xs font-bold text-on-surface-variant mb-1"><FileText size={14} /> Link / GitHub</label>
                  <input type="text" value={item.githubUrl || item.link || ""} onChange={(e) => handleArrayChange(i, 'githubUrl', e.target.value)} placeholder="https://..." className="w-full px-3 py-1.5 rounded-lg bg-surface border border-outline-variant/20 text-xs" />
               </div>
            </div>
          </div>
        ))}

        <button 
          onClick={handleAddItem}
          className="w-full py-4 border-2 border-dashed border-outline-variant/30 rounded-xl hover:bg-primary/5 hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2 font-bold font-manrope text-on-surface-variant"
        >
          <Plus size={18} /> Add New {activeTab} Entry
        </button>
      </div>
    );
  };

  return (
    <div className="bg-white/60 dark:bg-surface-container/60 backdrop-blur-xl border border-outline-variant/20 rounded-2xl overflow-hidden shadow-lg">
      <div className="flex items-center justify-between bg-surface-container-low dark:bg-black/20 border-b border-outline-variant/10 px-2 py-2">
        <div className="flex gap-1 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 rounded-lg font-display font-bold text-sm capitalize transition-colors whitespace-nowrap ${activeTab === tab ? "bg-white dark:bg-surface-container text-primary shadow-sm" : "hover:bg-black/5 text-on-surface-variant"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="px-4">
          <button 
            onClick={() => handleSave(data)}
            className="px-5 py-2 rounded-lg bg-primary text-white font-manrope font-bold text-sm shadow-md hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />} 
            Save {activeTab}
          </button>
        </div>
      </div>
      
      <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
        {renderActiveTabEditor()}
      </div>
    </div>
  );
}

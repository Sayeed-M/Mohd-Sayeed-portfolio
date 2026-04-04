"use client";

import React, { useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Calendar, Eye, Film, ImageIcon, Link2, ExternalLink, Plus, Save, Trash2, Upload, X } from "lucide-react";
import type { ContentData, GenericEntry } from "@/types/content";
import { isGoogleDriveUrl, isVideoUrl, toDriveDirectUrl, toDriveEmbedUrl } from "@/utils/media";

interface CMSProps {
  initialData: ContentData;
  onDataChange?: (nextData: ContentData) => void;
}

const TABS = ["projects", "experience", "research", "demos", "resume", "skills"] as const;
type CMSTab = (typeof TABS)[number];
type EntryArrayTab = Exclude<CMSTab, "skills">;

function MediaPreview({ url, onClose }: { url: string; onClose: () => void }) {
  const isDrive = isGoogleDriveUrl(url);
  const isVid = isVideoUrl(url);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative mx-4 w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40"
        >
          <X size={16} />
        </button>
        {isDrive && isVid ? (
          <iframe src={toDriveEmbedUrl(url)} className="w-full aspect-video" allowFullScreen title="Preview" />
        ) : isVid ? (
          <video src={url} controls className="w-full aspect-video" />
        ) : (
          <img src={isDrive ? toDriveDirectUrl(url) : url} alt="Media Preview" className="max-h-[80vh] w-full object-contain" />
        )}
      </div>
    </div>
  );
}

function MediaThumb({ url, onRemove }: { url: string; onRemove: () => void }) {
  const [preview, setPreview] = useState(false);
  const isDrive = isGoogleDriveUrl(url);
  const isVid = isVideoUrl(url);
  const displayUrl = isDrive ? toDriveDirectUrl(url) : url;

  return (
    <>
      {preview ? <MediaPreview url={url} onClose={() => setPreview(false)} /> : null}
      <div className="group relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-outline-variant/20 shadow-sm">
        {isVid ? (
          <div className="flex h-full w-full items-center justify-center bg-surface-container-high">
            <Film size={18} className="text-on-surface-variant" />
          </div>
        ) : (
          <img src={displayUrl} alt="" className="h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => setPreview(true)}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 transition hover:scale-110"
            title="Preview"
          >
            <Eye size={11} className="text-slate-700" />
          </button>
          <button
            onClick={onRemove}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 transition hover:scale-110"
            title="Remove"
          >
            <X size={11} className="text-white" />
          </button>
        </div>
      </div>
    </>
  );
}

function TagsInput({ value, onChange }: { value: string[]; onChange: (nextValue: string[]) => void }) {
  const [input, setInput] = useState("");
  const tags = value || [];

  const add = () => {
    const tag = input.trim();
    if (tag && !tags.includes(tag)) {
      onChange([...tags, tag]);
    }
    setInput("");
  };

  return (
    <div>
      <label className="mb-1 block font-manrope text-xs font-bold text-on-surface-variant">Tags / Tech Stack</label>
      <div className="mb-2 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={tag} className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 font-manrope text-xs font-bold text-primary">
            {tag}
            <button onClick={() => onChange(tags.filter((_, itemIndex) => itemIndex !== index))} className="transition hover:text-red-500">
              <X size={10} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              add();
            }
          }}
          placeholder="Type tag and press Enter..."
          className="flex-1 rounded-lg border border-outline-variant/20 bg-surface px-3 py-1.5 text-xs text-on-surface outline-none focus:border-primary"
        />
        <button onClick={add} className="rounded-lg bg-primary/10 px-3 py-1.5 font-manrope text-xs font-bold text-primary hover:bg-primary/20">
          + Add
        </button>
      </div>
    </div>
  );
}

function FeaturesInput({ value, onChange }: { value: string[]; onChange: (nextValue: string[]) => void }) {
  const [input, setInput] = useState("");
  const features = value || [];

  const add = () => {
    const feature = input.trim();
    if (feature) {
      onChange([...features, feature]);
    }
    setInput("");
  };

  return (
    <div>
      <label className="mb-1 block font-manrope text-xs font-bold text-on-surface-variant">Key Features</label>
      <div className="mb-2 space-y-1">
        {features.map((feature, index) => (
          <div key={`${feature}-${index}`} className="group flex items-center gap-2">
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
            <span className="flex-1 font-manrope text-xs text-on-surface">{feature}</span>
            <button
              onClick={() => onChange(features.filter((_, itemIndex) => itemIndex !== index))}
              className="text-red-400 opacity-0 transition group-hover:opacity-100 hover:text-red-600"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              add();
            }
          }}
          placeholder="Add a feature and press Enter..."
          className="flex-1 rounded-lg border border-outline-variant/20 bg-surface px-3 py-1.5 text-xs text-on-surface outline-none focus:border-primary"
        />
        <button onClick={add} className="rounded-lg bg-primary/10 px-3 py-1.5 font-manrope text-xs font-bold text-primary hover:bg-primary/20">
          + Add
        </button>
      </div>
    </div>
  );
}

function MediaGalleryInput({ value, onChange }: { value: string[]; onChange: (nextValue: string[]) => void }) {
  const [newUrl, setNewUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const media = value || [];
  const isDrive = isGoogleDriveUrl(newUrl);

  const addUrl = () => {
    const nextUrl = newUrl.trim();
    if (!nextUrl) return;
    onChange([...media, nextUrl]);
    setNewUrl("");
  };

  return (
    <div>
      {previewUrl ? <MediaPreview url={previewUrl} onClose={() => setPreviewUrl(null)} /> : null}
      <label className="mb-2 flex items-center gap-1 font-manrope text-xs font-bold text-on-surface-variant">
        <ImageIcon size={13} /> Media Gallery (Images / Videos)
      </label>

      {media.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {media.map((url, index) => (
            <MediaThumb key={`${url}-${index}`} url={url} onRemove={() => onChange(media.filter((_, itemIndex) => itemIndex !== index))} />
          ))}
        </div>
      )}

      {media.length > 0 && (
        <div className="mb-3 space-y-2">
          {media.map((url, index) => (
            <div key={`${url}-row-${index}`} className="flex items-center gap-2 rounded-lg border border-outline-variant/15 bg-surface-container-low px-3 py-2">
              <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-on-surface-variant">{url}</span>
              <button
                type="button"
                onClick={() => setPreviewUrl(url)}
                className="flex items-center gap-1 rounded-lg bg-primary/10 px-2.5 py-1.5 text-xs font-bold text-primary transition hover:bg-primary/20"
              >
                <Eye size={12} /> Preview
              </button>
              <button
                type="button"
                onClick={() => onChange(media.filter((_, itemIndex) => itemIndex !== index))}
                className="rounded-lg bg-red-500/10 px-2.5 py-1.5 text-xs font-bold text-red-500 transition hover:bg-red-500/20"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-1 flex gap-2">
        <input
          type="text"
          value={newUrl}
          onChange={(event) => setNewUrl(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addUrl();
            }
          }}
          placeholder="Paste Google Drive link or image/video URL..."
          className="flex-1 rounded-lg border border-outline-variant/30 bg-surface px-3 py-2 text-xs text-on-surface outline-none transition-colors focus:border-primary"
        />
        <button
          onClick={addUrl}
          disabled={!newUrl.trim()}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 font-manrope text-xs font-bold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Upload size={12} /> Add
        </button>
      </div>

      {isDrive && newUrl.trim() && (
        <p className="mt-1.5 font-manrope text-[10px] font-semibold text-green-500">
          ✓ Google Drive link detected - will auto-display on site
        </p>
      )}
      <p className="mt-1 font-manrope text-[10px] text-on-surface-variant/50">
        Supports Google Drive share links, image URLs, or video URLs. First item = cover image.
      </p>
    </div>
  );
}

function createNewItem(activeTab: EntryArrayTab): GenericEntry {
  const now = new Date().toISOString();

  return {
    id: `${activeTab.slice(0, 3)}_${Date.now()}`,
    title: "New Item",
    description: "",
    tags: [],
    features: [],
    media: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function DashboardCMS({ initialData, onDataChange }: CMSProps) {
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState<CMSTab>(TABS[0]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const setAndBroadcast = (nextData: ContentData) => {
    setData(nextData);
    onDataChange?.(nextData);
  };

  const getActiveItems = (tab: EntryArrayTab): GenericEntry[] => {
    return (data[tab] as GenericEntry[]) || [];
  };

  const handleSave = async (nextData: ContentData) => {
    setIsSaving(true);
    setSaveMsg("");

    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: activeTab, payload: nextData[activeTab] }),
      });

      if (response.ok) {
        setSaveMsg("Saved!");
        onDataChange?.(nextData);
        setTimeout(() => setSaveMsg(""), 2500);
      } else {
        setSaveMsg("Error saving");
      }
    } catch {
      setSaveMsg("Error saving");
    }

    setIsSaving(false);
  };

  const handleFieldChange = (index: number, field: keyof GenericEntry, value: GenericEntry[keyof GenericEntry]) => {
    if (activeTab === "skills") return;

    const updatedArray = [...getActiveItems(activeTab)];
    const now = new Date().toISOString();
    updatedArray[index] = { ...updatedArray[index], [field]: value, updatedAt: now };
    const nextData = { ...data, [activeTab]: updatedArray } as ContentData;
    setAndBroadcast(nextData);
  };

  const handleAddItem = () => {
    if (activeTab === "skills") return;

    const nextData = {
      ...data,
      [activeTab]: [createNewItem(activeTab), ...getActiveItems(activeTab)],
    } as ContentData;

    setAndBroadcast(nextData);

    setTimeout(() => {
      listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  const handleDeleteItem = (index: number) => {
    if (activeTab === "skills") return;

    const updatedArray = [...getActiveItems(activeTab)];
    updatedArray.splice(index, 1);
    const nextData = { ...data, [activeTab]: updatedArray } as ContentData;
    setAndBroadcast(nextData);
  };

  const renderActiveTabEditor = () => {
    if (activeTab === "skills") {
      return (
        <div className="p-6">
          <p className="mb-4 font-manrope text-sm text-on-surface-variant">
            Skills use a structured format. Edit the JSON directly here.
          </p>
          <textarea
            className="h-96 w-full rounded-xl border border-outline-variant/30 bg-surface p-4 font-mono text-sm text-on-surface outline-none focus:border-primary dark:bg-black/40"
            value={JSON.stringify(data.skills || [], null, 2)}
            onChange={(event) => {
              try {
                const parsed = JSON.parse(event.target.value);
                setAndBroadcast({ ...data, skills: parsed });
              } catch {
                // Keep editor interactive while JSON is temporarily invalid
              }
            }}
          />
        </div>
      );
    }

    const items = getActiveItems(activeTab);

    return (
      <div className="flex flex-col gap-6 p-6">
        <button
          onClick={handleAddItem}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/30 py-4 font-manrope text-sm font-bold text-on-surface-variant transition-all hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
        >
          <Plus size={18} /> Add New {activeTab.slice(0, 1).toUpperCase() + activeTab.slice(1)} Entry
        </button>

        <AnimatePresence>
          {items.map((item, index) => (
            <m.div
              key={item.id || index}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="group relative rounded-xl border border-outline-variant/20 bg-surface p-5 dark:bg-surface-container/20"
            >
              <button
                onClick={() => handleDeleteItem(index)}
                className="absolute right-4 top-4 rounded-lg p-2 text-red-400 opacity-0 transition-colors group-hover:opacity-100 hover:bg-red-50 hover:text-red-600"
                title="Delete item"
              >
                <Trash2 size={16} />
              </button>

              <div className="mb-4 flex gap-4 font-manrope text-[10px] font-semibold text-on-surface-variant/50">
                {item.createdAt && (
                  <span className="flex items-center gap-1">
                    <Calendar size={10} /> Created: {new Date(item.createdAt).toLocaleString()}
                  </span>
                )}
                {item.updatedAt && item.updatedAt !== item.createdAt && (
                  <span className="flex items-center gap-1">
                    <Calendar size={10} /> Updated: {new Date(item.updatedAt).toLocaleString()}
                  </span>
                )}
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block font-manrope text-xs font-bold text-on-surface-variant">Title / Name</label>
                  <input
                    type="text"
                    value={item.title || item.name || ""}
                    onChange={(event) => handleFieldChange(index, item.title !== undefined ? "title" : "name", event.target.value)}
                    className="w-full rounded-lg border border-outline-variant/30 bg-white px-4 py-2 text-sm text-on-surface outline-none focus:border-primary dark:bg-black/50"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-manrope text-xs font-bold text-on-surface-variant">Subtitle / Role / Date</label>
                  <input
                    type="text"
                    value={item.subtitle || item.role || item.date || ""}
                    onChange={(event) =>
                      handleFieldChange(index, item.subtitle !== undefined ? "subtitle" : item.role !== undefined ? "role" : "date", event.target.value)
                    }
                    className="w-full rounded-lg border border-outline-variant/30 bg-white px-4 py-2 text-sm text-on-surface outline-none focus:border-primary dark:bg-black/50"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-1 block font-manrope text-xs font-bold text-on-surface-variant">Description / Content</label>
                <textarea
                  value={item.description || item.content || ""}
                  onChange={(event) =>
                    handleFieldChange(index, item.description !== undefined ? "description" : "content", event.target.value)
                  }
                  className="min-h-[80px] w-full resize-y rounded-lg border border-outline-variant/30 bg-white px-4 py-2 text-sm text-on-surface outline-none focus:border-primary dark:bg-black/50"
                />
              </div>

              {activeTab === "projects" && (
                <div className="mb-4">
                  <label className="mb-1 block font-manrope text-xs font-bold text-on-surface-variant">
                    Full Details (shown on detail page)
                  </label>
                  <textarea
                    value={item.fullDetails || ""}
                    onChange={(event) => handleFieldChange(index, "fullDetails", event.target.value)}
                    className="min-h-[60px] w-full resize-y rounded-lg border border-outline-variant/30 bg-white px-4 py-2 text-sm text-on-surface outline-none focus:border-primary dark:bg-black/50"
                  />
                </div>
              )}

              <div className="mb-4 mt-2 border-t border-outline-variant/10 pt-4">
                <MediaGalleryInput value={item.media || []} onChange={(nextValue) => handleFieldChange(index, "media", nextValue)} />
              </div>

              {["projects", "demos", "research"].includes(activeTab) && (
                <div className="mb-4 mt-2 grid grid-cols-1 gap-4 border-t border-outline-variant/10 pt-4 md:grid-cols-2">
                  <TagsInput value={item.tags || []} onChange={(nextValue) => handleFieldChange(index, "tags", nextValue)} />
                  <FeaturesInput value={item.features || []} onChange={(nextValue) => handleFieldChange(index, "features", nextValue)} />
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 border-t border-outline-variant/10 pt-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 flex items-center gap-1 font-manrope text-xs font-bold text-on-surface-variant">
                    <Link2 size={11} /> GitHub URL
                  </label>
                  <input
                    type="text"
                    value={item.githubUrl || ""}
                    onChange={(event) => handleFieldChange(index, "githubUrl", event.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full rounded-lg border border-outline-variant/20 bg-surface px-3 py-1.5 text-xs outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-1 flex items-center gap-1 font-manrope text-xs font-bold text-on-surface-variant">
                    <ExternalLink size={11} /> Live URL
                  </label>
                  <input
                    type="text"
                    value={item.liveUrl || ""}
                    onChange={(event) => handleFieldChange(index, "liveUrl", event.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-lg border border-outline-variant/20 bg-surface px-3 py-1.5 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>
            </m.div>
          ))}
        </AnimatePresence>

        {items.length === 0 && (
          <div className="rounded-xl border-2 border-dashed border-outline-variant/20 py-16 text-center">
            <p className="font-manrope text-sm text-on-surface-variant">No entries yet. Click &quot;Add New&quot; above.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-outline-variant/20 bg-white/60 shadow-lg backdrop-blur-xl dark:bg-surface-container/60">
      <div className="flex items-center justify-between border-b border-outline-variant/10 bg-surface-container-low px-2 py-2 dark:bg-black/20">
        <div className="flex gap-1 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={
                activeTab === tab
                  ? "whitespace-nowrap rounded-lg bg-white px-5 py-3 font-display text-sm font-bold capitalize text-primary shadow-sm dark:bg-surface-container"
                  : "whitespace-nowrap rounded-lg px-5 py-3 font-display text-sm font-bold capitalize text-on-surface-variant transition-colors hover:bg-black/5"
              }
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 px-4">
          {saveMsg && (
            <span className={saveMsg === "Saved!" ? "font-manrope text-xs font-bold text-green-500" : "font-manrope text-xs font-bold text-red-400"}>
              {saveMsg}
            </span>
          )}
          <button
            onClick={() => handleSave(data)}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2 font-manrope text-sm font-bold text-white shadow-md transition-colors hover:bg-primary/90"
          >
            {isSaving ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <Save size={16} />}
            Save {activeTab}
          </button>
        </div>
      </div>

      <div ref={listRef} className="custom-scrollbar max-h-[700px] overflow-y-auto">
        {renderActiveTabEditor()}
      </div>
    </div>
  );
}

import React from "react";
import { cn } from "@/utils/cn";

interface GlassmorphismPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  containerType?: "low" | "highest";
}

export function GlassmorphismPanel({
  children,
  className,
  containerType = "low",
  ...props
}: GlassmorphismPanelProps) {
  const bgClass =
    containerType === "low"
      ? "bg-[color-mix(in_srgb,var(--surface-container-low)_82%,transparent)]"
      : "bg-[color-mix(in_srgb,var(--surface)_72%,transparent)]";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-outline-variant/15 backdrop-blur-xl shadow-[0_20px_50px_color-mix(in_srgb,var(--on-surface)_8%,transparent)]",
        bgClass,
        className
      )}
      {...props}
    >
      {/* Light catch edge */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border-t border-l border-[color-mix(in_srgb,var(--surface)_65%,transparent)]"></div>
      {children}
    </div>
  );
}

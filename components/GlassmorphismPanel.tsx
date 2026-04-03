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
      ? "bg-[rgba(241,243,255,0.2)]"
      : "bg-[rgba(255,255,255,0.4)]";

  return (
    <div
      className={cn(
        "relative backdrop-blur-xl border border-outline-variant/15 shadow-[0_20px_50px_rgba(20,27,43,0.06)] overflow-hidden rounded-2xl",
        bgClass,
        className
      )}
      {...props}
    >
      {/* Light catch edge */}
      <div className="absolute inset-0 border-t border-l border-white/40 pointer-events-none rounded-2xl"></div>
      {children}
    </div>
  );
}

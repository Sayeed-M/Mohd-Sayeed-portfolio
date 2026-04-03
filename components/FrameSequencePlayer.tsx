"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

interface FrameSequencePlayerProps {
  folderPath: string;
  frameCount: number;
  prefix?: string;
  extension?: string;
  className?: string;
  playbackType?: "scroll" | "hover" | "loop";
  isHovered?: boolean;
}

export default function FrameSequencePlayer({
  folderPath,
  frameCount,
  prefix = "ezgif-frame-",
  extension = ".jpg",
  className = "",
  playbackType = "scroll",
  isHovered = false,
}: FrameSequencePlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const currentFrame = useRef(0);
  const loopRef = useRef<number>(0);

  // Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = new Array(frameCount);

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `${folderPath}/${prefix}${frameNum}${extension}`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };
      imgArray[i - 1] = img;
    }
    images.current = imgArray;

    return () => {
        // cleanup if needed
    };
  }, [folderPath, frameCount, prefix, extension]);

  const drawImage = (frameIndex: number) => {
    if (!canvasRef.current || !images.current[frameIndex]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (containerRef.current) {
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;
    }

    const img = images.current[frameIndex];
    const wRatio = canvas.width / img.width;
    const hRatio = canvas.height / img.height;
    const ratio = Math.max(wRatio, hRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  };

  useEffect(() => {
    if (loaded && playbackType !== "scroll") {
        drawImage(currentFrame.current);
    }
  }, [loaded, playbackType]);

  // Handle Playback: Scroll
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (playbackType === "scroll" && loaded) {
      const frame = Math.floor(latest * (frameCount - 1));
      if (frame >= 0 && frame < frameCount) {
         currentFrame.current = frame;
         // Use requestAnimationFrame safely
         requestAnimationFrame(() => drawImage(frame));
      }
    }
  });

  // Handle Playback: Hover
  useEffect(() => {
    if (playbackType === "hover" && loaded) {
      if (isHovered) {
        cancelAnimationFrame(loopRef.current);
        const playForward = () => {
          currentFrame.current++;
          if (currentFrame.current >= frameCount) {
            currentFrame.current = 0; // loop
          }
          drawImage(currentFrame.current);
          loopRef.current = requestAnimationFrame(playForward);
        };
        loopRef.current = requestAnimationFrame(playForward);
      } else {
        cancelAnimationFrame(loopRef.current);
        // smoothly reverse back to 0 or just stop
        const playReverse = () => {
             if (currentFrame.current > 0) {
                 currentFrame.current--;
                 drawImage(currentFrame.current);
                 loopRef.current = requestAnimationFrame(playReverse);
             }
        };
        loopRef.current = requestAnimationFrame(playReverse);
      }
    }
    return () => cancelAnimationFrame(loopRef.current);
  }, [isHovered, playbackType, loaded, frameCount]);

  // Handle Playback: Loop
  useEffect(() => {
     if (playbackType === "loop" && loaded) {
         const play = () => {
             currentFrame.current = (currentFrame.current + 1) % frameCount;
             drawImage(currentFrame.current);
             loopRef.current = requestAnimationFrame(play);
         };
         loopRef.current = requestAnimationFrame(play);
     }
     return () => cancelAnimationFrame(loopRef.current);
  }, [playbackType, loaded, frameCount]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
    </div>
  );
}

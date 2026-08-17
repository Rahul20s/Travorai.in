"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { Image as ImageIcon } from "lucide-react";

import { resolveTravelImage, DEFAULT_FALLBACK, type TravelImageContext } from "@/lib/images/travelImageResolver";

interface SafeImageProps extends Omit<ImageProps, "onError" | "onLoad" | "src"> {
  src?: string | null;
  fallbackSrc?: string;
  wrapperClassName?: string;
  context?: string | TravelImageContext;
}

export function SafeImage({
  src,
  alt = "Travel Image",
  fallbackSrc,
  wrapperClassName,
  className,
  context = "",
  ...props
}: SafeImageProps) {
  const [errorCount, setErrorCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset states when src changes
    setErrorCount(0);
    setIsLoading(true);
  }, [src]);

  const resolvedContext = typeof context === "string" ? { description: context } : context;
  
  let activeSrc = "";
  if (errorCount === 0) {
    activeSrc = src || resolveTravelImage({ alt, src: src as string, ...resolvedContext });
  } else if (errorCount === 1) {
    // If the primary image fails, try the provided fallbackSrc or the global DEFAULT_FALLBACK
    activeSrc = fallbackSrc || DEFAULT_FALLBACK;
  }

  // If errorCount > 1, meaning even the fallback/DEFAULT_FALLBACK failed, show the UI placeholder.
  const isBroken = errorCount > 1 || !activeSrc;

  return (
    <div className={cn("relative overflow-hidden bg-slate-100 w-full h-full flex items-center justify-center", wrapperClassName)}>
      {/* Loading Skeleton */}
      {isLoading && !isBroken && (
        <div className="absolute inset-0 z-10 animate-pulse bg-slate-200 flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-slate-400 animate-bounce" />
        </div>
      )}

      {/* Broken Placeholder */}
      {isBroken && (
        <div className="absolute inset-0 z-10 bg-slate-100 flex flex-col items-center justify-center text-slate-400 p-4 text-center">
          <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
          <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70 line-clamp-2">{alt}</span>
        </div>
      )}

      {/* Image Rendering */}
      {!isBroken && (
        <Image
          src={activeSrc}
          alt={alt}
          className={cn(
            "object-cover transition-all duration-500",
            isLoading ? "scale-105 blur-sm" : "scale-100 blur-0",
            className
          )}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            setErrorCount((prev) => prev + 1);
            setIsLoading(false);
          }}
          {...props}
        />
      )}
    </div>
  );
}
export default SafeImage;

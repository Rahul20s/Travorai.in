"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { Image as ImageIcon } from "lucide-react";

import { resolveTravelImage, type TravelImageContext } from "@/lib/images/travelImageResolver";

interface SafeImageProps extends Omit<ImageProps, "onError" | "onLoad"> {
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
  const [imgSrc, setImgSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset states when src changes
    setImgSrc(src as string);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const activeSrc = hasError 
    ? (fallbackSrc || resolveTravelImage({ alt, src: src as string, ...(typeof context === "string" ? { description: context } : context) }))
    : (imgSrc || resolveTravelImage({ alt, src: src as string, ...(typeof context === "string" ? { description: context } : context) }));

  return (
    <div className={cn("relative overflow-hidden bg-slate-100", wrapperClassName)}>
      {/* Loading Skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 z-10 animate-pulse bg-slate-200 flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-slate-400 animate-bounce" />
        </div>
      )}

      {/* Image Rendering */}
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
          setHasError(true);
          setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
}
export default SafeImage;

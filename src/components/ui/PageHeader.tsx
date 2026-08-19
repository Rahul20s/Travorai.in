import React from "react";
import { SafeImage } from "./SafeImage";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  imageContext: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, imageContext, children }: PageHeaderProps) {
  return (
    <div className="relative w-full h-[200px] md:h-[280px] flex items-center justify-center overflow-hidden">
      <SafeImage
        src=""
        context={imageContext}
        alt={title}
        fill
        className="object-cover"
      />
      {/* Warm gradient overlay */}
      <div 
        className="absolute inset-0" 
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)" }} 
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-8 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2 drop-shadow-sm">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-white/90 font-medium drop-shadow-sm mb-4">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

import { Slot } from "@radix-ui/react-slot";
import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "outline" | "gradient";
  size?: "default" | "sm" | "lg" | "icon";
};

export function Button({
  asChild,
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-bold transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1]/40 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-60",
        size === "default" && "min-h-10 px-5 text-sm",
        size === "sm" && "min-h-9 px-3.5 text-sm",
        size === "lg" && "min-h-12 px-6 text-base",
        size === "icon" && "size-10 p-0",
        variant === "primary" && "bg-[#0f172a] text-white shadow-sm hover:bg-[#1e293b] hover:shadow-md",
        variant === "secondary" && "bg-[#6366f1] text-white shadow-sm hover:bg-[#4f46e5] hover:shadow-md",
        variant === "gradient" && "bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white shadow-md shadow-indigo-500/30 hover:from-[#4f46e5] hover:to-[#7c3aed]",
        variant === "outline" && "border border-[#e5e7eb] bg-white text-[#0f172a] hover:border-[#6366f1]/40 hover:bg-[#f5f3ff]",
        variant === "ghost" && "text-[#374151] hover:bg-[#f3f4f6]",
        className
      )}
      {...props}
    />
  );
}


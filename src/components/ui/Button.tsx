"use client";

import * as React from "react";
import { cn } from "@/utils/cn";

const variants = {
  primary: "bg-saffron text-ink-black hover:bg-[#ff7a34]",
  secondary: "bg-indigo-night text-off-white hover:bg-[#23233d]",
  ghost: "border border-zinc-300 bg-transparent text-ink-black hover:bg-zinc-100",
  danger: "bg-red-600 text-white hover:bg-red-500",
};

type ButtonVariant = keyof typeof variants;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export function Button({
  className,
  variant = "primary",
  loading = false,
  disabled,
  iconLeft,
  iconRight,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        "relative inline-flex min-h-12 items-center justify-center rounded-md px-4 text-[12px] font-semibold transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/60 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
      disabled={isDisabled}
      {...props}
    >
      <span className={cn("inline-flex items-center gap-2", loading && "opacity-0")}> 
        {iconLeft}
        {children}
        {iconRight}
      </span>
      {loading && (
        <span className="absolute inset-0 inline-flex items-center justify-center">
          <span className="pulsing-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="sr-only">Loading</span>
        </span>
      )}
    </button>
  );
}


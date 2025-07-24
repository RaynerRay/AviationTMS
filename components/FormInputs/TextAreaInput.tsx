"use client";

import { cn } from "@/lib/utils";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";

type TextAreaProps = {
  register: any;
  errors: any;
  label: string;
  name: string;
  helperText?: string;
  toolTipText?: string;
  disabled?: boolean;
};

export default function TextArea({
  register,
  errors,
  label,
  name,
  helperText = "",
  toolTipText,
  disabled = false,
}: TextAreaProps) {
  const hasError = !!errors[name];

  return (
    <div className="w-full">
      {/* Label & Tooltip */}
      <div className="flex items-center justify-between mb-1">
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        {toolTipText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button">
                  <CircleHelp className="w-4 h-4 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs text-gray-600">{toolTipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* TextArea */}
      <textarea
        id={name}
        {...register(name, { required: true })}
        rows={4}
        disabled={disabled}
        placeholder={`Enter ${label.toLowerCase()}...`}
        className={cn(
          "w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30",
          hasError && "border-red-500 focus:ring-red-200",
          disabled && "bg-gray-100 cursor-not-allowed opacity-70"
        )}
      />

      {/* Error */}
      {hasError && (
        <p className="mt-1 text-xs text-red-500">{label} is required</p>
      )}

      {/* Helper Text */}
      {helperText && !hasError && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}

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

type TextInputProps = {
  register: any;
  errors: any;
  label: string;
  type?: string;
  name: string;
  toolTipText?: string;
  unit?: string;
  placeholder?: string;
  icon?: React.ElementType;
  min?: number;
  max?: number;
  disabled?: boolean; // ✅ added
};

export default function TextInput({
  register,
  errors,
  label,
  type = "text",
  name,
  toolTipText,
  unit,
  icon: Icon,
  placeholder,
  min,
  max,
  disabled = false, // ✅ default to false
}: TextInputProps) {
  const hasError = !!errors[name];

  return (
    <div className="w-full">
      {/* Label + Tooltip */}
      <div className="flex items-center justify-between mb-1">
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
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

      {/* Input Field */}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="w-4 h-4 text-gray-400" />
          </div>
        )}

        <input
          id={name}
          type={type}
          min={min}
          max={max}
          disabled={disabled} // ✅ apply disabled
          {...register(name, { required: true })}
          placeholder={placeholder || label}
          className={cn(
            "w-full rounded-md border border-gray-300 bg-white px-6 py-4 text-sm shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30",
            Icon && "pl-9",
            unit && "pr-12",
            hasError && "border-red-500 focus:ring-red-200",
            disabled && "bg-gray-100 cursor-not-allowed opacity-70" // ✅ disabled style
          )}
        />

        {unit && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-500 bg-white rounded-r-md">
            {unit}
          </span>
        )}
      </div>

      {/* Error Message */}
      {hasError && (
        <p className="mt-1 text-xs text-red-500">{label} is required</p>
      )}
    </div>
  );
}

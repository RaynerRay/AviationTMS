import { cn } from "@/lib/utils";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp, AlertCircle, Clock, Plane } from "lucide-react";

type AircraftHoursInputProps = {
  register: any;
  errors: any;
  label: string;
  name: string;
  toolTipText?: string;
  placeholder?: string;
  description?: string;
  hoursType?: "engine" | "airframe" | "flight";
  min?: number;
  max?: number;
};

export default function AircraftHoursInput({
  register,
  errors,
  label,
  name,
  toolTipText,
  placeholder,
  description,
  hoursType = "flight",
  min = 0,
  max = 99999.9,
}: AircraftHoursInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const hasError = errors[name];

  // Get appropriate icon based on hours type
  const getIcon = () => {
    switch (hoursType) {
      case "engine":
        return Clock;
      case "airframe":
        return Plane;
      default:
        return Clock;
    }
  };

  const Icon = getIcon();

  // Format hours display (add commas for thousands)
  const formatHours = (hours: string) => {
    if (!hours) return "";
    const num = parseFloat(hours);
    if (isNaN(num)) return hours;
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    });
  };

  // Handle input change with validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    
    // Remove any non-digit and non-decimal characters
    inputValue = inputValue.replace(/[^0-9.]/g, "");
    
    // Ensure only one decimal point
    const decimalCount = (inputValue.match(/\./g) || []).length;
    if (decimalCount > 1) {
      inputValue = inputValue.substring(0, inputValue.lastIndexOf("."));
    }
    
    // Limit to one decimal place
    if (inputValue.includes(".")) {
      const parts = inputValue.split(".");
      if (parts[1] && parts[1].length > 1) {
        inputValue = `${parts[0]}.${parts[1].substring(0, 1)}`;
      }
    }
    
    // Check max value
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue) && numValue > max) {
      inputValue = max.toString();
    }
    
    setValue(inputValue);
    e.target.value = inputValue;
  };

  return (
    <div className="group relative w-full">
      {/* Label and Tooltip Container */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <label
            htmlFor={name}
            className={cn(
              "text-sm font-semibold transition-colors duration-200",
              hasError 
                ? "text-red-600" 
                : "text-gray-700 group-hover:text-gray-900"
            )}
          >
            {label}
          </label>
          {toolTipText && (
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="p-0.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  >
                    <CircleHelp className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                  </button>
                </TooltipTrigger>
                <TooltipContent 
                  side="top" 
                  className="max-w-xs text-sm bg-gray-900 text-white border-gray-700"
                >
                  <p>{toolTipText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      {/* Description */}
      {description && !hasError && (
        <p className="text-xs text-gray-500 mb-2 leading-relaxed">
          {description}
        </p>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Floating Background Glow */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl transition-all duration-300 -z-10",
            isFocused && !hasError && "bg-gradient-to-r from-blue-50 to-indigo-50 scale-105",
            hasError && "bg-red-50 scale-105"
          )}
        />

        {/* Input Wrapper */}
        <div className="relative">
          {/* Leading Icon */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
            <Icon 
              className={cn(
                "w-5 h-5 transition-colors duration-200",
                hasError 
                  ? "text-red-400" 
                  : isFocused 
                  ? "text-indigo-500" 
                  : "text-gray-400"
              )} 
            />
          </div>

          {/* Input Field */}
          <input
            id={name}
            type="text"
            inputMode="decimal"
            min={min}
            max={max}
            {...register(name, { 
              required: true,
              min: min,
              max: max,
              pattern: {
                value: /^\d+(\.\d{0,1})?$/,
                message: "Please enter a valid number with up to 1 decimal place"
              }
            })}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              // Base styles
              "w-full pl-12 pr-16 py-3.5 text-sm rounded-xl border transition-all duration-300",
              "bg-white/80 backdrop-blur-sm placeholder:text-gray-400",
              "focus:outline-none focus:ring-0",
              
              // States
              hasError 
                ? "border-red-300 text-red-900 shadow-red-100/50 shadow-lg focus:border-red-400 focus:shadow-red-200/50" 
                : "border-gray-200 text-gray-900 hover:border-gray-300 focus:border-indigo-400 focus:shadow-indigo-100/50 shadow-sm hover:shadow-md focus:shadow-lg",
              
              // Mobile optimizations
              "text-base sm:text-sm", // Prevent zoom on iOS
              "min-h-[48px] sm:min-h-[44px]" // Touch-friendly height
            )}
            placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          />

          {/* Trailing Unit */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <span 
              className={cn(
                "text-sm font-medium px-2.5 py-1 rounded-lg transition-colors duration-200",
                hasError 
                  ? "bg-red-100 text-red-700" 
                  : "bg-gray-100 text-gray-600"
              )}
            >
              hrs
            </span>
          </div>

          {/* Error Icon */}
          {hasError && (
            <div className="absolute inset-y-0 right-16 flex items-center pointer-events-none">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
          )}
        </div>

        {/* Bottom Border Animation */}
        <div
          className={cn(
            "absolute bottom-0 left-1/2 h-0.5 transition-all duration-300 -translate-x-1/2",
            isFocused && !hasError && "w-full bg-gradient-to-r from-blue-500 to-indigo-500",
            hasError && "w-full bg-red-400",
            !isFocused && "w-0"
          )}
        />
      </div>

      {/* Error Message */}
      {hasError && (
        <div className="mt-2 flex items-center gap-1.5 animate-in slide-in-from-left-1 duration-200">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-600 font-medium">
            {errors[name]?.message || `${label} is required`}
          </p>
        </div>
      )}

      {/* Success Indicator */}
      {!hasError && isFocused && (
        <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      )}

      {/* Hours Range Indicator */}
      {!hasError && value && (
        <div className="mt-1 text-xs text-gray-500">
          {formatHours(value)} hours logged
        </div>
      )}
    </div>
  );
}
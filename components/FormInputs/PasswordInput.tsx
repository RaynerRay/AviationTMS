"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { CircleHelp, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

type TextInputProps = {
  register: any;
  errors: any;
  label: string;
  type?: string;
  name: string;
  toolTipText?: string;
  placeholder?: string;
  forgotPasswordLink?: string;
  icon?: any;
};

export default function PasswordInput({
  register,
  errors,
  label,
  type = "password",
  name,
  toolTipText,
  icon,
  placeholder,
  forgotPasswordLink,
}: TextInputProps) {
  const Icon = icon;
  const [passType, setPassType] = useState(type);

  const toggleVisibility = () => {
    setPassType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className="space-y-1">
      {/* Label and Optional Link & Tooltip */}
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        <div className="flex items-center space-x-2">
          {forgotPasswordLink && (
            <Link
              href={forgotPasswordLink}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </Link>
          )}
          {toolTipText && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button">
                    <CircleHelp className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-sm">{toolTipText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      {/* Input Field */}
      <div className="relative mt-1">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="w-4 h-4 text-gray-400" />
          </div>
        )}
        <input
          id={name}
          type={passType}
          placeholder={placeholder || label}
          {...register(name, {
            required: true,
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
              message:
                "Include uppercase, lowercase, number, and special character",
            },
          })}
          className={cn(
            "block w-full rounded-md border py-4 pr-10 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
            icon ? "pl-9" : "pl-3",
            errors[name] && "border-red-500 ring-red-500"
          )}
        />
        {/* Toggle Password Visibility */}
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute inset-y-0 right-2 flex items-center px-1 text-gray-500 hover:text-gray-700"
        >
          {passType === "password" ? (
            <Eye className="w-4 h-4" />
          ) : (
            <EyeOff className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Error Message */}
      {errors[name]?.message && (
        <p className="mt-1 text-xs text-red-600">{errors[name].message}</p>
      )}
    </div>
  );
}

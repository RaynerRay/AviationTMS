"use client";

import AddNewButton from "@/components/FormInputs/AddNewButton";
import React from "react";
import Select from "react-tailwindcss-select";
import { Option, Options } from "react-tailwindcss-select/dist/components/type";

type FormSelectInputProps = {
  options: Options;
  label: string;
  option: Option | null;
  setOption: any;
  href?: string;
  labelShown?: boolean;
  toolTipText?: string;
  isSearchable?: boolean;
  isMultiple?: boolean;
  disabled?: boolean;
};

export default function FormSelectInput({
  options,
  label,
  option,
  setOption,
  href,
  toolTipText,
  labelShown = true,
  isSearchable = true,
  isMultiple = false,
  disabled = false,
}: FormSelectInputProps) {
  return (
    <div
      className={`transition-opacity duration-300 ${
        disabled ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
    >
      {labelShown && (
        <label
          htmlFor={label}
          className="block text-sm font-semibold text-gray-800 dark:text-white mb-1 tracking-wide"
        >
          {label}
        </label>
      )}
      <div className="flex items-center space-x-2">
        <div className="flex-1">
        <Select
  isSearchable={isSearchable}
  primaryColor="blue"
  value={option}
  onChange={setOption}
  options={options}
  placeholder={`Select ${label}`}
  isMultiple={isMultiple}
  isDisabled={disabled}
  classNames={{
    menuButton: (props) =>
      `transition-all duration-300 border border-gray-300 dark:border-gray-600 shadow-sm rounded-xl px-3 py-2 text-sm font-medium bg-white dark:bg-gray-800 hover:ring-2 hover:ring-blue-500 ${
        props?.isDisabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""
      }`,
    listItem: (props) =>
      `px-4 py-2 transition-colors duration-200 cursor-pointer ${
        props?.isSelected
          ? "bg-blue-100 dark:bg-blue-600 text-blue-900 dark:text-white"
          : "hover:bg-gray-100 dark:hover:bg-gray-700"
      }`,
  }}
/>

        </div>

        {href && toolTipText && (
          <AddNewButton toolTipText={toolTipText} href={href} />
        )}
      </div>
    </div>
  );
}

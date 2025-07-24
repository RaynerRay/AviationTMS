// components/FeatureShowcase.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';

// Define interfaces for the props
interface FeatureItemProps {
  id: string;
  number: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  isLast?: boolean;
}

interface FeatureData {
  number: string;
  title: string;
  description: string;
}

interface FeatureShowcaseProps {
  title: string;
  subtitle: string;
  features: FeatureData[];
  icons: LucideIcon[];
  brandName?: string;
  BrandIcon?: LucideIcon;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  lightTextColor?: string;
}

// Sub-component for each feature item
const FeatureItem: React.FC<FeatureItemProps> = ({ number, title, description, Icon, isLast }) => {
  return (
    <div className="relative flex items-start space-x-4 group">
      {/* Numbered circle and connecting line */}
      <div className="flex flex-col items-center">
        <div className="z-10 flex items-center justify-center w-12 h-12 bg-sky-600 rounded-full text-white font-semibold text-lg group-hover:bg-sky-700 transition-colors">
          {number}
        </div>
        {!isLast && (
          <div className="flex-grow w-0.5 bg-sky-300 group-hover:bg-sky-400 transition-colors" style={{ minHeight: '4rem' }}></div>
        )}
      </div>

      {/* Text content */}
      <div className="pt-1 pb-6">
        <div className="flex items-center mb-1">
          <Icon className="w-6 h-6 mr-2 text-sky-600 group-hover:text-sky-700 transition-colors" />
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// Main component
const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  title,
  subtitle,
  features,
  icons,
  brandName = "",
  BrandIcon,
  bgColor = "bg-sky-700",
  textColor = "text-white",
  accentColor = "bg-sky-600",
  lightTextColor = "text-sky-100"
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-sky-50 flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="container mx-auto max-w-7xl bg-white shadow-2xl rounded-xl overflow-hidden">
        <div className="md:flex">
          {/* Left Section - Colored Background with Text */}
          <div className={`md:w-2/5 ${bgColor} p-8 sm:p-12 ${textColor} relative overflow-hidden`}>
            {/* Decorative curved element (simplified) */}
            <div 
              className={`absolute top-0 -right-1/3 w-2/3 h-full ${accentColor} opacity-50 transform -skew-x-12`}
              style={{ borderTopLeftRadius: '9999px', borderBottomLeftRadius: '9999px'}}
            ></div>
            <div 
              className={`absolute -bottom-20 -left-20 w-60 h-60 ${accentColor} rounded-full opacity-30`}
            ></div>
            <div 
              className={`absolute top-10 right-10 w-40 h-40 ${accentColor} rounded-full opacity-20`}
            ></div>

            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                {title}
              </h2>
              <p className={`${lightTextColor} text-base sm:text-lg leading-relaxed mb-8`}>
                {subtitle}
              </p>
              {brandName && BrandIcon && (
                <div className="flex items-center text-sky-200">
                  <BrandIcon className="w-10 h-10 mr-3 text-sky-300" />
                  <span className="font-semibold text-2xl">{brandName}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Features List */}
          <div className="md:w-3/5 p-8 sm:p-12">
            <div className="space-y-0">
              {features.map((feature, index) => (
                <FeatureItem
                  key={feature.title}
                  id={feature.title.toLowerCase().replace(/\s+/g, '-')}
                  number={feature.number}
                  title={feature.title}
                  description={feature.description}
                  Icon={icons[index % icons.length]} // Cycle through icons if not enough
                  isLast={index === features.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;
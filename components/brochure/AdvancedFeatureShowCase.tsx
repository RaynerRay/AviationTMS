// components/CustomizedFeatureShowcase.tsx
import React from 'react';
import { useState } from 'react';
import { LucideIcon, Check } from 'lucide-react';

// Define interfaces for the props
interface FeatureItemProps {
  id: string;
  number: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  isLast?: boolean;
  circleColor: string;
  lineColor: string;
  hoverCircleColor: string;
  hoverLineColor: string;
  iconColor: string;
  hoverIconColor: string;
}

interface FeatureData {
  number: string;
  title: string;
  description: string;
}

interface CustomizedFeatureShowcaseProps {
  title: string;
  subtitle: string;
  features: FeatureData[];
  icons: LucideIcon[];
  brandName?: string;
  BrandIcon?: LucideIcon;
  
  // Customizable colors and layout options
  layout?: 'horizontal' | 'vertical';
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
  headerColor?: string;
  descriptionColor?: string;
  showDecorations?: boolean;
  rounded?: string;
  shadow?: string;
  titleSize?: string;
  subtitleSize?: string;
  compact?: boolean;
}

// Sub-component for each feature item
const FeatureItem: React.FC<FeatureItemProps> = ({ 
  number, 
  title, 
  description, 
  Icon, 
  isLast,
  circleColor,
  lineColor,
  hoverCircleColor,
  hoverLineColor,
  iconColor,
  hoverIconColor
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative flex items-start space-x-4 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Numbered circle and connecting line */}
      <div className="flex flex-col items-center">
        <div className={`z-10 flex items-center justify-center w-12 h-12 ${isHovered ? hoverCircleColor : circleColor} rounded-full text-white font-semibold text-lg transition-colors duration-300`}>
          {number}
        </div>
        {!isLast && (
          <div className={`flex-grow w-0.5 ${isHovered ? hoverLineColor : lineColor} transition-colors duration-300`} style={{ minHeight: '4rem' }}></div>
        )}
      </div>

      {/* Text content */}
      <div className="pt-1 pb-6">
        <div className="flex items-center mb-1">
          <Icon className={`w-6 h-6 mr-2 ${isHovered ? hoverIconColor : iconColor} transition-colors duration-300`} />
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// Main component with extensive customization options
const CustomizedFeatureShowcase: React.FC<CustomizedFeatureShowcaseProps> = ({
  title,
  subtitle,
  features,
  icons,
  brandName = "",
  BrandIcon = Check,
  layout = 'horizontal',
  primaryColor = "bg-blue-700",
  secondaryColor = "bg-blue-600",
  accentColor = "bg-blue-500",
  backgroundColor = "bg-white",
  textColor = "text-white",
  headerColor = "text-white",
  descriptionColor = "text-blue-100",
  showDecorations = true,
  rounded = "rounded-xl",
  shadow = "shadow-2xl",
  titleSize = "text-4xl sm:text-5xl",
  subtitleSize = "text-base sm:text-lg",
  compact = false
}) => {
  // Determine layout styles
  const containerLayout = layout === 'horizontal' 
    ? "md:flex" 
    : "flex flex-col";
  
  const sidebarLayout = layout === 'horizontal' 
    ? "md:w-2/5" 
    : "w-full";
  
  const contentLayout = layout === 'horizontal' 
    ? "md:w-3/5" 
    : "w-full";
  
  // Extract color values for feature items
  const circleColor = primaryColor;
  const lineColor = "bg-blue-300";
  const hoverCircleColor = secondaryColor;
  const hoverLineColor = "bg-blue-400";
  const iconColor = "text-blue-600";
  const hoverIconColor = "text-blue-700";
  
  // Adjust padding based on compact mode
  const containerPadding = compact ? "p-4" : "p-4 sm:p-8";
  const sectionPadding = compact ? "p-6" : "p-8 sm:p-12";
  const contentSpacing = compact ? "space-y-2" : "space-y-0";

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center ${containerPadding} font-sans`}>
      <div className={`container mx-auto max-w-7xl ${backgroundColor} ${shadow} ${rounded} overflow-hidden`}>
        <div className={containerLayout}>
          {/* Left/Top Section - Colored Background with Text */}
          <div className={`${sidebarLayout} ${primaryColor} ${sectionPadding} ${textColor} relative overflow-hidden`}>
            {showDecorations && (
              <>
                <div 
                  className={`absolute top-0 -right-1/3 w-2/3 h-full ${secondaryColor} opacity-50 transform -skew-x-12`}
                  style={{ borderTopLeftRadius: '9999px', borderBottomLeftRadius: '9999px'}}
                ></div>
                <div 
                  className={`absolute -bottom-20 -left-20 w-60 h-60 ${accentColor} rounded-full opacity-30`}
                ></div>
                <div 
                  className={`absolute top-10 right-10 w-40 h-40 ${accentColor} rounded-full opacity-20`}
                ></div>
              </>
            )}

            <div className="relative z-10">
              <h2 className={`${titleSize} font-bold mb-6 leading-tight ${headerColor}`}>
                {title}
              </h2>
              <p className={`${descriptionColor} ${subtitleSize} leading-relaxed mb-8`}>
                {subtitle}
              </p>
              {brandName && (
                <div className={`flex items-center ${descriptionColor}`}>
                  <BrandIcon className="w-10 h-10 mr-3 text-blue-300" />
                  <span className="font-semibold text-2xl">{brandName}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right/Bottom Section - Features List */}
          <div className={`${contentLayout} ${sectionPadding}`}>
            <div className={contentSpacing}>
              {features.map((feature, index) => (
                <FeatureItem
                  key={feature.title}
                  id={feature.title.toLowerCase().replace(/\s+/g, '-')}
                  number={feature.number}
                  title={feature.title}
                  description={feature.description}
                  Icon={icons[index % icons.length]} // Cycle through icons if not enough
                  isLast={index === features.length - 1}
                  circleColor={circleColor}
                  lineColor={lineColor}
                  hoverCircleColor={hoverCircleColor}
                  hoverLineColor={hoverLineColor}
                  iconColor={iconColor}
                  hoverIconColor={hoverIconColor}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizedFeatureShowcase;
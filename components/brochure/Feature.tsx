import React from 'react';
import { Shield } from 'lucide-react';

type Feature = {
    id: string;
    title: string;
    description: string;
  };

interface FeatureModuleProps {
  moduleName: string;
  moduleDescription: string;
  features: Feature[];
  logo?: React.ReactNode;
}

const Feature: React.FC<FeatureModuleProps> = ({
  moduleName,
  moduleDescription,
  features,
  logo = <Shield className="h-10 w-10 text-indigo-800" />
}) => {
  return (
    <div className="w-full bg-white font-sans">
      {/* Header with logo and title */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {logo}
            <span className="text-xl font-bold text-indigo-800">SmartSchool</span>
          </div>
        </div>

        {/* Module Title */}
        <h1 className="text-center text-2xl font-bold text-indigo-900 mb-4">{moduleName}</h1>
        
        {/* Module Description */}
        <p className="text-center text-md text-gray-700 max-w-4xl mx-auto mb-12">
          {moduleDescription}
        </p>
        
        {/* Decorative lines */}
        <div className="flex justify-between items-center mb-12">
          <div className="w-1/3 h-2 bg-gradient-to-r from-indigo-800 to-blue-400 rounded-full"></div>
          <div className="w-1/3 h-2 bg-gradient-to-l from-indigo-800 to-blue-400 rounded-full"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              {/* Numbered Circle */}
              <div className="flex-shrink-0">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
                  {feature.id}
                </div>
              </div>
              
              {/* Feature Content */}
              <div className="ml-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom border */}
      <div className="mt-12 border-b-2 border-gray-200"></div>
    </div>
  );
};


// For reusability - export the base component as well
export { Feature };
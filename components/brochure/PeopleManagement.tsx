// components/PeopleManagement.tsx
import React from 'react';
import { ShieldCheck, Users, UserCog, Link as LinkIcon, LockKeyhole } from 'lucide-react'; // Added LockKeyhole

// Interface for individual feature props
interface FeatureCardProps {
  title: string;
  description: string;
  Icon: React.ElementType;
  bgColorClass?: string; // Optional background color class
}

// Data for the features - extracted from the new image
const featuresListData = [
  {
    title: 'Role-Based Access Control',
    description: 'Different levels of access for administrators, teachers, students, and parents.',
    Icon: UserCog,
    bgColorClass: 'bg-sky-600 hover:bg-sky-700',
  },
  {
    title: 'Sibling Management',
    description: 'Linking siblings within the system under a single family profile.',
    Icon: LinkIcon,
    bgColorClass: 'bg-sky-700 hover:bg-sky-700',
  },
  {
    title: 'User Profiles Management', // Updated title to match image
    description: 'SmartSchool features detailed profiles for administrators, teachers, students, parents, board members, and non-teaching staff.',
    Icon: Users,
    bgColorClass: 'bg-sky-700 hover:bg-sky-700', // Matched color with bottom-right for visual balance
  },
  {
    title: 'User Authentication and Security',
    description: 'Secure login processes to ensure the privacy and security of user data.',
    Icon: LockKeyhole, // Changed icon to LockKeyhole
    bgColorClass: 'bg-sky-600 hover:bg-sky-700', // Matched color with top-left
  },
];

// Sub-component for each feature card
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, Icon, bgColorClass = 'bg-blue-500 hover:bg-blue-600' }) => {
  return (
    <div className={`p-6 rounded-lg shadow-lg text-white transition-all duration-300 ease-in-out transform hover:scale-105 ${bgColorClass}`}>
      <Icon className="w-10 h-10 mb-4 opacity-80" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm opacity-90 leading-relaxed">{description}</p>
    </div>
  );
};

// Main component for People Management Module
const PeopleManagement: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="container mx-auto max-w-7xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="md:flex">
          {/* Left Section - Title and Description */}
          <div className="md:w-2/5 bg-slate-700 p-8 sm:p-12 text-white flex flex-col justify-center">
            <div className="mb-auto"> {/* Pushes title and text to the top */}
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                People <br /> Management <br /> Module
              </h1>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
                This module empowers system administrators to effortlessly oversee diverse user groups, including
                teachers, parents, students, non-teaching staff, and system users. It encompasses streamlined user
                account management, including password resets.
              </p>
            </div>
            <div className="mt-auto pt-8"> {/* Pushes logo to the bottom */}
                <div className="flex items-center text-slate-300">
                    <ShieldCheck className="w-12 h-12 mr-3 text-sky-400" />
                    <span className="font-semibold text-3xl">SmartSchool</span>
                </div>
            </div>
          </div>

          {/* Right Section - Features Grid */}
          <div className="md:w-3/5 bg-gray-100 p-8 sm:p-12 flex items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {featuresListData.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  Icon={feature.Icon}
                  bgColorClass={feature.bgColorClass}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleManagement;

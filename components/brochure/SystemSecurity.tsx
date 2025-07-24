import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  DatabaseZap,
  UserCog,
  UsersRound,
  ClipboardList,
  ScanSearch,
  LockKeyhole,
  DatabaseBackup,
  CloudCog,
  Plane,
} from 'lucide-react';

// Interface for individual security feature props
interface SecurityFeatureProps {
  title: string;
  description: string;
  Icon: React.ElementType;
  isLeftColumn?: boolean;
  index: number;
}

// Data for the security features
const securityFeaturesData = [
  {
    title: 'DATA ENCRYPTION',
    description: 'Sensitive aviation data, including SACAA logbooks and flight records, is encrypted during transmission and storage.',
    Icon: DatabaseZap,
  },
  {
    title: 'USER ACCESS CONTROL',
    description: 'Ensures user authentication and authorisation through account password protection for pilots, instructors, and admins across the Aviato platform.',
    Icon: UserCog,
  },
  {
    title: 'REGULAR DATA BACKUP',
    description: 'Automated backups of flight training data are conducted twice daily, with manual options for system admins, safeguarding records.',
    Icon: DatabaseBackup,
  },
  {
    title: 'REGULAR SECURITY UPDATES',
    description: 'Aviato applies security updates to its software and infrastructure regularly, ensuring protection against threats.',
    Icon: CloudCog,
  },
];

// Sub-component for each security feature card
const SecurityFeatureCard: React.FC<SecurityFeatureProps> = ({ title, description, Icon, isLeftColumn, index }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 150);
    
    return () => clearTimeout(timer);
  }, [index]);
  
  // Determine the accent color based on the card's index - using different sky shades
  const accentColors = [
    "bg-sky-300", // First card
    "bg-sky-400", // Second card
    "bg-sky-500", // Third card
    "bg-sky-600"  // Fourth card
  ];
  
  const iconBgColors = [
    "bg-sky-100", // First card
    "bg-sky-200", // Second card
    "bg-sky-300", // Third card
    "bg-sky-200"  // Fourth card
  ];
  
  const iconTextColors = [
    "text-sky-500", // First card
    "text-sky-600", // Second card
    "text-sky-700", // Third card
    "text-sky-600"  // Fourth card
  ];
  
  const titleColors = [
    "text-sky-700", // First card
    "text-sky-800", // Second card
    "text-sky-900", // Third card
    "text-sky-800"  // Fourth card
  ];
  
  const colorIndex = index % 4;
  const accentColor = accentColors[colorIndex];
  const iconBgColor = iconBgColors[colorIndex];
  const iconTextColor = iconTextColors[colorIndex];
  const titleColor = titleColors[colorIndex];

  return (
    <div 
      className={`relative group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
    >
      {/* Accent border */}
      <div className={`absolute ${isLeftColumn ? 'right-0' : 'left-0'} top-0 bottom-0 w-1 ${accentColor} group-hover:w-2 transition-all duration-300 rounded-md`}></div>
      
      <div className={`flex items-start space-x-4 ${isLeftColumn ? 'pr-4' : 'pl-4'}`}>
        <div className="flex-shrink-0 mt-1">
          <div className={`p-3 rounded-lg ${iconBgColor} shadow-md`}>
            <Icon className={`w-6 h-6 ${iconTextColor}`} />
          </div>
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-bold ${titleColor} mb-2 group-hover:text-sky-500 transition-colors duration-300`}>{title}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
      
      {/* Subtle pattern overlay for texture */}
      <div className="absolute inset-0 bg-sky-50 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

// Main component for System Security Module
const SystemSecurity: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 py-16 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      <div className="container mx-auto max-w-7xl relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-300 rounded-full opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-400 rounded-full opacity-20"></div>
        
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="inline-block mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-sky-200 rounded-full blur-md transform scale-110"></div>
              <Plane className="w-16 h-16 text-sky-600 relative z-10 mx-auto" /> {/* Replaced ShieldCheck with Plane */}
            </div>
          </div>
          
          <h1 className="text-xl sm:text-2xl font-extrabold text-sky-800 tracking-tight mb-4">
            SYSTEM SECURITY
          </h1>
          
          <div className="h-1 w-32 bg-gradient-to-r from-sky-300 to-sky-500 mx-auto rounded-full mb-6"></div>
          
          <p className="mt-3 text-md text-sky-800 max-w-2xl mx-auto">
            Ensuring the integrity, confidentiality, and availability of your aviation training data in South Africa.
          </p>
        </div>

        {/* Central decorative elements */}
        <div className="hidden md:block absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-px bg-sky-200"></div>
        
        <div className="hidden md:block absolute inset-y-0 left-1/2 transform -translate-x-1/2">
          <div className="h-full flex flex-col items-center justify-around">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-3 h-3 rounded-full bg-sky-400"></div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 relative z-10">
          {/* Left Column */}
          <div className="space-y-10">
            {securityFeaturesData.slice(0, 2).map((feature, index) => (
              <SecurityFeatureCard
                key={feature.title}
                {...feature}
                isLeftColumn={true}
                index={index}
              />
            ))}
          </div>
          
          {/* Right Column */}
          <div className="space-y-10">
            {securityFeaturesData.slice(2, 5).map((feature, index) => (
              <SecurityFeatureCard
                key={feature.title}
                {...feature}
                isLeftColumn={false}
                index={index}
              />
            ))}
          </div>
        </div>
        
        {/* Bottom decorative element */}
        <div className="mt-16 text-center">
          <div className="inline-block px-6 py-3 bg-sky-600 rounded-full shadow-lg">
            <span className="text-white font-medium">Secured</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSecurity;
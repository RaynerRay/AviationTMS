"use client"
import { useState, ReactNode, JSX } from 'react';
import { Shield, ChevronRight, Users, BookOpen, UserCheck, Lock, Plane, ShieldCheck, DollarSign, Briefcase } from 'lucide-react'; // Added DollarSign and Briefcase for new sections
import PeopleManagement from './PeopleManagement'; // Assuming this component is relevant
import SystemSecurity from './SystemSecurity'; // Assuming this component is relevant
import Contact from './Contact'; // Assuming this component is relevant
import CommunicationModule from './Communication'; // Assuming this component is relevant
import About from './About'; // Assuming this component is relevant
import Intro from './Intro'; // Assuming this component is relevant
import WhyUs from './WhyUs'; // This is the component we previously enhanced
import FeatureShowcase from './FeautureShowcase';
import { aviationCostEfficiency, aviationStudentFeatures, aviationTrainingFeatures } from '@/constants/brochureData';

// featureIcons can be more diverse to visually represent sections
const featureIcons = [
  Plane, // General Aviation
  Users, // Student Focus
  BookOpen, // Training/Curriculum
  DollarSign, // Cost Efficiency
  ShieldCheck, // Security
  Briefcase // Management
];

interface ContentItem {
  title: string;
  content: string; // This might be unused based on how FeatureShowcase works, but keeping it for context
  image: string; // This might be unused, but keeping it for context
}

interface TableOfContentItem {
  id: number;
  title: string;
  icon: ReactNode;
}

// ContentSections type seems unused as content is handled by FeatureShowcase props, removing it
// type ContentSections = {
//   [key: number]: ContentItem;
// }

export default function Brochure(): JSX.Element {
  const [activeSection, setActiveSection] = useState<number>(1);

  // Rephrased Table of Contents titles for more marketing appeal and clarity
  const tableOfContents: TableOfContentItem[] = [
    { id: 1, title: "Our Story: About Aviato", icon: <Shield size={20} /> },
    { id: 2, title: "The Aviato Advantage", icon: <ChevronRight size={20} /> }, // Changed from "Why Aviato"
    { id: 3, title: "Empowering Student Pilots", icon: <Users size={20} /> }, // Changed from "Student Training"
    { id: 4, title: "Streamlined Training Management", icon: <BookOpen size={20} /> }, // Changed from "Aviation Management"
    { id: 5, title: "Optimising Operations & Costs", icon: <DollarSign size={20} /> }, // Changed from "Account Management" for clarity
    { id: 6, title: "Robust Security & Compliance", icon: <Lock size={20} /> }, // Changed from "System Security"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <header className="bg-white py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <div className="flex items-center space-x-2">
            <Plane className="h-10 w-10 text-sky-800" /> {/* Changed icon to Plane for stronger aviation link */}
            <span className="text-2xl font-bold text-sky-800">Aviato</span>
          </div>
        </div>
      </header>

      {/* Intro and About sections - assuming these are already well-optimised or will be */}
      <Intro />
      <About />

      {/* Table of Contents - Enhanced Language */}
      <div className="bg-gradient-to-br from-sky-900 to-sky-700 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-12 text-center">EXPLORE AVIATO: YOUR PARTNER IN AVIATION EXCELLENCE</h1> {/* More engaging title */}

          <div className="grid md:grid-cols-2 gap-6">
            {tableOfContents.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center rounded-full pl-4 pr-8 py-4 transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-sky-700 text-white shadow-lg transform scale-105"
                    : "bg-sky-700 text-sky-100 hover:bg-sky-600"
                }`}
              >
                <div className={`flex items-center justify-center rounded-full h-14 w-14 mr-4 ${
                  activeSection === item.id ? "bg-sky-800" : "bg-sky-700"
                }`}>
                  <span className="text-xl font-bold">{item.id.toString().padStart(2, '0')}</span>
                </div>
                <span className="text-xl font-medium">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* WhyUs component - already enhanced */}
      <WhyUs />

      {/* FeatureShowcase for Student Features - Enhanced Subtitle */}
      <FeatureShowcase
        title="Empowering Your Student Pilots" // Aligned with TOC
        subtitle="Transform how your aspiring aviators learn and grow. Our advanced system provides pilots with intuitive tools for accurate flight logs, seamless progress tracking, and easy access to all essential aviation resources." // Enhanced description
        features={aviationStudentFeatures}
        icons={featureIcons} // Keeping general icons for now, but could be more specific
        brandName="Aviato"
        BrandIcon={Users} // Icon representing students
        bgColor="bg-sky-700"
        textColor="text-white"
        accentColor="bg-sky-600"
        lightTextColor="text-sky-100"
      />

      {/* FeatureShowcase for Cost Efficiency - Enhanced Title & Subtitle */}
      <FeatureShowcase
        title="Optimising Operations & Costs" // Aligned with TOC
        subtitle="Unlock greater efficiency and significant cost savings across your entire training operation. Aviato is engineered to reduce administrative overheads and maximise resource utilisation, boosting your bottom line." // More impactful description
        features={aviationCostEfficiency}
        icons={featureIcons}
        brandName="Aviato"
        BrandIcon={DollarSign} // Icon representing cost/efficiency
        bgColor="bg-sky-700"
        textColor="text-white"
        accentColor="bg-sky-600"
        lightTextColor="text-sky-100"
      />

      {/* FeatureShowcase for Aviation Management (Training Operations) - Enhanced Title & Subtitle */}
      <FeatureShowcase
        title="Streamlined Training Management" // Aligned with TOC
        subtitle="Revolutionise your academy's daily operations. Aviato's powerful management tools expertly handle flight sessions, aircraft maintenance, and ensure seamless compliance with aviation authority regulations for top-tier pilot training." // More impactful description
        features={aviationTrainingFeatures}
        icons={featureIcons}
        brandName="Aviato"
        BrandIcon={BookOpen} // Icon representing curriculum/management
        bgColor="bg-sky-700"
        textColor="text-white"
        accentColor="bg-sky-600"
        lightTextColor="text-sky-100"
      />

      {/* Other modules - assuming their content is handled within their respective files */}
      <CommunicationModule />
      {/* <PeopleManagement /> // Uncomment if needed and content is ready */}
      <SystemSecurity />
      <Contact />
    </div>
  );
}
// components/Bank.tsx
import React from 'react';
import { Users, Landmark, FileText, Archive, GitCompareArrows, CheckCircle } from 'lucide-react';
import FeatureShowcase from './FeautureShowcase';

const Bank: React.FC = () => {
  // Data for the bank features
  const bankFeatures = [
    {
      number: '01',
      title: 'Account Management',
      description: 'This feature allows the accountants to Create and manage bank accounts associated with the educational institution.',
    },
    {
      number: '02',
      title: 'Multi-Bank Support',
      description: 'Smartschool has capability to manage accounts across multiple banks if the institution uses more than one banking partner.',
    },
    {
      number: '03',
      title: 'Transaction Recording',
      description: 'Smartschool allows for capture of transaction details, such as date, amount, and purpose, for accurate record-keeping. Record and categorize financial transactions related to tuition fees, expenses, and other financial activities.',
    },
    {
      number: '04',
      title: 'Payment reminder system',
      description: 'Smartschool has dedicated module for tracking and managing payments',
    },
    {
      number: '05',
      title: 'Automated invoice generation',
      description: 'Smartschool has dedicated module for performing invoice generation within the system.',
    },
  ];

  // Icons to use for the features
  const featureIcons = [Users, Landmark, FileText, Archive, GitCompareArrows];

  const subtitle = "These features collectively contribute to effective bank management within the SmartSchool system, providing educational institutions with the tools they need to streamline financial processes, enhance transparency, and ensure compliance with financial regulations.";

  return (
    <FeatureShowcase
      title="Bank Features"
      subtitle={subtitle}
      features={bankFeatures}
      icons={featureIcons}
      brandName="SmartSchool"
      BrandIcon={CheckCircle}
      bgColor="bg-sky-700"
      textColor="text-white"
      accentColor="bg-sky-600"
      lightTextColor="text-sky-100"
    />
  );
};

export default Bank;
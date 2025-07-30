"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";

type SidebarLink = {
  title: string;
  url: string;
  icon: string;
  isActive?: boolean;
  items?: { title: string; url: string }[];
};

interface AppSidebarProps {
  schoolSlug?: string;
  onLinkClick?: (url: string) => void;
  className?: string;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ 
  schoolSlug = "demo-school", 
  onLinkClick,
  className = ""
}) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    Dashboard: true // Dashboard open by default
  });

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleLinkClick = (url: string) => {
    if (onLinkClick) {
      onLinkClick(url);
    }
  };

  const sidebarLinks: SidebarLink[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: "📊",
      isActive: true,
      items: [
        { title: "Overview", url: "/dashboard" },
        { title: "Logs", url: "/dashboard/logs" },
      ],
    },
    {
      title: "Operations",
      url: "/operations",
      icon: "✈️",
      items: [
        { title: "Aircrafts", url: "/dashboard/operations/aircrafts" },
        { title: "Simulators", url: "/dashboard/operations/simulators" },
      ],
    },
    {
      title: "Student Management",
      url: "/students",
      icon: "👥",
      items: [
        { title: "All Students", url: "/dashboard/students" },
        { title: "Fees", url: "/dashboard/finance/fees" },
        { title: "Student Ids", url: "/dashboard/students/ids" },
      ],
    },
    {
      title: "Safety",
      url: "/safety/",
      icon: "👥",
      items: [
        { title: "Snags", url: "/dashboard/safety/incidents" },
        // { title: "Fees", url: "/dashboard/finance/fees" },
      ],
    },
    {
      title: "Attendance",
      url: "/dashboard/attendance",
      icon: "✔️",
      items: [
        { title: "Attendance", url: "/dashboard/attendance" },
        { title: "View Class Attendances", url: "/dashboard/attendance/by-class" },
        { title: "View Student Attendances", url: "/dashboard/attendance/student" },
      ],
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: "👥",
      items: [
        { title: "Parents", url: "/dashboard/users/parents" },
        { title: "Teachers", url: "/dashboard/users/teachers" },
        { title: "Staff Members", url: "/dashboard/users" },
      ],
    },
    {
      title: "Academics",
      url: "/dashboard/academics",
      icon: "🎓",
      items: [
        { title: "Terms", url: "/dashboard/academics/terms" },
        { title: "Classes and Streams", url: "/dashboard/academics/classes" },
        { title: "Subjects", url: "/dashboard/academics/subjects" },
        { title: "Timetable", url: "/academics/timetable" },
        { title: "Examinations", url: "/dashboard/academics/exams" },
        { title: "Assignments", url: "/academics/assignments" },
        { title: "Report Cards", url: "/dashboard/academics/reports" },
      ],
    },
    {
      title: "Maintenance",
      url: "/maintenance",
      icon: "👥",
      items: [
        { title: "Snags", url: "/dashboard/maintenance/snags" },
        // { title: "Attendance", url: "/staff/attendance" },
        // { title: "Leave Management", url: "/staff/leave" },
        // { title: "Performance", url: "/staff/performance" },
      ],
    },
    {
      title: "Staff Management",
      url: "/staff",
      icon: "👥",
      items: [
        { title: "Staff Directory", url: "/staff/directory" },
        { title: "Attendance", url: "/staff/attendance" },
        { title: "Leave Management", url: "/staff/leave" },
        { title: "Performance", url: "/staff/performance" },
      ],
    },
    {
      title: "Communication",
      url: "/communication",
      icon: "💬",
      items: [
        { title: "Reminders", url: "/dashboard/communication/reminders" },
        { title: "Announcements", url: "/communication/announcements" },
        { title: "Notice Board", url: "/communication/notices" },
        { title: "Emergency Alerts", url: "/communication/alerts" },
        { title: "Website Messages", url: "/dashboard/communication/website-messages" },
      ],
    },
    {
      title: "Finance",
      url: "/finance",
      icon: "💰",
      items: [
        { title: "Fee Management", url: "/dashboard/finance/fees" },
        { title: "Payments", url: "/dashboard/finance/payments" },
        { title: "Scholarships", url: "/finance/scholarships" },
        { title: "Reports", url: "/finance/reports" },
      ],
    },
    {
      title: "Transport",
      url: "/transport",
      icon: "🚌",
      items: [
        { title: "Routes", url: "/transport/routes" },
        { title: "Tracking", url: "/transport/tracking" },
        { title: "Drivers", url: "/transport/drivers" },
        { title: "Maintenance", url: "/transport/maintenance" },
      ],
    },
    {
      title: "Resources",
      url: "/resources",
      icon: "📚",
      items: [
        { title: "Library", url: "/resources/library" },
        { title: "Inventory", url: "/resources/inventory" },
        { title: "Facilities", url: "/resources/facilities" },
        { title: "Assets", url: "/resources/assets" },
      ],
    },
    {
      title: "Reports & Analytics",
      url: "/reports",
      icon: "📈",
      items: [
        { title: "Academic Reports", url: "/reports/academic" },
        { title: "Financial Reports", url: "/reports/financial" },
        { title: "Custom Reports", url: "/reports/custom" },
        { title: "Analytics Dashboard", url: "/reports/analytics" },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: "⚙️",
      items: [
        { title: "School Profile", url: "/settings/profile" },
        { title: "User Management", url: "/settings/users" },
        { title: "System Settings", url: "/settings/system" },
        { title: "Backup & Security", url: "/settings/security" },
      ],
    },
    {
      title: "Admin Only",
      url: "/dashboard/admin",
      icon: "🔑",
      items: [
        { title: "Contacts", url: "/dashboard/admin/contacts" },
      ],
    },
    {
      title: "Website",
      url: "/sch/school-site",
      icon: "🏢",
      items: [
        { title: "Live Website", url: `/sch/${schoolSlug}` },
        { title: "Customise Website", url: `/sch/${schoolSlug}/customize` },
      ],
    },
  ];

  return (
    <div className={`w-64 bg-white shadow-md ${className}`}>
      {/* Header */}
      <Link href={"/"} className="flex items-center p-4 border-b border-gray-200">
        <div className="bg-sky-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 font-bold text-lg">
          A
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">AVIATO</h1>
        </div>
      </Link>
      <div className="w-64 bg-white shadow-md p-4">
      
      </div>
      {/* Navigation */}
      <nav className="p-4 h-full overflow-y-auto">
        <div className="space-y-1">
          {sidebarLinks.map((link) => (
            <div key={link.title}>
              {/* Main Menu Item */}
              <div
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  link.isActive
                    ? "bg-indigo-50 text-sky-700 border-l-4 border-sky-500"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => {
                  if (link.items && link.items.length > 0) {
                    toggleMenu(link.title);
                  } else {
                    handleLinkClick(link.url);
                  }
                }}
              >
                <div className="flex items-center">
                  <span className="mr-3 text-lg">{link.icon}</span>
                  <span className="text-md">{link.title}</span>
                </div>
                {link.items && link.items.length > 0 && (
                  <div className="text-gray-400">
                    {openMenus[link.title] ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </div>
                )}
              </div>

              {/* Submenu Items */}
              {link.items && openMenus[link.title] && (
                <div className="ml-6 mt-1 space-y-1">
                  {link.items.map((item) => (
                    <Link href={item.url} key={item.title} onClick={() => handleLinkClick(item.url)}>
                    <div className="flex items-center p-2 pl-4 rounded-md cursor-pointer text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150">
                      <div className="w-2 h-2 bg-gray-300 rounded-full mr-3"></div>
                      {item.title}
                    </div>
                  </Link>
                  
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="mt-8 p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-2">
              <span className="text-sm font-bold">🎓</span>
            </div>
            <div>
              <p className="font-semibold text-sm">SchoolPro</p>
              <p className="text-xs opacity-90">Premium Features</p>
            </div>
          </div>
          <p className="text-xs opacity-90 mb-3">
            Unlock advanced analytics and reporting
          </p>
          <button className="w-full bg-white text-indigo-600 py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors duration-200">
            Upgrade Now
          </button>
        </div>
      </nav>
    </div>
  );
};

// Demo usage component
export default function SidebarDemo() {
  const [selectedUrl, setSelectedUrl] = useState("/dashboard");

  const handleLinkClick = (url: string) => {
    setSelectedUrl(url);
    console.log("Navigating to:", url);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AppSidebar 
        schoolSlug="demo-school" 
        onLinkClick={handleLinkClick}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            School Management System
          </h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              Current Page
            </h2>
            <p className="text-gray-600 mb-4">
              Selected URL: <code className="bg-gray-100 px-2 py-1 rounded text-sm">{selectedUrl}</code>
            </p>
            <p className="text-gray-600">
              Click on any sidebar item to see the navigation in action. The sidebar includes
              all the school management features with proper hierarchical organization.
            </p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">📊 Dashboard</h3>
                <p className="text-sm text-blue-600">Overview and system logs</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">👥 Student Management</h3>
                <p className="text-sm text-green-600">Students, fees, and IDs</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">🎓 Academics</h3>
                <p className="text-sm text-purple-600">Terms, classes, and exams</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
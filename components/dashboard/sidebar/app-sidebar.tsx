// components/AppSidebar.tsx
'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard, Plane, Users, GraduationCap, MessageSquare, DollarSign,
  Bus, BookOpen, BarChart2, Settings2, Key, Building, ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/logo';
import UserMenu from './user-menu';
import { cn } from '@/lib/utils'; // utility to conditionally join classNames

type SidebarLink = {
  title: string;
  url: string;
  icon: React.ElementType;
  isActive?: boolean;
  items?: { title: string; url: string }[];
};

interface AppSidebarProps {
  schoolSlug: string;
  onLinkClick?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ schoolSlug, onLinkClick }) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const sidebarLinks: SidebarLink[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        { title: "Overview", url: "/dashboard" },
        { title: "Logs", url: "/dashboard/logs" },
      ],
    },
    {
      title: "Operations",
      url: "/operations",
      icon: Plane,
      items: [
        { title: "Aircrafts", url: "/dashboard/operations/aircrafts" },
        { title: "Simulators", url: "/dashboard/operations/simulators" },
      ],
    },
    {
      title: "Student Management",
      url: "/students",
      icon: Users,
      items: [
        { title: "All Students", url: "/dashboard/students" },
        { title: "Fees", url: "/dashboard/finance/fees" },
        { title: "Student Ids", url: "/dashboard/students/ids" },
      ],
    },
    {
      title: "Attendance",
      url: "/dashboard/attendance",
      icon: Users,
      items: [
        { title: "Attendance", url: "/dashboard/attendance" },
        { title: "View Class Attendances", url: "/dashboard/attendance/by-class" },
        { title: "View Student Attendances", url: "/dashboard/attendance/student" },
      ],
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: Users,
      items: [
        { title: "Parents", url: "/dashboard/users/parents" },
        { title: "Teachers", url: "/dashboard/users/teachers" },
        { title: "Staff Members", url: "/dashboard/users" },
      ],
    },
    {
      title: "Academics",
      url: "/dashboard/academics",
      icon: GraduationCap,
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
      title: "Staff Management",
      url: "/staff",
      icon: Users,
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
      icon: MessageSquare,
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
      icon: DollarSign,
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
      icon: Bus,
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
      icon: BookOpen,
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
      icon: BarChart2,
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
      icon: Settings2,
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
      icon: Key,
      items: [
        { title: "Contacts", url: "/dashboard/admin/contacts" },
      ],
    },
    {
      title: "Website",
      url: "/sch/school-site",
      icon: Building,
      items: [
        { title: "Live Website", url: `/sch/${schoolSlug}` },
        { title: "Customise Website", url: `/sch/${schoolSlug}/customize` },
      ],
    },
  ];

  return (
    <aside className="bg-white dark:bg-gray-900 w-full h-full border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all">
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <Logo href="/dashboard" />
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-2">
          {sidebarLinks.map((item) => {
            const Icon = item.icon;
            const isOpen = openMenus[item.title] || item.isActive;

            return (
              <li key={item.title}>
                <button
                  onClick={() => toggleMenu(item.title)}
                  className="flex items-center w-full px-3 py-2 rounded-md text-left hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span className="flex-1 text-sm font-medium">{item.title}</span>
                  <ChevronRight
                    className={cn('h-4 w-4 transition-transform', {
                      'rotate-90': isOpen,
                    })}
                  />
                </button>
                {isOpen && item.items && (
                  <ul className="ml-8 mt-1 space-y-1">
                    {item.items.map((subItem) => (
                      <li key={subItem.title}>
                        <Link
                          href={subItem.url}
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:underline"
                          onClick={onLinkClick}
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <UserMenu />
      </div>
    </aside>
  );
};
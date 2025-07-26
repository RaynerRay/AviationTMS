'use client';

import React, { useState } from 'react';
import SidebarHeader from '@/components/dashboard/sidebar/sidebar-header';
import { User } from '@/types/types'; // Adjust if needed
import { RecentActivity } from '@/types/types';
import clsx from 'clsx';
import { AppSidebar } from './sidebar/app-sidebar';

type Props = {
  user: User;
  // notifications: RecentActivity[];
  children: React.ReactNode;
};

export function ClientDashboard({ user, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 overflow-hidden relative">
      {/* Sidebar */}
      <div
        className={clsx(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transition-transform transform md:translate-x-0 md:static md:inset-0 md:z-auto',
          {
            '-translate-x-full': !sidebarOpen,
            'translate-x-0': sidebarOpen,
          }
        )}
      >
        <AppSidebar 
          schoolSlug={user.schoolId ?? ''} 
          onLinkClick={() => setSidebarOpen(false)}
        />
      </div>

      {/* Backdrop (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col relative z-10">
        <SidebarHeader 
          // notifications={notifications} 
          onSidebarToggle={toggleSidebar} 
        />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, Plus, Bell, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import NotificationButton from './notification-button';
import clsx from 'clsx';
import { RecentActivity } from '@/types/types';
import { useUserSession } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { useDeviceInfo } from '@/hooks/useDeviceInfo';
import useSchoolStore from '@/store/school';
import { getInitials } from '@/lib/getInitials';
import { getCurrentTime } from '@/lib/timeUtils';
import { createUserLog } from '@/actions/user-logs';
import toast from 'react-hot-toast';

type DashboardHeaderProps = {
  // notifications: RecentActivity[];
  onSidebarToggle?: () => void; // Trigger for mobile sidebar
};

const SidebarHeader: React.FC<DashboardHeaderProps> = ({
  // notifications,
  onSidebarToggle
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  
  // User session hooks
  const { user: data, clearSession } = useUserSession();
  const router = useRouter();
  const { getDeviceInfo } = useDeviceInfo();
  const { school } = useSchoolStore();

  const user = {
    name: data?.name || "Unknown User",
    email: data?.email || "user@example.com",
    avatar: data?.image ?? "/avatars/default.jpg",
  };

  const initials = getInitials(user.name);
  const { time } = getCurrentTime();

  const handleLogout = async () => {
    try {
      const deviceInfo = await getDeviceInfo();
      console.log(deviceInfo);
      // const log = {
      //   name: user.name,
      //   activity: `User (${user.name}) Logged Out`,
      //   time,
      //   ipAddress: deviceInfo.ipAddress,
      //   device: deviceInfo.device,
      //   schoolId: school?.id ?? "",
      // };
      // await createUserLog(log);
      await clearSession();
      toast.success("Logged Out Successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="relative z-50 flex flex-wrap items-center justify-between border-b bg-white px-4 py-3 shadow-sm dark:bg-gray-900">
      {/* Left side: menu + search */}
      <div className="flex items-center gap-3 flex-1">
        {/* Sidebar Trigger (Mobile) */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={(e) => {
            e.stopPropagation();
            console.log('Sidebar toggle clicked'); // Debug log
            onSidebarToggle?.();
          }} 
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search input */}
        {/* <div className="min-w-[180px] w-full max-w-xs">
          <Input placeholder="Search..." />
        </div> */}
      </div>

      {/* Right side (Desktop) */}
      <div className="hidden md:flex items-center gap-3">
        {/* <NotificationButton notifications={notifications} /> */}
        
        {/* Desktop User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <Avatar className="h-8 w-8 rounded-md">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left text-sm leading-tight truncate">
              <span className="font-semibold truncate">{user.name}</span>
              <span className="text-xs text-gray-500 truncate">{user.email}</span>
            </div>
            <ChevronDown className="ml-auto h-4 w-4 text-gray-500" />
          </button>

          {/* Desktop User Dropdown */}
          <div
            className={clsx(
              "absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border text-sm z-50 transition-all duration-200",
              userMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            )}
          >
            <div className="px-4 py-3 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="px-4 py-2">
              <button
                onClick={handleLogout}
                className="flex items-center text-red-600 hover:text-red-700 w-full gap-2"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu Toggle */}
      <div className="md:hidden">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
        >
          <Menu className="h-5 w-5" />
        </Button>
         
      </div>

      {/* Mobile Dropdown Panel */}
      <div
        ref={menuRef}
        className={clsx(
          'absolute right-4 top-full mt-2 w-64 rounded-lg border bg-white shadow-lg z-50 transition-all duration-200',
          menuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
        )}
      >
        <ul className="py-2 text-sm space-y-1">
          <li>
            <Link
              href="/dashboard/students/new"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
              onClick={() => setMenuOpen(false)}
            >
              <Plus className="h-4 w-4" />
              Add Student
            </Link>
          </li>
          {/* <li className="px-4 py-2">
            <NotificationButton notifications={notifications} />
          </li> */}
          
          {/* Mobile User Info */}
          <li className="px-4 py-3 border-t">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold truncate text-sm">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="flex items-center text-red-600 hover:text-red-700 w-full gap-2 text-sm"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default SidebarHeader;
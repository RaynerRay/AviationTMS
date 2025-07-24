"use client";

import {
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserSession } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useDeviceInfo } from "@/hooks/useDeviceInfo";
import useSchoolStore from "@/store/school";
import { getInitials } from "@/lib/getInitials";
import { getCurrentTime } from "@/lib/timeUtils";
import { createUserLog } from "@/actions/user-logs";
import React, { useState } from "react";
import toast from "react-hot-toast";
import clsx from "clsx";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
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
      console.log(deviceInfo)
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

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition w-full md:w-auto"
      >
        <Avatar className="h-8 w-8 rounded-md">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="hidden sm:flex flex-col text-left text-sm leading-tight truncate">
          <span className="font-semibold truncate">{user.name}</span>
          <span className="text-xs text-gray-500 truncate">{user.email}</span>
        </div>
        <ChevronDown className="ml-auto h-4 w-4 text-gray-500 hidden sm:block" />
      </button>

      {/* Dropdown */}
      <div
        className={clsx(
          "absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border text-sm z-50 transition-all duration-200",
          open ? "opacity-100 visible" : "opacity-0 invisible"
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


        <hr />

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
  );
}

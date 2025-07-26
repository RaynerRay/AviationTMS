import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4 flex flex-col h-screen">
        {/* Logo */}
        <div className="flex items-center mb-6">
          <Skeleton className="h-10 w-10 rounded-full bg-indigo-600" />
          <Skeleton className="h-6 w-20 ml-2" />
        </div>

        {/* Navigation items */}
        <div className="flex-1 space-y-2">
          {["Dashboard", "Leaderboard", "Order", "Products", "Sales Report", "Messages", "Settings", "Sign Out"].map((item, index) => (
            <div key={index} className="px-2 py-2 rounded-md hover:bg-indigo-100">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>

        {/* Promo Section */}
        <div className="mt-auto p-4 bg-indigo-600 rounded-lg text-white">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-40 mt-1" />
          <Skeleton className="h-8 w-full mt-2 rounded" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Header with search and actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* <Link href="/dashboard" className="hidden md:block text-indigo-600 font-semibold hover:underline"> */}
              <Skeleton className="h-6 w-24" /> {/* Dashboard opener */}
            {/* </Link> */}
            <div className="min-w-[180px] w-full max-w-xs">
              <Skeleton className="h-10 w-full rounded-lg" /> {/* Search input */}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" /> {/* User avatar */}
          </div>
        </div>

        {/* Welcome banner */}
        <div className="bg-indigo-600 rounded-lg p-6 mb-6 text-white">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full bg-indigo-500" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-64 bg-indigo-500" />
              <Skeleton className="h-4 w-40 bg-indigo-500" />
            </div>
          </div>
        </div>

        {/* Statistics cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {["Today's Sales", "Total Orders", "Product Sold", "New Customers"].map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full bg-gray-200" />
              </div>
              <Skeleton className="h-4 w-28 mt-4" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Students Table */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>

            <div className="space-y-2">
              {/* Table header */}
              <div className="grid grid-cols-3 gap-4 pb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>

              {/* Table rows */}
              {[1, 2, 3].map((row) => (
                <div key={row} className="grid grid-cols-3 gap-4 py-3 border-t">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <div className="flex items-center">
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-8" />
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>

            <div className="space-y-2">
              {/* Table header */}
              <div className="grid grid-cols-2 gap-4 pb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>

              {/* Event rows */}
              {[1, 2, 3].map((event) => (
                <div key={event} className="grid grid-cols-2 gap-4 py-3 border-t">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
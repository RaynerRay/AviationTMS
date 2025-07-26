"use client";

import React from "react";
import { format } from "date-fns";
import {
  Users,
  UserCog,
  UserCircle,
  CheckCircle,
  BarChart,
  LineChart,
  MapPin,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { AdminStats } from "@/actions/analytics";
import useSchoolStore from "@/store/school";

type DashboardDetailsProps = {
  analytics: AdminStats;
};

export default function DashboardDetails({ analytics }: DashboardDetailsProps) {
  const { school } = useSchoolStore();
  const recentStudents = analytics.recentStudents ?? [];
  const recentEvents = analytics.recentEvents ?? [];

  const salesSummary = [
    { title: "Today's Sales", value: "$1K", change: "+8% from yesterday", color: "bg-red-200" },
    { title: "Total Orders", value: "300", change: "+5% from yesterday", color: "bg-yellow-200" },
    { title: "Product Sold", value: "5", change: "+12% from yesterday", color: "bg-green-200" },
    { title: "New Customers", value: "8", change: "0.5% from yesterday", color: "bg-purple-200" },
  ];

  const revenueData = [
    { day: "Monday", online: 15000, offline: 5000 },
    { day: "Tuesday", online: 18000, offline: 7000 },
    { day: "Wednesday", online: 12000, offline: 4000 },
    { day: "Thursday", online: 20000, offline: 8000 },
    { day: "Friday", online: 16000, offline: 6000 },
    { day: "Saturday", online: 14000, offline: 3000 },
    { day: "Sunday", online: 10000, offline: 2000 },
  ];

  const topProducts = [
    { rank: "01", name: "Home Decor Range", popularity: 45, color: "bg-blue-500" },
    { rank: "02", name: "Disney Princess Pink Bag", popularity: 25, color: "bg-green-500" },
    { rank: "03", name: "Bathroom Essentials", popularity: 18, color: "bg-purple-500" },
    { rank: "04", name: "Apple Smartwatches", popularity: 12, color: "bg-orange-500" },
  ];

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
     

      {/* Main Content */}
      <div className="flex-1 p-6">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Summary */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {salesSummary.map((item, i) => (
              <div key={i} className={`p-4 rounded-lg shadow-md ${item.color}`}>
                <p className="text-sm text-gray-600">{item.title}</p>
                <p className="text-2xl font-bold mt-2">{item.value}</p>
                <p className="text-xs text-gray-500 mt-1">{item.change}</p>
                <button className="mt-2 text-xs text-gray-600 hover:underline">Export</button>
              </div>
            ))}
          </div>

          {/* Visitor Insights */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Visitor Insights</h3>
            {/* Placeholder for chart - replace with actual chart component */}
            <div className="h-40 bg-gray-100 rounded flex items-center justify-center">Chart Placeholder</div>
            <p className="text-xs text-gray-500 mt-2">Loyal Customers | New Customers | Unique Customers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Total Revenue */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
            {/* Placeholder for bar chart - replace with actual chart component */}
            <div className="h-40 bg-gray-100 rounded flex items-center justify-center">Chart Placeholder</div>
            <p className="text-xs text-gray-500 mt-2">Online Sales | Offline Sales</p>
          </div>

          {/* Customer Satisfaction */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Customer Satisfaction</h3>
            {/* Placeholder for line chart - replace with actual chart component */}
            <div className="h-40 bg-gray-100 rounded flex items-center justify-center">Chart Placeholder</div>
            <p className="text-xs text-gray-500 mt-2">Last Month | This Month</p>
          </div>

          {/* Target vs Reality */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Target vs Reality</h3>
            <div className="space-y-2">
              <p>Reality Sales: $8,823</p>
              <p>Target Sales: $4,504</p>
              <p>Commercial: 12,222</p>
            </div>
            {/* Placeholder for bar chart - replace with actual chart component */}
            <div className="h-40 bg-gray-100 rounded flex items-center justify-center">Chart Placeholder</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Top Products */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Top Products</h3>
            <div className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">{product.rank} {product.name}</p>
                  </div>
                  <div className={`w-1/2 h-2 bg-${product.color.slice(3)} rounded`}></div>
                  <p className="text-sm">{product.popularity}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Mapping by Country */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Sales Mapping by Country</h3>
            {/* Placeholder for map - replace with actual map component */}
            <div className="h-40 bg-gray-100 rounded flex items-center justify-center">Map Placeholder</div>
          </div>

          {/* Volume vs Service Level */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Volume vs Service Level</h3>
            {/* Placeholder for bar chart - replace with actual chart component */}
            <div className="h-40 bg-gray-100 rounded flex items-center justify-center">Chart Placeholder</div>
            <p className="text-xs text-gray-500 mt-2">Volume | Services</p>
          </div>
        </div>
      </div>
    </div>
  );
}
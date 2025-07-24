"use client";

import React from "react";
import { format } from "date-fns";
import {
  Users,
  UserCog,
  DollarSign,
  UserCircle,
  CheckCircle,
  Clock,
  MapPin,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { AdminStats } from "@/actions/analytics";
import { Badge } from "../ui/badge";
import useSchoolStore from "@/store/school";

export default function DashboardDetails({
  analytics,
}: {
  analytics: AdminStats;
}) {
  const stats = [
    {
      title: "Students",
      count: analytics.students ?? 0,
      href: "/dashboard/students",
      icon: Users,
      color: "bg-blue-500",
      textColor: "text-blue-500",
    },
    {
      title: "Operations",
      count: analytics.students ?? 0,
      href: "/dashboard/operations",
      icon: Users,
      color: "bg-blue-500",
      textColor: "text-blue-500",
    },
    {
      title: "Teachers",
      count: analytics.teachers ?? 0,
      href: "/dashboard/users/teachers",
      icon: UserCog,
      color: "bg-purple-500",
      textColor: "text-purple-500",
    },
    {
      title: "Parents",
      count: analytics.parents ?? 0,
      href: "/dashboard/users/parents",
      icon: UserCircle,
      color: "bg-green-500",
      textColor: "text-green-500",
    },
    {
      title: "Fees Paid",
      count: analytics.totalPaid ?? 0,
      href: "/dashboard/finances/fees",
      icon: CheckCircle,
      color: "bg-emerald-500",
      textColor: "text-emerald-500",
      prefix: "$",
    },
    // {
    //   title: "Pending Fees",
    //   count: analytics.totalPending ?? 0,
    //   href: "/dashboard/finances/pending",
    //   icon: Clock,
    //   color: "bg-amber-500",
    //   textColor: "text-amber-500",
    //   prefix: "$",
    // },
  ];

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (e) {
      return dateString;
    }
  };

  const { school } = useSchoolStore();
  const recentStudents = analytics.recentStudents ?? [];
  const recentEvents = analytics.recentEvents ?? [];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {stats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {stats.map((item, i) => {
            const Icon = item.icon;
            return (
              <Card
                key={i}
                className="relative overflow-hidden hover:shadow-md transition-shadow border-l-4"
                style={{ borderLeftColor: item.color.replace("bg-", "#") }}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {item.title}
                      </p>
                      <p className="text-2xl font-semibold tracking-tight">
                        {item.prefix && item.prefix}
                        {item.count.toLocaleString()}
                      </p>
                    </div>
                    <div
                      className={`${item.color} bg-opacity-10 p-2 rounded-full`}
                    >
                      <Icon className={`h-5 w-5 ${item.textColor}`} />
                    </div>
                  </div>
                  <Link
                    href={item.href}
                    className="mt-3 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                  >
                    View details →
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Tables Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Students Table */}
        <Card className="overflow-x-auto">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              <div className="flex items-center justify-between">
                <h2>Recent Students</h2>
                <Link
                  href="/dashboard/students"
                  className="text-sm font-medium text-blue-500 hover:text-blue-600 flex items-center gap-1"
                >
                  View all students →
                </Link>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Class</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentStudents.length > 0 ? (
                    recentStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <h2>{student.name}</h2>
                            <h2 className="text-sm text-muted-foreground">
                              {student.regNo}
                            </h2>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              student.gender === "MALE" ? "default" : "secondary"
                            }
                          >
                            {student.gender.charAt(0) +
                              student.gender.slice(1).toLowerCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>{student.class.title}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                        No Students
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Events Table */}
        <Card className="overflow-x-auto">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              <div className="flex items-center justify-between">
                <h2>Upcoming Events</h2>
                <Link
                  href={`/sch/${school?.slug}/customize/events`}
                  className="text-sm font-medium text-blue-500 hover:text-blue-600 flex items-center gap-1"
                >
                  View all events →
                </Link>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentEvents.length > 0 ? (
                    recentEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <h2>{event.title}</h2>
                            <h2 className="text-sm text-muted-foreground">
                              {formatDate(event.date)}
                            </h2>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <h2>
                              {event.startTime} - {event.endTime}
                            </h2>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center py-4 text-muted-foreground">
                        No Events Data
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

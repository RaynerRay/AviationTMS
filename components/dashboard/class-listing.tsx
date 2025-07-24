"use client";
import * as React from "react";
import {
  ChevronLeft,
  GraduationCap,
  Users,
  Pencil,
  Trash2,
  Building,
  BookCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ClassForm from "./forms/academics/class-form";
import StreamForm from "./forms/academics/stream-form";
import { BriefTeacher, Class} from "@/types/types";
import Image from "next/image";
import AssignClassTeacherForm from "./forms/academics/assign-classteacher-form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function ClassListing({
  classes,
  teachers,
}: {
  classes: Class[];
  teachers: BriefTeacher[];
}) {
  const [selectedClass, setSelectedClass] = React.useState<string>("");
  const streams = classes.find((c) => c.id === selectedClass)?.streams || [];
  const sClass = classes.find((c) => c.id === selectedClass);

  return (
    <div className="grid lg:grid-cols-[280px_1fr] h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] gap-4 p-4 pt-2">
      {/* Sidebar */}
      <div className="flex flex-col gap-4 bg-white shadow-sm rounded-xl border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-700">
            <GraduationCap className="h-6 w-6" />
            <h2 className="text-lg font-semibold">Classes</h2>
          </div>
          <ClassForm />
        </div>

        {classes.length > 0 ? (
          <>
            <Input
              placeholder="Search classes..."
              type="search"
              className="h-9"
            />
            <ScrollArea className="flex-1">
              <div className="space-y-2 pt-2">
                {classes.map((classItem) => (
                  <div
                    key={classItem.id}
                    className={cn(
                      "group flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm transition-all cursor-pointer",
                      selectedClass === classItem.id
                        ? "bg-blue-100/60 text-blue-900 shadow-sm"
                        : "hover:bg-muted text-muted-foreground"
                    )}
                  >
                    <button
                      onClick={() => setSelectedClass(classItem.id)}
                      className="flex flex-col items-start text-left w-full"
                    >
                      <div className="flex w-full justify-between items-center">
                        <span className="font-medium">
                          {classItem.title}
                        </span>
                        <span className="text-xs">
                          {classItem.streams.length} streams
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        {classItem._count.students} students
                      </div>
                    </button>

                    <div className="flex items-center gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                            >
                              <Pencil className="h-3 w-3" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit Class</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                            >
                              <Trash2 className="h-3 w-3" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete Class</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </>
        ) : (
          <div className="text-muted-foreground text-sm text-center">
            No Classes Found
          </div>
        )}
      </div>

      {/* Main View */}
      {selectedClass ? (
        <div className="flex flex-col gap-4 bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/40">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div>
                <h2 className="text-lg font-semibold">
                  {sClass?.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Classes / {sClass?.title}
                </p>
              </div>
            </div>
            <StreamForm classId={selectedClass} />
          </div>

          <div className="p-4 space-y-4">
            {/* <Card className="w-full max-w-2xl mx-auto border shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold">
                      {sClass?.classTeacherName ?? "No Teacher Assigned"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Current Class Teacher
                    </p>
                  </div>
                  <AssignClassTeacherForm
                    teachers={teachersWithoutClasses}
                    classId={selectedClass}
                    oldClassTeacherId={sClass?.classTeacherId}
                  />
                </div>
              </CardContent>
            </Card> */}

            <Tabs defaultValue="streams" className="w-full">
              <TabsList className="w-full border-b px-4 bg-white">
                {[
                  { id: "streams", label: "Streams", icon: Building },
                  { id: "subjects", label: "Subjects", icon: BookCheck },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 px-4 py-2 transition-all"
                  >
                    <tab.icon className="h-4 w-4 mr-1" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="streams" className="mt-4">
                <Card className="border-blue-100 border-t-4">
                  <CardContent>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold border-b pb-2 mb-4">
                        Streams
                      </h3>
                      {streams.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {streams.map((section) => (
                            <Card
                              key={section.title}
                              className="shadow-sm border hover:shadow-md transition"
                            >
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-center">
                                  <CardTitle className="text-base">
                                    {section.title}
                                  </CardTitle>
                                  <div className="flex gap-1">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7"
                                          >
                                            <Pencil className="h-3 w-3" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          Edit Section
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7"
                                          >
                                            <Trash2 className="h-3 w-3" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          Delete Section
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Users className="h-4 w-4" />
                                  {section._count.students} students
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center min-h-64">
                          <div className="flex flex-col items-center text-muted-foreground">
                            <Image
                              src="/empty.png"
                              alt="Empty"
                              width={128}
                              height={128}
                              className="mb-4"
                            />
                            <p>No Streams Available</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      ) : (
        <div className="min-h-96 flex items-center justify-center text-muted-foreground">
          <p>Select a class to see details.</p>
        </div>
      )}
    </div>
  );
}

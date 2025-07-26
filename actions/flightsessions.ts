"use server";

import { revalidatePath } from "next/cache";
import { api } from "./schools";
import axios from "axios";
import { CreateFlightSession } from "@/types/types";

export async function getFlightSessions(
  schoolId: string,
  filters?: {
    studentUserId?: string;     // New: Filter by student's userId
    teacherUserId?: string;     // New: Filter by teacher's userId
    studentId?: string;         // Keep original for backward compatibility
    teacherId?: string;         // Keep original for backward compatibility
    aircraftId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }
) {
  try {
    const query = new URLSearchParams();
    query.append("schoolId", schoolId);

    // Handle userId filtering (new approach)
    if (filters?.studentUserId) query.append("studentUserId", filters.studentUserId);
    if (filters?.teacherUserId) query.append("teacherUserId", filters.teacherUserId);
    
    // Handle direct ID filtering (backward compatibility)
    if (filters?.studentId) query.append("studentId", filters.studentId);
    if (filters?.teacherId) query.append("teacherId", filters.teacherId);
    
    if (filters?.aircraftId) query.append("aircraftId", filters.aircraftId);
    if (filters?.status) query.append("status", filters.status);
    if (filters?.startDate) query.append("startDate", filters.startDate);
    if (filters?.endDate) query.append("endDate", filters.endDate);
    if (filters?.page) query.append("page", filters.page.toString());
    if (filters?.limit) query.append("limit", filters.limit.toString());

    const response = await api.get(`/flight-sessions?${query.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching flight sessions:", error);
    return [];
  }
}
export async function createFlightSession(data: CreateFlightSession) {
  try {
    const response = await api.post("/flight-sessions", data);
    // revalidatePath("/dashboard/flights/sessions");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create flight session";
      throw new Error(message);
    }
    throw error;
  }
}

export async function updateFlightSession(id: string, data: CreateFlightSession) {
  try {
    const response = await api.put(`/flight-sessions/${id}`, data);
    revalidatePath("/dashboard/flights/sessions");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to update flight session";
      throw new Error(message);
    }
    throw error;
  }
}

export async function deleteFlightSession(id: string) {
  try {
    const response = await api.delete(`/flight-sessions/${id}`);
    revalidatePath("/dashboard/flights/sessions");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to delete flight session";
      throw new Error(message);
    }
    throw error;
  }
}


export async function getFlightSessionById(id: string) {
  try {
    const response = await api.get(`/flight-sessions/${id}`);
    return response.data as CreateFlightSession;
  } catch (error) {
    console.error("Error fetching flight session:", error);
    return null;
  }
}

export async function getFlightSessionsByStudentId(studentId: string) {
  try {
    const response = await api.get(`/flight-sessions/student/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching student flight sessions:", error);
    return [];
  }
}

export async function getFlightSessionsByTeacherId(teacherId: string) {
  try {
    const response = await api.get(`/flight-sessions/teacher/${teacherId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching teacher flight sessions:", error);
    return [];
  }
}
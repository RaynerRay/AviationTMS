"use server";

import { revalidatePath } from "next/cache";
import { api } from "./schools";
import axios from "axios";
import { CreateIncident, IncidentStatus, IncidentType } from "@/types/types";


export async function createIncident(data: CreateIncident) {
  try {
    const response = await api.post("/incidents", data);
    // revalidatePath("/dashboard/safety/incidents");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create incident";
      throw new Error(message);
    }
    throw error;
  }
}

export async function updateIncident(id: string, data: CreateIncident) {
  try {
    const response = await api.put(`/incidents/${id}`, data);
    // revalidatePath("/dashboard/safety/incidents");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to update incident";
      throw new Error(message);
    }
    throw error;
  }
}

export async function deleteIncident(id: string) {
  try {
    const response = await api.delete(`/incidents/${id}`);
    // revalidatePath("/dashboard/safety/incidents");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to delete incident";
      throw new Error(message);
    }
    throw error;
  }
}

export async function getIncidents(
  schoolId: string,
  filters?: {
    type?: IncidentType;
    status?: IncidentStatus;
    equipmentName?: string;
    reportedBy?: string;
  }
) {
  try {
    const params = new URLSearchParams({ schoolId });

    if (filters?.type) params.append("type", filters.type);
    if (filters?.status) params.append("status", filters.status);
    if (filters?.equipmentName) params.append("equipmentName", filters.equipmentName);
    if (filters?.reportedBy) params.append("reportedBy", filters.reportedBy);

    const response = await api.get(`/incidents?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return [];
  }
}

export async function getIncidentById(id: string) {
  try {
    const response = await api.get(`/incidents/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching incident:", error);
    return null;
  }
}

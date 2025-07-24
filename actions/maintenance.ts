"use server";

import { revalidatePath } from "next/cache";
import { api } from "./schools";
import axios from "axios";
import { CreateMaintenanceLogProps, MaintenanceLogModel } from "@/types/types";

// Create
export async function createMaintenanceLog(data: CreateMaintenanceLogProps) {
  try {
    console.log("📤 Sending maintenance log data:", data);
    const response = await api.post("/maintenance-logs", data);
    console.log("✅ Server response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ createMaintenanceLog error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
    });
    const msg = axios.isAxiosError(error)
      ? error.response?.data?.error || error.response?.data?.message || error.message
      : error.message;
    throw new Error(`Maintenance creation failed: ${msg}`);
  }
}

// Update
export async function updateMaintenanceLog(id: string, data: Partial<CreateMaintenanceLogProps>) {
  try {
    const response = await api.put(`/maintenance-logs/${id}`, data);
    revalidatePath("/dashboard/aircrafts");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to update maintenance log";
      throw new Error(message);
    }
    throw error;
  }
}

// Delete
export async function deleteMaintenanceLog(id: string) {
  try {
    const response = await api.delete(`/maintenance-logs/${id}`);
    revalidatePath("/dashboard/aircrafts");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to delete maintenance log";
      throw new Error(message);
    }
    throw error;
  }
}

// Get by aircraft ID
export async function getMaintenanceLogsByAircraft(aircraftId: string) {
  try {
    const response = await api.get(`/maintenance-logs/aircraft/${aircraftId}`);
    return response.data as MaintenanceLogModel[];
  } catch (error) {
    console.error("Error fetching maintenance logs:", error);
    return [];
  }
}

// Get single maintenance log
export async function getMaintenanceLogById(id: string) {
  try {
    const response = await api.get(`/maintenance-logs/${id}`);
    return response.data as MaintenanceLogModel;
  } catch (error) {
    console.error("Error fetching maintenance log:", error);
    return null;
  }
}

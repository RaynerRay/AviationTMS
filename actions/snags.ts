"use server";

import { revalidatePath } from "next/cache";
import { api } from "./schools";
import axios from "axios";
import { CreateSnag, Snag, SnagSeverity, SnagStatus } from "@/types/types";

export async function createSnag(data: CreateSnag) {
  try {
    const response = await api.post("/snags", data);
    revalidatePath("/portal/snags");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create snag";
      throw new Error(message);
    }
    throw error;
  }
}

export async function updateSnag(id: string, data: CreateSnag) {
  try {
    const response = await api.put(`/snags/${id}`, data);
    revalidatePath("/portal/snags");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to update snag";
      throw new Error(message);
    }
    throw error;
  }
}

export async function deleteSnag(id: string) {
  try {
    const response = await api.delete(`/snags/${id}`);
    revalidatePath("/portal/snags");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to delete snag";
      throw new Error(message);
    }
    throw error;
  }
}

interface SnagFilters {
  severity?: SnagSeverity;
  status?: SnagStatus;
  equipmentName?: string;
  reportedBy?: string;
}

export async function getSnags(schoolId: string, filters?: SnagFilters) {
  try {
    const params = new URLSearchParams();

    if (filters?.severity) params.append("severity", filters.severity);
    if (filters?.status) params.append("status", filters.status);
    if (filters?.equipmentName) params.append("equipmentName", filters.equipmentName);
    if (filters?.reportedBy) params.append("reportedBy", filters.reportedBy);

    const url = `/snags/school/${schoolId}?${params.toString()}`;
    const response = await api.get(url);
    return response.data as Snag[];
  } catch (error) {
    console.error("Error fetching snags:", error);
    return [];
  }
}

export async function getSnagById(id: string) {
  try {
    const response = await api.get(`/snags/${id}`);
    return response.data as Snag;
  } catch (error) {
    console.error("Error fetching snag:", error);
    return null;
  }
}

"use server";

import { revalidatePath } from "next/cache";
import { api } from "./schools";
import axios from "axios";
import { AircraftType, AircraftStatus, AircraftProps, AircraftModel } from "@/types/types";

export async function createAircraft(data: AircraftProps) {
  try {
    const response = await api.post("/aircrafts", data);
    revalidatePath("/dashboard/operations/aircrafts");
    return response.data;
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to create aircraft";
      throw new Error(message);
    }
    throw error;
  }
}

export async function updateAircraft(id: string, data: AircraftProps) {
  try {
    const response = await api.put(`/aircrafts/${id}`, data);
    revalidatePath("/dashboard/aircrafts");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to update aircraft";
      throw new Error(message);
    }
    throw error;
  }
}

export async function deleteAircraft(id: string) {
  try {
    const response = await api.delete(`/aircrafts/${id}`);
    revalidatePath("/dashboard/aircrafts");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to delete aircraft";
      throw new Error(message);
    }
    throw error;
  }
}


export async function getAircrafts(schoolId: string) {
  try {
    const response = await api.get(`/aircrafts/school/${schoolId}`);
    return response.data as AircraftModel[];
  } catch (error) {
    console.error("Error fetching aircrafts:", error);
    return [];
  }
}


export async function getAllBriefAircrafts(schoolId: string) {
  try {
    const response = await api.get(`/aircrafts/school/brief/${schoolId}`);
    const aircrafts = response.data;
    return aircrafts as {
      id: string;
      tailNumber: string;
      make: string;
      model: string;
      status: AircraftStatus;
    }[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getAircraftById(aircraftId: string) {
  try {
    const response = await api.get(`/aircrafts/${aircraftId}`);
    const aircraft = response.data;
    return aircraft as AircraftProps;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAircraftsByStatus(
  schoolId: string,
  status: AircraftStatus
) {
  try {
    const response = await api.get(
      `/aircrafts/school/${schoolId}/status/${status}`
    );
    const aircrafts = response.data;
    return aircrafts as AircraftProps[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getAircraftsByType(
  schoolId: string,
  aircraftType: AircraftType
) {
  try {
    const response = await api.get(
      `/aircrafts/school/${schoolId}/type/${aircraftType}`
    );
    const aircrafts = response.data;
    return aircrafts as AircraftProps[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getAvailableAircrafts(schoolId: string) {
  try {
    const response = await api.get(`/aircrafts/school/${schoolId}/available`);
    const aircrafts = response.data;
    return aircrafts as AircraftProps[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function updateAircraftHours(
  aircraftId: string,
  data: {
    engineHours: number;
    airframeHours: number;
  }
) {
  try {
    const response = await api.patch(`/aircrafts/${aircraftId}/hours`, data);
    revalidatePath("/dashboard/aircrafts");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to update aircraft hours";
      throw new Error(message);
    }
    throw error;
  }
}

export async function updateAircraftStatus(
  aircraftId: string,
  status: AircraftStatus
) {
  try {
    const response = await api.patch(`/aircrafts/${aircraftId}/status`, {
      status,
    });
    revalidatePath("/dashboard/aircrafts");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to update aircraft status";
      throw new Error(message);
    }
    throw error;
  }
}

export async function getAircraftMaintenanceSchedule(schoolId: string) {
  try {
    const response = await api.get(`/aircrafts/school/${schoolId}/maintenance`);
    const schedule = response.data;
    return schedule as {
      id: string;
      tailNumber: string;
      make: string;
      model: string;
      lastInspection: string;
      nextInspection: string;
      engineHours: number;
      airframeHours: number;
      status: AircraftStatus;
    }[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
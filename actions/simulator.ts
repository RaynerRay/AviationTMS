"use server";

import { revalidatePath } from "next/cache";
import { api } from "./schools";
import axios from "axios";
import { SimulatorType, SimulatorStatus, CreateSimulatorProps, SimulatorModel } from "@/types/types";

export async function createSimulator(data: CreateSimulatorProps) {
  try {
    const response = await api.post("/simulators", data);
    revalidatePath("/dashboard/simulators");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to create simulator";
      throw new Error(message);
    }
    throw error;
  }
}

export async function updateSimulator(id: string, data: CreateSimulatorProps) {
  try {
    const response = await api.put(`/simulators/${id}`, data);
    revalidatePath("/dashboard/simulators");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to update simulator";
      throw new Error(message);
    }
    throw error;
  }
}

export async function deleteSimulator(id: string) {
  try {
    const response = await api.delete(`/simulators/${id}`);
    revalidatePath("/dashboard/simulators");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to delete simulator";
      throw new Error(message);
    }
    throw error;
  }
}

export async function getSimulators(schoolId: string) {
  try {
    const response = await api.get(`/simulators/school/${schoolId}`);
    return response.data as SimulatorModel[];
  } catch (error) {
    console.error("Error fetching simulators:", error);
    return [];
  }
}

export async function getAllBriefSimulators(schoolId: string) {
  try {
    const response = await api.get(`/simulators/school/brief/${schoolId}`);
    const simulators = response.data;
    return simulators as {
      id: string;
      name: string;
      model: string;
      simulatorType: SimulatorType;
      status: SimulatorStatus;
    }[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getSimulatorById(simulatorId: string) {
  try {
    const response = await api.get(`/simulators/${simulatorId}`);
    const simulator = response.data;
    return simulator as SimulatorModel;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getSimulatorsByStatus(
  schoolId: string,
  status: SimulatorStatus
) {
  try {
    const response = await api.get(
      `/simulators/school/${schoolId}/status/${status}`
    );
    const simulators = response.data;
    return simulators as SimulatorModel[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getSimulatorsByType(
  schoolId: string,
  simulatorType: SimulatorType
) {
  try {
    const response = await api.get(
      `/simulators/school/${schoolId}/type/${simulatorType}`
    );
    const simulators = response.data;
    return simulators as SimulatorModel[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getAvailableSimulators(schoolId: string) {
  try {
    const response = await api.get(`/simulators/school/${schoolId}/available`);
    const simulators = response.data;
    return simulators as SimulatorModel[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function updateSimulatorStatus(
  simulatorId: string,
  status: SimulatorStatus
) {
  try {
    const response = await api.patch(`/simulators/${simulatorId}/status`, {
      status,
    });
    revalidatePath("/dashboard/simulators");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to update simulator status";
      throw new Error(message);
    }
    throw error;
  }
}

export async function updateSimulatorHourlyRate(
  simulatorId: string,
  hourlyRate: number
) {
  try {
    const response = await api.patch(`/simulators/${simulatorId}/rate`, {
      hourlyRate,
    });
    revalidatePath("/dashboard/simulators");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to update simulator hourly rate";
      throw new Error(message);
    }
    throw error;
  }
}

export async function getSimulatorMaintenanceSchedule(schoolId: string) {
  try {
    const response = await api.get(`/simulators/school/${schoolId}/maintenance`);
    const schedule = response.data;
    return schedule as {
      id: string;
      name: string;
      model: string;
      simulatorType: SimulatorType;
      lastMaintenance: string | null;
      nextMaintenance: string | null;
      status: SimulatorStatus;
      location: string | null;
    }[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getSimulatorUsageStats(schoolId: string) {
  try {
    const response = await api.get(`/simulators/school/${schoolId}/usage`);
    const stats = response.data;
    return stats as {
      id: string;
      name: string;
      model: string;
      totalHours: number;
      utilizationRate: number;
      revenue: number;
      status: SimulatorStatus;
    }[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function scheduleSimulatorMaintenance(
  simulatorId: string,
  maintenanceDate: Date
) {
  try {
    const response = await api.patch(`/simulators/${simulatorId}/maintenance`, {
      nextMaintenance: maintenanceDate,
    });
    revalidatePath("/dashboard/simulators");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to schedule simulator maintenance";
      throw new Error(message);
    }
    throw error;
  }
}

export async function completeSimulatorMaintenance(simulatorId: string) {
  try {
    const response = await api.patch(`/simulators/${simulatorId}/maintenance/complete`, {
      lastMaintenance: new Date(),
      status: "AVAILABLE"
    });
    revalidatePath("/dashboard/simulators");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to complete simulator maintenance";
      throw new Error(message);
    }
    throw error;
  }
}
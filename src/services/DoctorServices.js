import { api } from "./api";
export async function createPrescription (data, id) {
    try {
        const response = await api.post(`/prescriptions/${id}`, data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        }
    }
}

export async function getDoctorQueue() {
  try {
    const response = await api.get("/doctor/queue");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { error: "Failed to fetch doctor queue." };
  }
}

export async function createReport(data, appointmentId) {
  try {
    const response = await api.post(`/reports/${appointmentId}`, data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { error: "Failed to create report." };
  }
}

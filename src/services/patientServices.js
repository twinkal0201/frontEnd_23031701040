import { api } from './api';

export async function bookAppointments(userData) {
    try {
        const response = await api.post("/appointments", userData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        }
        return { error: "Failed to book appointments." };
    }
};



export async function getmyAppointments() {
    const response = await api.get(`/appointments/my`);
    console.log(response.data);
    return response.data;
}


export async function getMyprescriptions() {
    try {
        const response = await api.get(`/prescriptions/my`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        }
        return { error: "Failed to fetch prescriptions." };
    }
}

export async function getMyReports() {
    try {
        const response = await api.get(`/reports/my`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        }
        return { error: "Failed to fetch reports." };
    }
}


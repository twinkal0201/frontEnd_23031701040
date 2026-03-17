import { api } from './api';

export async function createUser (userData) {
    try {
        const response = await api.post("/admin/users", userData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        }
        return { error: "Failed to create user." };
    }
};

export async function getAllUsers(){
    const response= await api.get("/admin/users");
    return response.data;
}

export async function getAllClinic(){
    const response= await api.get("/admin/clinic");
    console.log(response.data);
    return response.data;
}


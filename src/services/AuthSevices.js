import { api } from './api';

const LoginService = async (data) => {


    try {
        const response = await api.post("/auth/login", data);
        console.log("response", response.data);
        if (!response.data.error) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
        };

        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        }
        return { error: "An unexpected error occurred." };
    }
}

export default LoginService;

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export const getUserData = () => {
    return JSON.parse(localStorage.getItem("user"));
}

export const getToken = () => {
    return localStorage.getItem("token");
}
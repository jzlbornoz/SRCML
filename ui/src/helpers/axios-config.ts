import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_ENVIRONMENT_VARIABLE,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420'
    }
});
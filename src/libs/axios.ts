import axios from 'axios';
import { cookies } from 'next/headers';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
    const token = (await cookies()).get('token')?.value;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

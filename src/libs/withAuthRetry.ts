// libs/withAuthRetry.ts
import { ErrorCustom } from '@/types/error';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export async function withAuthRetry<T>(
    requestFn: (config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
    try {
        // Gọi API lần đầu
        return await requestFn(config);
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError?.response?.status === 401) {
            try {
                await axios.post(`/api/auth/refresh`, {
                    credentials: 'include',
                });
                // Sau khi refresh, gọi lại request gốc
                return await requestFn(config);
            } catch (refreshError) {
                const refreshErrorAxios = refreshError as AxiosError;
                console.error('❌ Refresh token failed:', refreshErrorAxios);
                throw { message: 'Refresh token failed', errorCode: 403 } as unknown as ErrorCustom;
            }
        }
        throw {message: 'Something went wrong', errorCode: 403} as unknown as ErrorCustom;
    }
}

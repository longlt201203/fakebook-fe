import axios, { AxiosRequestConfig } from "axios";

export class AxiosService {
    constructor(
        private readonly baseUrl: string
    ) {}

    async get<T = any>(path: string, config?: AxiosRequestConfig<any>) {
        const res = await axios.get<T>(this.baseUrl+path, config);
        return res.data;
    }

    async post<T = any>(path: string, data?: any, config?: AxiosRequestConfig<any>) {
        const res = await axios.post<T>(this.baseUrl+path, data, config);
        return res.data;
    }

    async put<T = any>(path: string, data?: any, config?: AxiosRequestConfig<any>) {
        const res = await axios.put<T>(this.baseUrl+path, data, config);
        return res.data;
    }
}
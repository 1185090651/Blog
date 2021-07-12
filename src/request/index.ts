import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from "axios";
import qs from "qs";

const service: AxiosInstance = axios.create({
    baseURL: window.location.origin,
    paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: "repeat" });
    },
    timeout: 50000,
});

service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (res: AxiosResponse) => {
        if (res.status > 299) {
            throw res
        }
        return res.data
    },
    (error: AxiosError) => {
        return Promise.reject(error.message)
    }
);

export default service


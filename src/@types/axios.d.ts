import * as axios from 'axios';

declare module 'axios' {
  interface AxiosInstance {
    (config: axios.AxiosRequestConfig): Promise<any>
  }
}
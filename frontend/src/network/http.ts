import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import ErrorStore from "@/store/modules/error";

axios.create({});
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const message = error.message || "has error";
    ErrorStore.fetchErrorMessage(message);
    return Promise.reject(error);
  }
);

export default class HttpClient {
  constructor(private baseURL: string) {
    this.baseURL = baseURL;
  }

  get _baseURL() {
    return this.baseURL;
  }

  async fetch<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await axios({
      method: options?.method,
      url: `${this._baseURL}${url}`,
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    return response.data;
  }
}

import axios from "axios";
import { API_CONFIG, HTTP_STATUS, ERROR_MESSAGES } from "./constants";

export  class AxiosConfig {
    constructor() {
        this.instance = axios.create({
            baseURL : API_CONFIG.BASE_URL,
            timeout : API_CONFIG.TIMEOUT,
            headers : {
                "Content-Type" : 'application/json',
            },
        });

        this.getTokenFunction = null;
        this.setupInterceptors();
    }

    setTokenGetter(getTokenFn) {
        if (typeof getTokenFn !== 'function') {
            throw new Error("token must be a function");
        } 
        this.getTokenFunction = getTokenFn;
    }


    setupInterceptors() {
        this.instance.interceptors.request.use(
            async (config) => {
                try {
                    if(this.getTokenFunction) {
                        const token = await this.getTokenFunction();
                        if(token) {
                            config.headers.Authorization = `Bearer ${token}`;
                        }
                    }
                    return config;
                } catch (error) {
                    return Promise.reject(error);
                }
            },
            (error) => {
                return Promise.reject(error);
            }
        );





        this.instance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.response) {
                    this.handleErrorByStatus(error.response.status);
                }
                return Promise.reject(error);
            }
        );
    }



    handleErrorByStatus(status) {
        switch (status) {
            case HTTP_STATUS.UNAUTHORIZED:
                break;
            case HTTP_STATUS.FORBIDDEN:
                break;
            case HTTP_STATUS.NOT_FOUND:
                break;
            case HTTP_STATUS.TOO_MANY_REQUESTS:
                break;
            case HTTP_STATUS.INTERNAL_SERVER_ERROR:
                break;
            case HTTP_STATUS.BAD_GATEWAY:
                break;
            case HTTP_STATUS.SERVICE_UNAVAILABLE:
                break;
            case HTTP_STATUS.GATEWAY_TIMEOUT:
                break;
            default:
                break;
        }
    }

    getInstance() {
        return this.instance;
    }

    isConfigured() {
        return this.getTokenFunction !== null;
    }
}

const axiosConfig = new AxiosConfig();

export default axiosConfig;

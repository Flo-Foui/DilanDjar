import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = false;

// Hook perso pour utiliser le contexte
export const useAuth = () => {
    return useContext(AuthContext);
};

/*axios.interceptors.request.use(
    (config) => {
        const token = useAuth()?.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);*/

axios.interceptors.response.use(
    (response) => {
        console.log("interceptor response", response);
        return response;
    },
    (error) => {
        const {status} = error.response;
        console.log("interceptor error", error.response.status);
        console.log("interceptor status", status);
        switch (status) {
            case 400:
                console.log("ERROR 400");
                break;
            case 401:
                console.log("ERROR 401");
                console.log(Promise.reject(error?.response ?? error));
                return Promise.reject(error?.response ?? error);
            case 403:
                console.log("ERROR 403");
                break;
            case 404:
                console.log("ERROR 404");
                break
            case 500:
                console.log("ERROR 500");
                break;
            default:
                break;
        }
    }
);

export const get = async (url: string, config?: {}) => {
    try {
        const response = await axios.get(url, config);
        console.log("Response", response);
        return response.data;
    } catch (error) {
        console.error(error);
    }}

export const post = async (url: string, data: {}, config?: {}) => {
    try {
        const response = await axios.post(url, data, config);
        console.log("Response", response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const put = async (url: string, data: {}, config?: {}) => {
    try {
        const response = await axios.post(url, data, config);
        console.log("Response", response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const del = async (url: string, config?: {}) => {
    try {
        const response = await axios.post(url, config);
        console.log("Response", response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

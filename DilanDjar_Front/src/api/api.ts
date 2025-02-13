import axios from "axios";

axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = false;

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

export const get = (url: string, config?: {}) => {
    return axios.get(url, config)
        .then((response) => {
            console.log("response", response);
            return response.data;
        })
        .catch((error) => {
        })

}
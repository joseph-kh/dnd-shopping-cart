import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";

// Should be in an env variable
const baseURL = `http://localhost:7000/api`;

// SWR hooks
// Seperate interceptor for SWR HOOKS, to show different type of errors on GET requests
const swrAxios = axios.create({ baseURL });
swrAxios.defaults.headers.post["Accept"] = "application/json";
swrAxios.interceptors.request.use(async (config) => config);

swrAxios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// Non SWR hooks Api requests
const instance = axios.create({ baseURL });
instance.defaults.headers.post["Accept"] = "application/json";
instance.interceptors.request.use(async (config) => config);

type Props = {
  children: any;
};

// Create an axios interceptor and make it as a react wrapper provider
// This method will help using hooks and states inside it if needed
const AxiosProvider: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    const responseInterceptor = (response: AxiosResponse) => response;

    const errorInterceptor = (error: AxiosError) => {
      Swal.fire({
        title: "Error!",
        text: "Do you want to continue",
        icon: "error",
        confirmButtonText: "Ok",
      });

      return Promise.reject(error);
    };

    const interceptor = instance.interceptors.response.use(
      responseInterceptor,
      errorInterceptor
    );

    return () => instance.interceptors.response.eject(interceptor);
  }, []);

  return children;
};

export default instance;

export { AxiosProvider, swrAxios };

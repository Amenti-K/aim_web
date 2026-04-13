import axios from "axios";
import { logout, updateAccessToken } from "@/redux/slices/authSlice";
import store from "@/redux/store";

export const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const { accessToken, company } = state.userAuth;

    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    if (company?.id && !config.url?.includes("/auth/")) {
      config.headers["x-company-id"] = company.id;
    }
    // console.log(
    //   "➡️ [REQUEST]",
    //   config.method?.toUpperCase(),
    //   config.url,
    //   config.headers,
    // );
    return config;
  },
  (error) => Promise.reject(error),
);

AxiosInstance.interceptors.request.use((config) => {
  if (
    config.data instanceof FormData &&
    config.headers &&
    !config.headers["Content-Type"]
  ) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  return config;
});

AxiosInstance.interceptors.response.use(
  (res) => {
    // console.log("✅ [RESPONSE]", res.data);
    return res;
  },
  async (error) => {
    // console.log(
    //   "❌ [RESPONSE ERROR]",
    //   error.response?.status,
    //   error.response?.data,
    // );

    // if (error.response?.status === 503) {
    //   console.log("Maintenance mode enabled");
    //   store.dispatch(setMaintenanceMode(true));
    //   store.dispatch(logout());
    //   return Promise.reject(error);
    // }

    const originalRequest = error.config;
    const state = store.getState();

    // if (error.response?.status === 403) {
    //   console.log("Refresh failed, forcing logout");
    //   store.dispatch(logout());
    //   return Promise.reject(error);
    // }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refreshToken, company } = state.userAuth;
      if (refreshToken) {
        try {
          const res = await axios.post(
            `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`,
            { refreshToken },
            { headers: { "x-company-id": company?.id } },
          );

          const newAccessToken = res.data.accessToken;
          store.dispatch(updateAccessToken(newAccessToken));

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return AxiosInstance(originalRequest);
        } catch (refreshError) {
          // console.log("Refresh failed, forcing logout");
          store.dispatch(logout());
        }
      } else {
        // console.log("No refresh token, forcing logout");
        store.dispatch(logout());
      }
    }

    return Promise.reject(error);
  },
);

export default AxiosInstance;


import axiosInstance from "./axiosInstance";

export const getUsersAPI = () => axiosInstance.get("/users");

export const signupAPI = (data) => axiosInstance.post("/api/auth/signup", data);

export const loginAPI = (data) => axiosInstance.post("/api/auth/login", data);

export const logoutAPI = (refreshToken) =>
  axiosInstance.post("/api/auth/logout", { refreshToken });

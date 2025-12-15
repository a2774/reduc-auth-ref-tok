import axiosClient from "../../api/axiosClient";

export const signupAPI = (data) => axiosClient.post("/api/auth/signup", data);

export const loginAPI = (data) => axiosClient.post("/api/auth/login", data);

export const logoutAPI = (refreshToken) =>
  axiosClient.post("/api/auth/logout", { refreshToken });

export const getMeAPI = () => axiosClient.get("/api/auth/me");


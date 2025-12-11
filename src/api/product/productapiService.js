import productInstance from "./productInstance";

export const getUsersAPI = () => productInstance.get("/users");

export const logoutAPI = (refreshToken) =>
  axiosInstance.post("/api/auth/logout", { refreshToken });

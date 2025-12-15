import axios from "axios";

const dummyClient = axios.create({
    baseURL: import.meta.env.VITE_DUMMY_API || "https://dummyjson.com",
});

export const getProductsAPI = () => dummyClient.get("/products");

export const getUsersAPI = () => dummyClient.get("/users");

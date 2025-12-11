
import axios from "axios";

const productInstance = axios.create({
  baseURL: import.meta.env.VITE_DUMMY_API,
});

export default productInstance;

import axios from 'axios';
import { logout, setTokens } from '../features/auth/authSlice';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setupAxiosInterceptors = (store) => {

    axiosClient.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );


    axiosClient.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;


            if (error.response?.status === 401 && !originalRequest._retry) {
                console.log("Access Token Expired. Attempting Refresh...");
                originalRequest._retry = true;

                try {
                    const refreshToken = localStorage.getItem('refreshToken');

                    if (!refreshToken) {
                        throw new Error('No refresh token available');
                    }

                    console.log("Refreshing Token...", refreshToken);

                    const response = await axios.post(
                        `${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}/api/auth/refresh`,
                        { refreshToken }
                    );

                    console.log("Token Refreshed Successfully!");

                    const { accessToken, refreshToken: newRefreshToken } = response.data.tokens;


                    localStorage.setItem('accessToken', accessToken);
                    if (newRefreshToken) {
                        localStorage.setItem('refreshToken', newRefreshToken);
                    }


                    store.dispatch(setTokens({ accessToken, refreshToken: newRefreshToken || refreshToken }));


                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return axiosClient(originalRequest);

                } catch (refreshError) {

                    store.dispatch(logout());
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );
};

export default axiosClient;

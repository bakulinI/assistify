import {  User } from '@/common/types';
import { AccesTokenResponse, SignInParams, SignUpParams } from '@/types';
import axios from 'axios';

// const apiUrl = 'http://localhost:8000/api/';
const apiUrl = import.meta.env.VITE_API;
export const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.get(`${apiUrl}token/refresh/`, { withCredentials: true });
        localStorage.setItem('token', response.data['access_token']);
        return await axiosInstance.request(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }
  },
);

class Api {
  async signIn(data: SignInParams) {
    return axiosInstance.post<AccesTokenResponse>(`${apiUrl}signin/`, data);
  }

  async signUp(data: SignUpParams) {
    return axiosInstance.post<AccesTokenResponse>(`${apiUrl}signup/`, data);
  }

  async refreshToken() {
    return axios.get<AccesTokenResponse>(`${apiUrl}token/refresh/`, { withCredentials: true });
  }

  async logout() {
    return axiosInstance.post('logout/');
  }
  async getMe() {
    return axiosInstance.get<User>('users/me/');
  }

}


export const api = new Api();


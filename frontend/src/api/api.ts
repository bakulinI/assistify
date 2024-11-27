import { User } from '@/common/types';
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

export const fetchChatStream = async (params) => {
  try {
    const { userInput, streamMessage, endStreamMessage } = params;

    // // URL API

    //  const url = `http://127.0.0.1:8000/chat/?message=${encodeURIComponent(userInput)}`;
    const response = await fetch(`${apiUrl}chat/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch stream');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let text = '';
    let offset = 0;

    // Чтение потока данных
    while (true) {
      const { done, value } = await reader.read();
      if (done) break; // Завершаем цикл, если данные закончились

      const chunkText = decoder.decode(value, { stream: true });
      text += chunkText;

      // Передаем данные по мере их поступления
      for (let i = offset; i < text.length; i++) {
        await streamMessage(text.slice(0, i + 1)); // Печатаем по одному символу
        await new Promise((resolve) => setTimeout(resolve, 30)); // Эффект "печатания"
      }

      offset = text.length; // Обновляем смещение для корректного отслеживания части текста
    }

    // Отправляем весь накопленный текст
    await streamMessage(text);

    // Уведомляем, что поток завершен
    await endStreamMessage();
  } catch (error) {
    console.error('Stream error:', error);
    await params.streamMessage('Error fetching the chat stream.');
  }
};

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // رابط سيرفر NestJS Backend
});

// إرسال الـ JWT Token تلقائياً في الـ Headers مع كل طلب محمي
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
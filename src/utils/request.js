import axios from 'axios';
import { useUserStore } from '@/stores/user.js';
import { ElMessage } from 'element-plus';
// import { ElMessage } from 'element-plus';
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
});

//请求拦截器
request.interceptors.request.use(
  (request) => {
    const userStore = useUserStore();
    if (userStore.getToken()) {
      request.headers.Authorization = `Bearer ${userStore.token}`;
    }
    return request;
  },
  (error) => {
    ElMessage.error(`请求发送失败 ${error.message}`);
    return Promise.reject(error);
  },
);
//
//相应拦截器
request.interceptors.response.use((response) => {
  const { status, statusText, data } = response;
  //如果http状态码为4或5,说明请http求失败
  if (status / 100 === 4 || status / 100 === 5) {
    ElMessage.error(`${status}:${statusText}`);
  }
  return data;
});

export default request;

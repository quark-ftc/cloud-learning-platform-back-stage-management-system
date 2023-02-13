import axios from 'axios';
// import { ElMessage } from 'element-plus';
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
});

//相应拦截器
request.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data;
    if (success) {
      return data;
    } else {
      //! 在配置按需导入之后，ELMessage不需要import,import之后会缺失样式。
      ElMessage.error(message);
      return Promise.reject(new Error(message));
    }
  },
  (error) => {
    ElMessage.error(error.message);
    return Promise.reject(error);
  },
);

export default request;

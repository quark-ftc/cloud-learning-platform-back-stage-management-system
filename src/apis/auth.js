import request from '@/utils/request.js';
const URL = '/auth/';
//注册
export const register = (registerInfo) => {
  return request.post(URL + 'register', registerInfo);
};
//登陆
export const login = (loginInfo) => {
  return request.post(URL + 'login', loginInfo);
};

//获取用户信息
export const getOne = () => {
  return request.get(url);
};

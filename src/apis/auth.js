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
export const requestUserInfo = () => {
  return request.get(URL + 'user_info');
};

//获取角色列表
export const requestRoles = () => {
  return request.get(URL + 'get_roles');
};

//获取菜单
export const requestMenu = () => {
  return request.get(URL + 'get_menu');
};

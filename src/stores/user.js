import { defineStore } from 'pinia';
import { setItem, getItem } from '@/utils/localStorage.js';
import { login, register, getOne } from '@/apis';
import md5 from 'md5';
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getItem('token') ?? '',
      useInfo: {},
    };
  },
  actions: {
    setToken(token) {
      this.token = token;
      setItem('token', token);
    },
    getToken() {
      return this.token;
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    getUserInfo() {
      return this.useInfo;
    },
    userLogin(loginForm) {
      const loginInfo = {
        username: loginForm.username,
        password: md5(loginForm.password),
      };
      return new Promise((resolve, reject) => {
        login(loginInfo).then((responseData) => {
          if (responseData.status === 'success') {
            this.setToken(responseData.data.token);
            console.log(responseData.data.token);
            resolve(responseData.message);
          }
          reject(new Error(responseData.message));
        });
      });
    },
    userRegister(registerForm) {
      const registerInfo = {
        username: registerForm.username,
        password: md5(registerForm.password),
        role: registerForm.role,
        adminSecretKey: registerForm.adminSecretKey,
      };
      return new Promise((resolve, reject) => {
        register(registerInfo).then((responseData) => {
          const { status, message } = responseData;
          if (status === 'success') {
            resolve(message);
          }
          reject(new Error(message));
        });
      });
      // return register(registerInfo);
    },
    requestUserInfo() {
      return new Promise((resolve, reject) => {
        getOne()
          .then((responseData) => {
            this.setUserInfo(responseData);
            resolve(responseData);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});

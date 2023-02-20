import { defineStore } from 'pinia';
import { setItem, getItem } from '@/utils/localStorage.js';
import {
  login,
  register,
  requestRoles,
  requestUserInfo,
  requestMenus,
} from '@/apis';
import md5 from 'md5';
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getItem('token') ?? '',
      userInfo: {},
      menus: {},
      roles: [],
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
    // setUserInfo(userInfo) {
    //   console.log(userInfo);
    //   this.userInfo = userInfo;
    // },
    // getUserInfo() {
    //   return this.userInfo;
    // },
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
    },
    getUserInfo() {
      return new Promise((resolve, reject) => {
        requestUserInfo()
          .then((responseData) => {
            const { status, message, data } = responseData;
            if (status === 'success') {
              this.userInfo = data.userInfo;
              resolve();
            }
            reject(new Error(message));
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getRoles() {
      return new Promise((resolve, reject) => {
        requestRoles().then((responseData) => {
          const { status, message, data } = responseData;
          if (status === 'success') {
            this.roles = data.roles;
            resolve();
          }
          reject(new Error(message));
        });
      });
    },
    getMenus() {
      return new Promise((resolve, reject) => {
        requestMenus()
          .then((responseData) => {
            const { status, message, data } = responseData;
            if (status === 'success') {
              this.menus = data.menus;
              resolve(data.menus);
            }
            reject(new Error(message));
          })
          .catch((error) => {
            reject(error.message);
          });
      });
    },
  },
});

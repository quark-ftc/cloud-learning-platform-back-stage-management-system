import { defineStore } from 'pinia';
import { setItem, getItem } from '@/utils/localStorage.js';
import { postSession, postUser } from '@/apis';
import md5 from 'md5';
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getItem('token') ?? '',
    };
  },
  actions: {
    setToken(token) {
      this.token = token;
      setItem('token', token);
    },
    login(loginForm) {
      const loginInfo = {
        username: loginForm.username,
        password: md5(loginForm.password),
      };
      return new Promise((resolve, reject) => {
        postSession(loginInfo)
          .then((responseData) => {
            // console.log(data);
            this.setToken(responseData.token);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    register(registerForm) {
      const registerInfo = {
        username: registerForm.username,
        password: md5(registerForm.password),
        role: registerForm.role,
        adminSecretKey: registerForm.adminSecretKey,
      };
      return new Promise((resolve, reject) => {
        postUser(registerInfo)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});

import request from '@/utils/request.js';

const url = '/session';

// 登陆
export const postSession = (data) => {
  return request.post(url, data);
};

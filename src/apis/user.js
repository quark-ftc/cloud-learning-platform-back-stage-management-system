import request from '@/utils/request.js';

const url = '/user';

// 注册
export const postUser = (data) => {
  return request.post(url, data);
};

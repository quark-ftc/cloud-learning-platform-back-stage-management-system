/**
 * 存储数据
 */

export const setItem = (key, value) => {
  if (typeof item === 'object') {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
};

/**
 * 获取数据
 */

export const getItem = (key) => {
  const value = window.localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

/**
 * 删除数据
 */
export const removeItem = (key) => {
  window.localStorage.removeItem(key);
};

/**
 * 删除所有数据
 */

export const removeAllItem = () => {
  window.localStorage.clear();
};

export const validateTwicePasswordSame = (password) => {
  return (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请在此输入密码'));
    } else if (value !== password) {
      callback('两次密码不一致');
    } else {
      callback();
    }
  };
};

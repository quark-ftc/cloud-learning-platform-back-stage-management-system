export const validateUsername = () => {
  return (rule, value, callback) => {
    const usernameLength = 6;
    if (value === '') {
      callback(new Error('请输入用户名'));
    } else if (value.length < usernameLength) {
      callback(new Error(`用户名应不少于${usernameLength}位`));
    } else {
      callback();
    }
  };
};

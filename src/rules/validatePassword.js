export const validatePassword = () => {
  return (rule, value, callback) => {
    const passwordLength = 6;
    if (value === '') {
      callback(new Error('请输入密码！'));
    } else if (value.length < passwordLength) {
      callback(new Error(`密码应该至少为 ${passwordLength}位！`));
    } else {
      callback();
    }
  };
};

<script setup>
  import { Avatar, Key } from '@element-plus/icons-vue';
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/stores/user.js';

  import {
    // validateTwicePasswordSame
    validatePassword,
    validateUsername,
  } from '../rules';

  const router = useRouter();
  const userStore = useUserStore();

  const props = defineProps({
    formWidth: {
      type: String,
      default: '400px',
    },
    formPadding: {
      type: String,
      default: '20px',
    },
    formBackgroundColor: {
      type: String,
      default: '#a6a9ad',
    },
    formBorderRadius: {
      type: String,
      default: '30px',
    },
  });
  const registerForm = ref({
    username: '',
    password: '',
    role: '',
    confirmPassword: '',
    adminSecretKey: '',
  });

  const rolesList = userStore.roles;

  //侦听器的写法

  // watch(
  //   () => router.currentRoute.value.path,
  //   async (newPath) => {
  //     // ElMessage.error(newPath);
  //     console.log(newPath);
  //     if (newPath === '/register') {
  //       userStore
  //         .getRoles()
  //         .then((roles) => {
  //           rolesList.value = roles;
  //           console.log(rolesList.value);
  //         })
  //         .catch((error) => {
  //           ElMessage.error(error.message);
  //         });
  //     }
  //   },
  //   { immediate: true, deep: true },
  // );

  //TODO 使用 /src/rules/validateTwicePasswordSame代替,此处定于的validateTwicePasswordSame
  /**
   * 将验证规则直接定义在之处并不优雅，
   * 但是在使用/src/rules/validateTwicePasswordSame(registerForm.value.password)时，
   * 传入的registerForm.value.password永远是定义ref的初始值(空串)
   */

  const validateTwicePasswordSame = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请在此输入密码'));
    } else if (value !== registerForm.value.password) {
      callback('两次密码不一致');
    } else {
      callback();
    }
  };

  const rules = ref({
    username: [{ validator: validateUsername(), trigger: 'blur' }],
    password: [{ validator: validatePassword(), trigger: 'blur' }],
    confirmPassword: [
      {
        validator: validateTwicePasswordSame,
        trigger: 'blur',
      },
    ],
  });

  //注册
  const buttonLoading = ref(false);
  const registerFormRef = ref(null);
  const handleRegisterButtonClick = () => {
    registerFormRef.value.validate((isValid) => {
      if (!isValid) {
        return;
      }
      buttonLoading.value = true;
      userStore
        .userRegister(registerForm.value)
        .then((message) => {
          router.push('/login');
          ElMessage.success(message);
        })
        .catch((error) => {
          ElMessage.error(error.message);
        })
        .finally(() => {
          buttonLoading.value = false;
        });
    });
  };
</script>

<template>
  <div class="register-form-container">
    <el-form
      status-icon
      :model="registerForm"
      :rules="rules"
      ref="registerFormRef">
      <el-form-item prop="username">
        <el-input
          placeholder="请输入手机号码"
          v-model="registerForm.username"
          name="username"
          :prefix-icon="Avatar" />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          placeholder="请输入密码"
          v-model="registerForm.password"
          :prefix-icon="Key"
          show-password />
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input
          placeholder="请确认密码"
          v-model="registerForm.confirmPassword"
          :prefix-icon="Key"
          show-password />
      </el-form-item>
      <el-form-item>
        <el-select v-model="registerForm.role" placeholder="请选择角色">
          <el-option
            v-model="registerForm.role"
            v-for="(item, index) of rolesList"
            :value="item"
            :label="item"
            :key="index" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="registerForm.adminSecretKey"
          v-if="registerForm.role === '管理员'"
          placeholder="请输入管理员口令"
          :prefix-icon="Key" />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          class="register-button"
          @click="handleRegisterButtonClick"
          :loading="buttonLoading"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
    <!-- TODO 测试数据，待删除-->
    <!-- test -->
    <div>username: {{ registerForm.username }}</div>
    <div>password: {{ registerForm.password }}</div>
    <div>confirmPassword: {{ registerForm.confirmPassword }}</div>
    <div>role: {{ registerForm.role }}</div>
    <!-- test -->
  </div>
</template>

<style scoped>
  .register-form-container {
    padding: v-bind('props.formPadding');
    background-color: v-bind('props.formBackgroundColor');
    width: v-bind('props.formWidth');
    border-radius: v-bind('props.formBorderRadius');
  }

  .register-button {
    margin: 0 auto;
  }
</style>

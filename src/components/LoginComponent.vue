<script setup>
  import { Avatar, Key } from '@element-plus/icons-vue';
  import { ref } from 'vue';
  import { validatePassword, validateUsername } from '@/rules';
  import { useUserStore } from '@/stores/user.js';
  import { useRouter } from 'vue-router';

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
  const loginForm = ref({
    username: '',
    password: '',
  });

  const rules = ref({
    username: [{ validator: validateUsername(), trigger: 'blur' }],
    password: [{ validator: validatePassword(), trigger: 'blur' }],
  });

  //登陆
  const router = useRouter();
  const buttonLoading = ref(false);
  const loginFormRef = ref(null);
  const userStore = useUserStore();
  const handleLoginButtonClick = () => {
    loginFormRef.value.validate((isValid) => {
      if (!isValid) {
        return;
      }
      buttonLoading.value = true;
      userStore
        .userLogin(loginForm.value)
        .then((message) => {
          ElMessage.success(message);
          router.push('/');
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
  <div class="login-form-container" :max-width="props.formWidth">
    <el-form status-icon :model="loginForm" :rules="rules" ref="loginFormRef">
      <el-form-item prop="username">
        <el-input
          type="text"
          placeholder="用户名"
          :prefix-icon="Avatar"
          v-model="loginForm.username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="密码"
          show-password
          v-model="loginForm.password"
          :prefix-icon="Key" />
      </el-form-item>
      <router-link to="/register">
        <el-form-item>
          <el-button link>首次使用？点我注册</el-button>
        </el-form-item>
      </router-link>

      <el-form-item>
        <el-button
          type="primary"
          class="login-button"
          :loading="buttonLoading"
          @click="handleLoginButtonClick"
          >登陆</el-button
        >
      </el-form-item>
    </el-form>
    <!-- TODO 测试数据，待删除 -->
    <!-- test -->
    <div>username: {{ loginForm.username }}</div>
    <div>password: {{ loginForm.password }}</div>
    <!-- test -->
  </div>
</template>

<style scoped>
  .login-form-container {
    padding: v-bind('props.formPadding');
    background-color: v-bind('props.formBackgroundColor');
    width: v-bind('props.formWidth');
    border-radius: v-bind('props.formBorderRadius');
  }

  .login-button {
    margin: 0 auto;
  }
</style>

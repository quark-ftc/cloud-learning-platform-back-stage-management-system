<script setup>
  import LoginComponent from '../components/LoginComponent.vue';
</script>

<template>
  <div class="login-component-container">
    <LoginComponent class="login-component" :login-form-width="'400px'" />
  </div>
</template>

<style scoped>
  .login-component-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #66b1ff;
  }
</style>

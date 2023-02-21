<script setup>
  import { useUserStore } from '@/stores';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { removeAllItem } from '@/utils/localStorage.js';
  import BreadcrumbComponent from '@/components/BreadcrumbComponent.vue';
  const router = useRouter();
  const userStore = useUserStore();
  const handleClickLogout = () => {
    userStore.userInfo = {};
    userStore.token = '';
    userStore.menus = [];
    userStore.roles = [];
    removeAllItem();
    router.push('/login');
  };
</script>

<template>
  <div class="navbar-component">
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :size="40" :src="userStore.userInfo.avatar"> </el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/user-info">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="handleClickLogout"
              >退出登陆</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="breadcrumb-component">
      <BreadcrumbComponent />
    </div>
  </div>
</template>

<style scoped>
  .navbar-component .right-menu {
    float: right;
    padding-right: 1em;
  }

  .breadcrumb-component {
    display: inline-block;
    font-size:  14px;
    line-height: 50px;
    margin-left: 8px; 
  }
</style>

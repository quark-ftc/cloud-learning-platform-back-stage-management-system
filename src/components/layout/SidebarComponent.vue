<script setup>
  import { useUserStore } from '@/stores';
  import { listToTree } from '@/utils/listToTree.js';
  import { ref } from 'vue';
  import TreeMenu from '../TreeMenu.vue';
  const userStore = useUserStore();
  //获取包含pid的菜单信息数组
  function getMenuList() {
    return new Promise((resolve, reject) => {
      let menuList = [];
      if (JSON.stringify(userStore.menus) != '[]') {
        menuList = userStore.menus;
        resolve(menuList);
      } else {
        userStore
          .getMenus()
          .then((data) => {
            menuList = data;
            resolve(menuList);
          })
          .catch((error) => {
            ElMessage.error(error.message);
            reject(error.message);
          });
      }
    });
  }
  //将菜单信息数组转化成树
  const menuTree = ref([]);
  getMenuList().then((menuList) => {
    console.log(menuList);
    menuTree.value = listToTree(menuList);
  });

  //TODO
  /**
   * 此处可以进一步将菜单树转化成路由表，但是动态import需要给vite做出响应配置，
   * 鉴于反正后端页不知道前端有哪些页面，此处意义不大，
   * 暂时手动配置路由表
   */
</script>
<template>
  <div class="sidebar-component">
    <TreeMenu :tree-data="menuTree" />
  </div>
</template>

<style scoped></style>

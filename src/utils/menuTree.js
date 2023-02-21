import { ref } from 'vue';
import { useUserStore } from '@/stores/user.js';
const userStore = useUserStore();
export function getMenuTree() {
  //获取包含pid的菜单信息数组
  function getMenuList() {
    return new Promise((resolve, reject) => {
      let menuList = [];
      if (JSON.stringify(userStore.menus) != '[]') {
        console.log('aaaaa');
        menuList = userStore.menus;
        resolve(menuList);
      } else {
        console.log('bbbbbbb');
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
  return menuTree;
}
export const menuTree = getMenuTree();

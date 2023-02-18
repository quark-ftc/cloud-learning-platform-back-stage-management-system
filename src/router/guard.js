import { useUserStore } from '@/stores/user.js';
import router from '@/router/index.js';
import { ElMessage } from 'element-plus';

export function generateRouterGuard() {
  return function () {
    //无需登陆也能跳转的页面
    const whiteList = ['/login', '/register'];
    const userStore = useUserStore();
    router.beforeEach((to, from, next) => {
      if (userStore.getToken()) {
        //如何token已经存在，则无需登陆，直接跳转到首页
        if (to.path === '/login') {
          next('/');
        } else {
          //如果用户信息不存在，则请求用户信息
          if (JSON.stringify(userStore.getUserInfo() === '{}')) {
            userStore.requestUserInfo().catch((error) => {
              ElMessage.error(`获取用户信息失败: ${error.message}`);
            });
          }
          next();
        }
      } else {
        //如果用户没有登陆，则只能访问白名单中的页面
        if (whiteList.includes(to.path)) {
          next();
        } else {
          next('/login');
        }
      }
    });
  };
}

//TODO 为什么使用下方的注释代码，在main函数中使用import()动态导入本文件无效
/*
//无需登陆也能跳转的页面
const whiteList = ['/login', '/register'];
const userStore = useUserStore();
router.beforeEach((to, from, next) => {
  if (userStore.token) {
    //如何token已经存在，则无需登陆，直接跳转到首页
    if (to.path === '/login') {
      next('/');
    } else {
      next();
    }
  } else {
    //如果用户没有登陆，则只能访问白名单中的页面
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next('/login');
    }
  }
});

*/

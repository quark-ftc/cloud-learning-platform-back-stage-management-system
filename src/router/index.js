import { createRouter, createWebHistory } from 'vue-router';
const publicRoute = [
  {
    path: '/login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/register',
    component: () => import('../views/RegisterView.vue'),
  },
  {
    path: '/user-info',
    component: () => import('@/views/UserInfoView.vue'),
  },
  {
    path: '/404',
    component: () => import('@/views/errors/UnauthorizedView.vue'),
  },
  {
    path: '/',
    component: () => import('../views/AppMainView.vue'),
    children: [
      {
        path: '/user',
        component: () =>
          import('@/components/main-components/UserManageComponent.vue'),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: publicRoute,
});

export default router;

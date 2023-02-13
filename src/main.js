import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import '@/assets/common.css';

import { generateRouterGuard } from '@/router/guard.js';
const app = createApp(App);

app.use(createPinia());
app.use(router);
generateRouterGuard()();

app.mount('#app');

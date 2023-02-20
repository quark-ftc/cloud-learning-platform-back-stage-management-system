import { useUserStore } from '@/stores/user.js';
<script setup>
  import { useUserStore } from '@/stores';
  const userStore = useUserStore();
const menus = userStore.menus;
</script>

<template>
  <div class="TreeMenu">
    {{ menus }}
  </div>
</template>

<style scoped></style>

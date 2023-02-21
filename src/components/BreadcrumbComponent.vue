<script setup>
  import { kebabCase } from 'lodash';
  import { watch, ref } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const breadcrumbData = ref(route.matched);
  watch(
    route,
    () => {
      console.log(route.matched);
    },
    { immediate: true, deep: true },
  );
</script>

<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) of breadcrumbData" :key="index">
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped></style>

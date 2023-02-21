<script setup>
    const props = defineProps({
    treeData: {
      type: Array,
    },
  });
</script>

<template>
  <div class="TreeMenu">
    <el-menu :router="true">
      <template v-for="(item, index) of treeData">
        <el-sub-menu
          v-if="item.children && item.children.length > 0"
          :index="item.path"
          :key="index">
          <template #title>
            <span>{{ item.menuTitle }} | {{ item.path }}</span>
          </template>
          <TreeMenu :tree-data="item.children" />
        </el-sub-menu>

        <el-menu-item :key="item.name" v-else :index="item.path">
          <template #title>
            <span>{{ item.menuTitle }} | {{ item.path }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>

  <div>{{ treeData }}</div>
</template>

<style scoped></style>

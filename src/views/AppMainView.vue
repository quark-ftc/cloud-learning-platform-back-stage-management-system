<script setup>
  import MainComponent from '../components/layout/MainComponent.vue';
  import NavbarComponent from '../components/layout/NavbarComponent.vue';
  import SidebarComponent from '../components/layout/SidebarComponent.vue';
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width:200px>
        <SidebarComponent />
      </el-aside>
      <el-container>
        <el-header>
          <NavbarComponent />
        </el-header>
        <el-main>
          <MainComponent />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped></style>

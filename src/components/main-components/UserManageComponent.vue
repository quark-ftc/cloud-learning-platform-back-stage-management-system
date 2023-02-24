<script setup>
  import { ref } from 'vue';
  import { useUserStore } from '../../stores/user';
  import { requestUserPagingList } from '@/apis';
  const tableData = ref([]);
  const total = ref(0);
  const page = ref(1);
  const size = ref(10);

  const getUserList = async (requestData) => {
    const responseDate = await requestUserPagingList(requestData);
    const { status, message, data } = responseDate;
    if (status == 'success') {
      tableData.value = data.list;
      total.value = data.total;
    } else {
      return Promise.reject(message);
    }
  };
  getUserList({
    page: page.value,
    size: size.value,
  }).catch((error) => {
    console.log(error);
    ElMessage.error(error.message);
  });
  const handleSizeChange = (currentSizes) => {
    size.value = currentSizes;
    getUserList({
      page: page.value,
      size: size.value,
    }).catch((error) => {
      ElMessage.error(error.message);
    });
  };
  const handelCurrentChange = (currentPage) => {
    page.value = currentPage;
    getUserList({
      page: page.value,
      size: size.value,
    }).catch((error) => {
      ElMessage.error(error.message);
    });
  };
</script>

<template>
  <div class="user-manage-container">
    <el-card class="header"> </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <!-- 序号 -->
        <el-table-column label="序号" type="index"></el-table-column>
        <!-- username-->
        <el-table-column prop="username" label="用户名"></el-table-column>
        <!-- 昵称 -->
        <el-table-column prop="nickname" label="昵称"></el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handelCurrentChange"
        :current-page="page"
        :page-size="size"
        :page-sizes="[5, 10]"
        layout="sizes, prev, pager, next, jumper, total, slot"
        :total="total"></el-pagination>
    </el-card>
  </div>
</template>

<style scoped></style>

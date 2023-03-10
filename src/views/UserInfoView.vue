<script setup>
  import { useUserStore } from '@/stores';
  import { ref, computed } from 'vue';
  import UserInfoDialogComponent from '../components/UserInfoDialogComponent.vue';
  import { Plus } from '@element-plus/icons-vue';
  const userStore = useUserStore();
  const userInfo = ref(userStore.userInfo);
  const descriptionItemData = ref({
    username: { label: '用户名', isDialogShow: false },
    email: { label: '邮箱', isDialogShow: false },
    nickname: { label: '昵称', isDialogShow: false },
    realName: { label: '真实姓名', isDialogShow: false },
    age: { label: '年龄', isDialogShow: false },
    // studentId: {
    //   label: '学号',
    //   isDialogShow: false,
    // },
    school: { label: '学校', isDialogShow: false },
  });

  const reacquireUserInfo = () => {
    userInfo.value = userStore.userInfo;
  };

  const handleUploadAvatarSuccess = () => {
    userStore.getUserInfo().then(() => {
      reacquireUserInfo();
    });
  };

  const beforeAvatarUpload = (rawFile) => {
    console.log('rawFile');
    console.log(rawFile);
    console.log('rawFile');
  };
  const uploadAvatarHeaders = computed(() => {
    return { Authorization: `Bearer ${userStore.token}` };
  });
</script>

<template>
  <div class="user-info-view-container">
    <el-descriptions title="用户信息" :column="2" size="large" border>
      <!-- 单独处理头像上传 -->
      <el-descriptions-item label="头像">
        <el-upload
          action="http://localhost:3001/auth/update-avatar"
          :on-success="handleUploadAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :headers="uploadAvatarHeaders"
          :show-file-list="false"
          name="avatar">
          <el-avatar v-if="userInfo.avatar" :size="50" :src="userInfo.avatar" />
          <el-icon v-else><Plus /></el-icon>
        </el-upload>
      </el-descriptions-item>
      <!-- 使用v-for循坏其他信息-->
      <template v-for="(item, attr) in descriptionItemData" :key="attr">
        <el-descriptions-item :label="item.label">
          <el-button text @click="item.isDialogShow = true">
            {{ userInfo[attr] ?? '未填写' }}
          </el-button>
          <UserInfoDialogComponent
            :attr="attr"
            :title="'修改' + item.label"
            :is-dialog-visible="item.isDialogShow"
            @close-dialog="item.isDialogShow = false"
            @reacquire-user-info="reacquireUserInfo" />
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>
<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
</style>

<script setup>
  import { ref } from 'vue';
  import { updateUserInfo } from '@/apis';
  import { useUserStore } from '../stores/user';
  const prop = defineProps({
    title: {
      type: String,
      required: true,
    },
    isDialogVisible: {
      type: Boolean,
      required: true,
    },
    attr: {
      type: String,
      required: true,
    },
  });
  const emit = defineEmits(['closeDialog', 'reacquireUserInfo']);
  const inputValue = ref('');
  const handleBeforeClose = () => {
    emit('closeDialog');
  };

  const userStore = useUserStore();
  const handleClickConfirm = async (attribute, value) => {
    console.log(attribute);
    console.log(value);
    const { status, message, data } = await updateUserInfo(
      attribute,
      value,
    ).catch((error) => {
      ElMessage.error(error.message);
    });
    if (status === 'failure') {
      ElMessage.error(message);
    } else {
      // console.log(message);
      // console.log(data.userInfo);
      // console.log(userStore);
      userStore.userInfo = data.userInfo;
      emit('reacquireUserInfo');
      emit('closeDialog');
    }
  };
</script>

<template>
  <div class="user-info-dialog-component">
    <el-dialog
      :model-value="isDialogVisible"
      destroy-on-close
      :modal="false"
      :before-close="handleBeforeClose">
      <template #header>{{ title }}</template>
      <el-input v-model="inputValue" />
      <template #footer>
        <el-button @click="$emit('closeDialog')">取消</el-button>
        <el-button @click="handleClickConfirm(attr, inputValue)"
          >确定</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<style scoped></style>

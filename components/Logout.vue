<template>
  <el-button @click="logout" class="logout-button">Выход</el-button>
</template>

<script>
  import { messages } from '@/constants/config';
  export default {
    methods: {
      logout() {
        this.$store.dispatch('user/logout');
        this.$message({
          message: messages.logoutSuccessed,
          type: 'success'
        });
      }
    },
  }
</script>


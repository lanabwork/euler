<template>
  <el-card class="add-card">
    <div class="add-card__inner" @click="addCard">
      <i class="el-icon-plus"></i>
      <div class="add-card__label">Добавить карту</div>
    </div>
  </el-card>
</template>

<script>
  import { messages } from '@/constants/config';
  export default {
    methods: {
      addCard() {
        const defaultCard = {
          id: Date.now(),
          name: '',
          number: '',
          isCreated: false,
          isSaved: false,
          bank: {}
        };

        this.$store.dispatch('cards/add', defaultCard);

        this.$message({
          message: messages.addedCard,
          type: 'success'
        });
      }
    },
  }
</script>

<style lang="scss">
  .add-card {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &__inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .el-icon-plus {
      font-size: 50px;
      margin-bottom: 24px;
    }
  }
</style>


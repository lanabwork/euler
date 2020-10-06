<template>
  <div class="container cards">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="20" :md="20" :lg="22" :xl="22">
        <h1 class="cards__header">Мои инструменты</h1>
      </el-col>
      <el-col :xs="24" :sm="4" :md="2" :lg="2" :xl="2">
        <logout></logout>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-for="(card, index) in cards" :key="index">
        <card
          :id="card.id"
          :name="card.name"
          :number="card.number"
          :bank="card.bank"
          :isSaved="card.isSaved"
          :isCreated="card.isCreated"/>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <add-card></add-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import { messages } from '@/constants/config';
  import Card from '~/components/Card.vue'
  import Logout from '~/components/Logout.vue'
  import AddCard from '~/components/AddCard.vue'
  export default {
    middleware: ['authenticated'],
    components: {
      Card,
      AddCard,
      Logout,
    },
    data() {
      return {
        expiredSessionTime: null,
      }
    },
    computed: {
      ...mapState('cards', ['cards']),
    },
    methods: {
      checkSessionTime() {
        this.$store.dispatch('user/checkSessionTime');
        if (this.$store.state.user.isExpired) {
          this.$message({
            message: messages.sessionIsExpired,
            type: 'error'
          });
          clearInterval(this.expiredSessionTime);
        }
      },
    },
    mounted() {
      this.expiredSessionTime = setInterval(() => {
        this.checkSessionTime();
      }, 1000);
    }
  }
</script>

<style lang="scss">
  .cards {
    &__header {
      margin-bottom: 0;
      margin-top: 0;
      text-align: center;
    }
  }
</style>


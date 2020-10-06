<template>
  <section class="container login">
    <div class="login__inner">
      <el-row :gutter="20">
        <el-col>
          <h1>Вход в cистему</h1>
        </el-col>
      </el-row>
      <el-form ref="userForm" :model="user" :rules="rules">
        <el-form-item prop="login">
          <el-input
            data-login
            class="login__login"
            placeholder="Мобильный телефон*"
            type="number"
            v-model="user.login"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            data-password
            class="login__password"
            placeholder="Пароль*"
            type="password"
            v-model="user.password"
            show-password/>
        </el-form-item>
        <el-button type="primary" @click="submitForm('userForm')">Далее</el-button>
      </el-form>
    </div>
  </section>
</template>

<script>
  import { userCheck, messages } from '@/constants/config';
  export default {
    middleware: ['notAuthenticated'],
    data() {
      return {
        userCheck,
        isError: false,
        user: {
          login: null,
          password: null,
        },
        rules: {
          login: [
            {
              required: true,
              message: 'Обязательное поле',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: 'Обязательное поле',
              trigger: 'blur'
            }
          ],
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.userCheck.login === this.user.login && this.userCheck.password === this.user.password) {
              this.isError = false;
              this.$store.dispatch('user/authorization', this.user)
              this.$message({
                message: messages.authorizationSuccessed,
                type: 'success'
              });
            } else {
              this.isError = true;
              this.$message({
                message: messages.authorizationError,
                type: 'error'
              });
            }
          } else {
            return false;
          }
        });
      },
    },
  }
</script>

<style lang="scss">
  .login {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;

    &__inner {
      background-color: $login-bg-color;
      padding: 16px;
      max-width: 400px;
      width: 100%;
    }
  }
</style>


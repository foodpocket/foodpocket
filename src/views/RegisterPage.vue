<template>
  <div class="registerpage">
    <div class="container">
      <div class="logo-wrapper">
        <img class="logo" :src="foodPocketLogo" />
      </div>
      <h2 @click="back">FoodPocket</h2>
      <form class="form" @submit.prevent="register">
        <div class="group">
          <label for="user_username">帳號</label>
          <input type="text" id="user_username" placeholder="請輸入帳號" v-model="username" required/>
        </div>
        <div class="group">
          <label for="user_password">設定密碼</label>
          <input type="password" id="user_password" placeholder="請輸入密碼" v-model="password" required/>
        </div>
        <div class="group">
          <label for="user_checkpassword">確認密碼</label>
          <input type="password" id="user_checkpassword" placeholder="請再次輸入密碼" v-model="checkpassword" required/>
        </div>
        <div class="group">
          <label for="user_email">電子信箱</label>
          <input type="email" id="user_email" placeholder="請輸入電子信箱" v-model="email" required/>
        </div>
        <button type="submit" class="btn login-btn">建立您的帳號</button>
        <a class="btn back-btn" @click.prevent="back">取消</a>
      </form>
    </div>
  </div>
</template>

<script>
import foodPocketLogo from '@/assets/foodpocket_logo.svg'

export default {
  data () {
    return {
      foodPocketLogo,
      username: '',
      password: '',
      checkpassword: '',
      email: ''
    }
  },
  methods: {
    back () {
      this.$router.push('/landingpage')
    },
    register () {
      if (this.password === this.checkpassword) {
        this.$router.push('/confirmationpage')
      } else {
        window.alert('確認密碼必須與設定密碼一致')
      }
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Monda&display=swap');

.registerpage {
  min-height: 100vh;
  height: 100%;
  background-color: $background;
  .container {
    margin: auto;
    padding-top: 50px;
    width: 90%;
    .logo-wrapper {
      width: 100%;
      height: 7rem;
      margin-bottom: 0vw;
      object-fit: contain;
      display: flex;
      align-items: center;
      justify-content: center;

      .logo {
        height: 100%;
      }
    }
    h2 {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #000;
      font-family: 'Monda', sans-serif;
    }
    h2:hover{
      cursor: pointer;
    }
    .form {
      width: 100%;
      color: #555;
      .group {
        margin-bottom: 20px;
        label {
          display: flex;
        }
        input {
          // background-color: $primary;
          width: 100%;
          border-radius: 5px;
          outline: none;
          border: 1px solid $primary;
          padding: 5px 15px;
        }
        input:focus {
          outline: none;
        }
        // input::placeholder{
        //   color: $background;
        // }
      }
      .login-btn{
        background-color: $point;
        color: $background;
        width: 100%;
        border-radius: 50px;
        margin-top: 50px;
        outline: none;
      }
      .btn:focus {
          outline: none;
      }
      .back-btn{
        margin-top: 20px;
        outline: none;
      }
    }
  }
}
</style>

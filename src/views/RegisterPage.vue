<template>
  <div class="registerpage">
    <bus />
    <div class="container">
      <div class="logo-wrapper">
        <img class="logo" :src="foodPocketLogo" />
      </div>
      <h2 @click="back">FoodPocket</h2>
      <form class="form" @submit.prevent="registerAccount">
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
import foodPocketLogo from '@/assets/foodpocket_logo.svg';
import bus from '@/components/bus.vue';
import AccountApi from '@/libs/apis/AccountApi';
import { MessageType } from '@/bus';

export default {
  components: {
    bus,
  },
  data() {
    return {
      foodPocketLogo,
      username: '',
      password: '',
      checkpassword: '',
      email: '',
    };
  },
  computed: {
    dangerbus() {
      return this.$store.state.dangerbus;
    },
  },
  methods: {
    back() {
      this.$router.push('/landingpage');
    },
    registerAccount() {
      if (this.password === this.checkpassword) {
        AccountApi.register(this.username, this.password, this.email).then(() => {
          this.$router.push('/confirmationpage'); // 跳轉到成功頁
        }).catch((err) => {
          if (err && err.response) {
            if (err.response.status === 409) {
              this.$bus.$emit('message:push', '帳號或email重複註冊，請再試一次', MessageType.dangerbus);
              this.password = '';
              this.checkpassword = '';
            }
          }
        });
      } else {
        this.$bus.$emit('message:push', '確認密碼必須與設定密碼一致', MessageType.dangerbus);
        this.password = '';
        this.checkpassword = '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Monda&display=swap');

.registerpage {
  min-height: 100vh;
  height: 100%;
  background-color: $outside-background;
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
          -webkit-appearance: none;
          width: 100%;
          border-radius: 5px;
          outline: none;
          border: 1px solid $word-background-dark;
          padding: 5px 15px;
        }
        input:focus {
          outline: none;
        }
      }
      .login-btn{
        background-color: $point-btn;
        color: $milk-white;
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

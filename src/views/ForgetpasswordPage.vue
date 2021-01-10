<template>
  <div class="forgetpassword">
    <div class="container">
      <div class="logo-wrapper">
        <img class="logo mr-3" :src="foodPocketLogo" />
        <h2 @click="back">FoodPocket</h2>
      </div>
      <h1>忘記密碼</h1>
      <form class="form" @submit.prevent="forgetpassword">
        <div class="group">
          <label for="user_email" class="text-left">請填寫您的email，我們將寄一組新的密碼給您</label>
          <input type="email" id="user_email" placeholder="請輸入電子信箱" v-model="email" required/>
        </div>
        <button type="submit" class="btn">發送</button>
      </form>
    </div>
  </div>
</template>

<script>
import foodPocketLogo from '@/assets/foodpocket_logo.svg';

export default {
  data() {
    return {
      foodPocketLogo,
      email: '',
    };
  },
  methods: {
    back() {
      this.$router.push('/loginpage');
    },
    forgetpassword() {
      window.alert('已成功寄信');
      this.$router.push('/loginpage');
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.forgetpassword {
  min-height: 100vh;
  height: 100%;
  background-color: $outside-background;
  .container {
    color: #555;
    padding-top: 50px;
    width: 90%;
    display: flex;
    flex-direction: column;

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
      h2 {
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #000;
        font-family: "Monda", sans-serif;
      }
    }
    h1{
      margin-top: 30px;
      font-size: 1.7rem;
      margin-bottom: 20px;
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
          width: 100%;
          border-radius: 5px;
          outline: none;
          border: 1px solid $word-background-dark;
          padding: 5px 15px;
          -webkit-appearance: none;
        }
        input:focus {
          outline: none;
        }
      }
    }
    button {
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
  }
}
</style>

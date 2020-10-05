<template>
  <div class="successpage">
    <div class="container">
      <div class="logo-wrapper">
        <img class="logo mr-3" :src="foodPocketLogo" />
        <h2 @click="back">FoodPocket</h2>
      </div>
      <div class="txt">
        <h1>認證成功</h1>
        <p>您可以開始使用您的食物口袋了！</p>
      </div>
      <button type="button" class="btn" @click.prevent="back">去登入！</button>
    </div>
  </div>
</template>

<script>
import foodPocketLogo from '@/assets/foodpocket_logo.svg'

export default {
  data () {
    return { foodPocketLogo }
  },
  methods: {
    back () {
      this.$router.push('/loginpage')
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.successpage {
  min-height: 100vh;
  height: 100%;
  background-color: $background;
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
    .txt {
      margin-top: 30px;
      h1{
        font-size: 1.7rem;
        margin-bottom: 20px;
      }
    }
    button {
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
  }
}
</style>

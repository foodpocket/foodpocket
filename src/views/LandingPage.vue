<template>
  <div class="landingpage">
    <div class="container">
      <div class="logo-wrapper">
        <img class="logo" :src="foodPocketLogo" />
      </div>
      <h2>FoodPocket</h2>
      <h3>建立自己的口袋名單！</h3>
      <div class="buttons">
        <button class="btn loginpage-btn mb-3" @click="loginpage">登入</button>
        <button class="btn loginpage-btn" @click="loginpage">註冊</button>
      </div>
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
    loginpage () {
      this.$router.push('/loginpage')
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

.landingpage {
  .container {
    color: #555;
    margin: 50px auto;
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
      }

    h2 {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #000;
      font-family: "Monda", sans-serif;
    }
    h3 {
      margin: 30px auto;
      font-size: 1.8rem;
    }
    .buttons{
      margin-top: 30px;
      .loginpage-btn {
        width: 100%;
        background-color: $point;
        color: $background;
      }
    }
  }
}
</style>

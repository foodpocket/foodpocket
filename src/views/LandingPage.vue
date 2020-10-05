<template>
  <div class="landingpage">
    <div class="easy-area">
      <div class="container">
        <div class="logo-wrapper">
          <img class="logo" :src="foodPocketLogo" />
        </div>
        <h2>FoodPocket</h2>
        <h3>建立自己的口袋名單！</h3>
        <div class="buttons">
          <button class="btn loginpage-btn mb-3" @click="loginpage">登入</button>
          <button class="btn loginpage-btn" @click="RegisterPage">註冊</button>
        </div>
      </div>
    </div>

    <!-- <div class="introduction">

      <div class="title">
        <h2>電視 / FB / IG網紅 / Youtuber</h2>
        <h2>介紹的美食都好想去</h2>
      </div>
      <div class="image">
        <img :src="food" />
      </div>
      <div class="test">
        <h2 @click="RegisterPage">記下來！</h2>
      </div>

      <div class="title">
        <h2>日常三餐記下來</h2>
        <h2>吃過的美食不會忘</h2>
      </div>
      <div class="image">
        <img :src="download" />
      </div>
      <div class="test">
        <h2 @click="RegisterPage">記下來！</h2>
      </div>

      <div class="title">
        <h2>紀錄餐廳細節</h2>
        <h2>備註必點、必加、特殊需求</h2>
      </div>
      <div class="image">
        <img :src="food" />
      </div>
      <div class="test">
        <h2 @click="RegisterPage">記下來！</h2>
      </div>

      <div class="title">
        <h2>利用分類及標籤</h2>
        <h2>你可以擁有多個口袋名單！</h2>
      </div>
      <div class="image">
        <img :src="download" />
      </div>
      <div class="test">
        <h2 @click="RegisterPage">去創口袋囉！</h2>
      </div>

    </div> -->
  </div>
</template>

<script>
import foodPocketLogo from '@/assets/foodpocket_logo.svg'
import choosepocketpage from '@/assets/choosepocketpage.jpg'
import recommendlist from '@/assets/recommendlist.jpg'
import restaurantlist from '@/assets/restaurantlist.jpg'
import visitrecords from '@/assets/visitrecords.jpg'
import food from '@/assets/food.jpg'
import download from '@/assets/download.png'

export default {
  data () {
    return {
      foodPocketLogo,
      choosepocketpage,
      recommendlist,
      restaurantlist,
      visitrecords,
      food,
      download
    }
  },
  methods: {
    loginpage () {
      this.$router.push('/loginpage')
    },
    RegisterPage () {
      this.$router.push('/registerpage')
    }
  },
  created () {
    // console.log(process.env.VUE_APP_APIPATH)
  }
}
</script>

<style lang="scss" scoped>
.landingpage {
  min-height: 100vh;
  // height: 100%;
  background-color: $background;
  .easy-area {
    height: 100vh;
    .container {
      // background-color: aquamarine; // dev
      padding-bottom: 50px; // dev
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
      .buttons {
        margin-top: 30px;
        .loginpage-btn {
          width: 100%;
          background-color: $point;
          color: $background;
        }
      }
    }
  }
  .introduction {
    padding: 50px 0;
    .title {
      background-color: rgb(223, 204, 180);
      padding: 30px;
      h2 {
        font-size: 1.5rem;
      }
    }
    .image {
      padding-top: 30px;
      width: 90%;
      margin: auto;
      img {
        width: 100%;
      }
    }
    .test {
      margin: 30px;
      padding: 10px;
      border: solid 2px #555;
      border-radius: 50px;
    }
    .test:hover,
    .test:active{
      background-color: $point;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>

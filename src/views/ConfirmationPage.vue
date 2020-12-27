<template>
  <div class="confirmationpage">
    <div class="container">
      <div class="logo-wrapper">
        <img class="logo mr-3" :src="foodPocketLogo" />
        <h2 @click="back">FoodPocket</h2>
      </div>
      <div class="txt">
        <h1>信箱認證</h1>
        <ol>
          <li class="text-left">系統將會自動發送認證信至您所填寫的信箱中，請於24小時內收信餅點選完成認證。</li>
          <li class="text-left">未於24小時內完成認證者，請重新操作，謝謝。</li>
        </ol>
      </div>
      <button type="button" class="btn" @click.prevent="back">回首頁</button>
      <a href class="tips" @click.prevent="tips">跳過收信流程直達成功頁面</a>
    </div>
  </div>
</template>

<script>
import foodPocketLogo from '@/assets/foodpocket_logo.svg';

export default {
  data() {
    return { foodPocketLogo };
  },
  methods: {
    back() {
      this.$router.push('/landingpage');
    },
    tips() {
      this.$router.push('/successpage');
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.confirmationpage {
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
    .txt {
      margin-top: 30px;
      h1 {
        font-size: 1.7rem;
        margin-bottom: 20px;
      }
      ol {
        padding-left: 20px;
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
    .tips {
      position: fixed;
      bottom: 10px;
      right: 10px;
    }
  }
}
</style>

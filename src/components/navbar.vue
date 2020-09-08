<template>
  <div class="navbar">
    <!-- <h1>FoodPocket 食物口袋</h1> -->
    <h1>
      <!-- <div class="sidebar-btn" @click="opensidebar">
        <i class="fas fa-bars"></i>
      </div> -->
      {{myfoodpocket.pocketName}} Pocket
    </h1>
    <div class="logout">
      <button class="btn btn-sm" @click="logout">登出</button>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
export default {
  props: {
    foodpocket: {
      type: Object,
      default: () => ({
        // pocketName: 'pocketName'
        pocketName: '我的日常餐廳'
      })
    }
  },
  data () {
    return {
      myfoodpocket: this.foodpocket
    }
  },
  methods: {
    opensidebar () { // 配合sidebar使用
      console.log('open sidebar')
    //   // 這邊居然不用用到emit就可以按到其她component的東西 有點訝異 之後改
    //   $('#sidebar').toggleClass('active')
    //   $('.overlay').toggleClass('active')
    },
    logout () {
      if (this.$cookies.isKey('token')) {
        this.$cookies.remove('token')
      }
      window.alert('登出成功')
      this.$router.push('/landingpage')
    }
  }
}
</script>

<style scoped lang="scss">
$background:#FCFBEF;
$primary:#C19969;
$second:#C8BCA0;
$point:#4B2D16;

.navbar {
  background-color: $primary;
  color: $background;
  padding: 30px 0;
  display: flex;
  justify-content: space-around;
  h1 {
    position: relative;
    margin: 0;
    font-size: 1.6rem;
    .sidebar-btn {
      position: absolute;
      left: -3rem;
    }
  }
  .logout {
    align-self: center;
    .btn {
      padding: 3px;
      font-weight: lighter;
      background-color: $point;
      color: $background;
    }
  }
}
</style>

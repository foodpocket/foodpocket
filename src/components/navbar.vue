<template>
  <div class="navbar">
    <div class="container">
      <div class="sidebar-btn" @click="opensidebar">
        <i class="fas fa-bars"></i>
      </div>
      <h1>
        {{myfoodpocket.pocketName}} Pocket
      </h1>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
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
    opensidebar () {
      // 配合sidebar使用
      $('#sidebar').toggleClass('active')
      $('.overlay').toggleClass('active')
    }
  }
}
</script>

<style scoped lang="scss">
$background: #fcfbef;
$primary: #c19969;
$second: #c8bca0;
$point: #4b2d16;

.navbar {
  background-color: $primary;
  color: $background;
  .container{
    display: block;
    .sidebar-btn {
      float: left;
      margin: 0;
      padding: 0;
      font-size: 1.3rem;
    }
    h1 {
      margin: 0;
      font-size: 1.6rem;
    }
  }
}
</style>

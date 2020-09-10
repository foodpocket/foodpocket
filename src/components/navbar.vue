<template>
  <div class="navbar">
    <div class="container">
      <div class="sidebar-btn" @click="controlsidebar">
        <i class="fas fa-bars"></i>
      </div>
      <h1>
        <slot></slot>
      </h1>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  // props: {
  //   navbartitle: {
  //     type: Object,
  //     default: () => ({
  //       pocketName: '我的日常餐廳'
  //     })
  //   }
  // },
  data () {
    return {
      title: this.navbartitle
    }
  },
  methods: {
    controlsidebar () {
      // 配合sidebar使用
      $('#sidebar').toggleClass('active')
      $('#overlay').toggleClass('active')
    }
  }
}
</script>

<style scoped lang="scss">
$background: #fcfbef;
$primary: #c19969;
$second: #daceb4;
$point:#906441;

.navbar {
  background-color: $point;
  color: $background;
  .container{
    padding: 0;
    display: block;
    .sidebar-btn {
      cursor: pointer;
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

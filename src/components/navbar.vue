<template>
  <div class="navbar">
    <div class="container">
      <slot></slot>
      <div class="sidebar-btn" @click="controlsidebar">
        <i class="fas fa-bars"></i>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
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

.navbar {
  background-color: $navbar-background;
  color: #fff;
  .container{
    display: flex;
    justify-content: center;
    position: relative;
    h1{
      font-size: 1.6rem;
      margin: 0;
    }
    .sidebar-btn{
      position: absolute;
      top: 0;
      left: 0;
      padding: 0;
      margin: 0;
      display: flex;
      i{
        align-self: center;
        font-size: 2rem;
      }
    }
  }
}
</style>

<template>
  <div class="foodpocket">
    <div class="wrapper">
      <!-- 側邊攔 -->
      <sidebar/>

      <!-- 透明幕 -->
      <div id="overlay" @click="controlsidebar"></div>

      <!-- 主畫面 -->
      <router-view style="flex-shrink:0; flex-grow:0;"/>

    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import sidebar from '@/components/sidebar.vue'

export default {
  components: {
    sidebar
  },
  data () {
    return {
    }
  },
  methods: {
    controlsidebar () { // 配合sidebar使用
      $('#sidebar').toggleClass('active')
      $('#overlay').toggleClass('active')
    }
  }
}
</script>

<style lang="scss" scoped>

$background:#FCFBEF;
$primary:#C19969;
$second: #daceb4;
$point:#906441;

.foodpocket{
  width: 100%;
  height: 100%;
  .wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    overflow: hidden;
  }
  #overlay {
      display: none;
      position: fixed;
      width: 100vw;
      height: 100%;
      background: transparent;
      // background: #333;
      z-index: 20;
      cursor: pointer;
  }
  #overlay.active {
      display: block;
  }
}
</style>

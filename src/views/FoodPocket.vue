<template>
  <div class="foodpocket">
    <div class="wrapper">
      <!-- 側邊攔 -->
      <sidebar/>

      <!-- 黑幕 -->
      <div class="overlay" @click="closesidebar"></div>

      <!-- 主畫面 -->
      <foodpocket style="flex-shrink:0; flex-grow:0;"/>  <!-- 禁止收縮 -->

    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import sidebar from '@/components/sidebar.vue'
import foodpocket from '@/components/Content FoodPocket.vue'

export default {
  components: {
    sidebar,
    foodpocket
  },
  data () {
    return {
    }
  },
  methods: {
    closesidebar () { // 配合sidebar使用
      $('#sidebar').toggleClass('active')
      $('.overlay').toggleClass('active')
    }
  }
}
</script>

<style lang="scss" scoped>

$background:#FCFBEF;
$primary:#C19969;
$second:#C8BCA0;
$point:#4B2D16;
.foodpocket{
  width: 100%;
  height: 100%;
}
.wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
}
.overlay {
    display: none;
    position: fixed;
    width: 100vw;
    height: 100%;
    background: transparent;
    // background: rgba(0, 0, 0, 0.7);
    z-index: 20;
}
.overlay.active {
    display: block;
}
</style>

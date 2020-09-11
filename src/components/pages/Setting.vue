<template>
  <div class="setting">
    <navbar>
      <h1>設定</h1>
    </navbar>
    <div class="container">
      <!-- <div>
        更換背景主題
        <input id="theme" type="checkbox" value="theme"/>
        <label class="pockets" for="theme">更換背景主題</label>
      </div>
      <div>
        <span>吃飯時間提醒您紀錄</span>
        <input id="remind" type="checkbox" value="remind"/>
        <label for="remind">吃飯時間提醒您紀錄</label>
      </div>
      <div>
        <span>連結FB、IG、LINE</span>
        <input id="connect" type="checkbox" value="connect"/>
        <label for="connect">連結FB、IG、LINE</label>
      </div> -->
    </div>
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue'

export default {
  components: {
    navbar
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.setting{
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background-color: $light-background;
  label{
    background-color: $second;
    color: $deep;
    margin: 20px auto;
    padding: 10px 20px;
    border-radius: 50px;
    display: flex;
    justify-content: space-between;
    // input[type="checkbox"]{
    //   display: none;
    // }
    input:checked + .pockets{
      background: $primary;
      color: $light-background;
      transition: 0.2s;
    }
  }
}
</style>

<template>
  <div class="setting">
    <navbar>
      <h1>設定</h1>
    </navbar>
    <div class="container">
      <div class="mt-3">
        <p>沒什麼好設定的，不過可以玩玩顏色</p>
      </div>
      <div class="colorcard text-left" v-for="(item, index) in color" :key="index">
        <div :style="{backgroundColor: item.color}">
          <p>
            {{item.name}}
          </p>
          <p style="font-size:0.8rem; color:gray;">
            {{item.info}}
          </p>
        </div>
        <p>
          <input type="text" v-model="item.color">
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue';

export default {
  components: {
    navbar,
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.setting{
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background-color: $white-background;
  .colorcard{
    box-shadow: 0 0 3px #ddd;
    padding: 10px;
  }
}
</style>

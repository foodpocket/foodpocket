<template>
  <div class="foodpocket">
    <navbar>
      <h1>選擇口袋名單</h1>
    </navbar>
    <div class="container">
      <div class="test" @click="goo">
        <h1>我的日常餐廳</h1>
        <p>共有30筆資料</p>
      </div>
      <div class="test2" @click="addpocket">
        <h1>+</h1>
      </div>
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
  },
  methods: {
    goo () {
      this.$router.push('/foodpocket')
    },
    addpocket () {
      window.alert('還沒有這個功能哦')
    }
  }
}
</script>

<style lang="scss" scoped>
$background:#FCFBEF;
$primary:#C19969;
$second: #daceb4;
$point:#4B2D16;

* {
  margin: 0;
}

.test{
  background-color: $second;
  color: $point;
  margin: 20px auto;
  padding: 10px;
  border-radius: 50px;
  h1{
    font-size: 2rem;
  }
}
.test2{
  margin-top: 50px;
  h1{
    display: inline;
    background-color: $second;
    color: $point;
    padding: 0 20px;
    border-radius: 50%;
  }
}
</style>

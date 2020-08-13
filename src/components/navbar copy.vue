<template>
  <div class="navbar">
    <h1>FoodPocket 食物口袋</h1>
    <div class="logout">
      <button class="btn btn-info btn-sm" @click="logout">登出</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      if (this.$cookies.isKey('token')) {
        this.$cookies.remove('token')
      }
      window.alert('登出成功')
      this.$router.push('/loginpage')
    }
  }
}
</script>

<style scoped lang="scss">
.navbar {
  // background-color: #555; // component color
  // color: #fff; // component color
  padding: 30px 0;
  display: flex;
  justify-content: space-around;
  h1{
    margin: 0;
    font-size: 1.6rem;
  }
  .logout{
    align-self: center;
    .btn{
      padding: 3px;
      font-weight: lighter;
    }
  }
}
</style>

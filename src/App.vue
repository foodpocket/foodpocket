<template>
  <div id="app">
    <div id="nav">
      FoodPocket 食物口袋
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "./assets/all.scss";

#app {
  font-family: 'Noto Sans TC', sans-serif, 'Balsamiq Sans', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  font-size: 1.6rem;
}

a {
  color: #2c3e50;
  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>

<template>
  <div id="app">
    <loading :active.sync="$store.state.isLoading"></loading>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "./assets/all.scss";
@import url('https://fonts.googleapis.com/css2?family=Monda&display=swap');

#app {
  font-family: 'Noto Sans TC', sans-serif, 'Balsamiq Sans', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  height: 100%;
  text-align: center;
  color: #2c3e50;
}

a {
  color: #2c3e50;
  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "./assets/all.scss";

$background:#FCFBEF;
$primary:#C19969;
$second:#C8BCA0;
$point:#906441;

body{
  background-color: $background;
}
#app {
  font-family: 'Noto Sans TC', sans-serif, 'Balsamiq Sans', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

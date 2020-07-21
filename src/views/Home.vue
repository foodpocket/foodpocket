<template>
  <div class="home">
    <div class="logout">
      <button class="btn btn-danger btn-sm mb-2" @click="logout">登出</button>
    </div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data () {
    return {
      token: ''
    }
  },
  name: 'Home',
  components: {
    HelloWorld
  },
  created () {
    this.getToken()
  },
  methods: {
    getToken: function () {
      if (this.$cookies.isKey('token')) {
        this.token = this.$cookies.get('token')
        console.log('Home:', 'hello')
      } else {
        this.$router.push('/loginpage')
      }
    },
    logout () {
      if (this.$cookies.isKey('token')) {
        this.$cookies.remove('token')
        window.alert('登出成功')
        this.$router.push('/loginpage')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.logout{
  position: absolute;
  top: 10px;
  right: 10px;
  .btn{
    padding: 3px;
  }
}
</style>

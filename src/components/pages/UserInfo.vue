<template>
  <div class="userinfo">
    <navbar>
      <h1>個人資訊</h1>
    </navbar>

    <div class="container">
      <div class="text-left mt-5">
        <h4>姓名：<span> {{name}}</span></h4>
        <h4>口袋數：<span> {{num}}個</span></h4>
        <h4>token：<span class="token">{{token}}</span></h4>
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
      token: '',
      name: 'Joanna',
      num: 4
    }
  },
  created () {
    this.getToken()
  },
  methods: {
    getToken () {
      if (this.$cookies.isKey('token')) {
        this.token = this.$cookies.get('token')
        // console.log('getToken:', this.token)
      } else {
        this.$router.push('/loginpage')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.userinfo{
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background-color: $light-background;
  h4{
    font-size: 1.2rem;
    margin: 20px 0;
    .token{
      word-wrap:break-word;
    }
  }
}
</style>

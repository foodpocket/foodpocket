<template>
  <div class="userinfo">
    <loading :active.sync="isLoading"></loading>
    <navbar>
      <h1>個人資訊</h1>
    </navbar>

    <div class="container">
      <div class="txt text-left mt-3">
        <h4>帳號：<span> {{username}}</span></h4>
        <h4>口袋數：<span> {{pocketnum}}個</span></h4>
        <!-- <h4>token：<span class="token">{{token}}</span></h4> -->
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
      isLoading: false
    }
  },
  created () {
    this.getToken()
  },
  computed: {
    username () {
      return this.$cookies.get('username')
    },
    pocketnum () {
      return this.$cookies.get('pocketnum')
    }
  },
  methods: {
    getToken () {
      this.isLoading = true
      if (this.$cookies.isKey('token')) {
        this.token = this.$cookies.get('token')
        // console.log('getToken:', this.token)
        this.isLoading = false
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
  .txt{
    background: $second;
    border-radius: 10px;
    padding: 10px;
    h4{
      background-color: #fff;
      padding: 10px;
      border-radius: 10px;
      margin: 5px 0;
      font-size: 1rem;
      .token{
        word-wrap:break-word;
      }
    }
  }
}
</style>

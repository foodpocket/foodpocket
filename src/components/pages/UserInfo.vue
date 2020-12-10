<template>
  <div class="userinfo">
    <loading :active.sync="isLoading"></loading>
    <navbar>
      <h1>個人資訊</h1>
    </navbar>

    <div class="container">
      <table class="table">
        <tbody>
          <tr>
            <td style="width: 30%;">帳號：</td>
            <td style="width: 70%;">{{username}}</td>
          </tr>
          <tr>
            <td>口袋數：</td>
            <td>{{pocketnum}}個</td>
          </tr>
        </tbody>
      </table>
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
.userinfo {
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background-color: $main-background;
  .container{
    margin-top: 20px;
    .table {
      border-radius: 0.25rem;
      background: $white-background;
      margin: 0;
      td {
        text-align: left;
        font-size: 1.2rem;
      }
    }
  }
}
</style>

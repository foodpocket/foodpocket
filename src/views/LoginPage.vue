<template>
  <div class="login">
    <bus/>
    <div class="container">
      <form class="form" @submit.prevent="signin">
        <div class="logo-wrapper">
          <img class="logo" :src="foodPocketLogo" />
        </div>
        <!-- <h2><router-link to="/Home">FoodPocket</router-link></h2> -->
        <h2 @click="back">FoodPocket</h2>
        <div class="group">
          <label for="user_id">帳號</label>
          <input type="text" id="user_id" placeholder="請輸入帳號" v-model="username"/>
        </div>
        <div class="group">
          <label for="user_password">密碼</label>
          <input type="password" id="user_password" placeholder="請輸入密碼" v-model="password"/>
        </div>
        <button type="submit" class="btn login-btn">登入</button>
        <a class="btn register-btn" @click.prevent="RegisterPage">還沒有帳號？去註冊</a>
        <a class="btn forget-btn" @click.prevent="forget">忘記密碼</a>
      </form>
    </div>
  </div>
</template>

<script>
import bus from '@/components/bus.vue'
import foodPocketLogo from '@/assets/foodpocket_logo.svg'

export default {
  data () {
    return {
      foodPocketLogo,
      username: '',
      password: ''
    }
  },
  methods: {
    back () {
      this.$router.push('/landingpage')
    },
    RegisterPage () {
      this.$router.push('/registerpage')
    },
    clear () {
      this.username = ''
      this.password = ''
    },
    forget () {
      window.alert('你忘記密碼我也沒辦法')
    },
    signin () {
      const loadingMsgId = Math.floor(new Date() / 1000)
      this.$bus.$emit('message:show', '登入中...', loadingMsgId, 'info')
      const api = 'https://brycehuang.com/api/rest/loginAccount/'
      const vm = this
      // console.log(api)
      const formdata = new FormData()
      formdata.append('username', vm.username)
      formdata.append('password', vm.password)
      this.$http.post(api, formdata).then((response) => {
        // console.log(response.data)
        if (response.data.result === 'successful') {
          const token = response.data.data.token
          // console.log(token)
          this.$bus.$emit('message:remove', loadingMsgId)
          this.$cookies.set('token', token)
          this.$router.push('/foodpocket')
        } else {
          this.$bus.$emit('message:remove', loadingMsgId)
          this.$bus.$emit('message:push', '帳號或密碼輸入錯誤，請再試一次', 'danger')
          this.password = ''
        }
      }).catch(() => {
        this.$bus.$emit('message:remove', loadingMsgId)
        this.$bus.$emit('message:push', '網路異常，請稍候再試', 'danger')
      })
    }
  },
  components: {
    bus
  }
}
</script>

<style lang="scss" scoped>

* {
  margin: 0;
}

.login {
  min-height: 100vh;
  height: 100%;
  background-color: $background;
  .container {
    margin: auto;
    padding-top: 50px;
    width: 90%;
    .form {
      width: 100%;
      color: #555;
      .logo-wrapper {
        width: 100%;
        height: 7rem;
        margin-bottom: 0vw;
        object-fit: contain;
        display: flex;
        align-items: center;
        justify-content: center;

        .logo {
          height: 100%;
        }
      }
      h2 {
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #000;
        font-family: 'Monda', sans-serif;
      }
      h2:hover{
        cursor: pointer;
      }
      .group {
        margin-bottom: 20px;
        label {
          line-height: 3;
        }
        input {
          background-color: $primary;
          font-size: 16px;
          width: 100%;
          border-radius: 25px;
          line-height: 2;
          outline: none;
          border: none;
          padding: 5px 15px;
        }
        input:focus {
          outline: none;
        }
        input::placeholder{
          color: $background;
        }
      }
      .login-btn{
        background-color: $point;
        color: $background;
        width: 100%;
        margin-top: 50px;
        outline: none;
      }
      .btn:focus {
          outline: none;
      }
      .register-btn{
        margin-top: 20px;
        outline: none;
      }
      .forget-btn{
        position: fixed;
        bottom: 10px;
        left: 10px;
      }
    }
  }
}
</style>

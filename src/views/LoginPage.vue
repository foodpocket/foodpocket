<template>
  <div class="login">
    <bus/>
    <div class="wrap">
      <div class="container">
        <form class="form" @submit.prevent="signin">
          <div class="logo-wrapper">
            <img class="logo" :src="foodPocketLogo" />
          </div>
          <h2>FoodPocket</h2>
          <div class="group">
            <label for="user_id">帳號</label>
            <input type="text" id="user_id" placeholder="請輸入帳號" v-model="username"/>
          </div>
          <div class="group">
            <label for="user_password">密碼</label>
            <input type="password" id="user_password" placeholder="請輸入密碼" v-model="password"/>
          </div>
          <button type="submit" class="btn login-btn">登入</button>
          <a class="btn forget-btn" @click.prevent="forget">忘記密碼</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/components/bus.vue'
import foodPocketLogo from '@/assets/foodpocket_logo.png'

export default {
  data () {
    return {
      foodPocketLogo,
      username: '',
      password: ''
    }
  },
  methods: {
    clear: function () {
      this.username = ''
      this.password = ''
    },
    forget () {
      window.alert('你忘記密碼我也沒辦法')
    },
    signin: function () {
      this.$bus.$emit('message:push', '請稍等', 'info')
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
          this.$cookies.set('token', token)
          this.$router.push('/foodpocket')
        } else {
          window.alert('帳號或密碼輸入錯誤，請再試一次')
          this.password = ''
        }
      })
    }
  },
  components: {
    bus
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Monda&display=swap');

$background:#FCFBEF;
$primary:#C19969;
$second:#C8BCA0;
$point:#4B2D16;

* {
  margin: 0;
}

.login {
  background-color: $background;
  #nav {
    padding: 30px;
    font-size: 1.6rem;
  }
  .wrap {
    .container {
      margin: 3vw auto;
      padding: 50px 30px;
      width: 90%;
      border-radius: 10px;
      .form {
        width: 100%;
        color: #555;
        .logo-wrapper {
          width: 100%;
          height: 30vw;
          margin-bottom: 5vw;
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
        .group {
          margin-bottom: 20px;
          label {
            line-height: 3;
          }
          input {
            background-color: #C19969;
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
        .forget-btn{
          margin-top: 20px;
          outline: none;
        }
      }
    }
  }
}
</style>

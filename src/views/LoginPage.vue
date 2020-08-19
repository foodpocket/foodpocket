<template>
  <div class="login">
    <div id="nav">
      FoodPocket 食物口袋
    </div>
    <Alert/>
    <div class="wrap">
      <div class="container">
        <form class="form" @submit.prevent="signin">
          <h2>會員登入</h2>
          <div class="group">
            <label for="user_id">帳號</label>
            <input type="text" id="user_id" placeholder="請輸入帳號" v-model="username"/>
          </div>
          <div class="group">
            <label for="user_password">密碼</label>
            <input type="password" id="user_password" placeholder="請輸入密碼" v-model="password"/>
          </div>
          <div class="login-group">
            <button type="button" class="btn btn-dark" @click="clear">取消</button>
            <button type="submit" class="btn btn-primary">登入</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '@/components/Alertmessages.vue'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    clear: function () {
      this.username = ''
      this.password = ''
    },
    signin: function () {
      this.$bus.$emit('message:push', '請稍等', 'danger')
      const api = 'https://brycehuang.com/api/rest/loginAccount/'
      const vm = this
      console.log(api)
      const formdata = new FormData()
      formdata.append('username', vm.username)
      formdata.append('password', vm.password)
      this.$http.post(api, formdata).then((response) => {
        console.log(response.data)
        if (response.data.result === 'successful') {
          const token = response.data.data.token
          console.log(token)
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
    Alert
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
}

.login {
  #nav {
    padding: 30px;
    font-size: 1.6rem;
  }
  .wrap {
    .container {
      margin: 0px auto;
      padding: 50px 30px;
      width: 90%;
      // border: #000 1px solid;
      border-radius: 10px;
      box-shadow: 0 0 5px #aaa;
      .form {
        width: 100%;
        color: #555;
        h2 {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #aaa;
        }
        .group {
          margin-bottom: 20px;
          label {
            line-height: 3;
          }
          input {
            font-size: 16px;
            width: 100%;
            border-radius: 5px;
            border: 1px solid #aaa;
            line-height: 2;
            padding: 0 10px;
          }
          input:focus {
            outline: none;
          }
        }
        .login-group {
          font-size: 0;
          margin-top: 50px;
          .btn {
            width: 100px;
          }
          .btn:focus {
            outline: none;
          }
          .btn + .btn {
            margin-left: 20px;
          }
        }
      }
    }
  }
}
</style>

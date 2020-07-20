<template>
  <div class="login">
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
          <div class="btn-group">
            <button type="button" class="btn">取消</button>
            <button type="submit" class="btn">登入</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signin: function () {
      const api = 'https://brycehuang.com/api/rest/loginAccount/'
      const vm = this
      console.log(api)
      const formdata = new FormData()
      formdata.append('username', vm.username)
      formdata.append('password', vm.password)
      this.$http.post(api, formdata).then((response) => {
        console.log(response.data)
        if (response.data.result === 'successful') {
          this.$router.push('/foodpocket')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
}

.login {
  background: url("https://picsum.photos/500/500?random=16");
  height: 100%;
  width: 100%;
  background-size: 100% 100%;
  .wrap {
    padding: 30px 0;
    .container {
      width: 90%;
      margin: 40px auto;
      height: 100%;
      padding: 30px;
      background-color: rgba(0, 0, 0, 0.5);
      border: #fff 5px solid;
      border-radius: 10px;
      box-shadow: 0 0 15px #000;
      // -webkit-backdrop-filter: blur(3px);
      // backdrop-filter: blur(3px);
      .form {
        width: 100%;
        color: #fff;
        h2 {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #fff;
        }
        .group {
          margin-bottom: 20px;
          label {
            line-height: 2;
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
        .btn-group {
          font-size: 0;
          margin-top: 50px;
          .btn {
            border: none;
            font-size: 20px;
            border-radius: 5px;
            background-color: #edab19;
            width: 100px;
            padding: 5px 0;
          }
          .btn:focus {
            outline: none;
          }
          .btn:hover {
            background-color: #d27575;
            color: #fff;
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

<template>
  <body id="poster">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">系统登录</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.account"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      responseResult: [],
      apiUrl: config.apiUrl
    }
  },

  methods: {
    login () {
      if (this.loginForm.account.trim() == null || this.loginForm.account.trim() === '') {
        this.$alertMessage('error', '请填写用户名！', true)
        return
      }
      if (this.loginForm.password.trim() == null || this.loginForm.password.trim() === '') {
        this.$alertMessage('error', '请填写密码！', true)
        return
      }
      let input = {
        info: {
          'usercode': '', 'token': ''
        },
        data: {
          'account': this.loginForm.account,
          'password': this.md5(this.loginForm.password)
        }
      }
      console.log(input)
      this.post('/login/checkLogin', input, 1).then(
        (data) => {
          if (data.info.code === '0') {
            let usercode = data.data.usercode
            if (usercode) {
              localStorage.setItem('usercode', usercode)
            }
            let nickname = data.data.nickname
            if (nickname) {
              localStorage.setItem('nickname', nickname)
            }
            let avatarurl = data.data.avatarurl
            if (avatarurl) {
              localStorage.setItem('avatarurl', avatarurl)
            }
            this.$alertMessage('success', '成功', true)
            this.$router.push({path: '/'})
          } else {
            this.$alertMessage('error', data.info.errMsg, true)
          }
        }
      )
    }
  }
}
</script>

<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  #poster {
    background:url("../assets/eva.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }

</style>

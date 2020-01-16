<template>
  <body>
  <el-card class="box-card" body-style="margin:0 auto;padding:0">
    <div class="mdl-card__media"><img class="article-image" width="100%" src="../assets/eva.jpg" border="0" alt="我是图"/></div>
    <el-form ref="form" :model="form" :rules="rules" style="margin: 10px;width: 95%" label-width="20%">
      <el-form-item style="text-align: right">
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="主页名称" prop="sidename">
        <el-input v-model="form.sidename"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.sexCode" placeholder="请选择..." style="width: 100%;">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item label="住址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="QQ号码">
        <el-input v-model="form.qq"></el-input>
      </el-form-item>
      <el-form-item label="微信号码">
        <el-input v-model="form.weixin"></el-input>
      </el-form-item>
      <el-form-item label="微博号码">
        <el-input v-model="form.weibo"></el-input>
      </el-form-item>
    </el-form>
  </el-card>
  </body>

</template>

<script>
export default {
  name: 'userinfo',
  data () {
    return {
      form: {
        accountId: null,
        nickname: '',
        name: '',
        sexCode: null,
        birthday: null,
        telephone: '',
        email: '',
        qq: '',
        address: '',
        weixin: '',
        weibo: '',
        sidename: '',
        id: null,
        avatarurl: ''
      },
      rules: {
        nickname: [
          {required: true, message: '请输入昵称', trigger: 'blur'}
        ],
        sidename: [
          {required: true, message: '请输入主页名称', trigger: 'blur'}
        ]
      }
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let input = {
            info: {
              'usercode': localStorage.getItem('usercode')
            },
            data: {
              'userinfo': JSON.stringify(this.form)
            }
          }
          this.post('/userinfo/updateUserinfo', input, 1).then(
            (data) => {
              if (parseInt(data.info.code) < 0 && parseInt(data.info.code) > -200) {
                localStorage.removeItem('usercode')
                localStorage.removeItem('token')
                localStorage.removeItem('nickname')
                localStorage.removeItem('avatarurl')
                this.isLogin = false
                this.$alertMessage('error', data.info.errMsg, true)
                this.$router.push({path: '/login'})
              }
              this.$alertMessage('success', '信息已更新！', true)
              this.init()
            })
        } else {
          this.$alertMessage('warning', '请检查必填项！', true)
          return false
        }
      })
    },
    resetForm (form) {
      this.$refs[form].resetFields()
    },
    init () {
      let input = {
        info: {
          'usercode': localStorage.getItem('usercode')
        },
        data: {
        }
      }
      this.get('/userinfo/getUserinfo', input, 1).then(
        (data) => {
          // console.log(data)
          if (parseInt(data.info.code) < 0 && parseInt(data.info.code) > -200) {
            localStorage.removeItem('usercode')
            localStorage.removeItem('token')
            localStorage.removeItem('nickname')
            localStorage.removeItem('avatarurl')
            this.isLogin = false
            this.$alertMessage('error', data.info.errMsg, true)
            this.$router.push({path: '/login'})
          }
          for (var item in data.data) {
            this.form[item] = data.data[item]
          }
        })
    }
  }
}
</script>

<style scoped>
  .box-card {
    width: 600px;
    margin: 0px auto;
  }
</style>

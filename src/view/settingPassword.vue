<template>
  <el-card class="box-card" style="width: 400px">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" width="100px">
      <el-form-item label="旧密码" prop="oldPass">
        <el-input type="password" v-model="ruleForm.oldPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </el-card>
</template>

<script>
export default {
  name: 'settingPassword',
  data () {
    var checkOldPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('旧密码不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        oldPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        oldPass: [
          { validator: checkOldPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let input = {
            info: {
              'usercode': localStorage.getItem('usercode')
            },
            data: {
              oldPass: this.md5(this.ruleForm.oldPass),
              pass: this.md5(this.ruleForm.pass),
              checkPass: this.md5(this.ruleForm.checkPass)
            }
          }
          this.post('/login/changePassword', input, 1).then(
            (data) => {
              if (parseInt(data.info.code) < 0 && parseInt(data.info.code) > -200) {
                localStorage.removeItem('usercode')
                localStorage.removeItem('token')
                localStorage.removeItem('nickname')
                localStorage.removeItem('avatarurl')
                this.isLogin = false
                this.$alertMessage('error', data.info.errMsg, true)
                this.$router.push({path: '/login'})
              } else if (parseInt(data.info.code) < 0) {
                this.$alertMessage('error', data.info.errMsg, true)
                return
              }
              this.$alertMessage('success', '密码已更新！', true)
              this.resetForm('ruleForm')
            })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <el-table style="width: 100%;" :header-cell-style="{background:'#545c64',color:'#fff',height:'48px'}"  height="48px">
    <el-table-column align="center">
      <template slot="header" slot-scope="scope">
        <div><div><span>好好学习，天天向上！</span></div></div>
      </template>
    </el-table-column>
    <el-table-column align="right" width="160px">
      <template slot="header" slot-scope="scope">
        <div v-if="!isLogin"><div><span v-on:click="login" >登录</span></div></div>
        <div v-if="isLogin">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <span><el-avatar shape="square" :size="30" :fit="fit" :src="url"></el-avatar></span>
              <span>{{nickname}}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user" command="i">个人信息</el-dropdown-item>
              <el-dropdown-item icon="el-icon-setting" command="s">设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-close" command="e">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!--<span v-on:click="logout">注销</span> -->
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  inject: ['reload'],
  name: 'Header',
  data () {
    return {
      isLogin: false,
      nickname: '',
      url: ''

    }
  },
  created: function () {
    this.init()
  },
  methods: {
    login () {
      this.$router.push({path: '/login'})
    },
    logout () {
      let input = {
        info: {
          'usercode': localStorage.getItem('usercode'),
          'token': localStorage.getItem('token')
        }
      }
      this.post('/login/logOut', input, 1).then(
        (data) => {
          if (data.info.code >= '0') {
            localStorage.removeItem('usercode')
            localStorage.removeItem('token')
            localStorage.removeItem('nickname')
            localStorage.removeItem('avatarurl')
            this.isLogin = false
            this.nickname = ''
            this.url = ''
            this.$alertMessage('success', '注销成功', true)
            // this.init()
            // this.reload()
          } else {
            this.$alertMessage('error', data.info.errMsg, true)
          }
        }
      )
    },
    init () {
      if (localStorage.getItem('token') && localStorage.getItem('nickname')) {
        this.isLogin = true
        this.nickname = localStorage.getItem('nickname')
        this.url = localStorage.getItem('avatarurl')
      } else {
        this.isLogin = false
        this.nickname = ''
        this.url = ''
      }
    },
    handleCommand (command) {
      switch (command) {
        case 'e':
          // 注销
          this.logout()
          break
        case 'i':
          // 个人信息
          this.$alertMessage('info', '个人信息', true)
          break
        case 's':
          // 设置
          this.$alertMessage('info', '设置', true)
          break
      }
    }
  }
}
</script>

<style>
  body .el-table th.gutter{
    background-color:#545c64;
    display: table-cell!important;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #ffffff;
  }

</style>

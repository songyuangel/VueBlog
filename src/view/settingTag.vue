<template>
  <el-card class="box-card" style="width: 400px">
    <el-tag
      :key="tag.id"
      v-for="tag in tags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag.id)"
      style="margin-bottom: 10px">
      {{tag.tag}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag"  @click="showInput">+ 新标签</el-button>
  </el-card>
</template>

<script>
export default {
  name: 'settingTag',
  data () {
    return {
      tags: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    queryAllTag () {
      let input = {
        info: {
          'usercode': localStorage.getItem('usercode')
        },
        data: {
        }
      }
      this.post('/tag/queryAllTag', input, 1).then(
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
          this.tags = data.data.tags
        })
    },
    handleClose (tag) { // 删除标签
      let input = {
        info: {
          'usercode': localStorage.getItem('usercode')
        },
        data: {
          tagId: tag
        }
      }
      this.post('/tag/deleteTag', input, 1).then(
        (data) => {
          if (parseInt(data.info.code) < 0 && parseInt(data.info.code) > -200) {
            localStorage.removeItem('usercode')
            localStorage.removeItem('token')
            localStorage.removeItem('nickname')
            localStorage.removeItem('avatarurl')
            this.isLogin = false
            this.$alertMessage('error', data.info.errMsg, true)
            this.$router.push({path: '/login'})
          } else if (parseInt(data.info.code) === 0) {
            this.$alertMessage('success', '标签已删除！', true)
            this.queryAllTag()
          } else {
            this.$alertMessage('error', data.info.errMsg, true)
          }
        })
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        let input = {
          info: {
            'usercode': localStorage.getItem('usercode')
          },
          data: {
            tagName: inputValue
          }
        }
        this.post('/tag/addTag', input, 1).then(
          (data) => {
            if (parseInt(data.info.code) < 0 && parseInt(data.info.code) > -200) {
              localStorage.removeItem('usercode')
              localStorage.removeItem('token')
              localStorage.removeItem('nickname')
              localStorage.removeItem('avatarurl')
              this.isLogin = false
              this.$alertMessage('error', data.info.errMsg, true)
              this.$router.push({path: '/login'})
            } else if (parseInt(data.info.code) === 0) {
              this.$alertMessage('success', '标签已添加！', true)
              this.queryAllTag()
            } else {
              this.$alertMessage('error', data.info.errMsg, true)
            }
          })
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  },
  created: function () {
    this.queryAllTag()
  }
}
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

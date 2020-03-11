<template>
  <div>
  <el-row :gutter="20" >
    <el-col  v-for="(category,index) in categories" :key="category.id" :offset="0" style="margin-bottom:10px;width: 180px">
      <el-card :body-style="{ padding: '0px' }" shadow="always" style="height: 80px" >
        <div @mousemove="mv(index)" @mouseleave="mv(-1)" style="position: absolute;">
          <span style="line-height:80px;display:block;width:170px;margin:0 auto">{{category.category}}</span>
          <div :class="index==showindex?'maskshow':'maskhide'">
            <el-button type="text" class="button" @click="updateCategoryDiag(category)">修改</el-button>
            &#8195;
            <!-- <el-button type="text" class="button">删除</el-button> -->
            <el-popover
              placement="bottom"
              width="160"
            >
              <p>内容确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button type="primary" size="mini" @click="deleteCategory(category.id)">确定</el-button>
              </div>
              <el-button type="text" class="button" slot="reference">删除</el-button>
            </el-popover>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col  :offset="0" style="margin-bottom:10px;width: 180px">
      <el-card :body-style="{ padding: '0px'}" shadow="always" style="height: 80px">
        <div @click="dialogNewVisible = true">
          <span style="line-height:80px">新类别</span>
        </div>
      </el-card>
    </el-col>

  </el-row>
  <el-dialog title="新增类别" :visible.sync="dialogNewVisible" width="500px">
    <el-form :model="form">
      <el-form-item label="新类别：" :label-width="formLabelWidth">
        <el-input v-model="form.category" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeNewdiag">取 消</el-button>
      <el-button type="primary" @click="newCategory">确 定</el-button>
    </div>
  </el-dialog>
    <el-dialog title="修改类别名称" :visible.sync="dialogUpdateVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="id" v-show="false">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新类别：" :label-width="formLabelWidth">
          <el-input v-model="form.category" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeUpdatediag">取 消</el-button>
        <el-button type="primary" @click="updateCategory">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'settingCategory',
  data () {
    return {
      categories: [],
      form: {
        id: null,
        category: ''
      },
      dialogNewVisible: false,
      dialogUpdateVisible: false,
      formLabelWidth: '120px',
      showindex: -1
    }
  },
  methods: {
    queryAllCategory () {
      let input = {
        info: {
          'usercode': localStorage.getItem('usercode')
        },
        data: {
        }
      }
      this.post('/category/queryAllCategory', input, 1).then(
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
          this.categories = data.data.categories
        })
    },
    newCategory () {
      let input = {
        info: {
          'usercode': localStorage.getItem('usercode')
        },
        data: {
          category: this.form.category
        }
      }
      this.post('/category/addCategory', input, 1).then(
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
            this.closeNewdiag()
            this.$alertMessage('success', '类别已添加！', true)
            this.queryAllCategory()
          } else {
            this.$alertMessage('error', data.info.errMsg, true)
          }
        })
    },
    updateCategoryDiag (category) {
      this.form.id = category.id
      this.form.category = category.category
      this.dialogUpdateVisible = true
    },
    updateCategory () {
      let input = {
        info: {
          'usercode': localStorage.getItem('usercode')
        },
        data: {
          id: this.form.id,
          category: this.form.category
        }
      }
      this.post('/category/updateCategory', input, 1).then(
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
            this.closeUpdatediag()
            this.$alertMessage('success', '类别已修改！', true)
            this.queryAllCategory()
          } else {
            this.$alertMessage('error', data.info.errMsg, true)
          }
        })
    },
    deleteCategory (id) {
      let input = {
        info: {
          'usercode': localStorage.getItem('usercode')
        },
        data: {
          id: id
        }
      }
      this.post('/category/deleteCategory', input, 1).then(
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
            this.dialogUpdateVisible = false
            this.$alertMessage('success', '类别已删除！', true)
            this.queryAllCategory()
          } else {
            this.$alertMessage('error', data.info.errMsg, true)
          }
        })
    },
    closeNewdiag () {
      this.form = {
        id: null,
        category: ''
      }
      this.dialogNewVisible = false
    },
    closeUpdatediag () {
      this.form = {
        id: null,
        category: ''
      }
      this.dialogUpdateVisible = false
    },
    mv (index) {
      this.showindex = index
    }
  },
  created: function () {
    this.queryAllCategory()
  }
}
</script>

<style scoped>
  .button {
    padding: 0;
    float: right;
  }
  .maskhide{
    position: relative;
    bottom: 20px;
    left: -20px;
    opacity: 0;
  }
  .maskshow{
    position: relative;
    bottom: 20px;
    left: -20px;
    background-size: cover;
    opacity: 1;
  }

</style>

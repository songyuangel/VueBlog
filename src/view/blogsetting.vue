<template>
  <el-container class="box-card" style="height: 100%; border: 1px solid #eee;">
    <el-header style="height: 100%;padding:0"><div><img class="article-image" width="100%" src="../assets/eva.jpg" border="0" alt="我是图" style="display:block;"/></div></el-header>
    <el-container>
    <el-aside width="200px" height="100%" style="background-color: rgb(238, 241, 246)">
      <el-row class="tac">
        <el-col >
      <el-menu
        :default-active="this.$route.path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border: 0;margin: 0;padding:0"
        router>
        <el-menu-item index="/blogsetting/settingCategory">
          <template slot="title">
            <i class="el-icon-s-operation"></i>
            <span>类别设置</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/blogsetting/settingTag">
          <template slot="title">
            <i class="el-icon-collection-tag"></i>
            <span>标签设置</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/blogsetting/settingPassword">
          <template slot="title">
            <i class="el-icon-lock"></i>
            <span>修改密码</span>
          </template>
        </el-menu-item>
      </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px"></el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'blogsetting'
}
</script>

<style scoped>
  .box-card {
    width: 800px;
    margin: 0px auto;
  }
  .el-menu-vertical-demo {
    height: 400px;
  }
</style>

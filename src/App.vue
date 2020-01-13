<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div v-if="$route.meta.keepAlive" >
        <Header/>
    </div>
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
import Header from '@/components/Common/Header'
export default {
  name: 'App',
  components: {Header},
  comments: {
    Header
  },
  provide () { // 父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true // 控制视图是否显示的变量
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false // 先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true // 再打开
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  margin: 0px;
}
</style>

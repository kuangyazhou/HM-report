<template>
  <div class="hm-header-contaner">
    <header class="hm-main-navbar">
      <div class="inner-container">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <nuxt-link to="/">
              <img class="hm-img-logo" src="../assets/img/logo-hemiao.png" alt="禾苗">
            </nuxt-link>
            <el-button type="info" v-if="$store.state.forbid" style="margin-left: 55px;">大屏指挥中心</el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <div class="hm-sub-nav-item" v-if="$store.state.authUser">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  欢迎使用本系统,
                  <span style="color: #F7BA2A;">{{loginedUser}}</span>
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人资料</el-dropdown-item>
                  <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-col>
      </div>
    </header>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  Button,
  Col,
  Row,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Message
} from 'element-ui'

Vue.use(Button)
Vue.use(Col)
Vue.use(Row)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)

export default {
  computed: {
    loginedUser: function() {
      return this.$store.state.authUser
    }
  },
  methods: {
    toDashboard() {
      window.location.href = '/'
    },
    handleCommand(command) {
      switch (command) {
        case 'logout':
          this.$store.dispatch('logout').then(() => (window.location.href = '/login'))
          break
        default:
          Message.error({
            duration: 2000,
            message: '该功能正在抓紧时间开发中...'
          })
          break
      }
    }
  }
}
</script>

<style scoped>
.hm-main-navbar {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: linear-gradient(to right, #245dd0, #6393e5);
  color: #fff;
  top: 0;
  left: 0;
  z-index: 100;
}

.hm-main-navbar .inner-container {
  padding: 0 10px;
}

.hm-img-logo {
  position: relative;
  max-width: 100%;
  width: 110px;
  top: 6px;
  left: 10px;
}

.hm-sub-nav-item {
  float: right;
}

.hm-sub-nav-item .el-dropdown {
  color: white;
}
</style>

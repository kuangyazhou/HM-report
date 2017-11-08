<template>
  <div class="hm-protal-container">
    <HMHeader></HMHeader>
    <el-row :gutter="10" style="background: rgb(255, 255, 255);">
      <el-col :span="4" style="padding-right: 0; border-right: 1px solid #dedede;" class="sidebar">
        <HMSidebar />
      </el-col>
      <el-col :span="20" style="background: #edf0f7; padding-left: 0;">
        <nuxt/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import { Row, Col } from 'element-ui'
import HMHeader from '~components/Header.vue'
import HMSidebar from '~components/Sidebar.vue'

Vue.use(Row)
Vue.use(Col)

export default {
  components: {
    HMHeader, HMSidebar
  },
  data() {
    // const self = this
    // Add a request interceptor
    axios.interceptors.request.use(function(config) {
      // if (config.url.indexOf('storePemployee') === -1) {
      //   self.$store.dispatch('dispatchLoadingStatus', true)
      // }
      return config
    }, function(error) {
      // self.$store.dispatch('dispatchLoadingStatus', false)
      return Promise.reject(error)
    })

    // Add a response interceptor
    axios.interceptors.response.use(function(response) {
      // self.$store.dispatch('dispatchLoadingStatus', false)
      return response
    }, function(error) {
      // self.$store.dispatch('dispatchLoadingStatus', false)
      return Promise.reject(error)
    })

    return {}
  }
}
</script>

<style scoped>
.sidebar {
  max-width: 200px;
}
</style>

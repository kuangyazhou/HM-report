<template>
  <div class="hm-protal-container">
    <el-row :gutter="10">
      <el-col :span="24">
        <nuxt />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { Row, Col } from 'element-ui'

Vue.use(Row)
Vue.use(Col)

export default {
  data () {
    return {}
  }
}
</script>

<style scoped>
  
</style>

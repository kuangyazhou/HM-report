<template>
  <el-menu mode="vertical" @select="handleMenuSelect" :default-active="activePane" style="border-radius: none;">
    <el-menu-item-group title="首页">
      <el-menu-item index="homePage">
        <i class="fa fa-home"></i>首页
      </el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="全局分析">
      <el-menu-item index="global-all">
        <i class="fa fa-globe"></i>整体数据</el-menu-item>
      <el-menu-item index="global-single-store">
        <i class="fa fa-shopping-basket"></i>单店数据</el-menu-item>
      <el-menu-item index="global-single-person">
        <i class="fa fa-id-card-o"></i>单人数据</el-menu-item>
    </el-menu-item-group>
    <!-- <el-menu-item-group title="商品分析">
          <el-menu-item>
            <i class="fa fa-cubes" aria-hidden="true"></i>品类数据</el-menu-item>
          <el-menu-item index="product-brands">
            <i class="fa fa-cubes" aria-hidden="true"></i>品牌数据</el-menu-item>
          <el-menu-item index="product-series">
            <i class="fa fa-cubes" aria-hidden="true"></i>系列数据</el-menu-item>
          <el-menu-item index="product-single">
            <i class="fa fa-cubes" aria-hidden="true"></i>单品数据</el-menu-item>
        </el-menu-item-group> -->
    <!-- <el-menu-item-group title="销售分析">
          <el-menu-item index="sale-all">
            <i class="fa fa-globe"></i>整体数据</el-menu-item>
          <el-menu-item index="sale-single-store">
            <i class="fa fa-shopping-basket"></i>单店数据</el-menu-item>
          <el-menu-item index="sale-single-person">
            <i class="fa fa-id-card-o"></i>单人数据</el-menu-item>
        </el-menu-item-group> -->
    <el-menu-item-group title="会员分析">
      <el-menu-item index="member-feature">
        <i class="fa fa-user-circle"></i>会员特征</el-menu-item>
      <el-menu-item index="member-rebuy">
        <i class="fa fa-paypal"></i>会员复购</el-menu-item>
      <el-menu-item index="member-consum">
        <i class="fa fa-rss"></i>消费情况</el-menu-item>
    </el-menu-item-group>
    <!-- 
        <el-menu-item-group title="员工分析">
          <el-menu-item index="employee-sales">
            <i class="fa fa-money" aria-hidden="true"></i>销售数据</el-menu-item>
          <el-menu-item index="employee-members">
            <i class="fa fa-venus-double" aria-hidden="true"></i>会员数据</el-menu-item>
        </el-menu-item-group> -->
  </el-menu>
</template>

<script>
import Vue from 'vue'
import {
  Menu,
  Submenu,
  Button,
  MenuItem,
  MenuItemGroup,
  Col,
  Row
} from 'element-ui'

Vue.use(Button)
Vue.use(Col)
Vue.use(Row)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)

export default {
  components: {},
  data() { return { activePane: this.$route.params.name } },
  methods: {
    handleMenuSelect(index) {
      window.location.href = `/reports/${index}`
    }
  }
}
</script>

<style scoped>

</style>

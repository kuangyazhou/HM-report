<template>
  <el-menu mode="vertical" @select="handleMenuSelect" :default-active="activePane" style="border-radius: none;">
    <el-menu-item-group title="首页">
      <el-menu-item index="homePage">
        <i class="fa fa-home"></i>首页
      </el-menu-item>
    </el-menu-item-group>

    <el-menu-item-group title="销售统计分析">
      <!-- <el-menu-item index="salesHot">
                <i class="fa fa-thermometer-half"></i>销售热力图
              </el-menu-item> -->
      <el-menu-item index="salesTotal">
        <i class="fa fa-line-chart"></i>总销售数据分析
      </el-menu-item>
      <el-menu-item index="salesDim">
        <i class="fa fa-bar-chart"></i>多维度销售数据分析
      </el-menu-item>
      <el-menu-item index="salesOrder">
        <i class="fa fa-calculator"></i>客户订单分析
      </el-menu-item>
      <el-menu-item index="salePrice">
        <i class="fa fa-money"></i>客户购买单价分析
      </el-menu-item>
    </el-menu-item-group>

    <el-menu-item-group title="运营统计分析">
      <el-menu-item index="operaNew">
        <i class="fa fa-retweet"></i>新客统计分析
      </el-menu-item>
      <el-menu-item index="operaNumber">
        <i class="fa fa-handshake-o"></i>维护客户交易人数
      </el-menu-item>
      <!-- <el-menu-item index="operaTimes">
        <i class="fa fa-shopping-cart"></i>客户购买次数分析
      </el-menu-item> -->
      <!-- <el-menu-item index="operaSingle">
        <i class="fa fa-money"></i>维护客户购买单价
      </el-menu-item> -->
    </el-menu-item-group>

    <el-menu-item-group title="会员统计分析">
      <el-menu-item index="memberGeo">
        <i class="fa fa-globe"></i>会员地理分析图</el-menu-item>
      <el-menu-item index="memberLife">
        <i class="fa fa-users"></i>生理轴分布</el-menu-item>
      <el-menu-item index="memberLoyal">
        <i class="fa fa-pie-chart"></i>忠诚度分析</el-menu-item>
      <el-menu-item index="search">
        <i class="fa fa-search"></i>精准搜索</el-menu-item>
    </el-menu-item-group>
  </el-menu>
</template>

<script>
import Vue from "vue";
import {
  Menu,
  Submenu,
  Button,
  MenuItem,
  MenuItemGroup,
  Col,
  Row
} from "element-ui";

Vue.use(Button);
Vue.use(Col);
Vue.use(Row);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);

export default {
  components: {},
  data() {
    return { activePane: this.$route.params.name };
  },
  methods: {
    handleMenuSelect(index) {
      window.location.href = `/reports/${index}`;
    }
  }
};
</script>

<style scoped>

</style>
      <!-- <el-menu-item index="expense">
消费分布
 </el-menu-item>
  <el-menu-item index="transform">
  客户维护转化
  </el-menu-item> -->
   <!-- </el-menu-item-group>
    <el-menu-item-group title="全局分析">
      <el-menu-item index="global-all">
        <i class="fa fa-globe"></i>整体数据</el-menu-item>
      <el-menu-item index="global-single-store">
        <i class="fa fa-shopping-basket"></i>单店数据</el-menu-item>
      <el-menu-item index="global-single-person">
        <i class="fa fa-id-card-o"></i>单人数据</el-menu-item>
    </el-menu-item-group> -->
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
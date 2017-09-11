<template>
  <div class="reports-container">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <div v-if="activePane === 'global-single-store'">
            <Filters :emitFilterChange="onFilterChange" :disableOutlet="false" :disabledEmployee="true" />
          </div>
          <div v-if="activePane === 'global-single-person'">
            <Filters :emitFilterChange="onFilterChange" :disableOutlet="false" :disabledEmployee="false" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div v-if="activePane === 'homePage'">
        <Home :todaySeries="todaySeries" />
      </div>
      <div v-if="activePane === 'global-all'">
        <Sale :currentMonthMemberLevel="currentMonthMemberLevel" :currentAndLastMonthSale="currentAndLastMonthSale" :currentAndLastYearSale="currentAndLastYearSale" :newAndOldMembersCount="newAndOldMembersCurrentMonths" :currentAndLastYearNewMembersCounts="currentAndLastYearNewMemberCounts" :topBrandSale="top20BrandSeries" :topOutletSale="top20OutletSeries" :currentYearDate="currentYearDate" :currentMonthDate="currentMonthDate" :currentMonth="currentMonth" :isloading="isloading" />
      </div>
      <div v-if="activePane === 'global-single-store'">
        <SaleOutlet :currentAndLastYearOutletSale="currentAndLastYearOutletSale" :currentAndLastMonthOutletSale="currentAndLastMonthOutletSale" :currentAndLastYearNewMemberCountsByOutlet="currentAndLastYearNewMemberCountsByOutlet" :currentMonthMemberLevelByOutlet="currentMonthMemberLevelByOutlet" :newAndOldMembersCountByOutlet="newAndOldMembersCurrentMonthsByOutlet" :top20BrandSeriesByOutlet="top20BrandSeriesByOutlet" :currentYearDate="currentYearDate" :currentMonthDate="currentMonthDate" :currentMonth="currentMonth" :outletName="outlet" />
      </div>
      <div v-if="activePane === 'global-single-person'">
        <SaleEmployee :currentAndLastMonthEmpSale="currentAndLastMonthEmpSale" :currentAndLastYearNewMemberCountsByEmp="currentAndLastYearNewMemberCountsByEmp" :currentAndLastMonthSaleTaskProcessByEmp="currentAndLastMonthSaleTaskProcessByEmp" :newAndOldMembersCurrentMonthsByEmp="newAndOldMembersCurrentMonthsByEmp" :currentMonthMemberLevelByEmp="currentMonthMemberLevelByEmp" :top20BrandSeriesByEmp="top20BrandSeriesByEmp" :top20GoodsSeriesByEmp="top20GoodsSeriesByEmp" :currentYearDate="currentYearDate" :currentMonthDate="currentMonthDate" :currentMonth="currentMonth" :outletEmp="outletEmp" />
      </div>
      <div v-if="activePane === 'member-feature'">
        <Members :bySex="bySex" :byAge="byAge" :byMoney="byMoney" :byActive="byActive" :byTime="byTime" />
        <!---->
      </div>
      <div v-if="activePane === 'member-rebuy'">
        <ReBuy :reBuyCountSeries="reBuyCountSeries" :reBuyHzSeries="reBuyHzSeries" :goodsSeries="goodsSeries" :typeSeries="typeSeries" :brnadSeries="brnadSeries" />
        <!---->
      </div>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import Filters from '~components/commons/Filters.vue'
import currencyFormatter from 'currency-formatter'
import {
  Button,
  Col,
  Row
} from 'element-ui'



//全局分析模板
import Sale from '~components/reports/sales.vue'
import SaleOutlet from '~components/reports/sales.outlet.vue'
import SaleEmployee from '~components/reports/sales.employee.vue'
//会员分析模板
import Members from '~components/reports/member.feature.vue'
import ReBuy from '~components/reports/member.rebuy.vue'

//首页
import Home from '~components/reports/homePage.vue'

Vue.use(Button)
Vue.use(Col)
Vue.use(Row)

export default {
  layout: 'master',
  middleware: 'check-auth',
  components: { Sale, Filters, SaleOutlet, SaleEmployee, Members, ReBuy, Home },
  validate({ params, query, store }) {
    let isValidate = false
    switch (params.name) {
      case 'global-all':
      case 'global-single-store':
      case 'global-single-person':
        isValidate = true
        break;
      case 'member-feature':
        isValidate = true
        break;
      case 'member-rebuy':
        isValidate = true
        break;
      case 'homePage':
        // console.log('homepage')
        isValidate = true
        break;
      default:
        isValidate = false
        break
    }
    return isValidate
  },
  mounted() {
    // console.log(this.$store.state.storeCode, this.$route.query);
    if (this.$route.query.storecode) {
      // console.log(this.$store.state.authUser);
      this.$store.state.forbid = false;
      this.$store.state.storeCode = this.$route.query.storecode;
      this.$store.state.authUser = this.$route.query.user;
      console.log('跳转,绕过登录')
    };
    // this.$store.dispatch('report/login');
    switch (this.$route.params.name) {
      case 'homePage':
        this.$store.dispatch('report/getTodayNewMember', { storecode: this.$store.state.storeCode })
      case 'global-all':
        this.$store.dispatch(
          'report/getCurrLastMonthSaleAmount',
          { storecode: this.$store.state.storeCode })
        // ----------------------------------- //
        this.$store.dispatch(
          'report/getCurrLastYearSaleAmount',
          { storecode: this.$store.state.storeCode })
        // ----------------------------------- //
        this.$store.dispatch(
          'report/getTOP20OutletSale',
          { storecode: this.$store.state.storeCode })
        // ----------------------------------- //
        this.$store.dispatch(
          'report/getTOP20BrandSale',
          { storecode: this.$store.state.storeCode })
        // ----------------------------------- //
        this.$store.dispatch(
          'report/getOldAndNewMembersCounts',
          { storecode: this.$store.state.storeCode })
        // ----------------------------------- //
        this.$store.dispatch(
          'report/getNewMembersCounts',
          { storecode: this.$store.state.storeCode })
        // ----------------------------------- //
        this.$store.dispatch(
          'report/getCurrentMonthMemberLevel',
          { storecode: this.$store.state.storeCode })
        // ----------------------------------- //
        break
      case 'member-feature':
        this.$store.dispatch(
          'report/getFeatureByAll',
          { storecode: this.storeCode })
        break;
      case 'member-rebuy':
        // console.log('rebuy')
        this.$store.dispatch('report/getMemberReBuy', { storecode: this.storeCode })
        // ----------------------------------- //
        this.$store.dispatch('report/getRebuyGoods', { storecode: this.storeCode })
        // ----------------------------------- //
        this.$store.dispatch('report/getRebuyType', { storecode: this.storeCode })
        // ----------------------------------- //
        this.$store.dispatch('report/getRebuyBrand', { storecode: this.storeCode })
        break;
      default:
        break
    }
  },
  computed: {
    // 本月会员消费等级人数分布占比(饼图)
    currentMonthMemberLevel() {
      const months = this.currentMonthDate.split('/');
      const levels = [
        {
          type: 'pie',
          name: '会员消费等级人数分布占比',
          data: []
        }];
      let datas = this.$store.state.report.datasource.currentMonthMemberLevel;
      datas.forEach((data) => {
        switch (data.hemiao_Level) {
          case 'level0':
            levels[0].data.push(['低于0元', data.hemiao_count]);
            break;
          case 'level1':
            levels[0].data.push(['0-1000元', data.hemiao_count]);
            break;
          case 'level2':
            levels[0].data.push(['1000-2000元', data.hemiao_count]);
            break;
          case 'level3':
            levels[0].data.push(['2000-3000元', data.hemiao_count]);
            break;
          case 'level4':
            levels[0].data.push(['3000-5000元', data.hemiao_count]);
            break;
          case 'level5':
            levels[0].data.push(['5000-8000元', data.hemiao_count]);
            break;
          case 'level6':
            levels[0].data.push(['8000-12000元', data.hemiao_count]);
            break;
          case 'level7':
            levels[0].data.push(['12000元以上', data.hemiao_count]);
            break;
        };
      });
      // console.log(levels);
      return levels
    },
    // 本月会员消费等级人数分布占比(饼图)(按照单店来统计)
    currentMonthMemberLevelByOutlet() {
      const levels = [{
        type: 'pie',
        name: '会员消费等级人数分布占比',
        data: []
      }]
      this.$store.state.report.datasource.currentMonthMemberLevelByOutlet.forEach((level, idx) => {
        levels[0].data.push([level.hemiao_Level, level.hemiao_count]);
      })
      return levels
    },
    // 本年和去年的月度会员人数的统计
    currentAndLastYearNewMemberCounts() {
      const years = this.currentYearDate.split('/')
      const newMembersByYearSeries = [{
        type: 'bar',
        name: years[0],
        data: []
      }, {
        type: 'bar',
        name: years[1],
        data: []
      }]
      this.$store.state.report.datasource.newMembersByYear.current.forEach((amount) => {
        newMembersByYearSeries[1].data.push(amount.hemiao_count)
      })
      this.$store.state.report.datasource.newMembersByYear.past.forEach((amount) => {
        newMembersByYearSeries[0].data.push(amount.hemiao_count)
      })
      return newMembersByYearSeries
    },
    // 本年和去年的月度会员人数的统计
    currentAndLastYearNewMemberCountsByOutlet() {
      const years = this.currentYearDate.split('/')
      const newMembersByYearSeries = [{
        type: 'column',
        name: years[0],
        data: []
      }, {
        type: 'column',
        name: years[1],
        data: []
      }]
      this.$store.state.report.datasource.newMembersByYearAndOutlet.current.forEach((amount) => {
        newMembersByYearSeries[1].data.push(amount.hemiao_count)
      })
      this.$store.state.report.datasource.newMembersByYearAndOutlet.past.forEach((amount) => {
        newMembersByYearSeries[0].data.push(amount.hemiao_count)
      })
      return newMembersByYearSeries
    },
    // 本月消费会员和所有会员的统计
    newAndOldMembersCurrentMonths() {
      const months = this.currentMonthDate.split('/')
      const series = [{
        type: 'spline',
        name: months[0],
        data: []
      }, {
        type: 'spline',
        name: months[1],
        data: []
      }]
      this.$store.state.report.datasource.newAndOldMembers.old.forEach((members) => {
        series[1].data.push(members.hemiao_count)
        series[1].name = '总会员(人数)'
      })
      this.$store.state.report.datasource.newAndOldMembers.new.forEach((members) => {
        series[0].data.push(members.hemiao_count)
        series[0].name = '新消费会员(人数)'
      })
      return series
    },
    // 指定商城本月消费会员和所有会员的统计
    newAndOldMembersCurrentMonthsByOutlet() {
      const months = this.currentMonthDate.split('/')
      const series = [{
        type: 'spline',
        name: months[0],
        data: []
      }, {
        type: 'spline',
        name: months[1],
        data: []
      }]
      this.$store.state.report.datasource.newAndOldMembersByOutlet.old.forEach((members) => {
        series[1].data.push(members.hemiao_count)
        series[1].name = '总会员(人数)'
      })
      this.$store.state.report.datasource.newAndOldMembersByOutlet.new.forEach((members) => {
        series[0].data.push(members.hemiao_count)
        series[0].name = '新消费会员(人数)'
      })
      return series
    },
    // 门店所有商城的销售数据
    currentAndLastMonthSale() {
      const months = this.currentMonthDate.split('/')
      const currentAndLastMonthSaleAmountSeries = [{
        type: 'column',
        name: months[0],
        data: []
      }, {
        type: 'column',
        name: months[1],
        data: []
      }]

      //this.$store.state.report.datasource.currentAndLastMonthSaleAmount中数据都在past中，current中没有数据，解决办法暂未定
      this.$store.state.report.datasource.currentAndLastMonthSaleAmount.past.forEach((amount) => {
        if (amount.hemiao_month == (new Date()).getMonth() + 1) {
          currentAndLastMonthSaleAmountSeries[1].data.push(amount.day_price)
        }
        else {
          currentAndLastMonthSaleAmountSeries[0].data.push(amount.day_price)
        }
        // console.log(this.$store.state.report.datasource.currentAndLastMonthSaleAmount);
      })
      // this.$store.state.report.datasource.currentAndLastMonthSaleAmount.past.forEach((amount) => {
      // })
      return currentAndLastMonthSaleAmountSeries
    },
    // 门店所有商城的销售数据(年份)
    currentAndLastYearSale() {
      const years = this.currentYearDate.split('/')
      const currentAndLastYearSaleAmountSeries = [{
        type: 'column',
        name: years[0],
        data: []
      }, {
        type: 'column',
        name: years[1],
        data: []
      }]
      this.$store.state.report.datasource.currentAndLastYearSaleAmount.current.forEach((amount) => {
        currentAndLastYearSaleAmountSeries[1].data.push(amount.hemiao_amount)
      })
      this.$store.state.report.datasource.currentAndLastYearSaleAmount.past.forEach((amount) => {
        currentAndLastYearSaleAmountSeries[0].data.push(amount.hemiao_amount)
      })
      return currentAndLastYearSaleAmountSeries
    },
    // 指定商城的销售数据(年份)
    currentAndLastYearOutletSale() {
      const years = this.currentYearDate.split('/')
      const currentAndLastYearSaleAmountSeries = [{
        type: 'column',
        name: years[0],
        data: []
      }, {
        type: 'column',
        name: years[1],
        data: []
      }]
      this.$store.state.report.datasource.currentAndLastYearSaleAmountByOutlet.current.forEach((amount) => {
        currentAndLastYearSaleAmountSeries[1].data.push(amount.hemiao_amount)
      })
      this.$store.state.report.datasource.currentAndLastYearSaleAmountByOutlet.past.forEach((amount) => {
        currentAndLastYearSaleAmountSeries[0].data.push(amount.hemiao_amount)
      })
      return currentAndLastYearSaleAmountSeries
    },
    // 指定商城的本月和上月的销售对比
    currentAndLastMonthOutletSale() {
      const months = this.currentMonthDate.split('/')
      const currentAndLastMonthSaleAmountSeries = [{
        type: 'column',
        name: months[0],
        data: []
      }, {
        type: 'column',
        name: months[1],
        data: []
      }]
      this.$store.state.report.datasource.currentAndLastMonthSaleAmountByOutlet.current.forEach((amount) => {
        currentAndLastMonthSaleAmountSeries[1].data.push(amount.hemiao_amount)
      })
      this.$store.state.report.datasource.currentAndLastMonthSaleAmountByOutlet.past.forEach((amount) => {
        currentAndLastMonthSaleAmountSeries[0].data.push(amount.hemiao_amount)
      })
      return currentAndLastMonthSaleAmountSeries
    },
    // top20 品牌排行
    top20BrandSeries() {
      const top20Brands = [{
        name: '本月销售额',
        data: [],
        dataLabels: {
          enabled: true,
          rotation: 0,
          color: '#fff',
          align: 'right',
          formatter: function() {
            return `${currencyFormatter.format(this.y, { locale: 'zh-CN' })}元`
          },
          y: 1,
          x: 0,
          style: {
            textOutline: '1px 1px #aaa',
            fontSize: '10px',
            fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
          }
        }
      },
      {
        name: '上月销售额',
        data: [],
        dataLabels: {
          enabled: true,
          rotation: 0,
          color: '#fff',
          align: 'right',
          formatter: function() {
            return `${currencyFormatter.format(this.y, { locale: 'zh-CN' })}元`
          },
          y: 5,
          x: 0,
          style: {
            textOutline: '1px 1px #aaa',
            fontSize: '10px',
            fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
          }
        }
      }];

      //此处top20BrandsSale的所有数据都在past中，current中并没有数据，原因未知，暂用此方法解决，如后续不合规范再修改
      this.$store.state.report.datasource.top20BrandsSale.past.forEach((brand, idx) => {
        // console.log(this.$store.state.report.datasource.top20BrandsSale);
        // 只取前10名, 考虑到图标的空间限制
        if (idx < 10) {
          top20Brands[0].data.push([brand.offline_name, brand.hemiao_amount])
        }
        if (idx > 9) {
          top20Brands[1].data.push([brand.offline_name, brand.hemiao_amount])
        }
      })
      // this.$store.state.report.datasource.top20BrandsSale.past.forEach((brand, idx) => {
      //   // 只取前10名, 考虑到图标的空间限制

      // })
      // console.log(top20Brands);
      return top20Brands
    },
    // top20 品牌排行 (指定门店)
    top20BrandSeriesByOutlet() {
      const top20Brands = [{
        name: '销售额',
        data: [],
        dataLabels: {
          enabled: true,
          rotation: 0,
          color: '#FFFFFF',
          align: 'right',
          formatter: function() {
            return `${currencyFormatter.format(this.y, { locale: 'zh-CN' })}元`
          },
          y: 0,
          x: 0,
          style: {
            textOutline: '1px 1px #aaa',
            fontSize: '12px',
            fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
          }
        }
      }]
      this.$store.state.report.datasource.top20BrandsSaleByOutlet.forEach((brand, idx) => {
        // 只取前10名, 考虑到图标的空间限制
        if (idx < 10) {
          top20Brands[0].data.push([brand.offline_name, brand.hemiao_amount])
        }
      })
      return top20Brands
    },
    // top20 门店排行
    top20OutletSeries() {
      const top20Outlet = [{
        name: '销售额',
        data: [],
        dataLabels: {
          enabled: true,
          rotation: 0,
          color: '#FFFFFF',
          align: 'right',
          formatter: function() {
            return `${currencyFormatter.format(this.y, { locale: 'zh-CN' })}元`
          },
          y: 0,
          x: 0,
          style: {
            textOutline: '1px 1px #aaa',
            fontSize: '10px',
            fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
          }
        }
      }]
      this.$store.state.report.datasource.top20OutletSale.forEach((outlet, idx) => {
        // 只取前10名, 考虑到图标的空间限制
        if (idx < 10) {
          top20Outlet[0].data.push([outlet.store_outlet, outlet.hemiao_amount])
        }
      })
      return top20Outlet
    },
    // 指定人员的本月/上月销售金额趋势图
    currentAndLastMonthEmpSale() {
      const months = this.currentMonthDate.split('/')
      const currentAndLastMonthSaleAmountSeries = [{
        type: 'column',
        name: months[0],
        data: []
      }, {
        type: 'column',
        name: months[1],
        data: []
      }]
      this.$store.state.report.datasource.currentAndLastMonthSaleAmountByEmp.current.forEach((amount) => {
        currentAndLastMonthSaleAmountSeries[1].data.push(amount.hemiao_amount)
      })
      this.$store.state.report.datasource.currentAndLastMonthSaleAmountByEmp.past.forEach((amount) => {
        currentAndLastMonthSaleAmountSeries[0].data.push(amount.hemiao_amount)
      })
      return currentAndLastMonthSaleAmountSeries
    },
    // 指定人员的本年和去年的月度会员人数的统计
    currentAndLastYearNewMemberCountsByEmp() {
      const years = this.currentYearDate.split('/')
      const newMembersByYearSeries = [{
        type: 'column',
        name: years[0],
        data: []
      }, {
        type: 'column',
        name: years[1],
        data: []
      }]
      this.$store.state.report.datasource.newMembersByYearAndEmp.current.forEach((amount) => {
        newMembersByYearSeries[1].data.push(amount.hemiao_count)
      })
      this.$store.state.report.datasource.newMembersByYearAndEmp.past.forEach((amount) => {
        newMembersByYearSeries[0].data.push(amount.hemiao_count)
      })
      return newMembersByYearSeries
    },
    // 导购 本月销售任务进度
    currentAndLastMonthSaleTaskProcessByEmp() {
      const years = this.currentYearDate.split('/')
      const currentAndLastMonthSaleTaskProcessSeries = [{
        type: 'column',
        name: years[0],
        data: []
      }, {
        type: 'column',
        name: years[1],
        data: []
      }]
      this.$store.state.report.datasource.currentAndLastMonthSaleTaskProcessByEmp.current.forEach((amount) => {
        currentAndLastMonthSaleTaskProcessSeries[1].data.push(amount.hemiao_amount)
      })
      this.$store.state.report.datasource.currentAndLastMonthSaleTaskProcessByEmp.past.forEach((amount) => {
        currentAndLastMonthSaleTaskProcessSeries[0].data.push(amount.hemiao_amount)
      })
      return currentAndLastMonthSaleTaskProcessSeries
    },
    // 导购 本月消费会员/总会员趋势
    newAndOldMembersCurrentMonthsByEmp() {
      const months = this.currentMonthDate.split('/')
      const series = [{
        type: 'spline',
        name: months[0],
        data: []
      }, {
        type: 'spline',
        name: months[1],
        data: []
      }]
      this.$store.state.report.datasource.newAndOldMembersByEmp.old.forEach((members) => {
        series[1].data.push(members.hemiao_count)
        series[1].name = '总会员(人数)'
      })
      this.$store.state.report.datasource.newAndOldMembersByEmp.new.forEach((members) => {
        series[0].data.push(members.hemiao_count)
        series[0].name = '新消费会员(人数)'
      })
      return series
    },
    // 本月会员消费等级人数分布占比(饼图)
    currentMonthMemberLevelByEmp() {
      const levels = [{
        type: 'pie',
        name: '会员消费等级人数分布占比',
        data: []
      }]
      this.$store.state.report.datasource.currentMonthMemberLevelByEmp.forEach((level, idx) => {
        levels[0].data.push([level.hemiao_Level, level.hemiao_count])
      })
      return levels
    },
    // top20 品牌排行 (指定店员)
    top20BrandSeriesByEmp() {
      const top20Brands = [{
        name: '销售额',
        data: [],
        dataLabels: {
          enabled: true,
          rotation: 0,
          color: '#FFFFFF',
          align: 'right',
          formatter: function() {
            return `${currencyFormatter.format(this.y, { locale: 'zh-CN' })}元`
          },
          y: 0,
          x: 0,
          style: {
            textOutline: '1px 1px #aaa',
            fontSize: '12px',
            fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
          }
        }
      }]
      this.$store.state.report.datasource.top20BrandsSaleByEmp.forEach((brand, idx) => {
        // 只取前10名, 考虑到图表的空间限制
        if (idx < 10) {
          top20Brands[0].data.push([brand.offline_name, brand.hemiao_amount])
        }
      })
      return top20Brands
    },
    // top20 品牌排行 (指定店员)
    top20GoodsSeriesByEmp() {
      const top20Brands = [{
        name: '销售额',
        data: [],
        dataLabels: {
          enabled: true,
          rotation: 0,
          color: '#FFFFFF',
          align: 'right',
          formatter: function() {
            return `${currencyFormatter.format(this.y, { locale: 'zh-CN' })}元`
          },
          y: 0,
          x: 0,
          style: {
            textOutline: '1px 1px #aaa',
            fontSize: '12px',
            fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
          }
        }
      }]
      this.$store.state.report.datasource.top20GoodsSaleByEmp.forEach((brand, idx) => {
        // 只取前10名, 考虑到图表的空间限制
        if (idx < 10) {
          top20Brands[0].data.push([brand.goods_name, brand.hemiao_amount])
        }
      })
      return top20Brands
    },
    //会员特征
    bySex() {
      const distribut = [{
        type: 'pie',
        name: '性别分布',
        data: []
      }];
      let data = this.$store.state.report.datasource.memberFeatureBySex;
      // console.log(data);
      data.forEach((dis) => {
        if (dis.member_feature === "F0101") {
          distribut[0].data.push(['男', dis.hemiao_count])
        }
        if (dis.member_feature === "F0102") {
          distribut[0].data.push(['女', dis.hemiao_count])
        }
        if (dis.member_feature === "F0103") {
          distribut[0].data.push(['保密', dis.hemiao_count])
        }
        // distribut[0].data.push([dis.member_feature, dis.hemiao_count])
      })
      // console.log(distribut);
      // console.log(this.$route)
      return distribut;
    },
    //年龄分布
    byAge() {
      const age = [{
        type: 'pie',
        name: '年龄分布图',
        data: []
      }];

      let data = this.$store.state.report.datasource.memberFeatureByAge;
      data.forEach((e) => {
        switch (e.member_feature) {
          case 'F0201':
            age[0].data.push(['0-6个月', e.hemiao_count]);
            break;
          case 'F0202':
            age[0].data.push(['6-12个月', e.hemiao_count]);
            break;
          case 'F0203':
            age[0].data.push(['1-2岁', e.hemiao_count]);
            break;
          case 'F0204':
            age[0].data.push(['2-3岁', e.hemiao_count]);
            break;
          case 'F0205':
            age[0].data.push(['3-4岁', e.hemiao_count]);
            break;
          case 'F0206':
            age[0].data.push(['4-5岁', e.hemiao_count]);
            break;
          case 'F0207':
            age[0].data.push(['5-6岁', e.hemiao_count]);
            break;
          case 'F0208':
            age[0].data.push(['6岁以上', e.hemiao_count]);
            break;
          // default:
        }
      })
      return age;
    },
    // 消费能力
    byMoney() {
      const money = [{
        type: 'pie',
        name: '会员消费水平',
        data: []
      }];

      let data = this.$store.state.report.datasource.memberFeatureByMoney;
      data.forEach((e) => {
        switch (e.member_feature) {
          case 'F0301':
            money[0].data.push(['低消费客户', e.hemiao_count]);
            break;
          case 'F0302':
            money[0].data.push(['中消费客户', e.hemiao_count]);
            break;
          case 'F0303':
            money[0].data.push(['高消费客户', e.hemiao_count]);
            break;
        }
      })
      return money;
    },
    // 会员活跃度
    byActive() {
      const active = [{
        type: 'pie',
        name: '会员活跃度',
        data: []
      }];

      let data = this.$store.state.report.datasource.memberFeatureByActive;
      data.forEach((e) => {
        switch (e.member_feature) {
          case 'F0501':
            active[0].data.push(['活跃客户', e.hemiao_count]);
            break;
          case 'F0502':
            active[0].data.push(['冷冻客户', e.hemiao_count]);
            break;
        }
      })
      return active;
    },
    // 怀孕时间
    byTime() {
      const time = [{
        type: 'pie',
        name: '怀孕时间',
        data: []
      }];

      let data = this.$store.state.report.datasource.memberFeatureByTime;
      data.forEach((e) => {
        switch (e.member_feature) {
          case 'F0401':
            time[0].data.push(['孕初期', e.hemiao_count]);
            break;
          case 'F0402':
            time[0].data.push(['孕中期', e.hemiao_count]);
            break;
          case 'F0403':
            time[0].data.push(['孕晚期', e.hemiao_count]);
            break;
        }
      })
      return time;
    },
    //会员复购人数
    reBuyCountSeries() {
      const count = [{
        type: 'column',
        name: '复购人数',
        data: [],
        dataLabels: {
          enabled: true,
          rotation: 0,
          color: '#FFFFFF',
          align: 'right',
          // formatter: function () {
          //   return `${currencyFormatter.format(this.y, { locale: 'zh-CN' })}`
          // },
          y: 0,
          x: 0,
          style: {
            textOutline: '1px 1px #aaa',
            fontSize: '10px',
            fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
          }
        }
      }]
      let datas = this.$store.state.report.datasource.memberReBuy;
      datas.forEach((data) => {
        count[0].data.push(data.hemiao_count);
      })
      return count;
    },
    //会员复购率
    reBuyHzSeries() {
      const hz = [{
        type: 'column',
        name: '复购率',
        data: [],
        dataLabels: {
          enabled: true,
          rotation: 0,
          color: '#FFFFFF',
          align: 'right',
          formatter: function() {
            return `${(Number(this.y).toFixed(2)) + '%'}`
          },
          y: 0,
          x: 0,
          style: {
            textOutline: '1px 1px #aaa',
            fontSize: '10px',
            fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
          }
        }
      }]
      let datas = this.$store.state.report.datasource.memberReBuy;
      datas.forEach((data) => {
        hz[0].data.push(parseFloat((data.hemiao_rate * 100).toFixed(2)));
      })
      return hz;
    },
    goodsSeries() {
      const goods = [{
        type: 'column',
        name: '复购商品',
        data: []
      }];
      let datas = this.$store.state.report.datasource.rebuygoods;
      return goods;
    },
    typeSeries() {
      const type = [{
        type: 'column',
        name: '复购品类',
        data: []
      }];
      let datas = this.$store.state.report.datasource.rebuytype;
      return type;
    },
    brandSeries() {
      const brand = [{
        type: 'column',
        name: '复购品牌',
        data: []
      }];
      let datas = this.$store.state.report.datasource.rebuybrand;
      return brand;
    },

    todaySeries() {
      const option = [{
        name: '新客',
        type: 'column',
        data: []
      }]
      let datas = this.$store.state.report.datasource.todayNewMember;
      datas.forEach(e => {
        // option.push([e.store_outlet_name, e.hemiao_count]);
        option[0].data.push(e.hemiao_count)
      });
      // console.log(option);
      return option
    },
    // 门店识别代码
    storeCode() {
      return this.$store.state.storeCode
    },
    // 路由
    routerParams() {
      return this.$route.params.name
    },
    // 当前年份
    currentYearDate() {
      let beginDate, endDate, resultDate
      if (this.dates) {
        beginDate = this.dates.subtract(1, 'years').format('YYYY')
        endDate = this.dates.add(1, 'years').format('YYYY')
        resultDate = `${beginDate}/${endDate}`
      } else {
        resultDate = `${moment().subtract(1, 'years').format('YYYY')}/${moment().format('YYYY')}`
      }
      return resultDate
    },
    // 当前月份和上月
    currentMonthDate() {
      return `${moment().subtract(1, 'months').format('YYYY-MM')}/${moment().format('YYYY-MM')}`
    },
    // 当前月份
    currentMonth() {
      let beginDate, resultDate
      if (this.dates) {
        beginDate = this.dates.format('YYYY-MM')
        resultDate = `${beginDate}`
      } else {
        resultDate = `${moment().format('YYYY-MM')}`
      }
      return resultDate
    },
    // 当前门店的名称
    outlet() {
      const top20Outlets = this.$store.state.report.datasource.top20OutletSale
      return this.activeOutlet === '' ? top20Outlets[0] && top20Outlets[0].store_outlet : this.activeOutlet
    },
    // 当前搜索的店名和员工名称
    outletEmp() {
      return `${this.activeOutlet}-${this.activeEmp}`
    },
    // 全局的异步请求的状态
    isloading() {
      return this.$store.state.isLoading
    }
  },
  data() {
    return {
      dates: '',
      activeOutlet: '',
      activeEmp: '',
      activePane: this.$route.params.name
    }
  },
  head() {
    let title = ''
    switch (this.$route.params.name) {
      case 'global-all':
        title = '报表--全局数据'
        break
      case 'global-single-store':
        title = '报表--单店数据'
        break
      case 'global-single-person':
        title = '报表--单人数据'
        break
      case 'member-feature':
        title = '会员分析--会员特征'
        break
      default:
        title = '报表'
        break
    }
    return { title }
  },
  methods: {
    onFilterChange(filters) {
      if (filters.dateFilted === '无过滤条件') {
        this.dates = moment()
      } else {
        this.dates = moment(filters.dateFilted, 'YYYY年MM月')
      }
      switch (this.$route.params.name) {
        case 'global-all':
          break
        case 'global-single-store':
          if (filters.storeNameFilted !== '无过滤条件' && filters.storeNameFilted !== '') {
            this.activeOutlet = filters.storeNameLabel
            // ----------------------------------- //
            this.$store.dispatch(
              'report/getCurrentAndLastYearSaleAmountByOutlet',
              {
                storecode: this.storeCode,
                outlet: filters.storeNameFilted
              })
            // ----------------------------------- //
            this.$store.dispatch(
              'report/getCurrentAndLastMonthSaleAmountByOutlet',
              {
                storecode: this.storeCode,
                outlet: filters.storeNameFilted
              })
            // ----------------------------------- //
            this.$store.dispatch(
              'report/getTOP20BrandSaleByOutlet',
              {
                storecode: this.storeCode,
                outlet: filters.storeNameFilted
              })
            // ----------------------------------- //
            this.$store.dispatch(
              'report/getNewMembersCountsByOutlet',
              {
                storecode: this.storeCode,
                outlet: filters.storeNameFilted
              })
            // ----------------------------------- //
            this.$store.dispatch(
              'report/getCurrentMonthMemberLevelByOutlet',
              {
                storecode: this.storeCode,
                outlet: filters.storeNameFilted
              })
            // ----------------------------------- //
            this.$store.dispatch(
              'report/getOldAndNewMembersCountsByOutlet',
              {
                storecode: this.storeCode,
                outlet: filters.storeNameFilted
              })
          }
          break
        case 'global-single-person':
          let outlet = ''
          if (filters.storeNameFilted && filters.storeNameFilted !== '') {
            this.activeOutlet = filters.storeNameLabel ? filters.storeNameLabel : this.activeOutlet
            outlet = filters.storeNameFilted
          }
          if (filters.storePersonFilted && filters.storePersonFilted !== '' && filters.storePersonFilted !== '无过滤条件') {
            this.activeEmp = filters.storePersonFilted
          }
          if (outlet !== '' && filters.storePersonFilted !== '' && filters.storePersonFilted !== '无过滤条件') {
            // ----------------------------------- //
            this.$store.dispatch(
              'report/getCurrentAndLastMonthSaleAmountByEmp',
              {
                storecode: this.storeCode,
                outlet: outlet,
                empname: filters.storePersonFilted
              })
            // ----------------------------------- //
            this.$store.dispatch(
              'report/getNewMembersCountsByEmp',
              {
                storecode: this.storeCode,
                outlet: outlet,
                empname: filters.storePersonFilted
              })
            // ----------------------------------- //
            this.$store.dispatch(
              'report/getCurrentAndLastMonthSaleTaskProcessByEmp',
              {
                storecode: this.storeCode,
                outlet: outlet,
                empname: filters.storePersonFilted
              })
            // ----------------------------------- //
            this.$store.dispatch(
              'report/getOldAndNewMemberCountsByEmp',
              {
                storecode: this.storeCode,
                outlet: outlet,
                empname: filters.storePersonFilted
              })
            // ----------------------------------- //
            this.$store.dispatch(
              'report/getCurrentMonthMemberLevelByEmp',
              {
                storecode: this.storeCode,
                outlet: outlet,
                empname: filters.storePersonFilted
              })
            // ----------------------------------- //
            this.$store.dispatch(
              'report/getTOP20BrandSaleByEmp',
              {
                storecode: this.storeCode,
                outlet: outlet,
                empname: filters.storePersonFilted
              })
            // ----------------------------------- //
            this.$store.dispatch(
              'report/getTOP20GoodsSaleByEmp',
              {
                storecode: this.storeCode,
                outlet: outlet,
                empname: filters.storePersonFilted
              })
            // ----------------------------------- //
          }
          break
        case 'member-feature':
        // this.$store.dispatch(
        //   'report/getMemberFeature',
        //   {
        //     storecode: this.storeCode,
        //     type: 'F1'
        //   }
        // )
        default:
          break
      }
    }
  }
}
</script>

<style>
.reports-container {
  padding: 10px;
}
</style>

<template>
  <div class="container">
    <el-row :gutter="15" style="margin-top: 0;">
      <draggable class="dragArea">
        <transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
          <el-col :span="12" v-if="!isloading">
            <el-card>
              <div slot="header" class="clearfix">
                <span style="line-height: 36px;">
                  <i class="fa fa-area-chart" aria-hidden="true"></i>
                  {{currentYearDate}} 年度销售额
                </span>
                <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
              </div>
              <Charts :options="currAndLastYearChart" />
              <el-alert style="margin-top: 10px;" :title='currentYearSaleTotalAmout' type="warning" show-icon>
              </el-alert>
              <el-alert style="margin-top: 10px;" :title='LastYearSaleTotalAmout' type="info" show-icon>
              </el-alert>
            </el-card>
          </el-col>
        </transition>
        <transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
          <el-col :span="12" v-if="!isloading">
            <el-card>
              <div slot="header" class="clearfix">
                <span style="line-height: 36px;">
                  <i class="fa fa-area-chart" aria-hidden="true"></i>
                  本月品牌销售额TOP10
                  <!--（环比）  -->
                </span>
                <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
              </div>
              <Charts :options="top20ChartBrandSale" />
            </el-card>
          </el-col>
        </transition>
      </draggable>
    </el-row>
    <el-row :gutter="15" style="margin-top: 20px;">
      <transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <el-col :span="24" v-if="!isloading">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;">
                <i class="fa fa-area-chart" aria-hidden="true"></i>
                月度销售金额总额趋势图
                <!--（环比）  -->
              </span>
              <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
            </div>
            <Charts :options="currAndLastMonChart" />
            <el-alert style="margin-top: 10px;" :title='currentMonthSaleTotalAmout' type="warning" show-icon>
            </el-alert>
            <el-alert style="margin-top: 10px;" :title='LastMonthSaleTotalAmout' type="info" show-icon>
            </el-alert>
          </el-card>
        </el-col>
      </transition>
    </el-row>
    <el-row :gutter="15" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">
              <i class="fa fa-area-chart" aria-hidden="true"></i>
              本月新增会员趋势（同比）
            </span>
            <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
          </div>
          <Charts :options="currAndLastYearNewMembersChart" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">
              <i class="fa fa-area-chart" aria-hidden="true"></i>
              本月消费会员/总会员趋势（同比）
            </span>
            <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
          </div>
          <Charts :options="currNewAndOldMembersChart" />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="15" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">
              <i class="fa fa-area-chart" aria-hidden="true"></i>
              本月会员消费等级人数分布占比
            </span>
            <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
          </div>
          <Charts :options="currentMonthMemberLevelChart" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">
              <i class="fa fa-area-chart" aria-hidden="true"></i>
              本月门店销售排行TOP10
              <!--（环比）-->
            </span>
            <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
          </div>
          <Charts :options="top20ChartOutletSale" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import currencyFormatter from 'currency-formatter'
import draggable from 'vuedraggable' // eslint-disable-line no-unused-vars
import {
  Button,
  Col,
  Row,
  Tooltip,
  Card,
  Alert
} from 'element-ui'
import Charts from '~components/commons/Charts.vue'
Vue.use(Button)
Vue.use(Col)
Vue.use(Card)
Vue.use(Row)
Vue.use(Tooltip)
Vue.use(Alert)

export default {
  components: { Charts, draggable },
  props: [
    'currentMonthMemberLevel',
    'currentAndLastMonthSale',
    'currentAndLastYearSale',
    'currentAndLastYearNewMembersCounts',
    'newAndOldMembersCount',
    'topBrandSale',
    'topOutletSale',
    'currentYearDate',
    'currentMonthDate',
    'currentMonth',
    'isloading',
  ],
  watch: {
    currentMonthMemberLevel: function(val) {
      this.currentMonthMemberLevelChart = Object.assign({}, this.currentMonthMemberLevelChart, { series: val })
    },
    currentAndLastYearNewMembersCounts: function(val) {
      this.currAndLastYearNewMembersChart = Object.assign({}, this.currAndLastYearNewMembersChart, { series: val })
    },
    currentAndLastMonthSale: function(val) {
      this.currAndLastMonChart = Object.assign({}, this.currAndLastMonChart, { series: val })
    },
    currentAndLastYearSale: function(val) {
      this.currAndLastYearChart = Object.assign({}, this.currAndLastYearChart, { series: val });
    },
    newAndOldMembersCount: function(val) {
      this.currNewAndOldMembersChart = Object.assign({}, this.currNewAndOldMembersChart, { series: val })
    },
    topBrandSale: function(val) {
      this.top20ChartBrandSale = Object.assign({}, this.top20ChartBrandSale, { series: val })
    },
    topOutletSale: function(val) {
      this.top20ChartOutletSale = Object.assign({}, this.top20ChartOutletSale, { series: val })
    },
  },
  computed: {
    currentYearSaleTotalAmout: function() {
      const amount = currencyFormatter.format(this.$store.state.report.datasource.currentAndLastYearSaleAmount.totalAmount.current, { locale: 'zh-CN' })
      return `今年的销售额度合计: ${amount}元`
    },
    LastYearSaleTotalAmout: function() {
      const amount = currencyFormatter.format(this.$store.state.report.datasource.currentAndLastYearSaleAmount.totalAmount.past, { locale: 'zh-CN' })
      return `去年的销售额度合计: ${amount}元`
    },
    currentMonthSaleTotalAmout: function() {
      const amount = currencyFormatter.format(this.$store.state.report.datasource.currentAndLastMonthSaleAmount.totalAmount.current, { locale: 'zh-CN' })
      return `本月的销售额度合计: ${amount}元`
    },
    LastMonthSaleTotalAmout: function() {
      const amount = currencyFormatter.format(this.$store.state.report.datasource.currentAndLastMonthSaleAmount.totalAmount.past, { locale: 'zh-CN' })
      return `上月的销售额度合计: ${amount}元`
    }
  },
  data() {
    const range = moment.range(moment('2017-05-01T00:00:00.000').startOf('month').format('YYYY-MM-DD'), moment('2017-05-01T00:00:00.000').endOf('month').format('YYYY-MM-DD'))
    const yearRange = moment.range(moment().startOf('year').format('YYYY-MM-DD'), moment().endOf('year').format('YYYY-MM-DD'))
    const dayString = []
    const monthString = []
    for (const month of range.by('day')) { dayString.push(month.format('DD号')) }
    for (const month of yearRange.by('month')) { monthString.push(month.format('MM月')) }
    return {
      currentMonthMemberLevelChart: {
        chart: {
          type: 'pie',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          options3d: {
            enabled: true,
            alpha: 45,
            // beta: 0
          },
        },
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          connectorColor: 'silver'
        },
        legend: {
          enabled: true,
          layout: 'vertical',
          backgroundColor: '#FFFFFF',
          floating: true,
          align: 'left',
          verticalAlign: 'top',
          x: 90,
          y: 45,
          labelFormatter: function() {
            return this.name + '(' + this.percentage + '%)';//在名称后面追加百分比数据  
          }
        },
        tooltip: {
          headerFormat: '{series.name}<br>',
          pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        series: this.currentMonthMemberLevel
      },
      currAndLastYearNewMembersChart: {
        title: '',
        inverted: false,
        yAxisTitle: '会员人数(个数)',
        valueSuffix: '',
        legend: {
          enabled: true,
          layout: this.legendPostion || 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
          borderWidth: 1
        },
        categories: monthString,
        series: this.currentAndLastYearNewMembersCounts
      },
      currNewAndOldMembersChart: {
        title: '',
        inverted: false,
        yAxisTitle: '会员人数(个)',
        valueSuffix: '',
        legend: {
          enabled: true,
          layout: this.legendPostion || 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
          borderWidth: 1
        },
        tooltip: {
          crosshairs: true,
          shared: false
        },
        categories: monthString,
        series: this.newAndOldMembersCount
      },
      currAndLastYearChart: {
        title: '',
        inverted: false,
        tooltip: {
          headerFormat: '',
          pointFormatter: function() {
            return `<span style="color:${this.series.color}">${this.series.name}-${this.x + 1}: </span>
                      ${currencyFormatter.format(this.y, { locale: 'zh-CN' })}元`
          }
        },
        yAxisTitle: '销售金额(元)',
        valueSuffix: '',
        legend: {
          enabled: true,
          layout: this.legendPostion || 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
          borderWidth: 1
        },
        categories: monthString,
        series: this.currentAndLastYearSale
      },
      currAndLastMonChart: {
        title: '',
        inverted: false,
        yAxisTitle: '销售金额(元)',
        valueSuffix: '',
        tooltip: {
          headerFormat: '',
          pointFormatter: function() {
            return `<span style="color:${this.series.color}">${this.series.name}-${this.x + 1}: </span>
                      ${currencyFormatter.format(this.y, { locale: 'zh-CN' })}元`
          }
        },
        legend: {
          enabled: true,
          layout: this.legendPostion || 'horizontal',
          align: 'left',
          verticalAlign: 'bottom',
          borderWidth: 1
        },
        categories: dayString,
        series: this.currentAndLastMonthSale
      },
      top20ChartBrandSale: {
        type: 'column',
        title: '',
        inverted: true,
        tooltip: {
          headerFormat: '',
          pointFormatter: function() {
            return `<span style="color:${this.series.color}">${this.series.name}: </span>
                      ${currencyFormatter.format(this.y, { locale: 'zh-CN' })}元`
          }
        },
        yAxisTitle: '销售金额(元)',
        xAxis: {
          type: 'category',
          labels: {
            rotation: 0,
            style: {
              fontSize: '12px',
              fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
            }
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -10,
          y: 200,
          floating: true,
          borderWidth: 1,
          backgroundColor: '#FFFFFF',
          shadow: true
        },
        categories: monthString,
        series: this.topBrandSale
      },
      top20ChartOutletSale: {
        type: 'column',
        title: '',
        inverted: true,
        yAxisTitle: '销售金额(元)',
        tooltip: {
          headerFormat: '',
          pointFormatter: function() {
            return `<span style="color:${this.series.color}">${this.series.name}: </span>
                      ${currencyFormatter.format(this.y, { locale: 'zh-CN' })}元`
          }
        },
        xAxis: {
          type: 'category',
          labels: {
            rotation: 0,
            style: {
              fontSize: '12px',
              fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
            }
          }
        },
        legend: {
          enabled: false
        },
        series: this.topOutletSale
      }
    }
  },
  methods: {},
  mounted() {
    // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    //为body添加监听事件，根据滚轮按需加载;
    window.addEventListener('scroll', getScrollTop);
    function getScrollTop() {
      var scrollPos;
      if (window.pageYOffset) {
        scrollPos = window.pageYOffset;
      }
      else if (document.compatMode && document.compatMode != 'BackCompat')
      { scrollPos = document.documentElement.scrollTop; }
      else if (document.body) { scrollPos = document.body.scrollTop; }
      // return scrollPos;
      // console.log(scrollPos)
      if (scrollPos > 500) {
        // this.$store.state.MonthmemberLevel = true;
        // console.log(this.MonthmemberLevel)
      }
    }
  },
  activated() {

  }
}
</script>

<style scoped></style>

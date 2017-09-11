<template>
  <div class="container">
    <div v-if="outletEmp === '-'">
      <el-alert
        title="请选择门店和员工"
        type="warning"
        description="如果此处没有结果, 请确保门店和员工是否是存在的"
        show-icon
      >
      </el-alert>
    </div>
    <div v-if="outletEmp !== '-'">
      <el-alert
        title="关于结果的提示"
        type="info"
        description="如果图表没有数据显示, 请确保您输入了有效的搜索条件, 也有可能是您的搜索条件没有数据."
        show-icon
      >
      </el-alert>
      <el-row :gutter="15" style="margin-top: 20px;">
        <el-col :span="24">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;">
                <i class="fa fa-area-chart" aria-hidden="true"></i>
                {{outletEmp}} 月度销售金额总额趋势图
              </span>
              <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
            </div>
            <Charts :options="currAndLastMonthChart" />
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="15" style="margin-top: 20px;">
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;">
                <i class="fa fa-area-chart" aria-hidden="true"></i>
                本月-{{outletEmp}} 品牌销售额TOP10（同比）
              </span>
              <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
            </div>
            <Charts :options="top20ChartBrandSaleChart" />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;">
                <i class="fa fa-area-chart" aria-hidden="true"></i>
                本月-{{outletEmp}} 单品销售额TOP10（同比）
              </span>
              <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
            </div>
            <Charts :options="top20ChartGoodsSaleChart" />
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="15" style="margin-top: 20px;">
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;">
                <i class="fa fa-area-chart" aria-hidden="true"></i>
                本月-{{outletEmp}} 新增会员数量趋势（同比去年）
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
                本月-{{outletEmp}} 消费会员人数趋势（同比去年）
              </span>
              <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
            </div>
             <Charts :options="newAndOldMembersCurrentMonthsChart" />
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="15" style="margin-top: 20px;">
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;">
                <i class="fa fa-area-chart" aria-hidden="true"></i>
                本月-{{outletEmp}} 本月会员消费等级人数分布占比
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
                本年/去年-{{outletEmp}} 销售完成情况对比（同比）
              </span>
              <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
            </div>
             <Charts :options="currentAndLastMonthSaleTaskChart" />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import currencyFormatter from 'currency-formatter'
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
  components: { Charts },
  props: [
    'currentAndLastMonthEmpSale',
    'currentAndLastYearNewMemberCountsByEmp',
    'currentAndLastMonthSaleTaskProcessByEmp',
    'newAndOldMembersCurrentMonthsByEmp',
    'currentMonthMemberLevelByEmp',
    'top20BrandSeriesByEmp',
    'top20GoodsSeriesByEmp',
    'currentYearDate',
    'currentMonthDate',
    'currentMonth',
    'outletEmp',
    'isloading'
  ],
  watch: {
    currentAndLastMonthEmpSale: function (val) {
      this.isCurrentAndLastYearOutletSaleEmpty = false
      this.currAndLastMonthChart = Object.assign({}, this.currAndLastMonthChart, { series: val })
    },
    currentAndLastYearNewMemberCountsByEmp: function (val) {
      this.isCurrentAndLastYearOutletSaleEmpty = false
      this.currAndLastYearNewMembersChart = Object.assign({}, this.currAndLastYearNewMembersChart, { series: val })
    },
    currentAndLastMonthSaleTaskProcessByEmp: function (val) {
      this.isCurrentAndLastYearOutletSaleEmpty = false
      this.currentAndLastMonthSaleTaskChart = Object.assign({}, this.currentAndLastMonthSaleTaskChart, { series: val })
    },
    newAndOldMembersCurrentMonthsByEmp: function (val) {
      this.isCurrentAndLastYearOutletSaleEmpty = false
      this.newAndOldMembersCurrentMonthsChart = Object.assign({}, this.newAndOldMembersCurrentMonthsChart, { series: val })
    },
    currentMonthMemberLevelByEmp: function (val) {
      this.isCurrentAndLastYearOutletSaleEmpty = false
      this.currentMonthMemberLevelChart = Object.assign({}, this.currentMonthMemberLevelChart, { series: val })
    },
    top20BrandSeriesByEmp: function (val) {
      this.isCurrentAndLastYearOutletSaleEmpty = false
      this.top20ChartBrandSaleChart = Object.assign({}, this.top20ChartBrandSaleChart, { series: val })
    },
    top20GoodsSeriesByEmp: function (val) {
      this.isCurrentAndLastYearOutletSaleEmpty = false
      this.top20ChartGoodsSaleChart = Object.assign({}, this.top20ChartGoodsSaleChart, { series: val })
    }
  },
  data () {
    const range = moment.range(moment('2017-05-01T00:00:00.000').startOf('month').format('YYYY-MM-DD'), moment('2017-05-01T00:00:00.000').endOf('month').format('YYYY-MM-DD'))
    const yearRange = moment.range(moment().startOf('year').format('YYYY-MM-DD'), moment().endOf('year').format('YYYY-MM-DD'))
    const dayString = []
    const monthString = []
    for (const month of range.by('day')) { dayString.push(month.format('DD号')) }
    for (const month of yearRange.by('month')) { monthString.push(month.format('MM月')) }
    return {
      currAndLastMonthChart: {
        title: '',
        inverted: false,
        yAxisTitle: '销售金额(元)',
        valueSuffix: '',
        tooltip: {
          headerFormat: '',
          pointFormatter: function () {
            return `<span style="color:${this.series.color}">${this.series.name}-${this.x + 1}: </span>
                      ${currencyFormatter.format(this.y, { locale: 'zh-CN' })}元`
          }
        },
        legend: {
          enabled: true,
          layout: this.legendPostion || 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
          borderWidth: 1
        },
        categories: dayString,
        series: this.currentAndLastMonthEmpSale
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
        series: this.currentAndLastYearNewMemberCountsByEmp
      },
      currentAndLastMonthSaleTaskChart: {
        title: '',
        inverted: false,
        yAxisTitle: '完成进度(元)',
        valueSuffix: '',
        tooltip: {
          headerFormat: '',
          pointFormatter: function () {
            return `<span style="color:${this.series.color}">${this.series.name}-${this.x + 1}: </span>
                      ${currencyFormatter.format(this.y, { locale: 'zh-CN' })}元`
          }
        },
        legend: {
          enabled: true,
          layout: this.legendPostion || 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
          borderWidth: 1
        },
        categories: monthString,
        series: this.currentAndLastMonthSaleTaskProcessByEmp
      },
      newAndOldMembersCurrentMonthsChart: {
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
        categories: monthString,
        series: this.newAndOldMembersCurrentMonthsByEmp
      },
      currentMonthMemberLevelChart: {
        chart: {
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
          }
        },
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          connectorColor: 'silver'
        },
        legend: {
          enabled: true,
          layout: this.legendPostion || 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
          borderWidth: 1
        },
        tooltip: {
          headerFormat: '{series.name}<br>',
          pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        series: this.currentMonthMemberLevelByEmp
      },
      top20ChartBrandSaleChart: {
        type: 'bar',
        title: '',
        tooltip: {
          headerFormat: '',
          pointFormatter: function () {
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
          enabled: false
        },
        series: this.top20BrandSeriesByEmp
      },
      top20ChartGoodsSaleChart: {
        type: 'bar',
        title: '',
        tooltip: {
          headerFormat: '',
          pointFormatter: function () {
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
          enabled: false
        },
        series: this.top20GoodsSeriesByEmp
      }
    }
  },
  methods: {}
}
</script>

<style scoped></style>

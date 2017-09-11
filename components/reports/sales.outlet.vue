<template>
  <div class="container">
    <div v-if="outletName === undefined">
      <el-alert title="请选择门店" type="warning" description="如果此处没有结果, 请确保门店是否是存在的." show-icon>
      </el-alert>
    </div>
    <div v-if="outletName !== undefined">
      <el-alert title="关于结果的提示" type="info" description="如果图表没有数据显示, 请确保您输入了有效的搜索条件, 也有可能是您的搜索条件没有数据." show-icon>
      </el-alert>
      <el-row :gutter="15" style="margin-top: 20px;">
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;">
                <i class="fa fa-area-chart" aria-hidden="true"></i>
                {{outletName}} 本年/去年 销售额度
              </span>
              <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
            </div>
            <Charts :options="currAndLastYearChart" />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;">
                <i class="fa fa-area-chart" aria-hidden="true"></i>
                本月-{{outletName}} 品牌销售额TOP10
              </span>
              <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
            </div>
            <Charts :options="top20ChartBrandSale" />
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="15" style="margin-top: 20px;">
        <el-col :span="24">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;">
                <i class="fa fa-area-chart" aria-hidden="true"></i>
                月度-{{outletName}} 销售金额总额趋势图
              </span>
              <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
            </div>
            <Charts :options="currAndLastMonthChart" />
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="15" style="margin-top: 20px;">
        <el-col :span="24">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;">
                <i class="fa fa-area-chart" aria-hidden="true"></i>
                {{currentYearDate}}-{{outletName}} 新增会员趋势
              </span>
              <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
            </div>
            <Charts :options="currAndLastYearNewMembersChart" />
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="15" style="margin-top: 20px;">
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;">
                <i class="fa fa-area-chart" aria-hidden="true"></i>
                本月-{{outletName}} 会员消费等级人数分布占比
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
                本月-{{outletName}}消费会员/总会员趋势
              </span>
              <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
            </div>
            <Charts :options="currNewAndOldMembersChart" />
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
    'currentAndLastYearOutletSale',
    'currentAndLastMonthOutletSale',
    'currentAndLastYearNewMemberCountsByOutlet',
    'currentMonthMemberLevelByOutlet',
    'top20BrandSeriesByOutlet',
    'newAndOldMembersCountByOutlet',
    'currentYearDate',
    'currentMonthDate',
    'currentMonth',
    'outletName',
    'isloading'
  ],
  watch: {
    newAndOldMembersCountByOutlet: function (val) {
      this.isCurrentAndLastYearOutletSaleEmpty = false
      this.currNewAndOldMembersChart = Object.assign({}, this.currNewAndOldMembersChart, { series: val })
    },
    currentMonthMemberLevelByOutlet: function (val) {
      this.isCurrentAndLastYearOutletSaleEmpty = false
      this.currentMonthMemberLevelChart = Object.assign({}, this.currentMonthMemberLevelChart, { series: val })
    },
    currentAndLastYearOutletSale: function (val) {
      this.isCurrentAndLastYearOutletSaleEmpty = false
      this.currAndLastYearChart = Object.assign({}, this.currAndLastYearChart, { series: val })
    },
    currentAndLastMonthOutletSale: function (val) {
      this.isCurrentAndLastYearOutletSaleEmpty = false
      this.currAndLastMonthChart = Object.assign({}, this.currAndLastMonthChart, { series: val })
    },
    top20BrandSeriesByOutlet: function (val) {
      this.isCurrentAndLastYearOutletSaleEmpty = false
      this.top20ChartBrandSale = Object.assign({}, this.top20ChartBrandSale, { series: val })
    },
    currentAndLastYearNewMemberCountsByOutlet: function (val) {
      this.isCurrentAndLastYearOutletSaleEmpty = false
      this.currAndLastYearNewMembersChart = Object.assign({}, this.currAndLastYearNewMembersChart, { series: val })
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
        categories: monthString,
        series: this.newAndOldMembersCountByOutlet
      },
      currentMonthMemberLevelChart: {
        chart: {
          type: 'pie',
          // type:'line',
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
        series: this.currentMonthMemberLevelByOutlet
      },
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
        series: this.currentAndLastMonthOutletSale
      },
      currAndLastYearChart: {
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
        categories: monthString,
        series: this.currentAndLastYearOutletSale
      },
      top20ChartBrandSale: {
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
        series: this.top20BrandSeriesByOutlet
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
        series: this.currentAndLastYearNewMemberCountsByOutlet
      },
      isCurrentAndLastYearOutletSaleEmpty: false
    }
  },
  methods: {}
}
</script>

<style scoped></style>

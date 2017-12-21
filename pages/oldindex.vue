<template>
  <el-row class="el-dashboard-container">
    <transition name="custom-classes-transition" enter-active-class="animated slideInDown" leave-active-class="animated zoomOut">
      <div v-if="isloading">
        <el-row class="el-dashboard-header">
          <el-col :span="24" style="position: relative;">
            <div class="text">经营大数据实时指挥中心</div>
            <div class="icon-lighting">
              <i class="fa fa-bolt" aria-hidden="true"></i>
            </div>
            <div class="datetime">
              <i class="fa fa-clock-o" aria-hidden="true" style="margin-right: 5px;"></i>{{currentDate}}
            </div>
          </el-col>
        </el-row>
      </div>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated slideInUp" leave-active-class="animated zoomIn">
      <div v-if="isloading">
        <el-row class="el-dashboard-content">
          <el-col :span="7" class="row" style="padding: 0 15px 15px 15px;">
            <el-card class="theme-darker">
              <div slot="header" class="clearfix">
                <span style="line-height: 36px;">
                  <i class="fa fa-area-chart" aria-hidden="true"></i>
                  本月品牌销售额TOP10（环比）
                </span>
              </div>
              <Charts :options="top20ChartBrandSale" />
            </el-card>
            <el-card class="theme-darker">
              <div slot="header" class="clearfix">
                <span style="line-height: 36px;">
                  <i class="fa fa-area-chart" aria-hidden="true"></i>
                  本月会员消费等级人数分布占比
                </span>
              </div>
              <Charts :options="currentMonthMemberLevelChart" />
            </el-card>
            <el-card class="theme-darker">
              <div slot="header" class="clearfix">
                <span style="line-height: 36px;">
                  <i class="fa fa-area-chart" aria-hidden="true"></i>
                  本月新增会员趋势（同比）
                </span>
              </div>
              <Charts :options="currAndLastYearNewMembersChart" />
            </el-card>
          </el-col>
          <el-col :span="10" class="row">
            <el-col :span="24" class="banner-task">
              <el-col :span="8">
                <div>
                  <span style="color: #8DC1B4;">当日实时销售</span>
                  <i class="fa fa-area-chart title" aria-hidden="true"></i>
                </div>
                <Digital :number="currentTotalAmount"></Digital>
              </el-col>
              <el-col :span="8">
                <div id="targetComplete" style="height: 150px;"></div>
              </el-col>
              <el-col :span="8">
                <div>
                  <span style="color: #1D9275;">当月实时销售</span>
                  <i class="fa fa-area-chart title" aria-hidden="true"></i>
                </div>
                <Digital :number="currentSaleAmount"></Digital>
              </el-col>
            </el-col>
            <el-card class="theme-darker" style="width: 100%; margin-top: 20px;">
              <div slot="header" class="clearfix">
                <span style="line-height: 36px;">
                  <i class="fa fa-area-chart" aria-hidden="true"></i>
                  月度销售金额总额趋势图（环比）
                </span>
              </div>
              <Charts :options="currAndLastMonChart" />
            </el-card>
            <el-col :span="24">
              <el-table :data="tableFakeData" class="banner-table" style="width: 100%">
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column prop="offline_name" label="品牌名称" width="150">
                </el-table-column>
                <el-table-column prop="hemiao_date" label="日期" width="100">
                </el-table-column>
                <el-table-column prop="hemiao_amount" label="销售额度">
                </el-table-column>
              </el-table>
            </el-col>
          </el-col>
          <el-col :span="7" class="row" style="padding: 0 15px 15px 15px;">
            <el-card class="theme-darker">
              <div slot="header" class="clearfix">
                <span style="line-height: 36px;">
                  <i class="fa fa-area-chart" aria-hidden="true"></i>
                  {{currentYearDate}} 年度销售额度
                </span>
              </div>
              <Charts :options="currAndLastYearChart" />
            </el-card>
            <el-card class="theme-darker">
              <div slot="header" class="clearfix">
                <span style="line-height: 36px;">
                  <i class="fa fa-area-chart" aria-hidden="true"></i>
                  本月会员消费等级人数分布占比
                </span>
              </div>
              <Charts :options="currentMonthMemberLevelChart" />
            </el-card>
            <el-card class="theme-darker">
              <div slot="header" class="clearfix">
                <span style="line-height: 36px;">
                  <i class="fa fa-area-chart" aria-hidden="true"></i>
                  本月门店销售排行TOP10（环比）
                </span>
              </div>
              <Charts :options="top20ChartOutletSale" />
            </el-card>
          </el-col>
        </el-row>
      </div>
    </transition>
  </el-row>
</template>
<script>
import Vue from "vue";
import moment from "moment";
import currencyFormatter from "currency-formatter";
// import Highcharts from 'highcharts'
import {
  Button,
  Col,
  Row,
  Card,
  Tooltip,
  Table,
  TableColumn
} from "element-ui";

import Charts from "~components/commons/Charts.vue";

import Digital from "~components/commons/Digital.vue";

Vue.use(Button);
Vue.use(Col);
Vue.use(Row);
Vue.use(Card);
Vue.use(Tooltip);
Vue.use(Table);
Vue.use(TableColumn);

export default {
  components: { Charts, Digital },
  middleware: "check-auth",
  layout: "dashboard",
  computed: {
    // table fake data
    tableFakeData() {
      return this.$store.state.report.datasource.top20BrandsSale.current;
    },
    currentTAmount() {
      return this.$store.state.report.datasource.currentTotalAmount;
    },
    // 本月会员消费等级人数分布占比(饼图)
    currentMonthMemberLevel() {
      const levels = [
        {
          type: "pie",
          name: "会员消费等级人数分布占比",
          data: []
        }
      ];
      this.$store.state.report.datasource.currentMonthMemberLevel.forEach(
        (level, idx) => {
          levels[0].data.push([level.hemiao_Level, level.hemiao_count]);
        }
      );
      return levels;
    },
    // 本年和去年的月度会员人数的统计
    currentAndLastYearNewMembersCounts() {
      const years = this.currentYearDate.split("/");
      const newMembersByYearSeries = [
        {
          type: "bar",
          name: years[0],
          data: []
        },
        {
          type: "bar",
          name: years[1],
          data: []
        }
      ];
      this.$store.state.report.datasource.newMembersByYear.current.forEach(
        amount => {
          newMembersByYearSeries[1].data.push(amount.hemiao_count);
        }
      );
      this.$store.state.report.datasource.newMembersByYear.past.forEach(
        amount => {
          newMembersByYearSeries[0].data.push(amount.hemiao_count);
        }
      );
      return newMembersByYearSeries;
    },
    // 本月消费会员和所有会员的统计
    newAndOldMembersCount() {
      const months = this.currentMonthDate.split("/");
      const series = [
        {
          type: "spline",
          name: months[0],
          data: []
        },
        {
          type: "spline",
          name: months[1],
          data: []
        }
      ];
      this.$store.state.report.datasource.newAndOldMembers.old.forEach(
        members => {
          series[1].data.push(members.hemiao_count);
          series[1].name = "总会员(人数)";
        }
      );
      this.$store.state.report.datasource.newAndOldMembers.new.forEach(
        members => {
          series[0].data.push(members.hemiao_count);
          series[0].name = "新消费会员(人数)";
        }
      );
      return series;
    },
    // 门店所有商城的销售数据
    currentAndLastMonthSale() {
      const months = this.currentMonthDate.split("/");
      const currentAndLastMonthSaleAmountSeries = [
        {
          type: "column",
          name: months[0],
          data: []
        },
        {
          type: "column",
          name: months[1],
          data: []
        }
      ];
      this.$store.state.report.datasource.currentAndLastMonthSaleAmount.current.forEach(
        amount => {
          currentAndLastMonthSaleAmountSeries[1].data.push(amount.day_price);
        }
      );
      this.$store.state.report.datasource.currentAndLastMonthSaleAmount.past.forEach(
        amount => {
          currentAndLastMonthSaleAmountSeries[0].data.push(amount.day_price);
        }
      );
      return currentAndLastMonthSaleAmountSeries;
    },
    // 门店所有商城的销售数据(年份)
    currentAndLastYearSale() {
      const years = this.currentYearDate.split("/");
      const currentAndLastYearSaleAmountSeries = [
        {
          type: "column",
          name: years[0],
          data: []
        },
        {
          type: "column",
          name: years[1],
          data: []
        }
      ];
      this.$store.state.report.datasource.currentAndLastYearSaleAmount.current.forEach(
        amount => {
          currentAndLastYearSaleAmountSeries[1].data.push(amount.hemiao_amount);
        }
      );
      this.$store.state.report.datasource.currentAndLastYearSaleAmount.past.forEach(
        amount => {
          currentAndLastYearSaleAmountSeries[0].data.push(amount.hemiao_amount);
        }
      );
      return currentAndLastYearSaleAmountSeries;
    },
    // top20 品牌排行
    topBrandSale() {
      const top20Brands = [
        {
          name: "本月销售额",
          data: [],
          dataLabels: {
            enabled: false,
            rotation: 0,
            color: "#fff",
            align: "right",
            formatter: function() {
              return `${currencyFormatter.format(this.y, {
                locale: "zh-CN"
              })}元`;
            },
            y: 0,
            x: 0,
            style: {
              textOutline: "1px 1px #aaa",
              fontSize: "10px",
              fontFamily:
                '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
            }
          }
        },
        {
          name: "上月销售额",
          data: [],
          dataLabels: {
            enabled: false,
            rotation: 0,
            color: "#7cb5ec",
            align: "right",
            formatter: function() {
              return `${currencyFormatter.format(this.y, {
                locale: "zh-CN"
              })}元`;
            },
            y: 5,
            x: 0,
            style: {
              textOutline: "1px 1px #aaa",
              fontSize: "10px",
              fontFamily:
                '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
            }
          }
        }
      ];
      this.$store.state.report.datasource.top20BrandsSale.current.forEach(
        (brand, idx) => {
          // 只取前10名, 考虑到图标的空间限制
          if (idx < 10) {
            top20Brands[0].data.push([brand.offline_name, brand.hemiao_amount]);
          }
        }
      );
      this.$store.state.report.datasource.top20BrandsSale.past.forEach(
        (brand, idx) => {
          // 只取前10名, 考虑到图标的空间限制
          if (idx < 10) {
            top20Brands[1].data.push([brand.offline_name, brand.hemiao_amount]);
          }
        }
      );
      return top20Brands;
    },
    // top20 门店排行
    topOutletSale() {
      const top20Outlet = [
        {
          name: "销售额",
          data: [],
          dataLabels: {
            enabled: true,
            rotation: 0,
            color: "#FFFFFF",
            align: "right",
            formatter: function() {
              return `${currencyFormatter.format(this.y, {
                locale: "zh-CN"
              })}元`;
            },
            y: 0,
            x: 0,
            style: {
              textOutline: "1px 1px #aaa",
              fontSize: "10px",
              fontFamily:
                '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
            }
          }
        }
      ];
      this.$store.state.report.datasource.top20OutletSale.forEach(
        (outlet, idx) => {
          // 只取前10名, 考虑到图标的空间限制
          if (idx < 10) {
            top20Outlet[0].data.push([
              outlet.store_outlet,
              outlet.hemiao_amount
            ]);
          }
        }
      );
      return top20Outlet;
    },
    // 门店识别代码
    storeCode() {
      return this.$store.state.storeCode;
    },
    // 当前年份
    currentYearDate() {
      let beginDate, endDate, resultDate;
      if (this.dates) {
        beginDate = this.dates.subtract(1, "years").format("YYYY");
        endDate = this.dates.add(1, "years").format("YYYY");
        resultDate = `${beginDate}/${endDate}`;
      } else {
        resultDate = `${moment()
          .subtract(1, "years")
          .format("YYYY")}/${moment().format("YYYY")}`;
      }
      return resultDate;
    },
    // 当前月份和上月
    currentMonthDate() {
      return `${moment()
        .subtract(1, "months")
        .format("YYYY-MM")}/${moment().format("YYYY-MM")}`;
    },
    // 当前月份
    currentMonth() {
      let beginDate, resultDate;
      if (this.dates) {
        beginDate = this.dates.format("YYYY-MM");
        resultDate = `${beginDate}`;
      } else {
        resultDate = `${moment().format("YYYY-MM")}`;
      }
      return resultDate;
    },
    currentMonthSaleTotalAmout() {
      return this.$store.state.report.datasource.currentAndLastMonthSaleAmount
        .totalAmount.current;
    }
  },
  watch: {
    currentMonthMemberLevel: function(val) {
      // this.currentMonthMemberLevelChart = Object.assign({}, this.currentMonthMemberLevelChart, { series: val })
    },
    currentAndLastYearNewMembersCounts: function(val) {
      // this.currAndLastYearNewMembersChart = Object.assign({}, this.currAndLastYearNewMembersChart, { series: val })
    },
    currentAndLastMonthSale: function(val) {
      // this.currAndLastMonChart = Object.assign({}, this.currAndLastMonChart, { series: val })
    },
    currentAndLastYearSale: function(val) {
      // this.currAndLastYearChart = Object.assign({}, this.currAndLastYearChart, { series: val })
      this.currAndLastYearChart = null;
    },
    newAndOldMembersCount: function(val) {
      // this.currNewAndOldMembersChart = Object.assign({}, this.currNewAndOldMembersChart, { series: val })
    },
    topBrandSale: function(val) {
      // this.top20ChartBrandSale = Object.assign({}, this.top20ChartBrandSale, { series: val })
    },
    topOutletSale: function(val) {
      // this.top20ChartOutletSale = Object.assign({}, this.top20ChartOutletSale, { series: val })
    }
  },
  data() {
    const range = moment.range(
      moment("2017-05-01T00:00:00.000")
        .startOf("month")
        .format("YYYY-MM-DD"),
      moment("2017-05-01T00:00:00.000")
        .endOf("month")
        .format("YYYY-MM-DD")
    );
    const yearRange = moment.range(
      moment()
        .startOf("year")
        .format("YYYY-MM-DD"),
      moment()
        .endOf("year")
        .format("YYYY-MM-DD")
    );
    const dayString = [];
    const monthString = [];
    for (const month of range.by("day")) {
      dayString.push(month.format("DD号"));
    }
    for (const month of yearRange.by("month")) {
      monthString.push(month.format("MM月"));
    }
    return {
      isloading: false,
      currentDate: "",
      currentSaleAmount: null,
      currentTotalAmount: null,
      currentMonthMemberLevelChart: {
        theme: "darker",
        chart: {
          type: "pie",
          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
          }
        },
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          connectorColor: "silver"
        },
        tooltip: {
          headerFormat: "{series.name}<br>",
          pointFormat: "{point.name}: <b>{point.percentage:.1f}%</b>"
        },
        series: this.currentMonthMemberLevel
      },
      currAndLastYearNewMembersChart: {
        title: "",
        theme: "darker",
        inverted: false,
        yAxisTitle: "会员人数(个数)",
        valueSuffix: "",
        // legend: {
        //   enabled: true,
        //   layout: this.legendPostion || 'horizontal',
        //   align: 'center',
        //   verticalAlign: 'bottom',
        //   borderWidth: 1
        // },
        categories: monthString,
        series: this.currentAndLastYearNewMembersCounts
      },
      currNewAndOldMembersChart: {
        title: "",
        theme: "darker",
        inverted: false,
        yAxisTitle: "会员人数(个)",
        valueSuffix: "",
        legend: {
          enabled: true,
          layout: this.legendPostion || "horizontal",
          align: "center",
          verticalAlign: "bottom",
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
        title: "",
        theme: "darker",
        inverted: false,
        tooltip: {
          headerFormat: "",
          pointFormatter: function() {
            return `<span style="color:${this.series.color}">${this.series
              .name}-${this.x + 1}: </span>
                      ${currencyFormatter.format(this.y, {
                        locale: "zh-CN"
                      })}元`;
          }
        },
        yAxisTitle: "销售金额(元)",
        valueSuffix: "",
        legend: {
          enabled: true,
          layout: this.legendPostion || "horizontal",
          align: "center",
          verticalAlign: "bottom",
          borderWidth: 1
        },
        categories: monthString,
        series: this.currentAndLastYearSale
      },
      currAndLastMonChart: {
        title: "",
        theme: "darker",
        inverted: false,
        yAxisTitle: "销售金额(元)",
        valueSuffix: "",
        tooltip: {
          headerFormat: "",
          pointFormatter: function() {
            return `<span style="color:${this.series.color}">${this.series
              .name}-${this.x + 1}: </span>
                      ${currencyFormatter.format(this.y, {
                        locale: "zh-CN"
                      })}元`;
          }
        },
        legend: {
          enabled: true,
          layout: this.legendPostion || "horizontal",
          align: "center",
          verticalAlign: "bottom",
          borderWidth: 1
        },
        categories: dayString,
        series: this.currentAndLastMonthSale
      },
      top20ChartBrandSale: {
        type: "column",
        theme: "darker",
        title: "",
        inverted: true,
        tooltip: {
          enable: true,
          headerFormat: "",
          pointFormatter: function() {
            return `<span style="color:${this.series.color}">${this.series
              .name}: </span>
                      ${currencyFormatter.format(this.y, {
                        locale: "zh-CN"
                      })}元`;
          }
        },
        yAxisTitle: "销售金额(元)",
        xAxis: {
          type: "category",
          labels: {
            rotation: 0,
            style: {
              fontSize: "12px",
              fontFamily:
                '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
            }
          }
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          x: -40,
          y: 100,
          floating: true,
          borderWidth: 0,
          backgroundColor: "transparent",
          shadow: true
        },
        series: this.topBrandSale
      },
      top20ChartOutletSale: {
        type: "column",
        theme: "darker",
        title: "",
        inverted: true,
        yAxisTitle: "销售金额(元)",
        tooltip: {
          headerFormat: "",
          pointFormatter: function() {
            return `<span style="color:${this.series.color}">${this.series
              .name}: </span>
                      ${currencyFormatter.format(this.y, {
                        locale: "zh-CN"
                      })}元`;
          }
        },
        xAxis: {
          type: "category",
          labels: {
            rotation: 0,
            style: {
              fontSize: "12px",
              fontFamily:
                '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
            }
          }
        },
        legend: {
          enabled: false
        },
        series: this.topOutletSale
      }
    };
  },
  head() {
    return {
      title: "实时大屏幕"
    };
  },
  methods: {
    updateTime: function() {
      const date = moment(new Date());
      this.currentDate = date.format(date.format("YYYY-MM-DD HH:mm:ss"));
    },
    updateDS: function() {
      // ----------------------------------- //
      this.$store.dispatch("report/getCurrLastMonthSaleAmount", {
        storecode: this.storeCode
      });
      // ----------------------------------- //
      this.$store.dispatch("report/getCurrLastYearSaleAmount", {
        storecode: this.storeCode
      });
      // ----------------------------------- //
      this.$store.dispatch("report/getTOP20OutletSale", {
        storecode: this.storeCode
      });
      // ----------------------------------- //
      this.$store.dispatch("report/getTOP20BrandSale", {
        storecode: this.storeCode
      });
      // ----------------------------------- //
      this.$store.dispatch("report/getOldAndNewMembersCounts", {
        storecode: this.storeCode
      });
      // ----------------------------------- //
      this.$store.dispatch("report/getNewMembersCounts", {
        storecode: this.storeCode
      });
      // ----------------------------------- //
      this.$store.dispatch("report/getCurrentMonthMemberLevel", {
        storecode: this.storeCode
      });
      // ----------------------------------- //
      this.$store.dispatch("report/getCurrentTotalAmount", {
        storecode: this.$store.state.storeCode
      });
    },
    updateCurrentSaleAmount: function(number) {
      this.currentSaleAmount = number;
    },
    updateCurrentTotalAmount: function(number) {
      // console.log(number)
      this.currentTotalAmount = number;
    },
    buildTaskCompletedPieChart() {
      this.taskCompletedPie = Highcharts.chart(
        document.getElementById("targetComplete"),
        {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            backgroundColor: "transparent"
          },
          credits: {
            enabled: false
          },
          title: {
            float: true,
            text: "81%",
            verticalAlign: "middle"
          },
          tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              dataLabels: {
                enabled: false,
                format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                style: {
                  color:
                    (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                    "black"
                }
              }
            }
          },
          series: [
            {
              type: "pie",
              innerSize: "60%",
              name: "目标达成率",
              data: [
                ["未完成", 19.4],
                {
                  name: "月销售",
                  y: 81.6,
                  sliced: false,
                  selected: false
                }
              ]
            }
          ]
        }
      );
      this.taskCompletedPie.setTitle({
        title: "82%"
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.updateDS();
    }, 0);
    this.dateCounter = setInterval(() => {
      this.updateTime();
    }, 1000);
    // fixme: 便于演示动画效果，设置1000毫秒的延时.
    setTimeout(() => {
      this.isloading = true;
    }, 300);
    // 10秒更新一次数据源
    this.dsCounter = setInterval(() => {
      // this.updateDS()
      // this.updateCurrentSaleAmount(this.currentMonthSaleTotalAmout)
      // this.updateCurrentTotalAmount(this.currentTAmount)
      // this.buildTaskCompletedPieChart()
    }, 1 * 10 * 1000);
  },
  destroyed() {
    clearInterval(this.dateCounter);
    clearInterval(this.dsCounter);
  }
};
</script>

<style scoped>
.banner-table.el-table {
  color: #7cb342;
  background-color: transparent;
  border: 1px solid #8dc1b4;
}

.el-dashboard-container {
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #053287 100%);
  background-image: url("../assets/img/galaxy.jpg");
}

.el-dashboard-header {
  height: 80px;
  line-height: 40px;
}

.el-card.theme-darker {
  border: none;
  background-color: rgba(3, 169, 244, 0.1);
  overflow: hidden;
  margin-bottom: 10px;
}

.el-dashboard-header .text {
  font-size: 20px;
  text-align: center;
  color: #fff;
}

.el-dashboard-header .datetime {
  font-size: 16px;
  text-align: center;
  color: #fce188;
}

.el-dashboard-header .icon-lighting:hover {
  font-size: 30px;
  transform: rotateX(30);
}

.el-dashboard-header .icon-lighting {
  position: absolute;
  left: 50%;
  top: 26%;
  font-size: 20px;
  color: #b2dfdb;
  transition: all 0.5s;
}

.el-dashboard-content {
  margin-top: 5px;
}

.fa-area-chart.title {
  font-size: 24px;
  margin-left: 8px;
  margin-bottom: 15px;
  color: aqua;
}
</style>

<template>
    <div class="container">
        <el-row :gutter="15" style="margin-top: 20px;">
            <el-col :span="24">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-line-chart" aria-hidden="true"></i>总销售数据分析
                        </span>
                        <!-- <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button> -->
                    </div>
                    <div class="flex column dim">
                        <div class="flex btns center">
                            <!-- <el-button size="small" @click="lastWeek">上周</el-button> -->
                            <el-button size="small" @click="lastMonth">上月</el-button>
                            <el-button size="small" @click="lastYear">去年</el-button>
                            <el-date-picker v-model="dateTime" type="daterange" @change="timeSelect" placeholder="自定义时间" size="small" class="distance w200">
                            </el-date-picker>
                            <el-checkbox v-model="checked" type="info" class="distance">数据对比</el-checkbox>
                            <el-date-picker v-model="dimTime" v-if="checked" type="daterange" placeholder="自定义时间" @change="dimTimeSelect" size="small" class="distance w200">
                            </el-date-picker>
                        </div>
                        <div class="flex row main">
                            <div class="note flex column center" :style="{width:'15%'}">
                                <span class="flex saleimg"></span>
                                <span class="flex">本月总销售(元)</span>
                                <span class="flex text-total">{{saleTotal}}</span>
                                <span class="flex avgimg"></span>
                                <span class="flex">本月平均销售(元)</span>
                                <span class="flex text-dim">{{average}}</span>
                                <div class="flex column annotation">
                                    <span class="flex mid">
                                        <span class="flex circle"></span>
                                        <span>注释</span>
                                    </span>
                                    <span class="flex">1.默认数据为本月所有门店新客人数，按天查看</span>
                                    <span class="flex">2."按天查看"所选天数不得超过30天</span>
                                    <span class="flex">3."按月查看"所选不得超过12个月</span>
                                    <span class="flex">4.点击"活动"按钮，可查看当前选择时间内所有活动详情</span>
                                </div>
                            </div>
                            <div class="chart flex" id="total" :style="{width:'60%',height:this.containerHeight+'px'}">
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Vue from "vue";
import echarts from "echarts";
import { currency, getPreMonth } from "./../../utils/currency";

import {
  Button,
  Col,
  Row,
  Tooltip,
  Card,
  Alert,
  Checkbox,
  DatePicker,
  Loading
} from "element-ui";
Vue.use(Button);
Vue.use(Col);
Vue.use(Card);
Vue.use(Row);
Vue.use(Tooltip);
Vue.use(Alert);
Vue.use(Checkbox);
Vue.use(DatePicker);
export default {
  components: {},
  props: ["storeList", "saleTotalSeries", "saleTotalDimSeries"],
  watch: {
    storeList: function(val) {},
    saleTotalSeries: function(val) {
      // console.log(val);
      this.containerHeight = val.data.length / 25 * 400 + 200;
      this.saleTotal = currency(val.total, "￥");
      this.average = currency(val.total / val.data.length, "￥");
      this.optionData.yAxis.data = val.name;
      this.optionData.series[0].data = val.data;
      this.closeLoad();
      this.setChart();
    },
    saleTotalDimSeries: function(val) {
      this.optionData.series[1].data = val.data;
      this.setChart();
    }
  },
  computed: {},
  data() {
    return {
      storecode:this.$store.state.storeCode,
      containerHeight: 1,
      saleTotal: 0,
      average: 0,
      checked: false,
      loading: null,
      value: "",
      dateTime: "",
      dimTime: "",
      loadAttr: {
        target: "#total",
        fullscreen: false,
        text: "正在生成图表"
      },
      optionData: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["销售数据", "对比数据"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          splitNumber: 2,
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          // data: ['南湖店', '王家湾店', '同济店', '光谷步行街店', '汉阳永旺店', '街道口店', '徐东群星店'],
          data: this.saleTotalSeries.name
        },
        series: [
          {
            name: "销售数据",
            type: "bar",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  { offset: 0, color: "#4d92ff" },
                  { offset: 1, color: "#57cbff" }
                ])
              }
            },
            data: this.saleTotalSeries.data
          },
          {
            name: "对比数据",
            type: "bar",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  { offset: 0, color: "#ff8395" },
                  { offset: 1, color: "#fac47f" }
                ])
              }
            },
            // data: [100, 520, 233, 134, 359, 33, 222],
            data: this.saleTotalDimSeries.data
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    console.log(this.$store.state.storeCode);
    // this.containerHeight = this.saleTotalSeries.data.length / 25 * 400 + 200;
    // this.saleTotal = currency(this.saleTotalSeries.total, "￥");
    // this.average = currency(
    //   this.saleTotalSeries.total / this.saleTotalSeries.data.length,
    //   "￥"
    // );
    // this.optionData.yAxis.data = this.saleTotalSeries.name;
    // this.optionData.series[0].data = this.saleTotalSeries.data;
    // this.setChart();
    // console.log(this.currentMonthSeries);
    this.loading = Loading.service(this.loadAttr);
  },
  updated() {},
  activated() {},
  methods: {
    Dom(e) {
      return echarts.init(document.getElementById(e));
    },
    closeLoad() {
      this.loading.close();
      //   console.log(this.loading);
    },
    // init(e) {
    //     return echarts.init(document.getElementById(e))
    // },
    setChart() {
      let chart = this.Dom("total");
      chart.resize({
        height: this.containerHeight
      });
      chart.setOption(this.optionData);
    },
    timeSelect(e) {
      // console.log(e);
      if (e) {
        let val = e.split(" - ");
        let startDate = val[0].replace(/-/g, "") + "";
        let endDate = val[1].replace(/-/g, "") + "";
        this.$store.dispatch("report/getSaleTotal", {
          storecode: this.storecode,
          startDate: startDate,
          endDate: endDate
        });
        // this.setChart()
      }
    },
    dimTimeSelect(e) {
      if (e) {
        let val = e.split(" - ");
        let startDate = val[0].replace(/-/g, "") + "";
        let endDate = val[1].replace(/-/g, "") + "";
        this.$store.dispatch("report/getSaleTotalDim", {
          storecode: this.storecode,
          startDate: startDate,
          endDate: endDate
        });
        // this.setChart()
      }
    },
    lastWeek(e) {
      // console.log(e, 'lastWeek')
      // this.optionData.series[0].data = [5464, 542, 2100, 3304, 5390, 4330, 2020]
      // this.optionData.series[1].data = [102, 952, 2100, 3234, 3790, 3630, 820]
      // this.setChart();
    },
    lastMonth(e) {
      let date = new Date().Format("yyyy-MM-dd");
      let preMonth = new Date(getPreMonth(date)).Format("yyyyMM");
      let startDate = preMonth + "01";
      let endDate = preMonth + "31";
      this.$store.dispatch("report/getSaleTotal", {
        storecode: this.storecode,
        startDate: startDate,
        endDate: endDate
      });
      //   console.log(preMonth);
      //   this.setChart();
    },
    lastYear(e) {
      // console.log(e, 'lastYear',this.dateTime,this.dimTime);
      let date = new Date().Format("yyyy") - 1;
      let startDate = date + "0101";
      let endDate = date + "1231";
      this.$store.dispatch("report/getSaleTotal", {
        storecode: this.storecode,
        startDate: startDate,
        endDate: endDate
      });
      //   console.log(startDate, endDate);
      //   this.setChart();
    }
  }
};
</script>

<style scoped>
.flex {
  display: flex;
}

.row {
  flex-direction: row;
}

.column {
  flex-direction: column;
}

.center {
  justify-content: center;
  align-items: center;
}

.text-total,
.text-dim {
  font-size: 20px;
}

.annotation {
  font-size: 12px;
}

.text-total {
  color: #75a8f2;
}

.text-dim {
  color: #f8a219;
}

.main {
  padding-top: 28px;
}

.saleimg {
  width: 100%;
  height: 40px;
  background: url("./../../assets/img/totalSale.png") no-repeat;
}

.avgimg {
  width: 100%;
  height: 40px;
  background: url("./../../assets/img/average.png") no-repeat;
}

.note {
  border: 1px solid #a0a0a0;
  border-radius: 8px;
}

.distance {
  margin-left: 10px;
}

.w200 {
  width: 200px;
}
</style>

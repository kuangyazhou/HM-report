<template>
    <div class="container">
        <el-row :gutter="15" style="margin-top: 20px;">
            <el-col :span="18">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-database" aria-hidden="true"></i>
                            门店平均客单价分析
                        </span>
                    </div>
                    <div class="flex column">
                        <div class="flex btns center">
                            <!-- <el-button size="small" @click="lastWeek">上周</el-button> -->
                            <el-button size="small" @click="lastMonthPrice">上月</el-button>
                            <el-button size="small" @click="lastYearPrice">去年</el-button>
                            <el-checkbox v-model="priceSwitch" type="info" class="distance m5">数据对比</el-checkbox>
                            <el-date-picker v-model="pTime" v-if="priceSwitch" type="daterange" placeholder="选择日期范围" @change="priceTime" size="small" class="distance w200">
                            </el-date-picker>
                        </div>
                        <div class="flex main row">
                          <div class="note flex column stream" :style="{width:'180px'}">
                            <span class="flex saleimg"></span>
                            <span class="flex column center">
                              <span class="flex">平均客单价(元)</span>
                              <span class="flex text-total">{{saleAvg}}</span>
                            </span>
                            <span class="flex column center" v-if="dimPriceSwitch">
                              <span class="flex">对比平均客单价(元)</span>
                              <span class="flex text-yellow">{{dimSale}}</span>
                            </span>
                            <span class="flex column annotation">
                                  <span class="flex mid">
                                    <span class="flex circle"></span>
                                    <span>注释</span>
                                  </span>
                                  <span class="flex">1.默认数据为本月门店平均客单价,可进行快捷切换选择</span>
                                  <span class="flex">2.点击"数据对比"可选择任意时间段与当前数据进行对比</span>
                                </span>
                          </div>
                            <div id="orderAvg" :style="{width:'80%',height:'400px'}"></div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="15" style="margin-top: 20px;">
            <el-col :span="18">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-calendar" aria-hidden="true"></i>门店平均单客消费次数分析
                        </span>
                    </div>
                    <div class="flex column">
                        <div class="flex btns center">
                            <!-- <el-button size="small" @click="lastWeek">上周</el-button> -->
                            <el-button size="small" @click="lastMonthTimes">上月</el-button>
                            <el-button size="small" @click="lastYearhTimes">去年</el-button>
                            <el-checkbox v-model="timeSwitch" type="info" class="distance m5">数据对比</el-checkbox>
                            <el-date-picker v-model="tTime" v-if="timeSwitch" type="daterange" placeholder="选择日期范围" @change="timeChange" size="small" class="distance w200">
                            </el-date-picker>
                        </div>
                        <div class="flex row main">
                          <div class="note flex column stream" :style="{width:'180px'}">
                             <span class="flex timesimg"></span>
                             <span class="flex column center">
                               <span class="flex">平均消费次数</span>
                               <span class="flex text-Times">{{consume}}</span>
                             </span>
                             <span class="flex column center" v-if="dimTimeSwitch">
                               <span class="flex">对比平均消费次数</span>
                               <span class="flex text-yellow">{{dimConsume}}</span>
                             </span>
                            <span class="flex column annotation">
                                  <span class="flex mid">
                                    <span class="flex circle"></span>
                                    <span>注释</span>
                                  </span>
                                  <span class="flex">1.默认数据为本月门店平均单客消费次数,可进行快捷切换选择</span>
                                  <span class="flex">2.点击"数据对比"可选择任意时间段与当前数据进行对比</span>
                                </span>
                          </div>
                            <div id="orderTimes" :style="{width:'80%',height:'400px'}"></div>
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
  props: [
    "storeList",
    "saleOrderPrice",
    "saleOrderPriceDim",
    "slaeOrderTimes",
    "saleOrderTimeDim"
  ],
  watch: {
    storeList: function(val) {
      //   console.log(val);
    },
    saleOrderPrice: function(val) {
      // console.log('1');
      this.saleAvg = val.mean;
      this.priceData.series[0].data = val.avg;
      this.priceData.yAxis.data = val.name;
      this.priceClose();
      this.setPrice();
    },
    saleOrderPriceDim: function(val) {
      // console.log(val);
      this.dimPriceSwitch = true;
      this.dimSale = val.mean;
      this.priceData.series[1].data = val.avg;
      this.setPrice();
    },
    slaeOrderTimes: function(val) {
      // console.log(val);
      this.timesData.series[0].data = val.avg;
      this.timesData.yAxis.data = val.name;
      this.consume = val.times;
      this.timesClose();
      this.setTimes();
    },
    saleOrderTimeDim: function(val) {
      this.dimTimeSwitch = true;
      this.dimConsume = val.times;
      this.timesData.series[1].data = val.avg;
      this.setTimes();
    }
  },
  computed: {},
  data() {
    return {
      priceSwitch: false,
      timeSwitch: false,
      dimPriceSwitch: false,
      dimTimeSwitch: false,
      pTime: "",
      tTime: "",
      saleAvg: 0,
      dimSale: 0,
      consume: 0,
      dimConsume: 0,
      storecode: this.$store.state.storeCode,
      priceloading: null,
      timesloading: null,
      priceAttr: {
        target: "#orderAvg",
        fullscreen: false,
        text: "正在生成图表"
      },
      timesAttr: {
        target: "#orderTimes",
        fullscreen: false,
        text: "正在生成图表"
      },
      priceData: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["平均客单价", "对比数据"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          splitNumber: 3
          // boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: this.saleOrderPrice.name
        },
        series: [
          {
            name: "平均客单价",
            type: "bar",
            data: this.saleOrderPrice.avg,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  { offset: 0, color: "#4d92ff" },
                  { offset: 1, color: "#57cbff" }
                ])
              }
            }
          },
          {
            name: "对比数据",
            type: "bar",
            data: this.saleOrderPriceDim.avg,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  { offset: 0, color: "#ff8395" },
                  { offset: 1, color: "#fac47f" }
                ])
              }
            }
          }
        ]
      },
      timesData: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["本月次数", "对比数据"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value"
          // splitNumber: 2,
          // boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: this.slaeOrderTimes.name
        },
        series: [
          {
            name: "本月次数",
            type: "bar",
            data: this.slaeOrderTimes.avg,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  { offset: 0, color: "#4d92ff" },
                  { offset: 1, color: "#57cbff" }
                ])
              }
            }
          },
          {
            name: "对比数据",
            type: "bar",
            data: this.saleOrderTimeDim.avg,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  { offset: 0, color: "#ff8395" },
                  { offset: 1, color: "#fac47f" }
                ])
              }
            }
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    // this.setPrice();
    // this.setTimes();
    this.priceloading = Loading.service(this.priceAttr);
    this.timesloading = Loading.service(this.timesAttr);
  },
  updated() {},
  activated() {},
  methods: {
    // select(e) {
    //     console.log(e, this.value);
    // },
    priceClose() {
      this.priceloading.close();
      //   console.log(this.loading);
    },
    timesClose() {
      this.timesloading.close();
      //   console.log(this.loading);
    },
    priceTime(e) {
      // console.log(this.pTime);
      if (e) {
        let val = e.split(" - ");
        let startDate = val[0].replace(/-/g, "") + "";
        let endDate = val[1].replace(/-/g, "") + "";
        // let startDate = (new Date(this.pTime[0])).Format('yyyyMMdd') + '';
        // let endDate = (new Date(this.pTime[1])).Format('yyyyMMdd') + '';
        this.$store.dispatch("report/getSaleOrderDim", {
          storecode: this.storecode,
          startDate: startDate,
          endDate: endDate
        });
        this.setPrice();
        //     console.log(startDate, endDate);
      }
    },
    timeChange(e) {
      if (e) {
        let val = e.split(" - ");
        let startDate = val[0].replace(/-/g, "") + "";
        let endDate = val[1].replace(/-/g, "") + "";
        // let startDate = (new Date(this.pTime[0])).Format('yyyyMMdd') + '';
        // let endDate = (new Date(this.pTime[1])).Format('yyyyMMdd') + '';
        this.$store.dispatch("report/getSaleTimeDim", {
          storecode: this.storecode,
          startDate: startDate,
          endDate: endDate
        });
        this.setPrice();
        //     console.log(startDate, endDate);
      }
    },
    setPrice() {
      let priceChart = echarts.init(document.getElementById("orderAvg"));
      priceChart.setOption(this.priceData);
    },
    setTimes() {
      let priceChart = echarts.init(document.getElementById("orderTimes"));
      priceChart.setOption(this.timesData);
    },
    lastWeek(e) {
      console.log(e, "lastWeek");
    },
    lastMonthPrice(e) {
      // console.log(e, "lastMonth");
      let date = new Date().Format("yyyy-MM-dd");
      let preMonth = new Date(getPreMonth(date)).Format("yyyyMM");
      let startDate = preMonth + "01";
      let endDate = preMonth + "31";
      this.$store.dispatch("report/getSaleOrder", {
        storecode: this.storecode,
        startDate: startDate,
        endDate: endDate
      });
    },
    lastYearPrice(e) {
      let date = new Date().Format("yyyy") - 1;
      let startDate = date + "0101";
      let endDate = date + "1231";
      this.$store.dispatch("report/getSaleOrder", {
        storecode: this.storecode,
        startDate: startDate,
        endDate: endDate
      });
      // console.log(e, "lastYear");
    },
    lastMonthTimes(e) {
      let date = new Date().Format("yyyy-MM-dd");
      let preMonth = new Date(getPreMonth(date)).Format("yyyyMM");
      let startDate = preMonth + "01";
      let endDate = preMonth + "31";
      this.$store.dispatch("report/getSaleOrderTimes", {
        storecode: this.storecode,
        startDate: startDate,
        endDate: endDate
      });
    },
    lastYearhTimes(e) {
      let date = new Date().Format("yyyy") - 1;
      let startDate = date + "0101";
      let endDate = date + "1231";
      this.$store.dispatch("report/getSaleOrderTimes", {
        storecode: this.storecode,
        startDate: startDate,
        endDate: endDate
      });
    }
  }
};
</script>

<style scoped>
.m5 {
  margin-left: 5px;
}

.annotation {
  font-size: 12px;
}
.flex {
  display: flex;
}
.stream {
  justify-content: space-around;
  align-items: center;
}
.row {
  flex-direction: row;
}
.text-total,
.text-Times,
.text-yellow {
  font-size: 26px;
}

.text-total,
.text-Times {
  color: #75a8f2;
}
.text-yellow {
  color: #f8a219;
}

.saleimg {
  width: 100%;
  height: 40px;
  background: url("./../../assets/img/average.png") no-repeat;
}
.timesimg {
  width: 100%;
  height: 40px;
  background: url("./../../assets/img/average.png") no-repeat;
}
.column {
  flex-direction: column;
}
.note {
  border: 1px solid #a0a0a0;
  border-radius: 8px;
}
</style>

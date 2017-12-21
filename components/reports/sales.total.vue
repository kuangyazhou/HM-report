<template>
  <div class="container">
    <el-row :gutter="15" style="margin-top: 20px;">
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">
              <i class="fa fa-line-chart" aria-hidden="true"></i>
              <span class="chart-title">总销售数据分析</span>
            </span>
            <!-- <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button> -->
          </div>
          <div class="flex column dim">
            <div class="flex btns center">
              <!-- <el-button size="small" @click="lastWeek">上周</el-button> -->
              <el-button size="small" @click="currentMonth" type="primary">本月</el-button>
              <el-button size="small" @click="lastMonth">上月</el-button>
              <el-button size="small" @click="lastYear">去年</el-button>
              <el-date-picker v-model="dateTime" type="daterange" @change="timeSelect" placeholder="自定义时间" size="small" class="distance w200">
              </el-date-picker>
              <el-checkbox v-model="checked" type="info" class="distance">数据对比</el-checkbox>
              <el-date-picker v-model="dimTime" v-if="checked" type="daterange" placeholder="自定义时间" @change="dimTimeSelect" size="small" class="distance w200">
              </el-date-picker>
            </div>
            <div class="flex row main">
              <div class="note flex column" :style="{width:'16%'}">
                <span class="flex saleimg"></span>
                <span class="flex column">
                  <span class="flex">总销售(元)</span>
                  <span class="flex text-total">{{saleTotal}}</span>
                </span>
                <span class="flex avgimg"></span>
                <span class="flex column">
                  <span class="flex">平均销售(元)</span>
                  <span class="flex text-dim">{{average}}</span>
                </span>
                <div class="flex column annotation">
                  <span class="flex mid">
                    <span class="flex circle"></span>
                    <span>注释</span>
                  </span>
                  <span class="flex">1.默认数据为本月总销售,可进行快捷切换选择;</span>
                  <span class="flex">2.点击"数据对比"可选择任意时间段与当前数据进行对比</span>
                  <span class="flex">3.单击门店可查看该门店内各导购销售详情</span>
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
  props: [
    "storeList",
    "saleTotalSeries",
    "saleTotalStore",
    "saleTotalDimSeries"
  ],
  watch: {
    storeList: function(val) {},
    saleTotalSeries: function(val) {
      if (!this.currentMonthSeries) {
        this.currentMonthSeries = val;
      }
      // console.log(val);
      this.containerHeight = val.data.length / 25 * 400 + 200;
      this.saleTotal = currency(val.total, "￥");
      this.average = currency(val.total / val.data.length, "￥");
      this.optionData.yAxis.data = val.name;
      this.optionData.series[0].data = val.data;
      this.storeId = val.outlet;
      this.closeLoad();
      this.saleTotalChart.resize({
        height: this.containerHeight
      });
      this.saleTotalChart.setOption(this.optionData);
    },
    saleTotalStore: function(val) {
      // console.log(val);
      this.optionData.yAxis.data = val.name;
      this.optionData.series[0].data = val.data;
      this.containerHeight = val.data.length / 25 * 400 + 200;
      this.saleTotal = currency(val.total, "￥");
      this.average = currency(val.total / val.data.length, "￥");
      this.saleTotalChart.resize({
        height: this.containerHeight
      });
      this.saleTotalChart.setOption(this.optionData);
    },
    saleTotalDimSeries: function(val) {
      this.optionData.series[1].data = val.data;
      // this.saleTotalChart.resize({
      //   height: this.containerHeight
      // });
      this.saleTotalChart.setOption(this.optionData);
    }
  },
  computed: {},
  data() {
    return {
      // storecode: this.$store.state.storeCode,
      containerHeight: 1,
      saleTotal: 0,
      average: 0,
      checked: false,
      currentMonthSeries: null,
      loading: null,
      dimSwitch: false,
      storeId: [],
      saleTotalChart: null,
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
            data: this.saleTotalDimSeries.data
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    this.saleTotalChart = echarts.init(document.getElementById("total"));
    if (!this.optionData.series[0].data) {
      if (!this.currentMonthSeries) {
        this.currentMonthSeries = this.saleTotalSeries;
        this.containerHeight =
          this.saleTotalSeries.data.length / 25 * 400 + 200;
        this.saleTotal = currency(this.saleTotalSeries.total, "￥");
        this.average = currency(
          this.saleTotalSeries.total / this.saleTotalSeries.data.length,
          "￥"
        );
        this.optionData.yAxis.data = this.saleTotalSeries.name;
        this.optionData.series[0].data = this.saleTotalSeries.data;
        this.storeId = this.saleTotalSeries.outlet;
        this.closeLoad();
        this.saleTotalChart.resize({
          height: this.containerHeight
        });
        this.saleTotalChart.setOption(this.optionData);
      }
      // console.log(val);
    }
    this.saleTotalChart.on("click", e => {
      this.dimSwitch = true;
      this.optionData.series[1].data = [];
      this.storeSelect(e);
      this.saleTotalChart.off("click");
    });
    this.loading = Loading.service(this.loadAttr);
  },
  updated() {},
  activated() {},
  computed: {
    storeCode() {
      return (
        this.$store.state.storeCode || window.localStorage.getItem("storecode")
      );
    }
  },
  methods: {
    closeLoad() {
      this.loading.close();
    },
    storeSelect(e) {
      let id = this.storeId[e.dataIndex];
      let startDate = new Date().Format("yyyyMM") + "01";
      let endDate = new Date().Format("yyyyMMdd");
      // let startDate = "20171101";
      // let endDate = "20171130";
      // console.log(id, startDate, endDate);
      // if (this.dimSwitch) {
      // } else {
      this.$store.dispatch("report/getSaleToalStore", {
        storecode: this.storeCode,
        outletId: id,
        startDate: startDate,
        endDate: endDate
      });
      // }
    },
    timeSelect(e) {
      if (e) {
        let val = e.split(" - ");
        let startDate = val[0].replace(/-/g, "") + "";
        let endDate = val[1].replace(/-/g, "") + "";
        this.$store.dispatch("report/getSaleTotal", {
          storecode: this.storeCode,
          startDate: startDate,
          endDate: endDate
        });
      }
    },
    dimTimeSelect(e) {
      if (e) {
        let val = e.split(" - ");
        let startDate = val[0].replace(/-/g, "") + "";
        let endDate = val[1].replace(/-/g, "") + "";
        this.$store.dispatch("report/getSaleTotalDim", {
          storecode: this.storeCode,
          startDate: startDate,
          endDate: endDate
        });
      }
    },
    currentMonth(e) {
      this.containerHeight =
        this.currentMonthSeries.data.length / 25 * 400 + 200;
      this.saleTotal = currency(this.currentMonthSeries.total, "￥");
      this.average = currency(
        this.currentMonthSeries.total / this.currentMonthSeries.data.length,
        "￥"
      );
      this.optionData.yAxis.data = this.currentMonthSeries.name;
      this.optionData.series[0].data = this.currentMonthSeries.data;
      this.storeId = this.currentMonthSeries.outlet;
      // this.closeLoad();
      this.saleTotalChart.resize({
        height: this.containerHeight
      });
      this.saleTotalChart.setOption(this.optionData);
    },
    lastMonth(e) {
      let date = new Date().Format("yyyy-MM-dd");
      let preMonth = new Date(getPreMonth(date)).Format("yyyyMM");
      let startDate = preMonth + "01";
      let endDate = preMonth + "31";
      this.$store.dispatch("report/getSaleTotal", {
        storecode: this.storeCode,
        startDate: startDate,
        endDate: endDate
      });
    },
    lastYear(e) {
      let date = new Date().Format("yyyy") - 1;
      let startDate = date + "0101";
      let endDate = date + "1231";
      this.$store.dispatch("report/getSaleTotal", {
        storecode: this.storeCode,
        startDate: startDate,
        endDate: endDate
      });
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
  align-items: center;
  justify-content: space-around;
}

.distance {
  margin-left: 10px;
}

.w200 {
  width: 200px;
}
</style>

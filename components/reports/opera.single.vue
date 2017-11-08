<template>
    <div class="container">
        <el-row :gutter="15" style="margin-top: 20px;">
            <el-col :span="24">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-money" aria-hidden="true"></i>维护客户购买单价分析
                        </span>
                        <!-- <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button> -->
                    </div>
                    <div class="flex column person">
                        <div class="flex btns center">
                            <!-- <el-button size="small">上周</el-button> -->
                            <el-button @click="lastMonth" size="small">上月</el-button>
                            <el-date-picker v-model="dimTime" type="daterange" placeholder="选择日期范围" size="small m5" @change="dateSelect" class="distance w200">
                            </el-date-picker>
                        </div>
                        <div class="flex row main">
                            <div class="flex note column center" :style="{width:'180px'}">
                                <span class="flex saleimg"></span>
                                <span class="flex center column">
                                    <span class="flex">0-100元(人)</span>
                                    <span class="flex text-total center">
                                        <span>{{oneTotal}}</span>
                                        <span class="text-gray">(均值<span class="text-yellow">{{oneAvg}}</span>)</span>
                                    </span>
                                </span>
                                <span class="flex center column">
                                    <span class="flex">100-200元(人)</span>
                                    <span class="flex text-total center">
                                        <span>{{twoTotal}}</span>
                                        <span class="text-gray">(均值<span class="text-yellow">{{twoAvg}}</span>)</span>
                                    </span>
                                </span>
                                <span class="flex center column">
                                    <span class="flex">200-300元(人)</span>
                                    <span class="flex text-total center">
                                        <span>{{threeTotal}}</span>
                                        <span class="text-gray">(均值<span class="text-yellow">{{threeAvg}}</span>)</span>
                                    </span>
                                </span>
                                <span class="flex center column">
                                    <span class="flex">300-500元(人)</span>
                                    <span class="flex text-total center">
                                        <span>{{fiveTotal}}</span>
                                        <span class="text-gray">(均值<span class="text-yellow">{{fiveAvg}}</span>)</span>
                                    </span>
                                </span>
                                <span class="flex center column">
                                    <span class="flex">500-1000元(人)</span>
                                    <span class="flex text-total center">
                                        <span>{{tenTotal}}</span>
                                        <span class="text-gray">(均值<span class="text-yellow">{{tenAvg}}</span>)</span>
                                    </span>
                                </span>
                                <span class="flex center column">
                                    <span class="flex">1000元以上(人)</span>
                                    <span class="flex text-total center">
                                        <span>{{thousandTotal}}</span>
                                        <span class="text-gray">(均值<span class="text-yellow">{{thousandAvg}}</span>)</span>
                                    </span>
                                </span>
                            </div>
                            <div class="flex" :style="{width:'85%', height:'400px'}" id="single">
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
  props: ["storeList", "operaDealPriceSeries"],
  watch: {
    storeList: function(val) {
      //   console.log(val);
    },
    operaDealPriceSeries: function(val) {
      //   console.log(val);
      this.priceData.xAxis[0].data = val.name;
      this.priceData.series[0].data = val.oneData.series;
      this.oneTotal = val.oneData.total;
      this.oneAvg = val.oneData.avg;
      this.priceData.series[1].data = val.twoData.series;
      this.twoTotal = val.twoData.total;
      this.twoAvg = val.twoData.avg;
      this.priceData.series[2].data = val.threeData.series;
      this.threeTotal = val.threeData.total;
      this.threeAvg = val.threeData.avg;
      this.priceData.series[3].data = val.fiveData.series;
      this.fiveTotal = val.fiveData.total;
      this.fiveAvg = val.fiveData.avg;
      this.priceData.series[4].data = val.tenData.series;
      this.tenTotal = val.tenData.total;
      this.tenAvg = val.tenData.avg;
      this.priceData.series[5].data = val.thousandData.series;
      this.thousandTotal = val.thousandData.total;
      this.thousandAvg = val.thousandData.avg;
      this.closeLoad();
      this.setPrice();
    }
  },
  computed: {},
  data() {
    return {
      storecode:this.$store.state.storeCode,
      checked: false,
      value: "",
      dimTime: "",
      oneTotal: 0,
      oneAvg: 0,
      twoTotal: 0,
      twoAvg: 0,
      threeTotal: 0,
      threeAvg: 0,
      fiveTotal: 0,
      fiveAvg: 0,
      tenTotal: 0,
      tenAvg: 0,
      thousandTotal: 0,
      thousandAvg: 0,
      loading: null,
      loadAttr: {
        target: "#single",
        fullscreen: false,
        text: "正在生成图表"
      },
      priceData: {
        color: [
          "#0d6bb2",
          "#0579c1",
          "#128dd8",
          "#4cb7ed",
          "#97e2ff",
          "#b6eeff"
        ],
        legend: {
          data: ["0-100", "100-200", "200-300", "300-500", "500-1000", "1000以上"]
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周天']
            data: [],
            axisLabel: {
              interval: 0,
              rotate: 30
            }
          }
        ],
        yAxis: {
          type: "value",
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "0-100",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            // data: [1200, 132, 101, 134, 90, 2300, 210]
            data: this.operaDealPriceSeries.oneData.series
          },
          {
            name: "100-200",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            // data: [220, 1820, 191, 234, 290, 330, 310]
            data: this.operaDealPriceSeries.twoData.series
          },
          {
            name: "200-300",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            // data: [150, 232, 2010, 154, 190, 330, 410]
            data: this.operaDealPriceSeries.threeData.series
          },
          {
            name: "300-500",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            // data: [320, 332, 301, 3340, 390, 330, 320]
            data: this.operaDealPriceSeries.fiveData.series
          },
          {
            name: "500-1000",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            // data: [820, 932, 901, 934, 1290, 1330, 1320]
            data: this.operaDealPriceSeries.tenData.series
          },
          {
            name: "1000以上",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            // data: [20, 32, 301, 340, 90, 33, 30]
            data: this.operaDealPriceSeries.thousandData.series
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    this.loading = Loading.service(this.loadAttr);
    // console.log(this.operaDealPriceSeries);
    // this.priceData.xAxis[0].data = this.operaDealPriceSeries.name;
    // this.priceData.series[0].data = this.operaDealPriceSeries.one;
    // this.priceData.series[1].data = this.operaDealPriceSeries.two;
    // this.priceData.series[2].data = this.operaDealPriceSeries.three;
    // this.priceData.series[3].data = this.operaDealPriceSeries.five;
    // this.priceData.series[4].data = this.operaDealPriceSeries.ten;
    // this.priceData.series[5].data = this.operaDealPriceSeries.thousand;
    // this.setPrice();
  },
  updated() {},
  activated() {},
  methods: {
    setPrice() {
      let priceChart = echarts.init(document.getElementById("single"));
      priceChart.setOption(this.priceData);
    },
    closeLoad() {
      this.loading.close();
      //   console.log(this.loading);
    },
    dateSelect(e) {
      if (e) {
        let val = e.split(" - ");
        let startDate = val[0].replace(/-/g, "") + "";
        let endDate = val[1].replace(/-/g, "") + "";
        this.startDate = startDate;
        this.endDate = endDate;
        this.$store.dispatch("report/getOperaDealPrice", {
          storecode: this.storecode,
          startDate: startDate,
          endDate: endDate
        });
        this.setPrice();
      }
    },
    lastMonth(e) {
      let date = new Date().Format("yyyy-MM-dd");
      let preMonth = new Date(getPreMonth(date)).Format("yyyyMM");
      let startDate = preMonth + "01";
      let endDate = preMonth + "31";
      this.$store.dispatch("report/getOperaDealPrice", {
        storecode: this.storecode,
        // startDate: startDate,
        // endDate: endDate
        startDate: "20171001",
        endDate: "20171005"
      });
    }
  }
};
</script>

<style scoped>
.flex {
  display: flex;
}
.m5 {
  margin-left: 5px;
}
.row {
  flex-direction: row;
}
.annotation {
  font-size: 12px;
}
.column {
  flex-direction: column;
}
.saleimg {
  width: 100%;
  height: 40px;
  background: url("./../../assets/img/totalSale.png") no-repeat;
}
.center {
  justify-content: center;
  align-items: center;
}
.text-total {
  color: #75a8f2;
  font-size: 26px;
}
.text-gray {
  font-size: 14px;
  color: gray;
}
.text-yellow {
  color: #f8a219;
}
.main {
  padding-top: 28px;
}

.note {
  border: 1px solid #a0a0a0;
  border-radius: 8px;
  justify-content: space-around;
  align-items: center;
}
</style>

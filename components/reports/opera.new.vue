<template>
    <div class="container">
        <el-row :gutter="15" style="margin-top: 20px;">
            <el-col :span="24">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-retweet" aria-hidden="true"></i>新客统计分析
                        </span>
                    </div>
                    <div class="flex column opera">
                        <div class="flex btns center">
                            <el-button size="small" :disabled="total">所有门店</el-button>
                            <el-date-picker v-model="dimTime" type="daterange" placeholder="选择日期范围" @change="dateSelect"
                                            size="small" class="m5 w200">
                            </el-date-picker>
                        </div>
                        <div class="flex row main">
                            <div class="flex note column center" :style="{width:'200px'}">
                                <span class="flex saleimg"></span>
                                <span class="flex center column">
                                  <span class="flex">扫码(人)</span>
                                  <span class="flex text-total center">
                                    <span>{{totalScan}}</span>
                                    <span class="text-gray">(均值<span class="text-yellow">{{scanAvg}}</span>)</span>
                                  </span>
                                </span>
                                <span class="flex center column">
                                  <span class="flex">绑定(人)</span>
                                  <span class="flex text-total center">
                                    <span>{{totalBind}}</span>
                                    <span class="text-gray">(均值<span class="text-yellow">{{bindAvg}}</span>)</span>
                                  </span>
                                </span>
                                <span class="flex center column">
                                  <span class="flex">注册(人)</span>
                                  <span class="flex text-total center">
                                    <span>{{totalReg}}</span>
                                    <span class="text-gray">(均值<span class="text-yellow">{{regAvg}}</span>)</span>
                                  </span>
                                </span>
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
                            <div id="newChart" :style="{width:'75%',height:this.containerHeight+'px'}">
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
    "operaMainSeries",
    "operaGuideSeries",
    "operaGuideCurrentMonth"
  ],
  watch: {
    storeList: function(val) {},
    operaMainSeries: function(val) {
      // this.containerHeight = val.scan.length / 25 * 200 + 400;
      this.totalScan = val.totalScan;
      this.totalReg = val.totalReg;
      this.totalBind = val.totalBind;
      this.scanAvg = (val.totalScan / val.scan.length).toFixed(1);
      this.regAvg = (val.totalReg / val.scan.length).toFixed(1);
      this.bindAvg = (val.totalBind / val.scan.length).toFixed(1);
      this.operaData.yAxis.data = val.name;
      this.operaData.series[0].data = val.scan;
      this.operaData.series[1].data = val.bind;
      this.operaData.series[2].data = val.reg;
      this.selectStore = val.sel;
      this.closeLoad();
      this.setOpera();
    },
    operaGuideSeries: function(val) {
      // console.log(val);
      // this.Height = (val.scan.length) / 25 * 400 + 200;
      this.guideData.yAxis.data = val.name;
      this.guideData.series[0].data = val.scan;
      this.guideData.series[1].data = val.bind;
      this.guideData.series[2].data = val.reg;
      this.selectGuide = val.sel;
      this.setGuide();
    },
    operaGuideCurrentMonth: function(val) {
      // console.log(val);
      // this.Height = (val.scan.length) / 25 * 400 + 200;
      this.detailData.xAxis.data = val.name;
      this.detailData.series[0].data = val.scan;
      this.detailData.series[1].data = val.reg;
      this.detailData.series[2].data = val.bind;
      this.setDetail();
    }
  },
  computed: {},
  data() {
    return {
      storecode: this.$store.state.storeCode,
      total: true,
      guideSwitch: true,
      guide: null,
      checked: false,
      value: "",
      outlet: null,
      dimTime: "",
      startDate: null,
      endDate: null,
      totalScan: 0,
      totalReg: 0,
      totalBind: 0,
      scanAvg: 0,
      regAvg: 0,
      bindAvg: 0,
      selectStore: [],
      selectGuide: [],
      containerHeight: 600,
      loading: null,
      loadAttr: {
        target: "#newChart",
        fullscreen: false,
        text: "正在生成图表"
      },
      operaData: {
        legend: {
          data: ["扫码", "绑定", "注册"]
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
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
          data: this.operaMainSeries.name
        },
        series: [
          {
            name: "扫码",
            type: "bar",
            data: this.operaMainSeries.scan,
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
            name: "绑定",
            type: "bar",
            data: this.operaMainSeries.bind,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  { offset: 0, color: "#8664ed" },
                  { offset: 1, color: "#d1a6ff" }
                ])
              }
            }
          },
          {
            name: "注册",
            type: "bar",
            data: this.operaMainSeries.reg,
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
      guideData: {
        legend: {
          data: ["扫码", "绑定", "注册"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          type: "value",
          splitNumber: 2,
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: this.operaGuideSeries.name
        },
        series: [
          {
            name: "扫码",
            type: "bar",
            data: this.operaGuideSeries.scan,
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
            name: "绑定",
            type: "bar",
            data: this.operaGuideSeries.bind,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  { offset: 0, color: "#d3dff6" },
                  { offset: 1, color: "#e0e9fa" }
                ])
              }
            }
          },
          {
            name: "注册",
            type: "bar",
            data: this.operaGuideSeries.reg,
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
      detailData: {
        legend: {
          data: ["扫码", "绑定", "注册"]
        },
        color: ["#f6554c", "#f8a219", "#75a8f2"],
        xAxis: {
          type: "category",
          data: this.operaGuideCurrentMonth.name
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "扫码",
            type: "line",
            data: this.operaGuideCurrentMonth.scan
          },
          {
            name: "绑定",
            type: "line",
            data: this.operaGuideCurrentMonth.bind
          },
          {
            name: "注册",
            type: "line",
            data: this.operaGuideCurrentMonth.reg
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    this.loading = Loading.service(this.loadAttr);
    // let chart = echarts.init(document.getElementById('newChart'));
    // let randomData = [];
    // let randomData1 = [];
    // let randomData2 = [];
    // for (let i = 0; i < 12; i++) {
    //     randomData.push(parseInt(Math.random() * 100));
    //     randomData1.push(parseInt(Math.random() * 100));
    //     randomData2.push(parseInt(Math.random() * 100));
    // }
    // let newChart = echarts.init(document.getElementById('newChart'));
    // chart.setOption(option);
    // this.Height = this.operaMainSeries.scan.length / 25 * 400 + 200;
    // this.totalScan = this.operaMainSeries.totalScan;
    // this.totalReg = this.operaMainSeries.totalReg;
    // this.totalBind = this.operaMainSeries.totalBind;
    // this.scanAvg = (this.operaMainSeries.totalScan /
    //   this.operaMainSeries.scan.length
    // ).toFixed(1);
    // this.regAvg = (this.operaMainSeries.totalReg /
    //   this.operaMainSeries.scan.length
    // ).toFixed(1);
    // this.bindAvg = (this.operaMainSeries.totalBind /
    //   this.operaMainSeries.scan.length
    // ).toFixed(1);
    // this.operaData.yAxis.data = this.operaMainSeries.name;
    // this.operaData.series[0].data = this.operaMainSeries.scan;
    // this.operaData.series[1].data = this.operaMainSeries.bind;
    // this.operaData.series[2].data = this.operaMainSeries.reg;
    // this.selectStore = this.operaMainSeries.sel;
    // this.setOpera();
    // console.log(this.operaMainSeries.sel);
  },
  updated() {},
  activated() {},
  methods: {
    Dom(e) {
      return echarts.init(document.getElementById("newChart"));
    },
    closeLoad() {
      this.loading.close();
      //   console.log(this.loading);
    },
    setOpera() {
      let operaChart = this.Dom();
      // operaChart.resize({
      //   Height: this.containerHeight
      // });
      operaChart.setOption(this.operaData);
      operaChart.on("click", e => {
        let id = this.selectStore[e.dataIndex].value;
        this.outlet = id;
        this.guideSwitch = false;
        this.total = false;
        this.guide = "";
        this.$store.dispatch("report/getOperaGuide", {
          storecode: this.storecode,
          outlet: id,
          // startDate: this.startDate,
          // endDate: this.endDate,
          startDate: "20171001",
          endDate: "20171030"
        });
        operaChart.dispose();
      });
    },
    setGuide() {
      let guideChart = this.Dom();
      // guideChart.resize({
      //     Height: this.Height
      // });
      guideChart.setOption(this.guideData);
      guideChart.on("click", e => {
        let id = this.selectGuide[e.dataIndex].value;
        this.$store.dispatch("report/getOperaGuideDetail", {
          storecode: this.storecode,
          outlet: this.outlet,
          userid: id,
          // startDate: this.startDate,
          // endDate: this.endDate
          startDate: "20171001",
          endDate: "20171030"
        });
      });
    },
    dateSelect(e) {
      if (e) {
        let val = e.split(" - ");
        let startDate = val[0].replace(/-/g, "") + "";
        let endDate = val[1].replace(/-/g, "") + "";
        this.startDate = startDate;
        this.endDate = endDate;
        this.$store.dispatch("report/getOperaMain", {
          storecode: this.storecode,
          startDate: startDate,
          endDate: endDate
        });
        this.setOpera();
      }
    },
    setDetail() {
      let detailChart = this.Dom();
      // detailChart.resize({
      //     Height: this.Height
      // });
      detailChart.setOption(this.detailData);
    },
    select(e) {
      // console.log(e);
      // this.outlet = e;
      // this.guideSwitch = false;
      // this.total = false;
      // this.guide = '';
      // this.$store.dispatch('report/getOperaGuide', { storecode: this.storecode, outlet: e });
    },
    selectguide(e) {
      // console.log(e);
      // this.$store.dispatch('report/getOperaGuideDetail', { storecode: this.storecode, outlet: this.outlet, userid: e });
      // this.setDetail();
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

.between {
  /* align-items: center; */
}

.main {
  padding-top: 28px;
}

.m5 {
  margin-left: 5px;
}

.w150 {
  width: 150px;
}

.w100 {
  width: 100px;
}

.note {
  border: 1px solid #a0a0a0;
  border-radius: 8px;
  justify-content: space-around;
  /* align-items: center; */
}

.total,
.avg {
  width: 50%;
}

.blue {
  color: #75a8f2;
  font-size: 26px;
}

.orange {
  color: #f8a219;
  font-size: 26px;
}

/* .avg-text {
      font-size: 12px;
      color: #f8a219;
    } */
.annotation {
  font-size: 14px;
}

.mid {
  align-items: center;
}

.saleimg {
  width: 100%;
  height: 40px;
  background: url("./../../assets/img/totalSale.png") no-repeat;
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

.circle {
  /* display: inline-block; */
  /* font-size: 26px; */
  /* width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f6554c; */
}
</style>
<!-- <el-select v-model="value" placeholder="选择门店" @change="select" size="small" class="w150 m5">
  <el-option v-for="item in selectStore" :key="item.value" :label="item.label" :value="item.value">
</el-option>
 </el-select>
  <el-select v-model="guide" placeholder="选择导购" size="small" class="m5 w100" :disabled="guideSwitch" @change="selectguide">
<el-option v-for="item in selectGuide" :key="item.value" :label="item.label" :value="item.value">
 </el-option>
  </el-select> -->
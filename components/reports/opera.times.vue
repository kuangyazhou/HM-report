<template>
  <div class="container">
    <el-row :gutter="15" style="margin-top: 20px;">
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">
              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              <span class="chart-title">客户购买次数分析</span>
            </span>
            <!-- <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button> -->
          </div>
          <div class="flex column person">
            <div class="flex btns center">
              <el-button size="small">上周</el-button>
              <el-button size="small">上月</el-button>
              <el-date-picker v-model="dimTime" v-if="checked" type="daterange" placeholder="选择日期范围" size="small m5" class="distance w200">
              </el-date-picker>
            </div>
            <div class="flex row main">
              <div class="flex note column center" :style="{width:'180px'}">
                <span class="flex saleimg"></span>
                <span class="flex center column">
                  <span class="flex">未购买(人)</span>
                  <span class="flex text-total center">
                    <span v-if="zeroTotal">{{zeroTotal}}</span>
                    <span class="text-gray">(均值
                      <span class="text-yellow" v-if="zeroAvg">{{zeroAvg}}</span>)</span>
                  </span>
                </span>
                <span class="flex center column">
                  <span class="flex">1次(人)</span>
                  <span class="flex text-total center">
                    <span v-if="oneTotal">{{oneTotal}}</span>
                    <span class="text-gray">(均值
                      <span class="text-yellow" v-if="oneAvg">{{oneAvg}}</span>)</span>
                  </span>
                </span>
                <span class="flex center column">
                  <span class="flex">2次(人)</span>
                  <span class="flex text-total center">
                    <span v-if="twoTotal">{{twoTotal}}</span>
                    <span class="text-gray">(均值
                      <span class="text-yellow" v-if="twoAvg">{{twoAvg}}</span>)</span>
                  </span>
                </span>
                <span class="flex center column">
                  <span class="flex">3次(人)</span>
                  <span class="flex text-total center">
                    <span v-if="threeTotal">{{threeTotal}}</span>
                    <span class="text-gray">(均值
                      <span class="text-yellow" v-if="threeAvg">{{threeAvg}}</span>)</span>
                  </span>
                </span>
                <span class="flex center column">
                  <span class="flex">4次(人)</span>
                  <span class="flex text-total center">
                    <span v-if="fourTotal">{{fourTotal}}</span>
                    <span class="text-gray">(均值
                      <span class="text-yellow" v-if="fourAvg">{{fourAvg}}</span>)</span>
                  </span>
                </span>
                <span class="flex center column">
                  <span class="flex">4次以上(人)</span>
                  <span class="flex text-total center">
                    <span v-if="fiveTotal">{{fiveTotal}}</span>
                    <span class="text-gray">(均值
                      <span class="text-yellow" v-if="fiveAvg">{{fiveAvg}}</span>)</span>
                  </span>
                </span>
                <span class="flex column annotation">
                  <span class="flex">
                    <span>注释</span>
                  </span>
                  <span class="flex">1.此表统计:在所选时间段内发生联系的客户，自联系时间起后30天自然天购买和未购买的客户数量详情;</span>
                  <span>2.默认数据为上周总人数，可进行快捷切换选择;</span>
                  <span>3."均值":总人数/门店数,便于各门店与平均数据的对比;</span>
                  <span class="flex">4.同一客户多次购买只算一次就近计算</span>
                </span>
              </div>
              <div class="flex" :style="{width:'85%', height:'500px'}" id="times">
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

import { Button, Col, Row, Tooltip, Card, Alert, Loading } from "element-ui";
Vue.use(Button);
Vue.use(Col);
Vue.use(Card);
Vue.use(Row);
Vue.use(Tooltip);
Vue.use(Alert);
export default {
  components: {},
  props: ["storeList", "operDealTimesSeries"],
  watch: {
    storeList: function(val) {
      // console.log(val);
    },
    operDealTimesSeries: function(val) {
      // console.log(val);
      this.timesData.xAxis[0].data = val.name;
      this.timesData.series[0].data = val.zero;
      this.timesData.series[1].data = val.one;
      this.timesData.series[2].data = val.two;
      this.timesData.series[3].data = val.three;
      this.timesData.series[4].data = val.four;
      this.timesData.series[5].data = val.five;
      this.setTimes();
      this.closeLoad();
      let zerototal = null;
      let onetotal = null;
      let twototal = null;
      let threetotal = null;
      let fourtotal = null;
      let fivetotal = null;
      for (let i = 0; i < val.zero.length; i++) {
        zerototal += val.zero[i];
        onetotal += val.one[i];
        twototal += val.two[i];
        threetotal += val.three[i];
        fourtotal += val.four[i];
        fivetotal += val.five[i];
      }
      this.zeroTotal = zerototal;
      this.oneTotal = onetotal;
      this.twoTotal = twototal;
      this.threeTotal = threetotal;
      this.fourTotal = fourtotal;
      this.fiveTotal = fivetotal;
      this.zeroAvg = (zerototal / val.zero.length).toFixed(2);
      this.oneAvg = (onetotal / val.one.length).toFixed(2);
      this.twoAvg = (twototal / val.two.length).toFixed(2);
      this.threeAvg = (threetotal / val.three.length).toFixed(2);
      this.fourAvg = (fourtotal / val.four.length).toFixed(2);
      this.fiveAvg = (fivetotal / val.five.length).toFixed(2);
    }
  },
  computed: {},
  data() {
    return {
      checked: true,
      dimTime: "",
      loading: null,
      zeroTotal: 0,
      zeroAvg: 0,
      oneTotal: 0,
      oneAvg: 0,
      twoTotal: 0,
      twoAvg: 0,
      threeTotal: 0,
      threeAvg: 0,
      fourTotal: 0,
      fourAvg: 0,
      fiveTotal: 0,
      fiveAvg: 0,
      loadAttr: {
        target: "#times",
        fullscreen: false,
        text: "正在生成图表"
      },
      timesData: {
        color: [
          "#0d6bb2",
          "#0579c1",
          "#128dd8",
          "#4cb7ed",
          "#97e2ff",
          "#b6eeff"
        ],
        legend: {
          data: ["未购买", "1次", "2次", "3次", "4次", "4次以上"]
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
            // data: ["周一", "周二", "周三", "周四", "周五", "周六", "周天"]
            data: []
          }
        ],
        yAxis: {
          type: "value",
          // boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "未购买",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            // data: [1200, 132, 101, 134, 90, 2300, 210]
            data: []
          },
          {
            name: "1次",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            // data: [220, 1820, 191, 234, 290, 330, 310]
            data: []
          },
          {
            name: "2次",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            // data: [150, 232, 2010, 154, 190, 330, 410]
            data: []
          },
          {
            name: "3次",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            // data: [320, 332, 301, 3340, 390, 330, 320]
            data: []
          },
          {
            name: "4次",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            // data: [820, 932, 901, 934, 1290, 1330, 1320]
            data: []
          },
          {
            name: "4次以上",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            // data: [20, 32, 301, 340, 90, 33, 30]
            data: []
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
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
    Dom(e) {
      return echarts.init(document.getElementById(e));
    },
    setTimes() {
      let chart = this.Dom("times");
      chart.setOption(this.timesData);
    },
    closeLoad() {
      this.loading.close();
      //   console.log(this.loading);
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
.saleimg {
  width: 100%;
  height: 40px;
  background: url("./../../assets/img/totalSale.png") no-repeat;
}
.column {
  flex-direction: column;
}
.annotation {
  font-size: 12px;
}
.center {
  justify-content: center;
  align-items: center;
}

.main {
  padding-top: 28px;
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
.note {
  font-size: 14px;
  border: 1px solid #a0a0a0;
  border-radius: 8px;
  justify-content: space-around;
  align-items: center;
}
</style>

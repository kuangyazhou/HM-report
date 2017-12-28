<template>
  <div class="container">
    <el-row :gutter="15" style="margin-top: 20px;">
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">
              <i class="fa fa-users" aria-hidden="true"></i>生理轴分布
            </span>
            <!-- <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button> -->
          </div>
          <div id="axis" :style="{width:'100%',height:'600px'}">
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from "vue";
import echarts from "echarts";
import { Button, Col, Row, Tooltip, Card, Alert } from "element-ui";
let pathSymbols = {
  one: "~assets/img/lifeaxis/axis01.png",
  two: "./../../assets/img/lifeaxis/axis02.png",
  three: "./../../assets/img/lifeaxis/axis03.png",
  four: "./../../assets/img/lifeaxis/axis04.png",
  five: "./../../assets/img/lifeaxis/axis05.png",
  six: "./../../assets/img/lifeaxis/axis06.png",
  seven: "./../../assets/img/lifeaxis/axis07.png",
  eight: "./../../assets/img/lifeaxis/axis08.png",
  nine: "./../../assets/img/lifeaxis/axis09.png",
  ten: "./../../assets/img/lifeaxis/axis10.png",
  eleven: "./../../assets/img/lifeaxis/axis11.png",
  twelve: "./../../assets/img/lifeaxis/axis12.png",
  thirteen: "./../../assets/img/lifeaxis/axis13.png",
  fourteen: "./../../assets/img/lifeaxis/axis14.png",
  fifteen: "./../../assets/img/lifeaxis/axis15.png"
};

Vue.use(Button);
Vue.use(Col);
Vue.use(Card);
Vue.use(Row);
Vue.use(Tooltip);
Vue.use(Alert);
export default {
  components: {},
  props: ["storeList", "memberLifeAxis"],
  watch: {
    storeList: function(val) {},
    memberLifeAxis: function(val) {
      this.lifeData.xAxis.data = val.name;
      this.lifeData.series[0].data = val.data;
      this.lifeChart.setOption(this.lifeData);
    }
  },
  computed: {},
  data() {
    return {
      lifeChart: null,
      lifeData: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none"
          },
          formatter: function(params) {
            return params[0].name + ": " + params[0].value;
          }
        },
        xAxis: {
          data: [],
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            textStyle: {
              color: "#97e2ff"
              // color:'red'
            },
            interval: 0,
            rotate: 30
          }
        },
        yAxis: {
          splitLine: { show: true },
          axisTick: { show: true },
          axisLine: { show: true },
          axisLabel: { show: true }
        },
        color: ["#4cb7ed"],
        // color:['red'],
        series: [
          {
            name: "hill",
            type: "pictorialBar",
            barCategoryGap: "-130%",
            symbol: "path://M0,10 L10,10 L5,0 L0,10 z",
            symbol:
              "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
            itemStyle: {
              normal: {
                opacity: 0.5
              },
              emphasis: {
                opacity: 1
              }
            },
            data: [],
            z: 10
          }
          // {
          //   name: "glyph",
          //   type: "pictorialBar",
          //   barGap: "-100%",
          //   symbolPosition: "end",
          //   symbolSize: 50,
          //   symbolOffset: [0, "-120%"],
          //   data: [
          //     {
          //       value: 1110,
          //       symbol: "image://../../../assets/img/lifeaxis/1.jpg",
          //       symbolSize: [60, 60]
          //     },
          //     {
          //       value: 1110,
          //       symbol: "image://../../../assets/img/lifeaxis/1.jpg",
          //       symbolSize: [60, 60]
          //     },
          //     {
          //       value: 1110,
          //       symbol: "image://../../../assets/img/lifeaxis/1.jpg",
          //       symbolSize: [60, 60]
          //     },
          //     {
          //       value: 1110,
          //       symbol: "image://../../../assets/img/lifeaxis/1.jpg",
          //       symbolSize: [60, 60]
          //     },
          //     {
          //       value: 1110,
          //       symbol: "image://../../../assets/img/lifeaxis/1.jpg",
          //       symbolSize: [60, 60]
          //     }
          //   ]
          // }
        ]
      }
    };
  },
  created() {},
  mounted() {
    let chart = echarts.init(document.getElementById("axis"));
    this.lifeChart = chart;
  },
  updated() {},
  activated() {},
  methods: {}
};
</script>

<style scoped></style>

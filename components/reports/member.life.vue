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
      //   console.log(val, this.lifeChart);
      this.lifeData.xAxis.data = val.name;
      //   this.lifeData.series[0].data = val.data;
      this.lifeData.series[0].data = [
        123,
        60,
        25,
        18,
        12,
        9,
        2,
        1,
        50,
        60,
        80,
        70,
        55,
        99
      ];
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
              color: "#e54035"
            },
            interval: 0,
            rotate: 30
          }
        },
        yAxis: {
          splitLine: { show: false },
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { show: false }
        },
        color: ["#e54035"],
        series: [
          {
            name: "hill",
            type: "pictorialBar",
            barCategoryGap: "-130%",
            // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
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
            //   data: [123, 60, 25, 18, 12, 9, 2, 1, 50, 60, 80, 70, 55, 99],
            data: [],
            z: 10
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    let chart = echarts.init(document.getElementById("axis"));
    this.lifeChart = chart;
    let option = {
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
        data: ["早期", "中期", "晚期"],
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          textStyle: {
            color: "#e54035"
          }
        }
      },
      yAxis: {
        splitLine: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: { show: false }
      },
      color: ["#e54035"],
      series: [
        {
          name: "hill",
          type: "pictorialBar",
          barCategoryGap: "-130%",
          // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
          symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
          itemStyle: {
            normal: {
              opacity: 0.5
            },
            emphasis: {
              opacity: 1
            }
          },
          data: [123, 60, 25, 18, 12, 9, 2, 1, 50, 60, 80, 70, 55, 99],
          //   data: [],
          z: 10
        }
      ]
    };
    // chart.setOption(option);
  },
  updated() {},
  activated() {},
  methods: {}
};
</script>

<style scoped></style>

<template>
    <div class="container">
        <el-row :gutter="24" style="margin-top: 20px;">
            <el-col :span="18">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-area-chart" aria-hidden="true"></i>忠诚度分析
                        </span>
                    </div>
                    <div class="flex">
                        <div class="flex note column" :style="{width:'200px'}">
                            <!-- <h1>fuck the king!!!</h1> -->
                            <span class="flex font16">评价标准</span>
                            <span class="flex">1.感情型忠诚客户:>=40分;惯性型忠诚客户:30-40分(含30分);比较型忠诚客户:20-30分(含20分);游离型客户:10-20分(含10分);流失型客户:低于10分</span>
                            <span class="flex">2.根据"最近购买时间","购买次数","购买品类数量","平均单次购买金额","满意度"5项来进行计算,每项10分满分</span>
                            <span class="flex">3.详细计算方式</span>
                            <span class="flex"> 最近购买时间:(30自然天-最近购买时间距今天的天数)/30*10</span>
                            <span class="flex"> 购买次数:(客户购买次数/最大购买次数)*10</span>
                            <span class="flex"> 购买品类数量:(客户购买的品类数/取雷达图一级类别的数量)*10</span>
                            <span class="flex"> 平均单次购买金额:(客户平均单次购买金额/商家客户单次购买金额中最大值)*10</span>
                        </div>
                        <div class="flex" id="loyal" :style="{width:'70%',height:'400px'}">
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

import { Button, Col, Row, Tooltip, Card, Alert } from "element-ui";
Vue.use(Button);
Vue.use(Col);
Vue.use(Card);
Vue.use(Row);
Vue.use(Tooltip);
Vue.use(Alert);
export default {
  components: {},
  props: ["storeList", "memberLoyalAxis"],
  watch: {
    storeList: function(val) {},
    memberLoyalAxis: function(val) {
      // console.log(val);
      this.loyalOption.series[0].data = val;
      this.loyalChart.setOption(this.loyalOption);
    }
  },
  computed: {},
  data() {
    return {
      loyalChart: null,
      loyalOption: {
        title: {
          text: "",
          subtext: "",
          x: "center"
        },
        color: [
          "#b6eeff",
          "#97e2ff",
          "#4cb7ed",
          "#1288dd8",
          "#0579c1",
          "#0d6bb2"
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: []
        },
        series: [
          {
            name: "忠诚度分析",
            type: "pie",
            radius: ["55%", "70%"],
            // center: ["50%", "60%"],
            avoidLabelOverlap: false,
            data: []
            // itemStyle: {
            //   emphasis: {
            //     shadowBlur: 10,
            //     shadowOffsetX: 0,
            //     shadowColor: "rgba(0, 0, 0, 0.5)"
            //   }
            // }
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    let dom = document.getElementById("loyal");
    this.loyalChart = echarts.init(dom);
  },
  updated() {},
  activated() {},
  methods: {}
};
</script>

<style scoped>
.note {
  border: 1px solid gray;
  border-radius: 8px;
  font-size: 12px;
  justify-content: space-around;
}
.font16 {
  font-size: 16px;
}
</style>

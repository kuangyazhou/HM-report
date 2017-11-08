<template>
    <div class="container">
        <el-row :gutter="15" style="margin-top: 20px;">
            <el-col :span="24">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-handshake-o" aria-hidden="true"></i>维护客户交易人数分析
                        </span>
                    </div>
                    <div class="flex column person">
                        <div class="flex btns center">
                            <el-button size="small" @click="lastMonth">上月</el-button>
                            <el-button @click="lastYear" size="small">去年</el-button>
                            <el-date-picker v-model="dimTime" type="daterange" placeholder="选择日期范围" @change="dateSelect" size="small m5" class="distance w200">
                            </el-date-picker>
                        </div>
                        <div class="flex row main">
                            <div class="flex note column" :style="{width:'180px'}">
                                <span class="flex saleimg"></span>
                                <span class="flex center column">
                                    <span class="flex">30天未购买(人)</span>
                                    <span class="flex text-total center">
                                        <span>{{threeTotal}}</span>
                                        <span class="text-gray">(均值<span class="text-yellow">{{threeAvg}}</span>)</span>
                                    </span>
                                </span>
                                <span class="flex center column">
                                    <span class="flex">0-7天(人)</span>
                                    <span class="flex text-total center">
                                        <span>{{zeroTotal}}</span>
                                        <span class="text-gray">(均值<span class="text-yellow">{{zeroAvg}}</span>)</span>
                                    </span>
                                </span>
                                <span class="flex center column">
                                    <span class="flex">7-15天(人)</span>
                                    <span class="flex text-total center">
                                        <span>{{oneTotal}}</span>
                                        <span class="text-gray">(均值<span class="text-yellow">{{oneAvg}}</span>)</span>
                                    </span>
                                </span>
                                <span class="flex center column">
                                    <span class="flex">15-30天(人)</span>
                                    <span class="flex text-total center">
                                        <span>{{twoTotal}}</span>
                                        <span class="text-gray">(均值<span class="text-yellow">{{twoAvg}}</span>)</span>
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
                            <div class="flex" :style="{width:'85%', height:'400px'}" id="person">
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
import { Button, Col, Row, Tooltip, Card, Alert, Loading } from "element-ui";
Vue.use(Button);
Vue.use(Col);
Vue.use(Card);
Vue.use(Row);
Vue.use(Tooltip);
Vue.use(Alert);
export default {
  components: {},
  props: ["storeList", "operDealNumSeries"],
  watch: {
    storeList: function(val) {},
    operDealNumSeries: function(val) {
      //   console.log(val);
      this.numberData.xAxis[0].data = val.name;
      this.numberData.series[1].data = val.data;
      this.zeroTotal = val.zero;
      this.zeroAvg = val.avgzero;
      this.closeLoad();
      this.setNumber();
    }
  },
  computed: {},
  data() {
    return {
      storecode: this.$store.state.storeCode,
      checked: true,
      dimTime: "",
      zeroTotal: "",
      zeroAvg: "",
      oneTotal: "",
      oneAvg: "",
      twoTotal: "",
      twoAvg: "",
      threeTotal: "",
      threeAvg: "",
      loading: null,
      loadAttr: {
        target: "#person",
        fullscreen: false,
        text: "正在生成图表"
      },
      numberData: {
        color: ["#0d6bb2", "#128dd8", "#4cb7ed", "#97e2ff"],
        legend: {
          data: ["未购买", "0-7天", "7-15天", "15-30天"]
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
            name: "0-7天",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: []
            // data: [220, 1820, 191, 234, 290, 330, 310]
          },
          {
            name: "7-15天",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: []
            // data: [150, 232, 2010, 154, 190, 330, 410]
          },
          {
            name: "15-30天",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: []
            // data: [320, 332, 301, 3340, 390, 330, 320]
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
  methods: {
    setNumber() {
      let numChart = echarts.init(document.getElementById("person"));
      numChart.setOption(this.numberData);
    },
    closeLoad() {
      this.loading.close();
    },
    dateSelect(e) {
      if (e) {
        let val = e.split(" - ");
        let startDate = val[0].replace(/-/g, "") + "";
        let endDate = val[1].replace(/-/g, "") + "";
        this.startDate = startDate;
        this.endDate = endDate;
        this.$store.dispatch("report/getOperaDealNum", {
          storecode: this.storecode,
          startDate: startDate,
          endDate: endDate
        });
        this.setOpera();
      }
    },
    lastMonth(e) {
      let date = new Date().Format("yyyy-MM-dd");
      let preMonth = new Date(getPreMonth(date)).Format("yyyyMM");
      let startDate = preMonth + "01";
      let endDate = preMonth + "31";
      this.$store.dispatch("report/getOperaDealNum", {
        storecode: this.storecode,
        startDate: startDate,
        endDate: endDate
      });
    },
    lastYear(e) {
      let date = new Date().Format("yyyy") - 1;
      let startDate = date + "0101";
      let endDate = date + "1231";
      this.$store.dispatch("report/getOperaDealNum", {
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
.flex {
  display: flex;
}

.row {
  flex-direction: row;
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
.saleimg {
  width: 100%;
  height: 40px;
  background: url("./../../assets/img/totalSale.png") no-repeat;
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

<template>
    <div class="container">
        <el-row :gutter="15" style="margin-top: 20px;">
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-dashboard" aria-hidden="true"></i>本月销售目标及完成率
                        </span>
                    </div>
                    <div class="flex sale">
                        <div class="flex btns center">
                            <el-button size="small" :disabled="saleTotalSwitch" class="btn-total">总目标</el-button>
                            <el-select v-model="saleStore" placeholder="选择门店" size="small" class="w150 m5" @change="saleStoreSele">
                                <el-option v-for="item in saleStoreName" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select v-model="saleGuide" placeholder="选择导购" size="small" class="w150 m5" :disabled="saleGuideSwitch" @change="saleGuideSelec">
                                <el-option v-for="item in saleGuideData" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="flex">
                            <div class="flex text column center">
                                <div class="flex column center saleTarget">
                                    <span class="flex">销售总目标(元)</span>
                                    <span class="flex text-target">{{totalTarget}}</span>
                                </div>
                                <div class="flex column center finish">
                                    <span class="flex top5">已完成(元)</span>
                                    <span class="flex text-finish">{{saleComplete}}</span>
                                </div>
                            </div>
                            <div class="flex monthSale">
                                <div id="monthSale" :style="{width:'100%',height:'250px'}"></div>
                            </div>
                        </div>
                        <div class="detail">
                            <div id="saleTarget" :style="{width:'100%',height:this.saleHeight+'px'}"></div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-user-plus" aria-hidden="true"></i>本月新客目标及完成率
                        </span>
                        <!-- <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button> -->
                    </div>
                    <div class="flex sale">
                        <div class="flex btns center">
                            <el-button size="small" class="btn-total" @click="setOld" :disabled="back">总目标</el-button>
                            <el-select v-model="value" placeholder="选择门店" @change="selectStore" size="small" class="w150 m5">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select v-model="guideName" placeholder="选择导购" size="small" class="w150 m5" :disabled="newGuideSwitch" @change="selectGuide">
                                <el-option v-for="item in guide" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="flex">
                            <div class="flex text column center">
                                <div class="flex column center saleTarget">
                                    <span class="flex">目标人数(人)</span>
                                    <span class="flex text-target">{{newTotal}}</span>
                                </div>
                                <div class="flex column center finish">
                                    <span class="flex top5">已完成(人)</span>
                                    <span class="flex text-finish">{{newComplete}}</span>
                                </div>
                            </div>
                            <div class="flex newMember">
                                <div id="member" :style="{width:'100%',height:'250px'}"></div>
                            </div>
                        </div>
                        <div class="detail">
                            <div id="memberTarget" :style="{width:'100%',height:this.newHeight+'px'}"></div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import axios from "axios";
import echarts from "echarts";
import { currency } from "./../../utils/currency";

import {
  Button,
  Col,
  Row,
  Tooltip,
  Card,
  Alert,
  Select,
  RadioGroup,
  RadioButton,
  Loading
} from "element-ui";

Vue.use(Button);
Vue.use(Col);
Vue.use(Card);
Vue.use(Row);
Vue.use(Tooltip);
Vue.use(Alert);
Vue.use(Select);
Vue.use(RadioGroup);
Vue.use(RadioButton);
export default {
  components: {},
  props: [
    "currentMonthSeries",
    "currentMonthNewDetail",
    "guideNewSeries",
    "guideSaleSeries"
  ],
  watch: {
    currentMonthSeries: function(val) {
      this.monthSaleData.yAxis.data = val.name;
      this.monthSaleData.series[0].data = val.data;
      this.monthSaleData.series[1].data = val.finish;
      this.totalTarget = currency(val.total, "￥");
      this.saleComplete = currency(val.com, "￥");
      this.outletId = val.outlet;
      this.saleRate = (val.com / val.total * 100).toFixed(2);
      this.saleStoreName = val.sel;
      this.saleHeight = val.data.length / 25 * 400 + 200;
      // this.setSale();
    },
    currentMonthNewDetail: function(val) {
      // console.log(val)
      this.montNewData.yAxis.data = val.name;
      this.montNewData.series[0].data = val.data;
      this.montNewData.series[1].data = val.finish;
      this.newTotal = val.total;
      this.newComplete = val.com;
      this.newRate = (val.com / val.total * 100).toFixed(2);
      this.newHeight = val.data.length / 25 * 400 + 200;
      this.options = val.sel;
      // this.setNew();
    },
    guideSaleSeries: function(val) {
      this.monthSaleData.yAxis.data = val.name;
      this.monthSaleData.series[0].data = val.data;
      this.monthSaleData.series[1].data = val.finish;
      this.totalTarget = currency(val.total, "￥");
      this.saleComplete = currency(val.com, "￥");
      this.saleGuideData = val.sel;
      this.saleRate = (val.com / val.total * 100).toFixed(2);
      this.saleHeight = val.data.length / 25 * 400 + 200;
    },
    guideNewSeries: function(val) {
      this.montNewData.yAxis.data = val.name;
      this.montNewData.series[0].data = val.data;
      this.montNewData.series[1].data = val.finish;
      this.newTotal = val.total;
      this.newComplete = val.com;
      this.guide = val.sel;
      this.newRate = (val.com / val.total * 100).toFixed(2);
      this.newHeight = val.data.length / 25 * 400 + 200;
      // console.log(val);
    },
    saleHeight: function(v) {
      // console.log(v);
      // this.Dom('saleTarget').dispose();
      this.setSale();
      // this.Dom('memberTarget').dispose();
    },
    newHeight: function(v) {
      this.setNew(this.montNewData);
    },
    saleRate: function(v) {
      // console.log(v);
      this.saleRateData.series[0].data[0].value = v;
      this.setSaleRate();
    },
    newRate: function(v) {
      // console.log(v)
      this.newRateData.series[0].data[0].value = v;
      this.setNewRate();
    }
  },
  computed: {},
  data() {
    return {
      storecode: this.$store.state.storeCode,
      totalTarget: 0,
      saleComplete: 0,
      saleRate: 0,
      newTotal: 0,
      newComplete: 0,
      newRate: 0,
      back: true,
      saleTotalSwitch: true,
      saleGuideSwitch: true,
      newGuideSwitch: true,
      outletId: null,
      saleHeight: 400,
      newHeight: 400,
      dialogVisible: false,
      showBack: false,
      showDetail: false,
      gridData: [],
      guideSwitch: true,
      loading: true,
      saleStoreName: [],
      options: [],
      guide: [],
      value: "",
      guideName: "",
      saleStore: "",
      saleGuide: "",
      saleGuideData: [],
      value1: "",
      value6: "",
      radio3: "北京",
      memberTarge: 11,
      memberFinish: 2333,
      monthSaleData: {
        // color: ['#3398DB'],
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
        legend: {
          data: ["销售目标", "已完成"]
        },
        xAxis: {
          // show: false,
          splitNumber: 2,
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: this.currentMonthSeries.name
        },
        series: [
          {
            name: "销售目标",
            type: "bar",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  { offset: 0, color: "#4d92ff" },
                  { offset: 1, color: "#57cbff" }
                ])
              }
            },
            data: this.currentMonthSeries.data
          },
          {
            name: "已完成",
            type: "bar",
            data: this.currentMonthSeries.finish,
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
      montNewData: {
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
        legend: {
          data: ["目标人数", "已完成"]
        },
        xAxis: {
          // show: false,
          splitNumber: 2,
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: this.currentMonthNewDetail.name
        },
        series: [
          {
            name: "目标人数",
            type: "bar",
            data: this.currentMonthNewDetail.data,
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
            name: "已完成",
            type: "bar",
            data: this.currentMonthNewDetail.finish,
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
      guideNewData: {
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
        legend: {
          data: ["目标人数", "已完成"]
        },
        xAxis: {
          // show: false,
          splitNumber: 2,
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: this.guideNewSeries.name
        },
        series: [
          {
            name: "目标人数",
            type: "bar",
            data: this.guideNewSeries.data,
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
            name: "已完成",
            type: "bar",
            data: this.guideNewSeries.finish,
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
      saleRateData: {
        series: [
          {
            data: [{ value: this.saleRate, name: "完成率" }],
            name: "业务指标",
            type: "gauge",
            axisLine: {
              lineStyle: {
                width: 8,
                color: [[0.2, "#f6554c"], [0.8, "#f8a219"], [1, "#75a8f2"]]
              }
            },
            axisTick: {
              length: 0,
              lineStyle: {
                color: "auto",
                shadowColor: "#fff",
                shadowBlur: 10
              }
            },
            splitLine: {
              length: 10,
              lineStyle: {
                width: 3,
                color: "#fff",
                shadowColor: "#fff",
                shadowBlur: 10
              }
            },
            detail: {
              formatter: "{value}%",
              textStyle: {
                fontSize: 22
              }
            }
            // max:120,
          }
        ]
      },
      newRateData: {
        series: [
          {
            data: [{ value: this.newRate, name: "完成率" }],
            name: "业务指标",
            type: "gauge",
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8,
                color: [[0.2, "#f6554c"], [0.8, "#f8a219"], [1, "#75a8f2"]]
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 0, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            splitLine: {
              // 分隔线
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            detail: {
              formatter: "{value}%",
              textStyle: {
                fontSize: 22
              }
            }
            // max:120,
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    let storecode = this.$route.query.code;
    let account = this.$route.query.account;
    if (storecode) {
      // this.$store.dispatch("nuxtServerInit", user);
      // this.$store.commit("SET_STORE_CODE", storecode);
      this.$store.dispatch("report/getMonthSale", {
        storecode: this.$store.state.storecode
      });
      this.$store.dispatch("report/getMonthNewmember", {
        storecode: this.$store.state.storecode
      });
    }
    let loadAttr = {
      target: "#monthSale",
      fullscreen: false,
      text: "正在生成图表"
    };
    let load = Loading.service(loadAttr);
    let option = {
      series: [
        {
          name: "业务指标",
          type: "gauge",
          axisLine: {
            // 坐标轴线
            lineStyle: {
              // 属性lineStyle控制线条样式
              width: 8,
              color: [[0.2, "#f6554c"], [0.8, "#f8a219"], [1, "#75a8f2"]]
            }
          },
          axisTick: {
            // 坐标轴小标记
            length: 0, // 属性length控制线长
            lineStyle: {
              // 属性lineStyle控制线条样式
              color: "auto",
              shadowColor: "#fff", //默认透明
              shadowBlur: 10
            }
          },
          splitLine: {
            // 分隔线
            length: 10, // 属性length控制线长
            lineStyle: {
              // 属性lineStyle（详见lineStyle）控制线条样式
              width: 3,
              color: "#fff",
              shadowColor: "#fff", //默认透明
              shadowBlur: 10
            }
          },
          detail: {
            formatter: "{value}%",
            textStyle: {
              fontSize: 22
            }
          },
          // max:120,
          data: [
            {
              value: (this.newComplete / this.newTotal * 100).toFixed(2),
              name: "完成率"
            }
          ]
        }
      ]
    };
    // monthSale.setOption(option);
    // member.setOption(option);
    // setInterval(function() {
    //     option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
    //     monthSale.setOption(option, true);
    // }, 5000);
  },
  updated() {
    // this.Dom('saleTarget').dispose();
    // this.setSale();
    // this.Dom('memberTarget').dispose();
    // this.setNew();
  },
  activated() {},
  methods: {
    Dom(e) {
      return echarts.init(document.getElementById(e));
    },
    back() {
      this.showBack = false;
      this.showDetail = false;
    },
    setSale() {
      let saleChart = this.Dom("saleTarget");
      const _this = this;
      saleChart.resize({
        height: this.saleHeight
      });
      saleChart.setOption(this.monthSaleData);
    },
    setNew(data) {
      let newChart = this.Dom("memberTarget");
      const _this = this;
      newChart.resize({
        height: this.newHeight
      });
      newChart.setOption(data);
      // newChart.on('click', e => {
      // })
    },
    setSaleRate() {
      let chart = this.Dom("monthSale");
      chart.setOption(this.saleRateData);
    },
    setNewRate() {
      let chart = this.Dom("member");
      chart.setOption(this.newRateData);
    },
    setOld(e) {
      // this.setNew(this.montNewData);
    },
    saleStoreSele(e) {
      let storeid = e;
      this.saleTotalSwitch = false;
      this.saleGuideSwitch = false;
      this.saleGuide = "";
      this.$store.dispatch("report/getGuideSale", {
        storecode: this.storecode,
        outletId: storeid
      });
    },
    selectStore(e) {
      this.back = false;
      this.newGuideSwitch = false;
      this.guideName = "";
      let storeid = e;
      this.$store.dispatch("report/getGuideNew", {
        storecode: this.storecode,
        outletId: storeid
      });
    },
    saleGuideSelec(id) {
      let t = null;
      let f = null;
      this.guideSaleSeries.sel.forEach((e, i) => {
        if (e.value === id) {
          t = this.guideSaleSeries.data[i];
          f = this.guideSaleSeries.finish[i];
        }
      });
      this.totalTarget = currency(t, "￥");
      this.saleComplete = currency(f, "￥");
      this.saleRate = (f / t * 100).toFixed(2);
    },
    selectGuide(id) {
      // console.log(e);
      let t = null;
      let f = null;
      this.guideNewSeries.sel.forEach((e, i) => {
        if (e.value === id) {
          t = this.guideNewSeries.data[i];
          f = this.guideNewSeries.finish[i];
        }
      });
      this.newTotal = t;
      this.newComplete = f;
      this.newRate = (f / t * 100).toFixed(2);
    }
  }
};
</script>
<style scoped>
.sale {
  flex-direction: column;
}

.column {
  flex-direction: column;
}

.row {
  flex-direction: row;
}

.w150 {
  width: 150px;
}

.m5 {
  margin-left: 5px;
}

.top5 {
  padding-top: 5px;
}

.text {
  /* flex-direction: row; */
  /* justify-content: center; */
  width: 40%;
}

.saleTarget {
  /* width: 50%; */
  /* padding-right: 5%; */
  border-bottom: 1px solid #ccc;
}

.finish {
  /* width: 50%; */
  /* padding-left: 5%; */
  /* border-left: 1px solid #ccc; */
}

.monthSale,
.newMember {
  width: 60%;
}

.text-target,
.text-finish {
  font-size: 26px;
  /* font-weight: bold; */
  padding-top: 5px;
  padding-bottom: 5px;
}

.text-target {
  color: #75a8f2;
}

.text-finish {
  color: #f8a219;
}

.flex {
  display: flex;
}

.center {
  justify-content: center;
  align-items: center;
}
</style>
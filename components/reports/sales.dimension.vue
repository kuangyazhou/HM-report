<template>
    <div class="container">
        <el-row :gutter="15" style="margin-top: 20px;">
            <el-col :span="24">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-bar-chart" aria-hidden="true"></i>多维度销售数据分析
                        </span>
                    </div>
                    <div class="flex column dim">
                        <div class="flex btns center">
                            <el-autocomplete class="inline-input w150" size="small" v-model="brandId" :fetch-suggestions="querySearch" placeholder="请输入品牌名称" :trigger-on-focus="false" @select="handleSelect">
                            </el-autocomplete>
                            <el-select v-model="value" placeholder="选择门店" @change="storeSelect" size="small" class="w150 m5">
                                <el-option v-for="item in storeData" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select v-model="value1" placeholder="选择导购" @change="guideSelect" :disabled="guideSwitch" size="small" class="w150 m5">
                                <el-option v-for="item in guideData" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            <!-- <el-select v-model="value2" placeholder="本月" @change="select" size="small" class="w150 m5">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select> -->
                            <el-checkbox v-model="checked" type="info" class="distance m5">数据对比</el-checkbox>
                            <el-date-picker v-model="dimTime" v-if="checked" type="daterange" placeholder="选择日期范围" @change="dimTimeSelect" size="small" class="m5 distance w200">
                            </el-date-picker>
                        </div>
                        <div class="flex row main">
                            <div class="note flex column" :style="{width:'180px'}">
                              <span class="flex saleimg"></span>
                              <span class="flex center column">
                                <span class="flex">本月总销售(元)</span>
                                <span class="flex text-total">{{saleTotal}}</span>
                              </span>
                              <span class="flex center column" v-if="dimSwitch">
                                <span class="flex">对比总销售</span>
                                <span class="flex total-dim">{{totalDim}}</span>
                              </span>
                                <span class="flex avgimg"></span>
                                <span class="flex center column">
                                  <span class="flex">本月平均销售(元)</span>
                                  <span class="flex text-dim">{{saleAvg}}</span>
                                </span>
                                <span class="flex center column" v-if="dimSwitch">
                                  <span class="flex">对比平均销售</span>
                                  <span class="flex avg-dim">{{avgDim}}</span>
                                </span>
                                <span class="flex column annotation">
                                  <span class="flex mid">
                                    <span class="flex circle"></span>
                                    <span>注释</span>
                                  </span>
                                  <span class="flex">1.默认数据为本月总销售,可进行快捷切换选择</span>
                                  <span class="flex">2.点击"数据对比"可选择任意时间段与当前数据进行对比</span>
                                  <span class="flex">
                                    3.选择下拉框可查看该门店内各导购具体销售详情
                                  </span>
                                </span>
                            </div>
                            <div id="saleDim" :style="{width:'75%',height:'600px'}">
                            </div>
                        </div>
                        <div class="flex center">
                            <el-pagination layout="prev, pager, next" :total=this.total :page-size="20" :current-page.sync="currentPage" @current-change="pageChange">
                            </el-pagination>
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
import { currency } from "./../../utils/currency";

import {
  Input,
  Autocomplete,
  Button,
  Col,
  Row,
  Tooltip,
  Card,
  Alert,
  Checkbox,
  DatePicker,
  Pagination,
  Loading
} from "element-ui";
Vue.use(Button);
Vue.use(Input);
Vue.use(Autocomplete);
Vue.use(Col);
Vue.use(Card);
Vue.use(Row);
Vue.use(Tooltip);
Vue.use(Alert);
Vue.use(Checkbox);
Vue.use(DatePicker);
Vue.use(Pagination);
export default {
  components: {},
  props: [
    "storeList",
    "saleDimensionSeries",
    "saleDimCompare",
    "saleDimStore",
    "saleDimGuide",
    "guideList"
  ],
  watch: {
    saleDimensionSeries: function(val, oldVal) {
      // console.log(val, oldVal);
      this.seriesData = this.saleDimensionSeries;
      this.restaurants = this.loadAll();
      this.total = this.saleDimensionSeries.data.length;
      this.saleTotal = currency(this.saleDimensionSeries.total, "￥");
      this.saleAvg = currency(this.saleDimensionSeries.avg, "￥");
      this.handleSeries();
      this.closeLoad();
      this.setDim();
    },
    saleDimCompare: function(val) {
      this.dimSwitch = true;
      this.compareData = val;
      this.totalDim = currency(val.total, "￥");
      this.avgDim = currency(val.avg, "￥");
      this.handleCompare();
      this.setDim();
    },
    saleDimStore: function(val) {
      // console.log(val)
      this.saleTotal = currency(val.total.toFixed(2), "￥");
      this.saleAvg = currency(val.avg, "￥");
      this.seriesData = val;
      this.total = val.data.length;
      this.handleSeries();
      this.setDim();
    },
    saleDimGuide: function(val) {
      // console.log(val);
      this.saleTotal = currency(val.total.toFixed(2), "￥");
      this.saleAvg = currency(val.avg, "￥");
      this.seriesData = val;
      this.total = val.data.length;
      this.handleSeries();
      this.setDim();
    },
    storeList: function(val) {
      // console.log(val)
      this.storeData = val.data;
    },
    guideList: function(val) {
      // console.log(val);
      this.guideData = val.data;
    }
  },
  computed: {},
  data() {
    return {
      storecode: this.$store.state.storeCode,
      checked: false,
      dimTime: "",
      value: "",
      value1: "",
      value2: "",
      brand: "",
      total: 0,
      saleTotal: 0,
      totalDim: 0,
      saleAvg: 0,
      avgDim: 0,
      restaurants: [],
      seriesData: [],
      compareData: [],
      brandId: "",
      dimSwitch: false,
      storeData: [],
      guideData: [],
      outletId: null,
      currentPage: 1,
      guideSwitch: true,
      loading: null,
      loadAttr: {
        target: "#saleDim",
        fullscreen: false,
        text: "正在生成图表"
      },
      options: [
        {
          value: "1",
          label: "永旺店"
        },
        {
          value: "2",
          label: "徐东店"
        },
        {
          value: "3",
          label: "光谷店"
        },
        {
          value: "4",
          label: "abc"
        }
      ],
      dimData: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["本月销售", "对比数据"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          splitNumber: 4
          // boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          inverse: true,
          data: []
        },
        series: [
          {
            name: "本月销售",
            type: "bar",
            data: [],
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
            data: [],
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
    this.storeData = this.storeList.data;
    this.loading = Loading.service(this.loadAttr);
    // console.log(this.saleDimensionSeries);
    // this.seriesData = this.saleDimensionSeries;
    // this.restaurants = this.loadAll();
    // this.total = this.saleDimensionSeries.data.length;
    // this.saleTotal = currency(this.saleDimensionSeries.total, "￥");
    // this.saleAvg = currency(this.saleDimensionSeries.avg, "￥");
    // this.handleSeries();
    // this.setDim();
  },
  updated() {},
  activated() {},
  methods: {
    storeSelect(e) {
      this.$store.dispatch("report/getSaleDimStore", {
        storecode: this.storecode,
        outletId: e
      });
      this.$store.dispatch("report/getGuideList", {
        storecode: this.storecode,
        outletId: e
      });
      this.outletId = e;
      this.guideSwitch = false;
    },
    guideSelect(e) {
      this.$store.dispatch("report/getSaleDimGuide", {
        storecode: this.storecode,
        outletId: this.outletId,
        userId: e
      });
    },
    closeLoad() {
      this.loading.close();
    },
    select(e) {
      // console.log(e);
    },
    setDim() {
      let dimChart = echarts.init(document.getElementById("saleDim"));
      // this.handleSeries();
      dimChart.setOption(this.dimData);
    },
    handleSeries(start = 0, end = 20) {
      this.dimData.yAxis.data = this.seriesData.name.slice(start, end);
      this.dimData.series[0].data = this.seriesData.data.slice(start, end);
    },
    handleCompare(start = 0, end = 20) {
      this.dimData.series[1].data = this.compareData.data.slice(start, end);
    },
    pageChange(e) {
      this.dimData.yAxis.data = [];
      this.dimData.series[0].data = [];
      this.handleSeries((e - 1) * 20, e * 20);
      // console.log(this.dimData);
      this.setDim();
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return restaurant.value.indexOf(queryString.toLowerCase()) === 0;
      };
    },
    handleSelect(item) {
      // console.log(item);
      let brandId = item.id;
      let index = null;
      this.saleDimensionSeries.brandId.forEach((e, i) => {
        if (e == brandId) {
          index = i;
        }
      });
      // console.log(index);
      this.currentPage = Math.ceil((index + 1) / 20);
    },
    dimTimeSelect(e) {
      if (e) {
        let val = e.split(" - ");
        let startDate = val[0].replace(/-/g, "") + "";
        let endDate = val[1].replace(/-/g, "") + "";
        this.$store.dispatch("report/getSaleDimCompare", {
          storecode: this.storecode,
          startDate: startDate,
          endDate: endDate
        });
      }
    },
    loadAll() {
      return this.saleDimensionSeries.sel;
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

.text-total,
.text-dim,
.total-dim,
.avg-dim {
  font-size: 26px;
}

.text-total {
  color: #75a8f2;
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
.text-dim {
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

.w150 {
  width: 150px;
}
</style>

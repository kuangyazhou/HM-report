<template>
  <div class="flex column main">
    <div class="flex header">
      <div class="flex screen-logo">
      </div>
      <div class="flex title">经营大数据实时指挥中心</div>
      <div class="flex time">
        {{time}}
      </div>
    </div>
    <div class="flex center sand-clock">
      <span class="flex center">实时大数据刷新倒计时
        <span class="text-clock">{{min}}:{{seconds}}</span>
      </span>
    </div>
    <el-row>
      <el-col :span="8">
        <el-card class="screen">
          <div slot="header" class="clearfix" style="text-align:center">
            <span style="line-height: 18px;">销售指标预警</span>
          </div>
          <div>
            <Vtable :title="saleTitle" :tableData="saleTableData" :showIndex="false" :activeLine="1" :activeRow="2"></Vtable>
          </div>
        </el-card>
        <el-card class="screen" style="margin:12px 0">
          <div slot="header" class="clearfix" style="text-align:center">
            <span style="line-height: 18px;">品类销售排行</span>
          </div>
          <div id="typeSale" style="width:100%;height:230px"></div>
        </el-card>
        <el-card class="screen">
          <div slot="header" class="clearfix" style="text-align:center">
            <span style="line-height: 18px;">品牌top10</span>
          </div>
          <Vtable :title="topTenTitle" :width="90" :tableData="topTenData" :activeRow="topTenRow"></Vtable>
        </el-card>
      </el-col>
      <el-col :span="8" class="margin1">
        <el-card class="screen">
          <div slot="header" class="clearfix" style="text-align:center">
            <span style="line-height: 18px;">今日销售动态</span>
          </div>
          <div class="flex column">
            <div class="flex row around white">
              <span class="flex">今日销售额(元)</span>
              <span class="flex" style="{width:'50%',justify-content:'center'}">{{percentage+'%'}}</span>
              <span class="flex">今日目标(元)</span>
            </div>
            <div class="flex around m5">
              <span class="flex today-sale">{{Sale}}</span>
              <!-- <el-progress style="width:50%" :stroke-width="18" :percentage="percentage"></el-progress> -->
              <Vprogress :percentage="percentage"></Vprogress>
              <span class="flex today-target center">{{Target}}
                <i class="fa fa-edit left5" @click="defineTarget" aria-hidden="true"></i>
              </span>
            </div>
            <!-- <div class="flex">
              <el-button size="mini">自定义目标</el-button>
            </div> -->
          </div>
          <div class="gradient-border"></div>
          <div id="hourDis" style="width:100%;height:350px"></div>
          <div class="gradient-border"></div>
          <div id="storeSaleDis" :style="{width:'100%',height:this.storeHeight+'px'}"></div>
          <el-dialog title="自定义目标" :visible.sync="dialogSaleVisible" :show-close="false">
            <el-input type="number" placeholder="请输入数字" v-model="customTarget"></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogSaleVisible = false">取 消</el-button>
              <el-button type="primary" @click="setSaleTarget">确 定</el-button>
            </span>
          </el-dialog>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="screen" style="margin-bottom:12px;">
          <div slot="header" class="clearfix" style="text-align:center">
            <span style="line-height: 18px;">会员增长动态
            </span>
          </div>
          <div class="flex column white">
            <div class="flex row around">
              <span class="flex">今日新增会员(人)</span>
              <span class="flex" style="{width:'50%',justify-content:'center'}">{{newpercentage+'%'}}</span>
              <span class="flex">今日新客目标(人)</span>
            </div>
            <div class="flex around">
              <span class="flex today-add">{{newMom+newBaby}}</span>
              <Vprogress :percentage="newpercentage"></Vprogress>
              <span class="flex today-target">{{newMemberTarget}}
                <i class="fa fa-edit left5" @click="memberTarget" aria-hidden="true"></i>
              </span>
            </div>
            <div class="flex column">
              <span class="felx font14">
                <i class="fa fa-female icon-blue"></i>新增孕妈(人):{{newMom}}
              </span>
            </div>
            <div class="flex">
              <span class="flex font14">
                <i class="fa fa-child icon-blue"></i>新增萌宝(人):{{newBaby}}
              </span>
            </div>
          </div>
          <div class="gradient-border"></div>
          <div id="memberAdd" style="width:100%;height:300px"></div>
          <el-dialog title="自定义目标" :visible.sync="dialogMemberVisible" :show-close="false">
            <el-input type="number" placeholder="请输入数字" v-model="newAddTarget"></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogMemberVisible = false">取 消</el-button>
              <el-button type="primary" @click="setNewTarget">确 定</el-button>
            </span>
          </el-dialog>
        </el-card>
        <el-card class="screen">
          <div slot="header" class="clearfix" style="text-align:center">
            <span style="line-height: 18px;">会员消费贡献分布</span>
          </div>
          <Vtable :showIndex="false" :title="memberconsumTitle" :tableData="memberconsumData"></Vtable>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Button,
  Col,
  Dialog,
  Input,
  Progress,
  Row,
  Card,
  Tooltip,
  Table,
  TableColumn
} from "element-ui";
import Vprogress from "~components/commons/progress";
import Vtable from "~components/commons/table";
import echarts from "echarts";
import axios from "axios";
import { Format } from "../utils/format";
Vue.use(Button);
Vue.use(Col);
Vue.use(Card);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Row);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Progress);
export default {
  watch: {
    saleroom: function(val) {
      deep: true;
      this.saleTableData = [];
      this.saleTableData.push(val);
    },
    saleSingle: function(val) {
      deep: true;
      this.saleTableData.push(val);
    },
    related: function(val) {
      deep: true;
      this.saleTableData.push(val);
    },
    offered: function(val) {
      deep: true;
      this.saleTableData.push(val);
    },
    newAdd: function(val) {
      deep: true;
      this.saleTableData.push(val);
    },
    brand: function(val) {
      let name = [];
      val.forEach(e => {
        name.push(e.name);
      });
      this.brandOption.series[0].data = val;
      this.brandOption.legend.data = name;
      this.typeLength = val.length;
      this.typeSaleChart.setOption(this.brandOption);
    },
    topTen: function(val) {
      // console.log(val);
      deep: true;
      this.topTenData = val;
    },
    todaySale: function(val) {
      this.Sale = val[0] ? val[0].toFixed(2) : 0;
    },
    todayTarget: function(val) {
      this.Target = val[0] ? val[0].toFixed(2) : 0;
      if (this.Target) {
        this.percentage = Number((this.Sale / this.Target * 100).toFixed(2));
      } else {
        this.percentage = 0;
      }
    },
    hourSale: function(val) {
      this.hourDisOption.series[0].data = val[0];
      this.hourDisOption.xAxis.data = val[1];
      this.hourLength = val[0].length;
      this.hourDisChart.setOption(this.hourDisOption);
    },
    sevenSale: function(val) {
      this.hourDisOption.series[1].data = val;
      this.hourDisChart.setOption(this.hourDisOption);
    },
    saleSpread: function(val) {
      this.storeSaleOption.yAxis[0].data = val[2];
      this.storeSaleOption.yAxis[1].data = val[2];
      this.storeSaleOption.series[0].data = val[1];
      this.storeSaleOption.series[1].data = val[0];
      this.storeHeight = val[1].length / 16 * 200 + 350;
      this.storeSaleChart.resize({
        height: this.storeHeight
      });
      this.storeLength = val[0].length;
      this.storeSaleChart.setOption(this.storeSaleOption);
    },
    newTarget: function(val) {
      this.newMemberTarget = Math.ceil(val);
      this.newpercentage = val
        ? Number(((this.newMom + this.newBaby) / val * 100).toFixed(2))
        : 0;
    },
    memberConsum: function(val) {
      this.memberconsumData = val;
    },
    Timestamp: function(val) {
      if (!val) {
        this.refreshData();
        this.getDataByAPI();
      }
      this.typeSaleChart.setOption(this.brandOption);
      this.hourDisChart.setOption(this.hourDisOption);
    }
  },
  components: { Vprogress, Vtable },
  middleware: "check-auth",
  layout: "dashboard",
  data() {
    return {
      time: null,
      Timestamp: 180,
      tenType: 1,
      activeRow: 3,
      Sale: 0,
      Target: 0,
      newMemberTarget: 0,
      newpercentage: 0,
      percentage: 0,
      typeIndex: 0,
      typeLength: 6,
      hourIndex: 0,
      hourLength: 16,
      storeIndex: 0,
      storeLength: 10,
      storeHeight: 1,
      customTarget: "",
      newAddTarget: "",
      dialogSaleVisible: false,
      dialogMemberVisible: false,
      typeSaleChart: null,
      hourDisChart: null,
      storeSaleChart: null,
      memberAddChart: null,
      newMom: 0,
      newBaby: 0,
      topTenRow: 3,
      saleTitle: ["项目", "今日", "昨日", "最近7日", "上月同期"],
      saleTableData: [],
      topTenTitle: ["品牌", "销售额", "销量", "交易会员数"],
      topTenData: [],
      memberconsumTitle: [
        "年龄段",
        "销售额(占比)",
        "订单量(占比)",
        "交易客户数(占比)"
      ],
      memberconsumData: [],
      storeSaleOption: {
        title: {
          text: "门店销售分布",
          textStyle: {
            color: "#f1f1f1"
          }
        },
        // color: ["#0074ff", "#7c9ee3"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: "销售额{c},销售目标{c1}"
        },
        legend: {
          right: 20,
          orient: "horizontal",
          data: ["实时销售额", "今日销售目标"],
          textStyle: {
            color: "#f1f1f1"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#b2b2b2"
            }
          },
          boundaryGap: [0, 0.01],
          splitNumber: 2,
          splitLine: false
        },
        yAxis: [
          {
            type: "category",
            axisTick: { show: false },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#b2b2b2"
              }
            },
            data: []
          },
          {
            type: "category",
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
            splitArea: { show: false },
            splitLine: { show: false },
            data: []
          }
        ],
        series: [
          {
            name: "今日销售目标",
            type: "bar",
            yAxisIndex: 1,
            stack: "总量",
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                borderWidth: 0,
                color: "#3d7be0"
              }
            },
            barGap: "0%",
            barCategoryGap: "50%",
            data: []
          },
          {
            name: "实时销售额",
            type: "bar",
            yAxisIndex: 0,
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                borderWidth: 0,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  { offset: 0, color: "#287cd7" },
                  { offset: 1, color: "#e576e9" }
                ])
              }
            },
            barGap: "0%",
            barCategoryGap: "50%",
            data: []
          }
          // {
          //   name: "完成率",
          //   type: "bar",
          //   yAxisIndex: 2,
          //   stack: "总量",
          //   barGap: "0%",
          //   barCategoryGap: "50%",
          //   label: {
          //     normal: {
          //       position: "right",
          //       show: true
          //     }
          //   },
          //   data: []
          // }
        ]
      },
      hourDisOption: {
        title: {
          text: "小时销售分布",
          // left: "10%",
          // textAlign: "center"
          textStyle: {
            color: "#f1f1f1"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#ddd"
            }
          },
          // backgroundColor: "rgba(255,255,255,1)",
          padding: [5, 10],
          textStyle: {
            color: "#fff"
          },
          extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)"
        },
        grid: {
          left: "1%",
          right: "4%",
          bottom: "10%",
          containLabel: true
        },
        legend: {
          right: 20,
          orient: "horizontal",
          data: ["今日销售", "近七天平均销售"],
          textStyle: {
            color: "#f1f1f1"
          }
        },
        xAxis: {
          type: "category",
          data: [],
          boundaryGap: false,
          // splitLine: {
          //   show: false,
          //   interval: "auto",
          //   lineStyle: {
          //     color: ["#D4DFF5"]
          //   }
          // },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#609ee9"
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          }
        },
        yAxis: {
          type: "value",
          splitNumber: 3,
          splitLine: false,
          // splitLine: {
          //   lineStyle: {
          //     color: ["#D4DFF5"]
          //   }
          // },
          axisTick: {
            // show: true
          },
          axisLine: {
            lineStyle: {
              color: "#609ee9"
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          }
        },
        series: [
          {
            name: "今日销售",
            type: "line",
            smooth: true,
            showSymbol: false,
            symbol: "circle",
            symbolSize: 6,
            data: [],
            itemStyle: {
              normal: {
                color: "#ff0000"
              }
            },
            lineStyle: {
              normal: {
                width: 2
              }
            }
          },
          {
            name: "近七天平均销售",
            type: "line",
            smooth: true,
            showSymbol: false,
            symbol: "circle",
            symbolSize: 6,
            data: [],
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      // color: "rgba(216, 244, 247,1)"
                      color: "#285ab2"
                    },
                    {
                      offset: 1,
                      // color: "rgba(216, 244, 247,1)"
                      color: "#c26ccc"
                    }
                  ],
                  false
                )
              }
            },
            itemStyle: {
              normal: {
                color: "#c26ccc"
              }
            },
            lineStyle: {
              normal: {
                width: 0
              }
            }
          }
        ]
      },
      brandOption: {
        title: {
          // text: "品类销售排行"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        color: [
          "#00599b",
          "#0569cc",
          "#007ee5",
          "#2e97ff",
          "#5fa8ff",
          "#8fbaff",
          "#bbd7ff"
        ],
        legend: {
          orient: "horizontal",
          // bottom:0,
          textStyle: {
            color: "#f1f1f1"
          },
          data: []
        },
        series: [
          {
            name: "品类销售排行",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: true,
            data: []
          }
        ]
      },
      memberAddOption: {
        title: {
          text: "今日门店会员增长分布",
          textStyle: {
            color: "#f1f1f1"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          right: 20,
          orient: "horizontal",
          data: ["孕妈", "萌宝"],
          textStyle: {
            color: "#f1f1f1"
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
          axisLine: {
            lineStyle: {
              color: "#b2b2b2"
            }
          },
          boundaryGap: [0, 0.01],
          splitLine: false
        },
        yAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#b2b2b2"
            }
          },
          data: []
        },
        series: [
          {
            name: "孕妈",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                // barBorderRadius: 10,
                // borderWidth: 0,
                color: "#245dd1"
              }
            },
            barGap: "0%",
            barCategoryGap: "50%",
            data: []
          },
          {
            name: "萌宝",
            type: "bar",
            stack: "总量",
            itemStyle: {
              // barBorderRadius: 10,
              // borderWidth: 0,
              normal: { color: "#507dda" }
            },
            barGap: "0%",
            barCategoryGap: "50%",
            data: []
          }
        ]
      }
    };
  },
  computed: {
    storeCode() {
      return this.$store.state.storeCode;
      // this.$store.state.storeCode || window.localStorage.getItem("storecode")
    },
    // testData() {
    //   return this.$store.state.report.datasource.saleTotal;
    // },
    saleroom() {
      return this.$store.state.report.datasource.screenSaleroom;
    },
    saleSingle() {
      return this.$store.state.report.datasource.screenSalesingle;
    },
    related() {
      return this.$store.state.report.datasource.screenRelated;
    },
    offered() {
      return this.$store.state.report.datasource.screenOffered;
    },
    newAdd() {
      return this.$store.state.report.datasource.screenNew;
    },
    brand() {
      return this.$store.state.report.datasource.screenBrand;
    },
    topTen() {
      return this.$store.state.report.datasource.topTen;
    },
    todaySale() {
      return this.$store.state.report.datasource.screenTodaySale;
    },
    todayTarget() {
      return this.$store.state.report.datasource.screenTodayTarget;
    },
    hourSale() {
      return this.$store.state.report.datasource.screenHourSale;
    },
    sevenSale() {
      return this.$store.state.report.datasource.screenSevenSale;
    },
    saleSpread() {
      return this.$store.state.report.datasource.screenSaleSpread;
    },
    newTarget() {
      return this.$store.state.report.datasource.screenNewtarget;
    },
    // newpercentage() {
    //   return this.newMemberTarget ? (this.mom + this.baby) / this.newMemberTarget * 100 : 0;
    // },
    memberConsum() {
      return this.$store.state.report.datasource.screenMemberconsum;
    },
    min() {
      return "0" + Number.parseInt(this.Timestamp / 60);
    },
    seconds() {
      return this.Timestamp - this.min * 60 < 10
        ? "0" + (this.Timestamp - this.min * 60)
        : this.Timestamp - this.min * 60;
    }
  },
  created() {
    this.refreshData();
    this.getDataByAPI();
  },
  updated() {},
  mounted() {
    if (!this.storeCode) {
      this.$router.push("login");
    }
    // setInterval(() => {
    //   this.refreshData();
    // }, 1000 * 60 * 3);
    this.time = setInterval(() => {
      this.updateTime();
      this.sandClock();
    }, 1000);
    this.typeSaleChart = echarts.init(document.getElementById("typeSale"));
    this.hourDisChart = echarts.init(document.getElementById("hourDis"));
    this.storeSaleChart = echarts.init(document.getElementById("storeSaleDis"));
    this.memberAddChart = echarts.init(document.getElementById("memberAdd"));

    setInterval(() => {
      this.showTooltip();
    }, 2000);
  },
  //   destroyed: {},
  methods: {
    updateTime: function() {
      this.time = new Date().Format("yyyy-MM-dd hh:mm:ss");
    },
    sandClock() {
      this.Timestamp <= 0 ? (this.Timestamp = 180) : (this.Timestamp -= 1);
    },
    showTooltip() {
      this.typeSaleChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: this.typeIndex
      });
      this.hourDisChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: this.hourIndex
      });
      this.storeSaleChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: this.storeIndex
      });
      this.typeIndex += 1;
      this.hourIndex += 1;
      this.storeIndex += 1;
      if (this.typeIndex >= this.typeLength) {
        this.typeIndex = 0;
      }
      if (this.hourIndex >= this.hourLength) {
        this.hourIndex = 0;
      }
      if (this.storeIndex >= this.storeLength) {
        this.storeIndex = 0;
      }
    },
    getDataByAPI() {
      // 会员全量信息
      axios
        .get(
          `http://crmbackservice.hemiao100.com/crm/data/today_member_info.json?token=5510,6666,1,${
            this.storeCode
          },11161`
        )
        .then(response => {
          // console.log(response);
          if (response.data.code == 0) {
            this.newMom = response.data.data.mom;
            this.newBaby = response.data.data.baby;
            this.newMemberTarget
              ? (this.percentage = Number(
                  (this.mom + this.baby) / this.newMemberTarget * 100
                ).toFixed(2))
              : (this.percentage = 0);
          }
        });
      // 门店会员信息
      axios
        .get(
          `http://crmbackservice.hemiao100.com/crm/data/today_member_outlet_info.json?token=5510,6666,1,${
            this.storeCode
          },11161`
        )
        .then(response => {
          if (response.data.code == 0) {
            let storeName = new Set(
              Object.keys(response.data.data.baby),
              Object.keys(response.data.data.mom)
            );
            let baby = Array.from(Object.keys(response.data.data.baby));
            let mom = Array.from(Object.keys(response.data.data.mom));
            let babyValue = Array.from(Object.values(response.data.data.baby));
            let momValue = Array.from(Object.values(response.data.data.mom));
            let name = Array.from(storeName);
            // console.log(name);
            let data = {
              baby: [],
              mom: []
            };
            name.forEach(n => {
              let bindex = baby.findIndex(function(value, index, arr) {
                return value == n;
              });
              let mindex = mom.findIndex(function(value, index, arr) {
                return value == n;
              });
              bindex > -1
                ? data.baby.push(babyValue[bindex])
                : data.baby.push(0);
              mindex > -1 ? data.mom.push(momValue[mindex]) : data.mom.push(0);
            });
            // console.log(baby, mom, data);
            this.memberAddOption.yAxis.data = name;
            this.memberAddOption.series[0].data = data.mom;
            this.memberAddOption.series[1].data = data.baby;
            // console.log
            this.memberAddChart.setOption(this.memberAddOption);
          }
        });
    },
    defineTarget(e) {
      // console.log(e);
      this.dialogSaleVisible = true;
    },
    memberTarget(e) {
      this.dialogMemberVisible = true;
    },
    setSaleTarget(e) {
      // console.log(this.customTarget);
      this.percentage = Number(
        (this.Sale / Number(this.customTarget) * 100).toFixed(2)
      );
      this.Target = this.customTarget;
      this.dialogSaleVisible = false;
    },
    setNewTarget(e) {
      this.newpercentage = Number(
        (
          (this.newMom + this.newBaby) /
          Number(this.newAddTarget) *
          100
        ).toFixed(2)
      );
      this.newMemberTarget = this.newAddTarget;
      this.dialogMemberVisible = false;
    },
    refreshData() {
      switch (this.tenType) {
        case 1:
          this.$store.dispatch("report/getTopTen", {
            storecode: this.storeCode
          });
          this.topTenRow = 3;
          break;
        case 2:
          this.$store.dispatch("report/getTenBynumber", {
            storecode: this.storeCode
          });
          this.topTenRow = 4;
          break;
        case 3:
          this.$store.dispatch("report/getTenBymember", {
            storecode: this.storeCode
          });
          this.topTenRow = 5;
          break;
        default:
          this.$store.dispatch("report/getTopTen", {
            storecode: this.storeCode
          });
          this.topTenRow = 3;
      }
      this.$store.dispatch("report/getScreenSaleRoom", {
        storecode: this.storeCode
      });
      this.$store.dispatch("report/getScreenSaleSingle", {
        storecode: this.storeCode
      });
      this.$store.dispatch("report/getScreenRelated", {
        storecode: this.storeCode
      });
      this.$store.dispatch("report/getScreenOffered", {
        storecode: this.storeCode
      });
      this.$store.dispatch("report/getScreenNewadd", {
        storecode: this.storeCode
      });
      this.$store.dispatch("report/getScreenBrand", {
        storecode: this.storeCode
      });

      this.$store.dispatch("report/getScreenTodaySale", {
        storecode: this.storeCode
      });
      this.$store.dispatch("report/getScreenTodayTarget", {
        storecode: this.storeCode
      });
      this.$store.dispatch("report/getScreenHourSale", {
        storecode: this.storeCode
      });
      this.$store.dispatch("report/getScreenSevenSale", {
        storecode: this.storeCode
      });
      this.$store.dispatch("report/getScreenSaleSpread", {
        storecode: this.storeCode
      });
      this.$store.dispatch("report/getScreenNewtarget", {
        storecode: this.storeCode
      });
      this.$store.dispatch("report/getScreenMemberconsum", {
        storecode: this.storeCode
      });
      this.tenType >= 3 ? (this.tenType = 1) : (this.tenType += 1);
      this.activeRow = this.tenType + 2;
    }
  }
};
</script>
<style scoped>
.header {
  /* justify-content: space-between; */
  align-items: center;
  color: white;
  background: radial-gradient(ellipse 40% 40%, #004c9e, #002259);
  text-shadow: 1px 1px gray;
}
.white {
  color: #f1f1f1;
}
.m5 {
  margin-top: 5px;
}
.main {
  padding: 8px;
  background: radial-gradient(circle at 50%, #004c9e, #002259);
}
.icon-blue {
  color: #8fbaff;
}
.sand-clock {
  color: #4aedca;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.text-clock {
  font-size: 28px;
}
.el-col-8 {
  width: 32.6%;
}
.left5 {
  margin-left: 5px;
  color: #f1f1f1;
}

.screen-logo,
.title,
.time {
  flex: 1;
}
.font14 {
  font-size: 14px;
}
.today-sale,
.today-add {
  color: #4aedca;
}
.today-sale,
.today-target,
.today-add {
  font-size: 22px;
}
.today-target {
  color: #8fbaff;
}
.today-target:hover {
  cursor: pointer;
}
.margin1 {
  margin: 0 1%;
}
.screen-logo {
  /* width: 100%; */
  justify-content: flex-start;
  height: 26px;
  background: url("../assets/img/logowhite.png") no-repeat;
}
.title {
  justify-content: center;
  font-size: 28px;
}
.time {
  justify-content: flex-end;
}
.gradient-border {
  margin: 5px 0;
  height: 2px;
  background: linear-gradient(to right, #002259, #004c9e, #002259);
  /* background: linear-gradient(to right, #004c9e, #002259, #004c9e); */
}
</style>

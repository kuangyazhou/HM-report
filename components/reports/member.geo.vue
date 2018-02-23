<template>
  <div class="container">
    <el-row :gutter="15" style="margin-top: 20px;">
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">
              <i class="fa fa-globe" aria-hidden="true"></i>会员地理分析图
            </span>
          </div>
          <div id="container" :style="{width:'100%',height:'700px'}"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Vue from "vue";
import echarts from "echarts";
import bmap from "echarts/extension/bmap/bmap";
import china from "echarts/map/js/china.js";

import { Button, Col, Row, Tooltip, Card, Alert, Loading } from "element-ui";
Vue.use(Button);
Vue.use(Col);
Vue.use(Card);
Vue.use(Row);
Vue.use(Tooltip);
Vue.use(Alert);
export default {
  components: {},
  props: ["storeList", "memberGeoSeries", "geoCenter"],
  watch: {
    storeList: function(val) {
      console.log(val);
    },
    memberGeoSeries: function(val) {
      //   console.log(val);
      this.bmapData.series[0].data = val.data;
      //   this.setMap();
      this.loading.close();
      this.myChart.setOption(this.bmapData);
    },
    geoCenter: function(val) {
      // console.log(val.data[0]);
      this.bmapData.bmap.center = val.data[0];
      this.myChart.setOption(this.bmapData);
    }
  },
  computed: {},
  data() {
    return {
      myChart: null,
      loading: null,
      loadAttr: {
        target: "#container",
        fullscreen: false,
        text: "正在生成图表"
      },
      bmapData: {
        animation: false,
        bmap: {
          center: ["114.2522942178", "30.6054677499"],
          // || [116.404844, 39.921354]
          zoom: 11,
          roam: true
        },
        visualMap: {
          show: false,
          top: "top",
          min: 0,
          max: 5,
          seriesIndex: 0,
          calculable: true,
          inRange: {
            color: ["orange", "green", "yellow", "red"]
            // color: [
            //   "#012042",
            //   "#022d5f",
            //   "#04438b",
            //   "#0053b1",
            //   "#0876f5",
            //   "#56a6ff",
            //   "#0ef0f2"
            // ]
          }
        },
        series: [
          {
            type: "heatmap",
            coordinateSystem: "bmap",
            data: [],
            pointSize: 5,
            blurSize: 6
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    let dom = document.getElementById("container");
    let myChart = echarts.init(dom);
    let app = {};
    app.title = "会员信息热力图";
    myChart.setOption(this.bmapData);
    this.loading = Loading.service(this.loadAttr);
    this.myChart = myChart;
    if (!app.inNode) {
      //     // 添加百度地图插件
      let bmap = myChart
        .getModel()
        .getComponent("bmap")
        .getBMap();
      bmap.addControl(new BMap.MapTypeControl());
    }
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
  methods: {}
};
</script>

<style scoped>
#allmap {
  width: 100%;
  height: 100%;
}
</style>

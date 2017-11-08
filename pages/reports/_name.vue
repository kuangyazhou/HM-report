<template>
  <div class="reports-container">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <div v-if="activePane === 'global-single-store'">
            <Filters :emitFilterChange="onFilterChange" :disableOutlet="false" :disabledEmployee="true" />
          </div>
          <div v-if="activePane === 'global-single-person'">
            <Filters :emitFilterChange="onFilterChange" :disableOutlet="false" :disabledEmployee="false" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div v-if="activePane === 'homePage'">
        <Home :currentMonthSeries="currentMonthSeries" :currentMonthNewDetail="currentMonthNewDetail" :guideNewSeries="guideNewSeries" :guideSaleSeries="guideSaleSeries" />
      </div>
      <div v-if="activePane === 'salesTotal'">
        <SaleTotal :storeList="storeList"  :saleTotalSeries="saleTotalSeries" :saleTotalDimSeries="saleTotalDimSeries" />
      </div>
      <div v-if="activePane === 'salesHot'">
        <Home :todaySeries="todaySeries" :guideSeries="guideSeries" :detailSeries="detailSeries" :yesterdaySeries="yesterdaySeries" />
      </div>
      <div v-if="activePane === 'salesDim'">
        <SaleDim :saleDimensionSeries="saleDimensionSeries" :saleDimCompare="saleDimCompare" :saleDimStore="saleDimStore" :saleDimGuide="saleDimGuide" :storeList="storeList" :guideList="guideList" />
      </div>
      <div v-if="activePane === 'salesOrder'">
        <SaleOrder :storeList="storeList" :saleOrderPrice="saleOrderPrice" :saleOrderPriceDim="saleOrderPriceDim" :slaeOrderTimes="slaeOrderTimes" :saleOrderTimeDim="saleOrderTimeDim" />
      </div>
      <div v-if="activePane === 'operaNew'">
        <OperaNew :storeList="storeList" :operaMainSeries="operaMainSeries" :operaGuideSeries="operaGuideSeries" :operaGuideCurrentMonth="operaGuideCurrentMonth" />
      </div>
      <div v-if="activePane === 'operaNumber'">
        <OperaNumber :storeList="storeList" :operDealNumSeries="operDealNumSeries" />
      </div>
      <div v-if="activePane === 'operaTimes'">
        <OperaTimes :operDealTimesSeries="operDealTimesSeries" :storeList="storeList"/>
      </div>
      <div v-if="activePane === 'operaSingle'">
        <OperaSingle :operaDealPriceSeries="operaDealPriceSeries" :storeList="storeList" />
      </div>
      <div v-if="activePane === 'memberGeo'">
        <MemberGeo :storeList="storeList" :memberGeoSeries="memberGeoSeries"/>
      </div>
      <div v-if="activePane === 'memberLife'">
        <MemberLife :todaySeries="todaySeries" :guideSeries="guideSeries" :detailSeries="detailSeries" :yesterdaySeries="yesterdaySeries" />
      </div>
      <div v-if="activePane === 'memberLoyal'">
        <MemberLoyal />
      </div>
    </el-row>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import Filters from "~components/commons/Filters.vue";
import currencyFormatter from "currency-formatter";
import { Button, Col, Row } from "element-ui";
import "../../utils/format.js";

//首页
import Home from "~components/reports/homePage.vue";

//销售统计分析
import SaleHot from "~components/reports/sales.hot.vue";
import SaleTotal from "~components/reports/sales.total.vue";
import SaleDim from "~components/reports/sales.dimension.vue";
import SaleOrder from "~components/reports/sales.order.vue";

//运营统计分析
import OperaNew from "~components/reports/opera.new.vue";
import OperaNumber from "~components/reports/opera.number.vue";
import OperaTimes from "~components/reports/opera.times.vue";
import OperaSingle from "~components/reports/opera.single.vue";

//会员统计分析
import MemberGeo from "~components/reports/member.geo.vue";
import MemberLife from "~components/reports/member.life.vue";
import MemberLoyal from "~components/reports/member.loyal.vue";

Vue.use(Button);
Vue.use(Col);
Vue.use(Row);

export default {
  layout: "master",
  middleware: "check-auth",
  components: {
    Home,
    SaleTotal,
    SaleHot,
    SaleDim,
    SaleOrder,
    OperaNew,
    OperaNumber,
    OperaTimes,
    OperaSingle,
    MemberGeo,
    MemberLife,
    MemberLoyal,
    Filters
  },
  validate({ params, query, store }) {
    let isValidate = false;
    switch (params.name) {
      case "homePage":
        isValidate = true;
        break;
      case "salesTotal":
        isValidate = true;
        break;
      case "salesHot":
        isValidate = true;
        break;
      case "salesDim":
        isValidate = true;
        break;
      case "salesOrder":
        isValidate = true;
        break;
      case "operaNew":
        isValidate = true;
        break;
      case "operaNumber":
        isValidate = true;
        break;
      case "operaTimes":
        isValidate = true;
        break;
      case "operaSingle":
        isValidate = true;
        break;
      case "memberGeo":
        isValidate = true;
        break;
      case "memberLife":
        isValidate = true;
        break;
      case "memberLoyal":
        isValidate = true;
        break;
      default:
        isValidate = false;
        break;
    }
    return isValidate;
  },
  mounted() {
    // console.log(this.storeCode);
    // this.$store.dispatch('report/login');
    switch (this.$route.params.name) {
      case "global-all":
        this.$store.dispatch("report/getCurrLastMonthSaleAmount", {
          storecode: this.storeCode
        });
        // ----------------------------------- //
        this.$store.dispatch("report/getCurrLastYearSaleAmount", {
          storecode: this.storeCode
        });
        // ----------------------------------- //
        this.$store.dispatch("report/getTOP20OutletSale", {
          storecode: this.storeCode
        });
        // ----------------------------------- //
        this.$store.dispatch("report/getTOP20BrandSale", {
          storecode: this.storeCode
        });
        // ----------------------------------- //
        this.$store.dispatch("report/getOldAndNewMembersCounts", {
          storecode: this.storeCode
        });
        // ----------------------------------- //
        this.$store.dispatch("report/getNewMembersCounts", {
          storecode: this.storeCode
        });
        // ----------------------------------- //
        this.$store.dispatch("report/getCurrentMonthMemberLevel", {
          storecode: this.storeCode
        });
        // ----------------------------------- //
        break;
      case "member-feature":
        this.$store.dispatch("report/getFeatureByAll", {
          storecode: this.storeCode
        });
        break;
      case "member-rebuy":
        // console.log('rebuy')
        this.$store.dispatch("report/getMemberReBuy", {
          storecode: this.storeCode
        });
        // ----------------------------------- //
        this.$store.dispatch("report/getRebuyGoods", {
          storecode: this.storeCode
        });
        // ----------------------------------- //
        this.$store.dispatch("report/getRebuyType", {
          storecode: this.storeCode
        });
        // ----------------------------------- //
        this.$store.dispatch("report/getRebuyBrand", {
          storecode: this.storeCode
        });
        break;
      case "homePage":
        this.$store.dispatch("report/getMonthSale", {
          storecode: this.storeCode
        });
        this.$store.dispatch("report/getMonthNewmember", {
          storecode: this.storeCode
        });
        break;
      case "salesOrder":
        this.$store.dispatch("report/getStoreList", {
          storecode: this.storeCode
        });
        this.$store.dispatch("report/getSaleOrder", {
          storecode: this.storeCode,
          startDate: this.startDate,
          endDate: this.endDate
        });
        this.$store.dispatch("report/getSaleOrderTimes", {
          storecode: this.storeCode,
          startDate: this.startDate,
          endDate: this.endDate
        });
        break;
      case "operaNew":
        this.$store.dispatch("report/getStoreList", {
          storecode: this.storeCode
        });
        this.$store.dispatch("report/getOperaMain", {
          storecode: this.storeCode,
          startDate: this.startDate,
          endDate: this.endDate
        });
        break;
      case "operaNumber":
        this.$store.dispatch("report/getStoreList", {
          storecode: this.storeCode
        });
        this.$store.dispatch("report/getOperaDealNum", {
          storecode: this.storeCode,
          startDate: this.startDate,
          endDate: this.endDate
        });
        break;
      case "operaTimes":
        this.$store.dispatch("report/getStoreList", {
          storecode: this.storeCode
        });
        this.$store.dispatch("report/getOperaDealTimes", {
          storecode: this.storeCode,
          startDate: this.start_Date,
          endDate: this.end_Date
        });
        break;
      case "operaSingle":
        this.$store.dispatch("report/getStoreList", {
          storecode: this.storeCode
        });
        this.$store.dispatch("report/getOperaDealPrice", {
          storecode: this.storeCode,
          startDate: this.startDate,
          endDate: this.endDate
        });
        break;
      case "salesTotal":
        this.$store.dispatch("report/getStoreList", {
          storecode: this.storeCode
        });
        this.$store.dispatch("report/getSaleTotal", {
          storecode: this.storeCode,
          startDate: this.startDate,
          endDate: this.endDate
        });
        break;
      case "salesDim":
        this.$store.dispatch("report/getStoreList", {
          storecode: this.storeCode
        });
        this.$store.dispatch("report/getSaleDimension", {
          storecode: this.storeCode,
          startDate: this.startDate,
          endDate: this.endDate
        });
        break;
      case "memberGeo":
        this.$store.dispatch("report/getStoreList", {
          storecode: this.storeCode
        });
        this.$store.dispatch("report/getMemberGeo", {
          storecode: this.storeCode
        });
        break;
      case "expense":
        this.$store.dispatch("report/getAxis", {
          storecode: this.storeCode
        });
        this.$store.dispatch("report/getSingleMoneyAll", {
          storecode: this.storeCode
        });
        this.$store.dispatch("report/getExTimeAll", {
          storecode: this.storeCode
        });
        break;
      case "transform":
        this.$store.dispatch("report/getTransfrom", {
          storecode: this.storeCode
        });
        // console.log('hello world')
        break;
      default:
        break;
    }
  },
  computed: {
    // 门店列表
    storeList() {
      let option = {
        data: []
      };
      let datas = this.$store.state.report.datasource.storeList;
      datas.forEach(e => {
        option.data.push({
          value: e["store_outlet_id"],
          label: e["store_outlet_name"]
        });
      });
      return option;
    },
    //导购列表
    guideList() {
      let option = {
        data: []
      };
      let datas = this.$store.state.report.datasource.guideList;
      datas.forEach(e => {
        option.data.push({ value: e["id"], label: e["name"] });
      });
      return option;
    },
    // 本月会员消费等级人数分布占比(饼图)
    currentMonthSeries() {
      let option = {
        data: [],
        finish: [],
        name: [],
        outlet: [],
        total: null,
        com: null,
        sel: []
      };
      let datas = this.$store.state.report.datasource.currentMonthChart;
      // datas.length = 10;
      datas.forEach(e => {
        option.data.push(e["target"]);
        option.finish.push(e["amount"]);
        option.name.push(e["store_outlet_name"]);
        option.outlet.push(e["store_outlet_id"]);
        option.total += e["target"];
        option.com += e["amount"];
        option.sel.push({
          value: e["store_outlet_id"],
          label: e["store_outlet_name"]
        });
      });
      return option;
    },
    guideSaleSeries() {
      let option = {
        data: [],
        finish: [],
        name: [],
        total: null,
        com: null,
        sel: []
      };
      let datas = this.$store.state.report.datasource.saleGuideSeries;
      datas.forEach(e => {
        if (e["amount"]) {
          option.data.push(e["target"]);
          e["amount"] ? option.finish.push(e["amount"]) : option.finish.push(0);
          option.name.push(e["store_user_name"]);
          option.total += e["target"];
          e["amount"] ? (option.com += e["amount"]) : (option.com += 0);
          option.sel.push({
            value: e["store_user_id"],
            label: e["store_user_name"]
          });
        }
      });
      return option;
    },
    currentMonthNewDetail() {
      let option = {
        data: [],
        finish: [],
        name: [],
        outlet: [],
        total: null,
        com: null,
        sel: []
      };
      let datas = this.$store.state.report.datasource.monthNewDetail;
      datas.forEach(e => {
        option.data.push(e["target"]);
        option.finish.push(e["newmember_opencard_amount"]);
        option.name.push(e["store_outlet_name"]);
        option.outlet.push(e["store_outlet_id"]);
        option.total += e["target"];
        option.com += e["newmember_opencard_amount"];
        option.sel.push({
          value: e["store_outlet_id"],
          label: e["store_outlet_name"]
        });
      });
      // console.log(option)
      return option;
    },
    guideNewSeries() {
      let option = {
        data: [],
        finish: [],
        name: [],
        total: null,
        com: null,
        sel: []
      };
      let datas = this.$store.state.report.datasource.guideSeries;
      datas.forEach(e => {
        option.data.push(e["target"]);
        option.finish.push(e["newmember_opencard_amount"]);
        option.name.push(e["store_user_name"]);
        option.total += e["target"];
        option.com += e["newmember_opencard_amount"];
        option.sel.push({
          value: e["store_user_id"],
          label: e["store_user_name"]
        });
      });
      // console.log(datas);
      return option;
    },
    saleTotalSeries() {
      let option = {
        data: [],
        name: [],
        outlet: [],
        total: null
      };
      let datas = this.$store.state.report.datasource.saleTotal;
      datas.forEach(e => {
        option.data.push(e["member_trade_amount"].toFixed(2));
        option.name.push(e["store_outlet_name"]);
        option.outlet.push(e["store_outlet_id"]);
        option.total += e["member_trade_amount"];
      });
      return option;
    },
    saleTotalDimSeries() {
      let option = {
        data: [],
        name: [],
        outlet: []
      };
      let datas = this.$store.state.report.datasource.saleTotalDim;
      datas.forEach(e => {
        option.data.push(e["member_trade_amount"].toFixed(2));
        option.name.push(e["store_outlet_name"]);
        option.outlet.push(e["store_outlet_id"]);
      });
      return option;
    },
    saleDimensionSeries() {
      let option = {
        data: [],
        name: [],
        brandId: [],
        sel: [],
        total: null,
        avg: null
      };
      let datas = this.$store.state.report.datasource.saleDimension;
      datas.forEach(e => {
        if (e["brand_offline_name"] == "不定") {
          return;
        } else {
          option.data.push(e["member_trade_amount"].toFixed(2));
          option.name.push(e["brand_offline_name"]);
          option.brandId.push(e["brand_offline_id"]);
          option.sel.push({
            value: e["brand_offline_name"],
            id: e["brand_offline_id"]
          });
        }
        option.total += e["member_trade_amount"];
      });
      option.avg = (option.total / option.data.length).toFixed(2);
      return option;
    },
    saleDimCompare() {
      let option = {
        data: [],
        name: [],
        brandId: [],
        sel: [],
        total: null,
        avg: null
      };
      let datas = this.$store.state.report.datasource.saleDimCompare;
      datas.forEach(e => {
        if (e["brand_offline_name"] == "不定") {
          return;
        } else {
          option.data.push(e["member_trade_amount"].toFixed(2));
          option.name.push(e["brand_offline_name"]);
          option.brandId.push(e["brand_offline_id"]);
          option.sel.push({
            value: e["brand_offline_name"],
            id: e["brand_offline_id"]
          });
        }
        option.total += e["member_trade_amount"];
      });
      option.avg = (option.total / option.data.length).toFixed(2);
      return option;
    },
    //多维度门店销售数据
    saleDimStore() {
      let option = {
        data: [],
        name: [],
        brandId: [],
        sel: [],
        total: null,
        avg: null
      };
      let datas = this.$store.state.report.datasource.saleDimStore;
      datas.forEach(e => {
        if (e["brand_offline_name"] == "不定") {
          return;
        } else {
          option.data.push(e["member_trade_amount"].toFixed(2));
          option.name.push(e["brand_offline_name"]);
          option.brandId.push(e["brand_offline_id"]);
          option.sel.push({
            value: e["brand_offline_name"],
            id: e["brand_offline_id"]
          });
        }
        option.total += e["member_trade_amount"];
      });
      option.avg = (option.total / option.data.length).toFixed(2);
      return option;
    },
    //多维度导购销售数据
    saleDimGuide() {
      let option = {
        data: [],
        name: [],
        brandId: [],
        total: null,
        avg: null
      };
      let datas = this.$store.state.report.datasource.saleDimGuide;
      datas.forEach(e => {
        if (e["brand_offline_name"] == "不定") {
          return;
        } else {
          option.data.push(e["member_trade_amount"]).toFixed(2);
          option.name.push(e["brand_offline_name"]);
        }
        option.total += e["member_trade_amount"];
      });
      option.avg = (option.total / option.data.length).toFixed(2);
      return option;
    },
    saleOrderPrice() {
      let option = {
        avg: [],
        outlet: [],
        name: [],
        total: null,
        mean: null
      };
      let datas = this.$store.state.report.datasource.saleOrder;
      datas.forEach(e => {
        option.avg.push(e["avg_amount"].toFixed(2));
        option.outlet.push(e["store_outlet_id"]);
        option.name.push(e["store_outlet_name"]);
        option.total += e["avg_amount"];
      });
      option.mean = (option.total / option.avg.length).toFixed(2);
      return option;
    },
    saleOrderPriceDim() {
      let option = {
        avg: [],
        outlet: [],
        name: [],
        total: null,
        mean: null
      };
      let datas = this.$store.state.report.datasource.saleOrderDim;
      datas.forEach(e => {
        option.avg.push(e["avg_amount"].toFixed(2));
        option.outlet.push(e["store_outlet_id"]);
        option.name.push(e["store_outlet_name"]);
        option.total += e["avg_amount"];
      });
      option.mean = (option.total / option.avg.length).toFixed(2);
      return option;
    },
    slaeOrderTimes() {
      let option = {
        avg: [],
        outlet: [],
        name: [],
        times: null
      };
      let datas = this.$store.state.report.datasource.saleTimes;
      let totalTimes = null;
      datas.forEach(e => {
        option.avg.push(e["avg_amount"].toFixed(1));
        option.outlet.push(e["store_outlet_id"]);
        option.name.push(e["store_outlet_name"]);
        totalTimes += e["avg_amount"];
      });
      option.times = (totalTimes / option.avg.length).toFixed(1);
      return option;
    },
    saleOrderTimeDim() {
      let option = {
        avg: [],
        outlet: [],
        name: [],
        times: null
      };
      let datas = this.$store.state.report.datasource.saleTimeDim;
      let totalTimes = null;
      datas.forEach(e => {
        option.avg.push(e["avg_amount"].toFixed(1));
        option.outlet.push(e["store_outlet_id"]);
        option.name.push(e["store_outlet_name"]);
        totalTimes += e["avg_amount"];
      });
      // console.log(datas);
      option.times = (totalTimes / option.avg.length).toFixed(1);
      return option;
    },
    operaMainSeries() {
      let option = {
        scan: [],
        reg: [],
        bind: [],
        name: [],
        sel: [],
        totalScan: null,
        totalReg: null,
        totalBind: null
      };
      let datas = this.$store.state.report.datasource.operaMain;
      datas.forEach(e => {
        option.scan.push(e["sum(scanqr_amount)"]);
        option.reg.push(e["sum(reg_amount)"]);
        option.bind.push(e["sum(bind_amount)"]);
        option.name.push(e["store_outlet_name"]);
        option.sel.push({
          value: e["store_outlet_id"],
          label: e["store_outlet_name"]
        });
        option.totalScan += e["sum(scanqr_amount)"];
        option.totalReg += e["sum(reg_amount)"];
        option.totalBind += e["sum(bind_amount)"];
      });
      return option;
    },
    operaGuideSeries() {
      let option = {
        name: [],
        scan: [],
        reg: [],
        bind: [],
        sel: []
      };
      let datas = this.$store.state.report.datasource.operaGuide;
      datas.forEach(e => {
        option.scan.push(e["sum(scanqr_amount)"]);
        option.reg.push(e["sum(reg_amount)"]);
        option.bind.push(e["sum(bind_amount)"]);
        option.name.push(e["store_user_name"]);
        option.sel.push({
          value: e["store_user_id"],
          label: e["store_user_name"]
        });
      });
      // console.log(datas);
      return option;
    },
    operaGuideCurrentMonth() {
      let option = {
        name: [],
        scan: [],
        reg: [],
        bind: []
      };
      let datas = this.$store.state.report.datasource.guideDetail;
      datas.forEach(e => {
        let month = e["stat_day"];
        option.scan.push(e["scanqr_amount"]);
        option.reg.push(e["reg_amount"]);
        option.bind.push(e["bind_amount"]);
        option.name.push(
          month.substring(4, 6) + "月" + month.substring(6) + "日"
        );
      });
      // console.log(option);
      return option;
    },
    operDealNumSeries() {
      let option = {
        data: [],
        name: [],
        type: [],
        outletId: [],
        zero: null,
        one: null,
        two: null,
        three: null,
        avgzero: null,
        avgone: null,
        avgtwo: null,
        avgthree: null
      };
      let datas = this.$store.state.report.datasource.operaDealNum;
      datas.forEach(e => {
        if (e["back_type"] == 7) {
          option.type.push("0-7天");
          option.zero += e["count(*)"];
          option.data.push(e["count(*)"]);
        }
        option.name.push(e["name"]);
        option.outletId.push(e["store_outlet_id"]);
      });
      option.avgzero = (option.zero / option.data.length).toFixed(2);
      return option;
    },
    operDealTimesSeries() {
      let option = {
        name: [],
        zero: [],
        one: [],
        two: [],
        three: [],
        four: [],
        five: []
      };
      let buy = [];
      let no = [];
      let xAxis = [];
      let data = [];
      let accum = [];
      let accumData = [];
      let acount = [];
      let orderid = [];
      let datas = this.$store.state.report.datasource.operaDealTimes;
      // for (let i in datas[0]) {
      //   if (!option.name.includes(datas[0][i].name)) {
      //     option.name.push(datas[0][i].name);
      //   }
      // }
      for (let i in datas[1]) {
        for (let j in datas[0]) {
          if (
            datas[1][i].member_offline_id == datas[0][j].mb_offline_id &&
            new Date(datas[0][j].contact_time) < new Date(datas[1][i].add_time)
          ) {
            buy.push({
              memberid: datas[0][j].mb_offline_id,
              name: datas[0][j].name,
              store_outlet_id: datas[0][j].store_outlet_id,
              store_user_id: datas[0][j].store_user_id,
              name: datas[1][i].belong_store_outlet_name,
              userid: datas[1][i].belong_store_user_id,
              memberid: datas[1][i].member_offline_id,
              orderid: datas[1][i].order_id,
              name: datas[1][i].belong_store_outlet_name,
              guide: datas[1][i].belong_store_user_id,
              user: datas[1][i].member_offline_id
            });
            orderid.push(datas[1][i].order_id);
          }
        }
      }
      for (let i in datas[1]) {
        if (!orderid.includes(datas[1][i].order_id)) {
          no.push({
            name: datas[1][i].belong_store_outlet_name,
            guide: datas[1][i].belong_store_user_id,
            user: datas[1][i].member_offline_id,
            addtime: datas[1][i].add_time,
            guide: datas[1][i].store_outlet_id,
            user: datas[1][i].member_offline_id
          });
        }
      }
      no.forEach(e => {
        if (e.name) {
          if (!xAxis.includes(e.name)) {
            xAxis.push(e.name);
          }
        }
      });
      for (let i = 0; i < xAxis.length; i++) {
        data.push(0);
        option.one.push(0);
        option.two.push(0);
        option.three.push(0);
        option.four.push(0);
        option.five.push(0);
        acount.push(0);
      }
      no.forEach((e, i) => {
        if (e.name) {
          if (xAxis.includes(e.name)) {
            let index = this.findIndex(e.name, xAxis);
            // console.log(index);
            data[index] += 1;
          }
        }
      });
      buy.forEach(e => {
        if (e.name) {
          accum.push({
            name: e.name,
            memberid: e.memberid,
            userid: e.userid
          });
        }
      });
      accum.forEach((e, i) => {
        accumData.forEach((item, index) => {
          if (e.memberid == item.memberid && e.userid == item.userid) {
            acount[index]++;
          }
        });
      });
      option.name = xAxis;
      option.zero = data;
      // console.log(accum,acount,accumData);
      return option;
    },
    operaDealPriceSeries() {
      let option = {
        oneData: {
          series: [],
          total: null,
          avg: null
        },
        twoData: {
          series: [],
          total: null,
          avg: null
        },
        threeData: {
          series: [],
          total: null,
          avg: null
        },
        fiveData: {
          series: [],
          total: null,
          avg: null
        },
        tenData: {
          series: [],
          total: null,
          avg: null
        },
        thousandData: {
          series: [],
          total: null,
          avg: null
        },
        name: []
      };
      let datas = this.$store.state.report.datasource.operaDealPrice;
      datas.forEach(e => {
        if (!option.name.includes(e["belong_store_outlet_name"])) {
          option.name.push(e["belong_store_outlet_name"]);
        }
        let level = e["member_trade_amount_level"] + "";
        switch (level) {
          case "100":
            option.oneData.series.push(e["total"]);
            option.oneData.total += e["total"];
            break;
          case "200":
            option.twoData.series.push(e["total"]);
            option.twoData.total += e["total"];
            break;
          case "300":
            option.threeData.series.push(e["total"]);
            option.threeData.total += e["total"];
            break;
          case "500":
            option.fiveData.series.push(e["total"]);
            option.fiveData.total += e["total"];
            break;
          case "1000":
            option.tenData.series.push(e["total"]);
            option.tenData.total += e["total"];
            break;
          case "1000+":
            option.thousandData.series.push(e["total"]);
            option.thousandData.total += e["total"];
            break;
        }
      });
      option.oneData.avg = (option.oneData.total / option.name.length).toFixed(
        2
      );
      option.twoData.avg = (option.twoData.total / option.name.length).toFixed(
        2
      );
      option.threeData.avg = (option.threeData.total / option.name.length
      ).toFixed(2);
      option.fiveData.avg = (option.fiveData.total / option.name.length
      ).toFixed(2);
      option.tenData.avg = (option.tenData.total / option.name.length).toFixed(
        2
      );
      option.thousandData.avg = (option.thousandData.total / option.name.length
      ).toFixed(2);
      return option;
    },
    memberGeoSeries() {
      let option = {
        data: []
      };
      let datas = this.$store.state.report.datasource.memberGeo;
      datas.forEach(e => {
        option.data.push([e["baidu_lng"], e["baidu_lat"], e["elevation"]]);
      });
      return option;
    },
    currentMonthMemberLevel() {
      const months = this.currentMonthDate.split("/");
      const levels = [
        {
          type: "pie",
          name: "会员消费等级人数分布占比",
          data: []
        }
      ];
      let datas = this.$store.state.report.datasource.currentMonthMemberLevel;
      datas.forEach(data => {
        switch (data.hemiao_Level) {
          case "level0":
            levels[0].data.push(["低于0元", data.hemiao_count]);
            break;
          case "level1":
            levels[0].data.push(["0-1000元", data.hemiao_count]);
            break;
          case "level2":
            levels[0].data.push(["1000-2000元", data.hemiao_count]);
            break;
          case "level3":
            levels[0].data.push(["2000-3000元", data.hemiao_count]);
            break;
          case "level4":
            levels[0].data.push(["3000-5000元", data.hemiao_count]);
            break;
          case "level5":
            levels[0].data.push(["5000-8000元", data.hemiao_count]);
            break;
          case "level6":
            levels[0].data.push(["8000-12000元", data.hemiao_count]);
            break;
          case "level7":
            levels[0].data.push(["12000元以上", data.hemiao_count]);
            break;
        }
      });
      // console.log(levels);
      return levels;
    },
    // 本月会员消费等级人数分布占比(饼图)(按照单店来统计)
    currentMonthMemberLevelByOutlet() {
      const levels = [
        {
          type: "pie",
          name: "会员消费等级人数分布占比",
          data: []
        }
      ];
      this.$store.state.report.datasource.currentMonthMemberLevelByOutlet.forEach(
        (level, idx) => {
          levels[0].data.push([level.hemiao_Level, level.hemiao_count]);
        }
      );
      return levels;
    },
    // 本年和去年的月度会员人数的统计
    currentAndLastYearNewMemberCounts() {
      const years = this.currentYearDate.split("/");
      const newMembersByYearSeries = [
        {
          type: "bar",
          name: years[0],
          data: []
        },
        {
          type: "bar",
          name: years[1],
          data: []
        }
      ];
      this.$store.state.report.datasource.newMembersByYear.current.forEach(
        amount => {
          newMembersByYearSeries[1].data.push(amount.hemiao_count);
        }
      );
      this.$store.state.report.datasource.newMembersByYear.past.forEach(
        amount => {
          newMembersByYearSeries[0].data.push(amount.hemiao_count);
        }
      );
      return newMembersByYearSeries;
    },
    // 本年和去年的月度会员人数的统计
    currentAndLastYearNewMemberCountsByOutlet() {
      const years = this.currentYearDate.split("/");
      const newMembersByYearSeries = [
        {
          type: "column",
          name: years[0],
          data: []
        },
        {
          type: "column",
          name: years[1],
          data: []
        }
      ];
      this.$store.state.report.datasource.newMembersByYearAndOutlet.current.forEach(
        amount => {
          newMembersByYearSeries[1].data.push(amount.hemiao_count);
        }
      );
      this.$store.state.report.datasource.newMembersByYearAndOutlet.past.forEach(
        amount => {
          newMembersByYearSeries[0].data.push(amount.hemiao_count);
        }
      );
      return newMembersByYearSeries;
    },
    // 本月消费会员和所有会员的统计
    newAndOldMembersCurrentMonths() {
      const months = this.currentMonthDate.split("/");
      const series = [
        {
          type: "spline",
          name: months[0],
          data: []
        },
        {
          type: "spline",
          name: months[1],
          data: []
        }
      ];
      this.$store.state.report.datasource.newAndOldMembers.old.forEach(
        members => {
          series[1].data.push(members.hemiao_count);
          series[1].name = "总会员(人数)";
        }
      );
      this.$store.state.report.datasource.newAndOldMembers.new.forEach(
        members => {
          series[0].data.push(members.hemiao_count);
          series[0].name = "新消费会员(人数)";
        }
      );
      return series;
    },
    // 指定商城本月消费会员和所有会员的统计
    newAndOldMembersCurrentMonthsByOutlet() {
      const months = this.currentMonthDate.split("/");
      const series = [
        {
          type: "spline",
          name: months[0],
          data: []
        },
        {
          type: "spline",
          name: months[1],
          data: []
        }
      ];
      this.$store.state.report.datasource.newAndOldMembersByOutlet.old.forEach(
        members => {
          series[1].data.push(members.hemiao_count);
          series[1].name = "总会员(人数)";
        }
      );
      this.$store.state.report.datasource.newAndOldMembersByOutlet.new.forEach(
        members => {
          series[0].data.push(members.hemiao_count);
          series[0].name = "新消费会员(人数)";
        }
      );
      return series;
    },
    // 门店所有商城的销售数据
    currentAndLastMonthSale() {
      const months = this.currentMonthDate.split("/");
      const currentAndLastMonthSaleAmountSeries = [
        {
          type: "column",
          name: months[0],
          data: []
        },
        {
          type: "column",
          name: months[1],
          data: []
        }
      ];

      //this.$store.state.report.datasource.currentAndLastMonthSaleAmount中数据都在past中，current中没有数据，解决办法暂未定
      this.$store.state.report.datasource.currentAndLastMonthSaleAmount.past.forEach(
        amount => {
          if (amount.hemiao_month == new Date().getMonth() + 1) {
            currentAndLastMonthSaleAmountSeries[1].data.push(amount.day_price);
          } else {
            currentAndLastMonthSaleAmountSeries[0].data.push(amount.day_price);
          }
          // console.log(this.$store.state.report.datasource.currentAndLastMonthSaleAmount);
        }
      );
      // this.$store.state.report.datasource.currentAndLastMonthSaleAmount.past.forEach((amount) => {
      // })
      return currentAndLastMonthSaleAmountSeries;
    },
    // 门店所有商城的销售数据(年份)
    currentAndLastYearSale() {
      const years = this.currentYearDate.split("/");
      const currentAndLastYearSaleAmountSeries = [
        {
          type: "column",
          name: years[0],
          data: []
        },
        {
          type: "column",
          name: years[1],
          data: []
        }
      ];
      this.$store.state.report.datasource.currentAndLastYearSaleAmount.current.forEach(
        amount => {
          currentAndLastYearSaleAmountSeries[1].data.push(amount.hemiao_amount);
        }
      );
      this.$store.state.report.datasource.currentAndLastYearSaleAmount.past.forEach(
        amount => {
          currentAndLastYearSaleAmountSeries[0].data.push(amount.hemiao_amount);
        }
      );
      return currentAndLastYearSaleAmountSeries;
    },
    // 指定商城的销售数据(年份)
    currentAndLastYearOutletSale() {
      const years = this.currentYearDate.split("/");
      const currentAndLastYearSaleAmountSeries = [
        {
          type: "column",
          name: years[0],
          data: []
        },
        {
          type: "column",
          name: years[1],
          data: []
        }
      ];
      this.$store.state.report.datasource.currentAndLastYearSaleAmountByOutlet.current.forEach(
        amount => {
          currentAndLastYearSaleAmountSeries[1].data.push(amount.hemiao_amount);
        }
      );
      this.$store.state.report.datasource.currentAndLastYearSaleAmountByOutlet.past.forEach(
        amount => {
          currentAndLastYearSaleAmountSeries[0].data.push(amount.hemiao_amount);
        }
      );
      return currentAndLastYearSaleAmountSeries;
    },
    // 指定商城的本月和上月的销售对比
    currentAndLastMonthOutletSale() {
      const months = this.currentMonthDate.split("/");
      const currentAndLastMonthSaleAmountSeries = [
        {
          type: "column",
          name: months[0],
          data: []
        },
        {
          type: "column",
          name: months[1],
          data: []
        }
      ];
      this.$store.state.report.datasource.currentAndLastMonthSaleAmountByOutlet.current.forEach(
        amount => {
          currentAndLastMonthSaleAmountSeries[1].data.push(
            amount.hemiao_amount
          );
        }
      );
      this.$store.state.report.datasource.currentAndLastMonthSaleAmountByOutlet.past.forEach(
        amount => {
          currentAndLastMonthSaleAmountSeries[0].data.push(
            amount.hemiao_amount
          );
        }
      );
      return currentAndLastMonthSaleAmountSeries;
    },
    // top20 品牌排行
    top20BrandSeries() {
      const top20Brands = [
        {
          name: "本月销售额",
          data: [],
          dataLabels: {
            enabled: true,
            rotation: 0,
            color: "#fff",
            align: "right",
            formatter: function() {
              return `${currencyFormatter.format(this.y, {
                locale: "zh-CN"
              })}元`;
            },
            y: 1,
            x: 0,
            style: {
              textOutline: "1px 1px #aaa",
              fontSize: "10px",
              fontFamily:
                '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
            }
          }
        },
        {
          name: "上月销售额",
          data: [],
          dataLabels: {
            enabled: true,
            rotation: 0,
            color: "#fff",
            align: "right",
            formatter: function() {
              return `${currencyFormatter.format(this.y, {
                locale: "zh-CN"
              })}元`;
            },
            y: 5,
            x: 0,
            style: {
              textOutline: "1px 1px #aaa",
              fontSize: "10px",
              fontFamily:
                '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
            }
          }
        }
      ];

      //此处top20BrandsSale的所有数据都在past中，current中并没有数据，原因未知，暂用此方法解决，如后续不合规范再修改
      this.$store.state.report.datasource.top20BrandsSale.past.forEach(
        (brand, idx) => {
          // console.log(this.$store.state.report.datasource.top20BrandsSale);
          // 只取前10名, 考虑到图标的空间限制
          if (idx < 10) {
            top20Brands[0].data.push([brand.offline_name, brand.hemiao_amount]);
          }
          if (idx > 9) {
            top20Brands[1].data.push([brand.offline_name, brand.hemiao_amount]);
          }
        }
      );
      // this.$store.state.report.datasource.top20BrandsSale.past.forEach((brand, idx) => {
      //   // 只取前10名, 考虑到图标的空间限制

      // })
      // console.log(top20Brands);
      return top20Brands;
    },
    // top20 品牌排行 (指定门店)
    top20BrandSeriesByOutlet() {
      const top20Brands = [
        {
          name: "销售额",
          data: [],
          dataLabels: {
            enabled: true,
            rotation: 0,
            color: "#FFFFFF",
            align: "right",
            formatter: function() {
              return `${currencyFormatter.format(this.y, {
                locale: "zh-CN"
              })}元`;
            },
            y: 0,
            x: 0,
            style: {
              textOutline: "1px 1px #aaa",
              fontSize: "12px",
              fontFamily:
                '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
            }
          }
        }
      ];
      this.$store.state.report.datasource.top20BrandsSaleByOutlet.forEach(
        (brand, idx) => {
          // 只取前10名, 考虑到图标的空间限制
          if (idx < 10) {
            top20Brands[0].data.push([brand.offline_name, brand.hemiao_amount]);
          }
        }
      );
      return top20Brands;
    },
    // top20 门店排行
    top20OutletSeries() {
      const top20Outlet = [
        {
          name: "销售额",
          data: [],
          dataLabels: {
            enabled: true,
            rotation: 0,
            color: "#FFFFFF",
            align: "right",
            formatter: function() {
              return `${currencyFormatter.format(this.y, {
                locale: "zh-CN"
              })}元`;
            },
            y: 0,
            x: 0,
            style: {
              textOutline: "1px 1px #aaa",
              fontSize: "10px",
              fontFamily:
                '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
            }
          }
        }
      ];
      this.$store.state.report.datasource.top20OutletSale.forEach(
        (outlet, idx) => {
          // 只取前10名, 考虑到图标的空间限制
          if (idx < 10) {
            top20Outlet[0].data.push([
              outlet.store_outlet,
              outlet.hemiao_amount
            ]);
          }
        }
      );
      return top20Outlet;
    },
    // 指定人员的本月/上月销售金额趋势图
    currentAndLastMonthEmpSale() {
      const months = this.currentMonthDate.split("/");
      const currentAndLastMonthSaleAmountSeries = [
        {
          type: "column",
          name: months[0],
          data: []
        },
        {
          type: "column",
          name: months[1],
          data: []
        }
      ];
      this.$store.state.report.datasource.currentAndLastMonthSaleAmountByEmp.current.forEach(
        amount => {
          currentAndLastMonthSaleAmountSeries[1].data.push(
            amount.hemiao_amount
          );
        }
      );
      this.$store.state.report.datasource.currentAndLastMonthSaleAmountByEmp.past.forEach(
        amount => {
          currentAndLastMonthSaleAmountSeries[0].data.push(
            amount.hemiao_amount
          );
        }
      );
      return currentAndLastMonthSaleAmountSeries;
    },
    // 指定人员的本年和去年的月度会员人数的统计
    currentAndLastYearNewMemberCountsByEmp() {
      const years = this.currentYearDate.split("/");
      const newMembersByYearSeries = [
        {
          type: "column",
          name: years[0],
          data: []
        },
        {
          type: "column",
          name: years[1],
          data: []
        }
      ];
      this.$store.state.report.datasource.newMembersByYearAndEmp.current.forEach(
        amount => {
          newMembersByYearSeries[1].data.push(amount.hemiao_count);
        }
      );
      this.$store.state.report.datasource.newMembersByYearAndEmp.past.forEach(
        amount => {
          newMembersByYearSeries[0].data.push(amount.hemiao_count);
        }
      );
      return newMembersByYearSeries;
    },
    // 导购 本月销售任务进度
    currentAndLastMonthSaleTaskProcessByEmp() {
      const years = this.currentYearDate.split("/");
      const currentAndLastMonthSaleTaskProcessSeries = [
        {
          type: "column",
          name: years[0],
          data: []
        },
        {
          type: "column",
          name: years[1],
          data: []
        }
      ];
      this.$store.state.report.datasource.currentAndLastMonthSaleTaskProcessByEmp.current.forEach(
        amount => {
          currentAndLastMonthSaleTaskProcessSeries[1].data.push(
            amount.hemiao_amount
          );
        }
      );
      this.$store.state.report.datasource.currentAndLastMonthSaleTaskProcessByEmp.past.forEach(
        amount => {
          currentAndLastMonthSaleTaskProcessSeries[0].data.push(
            amount.hemiao_amount
          );
        }
      );
      return currentAndLastMonthSaleTaskProcessSeries;
    },
    // 导购 本月消费会员/总会员趋势
    newAndOldMembersCurrentMonthsByEmp() {
      const months = this.currentMonthDate.split("/");
      const series = [
        {
          type: "spline",
          name: months[0],
          data: []
        },
        {
          type: "spline",
          name: months[1],
          data: []
        }
      ];
      this.$store.state.report.datasource.newAndOldMembersByEmp.old.forEach(
        members => {
          series[1].data.push(members.hemiao_count);
          series[1].name = "总会员(人数)";
        }
      );
      this.$store.state.report.datasource.newAndOldMembersByEmp.new.forEach(
        members => {
          series[0].data.push(members.hemiao_count);
          series[0].name = "新消费会员(人数)";
        }
      );
      return series;
    },
    // 本月会员消费等级人数分布占比(饼图)
    currentMonthMemberLevelByEmp() {
      const levels = [
        {
          type: "pie",
          name: "会员消费等级人数分布占比",
          data: []
        }
      ];
      this.$store.state.report.datasource.currentMonthMemberLevelByEmp.forEach(
        (level, idx) => {
          levels[0].data.push([level.hemiao_Level, level.hemiao_count]);
        }
      );
      return levels;
    },
    // top20 品牌排行 (指定店员)
    top20BrandSeriesByEmp() {
      const top20Brands = [
        {
          name: "销售额",
          data: [],
          dataLabels: {
            enabled: true,
            rotation: 0,
            color: "#FFFFFF",
            align: "right",
            formatter: function() {
              return `${currencyFormatter.format(this.y, {
                locale: "zh-CN"
              })}元`;
            },
            y: 0,
            x: 0,
            style: {
              textOutline: "1px 1px #aaa",
              fontSize: "12px",
              fontFamily:
                '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
            }
          }
        }
      ];
      this.$store.state.report.datasource.top20BrandsSaleByEmp.forEach(
        (brand, idx) => {
          // 只取前10名, 考虑到图表的空间限制
          if (idx < 10) {
            top20Brands[0].data.push([brand.offline_name, brand.hemiao_amount]);
          }
        }
      );
      return top20Brands;
    },
    // top20 品牌排行 (指定店员)
    top20GoodsSeriesByEmp() {
      const top20Brands = [
        {
          name: "销售额",
          data: [],
          dataLabels: {
            enabled: true,
            rotation: 0,
            color: "#FFFFFF",
            align: "right",
            formatter: function() {
              return `${currencyFormatter.format(this.y, {
                locale: "zh-CN"
              })}元`;
            },
            y: 0,
            x: 0,
            style: {
              textOutline: "1px 1px #aaa",
              fontSize: "12px",
              fontFamily:
                '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
            }
          }
        }
      ];
      this.$store.state.report.datasource.top20GoodsSaleByEmp.forEach(
        (brand, idx) => {
          // 只取前10名, 考虑到图表的空间限制
          if (idx < 10) {
            top20Brands[0].data.push([brand.goods_name, brand.hemiao_amount]);
          }
        }
      );
      return top20Brands;
    },
    //会员特征
    bySex() {
      const distribut = [
        {
          type: "pie",
          name: "性别分布",
          data: []
        }
      ];
      let data = this.$store.state.report.datasource.memberFeatureBySex;
      // console.log(data);
      data.forEach(dis => {
        if (dis.member_feature === "F0101") {
          distribut[0].data.push(["男", dis.hemiao_count]);
        }
        if (dis.member_feature === "F0102") {
          distribut[0].data.push(["女", dis.hemiao_count]);
        }
        if (dis.member_feature === "F0103") {
          distribut[0].data.push(["保密", dis.hemiao_count]);
        }
        // distribut[0].data.push([dis.member_feature, dis.hemiao_count])
      });
      // console.log(distribut);
      // console.log(this.$route)
      return distribut;
    },
    //年龄分布
    byAge() {
      const age = [
        {
          type: "pie",
          name: "年龄分布图",
          data: []
        }
      ];

      let data = this.$store.state.report.datasource.memberFeatureByAge;
      data.forEach(e => {
        switch (e.member_feature) {
          case "F0201":
            age[0].data.push(["0-6个月", e.hemiao_count]);
            break;
          case "F0202":
            age[0].data.push(["6-12个月", e.hemiao_count]);
            break;
          case "F0203":
            age[0].data.push(["1-2岁", e.hemiao_count]);
            break;
          case "F0204":
            age[0].data.push(["2-3岁", e.hemiao_count]);
            break;
          case "F0205":
            age[0].data.push(["3-4岁", e.hemiao_count]);
            break;
          case "F0206":
            age[0].data.push(["4-5岁", e.hemiao_count]);
            break;
          case "F0207":
            age[0].data.push(["5-6岁", e.hemiao_count]);
            break;
          case "F0208":
            age[0].data.push(["6岁以上", e.hemiao_count]);
            break;
          // default:
        }
      });
      return age;
    },
    // 消费能力
    byMoney() {
      const money = [
        {
          type: "pie",
          name: "会员消费水平",
          data: []
        }
      ];

      let data = this.$store.state.report.datasource.memberFeatureByMoney;
      data.forEach(e => {
        switch (e.member_feature) {
          case "F0301":
            money[0].data.push(["低消费客户", e.hemiao_count]);
            break;
          case "F0302":
            money[0].data.push(["中消费客户", e.hemiao_count]);
            break;
          case "F0303":
            money[0].data.push(["高消费客户", e.hemiao_count]);
            break;
        }
      });
      return money;
    },
    // 会员活跃度
    byActive() {
      const active = [
        {
          type: "pie",
          name: "会员活跃度",
          data: []
        }
      ];

      let data = this.$store.state.report.datasource.memberFeatureByActive;
      data.forEach(e => {
        switch (e.member_feature) {
          case "F0501":
            active[0].data.push(["活跃客户", e.hemiao_count]);
            break;
          case "F0502":
            active[0].data.push(["冷冻客户", e.hemiao_count]);
            break;
        }
      });
      return active;
    },
    // 怀孕时间
    byTime() {
      const time = [
        {
          type: "pie",
          name: "怀孕时间",
          data: []
        }
      ];

      let data = this.$store.state.report.datasource.memberFeatureByTime;
      data.forEach(e => {
        switch (e.member_feature) {
          case "F0401":
            time[0].data.push(["孕初期", e.hemiao_count]);
            break;
          case "F0402":
            time[0].data.push(["孕中期", e.hemiao_count]);
            break;
          case "F0403":
            time[0].data.push(["孕晚期", e.hemiao_count]);
            break;
        }
      });
      return time;
    },
    //会员复购人数
    reBuyCountSeries() {
      const count = [
        {
          type: "column",
          name: "复购人数",
          data: [],
          dataLabels: {
            enabled: true,
            rotation: 0,
            color: "#FFFFFF",
            align: "right",
            // formatter: function () {
            //   return `${currencyFormatter.format(this.y, { locale: 'zh-CN' })}`
            // },
            y: 0,
            x: 0,
            style: {
              textOutline: "1px 1px #aaa",
              fontSize: "10px",
              fontFamily:
                '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
            }
          }
        }
      ];
      let datas = this.$store.state.report.datasource.memberReBuy;
      datas.forEach(data => {
        count[0].data.push(data.hemiao_count);
      });
      return count;
    },
    //会员复购率
    reBuyHzSeries() {
      const hz = [
        {
          type: "column",
          name: "复购率",
          data: [],
          dataLabels: {
            enabled: true,
            rotation: 0,
            color: "#FFFFFF",
            align: "right",
            formatter: function() {
              return `${Number(this.y).toFixed(2) + "%"}`;
            },
            y: 0,
            x: 0,
            style: {
              textOutline: "1px 1px #aaa",
              fontSize: "10px",
              fontFamily:
                '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
            }
          }
        }
      ];
      let datas = this.$store.state.report.datasource.memberReBuy;
      datas.forEach(data => {
        hz[0].data.push(parseFloat((data.hemiao_rate * 100).toFixed(2)));
      });
      return hz;
    },
    goodsSeries() {
      const goods = [
        {
          type: "column",
          name: "复购商品",
          data: []
        }
      ];
      let datas = this.$store.state.report.datasource.rebuygoods;
      return goods;
    },
    typeSeries() {
      const type = [
        {
          type: "column",
          name: "复购品类",
          data: []
        }
      ];
      let datas = this.$store.state.report.datasource.rebuytype;
      return type;
    },
    brandSeries() {
      const brand = [
        {
          type: "column",
          name: "复购品牌",
          data: []
        }
      ];
      let datas = this.$store.state.report.datasource.rebuybrand;
      return brand;
    },

    todaySeries() {
      let option = {
        xAxis: {
          data: []
        },
        series: [
          {
            data: []
          },
          {
            data: []
          }
        ],
        outletId: []
      };
      let datas = this.$store.state.report.datasource.monthNewMember;
      datas.forEach(e => {
        // option.push([e.store_outlet_name, e.hemiao_count]);
        let target = e.hemiao_count2 ? e.hemiao_count2 : 0;
        option.xAxis.data.push(e.store_outlet_name);
        option.series[0].data.push(e.hemiao_count);
        option.series[1].data.push(target);
        option.outletId.push(e.store_outlet_id);
      });
      // console.log(option);
      return option;
    },

    yesterdaySeries() {
      let option = {
        xAxis: {
          data: []
        },
        data: [],
        outletId: []
      };
      let datas = this.$store.state.report.datasource.todayNewMember;
      datas.forEach(e => {
        option.data.push(e.hemiao_count);
        option.xAxis.data.push(e.store_outlet_name);
        option.outletId.push(e.store_outlet_id);
      });
      return option;
    },

    guideSeries() {
      let option = {
        xAxis: {
          data: []
        },
        series: [
          {
            data: []
          },
          {
            data: []
          }
        ],
        userId: []
      };
      let datas = this.$store.state.report.datasource.newMemberGuide;
      datas.forEach(e => {
        option.xAxis.data.push(e.work_name);
        option.series[0].data.push(e.hemiao_count);
        option.series[1].data.push(e.hemiao_count2);
        option.userId.push(e.sys_store_user_id);
      });
      // console.log(option)
      return option;
    },

    detailSeries() {
      let option = [];
      let datas = this.$store.state.report.datasource.guideDetail;
      datas.forEach(e => {
        let time = e.last_shopping_time
          ? new Date(e.last_shopping_time).Format("yyyy-MM-dd hh:mm:ss")
          : "";
        let time1 = e.perform_date
          ? new Date(e.perform_date).Format("yyyy-MM-dd hh:mm:ss")
          : "";
        option.push({
          name: e.real_name,
          guide: e.work_name,
          card: e.user_name,
          phone: e.mobile_phone,
          age: e.age,
          contact: time1,
          last: time,
          total: e.tot_price
        });
      });
      return option;
    },

    axisSeries() {
      let option = {
        series: [
          {
            name: "注册会员人数",
            type: "bar",
            data: []
          },
          {
            name: "交易会员人数",
            type: "bar",
            data: []
          }
        ],
        ageIndex: []
      };
      let datas = this.$store.state.report.datasource.expenseAxis;
      datas.forEach(e => {
        if (e.baby_age) {
          if (e.type === "reg") {
            option.series[0].data.push(e.hemiao_count);
            option.ageIndex.push(e.baby_age);
          }
          if (e.type === "trade") {
            option.series[1].data.push(e.hemiao_count);
          }
        }
      });
      // console.log(option.ageIndex)
      return option;
    },
    singleSeries() {
      let option = {
        data: [],
        index: []
      };
      let datas = this.$store.state.report.datasource.singleMoney;
      datas.forEach((e, i) => {
        // console.log(i);
        e.tot_price == null ? (e.tot_price = 0) : e.tot_price;
        let price = e.tot_price * 100 + "-" + (e.tot_price + 1) * 100 + "元";
        if (i == datas.length - 1) {
          price = e.tot_price * 100 + "元以上";
        }
        option.data.push({ value: e.hemiao_count, name: price });
        option.index.push(e.tot_price);
      });
      return option;
    },

    timeSeries() {
      let option = [];
      let datas = this.$store.state.report.datasource.exTime;
      datas.forEach(e => {
        option.push({ value: e.hemiao_count, name: e.com_no + "次" });
      });
      return option;
    },
    transformSeries() {
      let option = {
        data: []
      };
      let datas = this.$store.state.report.datasource.transform;
      datas.forEach(e => {
        let name = "";
        switch (e.days) {
          case 1:
            name = "0-7天";
            break;
          case 2:
            name = "7-15天";
            break;
        }
        option.data.push({ value: e.id_old, name: name });
      });
      // console.log(option)
      return option;
    },
    // 门店识别代码
    // storeCode() {
    //   return window.localStorage.getItem("storecode");
    //   return this.$store.state.storeCode;
    // },
    // 路由
    routerParams() {
      return this.$route.params.name;
    },
    // 当前年份
    currentYearDate() {
      let beginDate, endDate, resultDate;
      if (this.dates) {
        beginDate = this.dates.subtract(1, "years").format("YYYY");
        endDate = this.dates.add(1, "years").format("YYYY");
        resultDate = `${beginDate}/${endDate}`;
      } else {
        resultDate = `${moment()
          .subtract(1, "years")
          .format("YYYY")}/${moment().format("YYYY")}`;
      }
      return resultDate;
    },
    // 当前月份和上月
    currentMonthDate() {
      return `${moment()
        .subtract(1, "months")
        .format("YYYY-MM")}/${moment().format("YYYY-MM")}`;
    },
    // 当前月份
    currentMonth() {
      let beginDate, resultDate;
      if (this.dates) {
        beginDate = this.dates.format("YYYY-MM");
        resultDate = `${beginDate}`;
      } else {
        resultDate = `${moment().format("YYYY-MM")}`;
      }
      return resultDate;
    },
    // 当前门店的名称
    outlet() {
      const top20Outlets = this.$store.state.report.datasource.top20OutletSale;
      return this.activeOutlet === ""
        ? top20Outlets[0] && top20Outlets[0].store_outlet
        : this.activeOutlet;
    },
    // 当前搜索的店名和员工名称
    outletEmp() {
      return `${this.activeOutlet}-${this.activeEmp}`;
    },
    // 全局的异步请求的状态
    isloading() {
      return this.$store.state.isLoading;
    }
  },
  data() {
    return {
      storeCode: this.$store.state.storeCode,
      dates: "",
      activeOutlet: "",
      activeEmp: "",
      activePane: this.$route.params.name,
      startDate: new Date().Format("yyyyMM") + "01",
      endDate: new Date().Format("yyyyMMdd"),
      // startDate: "20171001",
      // endDate: "20171031",
      start_Date: new Date().Format("yyyy-MM") + "-01",
      end_Date: new Date().Format("yyyy-MM") + "-" + (new Date().getDate() - 1)
    };
  },
  head() {
    let title = "";
    switch (this.$route.params.name) {
      case "global-all":
        title = "报表--全局数据";
        break;
      case "global-single-store":
        title = "报表--单店数据";
        break;
      case "global-single-person":
        title = "报表--单人数据";
        break;
      case "member-feature":
        title = "会员分析--会员特征";
        break;
      default:
        title = "报表";
        break;
    }
    return { title };
  },
  methods: {
    findIndex(item, arr) {
      let index;
      arr.forEach((e, i) => {
        if (e == item) {
          index = i;
        }
      });
      return index;
    },
    onFilterChange(filters) {
      if (filters.dateFilted === "无过滤条件") {
        this.dates = moment();
      } else {
        this.dates = moment(filters.dateFilted, "YYYY年MM月");
      }
      switch (this.$route.params.name) {
        case "global-all":
          break;
        case "global-single-store":
          if (
            filters.storeNameFilted !== "无过滤条件" &&
            filters.storeNameFilted !== ""
          ) {
            this.activeOutlet = filters.storeNameLabel;
            // ----------------------------------- //
            this.$store.dispatch(
              "report/getCurrentAndLastYearSaleAmountByOutlet",
              {
                storecode: this.storeCode,
                outlet: filters.storeNameFilted
              }
            );
            // ----------------------------------- //
            this.$store.dispatch(
              "report/getCurrentAndLastMonthSaleAmountByOutlet",
              {
                storecode: this.storeCode,
                outlet: filters.storeNameFilted
              }
            );
            // ----------------------------------- //
            this.$store.dispatch("report/getTOP20BrandSaleByOutlet", {
              storecode: this.storeCode,
              outlet: filters.storeNameFilted
            });
            // ----------------------------------- //
            this.$store.dispatch("report/getNewMembersCountsByOutlet", {
              storecode: this.storeCode,
              outlet: filters.storeNameFilted
            });
            // ----------------------------------- //
            this.$store.dispatch("report/getCurrentMonthMemberLevelByOutlet", {
              storecode: this.storeCode,
              outlet: filters.storeNameFilted
            });
            // ----------------------------------- //
            this.$store.dispatch("report/getOldAndNewMembersCountsByOutlet", {
              storecode: this.storeCode,
              outlet: filters.storeNameFilted
            });
          }
          break;
        case "global-single-person":
          let outlet = "";
          if (filters.storeNameFilted && filters.storeNameFilted !== "") {
            this.activeOutlet = filters.storeNameLabel
              ? filters.storeNameLabel
              : this.activeOutlet;
            outlet = filters.storeNameFilted;
          }
          if (
            filters.storePersonFilted &&
            filters.storePersonFilted !== "" &&
            filters.storePersonFilted !== "无过滤条件"
          ) {
            this.activeEmp = filters.storePersonFilted;
          }
          if (
            outlet !== "" &&
            filters.storePersonFilted !== "" &&
            filters.storePersonFilted !== "无过滤条件"
          ) {
            // ----------------------------------- //
            this.$store.dispatch(
              "report/getCurrentAndLastMonthSaleAmountByEmp",
              {
                storecode: this.storeCode,
                outlet: outlet,
                empname: filters.storePersonFilted
              }
            );
            // ----------------------------------- //
            this.$store.dispatch("report/getNewMembersCountsByEmp", {
              storecode: this.storeCode,
              outlet: outlet,
              empname: filters.storePersonFilted
            });
            // ----------------------------------- //
            this.$store.dispatch(
              "report/getCurrentAndLastMonthSaleTaskProcessByEmp",
              {
                storecode: this.storeCode,
                outlet: outlet,
                empname: filters.storePersonFilted
              }
            );
            // ----------------------------------- //
            this.$store.dispatch("report/getOldAndNewMemberCountsByEmp", {
              storecode: this.storeCode,
              outlet: outlet,
              empname: filters.storePersonFilted
            });
            // ----------------------------------- //
            this.$store.dispatch("report/getCurrentMonthMemberLevelByEmp", {
              storecode: this.storeCode,
              outlet: outlet,
              empname: filters.storePersonFilted
            });
            // ----------------------------------- //
            this.$store.dispatch("report/getTOP20BrandSaleByEmp", {
              storecode: this.storeCode,
              outlet: outlet,
              empname: filters.storePersonFilted
            });
            // ----------------------------------- //
            this.$store.dispatch("report/getTOP20GoodsSaleByEmp", {
              storecode: this.storeCode,
              outlet: outlet,
              empname: filters.storePersonFilted
            });
            // ----------------------------------- //
          }
          break;
        case "member-feature":
        // this.$store.dispatch(
        //   'report/getMemberFeature',
        //   {
        //     storecode: this.storeCode,
        //     type: 'F1'
        //   }
        // )
        default:
          break;
      }
    }
  }
};
</script>

<style>
.reports-container {
  padding: 10px;
}
</style>

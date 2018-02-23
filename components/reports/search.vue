<template>
  <div class="search">
    <el-row :gutter="24">
      <el-col :span="24">
        <div class="main flex column">
          <div class="flex search-item">
            <span class="label-text">基本信息</span>
            <span class="item-text">宝宝性别</span>
            <el-radio v-model="sex" label="F0102">男</el-radio>
            <el-radio v-model="sex" label="F0103">女</el-radio>
            <el-radio v-model="sex" label="F0101">保密</el-radio>
            <span class="item-text border-left">宝宝生日</span>
            <el-date-picker v-model="babyBirthday" type="date" placeholder="选择日期" size="small">
            </el-date-picker>
            <span class="item-text border-left">线上关注时间</span>
            <el-date-picker v-model="focusTime" type="date" placeholder="选择日期" size="small">
            </el-date-picker>
          </div>
          <div class="flex search-item">
            <span class="label-text">生理轴</span>
            <span class="item-text">宝宝年龄段</span> 9-12个月
            <span class="item-text border-left">孕期信息</span>
            <el-radio v-model="momInfo" label="F0401">孕早期</el-radio>
            <el-radio v-model="momInfo" label="F0402">孕中期</el-radio>
            <el-radio v-model="momInfo" label="F0403">孕晚期</el-radio>
          </div>
          <div class="flex search-item">
            <span class="label-text">联系信息</span>
            <span class="item-text">地址信息</span>
            <el-input placeholder="省/市/区" v-model="adress" clearable size="small">
            </el-input>
          </div>
          <div class="flex search-item">
            <span class="label-text">会员卡信息</span>
            <span class="item-text">开卡日期</span>
            <el-date-picker v-model="regTime" type="date" placeholder="选择日期" size="small">
            </el-date-picker>
          </div>
          <div class="flex search-item">
            <span class="label-text">归属信息</span>
            <span class="item-text">归属导购</span>
            <span class="item-text border-left">导购所属门店</span>
            <span class="item-text border-left">关系建立的方式</span>
            <el-radio v-model="relationship" label="0">扫码开卡</el-radio>
            <el-radio v-model="relationship" label="1">强制绑定</el-radio>
          </div>
          <div class="flex search-item">
            <div class="flex">
              <span class="label-text">消费时间段</span>
            </div>
            <div class="flex column">
              <div class="flex">
                <span class="item-text">最近购买时间</span>
                <el-date-picker v-model="lastTime" type="date" placeholder="选择日期" size="small">
                </el-date-picker>
                <span class="item-text border-left">消费水平</span>
                <el-radio v-model="showLevel" label="F0304">钻石</el-radio>
                <el-radio v-model="showLevel" label="F0303">顶级</el-radio>
                <el-radio v-model="showLevel" label="F0302">中级</el-radio>
                <span class="item-text border-left">积分信息</span>
                <el-input class="w50" v-model="pointInfo" size="small">
                </el-input>
                <span class="item-text border-left">时间段内消费金额</span>
                <el-input class="w50" v-model="consumMoney" size="small">
                </el-input>
                <el-date-picker v-model="consumTime" type="date" size="small">
                </el-date-picker>
              </div>
              <div class="flex">
                <span class="item-text">时间段内消费次数</span>
                <el-input class="w50" v-model="Times" size="small">
                </el-input>
                <el-date-picker v-model="TimesTime" type="date" size="small">
                </el-date-picker>
                <span class="item-text border-left">消费种类</span>
                <span class="item-text">客户活跃度</span>
              </div>
            </div>
          </div>
          <div class="flex search-item">
            <el-button @click="searchClick">查询</el-button>
            <el-button @click="Details">明细</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-table :data="memberData" style="width: 100%">
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="nickName" label="商城昵称">
          </el-table-column>
          <el-table-column prop="memberId" label="会员卡号">
          </el-table-column>
          <el-table-column prop="phone" label="手机号码">
          </el-table-column>
          <el-table-column prop="guide" label="归属导购">
          </el-table-column>
          <el-table-column prop="guideStore" label="导购所属门店">
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="详情信息" :visible.sync="dialogVisible" width="30%" :show-close="false">
      <div class="flex detail column">
        <div class="flex border-bottom">
          <div class="flex center border-right margin8 padding8 w10">
            <span>基本信息</span>
          </div>
          <div class="flex column padding8 w90">
            <div class="flex border-bottom">
              <span class="flex ceil-item">会员姓名:{{detailData.member.memberOfflineRealName}}</span>
              <span class="flex ceil-item">商城昵称:{{detailData.member.memberOfflineNickname}}</span>
              <span class="flex ceil-item">手机号:{{detailData.member.memberOfflineMobilePhone}}</span>
              <span class="flex ceil-item">线上关注时间:{{detailData.member.memberOnlineBindTime}}</span>
            </div>
            <div class="flex border-bottom">
              <span class="flex ceil-item">会员卡号:{{detailData.member.memberOnlineOfflineVipNo}}</span>
              <span class="flex ceil-item">开卡日期:{{detailData.member.memberOnlineBindTime}}</span>
              <span class="flex ceil-item">生成的帐号信息:{{detailData.member.memberOfflineLastShoppingTime}}</span>
            </div>
            <div class="flex border-bottom">
              <span class="flex ceil-item">地址信息:{{detailData.member.memberOnlineAddressId}}</span>
            </div>
            <div class="flex border-bottom">
              <span class="flex ceil-item">宝妈信息:{{detailData.member.memberOnlineBindTime}}</span>
              <span class="flex ceil-item">孕期信息:{{detailData.member.memberOnlineBindTime}}</span>
            </div>
            <div class="flex border-bottom">
              <span class="flex ceil-item">宝爸信息:{{detailData.member.memberOnlineBindTime}}</span>
              <span class="flex ceil-item">宝爸姓名:{{detailData.member.memberOnlineBindTime}}</span>
            </div>
            <div class="flex border-bottom">
              <span class="flex ceil-item">宝宝信息01:{{detailData.member.memberOnlineBindTime}}</span>
              <span class="flex ceil-item">宝宝姓名:{{detailData.member.memberOnlineBindTime}}</span>
              <span class="flex ceil-item">宝宝姓别:{{detailData.member.memberOnlineBindTime}}</span>
              <span class="flex ceil-item">宝宝生日:{{detailData.member.memberOnlineBindTime}}</span>
              <span class="flex ceil-item">宝宝生理轴年龄段:{{detailData.member.memberOnlineBindTime}}</span>
            </div>
            <div class="flex border-bottom">
              <span class="flex ceil-item">宝宝信息02:{{detailData.member.memberOnlineBindTime}}</span>
              <span class="flex ceil-item">宝宝姓名:{{detailData.member.memberOnlineBindTime}}</span>
              <span class="flex ceil-item">宝宝姓别:{{detailData.member.memberOnlineBindTime}}</span>
              <span class="flex ceil-item">宝宝生日:{{detailData.member.memberOnlineBindTime}}</span>
              <span class="flex ceil-item">宝宝生理轴年龄段:{{detailData.member.memberOnlineBindTime}}</span>
            </div>
          </div>
        </div>
        <div class="flex border-bottom">
          <div class="flex center border-right margin8 padding8 w10">
            <span class="flex">归属信息</span>
          </div>
          <div class="flex column padding8 w90">
            <div class="flex border-bottom">
              <span class="flex ceil-item">归属导购:{{detailData.member.memberOfflineGuiderId}}</span>
              <span class="flex ceil-item">导购所属门店:{{detailData.member.memberOnlineLastStoreOutletId}}</span>
              <span class="flex ceil-item">关系建立的时间:{{detailData.member.memberOnlineBindTime}}</span>
              <span class="flex ceil-item">关系建立的方式:{{detailData.member.memberOnlineBindTime}}</span>
            </div>
            <div class="flex">
              <span class="flex ceil-item">门店偏好</span>
            </div>
          </div>
        </div>
        <div class="flex border-bottom">
          <div class="flex center border-right margin8 padding8 w10">
            <span>消费信息</span>
          </div>
          <div class="flex column padding8 w90">
            <div class="flex border-bottom">
              <span class="flex ceil-item">订单信息:{{detailData.member.memberOnlineBindTime}}</span>
              <span class="flex ceil-item">最近一次购买时间:{{detailData.member.memberOfflineLastShoppingTime}}</span>
              <span class="flex ceil-item">消费金额:{{detailData.orderInfo.consumeMoney}}</span>
              <span class="flex ceil-item">积分信息:{{detailData.orderInfo.integral}}</span>
            </div>
            <div class="flex border-bottom">
              <span class="flex ceil-item">积分水平:{{detailData.orderInfo.level}}</span>
              <span class="flex ceil-item">消费次数:{{detailData.orderInfo.consumeTimes}}</span>
              <span class="flex ceil-item">客户活跃度:{{detailData.orderInfo.active}}</span>
            </div>
            <div class="flex border-bottom">
              <span class="flex ceil-item">消费种类分类:食品、用品:{{detailData.orderInfo.category}}</span>
            </div>
            <div class="flex border-bottom">
              <span class="flex ceil-item">品牌偏好:{{detailData.orderInfo.brand}}</span>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import qs from "qs";
import {
  Button,
  Col,
  Row,
  Dialog,
  Tooltip,
  Card,
  Alert,
  Radio,
  DatePicker,
  Input,
  Table,
  TableColumn
} from "element-ui";
// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// Vue.use(ElementUI);
Vue.use(Button);
Vue.use(Col);
Vue.use(Dialog);
Vue.use(Card);
Vue.use(Row);
Vue.use(Tooltip);
Vue.use(Alert);
Vue.use(Radio);
Vue.use(DatePicker);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);

export default {
  components: {},
  props: [],
  watch: {},
  data() {
    return {
      dialogVisible: false,
      sex: "F0103",
      babyBirthday: null,
      focusTime: null,
      momInfo: "F0401",
      adress: null,
      regTime: null,
      relationship: "0",
      lastTime: null,
      consumMoney: null,
      showLevel: "F0303",
      pointInfo: null,
      consumTime: null,
      Times: null,
      TimesTime: null,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ],
      memberData: [],
      detailData: {
        family: [],
        member: {
          id: "",
          memberOfflineGuiderId: "",
          memberOfflineId: "",
          memberOfflineLastShoppingTime: null,
          memberOfflineMobilePhone: "",
          memberOfflineNickname: "",
          memberOfflineRealName: "",
          memberOnlineAddressId: "",
          memberOnlineBindTime: null,
          memberOnlineId: "",
          memberOnlineLastStoreOutletId: "",
          memberOnlineOfflineVipNo: ""
        },
        orderInfo: {
          active: "",
          brand: "",
          category: "",
          consumeMoney: "",
          consumeTimes: "",
          integral: "",
          level: ""
        }
      }
    };
  },
  computed: {
    storeCode() {
      return (
        this.$store.state.storeCode || window.localStorage.getItem("storecode")
      );
    }
  },
  methods: {
    Details(e) {
      // console.log(e);
    },
    handleClick(e) {
      this.dialogVisible = true;
      this.getDetail();
      // console.log(e);
    },
    getDetail(e) {
      axios
        .get(
          "http://crmbackservice.hemiao100.com/crm/data/member_detail_store.json?token=7131,160008,0,50010016081555,11091"
        )
        .then(res => {
          // console.log(res);
          if (res.data.code === 0) {
            // this.detailData = Object.assign({}, res.data.data);
            this.detailData = res.data.data;
          }
        });
    },
    searchClick(e) {
      let params = Object.assign(
        {},
        {
          babyGender: this.sex,
          babyBirthDay: this.babyBirthday,
          babyAge: null,
          pregnancy: this.momInfo,
          address: null,
          guiderId: null,
          storeOutletId: null,
          reg: this.focusTime,
          connectWay: this.relationship,
          shoppingTimeStart: null,
          shoppingTimeEnd: null,
          consumeLevel: this.showLevel,
          integral: null,
          integralStart: null,
          integralEnd: null,
          memberActiveLevel: null
        }
      );
      axios({
        method: "post",
        url:
          "http://crmbackservice.hemiao100.com/crm/data/member_list_store.json?token=7131,160008,0,50010016081555,11091",
        data: params
      }).then(res => {
        // console.log(res);
        if (res.data.code === 0) {
          this.memberData = [];
          res.data.data.pageItems.forEach(e => {
            this.memberData.push({
              name: e.memberOfflineRealName,
              nickName: e.memberOfflineNickname,
              memberId: e.memberOfflineId,
              phone: e.memberOfflineMobilePhone,
              guide: e.memberOfflineGuiderId,
              guideStore: e.memberOnlineLastStoreOutletId
            });
          });
        }
      });
    }
  },
  created() {},
  mounted() {},
  activated() {}
};
</script>

<style scoped>
.search .el-input {
  width: 180px;
}
.search-item {
  padding: 8px 0;
  align-items: center;
}
.search-item:not(:last-child) {
  border-bottom: 1px solid #e1e1e1;
}
.label-text {
  width: 90px;
  color: #0a0a0a;
  display: inline-block;
  margin-right: 8px;
  border-right: 1px solid gray;
}
.main {
  padding: 8px;
  background: #ffffff;
  border-radius: 6px;
}
.item-text {
  display: inline-block;
  /* border-left: 1px solid gray; */
  padding: 0 8px;
}
.ceil-item {
  margin: 4px 0;
  padding: 6px 18px 6px 6px;
}
.ceil-item:not(:last-child) {
  border-right: 1px solid #a1a1a1;
}

.border-right {
  border-right: 1px solid gray;
}

.border-bottom {
  border-bottom: 1px solid #a1a1a1;
}

.margin8 {
  margin: 8px 0;
}
.padding8 {
  padding: 8px;
}
.border-left {
  margin-left: 8px;
  border-left: 1px solid gray;
}
.w10 {
  width: 10%;
}

.w90 {
  width: 90%;
}
.m10 {
  margin-right: 10px;
}
.search .w50 {
  width: 50px;
  height: 30px;
}
</style>

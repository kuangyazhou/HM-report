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
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <!-- <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table> -->
        <el-table :data="memberData">
          <el-table-column prop="name" label="会员姓名"></el-table-column>
          <el-table-column prop="storeName" label="商城昵称"></el-table-column>
          <el-table-column prop="memberId" label="会员卡号"></el-table-column>
          <el-table-column prop="phone" label="手机号码"></el-table-column>
          <el-table-column prop="guideName" label="归属导购"></el-table-column>
          <el-table-column prop="outletName" label="导购所属门店"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import {
  Button,
  Col,
  Row,
  Tooltip,
  Card,
  Alert,
  Radio,
  DatePicker,
  Input,
  Table,
  TableColumn
} from "element-ui";
Vue.use(Button);
Vue.use(Col);
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
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      memberData: [
        // {
        //   name: "abc",
        //   storeName: "123",
        //   memberId: "345",
        //   phone: "139",
        //   guideName: "baby",
        //   outletName: "可恩店"
        // },
        // {
        //   name: "abc",
        //   storeName: "123",
        //   memberId: "345",
        //   phone: "139",
        //   guideName: "baby",
        //   outletName: "可恩店"
        // }
      ]
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
    searchClick(e) {
      let params = {
        // storeCode: this.storeCode(),
        babyGender: this.sex,
        babyBirthDay: this.babyBirthday,
        babyAge: null,
        pregnancy: this.momInfo,
        address: null,
        guiderId: null,
        storeOutletId: null,
        // reg: this.focusTime,
        connectWay: this.relationship,
        shoppingTimeStart: null,
        shoppingTimeEnd: null,
        consumeLevel: this.showLevel,
        integral: null,
        integralStart: null,
        integralEnd: null,
        memberActiveLevel: null
      };
      // console.log(params);
      axios
        .get(
          `http://192.168.188.195:8080/hemiao-crm-backservice/crm/data/member_list_store.json?token=7131,160008,0,50010016081555,11091`
        )
        .then(res => {
          // console.log(res);
          if (res.data.code === 0) {
            res.data.data.pageItems.forEach(e => {
              // console.log(e);
              this.memberData.push({
                name: e.memberOfflineRealName
                //   storeName:
              });
            });
            // console.log(this.memberData);
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
.border-left {
  margin-left: 8px;
  border-left: 1px solid gray;
}

.m10 {
  margin-right: 10px;
}
.search .w50 {
  width: 50px;
  height: 30px;
}
</style>

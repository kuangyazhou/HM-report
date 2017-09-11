<template>
  <el-row :gutter="10" class="grid-content" style="margin-left: 0; margin-right: 0; margin-bottom: 10px;">
    <el-form :inline="false" class="form-filter">
      <el-form-item label="过滤条件:" style="margin-bottom: 15px;">
        <!--<el-col :span="4" class="fixed-area">
          <el-date-picker disabled style="width: 100%;" v-model="dateMonth" type="month" placeholder="选择具体月份" format="yyyy年MM月" @change="onDateChange"></el-date-picker>
        </el-col>-->
        <!--<el-col :span="1" style="text-align: center;">并且</el-col>-->
        <el-col :span="5" class="fixed-area">
          <el-select
            filterable
            style="width: 100%;"
            v-model="storeName"
            placeholder="请输入门店名称"
            :loading="loading"
            :disabled="disableOutlet"
            @change="handleStoreChange"
          >
            <el-option v-for="store in storesDS" :key="store.label" :label="store.label" :value="store.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="1" style="text-align: center;">并且</el-col>
        <el-col :span="5" class="fixed-area">
          <el-select
            filterable
            style="width: 100%;"
            v-model="employee"
            placeholder="请输入店员名称"
            :disabled="disabledEmployee"
          >
            <el-option v-for="employee in employeeOpts" :key="employee.label" :label="employee.label" :value="employee.label">
              <span style="float: left">{{ employee.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px;">{{ employee.value }}</span>
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
    </el-form>
    <el-col :span="24">
      <h3 class="filted-text">
        <i class="fa fa-filter" style="margin-right: 5px;"></i>已经选择的过滤条件</h3>
      <el-form :inline="true" class="form-filter-result">
        <!--<el-form-item label="已选日期:">
          <el-tag type="primary">{{dateFilted}}</el-tag>
        </el-form-item>-->
        <el-form-item label="已选门店:">
          <el-tag type="primary">{{storeNameFilted}}</el-tag>
        </el-form-item>
        <el-form-item label="已选人员:">
          <el-tag type="primary">{{storePersonFilted}}</el-tag>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import { DatePicker, Row, Col, Button, Form, FormItem, Select, Option, Tag, Notification } from 'element-ui'

Vue.use(DatePicker)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tag)

export default {
  props: ['action', 'emitFilterChange', 'disableOutlet', 'disabledEmployee'],
  data () {
    return {
      loading: false,
      dateFilted: '无过滤条件',
      storeNameFilted: '无过滤条件',
      storePersonFilted: '无过滤条件',
      storeNameValue: '',
      storeNameLabel: '',
      // 日期
      dateToQuery: [],
      dateRange: '',
      dateYear: '',
      dateMonth: '',
      // 门店
      storeName: [],
      storeOpts: [],
      storesDS: [],
      // 员工
      employee: [],
      employeeDS: [],
      employeeOpts: []
    }
  },
  watch: {
    storeName: function (val) {
      let storeName = ''
      if (val.length === 0) {
        this.storeNameFilted = '无过滤条件'
      } else {
        this.storeNameValue = val
        this.storesDS.forEach((store) => {
          if (store.value === val) {
            storeName = store.label
          }
        })
        this.storeNameFilted = storeName
      }
      if (this.disabledEmployee) {
        this.emitFilterChange({
          dateFilted: this.dateFilted,
          storeNameFilted: val,
          storeNameLabel: storeName,
          storePersonFilted: this.storePersonFilted
        })
      }
    },
    employee: function (val) {
      val.length === 0 ? this.storePersonFilted = '无过滤条件' : this.storePersonFilted = val
      this.emitFilterChange({
        dateFilted: this.dateFilted,
        storePersonFilted: val,
        storeNameLabel: this.storeNameFilted,
        storeNameFilted: this.storeNameValue || ''
      })
    },
    dateMonth: function (val) {
      if (!val) return ''
      const date = moment(val, 'YYYY/MM')
      this.dateToQuery = [date]
      this.dateFilted = moment(val, 'YYYY/MM').format('YYYY年MM月')
      this.dateYear = ''
      this.dateRange = ''
    },
    dateYear: function (val) {
      if (!val) return ''
      const date = moment(val, 'YYYY')
      this.dateToQuery = [date]
      this.dateFilted = moment(val, 'YYYY').format('YYYY年')
      this.dateMonth = ''
      this.dateRange = ''
    },
    dateRange: function (val) {
      if (!val[0] || !val[1]) return ''
      const range = moment.range(val[0], val[1])
      const months = []
      for (const month of range.by('month')) {
        months.push(month)
      }
      this.dateToQuery = months
      this.dateFilted = moment(val[0], 'YYYY/MM/DD').format('YYYY年MM月DD日') + ' 至 ' + moment(val[1], 'YYYY/MM/DD').format('YYYY年MM月DD日')
      this.dateMonth = ''
      this.dateYear = ''
    }
  },
  mounted () {
    axios.get(`/api/words/storePemployee?account=${this.$store.state.authUser}`)
    .then((res) => {
      Notification.success({
        title: '成功',
        message: '同步员工和门店信息完成, 现在可以根据员工或者门店来过滤了.'
      })
      this.storesDS = res.data.rows[0].map(item => {
        return { value: item.id, label: item.name }
      })
      this.employeeDS = res.data.rows[1].map(item => {
        return { value: item.account, label: item.name, outletId: item.store_outlet_id }
      })
      this.$store.commit('SET_QUERY_WORDS', res.data.rows)
    })
  },
  methods: {
    handleStoreChange (storeName) {
      if (storeName !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.employeeOpts = this.employeeDS.filter(item => {
            return item.outletId !== null && item.outletId === storeName
          })
        }, 0)
      } else {
        this.employeeOpts = []
      }
    },
    onDateChange (date) {
      if (!date) { return }
      this.emitFilterChange({
        dateFilted: this.dateFilted,
        storeNameFilted: this.storeNameFilted,
        storePersonFilted: this.storePersonFilted
      })
    }
  }
}
</script>
<style scoped>
.grid-content {
  margin-left: 0;
  margin-right: 0;
  padding: 15px 20px;
  padding-bottom: 0;
  border: 1px solid #dedede;
  background: whitesmoke;
}

.filted-text {
  font-size: 14px;
  font-weight: 400;
  border-bottom: 1px solid #dedede;
  padding-bottom: 5px;
  margin-bottom: 5px;
  border-top: 1px solid #dedede;
  padding-top: 5px;
}

.form-filter-result .el-form-item {
  margin-bottom: 5px;
}

.fixed-area {
  max-width: 200px;
}
</style>

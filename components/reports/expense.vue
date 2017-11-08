<template>
    <div class="container">
        <el-row :gutter="15" style="margin-top: 20px;">
            <el-col :span="24">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-area-chart" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div id="axis" :style="{width:'100%',height:'400px'}">
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="15">
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-area-chart" aria-hidden="true"></i>单次消费金额
                        </span>
                    </div>
                    <div id="single" :style="{width:'100%',height:'400px'}">
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-area-chart" aria-hidden="true"></i>消费频次分布
                        </span>
                    </div>
                    <div id="exTime" :style="{width:'100%',height:'400px'}">
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="会员信息详情" :visible="dialogVisible" size="large" :show-close="false">
            <el-table :data="gridData" maxHeight=600>
                <el-table-column property="name" label="客户姓名"></el-table-column>
                <el-table-column property="card" label="卡号"></el-table-column>
                <el-table-column property="phone" label="手机号"></el-table-column>
                <el-table-column property="guide" label="导购姓名"></el-table-column>
                <el-table-column property="contact" label="联系时间"></el-table-column>
                <el-table-column property="last" label="最近购物时间"></el-table-column>
                <el-table-column property="total" label="总消费金额"></el-table-column>
            </el-table>
            <el-pagination :current-page="currentPage" v-if="dialogVisible" @current-change="sizeChange" small layout="prev, pager, next" :total="this.dataLength" class="center">
            </el-pagination>
            <span slot="footer" class="dialog-footer">
                <el-button @click="gridClose">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import axios from 'axios'
import echarts from 'echarts'

import {
    Button,
    Col,
    Row,
    Tooltip,
    Card,
    Alert,
    Dialog,
    Table,
    TableColumn,
    Pagination
} from 'element-ui'

Vue.use(Button)
Vue.use(Col)
Vue.use(Card)
Vue.use(Row)
Vue.use(Tooltip)
Vue.use(Alert)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Pagination)
export default {
    components: {},
    props: ['axisSeries', 'singleSeries', 'timeSeries', 'detailSeries'],
    watch: {
        axisSeries: function(val) {
            // console.log(val.ageIndex)
            this.axisData.series = val.series;
            this.setAxis();
        },
        singleSeries: function(val) {
            // console.log(val)
            this.singleData.series[0].data = val.data;
            this.singleData.index = val.index;
            this.setSingle();
        },
        timeSeries: function(val) {
            this.timeData.series[0].data = val;
            this.setTime();
        },
        // pageStart: function(val) {
        //     console.log(val)
        // },
        detailSeries: function(val) {
            // console.log(val)
            // 会员信息详情传递给grid
            for (let i = this.pageStart; i < this.pageStart + 10; i++) {
                this.gridData.push(val[i]);
            }
            // this.gridData = val;
            this.dataLength = val.length;
            // this.sizeChange();
            // for (let i = this.pageStart; i < this.pageStart + 10; i++) {
            //     this.gridData.push(this.detailSeries[i]);
            // }
        }
    },
    computed: {
    },
    data() {
        return {
            storecode: this.$store.state.storeCode,
            dialogVisible: false,
            ageIndex: ['F0201', 'F0202', 'F0203', 'F0204', 'F0205', 'F0206', 'F0207', 'F0208', 'F0209', 'F0210', 'F0211', 'F0212'],
            baby_age: null,
            switch: false,
            gridData: [],
            currentPage: 0,
            pageStart: 0,
            dataLength: null,
            axisData: {
                color: ['#a1c4fd', '#ff4949'],
                title: {
                    text: '上月注册会员生理轴分布/上月交易会员生理轴分布'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['0~3个月', '3~6个月', '6~9个月', '9~12个月', '1岁~1岁半', '1岁半~2岁', '2岁~2岁半', '2岁半~3岁', '3~4岁', '4~5岁', '5~6岁']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: this.axisSeries.series,
                backgroundColor: 'transporant',
            },
            singleData: {
                color: ['#8fd3f4', '#f093fb', '#f5576c', '#5ee7df', '#b490ca', '#fa709a', '#fee140', '#2af598', '#009efd', '#00dbde', '#fc00ff'],
                title: {
                    text: '单次消费金额分布'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: ['0-100', '100-200', '200-300', '300-400', '400-500', '500-600', '600-700', '700-800', '800-900', '1000以上']
                },
                series: [
                    {
                        name: '单次消费金额分布',
                        type: 'pie',
                        data: []
                    }
                ],
                index: []
            },
            timeData: {
                color: ['#fa709a', '#fee140', '#2af598', '#009efd', '#00dbde', '#fc00ff'],
                title: {
                    text: '消费频次人数分布'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: ['1次', '2次', '3次', '4次']
                },
                series: [
                    {
                        name: '消费频次',
                        type: 'pie',
                        data: [
                        ]
                    }
                ],
                index: []
            }
        }
    },
    created() {
    },
    mounted() {
        this.setAxis();
        this.setSingle();
        this.setTime();
    },
    updated() {

    },
    activated() {
    },
    methods: {
        Dom(id) {
            return echarts.init(document.getElementById(id));
        },
        setAxis() {
            let axisChart = this.Dom('axis');
            const _this = this;
            axisChart.setOption(this.axisData);
            axisChart.on('click', function(e) {
                _this.switch = true;
                // console.log(e.dataIndex)
                let age = _this.ageIndex[e.dataIndex];
                _this.baby_age = age;
                let type = null;
                if (e.seriesName == '交易会员人数') {
                    type = 'trade'
                }
                if (e.seriesName == '注册会员人数') {
                    type = 'reg'
                }
                //单次消费金额请求
                _this.$store.dispatch('report/getSingleMoney', { storecode: _this.storecode, age: age, type: type });
                //消费频次人数分布请求
                _this.$store.dispatch('report/getExTime', { storecode: _this.storecode, age: age, type: type });
            })
        },
        setSingle() {
            let singleChart = this.Dom('single');
            const _this = this;
            singleChart.setOption(this.singleData);
            //绑定前先解绑点击事件，否则会重复绑定，原因未知，fuck the king
            singleChart.off('click');
            singleChart.on('click', function(e) {
                if (!_this.switch) return;
                let tot_price = _this.singleData.index[e.dataIndex];
                _this.$store.dispatch('report/getSingleDetail', { storecode: _this.storecode, age: _this.baby_age, tot_price: tot_price });
                // console.log(_this.baby_age);
                _this.dialogVisible = true;
            })
        },
        setTime() {
            let timeChart = this.Dom('exTime');
            const _this = this;
            timeChart.setOption(this.timeData);
            timeChart.off('click');
            timeChart.on('click', function(e) {
                if (!_this.switch) return;
                let com_no = e.name.charAt(0);
                _this.$store.dispatch('report/getTimeDetail', { storecode: _this.storecode, age: _this.baby_age, com_no: com_no });
                // console.log(_this.baby_age);
                _this.dialogVisible = true;
            })
        },
        sizeChange(val) {
            this.gridData = [];
            this.pageStart = (val - 1) * 10;
            for (let i = this.pageStart; i < this.pageStart + 10; i++) {
                this.gridData.push(this.detailSeries[i]);
            }
        },
        gridClose() {
            this.gridData = [];
            this.pageStart = 0;
            this.dialogVisible = false
        }
    }
}
</script>
<style scoped></style>

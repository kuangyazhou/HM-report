<template>
    <div class="container">
        <el-row :gutter="15" style="margin-top: 20px;">
            <el-col :span="24">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-area-chart" aria-hidden="true"></i>
                        </span>
                        <!-- <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button> -->
                    </div>
                    <div id="transform" :style="{width:'100%',height:'400px'}">
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
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
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
    Alert
} from 'element-ui'
Vue.use(Button)
Vue.use(Col)
Vue.use(Card)
Vue.use(Row)
Vue.use(Tooltip)
Vue.use(Alert)
export default {
    components: {},
    props: ['transformSeries', 'detailSeries'],
    watch: {
        transformSeries: function(val) {
            // console.log(val)
            this.transData.series[0].data = val.data;
            this.setTransfrom()
        },
        detailSeries: function(val) {
            // console.log(val)
            // 会员信息详情传递给grid
            this.gridData = val;
        }
    },
    computed: {
    },
    data() {
        return {
            storecode: this.$store.state.storeCode,
            dialogVisible: false,
            gridData: [],
            transData: {
                title: {
                    text: '客户维护关系转化结果',
                    // subtext: '纯属虚构',
                    // x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                // legend: {
                //     orient: 'vertical',
                //     left: 'left',
                //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                // },
                series: [
                    {
                        name: '复购',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: this.transformSeries.data
                    }
                ]
            }
        }
    },
    created() {
    },
    mounted() {
        this.setTransfrom()
    },
    updated() {

    },
    activated() {
    },
    methods: {
        Dom(id) {
            return echarts.init(document.getElementById(id));
        },
        setTransfrom() {
            let transChart = this.Dom('transform');
            const _this = this;
            transChart.setOption(this.transData);
            transChart.on('click', function(e) {
                let days = e.dataIndex + 1;
                // console.log(days)
                _this.$store.dispatch('report/getTransDetail', { storecode: _this.storecode, days: days });
                _this.dialogVisible = true;
            })
        },
    }
}

</script>

<style scoped></style>

<template>
    <div class="container">
        <el-row :gutter="15">
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-area-chart" aria-hidden="true"></i>
                            复购人员/复购频次
                        </span>
                        <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
                    </div>
                    <Charts :options="reBuyCount" />
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-area-chart" aria-hidden="true"></i>
                            复购率
                        </span>
                        <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
                    </div>
                    <Charts :options="reBuyHz" />
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="15">
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-area-chart" aria-hidden="true"></i>
                            复购商品
                        </span>
                        <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
                    </div>
                    <Charts :options="reBuyGoods" />
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-area-chart" aria-hidden="true"></i>
                            复购品类
                        </span>
                        <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
                    </div>
                    <Charts :options="reBuyType" />
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="15">
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-area-chart" aria-hidden="true"></i>
                            复购品牌
                        </span>
                        <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
                    </div>
                    <Charts :options="reBuyBrand" />
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import {
    Button,
    Col,
    Row,
    Tooltip,
    Card,
    Alert
} from 'element-ui'
import Charts from '~components/commons/Charts.vue'

Vue.use(Button)
Vue.use(Col)
Vue.use(Card)
Vue.use(Row)
Vue.use(Tooltip)
Vue.use(Alert)
export default {
    components: { Charts },
    props: ['reBuyCountSeries', 'reBuyHzSeries', 'goodsSeries', 'typeSeries', 'brandSeries'],
    watch: {
        reBuyCountSeries: function(val) {
            this.reBuyCount = Object.assign({}, this.reBuyCount, { series: val });
        },
        reBuyHzSeries: function(val) {
            this.reBuyHz = Object.assign({}, this.reBuyHz, { series: val });
        },
        goodsSeries: function(val) {
            this.reBuyGoods = Object.assign({}, this.reBuyGoods, { series: val });
        },
        typeSeries: function(val) {
            this.reBuyType = Object.assign({}, this.reBuyType, { series: val });
        },
        brandSeries: function(val) {
            this.reBuyBrand = Object.assign({}, this.reBuyBrand, { series: val });
        }
    },
    computed: {

    },
    data() {
        return {
            reBuyCount: {
                type: 'column',
                yAxisTitle: '复购人数',
                xAxis: {
                    categories: [
                        '3天',
                        '7天',
                        '15天',
                        '30天'
                    ],
                    crosshair: true
                },
                series: this.reBuyCountSeries
            },
            reBuyHz: {
                type: 'column',
                yAxisTitle: '复购率(百分比)',
                xAxis: {
                    categories: [
                        '3天',
                        '7天',
                        '15天',
                        '30天'
                    ],
                    crosshair: true
                },
                series: this.reBuyHzSeries
            },
            reBuyGoods: {
                type: 'column',
                yAxisTitle: '',
                xAxis: {
                    categories: [
                        '3天',
                        '7天',
                        '15天',
                        '30天'
                    ],
                    crosshair: true
                },
                series: this.goodsSeries
            },
            reBuyType: {
                type: 'column',
                yAxisTitle: '',
                xAxis: {
                    categories: [
                        '3天',
                        '7天',
                        '15天',
                        '30天'
                    ],
                    crosshair: true
                },
                series: this.typeSeries
            },
            reBuyBrand: {
                type: 'column',
                yAxisTitle: '',
                xAxis: {
                    categories: [
                        '3天',
                        '7天',
                        '15天',
                        '30天'
                    ],
                    crosshair: true
                },
                series: this.brandSeries
            }
        }
    }
}
</script>

<style scoped>

</style>

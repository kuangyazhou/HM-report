<template>
    <div class="container">
        <el-row :gutter="15">
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-area-chart" aria-hidden="true"></i>
                            性别分布
                        </span>
                        <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
                    </div>
                    <!-- <Charts :options="memberFeatureBySex" /> -->
                    <div id="charts" style="width:'100%',height:'400px'">
                        <div id="sex" :style="{width:'100%',height:'400px'}"></div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-area-chart" aria-hidden="true"></i>
                            年龄分布
                        </span>
                        <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
                    </div>
                    <!-- <Charts :options="memberFeatureByAge" /> -->
                    <div id="charts" style="width:'100%',height:'400px'">
                        <div id="age" :style="{width:'100%',height:'400px'}"></div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="15">
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-area-chart" aria-hidden="true"></i>
                            消费能力
                        </span>
                        <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
                    </div>
                    <!-- <Charts :options="memberFeatureByMoney" id="money" /> -->
                    <div id="charts" style="width:'100%',height:'400px'">
                        <div id="money" :style="{width:'100%',height:'400px'}"></div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-area-chart" aria-hidden="true"></i>
                            会员活跃度
                        </span>
                        <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
                    </div>
                    <!-- <Charts :options="memberFeatureByActive" /> -->
                    <div id="charts" style="width:'100%',height:'400px'">
                        <div id="active" :style="{width:'100%',height:'400px'}"></div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="15">
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">
                            <i class="fa fa-area-chart" aria-hidden="true"></i>
                            怀孕时间
                        </span>
                        <el-button style="float: right;" icon="star-off" type="primary">收藏</el-button>
                    </div>
                    <!-- <Charts :options="memberFeatureByTime" /> -->
                    <div id="charts" style="width:'100%',height:'400px'">
                        <div id="time" :style="{width:'100%',height:'400px'}"></div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="会员信息详情" :visible="dialogVisible" size="large" :show-close="false">
            <el-table :data="gridData">
                <el-table-column property="name" label="姓名" width="200"></el-table-column>
                <el-table-column property="date" label="日期" width="150"></el-table-column>
                <el-table-column property="date" label="日期" width="150"></el-table-column>
                <el-table-column property="address" label="地址"></el-table-column>
            </el-table>
            <el-pagination :current-page.sync="currentPage" @current-change="sizeChange" small layout="prev, pager, next" :total="100" class="center">
            </el-pagination>
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
import Highcharts from 'highcharts'
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
import Charts from '~components/commons/Charts.vue'

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
    components: { Charts },
    props: ['bySex', 'byAge', 'byMoney', 'byActive', 'byTime'],
    watch: {
    },
    computed: {
        // 路由
        routerParams() {
            return this.$route.params.name
        },
    },
    data() {
        return {
            gridData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            dialogVisible: false,
            currentPage: 1,
            //利用vuex获取store中的storecode
            storecode: this.$store.state.storeCode,
            type: null,
        }
    },
    mounted() {
        let _this = this;
        // let storecode = this.$store.state.storeCode;
        let date = moment(new Date());
        // console.log(date.calendar(),date.format("YYYY-MM-DD"));
        var hCharts = Highcharts.chart("sex", {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: null
            },
            colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
                '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
            ],
            credits: {
                enabled: false
            },
            tooltip: {
                headerFormat: '{series.name}<br>',
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    events: {
                        click: function getDetail(e) {
                            // console.log(e.point.name)
                            let _type = e.point.name;
                            let type = null;
                            switch (_type) {
                                case '男':
                                    type = 'F0101'
                                    break;
                                case '女':
                                    type = 'F0102';
                                    break;
                                case '保密':
                                    type = 'F0103';
                                    break;
                            }
                            //发送请求
                            _this.$store.dispatch('report/getDetail', { storecode: _this.storecode, type: type, number: 10 });
                            _this.dialogVisible = true;
                        }
                    },
                }
            },
            series: this.bySex
        });
        var hCharts = Highcharts.chart("age", {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: null
            },
            colors: ['#2b908f', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
                '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
            ],
            credits: {
                enabled: false
            },
            tooltip: {
                headerFormat: '{series.name}<br>',
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    events: {
                        click: function getDetail(e) {
                            // console.log(e.point.name)
                            _this.type = e.point.name;
                            //发送请求
                            _this.$store.dispatch('report/getDetail', { storecode: _this.storecode, type: _this.type, number: 10 });
                            _this.dialogVisible = true;
                        }
                    },
                }
            },
            series: this.byAge
        });
        var hCharts = Highcharts.chart("money", {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: null
            },
            colors: ['#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
                '#55BF3B', '#DF5353', '#7798BF'
            ],
            credits: {
                enabled: false
            },
            tooltip: {
                headerFormat: '{series.name}<br>',
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    events: {
                        click: function getDetail(e) {
                            // console.log(e.point.name)
                            _this.type = e.point.name;
                            //发送请求
                            _this.$store.dispatch('report/getDetail', { storecode: _this.storecode, type: _this.type, number: 10 });
                            _this.dialogVisible = true;
                        }
                    },
                }
            },
            series: this.byMoney
        });
        var hCharts = Highcharts.chart("active", {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: null
            },
            colors: ['#2b908f', '#aaeeee', '#ff0066', '#eeaaee',
                '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
            ],
            credits: {
                enabled: false
            },
            tooltip: {
                headerFormat: '{series.name}<br>',
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    events: {
                        click: function getDetail(e) {
                            _this.type = e.point.name;
                            _this.$store.dispatch('report/getDetail', { storecode: _this.storecode, type: _this.type, number: 10 });
                            _this.dialogVisible = true;
                        }
                    },
                }
            },
            series: this.byActive
        });
        var hCharts = Highcharts.chart("time", {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: null
            },
            colors: ['#aaeeee', '#ff0066', '#eeaaee',
                '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
            ],
            credits: {
                enabled: false
            },
            tooltip: {
                headerFormat: '{series.name}<br>',
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    events: {
                        click: function getDetail(e) {
                            _this.type = e.point.name;
                            _this.$store.dispatch('report/getCount', { storecode: _this.storecode, type: _this.type })
                            _this.$store.dispatch('report/getDetail', { storecode: _this.storecode, type: _this.type, number: 10 });
                            _this.dialogVisible = true;
                        }
                    },
                }
            },
            series: this.byTime
        });

    },
    computed() {
    },
    methods: {
        sizeChange(val) {
            this.$store.dispatch('report/getDetail', { storecode: this.storecode, type: this.type, number: val * 10 });
            // console.log(`第 ${val} 页`);
        }
    }
}
</script>

<style scoped>

</style>

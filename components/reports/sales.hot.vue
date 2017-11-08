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
                    <div>全部</div>
                    <div id="transform" :style="{width:'100%',height:'400px'}">
                    </div>
                </el-card>
            </el-col>
        </el-row>
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

    },
    computed: {
    },
    data() {
        return {
        }
    },
    created() {
    },
    mounted() {
    },
    updated() {

    },
    activated() {
    },
    methods: {

    }
}

</script>

<style scoped></style>

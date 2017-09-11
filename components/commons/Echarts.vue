<template>
    <div style="min-width: 300px;width: 100%;">
    </div>
</template>
<script>
import { Loading } from 'element-ui'
import Highcharts from 'highcharts'
export default {
    name: 'Chart',
    props: ['options'],
    options: function(val) {
        let flag = false
        if (this.chartInstance) {
            // Set flag for loading status.
            for (let index = 0; index < this.chartInstance.series.length; index++) {
                if (this.chartInstance.series[index].data.length > 0) {
                    flag = true
                    break
                }
            }
            // remove previous series.
            this.chartInstance.destroy()
            this.chartInstance = Highcharts.chart(this.$el, this.chartOptions)

            // set new series.
            this.options.series
                ? this.options.series.forEach((data) => { this.chartInstance.addSeries(data) })
                : this.chartInstance.update({ series: val.series })

            if (flag) {
                this.loading && this.loading.close()
            }

            setTimeout(() => { this.loading && this.loading.close() }, 1000 * 10)
        }
    },
    data() {
        return {
        }
    },
    mounted() {
        this.options.theme ? this.setTheme(this.options.theme) : this.setTheme('gridTheme')
        this.chartInstance = Highcharts.chart(this.$el, this.chartOptions)
        if (!this.loading) {
            this.loading = Loading.service({ text: '正在生成图表中...', fullscreen: false, target: this.$el })
        }
    },
}
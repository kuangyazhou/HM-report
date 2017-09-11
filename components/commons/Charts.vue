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
  watch: {
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
    }
  },
  data() {
    return {
      chartOptions: {
        chart: this.options.chart || {
          animation: false,
          type: this.options.type,
          inverted: this.options.inverted || false
        },
        title: {
          text: this.options.title || '',
          x: -20
        },
        subtitle: {
          text: '',
          x: -20
        },
        xAxis: this.options.xAxis || {
          categories: this.options.categories
        },
        yAxis: {
          min: 0,
          labels: {
            formatter: function() {
              const counts = parseInt(this.value, 10)
              if (counts > 10000) {
                return `${parseInt(this.value, 10) / 10000}万`
              } else if (counts >= 1000) {
                return `${parseInt(this.value, 10) / 1000}千`
              } else {
                return `${parseInt(this.value, 10)}`
              }
            }
          },
          title: {
            text: this.options.yAxisTitle || ''
          }
        },
        tooltip: this.options.tooltip || {},
        legend: this.options.legend || {},
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            innerSize: 80,
            depth: 35,
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: 'black'
              }
            }
          },
          spline: {
            dataLabels: {
              enabled: true,
              borderRadius: 5,
              backgroundColor: 'rgba(252, 255, 197, 0.7)',
              borderWidth: 1,
              borderColor: '#AAA',
              y: -6
            }
          }
        },
        credits: {
          enabled: false
        },
        series: {
          color: '#7798BF',
          lineColor: '#A6C7ED'
        }
      },
      chartInstance: null,
      loading: null
    }
  },
  mounted() {
    this.options.theme ? this.setTheme(this.options.theme) : this.setTheme('gridTheme')
    this.chartInstance = Highcharts.chart(this.$el, this.chartOptions)
    if (!this.loading) {
      this.loading = Loading.service({ text: '正在生成图表中...', fullscreen: false, target: this.$el })
    }
  },
  methods: {
    setTheme(theme) {
      Highcharts.theme = {
        colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
          '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
        ],
        chart: {
          backgroundColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 1,
              y2: 1
            },
            stops: [
              [0, '#2a2a2b'],
              [1, '#3e3e40']
            ]
          },
          style: {
            fontFamily: '\'Unica One\', sans-serif'
          },
          plotBorderColor: '#606063'
        },
        title: {
          style: {
            color: '#E0E0E3',
            textTransform: 'uppercase',
            fontSize: '20px'
          }
        },
        subtitle: {
          style: {
            color: '#E0E0E3',
            textTransform: 'uppercase'
          }
        },
        xAxis: {
          gridLineColor: '#707073',
          labels: {
            style: {
              color: '#E0E0E3'
            }
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          title: {
            style: {
              color: '#A0A0A3'

            }
          }
        },
        yAxis: {
          gridLineColor: '#707073',
          labels: {
            style: {
              color: '#E0E0E3'
            }
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          tickWidth: 1,
          title: {
            style: {
              color: '#A0A0A3'
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          style: {
            color: '#F0F0F0'
          }
        },
        plotOptions: {
          series: {
            dataLabels: {
              color: '#B0B0B3'
            },
            marker: {
              lineColor: '#333'
            }
          },
          boxplot: {
            fillColor: '#505053'
          },
          candlestick: {
            lineColor: 'white'
          },
          errorbar: {
            color: 'white'
          }
        },
        legend: {
          itemStyle: {
            color: '#E0E0E3'
          },
          itemHoverStyle: {
            color: '#FFF'
          },
          itemHiddenStyle: {
            color: '#606063'
          }
        },
        credits: {
          style: {
            color: '#666'
          }
        },
        labels: {
          style: {
            color: '#707073'
          }
        },
        drilldown: {
          activeAxisLabelStyle: {
            color: '#F0F0F3'
          },
          activeDataLabelStyle: {
            color: '#F0F0F3'
          }
        },
        navigation: {
          buttonOptions: {
            symbolStroke: '#DDDDDD',
            theme: {
              fill: '#505053'
            }
          }
        },
        // scroll charts
        rangeSelector: {
          buttonTheme: {
            fill: '#505053',
            stroke: '#000000',
            style: {
              color: '#CCC'
            },
            states: {
              hover: {
                fill: '#707073',
                stroke: '#000000',
                style: {
                  color: 'white'
                }
              },
              select: {
                fill: '#000003',
                stroke: '#000000',
                style: {
                  color: 'white'
                }
              }
            }
          },
          inputBoxBorderColor: '#505053',
          inputStyle: {
            backgroundColor: '#333',
            color: 'silver'
          },
          labelStyle: {
            color: 'silver'
          }
        },

        navigator: {
          handles: {
            backgroundColor: '#666',
            borderColor: '#AAA'
          },
          outlineColor: '#CCC',
          maskFill: 'rgba(255,255,255,0.1)',
          series: {
            color: '#7798BF',
            lineColor: '#A6C7ED'
          },
          xAxis: {
            gridLineColor: '#505053'
          }
        },
        scrollbar: {
          barBackgroundColor: '#808083',
          barBorderColor: '#808083',
          buttonArrowColor: '#CCC',
          buttonBackgroundColor: '#606063',
          buttonBorderColor: '#606063',
          rifleColor: '#FFF',
          trackBackgroundColor: '#404043',
          trackBorderColor: '#404043'
        },
        // special colors for some of the
        legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
        background2: '#505053',
        dataLabelsColor: '#B0B0B3',
        textColor: '#C0C0C0',
        contrastTextColor: '#F0F0F3',
        maskColor: 'rgba(255,255,255,0.3)'
      }
      Highcharts.gridTheme = {
        colors: ['#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
          '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
        ],
        chart: {
          backgroundColor: null,
          style: {
            fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'
          }
        },
        title: {
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }
        },
        tooltip: {
          borderWidth: 0,
          backgroundColor: 'rgba(219,219,216,0.8)',
          shadow: false
        },
        legend: {
          itemStyle: {
            fontWeight: 'bold',
            fontSize: '13px'
          }
        },
        xAxis: {
          gridLineWidth: 1,
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        },
        yAxis: {
          minorTickInterval: 'auto',
          title: {
            style: {
              textTransform: 'uppercase'
            }
          },
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        },
        plotOptions: {
          candlestick: {
            lineColor: '#404048'
          }
        },
        // General
        background2: '#F0F0EA'
      }
      Highcharts.grayTheme = {
        colors: ['#DDDF0D', '#7798BF', '55BF3B', '#DF5353', '#aaeeee', '#ff0066', '#eeaaee',
          '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
        chart: {
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#1b2735'],
              [1, '#053287']
            ]
          },
          borderWidth: 0,
          borderRadius: 0,
          plotBackgroundColor: null,
          plotShadow: false,
          plotBorderWidth: 0
        },
        title: {
          style: {
            color: '#FFF',
            font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
          }
        },
        subtitle: {
          style: {
            color: '#DDD',
            font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
          }
        },
        xAxis: {
          gridLineWidth: 0,
          lineColor: '#999',
          tickColor: '#999',
          labels: {
            style: {
              color: '#999',
              fontWeight: 'bold'
            }
          },
          title: {
            style: {
              color: '#AAA',
              font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
            }
          }
        },
        yAxis: {
          alternateGridColor: null,
          minorTickInterval: null,
          gridLineColor: 'rgba(255, 255, 255, .1)',
          minorGridLineColor: 'rgba(255,255,255,0.07)',
          lineWidth: 0,
          tickWidth: 0,
          labels: {
            style: {
              color: '#999',
              fontWeight: 'bold'
            }
          },
          title: {
            style: {
              color: '#AAA',
              font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
            }
          }
        },
        legend: {
          itemStyle: {
            color: '#CCC'
          },
          itemHoverStyle: {
            color: '#FFF'
          },
          itemHiddenStyle: {
            color: '#333'
          }
        },
        labels: {
          style: {
            color: '#CCC'
          }
        },
        tooltip: {
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, 'rgba(96, 96, 96, .8)'],
              [1, 'rgba(16, 16, 16, .8)']
            ]
          },
          borderWidth: 0,
          style: {
            color: '#FFF'
          }
        },
        plotOptions: {
          series: {
            nullColor: '#444444'
          },
          line: {
            dataLabels: {
              color: '#CCC'
            },
            marker: {
              lineColor: '#333'
            }
          },
          spline: {
            marker: {
              lineColor: '#333'
            }
          },
          scatter: {
            marker: {
              lineColor: '#333'
            }
          },
          candlestick: {
            lineColor: 'white'
          }
        },

        toolbar: {
          itemStyle: {
            color: '#CCC'
          }
        },

        navigation: {
          buttonOptions: {
            symbolStroke: '#DDDDDD',
            hoverSymbolStroke: '#FFFFFF',
            theme: {
              fill: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                  [0.4, '#606060'],
                  [0.6, '#333333']
                ]
              },
              stroke: '#000000'
            }
          }
        },

        // scroll charts
        rangeSelector: {
          buttonTheme: {
            fill: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0.4, '#888'],
                [0.6, '#555']
              ]
            },
            stroke: '#000000',
            style: {
              color: '#CCC',
              fontWeight: 'bold'
            },
            states: {
              hover: {
                fill: {
                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                  stops: [
                    [0.4, '#BBB'],
                    [0.6, '#888']
                  ]
                },
                stroke: '#000000',
                style: {
                  color: 'white'
                }
              },
              select: {
                fill: {
                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                  stops: [
                    [0.1, '#000'],
                    [0.3, '#333']
                  ]
                },
                stroke: '#000000',
                style: {
                  color: 'yellow'
                }
              }
            }
          },
          inputStyle: {
            backgroundColor: '#333',
            color: 'silver'
          },
          labelStyle: {
            color: 'silver'
          }
        },

        navigator: {
          handles: {
            backgroundColor: '#666',
            borderColor: '#AAA'
          },
          outlineColor: '#CCC',
          maskFill: 'rgba(16, 16, 16, 0.5)',
          series: {
            color: '#7798BF',
            lineColor: '#A6C7ED'
          }
        },

        scrollbar: {
          barBackgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0.4, '#888'],
              [0.6, '#555']
            ]
          },
          barBorderColor: '#CCC',
          buttonArrowColor: '#CCC',
          buttonBackgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0.4, '#888'],
              [0.6, '#555']
            ]
          },
          buttonBorderColor: '#CCC',
          rifleColor: '#FFF',
          trackBackgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#000'],
              [1, '#333']
            ]
          },
          trackBorderColor: '#666'
        },

        // special colors for some of the demo examples
        legendBackgroundColor: 'rgba(48, 48, 48, 0.8)',
        background2: 'rgb(70, 70, 70)',
        dataLabelsColor: '#444',
        textColor: '#E0E0E0',
        maskColor: 'rgba(255,255,255,0.3)'
      }
      Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
        return {
          radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
          stops: [
            [0, color],
            [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
          ]
        }
      })
      // Apply the theme
      switch (theme) {
        case 'darker':
          Highcharts.setOptions(Highcharts.grayTheme)
          break
        case 'girdLight':
          Highcharts.setOptions(Highcharts.gridTheme)
          break
        default:
          Highcharts.setOptions(Highcharts.gridTheme)
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <!-- 门急诊人次：可视化组件-->
  <div :id="main" :style="{width: width,height: height}"></div>
</template>

<script>
import { getOutpatientSumm } from '@/api/visualize/summary'
export default {
  name: 'Visualize',
  props: {
    main: {
      type: String,
      default: () => {
        return 'main'
      }
    },
    width: {
      type: String,
      default: () => {
        return '400px'
      }
    },
    height: {
      type: String,
      default: () => {
        return '300px'
      }
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      list: [],
      option: this.options
    }
  },
  mounted() {
    this.draw()
  },
  methods: {
    init(data) {
      const mychart = this.$echarts.init(document.getElementById('main'))
      const options = {
        title: {
          text: 'Referer of a Website',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          padding: 5
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      mychart.setOption(options)
    },
    draw() {
      const arr = []
      getOutpatientSumm().then(res => {
        const { result } = res
        const names = Object.keys(result[0])
        const values = Object.values(result[0])
        for (let i = 0; i < names.length; i++) {
          let obj = Object.assign({}, { value: parseFloat(values[i]), name: names[i] })
          arr.push(obj)
          obj = {}
        }
      })
      this.init(arr)
    }
  }
}
</script>

<style scoped>

</style>

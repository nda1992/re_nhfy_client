<template>
  <!-- 数据分析首页：显示当天门诊、住院、以及前一天的药耗占比等数据 -->
  <div class="app-container">
    <div v-if="convert" class="container_data1">
      <span>门急诊人次：{{ outpatientMJZ }}</span>
      <span>入院人数：{{ inpatientCome }}</span>
      <span>出院人数：{{ inpatientOut }}</span>
      <span>门急诊收入：{{ outpatientRevenue }}</span>
    </div>
    <div v-else class="container_data1">
      <span>住院收入：{{ inpatientRevenue }}</span>
      <span>全院收入：{{ allRevenue }}</span>
      <span>药占比：{{ medicineProp }}</span>
      <span>耗占比：{{ materialProp }}</span>
    </div>
    <div class="container-visualize">
      <div class="container-visualize-char1">
        <Visualize :options="option" :width="'500px'" :height="'500px'" />
      </div>
    </div>
  </div>
</template>
<script>
import Visualize from '@/components/Visualization/index'
import { getBasicData } from '@/api/topic/basic/basic'
import { getOutpatientSumm } from '@/api/visualize/summary'
export default {
  components: {
    Visualize
  },
  data() {
    return {
      // 门急诊人次
      outpatientMJZ: 0,
      // 入院人数
      inpatientCome: 0,
      // 出院人数
      inpatientOut: 0,
      inpatientRevenue: 0,
      outpatientRevenue: 0,
      allRevenue: 0,
      // 药占比
      medicineProp: 0,
      // 耗占比
      materialProp: 0,
      convert: true,
      list: [],
      option: {
        title: {
          text: '门诊收入分类',
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
            data: [],
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
    }
  },
  mounted() {
    this.getInitData()
    setInterval(() => {
      this.convert = !this.convert
    }, 5000)
  },
  methods: {
    getInitData() {
      getBasicData().then(res => {
        const { result } = res
        this.outpatientMJZ = result.门急诊人次
        this.inpatientCome = result.入院人数
        this.inpatientOut = result.出院人数
        this.outpatientRevenue = result.门急诊收入
        this.inpatientRevenue = result.住院收入
        this.allRevenue = result.全院收入
        this.medicineProp = result.药占比
        this.materialProp = result.耗占比
      })
    },
    getChar1Data() {
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
      this.option.series.data = arr
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  padding: 0;
  .container_data1 {
    height: 45px;
    width: 100%;
    font-weight: bold;
    color: #4455aa;
    background: #d3dce6;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    -webkit-animation: flip-horizontal-top 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
    animation: flip-horizontal-top 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
    @-webkit-keyframes flip-horizontal-top {
      0% {
        -webkit-transform: rotateX(0);
        transform: rotateX(0);
      }
      100% {
        -webkit-transform: rotateX(360deg);
        transform: rotateX(360deg);
      }
    }
    @keyframes flip-horizontal-top {
      0% {
        -webkit-transform: rotateX(0);
        transform: rotateX(0);
      }
      100% {
        -webkit-transform: rotateX(360deg);
        transform: rotateX(360deg);
      }
    }
  }
  .container-visualize {
    .container-visualize-char1 {
      width: 500px;
      height: 500px;
      border: 1px solid red;
    }
  }
}
</style>

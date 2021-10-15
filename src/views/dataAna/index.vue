<template>
  <!-- 数据分析首页：显示当天门诊、住院、以及前一天的药耗占比等数据 -->
  <div class="app-container">
    <div class="container-data">
      <span>门诊人次：{{ outpatientMZ }}</span>
      <span>急诊人次：{{ outpatientJZ }}</span>
      <span>入院人数：{{ inpatientCome }}</span>
      <span>出院人数：{{ inpatientOut }}</span>
    </div>
    <Visualize :options="option" />
  </div>
</template>
<script>
import Visualize from '@/components/Visualization/index'
import { getBasicData } from '@/api/topic/basic/basic'
export default {
  components: {
    Visualize
  },
  data() {
    return {
      // 门诊人次
      outpatientMZ: 0,
      // 急诊人次
      outpatientJZ: 0,
      // 入院人数
      inpatientCome: 0,
      // 出院人数
      inpatientOut: 0
    }
  },
  computed() {
    // this.getInitData()
  },
  methods: {
    getInitData() {
      getBasicData().then(res => {
        const { items } = res
        this.outpatientMZ = items.outpatientMZ
        this.outpatientJZ = items.outpatientJZ
        this.inpatientCome = items.inpatientCome
        this.inpatientOut = items.inpatientOut
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  padding: 0;
}
</style>

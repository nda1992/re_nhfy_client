<template>
    <!-- 报表查询主页 -->
    <div class="app-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="color:#ff6666;font-size: 20px">欢迎使用报表查询模块提供的相关功能</span>
        </div>
        <div v-for="(item,index) in data" :key="item.id" class="text">
          <span :style="item.id===1?color1:color2">{{ item.content }}</span>
        </div>
      </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
          data: [{ id: 1, content: '报表查询模块主要包含三个子模块：' }, { id: 2, content: '1. 常规报表查询：包含日常需要报送的报表，如医疗机构运营情况表和医疗收入情况表的日、周、月和季度报等' },
            { id: 3, content: '2. 门诊报表：门诊相关的一些常用报表：如门急诊人次、药品耗材、门急诊收入等相关报表' }, { id: 4, content: '3. 住院报表：出入院人次、手术人次、药品耗材、医保和住院收入等相关报表' }],
          color1: { color: '#3399FF', fontSize: '16px' },
          color2: { color: '#000', fontSize: '16px' }
        }
    },
    computed() {},
    methods: {}
}
</script>
<style lang="scss" scoped>
  .app-container{
    .box-card{
      .text{
        margin-bottom: 15px;
      }
    }
  }
</style>

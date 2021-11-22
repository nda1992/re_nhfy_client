<template>
  <div class="app-container">
    <div class="title">
      <span style="font-size: 20px;color: #2b2f3a;font-weight: bold;">特殊查询</span>
      <el-dropdown>
        <el-button type="primary">更多功能<i class="el-icon-arrow-down el-icon--right" /></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in menuList" :key="item.id" @click.native="selected(item.id)">{{ item.content }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-divider />
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuList: [{ id: 1, content: '科室收入情况' }, { id: 2, content: '住院科室耗占比' }, { id: 3, content: '所有科室药占比' }, { id: 4, content: '科室耗材金额排名前20' }, { id: 5, content: '科室耗材排名' }, { id: 6, content: '住院病人耗材明细' }, { id: 7, content: '门诊住院药品和耗材明细' }]
    }
  },
  methods: {
    selected(id) {
      if (id === 1) {
        this.$router.push({ name: 'DeptOperate' })
      } else if (id === 2) {
        this.$router.push({ name: 'DeptMaterialProportion' })
      } else if (id === 3) {
        this.$router.push({ name: 'DeptMedicineProportion' })
      } else if (id === 4) {
        this.$router.push({ name: 'DeptMaterialAmountTop20' })
      } else if (id === 5) {
        this.$router.push({ name: 'DeptMaterialSorted' })
      } else if (id === 7) {
        this.$router.push({ name: 'DeptMaterialMedicineDetail' })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container{
    .title{
      width: 240px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
</style>

<template>
  <!-- 门诊数据报表 -->
  <div class="app-container">
    <div class="title">
      <el-dropdown>
        <el-button type="primary">更多功能<i class="el-icon-arrow-down el-icon--right" /></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item) in menuList" :key="item.id" @click.native="selected(item.id)">{{ item.content }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div style="color: #ff6666">
        1.各科室门诊人均费用排名;
        2.各医生门诊人均费用排名;
      </div>
    </div>
      <el-divider />
      <div class="content">
        <router-view />
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuList: [{ id: 1, content: '各科室门诊人均费用' }, { id: 2, content: '各医生门诊人均费用' }]
    }
  },
  computed() {},
  methods: {
    selected(id) {
      if (id === 1) {
        this.$router.push({ name: 'AvgRevenueByDept' })
      } else if (id === 2) {
        this.$router.push({ name: 'AvgRevenueByDoctor' })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container {
    .title {
      width: 470px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
    }
  }
</style>

<template>
  <!-- 住院数据报表 -->
  <div class="app-container">
    <div class="title">
      <el-dropdown>
        <el-button type="primary">更多功能<i class="el-icon-arrow-down el-icon--right" /></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item) in menuList" :key="item.id" @click.native="selected(item.id)">{{ item.content }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div style="color: #ff6666">
        1.住院科室的药耗占比、医疗有效收入、医疗服务收入;
        2.门诊科室的药耗占比、医疗有效收入、医疗服务收入;
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
      menuList: [{ id: 1, content: '住院科室药耗占比' }, { id: 2, content: '门诊科室药耗占比' }]
    }
  },
  computed() {},
  methods: {
    // 选择menu跳转
    selected(id) {
      if (id === 1) {
        this.$router.push({ name: 'InpatientMedicineMaterialProp' })
      } else if (id === 2) {
        this.$router.push({ name: 'OutpatientMedicineMaterialProp' })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container {
    .title {
      width: 800px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
    }
  }
</style>

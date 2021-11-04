<template>
  <!-- 系统设置首页 -->
  <div class="app-container">
    <div class="title">
      <span>页面布局管理</span>
    </div>
    <el-row>
      <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first"
    }
  }
}
</script>
<style lang="scss" scoped></style>

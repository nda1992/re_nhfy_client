<template>
  <!-- 页面内容展示管理 -->
  <div class="app-container">
    <div class="title">
      <span>页面内容展示管理</span>
    </div>
    <div>
      <el-row>
        <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-tabs v-model="activeName">
            <el-tab-pane label="医生信息" name="first">
              <DoctorMain />
            </el-tab-pane>
            <el-tab-pane label="常用网站" name="second">
              <usuallywebsiteMain />
            </el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import DoctorMain from './components/display/DoctorMain'
import usuallywebsiteMain from './components/display/usuallywebsiteMain'
export default {
  components: {
    DoctorMain,
    usuallywebsiteMain
  },
  data() {
    return {
      activeName: "first"
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  .title {
    font-size: 18px;
    font-weight: bold;
    color: #123;
    margin-bottom: 10px;
  }
}
</style>

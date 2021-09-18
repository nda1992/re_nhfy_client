<template>
<!-- 辅助系统首页 -->
    <div class="app-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 22px;font-weight: bold">计划或已开发完成的系统</span>
        </div>
        <div v-for="(item, index) in systems" :key="item.id" class="text item">
          <span @click="gotoSystem(id)" class="content">{{ item.content }}</span>
        </div>
      </el-card>
    </div>
</template>
<script>
export default {
  data() {
    return {
      systems: [
        { id: 1, content: '招聘系统(已完成)' },
        { id: 2, content: '考试系统(开发中)' },
        { id: 3, content: '人员报名系统(未知需求)' }],
      dialogVisible: false
    }
  },
  computed() {},
  methods: {
    gotoSystem(id) {
      switch (id) {
        case 1:
          this.$router.push({ path: '/position/list' })
          break
        case 2:
          this.$router.push({ path: '' })
          break
        case 3:
          this.$router.push({ path: '' })
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container{
    .text{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-bottom: 12px;
      .content{
        cursor: pointer;
      }
    }
  }
</style>

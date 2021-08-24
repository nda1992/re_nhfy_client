<template>
<!-- 医院管理首页 -->
    <div class="home-container">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span style="color:#000;letter-spacing:1px;font-size: 18px;">欢迎使用医院管理板块提供的相关功能</span>
          </div>
          <div v-for="(item,index) in items" :key="item.id" class="item">
            {{item.content}}
          </div>
        </el-card>
    </div>
</template>
<script>
export default {
  data() {
    return {
      items: [{ id: 1, content: '员工管理：管理全院员工的相关信息;' }, { id: 2, content: '科室管理：管理全院科室的相关信息;' }, { id: 3, content: '会议室管理：管理会议室的信息、预定等.' }]
    }
  },
  computed() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
  .home-container{
    padding: 0 20px;
    .box-card{
      margin-top: 20px;
      color:#F56C6C;
      .item{
        font-size: 14px;
        margin-bottom: 18px;
      }
    }
  }
</style>

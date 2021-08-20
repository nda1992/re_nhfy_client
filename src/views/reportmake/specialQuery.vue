<template>
  <div class="app-container">
    <div class="title">
      <span style="font-size: 20px;color: #2b2f3a;font-weight: bold;">特殊查询</span>
      <el-dropdown>
        <el-button type="primary">更多功能<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item v-for="(item,index) in menuList" :key="item.id" @click.native="selected">{{item.content}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-divider></el-divider>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuList: [{ id: 1, content: '科室运营情况' }, { id: 2, content: '药耗占比' }, { id: 3, content: '科室不可收费耗材汇总' }, { id: 4, content: '科室耗材金额排名前20' }, { id: 5, content: '科室手术耗材' }, { id: 6, content: '住院病人耗材明细' }]
    }
  },
  methods: {
    selected() {
      this.$router.push({ name: 'DeptOperate' })
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

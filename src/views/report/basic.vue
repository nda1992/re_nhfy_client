<template>
  <!-- 基本数据报表 -->
  <div class="app-container">
    <div class="title">
      <el-dropdown>
        <el-button type="primary">更多功能<i class="el-icon-arrow-down el-icon--right" /></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,index) in menuList" :key="item.id" @click.native="selected(item.id)">{{ item.content }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div>
        <span style="color: #ff6666">(1.基于basic表查询门诊、住院、全院的分类费用和药耗占比;2.基于dc_account表查询门诊、住院、全院的分类费用和药耗占比)</span>
      </div>
    </div>
    <el-divider />
    <router-view />
  </div>
</template>
<script>
import waves from '@/directive/waves'
// 对sessionStorage加密
import { StorageClass } from '@/utils/session'
export default {
  directives: { waves },
  data() {
    return {
      menuList: [{ id: 1, content: 'basic表查询' }, { id: 2, content: 'dc_account表查询' }, { id: 3, content: '可视化' }]
    }
  },
  created() {
    if (StorageClass.getSession('role').role !== 'admin') {
      this.$router.push({ name: 'Page401' })
    }
  },
  methods: {
    // 选择menu跳转
    selected(id) {
      if (id === 1) {
        this.$router.push({ name: 'BasicMedicineAndMaterial' })
      } else if (id === 2) {
        this.$router.push({ name: 'Dc_accountQuery' })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container{
    .title{
      width: 930px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
    }
  }
</style>

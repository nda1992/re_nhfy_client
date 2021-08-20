<template>
  <div class="app-container">
    <div class="title">
      <el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" clearable @change="pickerDate"></el-date-picker>
      <el-input style="width: 200px" placeholder="输入科室进行查询" v-model="searchForm.deptname"></el-input>
      <el-radio v-model="searchForm.type" label="1" border size="medium">门诊</el-radio>
      <el-radio v-model="searchForm.type" label="2" border size="medium">住院</el-radio>
      <el-button @click="search" icon="el-icon-search" type="primary">查询</el-button>
    </div>
    <div class="table-container">
      <span style="margin-bottom: 10px;font-size: 22px;font-weight: bold">科室运营情况</span>
      <el-table border v-loading="listLoading" :data="itemList">

      </el-table>
    </div>
  </div>
</template>
<script>
import { searchDeptOperate } from '@/api/reportmake/reportmake'
export default {
  data() {
    return {
      searchDate: '',
      searchForm: { startDate: '', endDate: '', deptname: '', type: '1' },
      itemList: [],
      listLoading: false
    }
  },
  methods: {
    resetSearchForm() {
      this.searchForm = { startDate: '', endDate: '', deptname: '' }
    },
    pickerDate() {
      this.searchForm.startDate = this.searchDate[0]
      this.searchForm.endDate = this.searchDate[1]
    },
    // 点击搜索按钮触发
    search() {
      this.listLoading = true
      const temp = Object.assign({}, this.searchForm)
      searchDeptOperate(temp).then((res) => {
        this.resetSearchForm()
        const { items } = res
        this.itemList = items
        this.listLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container{
    .title{
      width: 900px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      .el-radio{
        margin: 0;
      }
    }
    .table-container{
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .el-table{
        &:hover{
          box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
        }
      }
    }
  }
</style>

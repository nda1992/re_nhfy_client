<template>
  <div class="app-container">
    <div class="title">
      <el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" clearable @change="pickerDate"></el-date-picker>
      <el-input style="width: 200px" placeholder="输入科室进行查询" v-model="searchForm.deptname" clearable></el-input>
      <el-radio v-model="searchForm.type" label="1" border size="medium">门诊</el-radio>
      <el-radio v-model="searchForm.type" label="2" border size="medium">住院</el-radio>
      <el-button @click="search" icon="el-icon-search" type="primary">查询</el-button>
    </div>
    <div class="table-container">
      <div class="header">
        <span style="margin-bottom: 10px;font-size: 22px;font-weight: bold" v-if="searchForm.type==='1'">门诊科室收入情况</span>
        <span style="margin-bottom: 10px;font-size: 22px;font-weight: bold" v-else>住院科室收入情况</span>
      </div>
      <el-table border v-loading="listLoading" :data="itemList" stripe fit highlight-current-row style="width: 100%;" :height="itemList.length===0?'auto':'650'">
        <!--科室名称-->
        <el-table-column label="科室名称" prop="DEPT_NAME" align="center" min-width="9px">
          <template slot-scope="{row}">
            <span>{{ row.DEPT_NAME }}</span>
          </template>
        </el-table-column>
        <!--检查费-->
        <el-table-column label="检查费" prop="检查费" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.检查费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--诊察费-->
        <el-table-column label="诊察费" prop="诊察费" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.诊察费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--化验费-->
        <el-table-column label="化验费" prop="化验费" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.化验费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--治疗费-->
        <el-table-column label="治疗费" prop="治疗费" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.治疗费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--手术费-->
        <el-table-column label="手术费" prop="手术费" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.手术费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--护理费-->
        <el-table-column label="护理费" prop="护理费" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.护理费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--卫生材料费-->
        <el-table-column label="卫生材料费" prop="卫生材料费" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.卫生材料费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--西药费-->
        <el-table-column label="西药费" prop="西药费" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.西药费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--中成药费-->
        <el-table-column label="中成药费" prop="中成药费" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.中成药费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--中药饮片费-->
        <el-table-column label="中药饮片费" prop="中药饮片费" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.中药饮片费.toFixed(2) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { searchDeptOperate } from '@/api/reportmake/reportmake'
import moment from 'moment'
export default {
  data() {
    return {
      searchDate: '',
      searchForm: { startDate: '', endDate: '', deptname: '', type: '1' },
      itemList: [],
      listLoading: false
    }
  },
  mounted() {
    console.log(this.searchForm.type)
    // 默认的日期为前一天
    this.searchDate = [moment(new Date() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD'), moment(new Date() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')]
    this.searchForm.startDate = moment(new Date() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
    this.searchForm.endDate = moment(new Date() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
  },
  methods: {
    resetSearchForm() {
      this.searchForm = { startDate: '', endDate: '', deptname: '', type: '1' }
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
        const { items } = res
        this.itemList = items
        this.listLoading = false
        this.resetSearchForm()
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
      .header{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      }
      .el-table{
        &:hover{
          box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
        }
      }
    }
  }
</style>

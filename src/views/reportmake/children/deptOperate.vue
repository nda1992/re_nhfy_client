<template>
  <div class="app-container">
    <div class="title">
      <el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" clearable @change="pickerDate"></el-date-picker>
      <el-input style="width: 200px" placeholder="输入科室搜索" v-model="deptname" clearable :disabled="itemList.length===0?true:false" @keyup.enter.native="handleFilter"></el-input>
      <el-radio v-model="searchForm.type" label="1" border size="medium">门诊</el-radio>
      <el-radio v-model="searchForm.type" label="2" border size="medium">住院</el-radio>
      <el-button @click="search" icon="el-icon-search" type="primary">查询</el-button>
    </div>
    <div class="table-container">
      <div class="header">
        <span style="margin-bottom: 10px;font-size: 22px;font-weight: bold" v-if="searchForm.type==='1'">门诊科室收入情况</span>
        <span style="margin-bottom: 10px;font-size: 22px;font-weight: bold" v-else>住院科室收入情况</span>
      </div>
      <el-table :key="tableKey"
                border
                v-loading="listLoading"
                :data="itemList"
                stripe
                fit
                highlight-current-row
                style="width: 100%;"
                :height="itemList.length===0?'auto':'600'">
        <!--科室名称-->
        <el-table-column label="科室名称" prop="DEPT_NAME" align="center" min-width="9px">
          <template slot-scope="{row}">
            <span>{{ row.DEPT_NAME }}</span>
          </template>
        </el-table-column>
        <!--检查费-->
        <el-table-column label="检查费" sortable :sort-method="sortByJCF" prop="检查费" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.检查费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--诊察费-->
        <el-table-column label="诊察费" prop="诊察费" sortable :sort-method="sortByZCF" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.诊察费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--化验费-->
        <el-table-column label="化验费" prop="化验费" sortable :sort-method="sortByHYF" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.化验费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--治疗费-->
        <el-table-column label="治疗费" prop="治疗费" sortable :sort-method="sortByZLF" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.治疗费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--手术费-->
        <el-table-column label="手术费" prop="手术费" sortable :sort-method="sortBySSF" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.手术费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--护理费-->
        <el-table-column label="护理费" prop="护理费" sortable :sort-method="sortByHLF" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.护理费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--卫生材料费-->
        <el-table-column label="卫生材料费" prop="卫生材料费" sortable :sort-method="sortByWSCLF" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.卫生材料费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--西药费-->
        <el-table-column label="西药费" prop="西药费" sortable :sort-method="sortByXYF" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.西药费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--中成药费-->
        <el-table-column label="中成药费" prop="中成药费" sortable :sort-method="sortByZCYF" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.中成药费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--中药饮片费-->
        <el-table-column label="中药饮片费" prop="中药饮片费" sortable :sort-method="sortByZYYPF" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.中药饮片费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--合计-->
        <el-table-column label="合计" sortable :sort-method="sortBySum" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.检查费+row.诊察费+row.化验费+row.治疗费+row.手术费+row.护理费+row.卫生材料费+row.西药费+row.中成药费+row.中药饮片费)*100)/100 }}</span>
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
      List: [],
      tableKey: 0,
      searchDate: '',
      searchForm: { startDate: '', endDate: '', type: '1' },
      itemList: [],
      listLoading: false,
      // 需要搜索的科室
      deptname: ''
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
    // input按科室搜索
    handleFilter() {
      this.itemList = this.List.filter(item => item.DEPT_NAME.match(this.deptname))
    },
    resetSearchForm() {
      this.searchForm = { startDate: '', endDate: '', type: '1' }
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
        this.List = items
        this.listLoading = false
        this.resetSearchForm()
      })
    },
    /* *********************************排序***************************** */
    sortBySum(val1, val2) {
      return val1.合计 - val2.合计
    },
    sortByJCF(val1, val2) {
      return val1.检查费 - val2.检查费
    },
    sortByZCF(val1, val2) {
      return val1.诊察费 - val2.诊察费
    },
    sortByHYF(val1, val2) {
      return val1.化验费 - val2.化验费
    },
    sortByZLF(val1, val2) {
      return val1.治疗费 - val2.治疗费
    },
    sortBySSF(val1, val2) {
      return val1.手术费 - val2.手术费
    },
    sortByHLF(val1, val2) {
      return val1.护理费 - val2.护理费
    },
    sortByWSCLF(val1, val2) {
      return val1.卫生材料费 - val2.卫生材料费
    },
    sortByXYF(val1, val2) {
      return val1.西药费 - val2.西药费
    },
    sortByZCYF(val1, val2) {
      return val1.中成药费 - val2.中成药费
    },
    sortByZYYPF(val1, val2) {
      return val1.中药饮片费 - val2.中药饮片费
    }
    /* *********************************排序的相关方法结束***************************** */
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

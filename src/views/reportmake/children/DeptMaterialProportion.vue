<template>
<!--  住院科室耗占比-->
  <div class="app-container">
    <div class="title">
      <el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" clearable @change="pickerDate"></el-date-picker>
      <el-input placeholder="请输入科室名称搜索" style="width: 200px" clearable v-model="deptname" @keyup.enter.native="handleFilter" :disabled="showItems.length===0?true:false"></el-input>
      <el-button @click="search" icon="el-icon-search" type="primary">查询</el-button>
      <el-button @click="handleDownload" icon="el-icon-download" type="success">导出表格</el-button>
    </div>
    <div class="table-container">
      <div class="header">
        <span style="margin-bottom: 10px;font-size: 22px;font-weight: bold">住院科室耗占比</span>
        <span class="sum">耗材总费用: {{ sum }}</span>
      </div>
      <el-table
      :key="tableKey"
      border
      stripe
      fix
      highlight-current-row
      v-loading="listLoading"
      :height="showItems.length===0?'auto':'600'"
      :data="showItems"
      >
        <el-table-column label="序号" prop="xh" align="center" min-width="3px">
          <template slot-scope="{row}">
            <span>{{ row.XH }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类别" prop="类别" align="center" min-width="8px">
          <template slot-scope="{row}">
            <span>{{ row.类别 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="科室" prop="科室" align="center" min-width="11px">
          <template slot-scope="{row}">
            <span>{{ row.科室 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="费用总计" prop="费用总计" align="center" min-width="11px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.费用总计)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="耗材总费用" prop="耗材总费用" align="center" min-width="11px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.耗材总费用)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="护理耗材" prop="护理耗材" align="center" min-width="11px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.护理耗材)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="高值耗材" prop="高值耗材" align="center" min-width="11px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.高值耗材)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="普通耗材" prop="普通耗材" align="center" min-width="11px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.普通耗材)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="药品总费用" prop="药品总费用" align="center" min-width="11px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.药品总费用)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="耗占比" sortable :sort-method="soryByHZB" prop="耗占比" align="center" min-width="11px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.耗占比)*100)/100 }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { getdeptMaterialProportion } from '@/api/reportmake/reportmake'
export default {
  name: 'deptMaterialProportion',
  data() {
    return {
      tableKey: 0,
      searchDate: '',
      searchForm: { startDate: '', endDate: '' },
      deptname: '',
      listLoading: false,
      downloadLoading: false,
      tempList: [],
      showItems: [],
      // 耗材总费用
      sum: 0
    }
  },
  mounted() {
    // 默认的日期为前一天
    this.searchDate = [moment(new Date() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD'), moment(new Date() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')]
    this.searchForm.startDate = moment(new Date() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
    this.searchForm.endDate = moment(new Date() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
  },
  methods: {
    handleFilter() {
      this.showItems = this.tempList.filter(item => item.科室.match(this.deptname))
    },
    pickerDate() {
      this.searchForm.startDate = this.searchDate[0]
      this.searchForm.endDate = this.searchDate[1]
    },
    search() {
      this.listLoading = true
      getdeptMaterialProportion(this.searchForm).then(res => {
        const { msg, items, sum } = res
        this.sum = sum
        this.showItems = items
        this.tempList = items.filter(v => v.科室 !== null)
        this.$message.success(msg)
        this.listLoading = false
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['序号', '类别', '科室名称', '费用总计', '耗材总费用', '护理耗材', '高值耗材', '普通耗材', '药品总费用', '耗占比']
        const data = this.formatJson()
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '费用'
        })
        this.downloadLoading = false
      })
    },
    formatJson() {
      const data = []
      this.showItems.forEach(item => {
        const temp = []
        temp.push(item.XH, item.类别, item.科室名称, item.费用总计, item.耗材总费用, item.护理耗材, item.高值耗材, item.普通耗材, item.药品总费用, item.耗占比)
        data.push(temp)
      })
      return data
    },
    // 根据耗占比排序
    soryByHZB(val1, val2) {
      return val1.耗占比 - val2.耗占比
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container{
    padding: 0;
    .title{
      width: 800px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .el-radio{
        margin: 0;
      }
    }
    .table-container{
      .header{
        position: relative;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .sum{
          float: left;
          position: absolute;
          bottom: 20px;
          right: 30px;
          color: #ff6666;
        }
      }
      .el-table{
        font-size: 12px;
        &:hover{
          box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
        }
      }
    }
  }
</style>

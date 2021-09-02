<template>
<!--门诊和住院药占比-->
  <div class="app-container">
    <div class="title">
      <el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" clearable @change="pickerDate"></el-date-picker>
      <el-input placeholder="请输入科室名称搜索" style="width: 200px" clearable v-model="deptname" @keyup.enter.native="handleFilter" :disabled="showItems.length===0?true:false"></el-input>
      <el-button @click="search" icon="el-icon-search" type="primary">查询</el-button>
      <el-button @click="handleDownload" icon="el-icon-download" type="success">导出表格</el-button>
    </div>
    <div class="table-container">
      <div class="header">
        <span style="margin-bottom: 10px;font-size: 22px;font-weight: bold">全院科室药占比</span>
        <span class="sum">药品总费用: {{ sum }}</span>
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
        <el-table-column label="序号" prop="xh" align="center" min-width="5px">
          <template slot-scope="{row}">
            <span>{{ row.xh }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类别" prop="类别" align="center" min-width="6px">
          <template slot-scope="{row}">
            <span>{{ row.类别 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="科室" prop="科室" align="center" min-width="15px">
          <template slot-scope="{row}">
            <span>{{ row.科室 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="药占比"  sortable :sort-method="soryByYZB" prop="药占比" align="center" min-width="11px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.药占比)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="费用总计" prop="费用总计" align="center" min-width="11px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.费用总计)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="药费费用" prop="药费费用" align="center" min-width="11px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.药费费用)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="草药费用" prop="草药费用" align="center" min-width="11px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.草药费用)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="国家谈判品种" prop="国家谈判品种" align="center" min-width="11px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.国家谈判品种)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="耗材费用" prop="耗材费用" align="center" min-width="11px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.耗材费用)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="重点监管药品" prop="重点监管药品" align="center" min-width="11px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.重点监管药品)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="国家辅助用药" prop="国家辅助用药" align="center" min-width="11px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.国家辅助用药)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="PPI" prop="PPI" align="center" min-width="8px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.PPI)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="抗菌药品" prop="抗菌药品" align="center" min-width="11px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.抗菌药品)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="中枢止吐" prop="中枢止吐" align="center" min-width="11px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.中枢止吐)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="口服中成药" prop="口服中成药" align="center" min-width="11px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.口服中成药)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="中药注射剂" prop="中药注射剂" align="center" min-width="11px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.中药注射剂)*100)/100 }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getdeptMedicientProportion } from '@/api/reportmake/reportmake'
import moment from 'moment'
export default {
  name: 'deptMaterialProportion',
  data() {
    return {
      tableKey: 0,
      deptname: '',
      searchDate: '',
      searchForm: { startDate: '', endDate: '' },
      tempList: [],
      showItems: [],
      listLoading: false,
      downloadLoading: false,
      // 药品总费用
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
      getdeptMedicientProportion(this.searchForm).then(res => {
        const { items, msg, sum } = res
        this.sum = sum
        this.showItems = items
        this.tempList = items.filter(v => v !== null)
        this.$message.success(msg)
        this.listLoading = false
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['序号', '类别', '科室', '药占比', '费用总计', '药费费用', '草药费用', '国家谈判品种', '耗材费用', '重点监管药品', '国家辅助用药', 'PPI', '抗菌药品', '中枢呕吐', '口服中成药', '中药注射剂']
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
        temp.push(item.xh, item.类别, item.科室, item.药占比, item.费用总计, item.药费费用, item.草药费用, item.国家谈判品种, item.耗材费用, item.重点监管药品, item.国家辅助用药, item.PPI, item.抗菌药品, item.中枢呕吐, item.口服中成药, item.中药注射剂)
        data.push(temp)
      })
      return data
    },
    soryByYZB(val1, val2) {
      return val1.药占比 - val2.药占比
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

<template>
  <div class="app-container">
    <div class="title">
      <el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" clearable @change="pickerDate" />
      <el-tooltip effect="dark" content="按回车键搜索" placement="bottom">
        <el-input v-model="deptname" placeholder="请输入科室名称搜索" style="width: 200px" clearable :disabled="showItems.length===0?true:false" @keyup.enter.native="handleFilter" />
      </el-tooltip>
      <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
      <el-button icon="el-icon-download" type="success" :loading="downloadLoading" @click="handleDownload">导出表格</el-button>
    </div>
    <div class="table-container">
      <div class="header">
        <span style="margin-bottom: 10px;font-size: 22px;font-weight: bold">科室使用金额排名前20的耗材</span>
      </div>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        border
        stripe
        fix
        highlight-current-row
        :height="showItems.length===0?'auto':'600'"
        :data="showItems"
      >
        <el-table-column label="序号" prop="xh" align="center" min-width="3px">
          <template slot-scope="{row}">
            <span>{{ row.XH }}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="排序" align="center" min-width="4px">
          <template slot-scope="{row}">
            <span>{{ row.排序 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="科室" prop="xh" align="center" min-width="11px">
          <template slot-scope="{row}">
            <span>{{ row.科室 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目名" prop="项目名" align="center" min-width="20px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.项目名 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="耗材类型" prop="耗材类型" align="center" min-width="6px">
          <template slot-scope="{row}">
            <span>{{ row.耗材类型 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量" prop="数量" align="center" min-width="5px">
          <template slot-scope="{row}">
            <span>{{ row.数量 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单价" prop="单价" align="center" min-width="5px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.单价)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="金额" prop="金额" align="center" min-width="5px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.金额)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否护理类" prop="是否护理类" align="center" min-width="5px">
          <template slot-scope="{row}">
            <span>{{ row.是否护理类 }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="search" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Pagination from '@/components/Pagination'
import { getdeptMaterialAmountTop20 } from '@/api/reportmake/reportmake'
// 对sessionStorage加密
import { StorageClass } from '@/utils/session'
export default {
  name: 'DeptMaterialAmountTop20',
  components: { Pagination },
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        role: StorageClass.getSession('role').role
      },
      tableKey: 0,
      searchDate: '',
      searchForm: { startDate: '', endDate: '' },
      deptname: '',
      listLoading: false,
      downloadLoading: false,
      tempList: [],
      showItems: []
    }
  },
  mounted() {
    // 默认的日期为前一天
    this.searchDate = [moment(new Date() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD'), moment(new Date() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')]
    this.searchForm.startDate = moment(new Date() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
    this.searchForm.endDate = moment(new Date() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
  },
  methods: {
    pickerDate() {
      this.searchForm.startDate = this.searchDate[0]
      this.searchForm.endDate = this.searchDate[1]
    },
    handleFilter() {
      this.showItems = this.tempList.filter(item => item.科室.match(this.deptname))
    },
    search() {
      this.listLoading = true
      const temp = Object.assign({}, this.listQuery, this.searchForm)
      getdeptMaterialAmountTop20(temp).then(res => {
        const { msg, items, total } = res
        this.total = total
        this.showItems = items
        this.tempList = items.filter(v => v.科室 !== null)
        this.$message.success(msg)
        this.listLoading = false
      })
    },
    async handleDownload() {
      this.downloadLoading = true
      const { items } = await getdeptMaterialAmountTop20(this.searchForm)
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['序号', '排序', '科室', '项目名', '耗材类型', '数量', '单价', '金额', '是否护理类']
        const data = this.formatJson(items)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '费用'
        })
        this.downloadLoading = false
      })
    },
    formatJson(items) {
      const data = []
      items.forEach(item => {
        const temp = []
        temp.push(item.XH, item.排序, item.科室, item.项目名, item.耗材类型, item.数量, item.单价, item.金额, item.是否护理类)
        data.push(temp)
      })
      return data
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container{
    box-sizing: content-box;
    padding: 0 !important;
    margin: 0 20px;
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
    .pagination-container{
      margin: 0;
    }
  }
</style>

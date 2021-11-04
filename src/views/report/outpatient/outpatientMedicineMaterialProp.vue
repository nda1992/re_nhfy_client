<template>
  <div class="app-container">
    <div class="title">
      <el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" clearable @change="pickerDate" />
      <el-button @click="inpatientMedicineMaterialProp" type="primary">查询</el-button>
      <el-button @click="download" class="el-icon-download" type="success">导出</el-button>
    </div>
    <div class="table-contaner">
      <el-table
        :data="list"
        :key="tableKey"
        v-loading="listLoading"
        border
        stripe
        fix
        highlight-current-row
        :height="list.length===0?'auto':'600'"
      >
        <el-table-column label="序号" prop="序号" align="center" min-width="3px">
          <template slot-scope="{row}">
            <span>{{ row.序号 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="统计时间" prop="统计时间" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.统计时间 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开单科室" prop="开单科室" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.开单科室 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总收入" prop="总收入" sortable :sort-method="sortByZSR" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.总收入 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="医疗有效收入" sortable :sort-method="sortByYLYXSR" prop="医疗有效收入" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.医疗有效收入 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="医疗服务收入" sortable :sort-method="sortByYLFWSR" prop="医疗服务收入" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.医疗服务收入 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="药占比" prop="药占比" sortable :sort-method="sortByYZB" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.药占比 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="耗占比" prop="耗占比" sortable :sort-method="sortByHZB" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.耗占比 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="医疗有效收入占比" prop="医疗有效收入占比" sortable :sort-method="sortByYLYXSRZB" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.医疗有效收入占比 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="医疗服务收入占比" prop="医疗服务收入占比" sortable :sort-method="sortByYLFWSRZB" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.医疗服务收入占比 }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getoutpatientMedicineMaterialProp } from '@/api/report/outpatient'
import moment from 'moment'
export default {
  name: 'outpatientMedicineMaterialProp',
  data() {
    return {
      // 查询的日期
      searchForm: {},
      searchDate: '',
      listLoading: false,
      list: [],
      start_date: undefined,
      end_date: undefined,
      tableKey: 0
    }
  },
  mounted() {
    // 默认的日期为前一天
    this.searchDate = [moment(new Date() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD'), moment(new Date() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')]
    this.start_date = this.searchDate[0].trim().slice(0, 10)
    this.end_date = this.searchDate[1].trim().slice(0, 10)
    this.searchForm.startDate = moment(new Date() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
    this.searchForm.endDate = moment(new Date() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
  },
  methods: {
    pickerDate() {
      this.start_date = this.searchDate[0].trim().slice(0, 10)
      this.end_date = this.searchDate[1].trim().slice(0, 10)
    },
    inpatientMedicineMaterialProp() {
      this.listLoading = true
      const temp = Object.assign({}, { startDate: this.start_date, endDate: this.end_date })
      getoutpatientMedicineMaterialProp(temp).then(res => {
        this.listLoading = false
        const { items } = res
        this.list = items
      })
    },
    // 排序函数
    sortByZSR(val1, val2) {
      return val1.总收入 - val2.总收入
    },
    sortByYLYXSR(val1, val2) {
      return val1.医疗有效收入 - val2.医疗有效收入
    },
    sortByYLFWSR(val1, val2) {
      return val1.医疗服务收入 - val2.医疗服务收入
    },
    sortByYZB(val1, val2) {
      return val1.药占比 - val2.药占比
    },
    sortByHZB(val1, val2) {
      return val1.耗占比 - val2.耗占比
    },
    sortByYLYXSRZB(val1, val2) {
      return val1.医疗有效收入占比 - val2.医疗有效收入占比
    },
    sortByYLFWSRZB(val1, val2) {
      return val1.医疗服务收入占比 - val2.医疗服务收入占比
    },
    download() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['统计时间', '开单科室', '总收入', '医疗有效收入', '医疗服务收入', '药占比', '耗占比', '医疗有效收入占比', '医疗服务收入占比']
        const data = this.formatJson(this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '门诊科室药耗占比'
        })
      })
    },
    formatJson(items) {
      const data = []
      items.forEach(item => {
        const temp = []
        temp.push(item.统计时间, item.开单科室, item.总收入, item.医疗有效收入, item.医疗服务收入, item.药占比, item.耗占比, item.医疗有效收入占比, item.医疗服务收入占比)
        data.push(temp)
      })
      return data
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 0;
    .title {
      width: 550px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
  }
</style>

<template>
<!--  各科室门诊人均费用-->
  <div class="app-container">
    <div class="title">
      <el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" clearable @change="pickerDate" />
      <el-button @click="query" type="primary">查询</el-button>
      <el-button @click="download" class="el-icon-download" type="success">导出</el-button>
      <el-select
        v-model="searchVal"
        :remote-method="getRemoteDeptList"
        filterable
        default-first-option
        remote
        placeholder="搜索科室"
      >
        <el-option
          v-for="(item, index) in deptListOptions"
          :key="item + index"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-tooltip class="item" effect="dark" content="按下回车键搜索结果" placement="bottom">
        <el-input v-model="searchVal" style="width: 200px;" clearable @keyup.enter.native="handleFilter" />
      </el-tooltip>
    </div>
    <div class="tabs">
      <el-tabs v-model="active">
        <el-tab-pane label="门诊人均费用科室排名" name="first">
          <showData :listLoading="listLoading" :data="show_data" />
        </el-tab-pane>
        <el-tab-pane label="可视化" name="second">
          <Visual />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { getAvgRevenueByDept } from '@/api/report/outpatient'
import { searchDept } from '@/api/news/news'
import showData from './components/showData'
import Visual from './components/Visual'
export default {
  name: 'avgRevenueByDept',
  components: {
    showData,
    Visual
  },
  data() {
    return {
      // 查询的日期
      searchForm: {},
      searchDate: '',
      listLoading: false,
      list: [],
      start_date: undefined,
      end_date: undefined,
      tableKey: 0,
      active: 'first',
      searchVal: undefined,
      show_data: [],
      deptListOptions: []
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
    handleFilter() {
      this.show_data = this.list.filter(item => {
        return item.科室名称.match(this.searchVal)
      })
    },
    pickerDate() {
      this.start_date = this.searchDate[0].trim().slice(0, 10)
      this.end_date = this.searchDate[1].trim().slice(0, 10)
    },
    query() {
      this.listLoading = true
      const temp = Object.assign({}, { startDate: this.start_date, endDate: this.end_date })
      getAvgRevenueByDept(temp).then(res => {
        const { items } = res
        this.list = items
        this.show_data = items
        this.listLoading = false
      })
    },
    download() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['排名', '科室名称', '总费用', '总人次', '人均费用']
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
        temp.push(item.序号, item.科室名称, item.总费用, item.总人次, item.人均费用)
        data.push(temp)
      })
      return data
    },
    // 获取部门
    getRemoteDeptList(query) {
      searchDept(query).then(res => {
        const { items } = res
        if (!items) return
        this.deptListOptions = items.map(v => v.name)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 0;
    .title {
      width: 1000px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
  }
</style>

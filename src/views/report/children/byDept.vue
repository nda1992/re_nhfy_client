<template>
    <div class="app-container">
      <div class="title">
        <el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" clearable @change="pickerDate" />
        <el-select
          v-model="searchForm.dept"
          :loading="select_loading"
          :remote-method="getRemoteDeptList"
          filterable
          default-first-option
          remote
          placeholder="搜索科室"
          size="medium">
          <el-option v-for="(item, index) in deptListOptions" :key="item + index" :label="item" :value="item" />
        </el-select>
        <el-select v-model="searchForm.type" size="medium">
          <el-option v-for="item in typeItems" :key="item.id" :label="item.item" :value="item.item" />
        </el-select>
        <el-select v-model="sys" placeholder="请选择要查询的系统" size="medium">
          <el-option v-for="(item) in sysItems" :key="item.id" :label="item.item" :value="item.item" />
        </el-select>
        <el-button type="primary" @click="search" size="medium">查询</el-button>
      </div>
      <div class="data">
        <span v-show="showDept !== undefined">
          {{ showDept }}:{{ showItem }}
        </span>
      </div>
    </div>
</template>
<script>
import { searchDept } from '@/api/news/news'
import { searchByDept } from '@/api/basic/basic'
import moment from 'moment'
export default {
  data() {
    return {
      // 科室
      searchForm: {
        dept: '',
        type: '门诊'
      },
      typeItems: [{ id: 1, item: '门诊' }, { id: 2, item: '入院' }, { id: 3, item: '出院' }],
      select_loading: false,
      deptListOptions: [],
      start_date: undefined,
      end_date: undefined,
      searchDate: '',
      showItem: undefined,
      sys: '新系统',
      sysItems: [{ id: 1, item: '新系统' }, { id: 2, item: '旧系统' }],
      showDept: undefined
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
    // 获取部门
    getRemoteDeptList(query) {
      this.select_loading = true
      searchDept(query).then((response) => {
        const { items } = response
        if (!items) return
        this.deptListOptions = items.map((v) => v.name)
      })
      this.select_loading = false
    },
    search() {
      const temp = Object.assign({}, this.searchForm, { startDate: this.start_date, endDate: this.end_date }, { sys: this.sys })
      searchByDept(temp).then(res => {
        const { items, 科室名称 } = res
        this.showItem = items[0]
        this.showDept = 科室名称
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.app-container {
  padding: 0;
  .title {
    width: 1100px;
    display: flex;
    justify-content: space-between;
  }
  .data {
    margin-top: 20px;
  }
}
</style>

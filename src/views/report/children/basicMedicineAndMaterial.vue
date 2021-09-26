<template>
  <div class="app-container">
    <div class="title">
      <el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" clearable @change="pickerDate" />
      <el-radio-group v-model="searchForm.type" style="display: flex;justify-content:space-around;width: 180px;">
        <el-radio label="1" border size="medium">门诊</el-radio>
        <el-radio label="2" border size="medium">住院</el-radio>
        <el-radio label="3" border size="medium">全院</el-radio>
      </el-radio-group>
      <el-button type="primary" icon="el-icon-search" size="medium" @click="search">查询</el-button>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import { StorageClass } from '@/utils/session'
import { basicMedicineAndMaterial } from '@/api/basic/basic'
import moment from 'moment'
export default {
  data() {
    return {
      searchForm: { type: '1' },
      // 查询的日期
      searchDate: '',
      listLoading: false,
      items: [],
      start_date: undefined,
      end_date: undefined,
      tableKey: 0
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
      this.start_date = this.searchDate[0].trim().slice(0, 7)
      this.end_date = this.searchDate[1].trim().slice(0, 7)
    },
    search() {
      const temp = Object.assign({}, { role: StorageClass.getSession('role').role, startDate: this.start_date, endDate: this.end_date }, this.searchForm)
      basicMedicineAndMaterial(temp).then(res => {
        const { items, msg } = res
        this.$message.success(msg)
        const items_keys = Object.keys(items[0])
        const items_values = Object.values(items[0])
        let i = 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 0;
    .title {
      width: 800px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-radio{
        margin: 11px;
      }
    }
  }
</style>

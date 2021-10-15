<template>
  <div class="app-container">
    <div class="title">
      <el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" clearable @change="pickerDate" />
      <div>
        <el-radio-group v-model="searchForm.type" style="display: flex;justify-content:space-around;width: 180px;">
          <el-radio label="1" border size="medium">门诊</el-radio>
          <el-radio label="2" border size="medium">住院</el-radio>
          <el-radio label="3" border size="medium">全院</el-radio>
        </el-radio-group>
      </div>
      <el-select v-model="sys" placeholder="请选择要查询的系统" size="medium">
      <el-option v-for="(item) in sysItems" :key="item.id" :label="item.item" :value="item.id" />
      </el-select>
      <el-button type="primary" icon="el-icon-search" size="medium" @click="search">查询</el-button>
    </div>
    <div style="color: #ff6666;font-size: 12px">
      <ul>
        <li>药占比=(药品总额-中药饮片金额-国家谈判品种)/总金额</li>
        <li>耗占比=耗材金额/(总金额-药品金额)</li>
        <li>新系统数据范围：2020-09-12~昨天；旧系统数据范围:2016-01-01~2020-09-11</li>
      </ul>
    </div>
    <el-divider />
    <div>
      <h3>{{ showTitle }}</h3>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          {{ item }}
        </li>
      </ul>
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
      tableKey: 0,
      showTitle: '',
      // sys=new_his或sys=db2
      sys: '新系统',
      sysItems: [{ id: 1, item: '新系统' }, { id: 2, item: '旧系统' }]
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
    search() {
      this.listLoading = true
      const temp = Object.assign({}, { role: StorageClass.getSession('role').role }, this.searchForm, { startDate: this.start_date, endDate: this.end_date }, { sys: this.sys })
      basicMedicineAndMaterial(temp).then(res => {
        this.listLoading = false
        const { items, msg, tip } = res
        this.$message.success(msg)
        this.showTitle = tip
        this.items = JSON.stringify(items[0]).replace('{', '').replace('}', '').split(',')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 0;
    .title {
      width: 1100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    ul{
      li{
        list-style: none;
        margin-top: 8px;
      }
    }
  }
</style>

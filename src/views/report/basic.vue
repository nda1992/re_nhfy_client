<template>
    <!-- 基本数据报表 -->
    <div class="app-container">
        <div class="title">
          <el-dropdown>
            <el-button type="primary">更多功能<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item v-for="(item,index) in menuList" :key="item.id">{{item.content}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" clearable @change="pickerDate"></el-date-picker>
          <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload" style="margin-left: 0">导出表格</el-button>
        </div>
      <el-divider></el-divider>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="items"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="科室编号" prop="deptCode" sortable="custom" align="center" min-width="15px">
          <template slot-scope="{row}">
            <span>{{ row.deptCode }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
import waves from '@/directive/waves'
import { medicalRevenue } from '@/api/report/report'
export default {
    directives: { waves },
    data() {
        return{
          downloadLoading: false,
          menuList: [{ id: 1, content: '医疗收入情况' }, { id: 2, content: '医疗运营情况' }, { id: 3, content: '其他操作' }],
          // 查询的日期
          searchDate: '',
          // 需要显示的年份
          year: '',
          // 需要显示的月份
          month: '',
          tableKey: 0,
          listLoading: true,
          items: []
        }
    },
    computed: {

    },
    methods: {
      pickerDate() {
        // console.log(this.searchDate)
        const start_date = this.searchDate[0].trim().slice(0, 7)
        const end_date = this.searchDate[1].trim().slice(0, 7)
        const obj = { role: localStorage.getItem('role'), start_date: start_date, end_date: end_date }
        // console.log(obj)
        medicalRevenue(obj).then(res => {
          const { items } = res
          this.items = items

        })
      },
      // 导出到excel
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['科室编号', '科室名称', '科室领导', '科室级别', '科室地址', '科室简介']
          const filterVal = ['科室编号', '科室名称', '科室领导', '科室级别', '科室地址', '科室简介']
          const data = this.formatJson(filterVal)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'test'
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal) {
        let data=[]
        this.searchList.forEach(item=>{
          let temp=[]
          temp.push(item.deptCode,item.deptName,item.deptLeader,item.level,item.deptAddr,item.desc)
          data.push(temp)
        })
        return data
      }
    }
}
</script>
<style lang="scss" scoped>
  .app-container{
    .title{
      width: 650px;
      display: flex;
      justify-content: space-around;
    }
  }
</style>

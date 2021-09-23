<template>
  <!-- 基本数据报表 -->
  <div class="app-container">
    <div class="title">
      <el-dropdown>
        <el-button type="primary">更多功能<i class="el-icon-arrow-down el-icon--right" /></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,index) in menuList" :key="item.id">{{ item.content }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" clearable @change="pickerDate" />
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="success" icon="el-icon-download" style="margin-left: 0" @click="handleDownload">导出表格</el-button>
      <div style="color:#FF6600;font-size: 12px">注意：所选月份在数据库中没有数据时，表格中将不显示！</div>
    </div>
    <el-divider />
    <div v-if="searchDate!==''" style="font-size: 18px;margin-bottom: 10px;font-weight: bold">南华大学附属第一医院{{ searchDate[0].slice(0,7) }}~{{ searchDate[1].slice(0,7) }}医疗收入情况表</div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="items"
      :height="items.length===0?'auto':'750'"
      stripe
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="时间" prop="时间" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.时间 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医疗总收入" prop="医疗总收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.医疗总收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门诊总收入" prop="门诊总收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.门诊总收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门诊诊察收入" prop="门诊诊察收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.门诊诊察收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门诊检查收入" prop="门诊检查收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.门诊检查收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门诊化验收入" prop="门诊化验收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.门诊化验收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门诊治疗收入" prop="门诊治疗收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.门诊治疗收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门诊手术收入" prop="门诊手术收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.门诊手术收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门诊卫生材料收入" prop="门诊卫生材料收入" align="center" width="120px">
        <template slot-scope="{row}">
          <span>{{ row.门诊卫生材料收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门诊药品收入" prop="门诊药品收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.门诊药品收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门诊西药收入" prop="门诊西药收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.门诊西药收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门诊中成药收入" prop="门诊中成药收入" align="center" width="110px">
        <template slot-scope="{row}">
          <span>{{ row.门诊中成药收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门诊中药饮片收入" prop="门诊中药饮片收入" align="center" width="120px">
        <template slot-scope="{row}">
          <span>{{ row.门诊中药饮片收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门诊其他收入" prop="门诊其他收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.门诊其他收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门诊医疗服务收入" prop="门诊医疗服务收入" align="center" width="120px">
        <template slot-scope="{row}">
          <span>{{ row.门诊医疗服务收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门诊医疗有效收入" prop="门诊医疗有效收入" align="center" width="120px">
        <template slot-scope="{row}">
          <span>{{ row.门诊医疗有效收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住院总收入" prop="住院总收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.住院总收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住院床位收入" prop="住院床位收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.住院床位收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住院诊察收入" prop="住院诊察收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.住院诊察收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住院检查收入" prop="住院检查收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.住院检查收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住院化验收入" prop="住院化验收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.住院化验收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住院治疗收入" prop="住院治疗收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.住院治疗收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住院手术收入" prop="住院手术收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.住院手术收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住院护理收入" prop="住院护理收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.住院护理收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住院卫生材料收入" prop="住院卫生材料收入" align="center" width="120px">
        <template slot-scope="{row}">
          <span>{{ row.住院卫生材料收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住院药品收入" prop="住院药品收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.住院药品收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住院西药收入" prop="住院西药收入" align="center" width="110px">
        <template slot-scope="{row}">
          <span>{{ row.住院西药收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住院中成药收入" prop="住院中成药收入" align="center" width="110px">
        <template slot-scope="{row}">
          <span>{{ row.住院中成药收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住院中草药收入" prop="住院中草药收入" align="center" width="110px">
        <template slot-scope="{row}">
          <span>{{ row.住院中草药收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住院其他收入" prop="住院其他收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.住院其他收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住院医疗服务收入" prop="住院医疗服务收入" align="center" width="120px">
        <template slot-scope="{row}">
          <span>{{ row.住院医疗服务收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住院医疗有效收入" prop="住院医疗有效收入" align="center" width="120px">
        <template slot-scope="{row}">
          <span>{{ row.住院医疗有效收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医疗服务收入" prop="医疗服务收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.医疗服务收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医疗有效收入" prop="医疗y有效收入" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.医疗有效收入 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="药占比" prop="药占比" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.药占比 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="耗占比" prop="耗占比" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.耗占比 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门急诊人次" prop="门急诊人次" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.门急诊人次 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门急诊人均费用" prop="门急诊人均费用" align="center" width="110px">
        <template slot-scope="{row}">
          <span>{{ row.门急诊人均费用 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住院人次" prop="住院人次" align="center" width="80px">
        <template slot-scope="{row}">
          <span>{{ row.住院人次 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住院人均费用" prop="住院人均费用" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.住院人均费用 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平均住院日" prop="平均住院日" align="center" width="100px">
        <template slot-scope="{row}">
          <span>{{ Math.floor((row.平均住院日)*100)/100 }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import waves from '@/directive/waves'
import { medicalRevenue } from '@/api/report/report'
// 对sessionStorage加密
import { StorageClass } from '@/utils/session'
export default {
  directives: { waves },
  data() {
    return {
      downloadLoading: false,
      menuList: [{ id: 1, content: '医疗收入情况' }, { id: 2, content: '医疗运营情况' }, { id: 3, content: '可视化' }],
      // 查询的日期
      searchDate: '',
      tableKey: 0,
      listLoading: false,
      items: []
    }
  },
  computed: {

  },
  created() {
    if (StorageClass.getSession('role').role !== 'admin') {
      this.$router.push({ name: 'Page401' })
    }
  },
  methods: {
    pickerDate() {
      const start_date = this.searchDate[0].trim().slice(0, 7)
      const end_date = this.searchDate[1].trim().slice(0, 7)
      const obj = { role: StorageClass.getSession('role').role, start_date: start_date, end_date: end_date }
      this.listLoading = true
      medicalRevenue(obj).then(res => {
        const { items } = res
        this.items = items
        this.listLoading = false
      })
    },
    // 导出到excel
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['时间', '医疗总收入', '门诊总收入', '门诊诊察收入', '门诊诊察收入', '门诊检查收入', '门诊化验收入', '门诊治疗收入', '门诊手术收入', '门诊卫生材料收入', '门诊药品收入', '门诊西药收入', '门诊中成药收入', '门诊中药饮片收入', '门诊医疗服务收入', '门诊医疗有效收入', '住院总收入', '住院床位收入', '住院诊察收入', '住院检查收入', '住院化验收入', '住院治疗收入', '住院手术收入', '住院护理收入', '住院卫生材料收入', '住院药品收入', '住院西药收入', '住院中成药收入', '住院中草药收入', '住院其他收入', '住院医疗服务收入', '住院医疗有效收入', '医疗服务收入', '医疗有效收入', '药占比', '耗占比', '门急诊人次', '门急诊人均费用', '住院人次', '住院人均费用', '平均住院日']
        const filterVal = ['时间', '医疗总收入', '门诊总收入', '门诊诊察收入', '门诊诊察收入', '门诊检查收入', '门诊化验收入', '门诊治疗收入', '门诊手术收入', '门诊卫生材料收入', '门诊药品收入', '门诊西药收入', '门诊中成药收入', '门诊中药饮片收入', '门诊医疗服务收入', '门诊医疗有效收入', '住院总收入', '住院床位收入', '住院诊察收入', '住院检查收入', '住院化验收入', '住院治疗收入', '住院手术收入', '住院护理收入', '住院卫生材料收入', '住院药品收入', '住院西药收入', '住院中成药收入', '住院中草药收入', '住院其他收入', '住院医疗服务收入', '住院医疗有效收入', '医疗服务收入', '医疗有效收入', '药占比', '耗占比', '门急诊人次', '门急诊人均费用', '住院人次', '住院人均费用', '平均住院日']
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
      const data = []
      this.items.forEach(item => {
        const temp = []
        temp.push(item.时间, item.医疗总收入, item.门诊总收入, item.门诊诊察收入, item.门诊诊察收入, item.门诊检查收入, item.门诊化验收入, item.门诊治疗收入, item.门诊手术收入, item.门诊卫生材料收入, item.门诊药品收入, item.门诊西药收入, item.门诊中成药收入, item.门诊中药饮片收入, item.门诊医疗服务收入, item.门诊医疗有效收入, item.住院总收入, item.住院床位收入, item.住院诊察收入, item.住院检查收入, item.住院化验收入, item.住院治疗收入, item.住院手术收入, item.住院护理收入, item.住院卫生材料收入, item.住院药品收入, item.住院西药收入, item.住院中成药收入, item.住院中草药收入, item.住院其他收入, item.住院医疗服务收入, item.住院医疗有效收入, item.医疗服务收入, item.医疗有效收入, item.药占比, item.耗占比, item.门急诊人次, item.门急诊人均费用, item.住院人次, item.住院人均费用, item.平均住院日)
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
      width: 950px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .el-table{
      font-size: .01em;
      &:hover{
        box-shadow: 0 0 20px #e8ecef;
      }
    }
  }
</style>

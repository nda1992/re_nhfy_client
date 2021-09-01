<template>
  <div class="app-container">
    <div class="title">
      <el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" clearable @change="pickerDate"></el-date-picker>
      <el-select v-model="searchForm.Depttype" clearable placeholder="请选择">
        <el-option v-for="(item, index) in MZorZYOptions" :key="item.id" :label="item.item" :value="item.item"></el-option>
      </el-select>
      <el-radio-group v-model="searchForm.Catetype" @change="handleChange" style="display: flex;justify-content:space-around;width: 180px;">
        <el-radio label="1" border size="medium">药品</el-radio>
        <el-radio label="2" border size="medium">耗材</el-radio>
      </el-radio-group>
      <el-select clearable :loading="select_loading" v-model="searchForm.deptName" placeholder="请选择部门(不选则为全院)" width="20px" :remote-method="getRemoteDeptList" filterable default-first-option remote>
        <el-option v-for="(item,index) in deptListOptions" :key="item+index" :label="item" :value="item"></el-option>
      </el-select>
      <el-button @click="search" type="primary" icon="el-icon-search">查询</el-button>
      <el-button @click="handleDownload" type="success" icon="el-icon-download">导出表格</el-button>
      <span style="color: #ff6666;font-size: 12px;">耗材查询时间约为120秒!</span>
    </div>
    <div class="table-container">
      <div class="header">
        <span style="margin-bottom: 10px;font-size: 22px;font-weight: bold">{{ tableTitle }}</span>
        <span class="sum">总金额: {{ sum }}</span>
      </div>
      <el-table
        :data="showItems"
        v-loading="listLoading"
        border
        stripe
        fix
        highlight-current-row
        style="width: 100%;">
        <el-table-column label="序号" prop="xh" align="center" width="70px">
          <template slot-scope="{row}">
            <span>{{ row.XH }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开单科室" prop="开单科室" align="center" width="150px">
          <template slot-scope="{row}">
            <span>{{ row.开单科室 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目名称" prop="项目名称" align="center" width="100px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.项目名称 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="大项目名称" prop="大项目名称" align="center" width="100px">
          <template slot-scope="{row}">
            <span>{{ row.大项目名称 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目编码" prop="项目编码" align="center" width="100px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.项目编码 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="大项目编码" prop="大项目编码" align="center" width="100px">
          <template slot-scope="{row}">
            <span>{{ row.大项目编码 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位" prop="单位" align="center" width="80px">
          <template slot-scope="{row}">
            <span>{{ row.单位 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单价" prop="单价" sortable :sort-method="sortByValue" align="center" width="100px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.单价)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量" prop="数量" align="center" width="50px">
          <template slot-scope="{row}">
            <span>{{ row.数量 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总金额" prop="总金额" sortable :sort-method="sortBySum" align="center" width="100px">
          <template slot-scope="{row}">
            <span>{{ Math.floor((row.总金额)*100)/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否中草药" prop="是否中草药" align="center" width="100px">
          <template slot-scope="{row}">
            <span>{{ row.是否中草药 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否国家谈判品种" prop="是否国家谈判品种" align="center" width="150px">
          <template slot-scope="{row}">
            <span>{{ row.是否国家谈判品种 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否重点监管药品" prop="是否重点监管药品" align="center" width="150px">
          <template slot-scope="{row}">
            <span>{{ row.是否重点监管药品 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否国家辅助用药" prop="是否国家辅助用药" align="center" width="150px">
          <template slot-scope="{row}">
            <span>{{ row.是否国家辅助用药 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否PPI" prop="是否PPI" align="center" width="80px">
          <template slot-scope="{row}">
            <span>{{ row.是否PPI }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否抗菌药品" prop="是否抗菌药品" align="center" width="110px">
          <template slot-scope="{row}">
            <span>{{ row.是否抗菌药品 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否中枢止吐" prop="是否中枢止吐" align="center" width="110px">
          <template slot-scope="{row}">
            <span>{{ row.是否中枢止吐 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否口服中成药" prop="是否口服中成药" align="center" width="120px">
          <template slot-scope="{row}">
            <span>{{ row.是否口服中成药 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否中药注射剂" prop="是否中药注射剂" align="center" width="120px">
          <template slot-scope="{row}">
            <span>{{ row.是否中药注射剂 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否高值耗材" prop="是否高值耗材" align="center" width="120px">
          <template slot-scope="{row}">
            <span>{{ row.是否高值耗材 }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="search" />
    </div>
  </div>
</template>

<script>
import { deptMaterialMedicineDetail } from '@/api/reportmake/reportmake'
import { searchDept } from '@/api/news/news'
import Pagination from '@/components/Pagination'
import moment from 'moment'
export default {
  name: 'deptMaterialMedicineDetail',
  components: { Pagination },
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        role: localStorage.getItem('role')
      },
      deptListOptions: [],
      listLoading: false,
      select_loading: false,
      // 门诊药品（设置了默认值）
      MZmedicineList: [],
      // 住院药品（设置了默认值）
      ZYmedicineList: [],
      // 门诊耗材
      MZmaterialList: [],
      // 住院耗材
      ZYmaterialList: [],
      // 最终显示到表格的数据
      showItems: [],
      searchDate: '',
      searchForm: { startDate: '', endDate: '', Depttype: '门诊', Catetype: '1', deptName: '' },
      // 选择住院还是门诊？
      MZorZYOptions: [{ id: 1, item: '门诊' }, { id: 2, item: '住院' }],
      // 显示的表格标题，由后端返回
      tableTitle: '门诊药品明细',
      // 查询回来某一项的总收入
      sum: 0,
      downloadLoading: false
    }
  },
  mounted() {
    // 默认的日期为前一天
    this.searchDate = [moment(new Date() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD'), moment(new Date() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')]
    this.searchForm.startDate = moment(new Date() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
    this.searchForm.endDate = moment(new Date() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
  },
  methods: {
    sortBySum(val1, val2) {
      return val1.总金额 - val2.总金额
    },
    sortByValue(val1, val2) {
      return val1.单价 - val2.单价
    },
    // 日期选择器触发
    pickerDate() {
      this.searchForm.startDate = this.searchDate[0]
      this.searchForm.endDate = this.searchDate[1]
    },
    handleChange(id) {
      console.log(id)
    },
    search() {
      this.showItems = []
      this.listLoading = true
      const temp = Object.assign({}, this.searchForm, this.listQuery)
      if (this.searchForm.Depttype === '门诊') {
        temp.Depttype = '1'
      } else if (this.searchForm.Depttype === '住院') {
        temp.Depttype = '2'
      }
      deptMaterialMedicineDetail(temp).then(res => {
        const { items, flag, msg, title, total, sum } = res
        // console.log(res)
        this.$message.success(msg)
        this.tableTitle = title
        this.total = total
        this.sum = sum
        switch (flag) {
          // 门诊药品
          case '1':
            this.MZmedicineList = items
            this.showItems = this.MZmedicineList
            break
          // 住院药品
          case '2':
            this.ZYmedicineList = items
            this.showItems = this.ZYmedicineList
            break
          // 门诊耗材
          case '3':
            this.MZmaterialList = items
            this.showItems = this.MZmaterialList
            break
          // 住院耗材
          case '4':
            this.ZYmaterialList = items
            this.showItems = this.ZYmaterialList
        }
        this.listLoading = false
      })
    },
    getRemoteDeptList(query) {
      this.select_loading = true
      searchDept(query).then(res => {
        const { items } = res
        if (!items) return
        this.deptListOptions = items.map(v => v.name)
      })
      this.select_loading = false
    },
    // 导出表格
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        let tHeader = []
        let data = []
        if (this.searchForm.Catetype === '1') {
          tHeader = ['序号', '科室名称', '项目名称', '大项目名称', '项目编码', '大项目编码', '单位', '单价', '数量', '总金额', '是否中草药', '是否国家谈判品种', '是否国家谈判品种', '是否重点监管药品', '是否国家辅助用药', '是否PPI', '是否抗菌药品', '是否中枢呕吐', '是否口服中成药', '是否中药注射剂']
          data = this.formatJson('1')
        } else if (this.searchForm.Catetype === '2') {
          tHeader = ['序号', '科室名称', '项目名称', '大项目名称', '项目编码', '大项目编码', '单位', '单价', '数量', '总金额', '是否高值耗材']
          data = this.formatJson('2')
          // console.log(this.formatJson('2'))
        }
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '费用'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      const data = []
      if (filterVal === '1') {
        this.showItems.forEach(item => {
          const temp = []
          temp.push(item.XH, item.开单科室, item.项目名称, item.大项目名称, item.项目编码, item.大项目编码, item.单位, item.单价, item.数量, item.总金额, item.是否中草药, item.是否国家谈判品种, item.是否重点监管药品, item.是否国家辅助用药, item.是否PPI, item.是否抗菌药品, item.是否中枢呕吐, item.是否口服中成药, item.是否中药注射剂)
          data.push(temp)
        })
      } else if (filterVal === '2') {
        this.showItems.forEach(item => {
          const temp = []
          temp.push(item.XH, item.开单科室, item.项目名称, item.大项目名称, item.项目编码, item.大项目编码, item.单位, item.单价, item.数量, item.总金额, item.是否高值耗材)
          data.push(temp)
        })
      }
      return data
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container{
    padding-top: 0;
    .title{
      width: 1350px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
    }
    .el-radio{
      margin: 0;
    }
    .el-select{
      width: 210px;
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
          right: 60px;
          color: #ff6666;
        }
      }
    }
  }
</style>

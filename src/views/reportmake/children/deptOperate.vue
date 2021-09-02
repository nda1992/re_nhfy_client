<template>
  <div class="app-container">
    <div class="title">
      <el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" clearable @change="pickerDate"></el-date-picker>
      <el-input style="width: 200px" placeholder="输入科室搜索" v-model="MZdeptname" clearable @keyup.enter.native="MZhandleFilter" :disabled="MZitemList.length===0?true:false" v-if="searchForm.type==='1'"></el-input>
      <el-input style="width: 200px" placeholder="输入科室搜索" v-model="ZYdeptname" clearable @keyup.enter.native="ZYhandleFilter" :disabled="ZYitemList.length===0?true:false" v-else></el-input>
      <el-radio-group v-model="searchForm.type" @change="selectChange" style="display: flex;justify-content:space-around;width: 200px;">
        <el-radio label="1" border size="medium">门诊</el-radio>
        <el-radio label="2" border size="medium">住院</el-radio>
      </el-radio-group>
      <el-button @click="search" icon="el-icon-search" type="primary">查询</el-button>
      <el-button @click="handleDownload" icon="el-icon-download" type="success">导出表格</el-button>
      <div><span style="color: #ff6666;font-size: 12px;">表格中的住院手术费和护理费的显示有点问题，还在修复中!</span></div>
    </div>
    <div class="table-container">
      <div class="header">
        <span style="margin-bottom: 10px;font-size: 22px;font-weight: bold" v-if="searchForm.type==='1'">门诊科室收入情况</span>
        <span style="margin-bottom: 10px;font-size: 22px;font-weight: bold" v-else>住院科室收入情况</span>
        <div class="sum" v-if="searchForm.type==='1'">门急诊总收入:{{mzsum}}</div>
        <div class="sum" v-else>住院总收入:{{zysum}}</div>
      </div>
      <el-table :key="tableKey"
                border
                v-loading="listLoading"
                :data="searchForm.type==='1'?MZitemList:ZYitemList"
                stripe
                fit
                highlight-current-row
                style="width: 100%;"
                :height="(MZitemList.length===0)&&(ZYitemList.length===0)?'auto':'600'">
        <!--序号-->
        <el-table-column label="序号" prop="xh" align="center" min-width="3px">
          <template slot-scope="{row}">
            <span>{{ row.XH }}</span>
          </template>
        </el-table-column>
        <!--科室名称-->
        <el-table-column label="科室名称" prop="DEPT_NAME" align="center" min-width="10px">
          <template slot-scope="{row}">
            <span>{{ row.DEPT_NAME }}</span>
          </template>
        </el-table-column>
        <!--床位费-->
        <el-table-column label="床位费" sortable :sort-method="sortByCWF" prop="床位费" align="center" min-width="6px" v-if="searchForm.type==='2'">
          <template slot-scope="{row}">
            <span>{{ row.床位费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--检查费-->
        <el-table-column label="检查费" sortable :sort-method="sortByJCF" prop="检查费" align="center" min-width="6px">
          <template slot-scope="{row}">
            <span>{{ row.检查费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--诊察费-->
        <el-table-column label="诊察费" prop="诊察费" sortable :sort-method="sortByZCF" align="center" min-width="6px">
          <template slot-scope="{row}">
            <span>{{ row.诊察费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--化验费-->
        <el-table-column label="化验费" prop="化验费" sortable :sort-method="sortByHYF" align="center" min-width="6px">
          <template slot-scope="{row}">
            <span>{{ row.化验费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--治疗费-->
        <el-table-column label="治疗费" prop="治疗费" sortable :sort-method="sortByZLF" align="center" min-width="6px">
          <template slot-scope="{row}">
            <span>{{ row.治疗费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--手术费-->
        <el-table-column label="手术费" prop="手术费" sortable :sort-method="sortBySSF" align="center" min-width="6px">
          <template slot-scope="{row}">
            <span>{{ row.手术费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--护理费-->
        <el-table-column label="护理费" prop="护理费" sortable :sort-method="sortByHLF" align="center" min-width="6px">
          <template slot-scope="{row}">
            <span>{{ row.护理费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--高值耗材费-->
        <el-table-column label="高值耗材费" sortable :sort-method="sortByGZHCF" prop="高值耗材费" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.高值耗材费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--卫生材料费-->
        <el-table-column label="其他耗材费" prop="其他耗材费" sortable :sort-method="sortByWSCLF" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.其他耗材费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--西药费-->
        <el-table-column label="西药费" prop="西药费" sortable :sort-method="sortByXYF" align="center" min-width="6px">
          <template slot-scope="{row}">
            <span>{{ row.西药费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--中成药费-->
        <el-table-column label="中成药费" prop="中成药费" sortable :sort-method="sortByZCYF" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.中成药费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--中药饮片费-->
        <el-table-column label="中药饮片费" prop="中药饮片费" sortable :sort-method="sortByZYYPF" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.中药饮片费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--其他费-->
        <el-table-column label="其他费" prop="其他费" sortable :sort-method="sortByQTF" align="center" min-width="7px">
          <template slot-scope="{row}">
            <span>{{ row.其他费.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--合计-->
        <el-table-column label="总费用" sortable :sort-method="sortBySum" align="center" min-width="7px" prop="总费用">
          <template slot-scope="{row}">
            <span>{{ row.总费用.toFixed(2) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { searchDeptOperate } from '@/api/reportmake/reportmake'
import moment from 'moment'
export default {
  data() {
    return {
      MZList: [],
      ZYList: [],
      tableKey: 0,
      searchDate: '',
      searchForm: { startDate: '', endDate: '', type: '1' },
      // 门诊收入
      ZYitemList: [],
      // 住院收入
      MZitemList: [],
      listLoading: false,
      // 需要搜索的科室
      MZdeptname: '',
      ZYdeptname: '',
      // 门诊总收入
      mzsum: 0,
      zysum: 0,
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
    // input按科室搜索
    MZhandleFilter() {
      this.MZitemList = this.MZList.filter(item => item.DEPT_NAME.match(this.MZdeptname))
    },
    ZYhandleFilter() {
      this.ZYitemList = this.ZYList.filter(item => item.DEPT_NAME.match(this.ZYdeptname))
    },
    // 点击redio时触发
    selectChange() {
      console.log(this.searchForm.type)
    },
    resetSearchForm() {
      this.searchForm = { startDate: '', endDate: '', type: '1' }
    },
    pickerDate() {
      this.searchForm.startDate = this.searchDate[0]
      this.searchForm.endDate = this.searchDate[1]
    },
    // 点击搜索按钮触发
    search() {
      this.listLoading = true
      const temp = Object.assign({}, this.searchForm)
      searchDeptOperate(temp).then((res) => {
        const { items, msg, sum } = res
        this.$message.success(msg)
        if (this.searchForm.type === '1') {
          this.MZitemList = items
          this.MZList = items
          this.mzsum = sum
        } else if (this.searchForm.type === '2') {
          this.ZYitemList = items
          this.ZYList = items
          this.zysum = sum
        }
        this.listLoading = false
      })
    },
    // 导出表格
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        let tHeader = []
        let data = []
        if (this.searchForm.type === '1') {
          tHeader = ['序号', '科室名称', '检查费', '诊察费', '化验费', '治疗费', '手术费', '护理费', '高值耗材费', '其他耗材费', '西药费', '中成药费', '中药饮片费', '其他费']
          // const filterVal = ['序号', '科室名称', '检查费', '诊察费', '化验费', '治疗费', '手术费', '护理费', '卫生材料费', '西药费', '中成药费', '中药饮片费', '其他费']
          data = this.formatJson(this.searchForm.type)
        } else if (this.searchForm.type === '2') {
          tHeader = ['序号', '科室名称', '床位费', '检查费', '诊察费', '化验费', '治疗费', '手术费', '护理费', '高值耗材费', '其他耗材费', '西药费', '中成药费', '中药饮片费', '其他费']
          // const filterVal = ['序号', '科室名称', '床位费', '检查费', '诊察费', '化验费', '治疗费', '手术费', '护理费', '高值耗材费', '卫生材料费', '西药费', '中成药费', '中药饮片费', '其他费']
          data = this.formatJson(this.searchForm.type)
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
        this.MZitemList.forEach(item => {
          const temp = []
          temp.push(item.XH, item.DEPT_NAME, item.检查费, item.诊察费, item.化验费, item.治疗费, item.手术费, item.护理费, item.卫生材料费, item.西药费, item.中成药费, item.中药饮片费, item.其他费)
          data.push(temp)
        })
      } else if (filterVal === '2') {
        this.ZYitemList.forEach(item => {
          const temp = []
          temp.push(item.XH, item.DEPT_NAME, item.床位费, item.检查费, item.诊察费, item.化验费, item.治疗费, item.手术费, item.护理费, item.高值耗材费, item.卫生材料费, item.西药费, item.中成药费, item.中药饮片费, item.其他费)
          data.push(temp)
        })
      }
      return data
    },
    /* *********************************排序***************************** */
    sortBySum(val1, val2) {
      return val1.总费用 - val2.总费用
    },
    sortByCWF(val1, val2) {
      return val1.床位费 - val2.床位费
    },
    sortByJCF(val1, val2) {
      return val1.检查费 - val2.检查费
    },
    sortByZCF(val1, val2) {
      return val1.诊察费 - val2.诊察费
    },
    sortByHYF(val1, val2) {
      return val1.化验费 - val2.化验费
    },
    sortByZLF(val1, val2) {
      return val1.治疗费 - val2.治疗费
    },
    sortBySSF(val1, val2) {
      return val1.手术费 - val2.手术费
    },
    sortByHLF(val1, val2) {
      return val1.护理费 - val2.护理费
    },
    sortByGZHCF(val1, val2) {
      return val1.高值耗材费 - val2.高值耗材费
    },
    sortByWSCLF(val1, val2) {
      return val1.卫生材料费 - val2.卫生材料费
    },
    sortByXYF(val1, val2) {
      return val1.西药费 - val2.西药费
    },
    sortByZCYF(val1, val2) {
      return val1.中成药费 - val2.中成药费
    },
    sortByZYYPF(val1, val2) {
      return val1.中药饮片费 - val2.中药饮片费
    },
    sortByQTF(val1, val2) {
      return val1.其他费 - val2.其他费
    }
    /* *********************************排序的相关方法结束***************************** */
  }
}
</script>
<style lang="scss" scoped>
  .app-container{
    padding-top: 0;
    .title{
      width: 1300px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
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

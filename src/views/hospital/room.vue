<template>
<!-- 科室管理 -->
    <div class="app-container">
      <div class="filter-container">
        <el-input v-model="searchVal" :placeholder="'按'+searchType+'搜索'" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter(searchType)" />
        <el-select v-model="searchType" placeholder="请选择搜索类型" style="width: 150px" class="filter-item">
          <el-option v-for="item in typeItems" :key="item" :label="item" :value="item" />
        </el-select>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter(searchType)">搜索</el-button>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-circle-plus-outline" @click="handleCreate" style="margin-left: 0">新增科室</el-button>
        <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload" style="margin-left: 0">导出表格</el-button>
      </div>
      <el-divider></el-divider>
      <div>
        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="searchList"
          border
          fit
          highlight-current-row
          style="width: 100%;"
        >
          <!--自增id-->
          <el-table-column label="ID" prop="id" align="center" min-width="5px">
            <template slot-scope="{row}">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <!--科室编号-->
          <el-table-column label="科室编号" prop="deptCode" sortable="custom" align="center" min-width="15px">
            <template slot-scope="{row}">
              <span>{{ row.deptCode }}</span>
            </template>
          </el-table-column>
          <!--科室名称-->
          <el-table-column label="科室名称" prop="deptName" min-width="20px" align="center">
            <template slot-scope="{row}">
              <span class="link-type" @click="handleUpdate(row)">{{ row.deptName }}</span>
            </template>
          </el-table-column>
          <!--科室领导-->
          <el-table-column label="科室领导" prop="deptLeader" min-width="10px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.deptLeader }}</span>
            </template>
          </el-table-column>
          <!--科室级别-->
          <el-table-column label="科室级别" prop="level" min-width="10px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.level }}</span>
            </template>
          </el-table-column>
          <!--科室地址-->
          <el-table-column label="科室地址" prop="deptAddr" min-width="18px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.deptAddr }}</span>
            </template>
          </el-table-column>
          <!--科室简介-->
          <el-table-column label="科室简介" prop="desc" min-width="70px" align="left" :show-overflow-tooltip="true">
            <template slot-scope="{row}">
              <span>{{ row.desc }}</span>
            </template>
          </el-table-column>
          <!--操作按钮-->
          <el-table-column label="操作" align="center" min-width="24px" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" size="mini" @click="handleUpdate(row)" icon="el-icon-edit">编辑</el-button>
              <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)" icon="el-icon-delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getdeptList" />
        <!--编辑科室对话框-->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
          <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
            <el-form-item label="科室编号" prop="deptCode">
              <el-input v-model="temp.deptCode" />
            </el-form-item>
            <el-form-item label="科室名称" prop="deptName">
              <el-input v-model="temp.deptName" />
            </el-form-item>
            <el-form-item label="科室负责人" prop="deptLeader">
              <el-input v-model="temp.deptLeader" />
            </el-form-item>
            <el-form-item label="科室地址" prop="deptAddr">
              <el-input v-model="temp.deptAddr" />
            </el-form-item>
            <el-form-item label="科室级别" prop="level">
              <el-select v-model="temp.level" class="filter-item" placeholder="请选择">
                <el-option v-for="(item,index) in calendarTypeOptions" :key="index" :label="item" :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item label="部门简介" prop="desc">
              <el-input v-model="temp.desc" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="部门简介" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
          </div>
        </el-dialog>
      </div>

    </div>
</template>
<script>
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { getdeptList, createDept, updateDept, deleteDept } from '@/api/hospital/hospital'
export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        role: localStorage.getItem('role')
      },
      inputVal: '',
      tableKey: 0,
      listLoading: true,
      searchVal: '',
      searchType: '部门名称',
      typeItems: ['部门名称', '部门负责人', '部门地址'],
      list: null,
      searchList: [],
      total: 0,
      // 对话框
      textMap: {
        update: '更新部门信息',
        create: '新增科室'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      temp: {
        deptCode: '',
        deptName: '',
        deptLeader: '',
        deptAddr: '',
        level: '',
        desc: ''
      },
      rules: {
        deptCode: [{ required: true, message: '请输入科室编号', trigger: 'blur' }],
        deptName: [{ required: true, message: '请输入科室名称', trigger: 'blur' }],
        deptLeader: [{ required: true, message: '请输入科室负责人', trigger: 'blur' }],
        deptAddr: [{ required: true, message: '请输入科室地址', trigger: 'blur' }],
        level: [{ required: true, message: '请输入科室级别', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入科室简介', trigger: 'blur' }]
      },
      // 科室级别选择
      calendarTypeOptions: [1, 2, 3],
      downloadLoading: false
    }
  },
  watch: {
    // inputVal(oldVal,newVal){
    //   return `按${newVal}搜索`
    // }
  },
  mounted() {
    this.getdeptList()
  },
  methods: {
    // 按关键字进行搜索
    handleFilter(type) {
      if (type === '部门名称') {
        this.searchList = this.list.filter(item => { return item.deptName.match(this.searchVal) })
      } else if (type === '部门负责人') {
        this.searchList = this.list.filter(item => { return item.deptLeader.match(this.searchVal) })
      } else if (type === '部门地址') {
        this.searchList = this.list.filter(item => { return item.deptAddr.match(this.searchVal) })
      }
    },
    // 获取部门列表
    getdeptList() {
      getdeptList(this.listQuery).then(res => {
        this.list = res.depts
        this.searchList = res.depts
        this.total = res.total
        setTimeout(() => {
          this.listLoading = false
        }, 1000)
      })
    },
    // 重置表单
    resetTemp() {
      this.temp = {
        id: undefined,
        deptCode: '',
        deptName: '',
        deptLeader: '',
        deptAddr: '',
        level: '',
        desc: ''
      }
    },
    // 新增科室
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 添加按钮触发的函数
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$confirm('是否创建?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning' }).then(() => {
            createDept(this.temp).then((res) => {
              const { msg } = res
              this.getdeptList()
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: msg,
                type: 'success',
                duration: 2000
              })
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 更新时触发
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$confirm('是否更新?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const tempData = Object.assign({}, this.temp)
            updateDept(tempData).then(() => {
              this.getdeptList()
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          })
        }
      })
    },
    // 删除科室
    handleDelete(row, index) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDept(row.id).then(() => {
          this.getdeptList()
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    // 导出excel
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
      const data = []
      this.searchList.forEach(item => {
        const temp = []
        temp.push(item.deptCode, item.deptName, item.deptLeader, item.level, item.deptAddr, item.desc)
        data.push(temp)
      })
      return data
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container{
    .filter-container{
      width: 720px;
      display: flex;
      justify-content: space-around;
    }
    .el-table{
      &:hover{
        box-shadow: 0 0 20px #e8ecef;
      }
    }
  }
</style>

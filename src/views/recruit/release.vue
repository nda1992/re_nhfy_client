<template>
<!-- 岗位管理 -->
  <div class="app-container">
    <div class="title">
      <el-tooltip class="item" effect="dark" content="按下回车键搜索" placement="bottom">
        <el-input v-model="searchVal" :placeholder="'按'+searchType+'搜索'" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter(searchType)" />
      </el-tooltip>
      <el-select v-model="searchType" placeholder="请选择搜索类型" style="width: 150px" class="filter-item" type="primary">
        <el-option v-for="item in typeItems" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button icon="el-icon-circle-plus-outline" type="primary" @click="handleCreate">新增岗位</el-button>
    </div>
    <div class="table-container">
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="searchList"
        border
        fit
        highlight-current-row
        :default-sort = "{prop: 'createDate'}"
        style="width: 100%;"
      >
        <!--可展开行-->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="作者工号">
                <span>{{ props.row.userCode }}</span>
              </el-form-item>
              <el-form-item label="岗位名称">
                <span>{{ props.row.positionName }}</span>
              </el-form-item>
              <el-form-item label="发布时间">
                <span>{{ props.row.createDate }}</span>
              </el-form-item>
              <el-form-item label="招聘科室">
                <span>{{ props.row.deptName }}</span>
              </el-form-item>
              <el-form-item label="岗位类型">
                <span>{{ props.row.type }}</span>
              </el-form-item>
              <el-form-item label="学历要求">
                <span>{{ props.row.degree }}</span>
              </el-form-item>
              <el-form-item label="需求人数">
                <span>{{ props.row.requireNum }}</span>
              </el-form-item>
              <el-form-item label="年龄要求">
                <span>{{ props.row.age }}</span>
              </el-form-item>
              <el-form-item label="英语要求">
                <span>{{ props.row.english }}</span>
              </el-form-item>
              <el-form-item label="专业要求">
                <span>{{ props.row.professional }}</span>
              </el-form-item>
              <el-form-item label="其他描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!--自增id-->
        <el-table-column label="ID" prop="id" align="center" min-width="3px">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <!--岗位名称-->
        <el-table-column label="岗位名称" prop="positionName" align="center" :show-overflow-tooltip="true" min-width="8px">
          <template slot-scope="{row}">
            <span>{{ row.positionName }}</span>
          </template>
        </el-table-column>
        <!--创建时间-->
        <el-table-column label="发布时间" sortable prop="createDate" align="center" min-width="10px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <i class="el-icon-time" style="margin-right: 3px;"></i>
            <span>{{ row.createDate }}</span>
          </template>
        </el-table-column >
        <!--需求科室-->
        <el-table-column label="需求科室" prop="deptName" align="center" :show-overflow-tooltip="true" min-width="8px">
          <template slot-scope="{row}">
            <span>{{ row.deptName }}</span>
          </template>
        </el-table-column>
        <!--岗位类型-->
        <el-table-column label="岗位类型" prop="type" align="center" min-width="8px">
          <template slot-scope="{row}">
            <span>{{ row.type }}</span>
          </template>
        </el-table-column>
        <!--学历要求-->
        <el-table-column label="学历要求" prop="degree" align="center" min-width="8px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.degree }}</span>
          </template>
        </el-table-column>
        <!--年龄要求-->
        <el-table-column label="年龄要求" prop="age" align="center" min-width="8px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.age }}</span>
          </template>
        </el-table-column>
        <!--英语要求-->
        <el-table-column label="英语要求" prop="english" align="center" min-width="8px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.english }}</span>
          </template>
        </el-table-column>
        <!--专业要求-->
        <el-table-column label="专业要求" prop="professional" align="center" min-width="8px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.professional }}</span>
          </template>
        </el-table-column>
        <!--招聘状态-->
        <el-table-column label="招聘状态" prop="status" align="center" min-width="8px">
          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter" v-if="row.status==='在招'">
              {{ row.status }}
            </el-tag>
            <el-popconfirm v-else
               @onConfirm="handleStatus(row)"
               confirm-button-text='确定'
               cancel-button-text='取消'
               icon="el-icon-info"
               icon-color="red"
               title="是否恢复为在招?"
            >
              <el-button slot="reference" type="danger" size="mini">{{ row.status }}</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
        <!--当前状态-->
        <el-table-column label="当前状态" prop="Handlestatus" align="center" min-width="12px">
          <template slot-scope="{row}">
            <el-tag :type="row.Handlestatus | HandlestatusFilter">
              <span>{{ row.Handlestatus }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <!--更新状态-->
        <el-table-column label="更新状态" prop="Switch" align="center" min-width="16px">
          <template slot-scope="{row}">
            <el-switch
              @change="handleSetStatus(row)"
              :disabled="row.status==='已结束'"
              v-model="row.Switch"
              active-color="#13ce66"
              inactive-color="#ff4949"
              inactive-text="不通过"
              active-text="通过"
              style="font-size: 12px;"
            >
            </el-switch>
          </template>
        </el-table-column>
        <!--操作-->
        <el-table-column label="操作" align="center" min-width="18px" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)" icon="el-icon-edit" :disabled="row.status==='已结束'">编辑</el-button>
            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)" icon="el-icon-delete" :disabled="row.status==='已结束'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--新增和编辑的对话框-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="岗位名称" prop="positionName">
          <el-input v-model="temp.positionName" />
        </el-form-item>
        <el-form-item label="招聘科室" prop="deptName">
          <el-select v-model="temp.deptName" class="filter-item" :remote-method="getRemoteDeptList" filterable default-first-option remote placeholder="请输入科室名称搜索">
            <el-option v-for="(item,index) in deptOptions" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="工作地点" prop="address">
          <el-input v-model="temp.address" />
        </el-form-item>
        <el-form-item label="作者工号" prop="userCode">
          <el-input v-model="temp.userCode" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="temp.contactPhone" />
        </el-form-item>
        <el-form-item label="需求人数" prop="requireNum">
          <el-input v-model="temp.requireNum" />
        </el-form-item>
        <el-form-item label="岗位类型" prop="type">
          <el-select v-model="temp.type" placeholder="请选择岗位类型">
            <el-option v-for="(item,index) in typeOptions" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄要求" prop="age">
          <el-select v-model="temp.age" placeholder="请选择年龄要求">
            <el-option v-for="(item,index) in ageOptions" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="学历要求" prop="degree">
          <el-select v-model="temp.degree" placeholder="请选择学历要求">
            <el-option v-for="(item,index) in degreeOptions" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="英语要求" prop="english">
          <el-select v-model="temp.english" placeholder="请选择英语要求">
            <el-option v-for="(item,index) in englishOptions" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="专业要求" prop="professional">
          <el-input v-model="temp.professional" type="text" placeholder="请输入专业要求" />
        </el-form-item>
        <el-form-item label="岗位描述" prop="desc">
          <el-input v-model="temp.desc" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="招聘岗位的其他描述" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getAllPositionList" />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { createPosition, updatePosition, getAllPositionList, updatepositionStatus, deletePosition, recoverpositionStatus } from '@/api/recruit/recruit'
import { searchDept } from '@/api/news/news'
// 对sessionStorage加密
import { StorageClass } from '@/utils/session'
export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '在招': 'success',
        '已结束': 'danger'
      }
      return statusMap[status]
    },
    HandlestatusFilter(status) {
      const statusMap = {
        '审核已通过': 'success',
        '未审核': 'warning',
        '已删除': 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      searchVal: '',
      searchType: '岗位名称',
      typeItems: ['岗位名称', '部门名称', '职工号', '学历要求', '英语要求', '专业要求'],
      searchList: [],
      list: [],
      // 对话框title
      textMap: {
        update: '更新岗位',
        create: '新增岗位'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      deptOptions: [],
      select_loading: false,
      degreeOptions: ['本科及以上', '硕士研究生及以上', '博士'],
      englishOptions: ['英语四级', '英语六级'],
      typeOptions: ['事业编', '非事业编'],
      ageOptions: ['30岁及以下', '32岁及以下', '35岁及以下'],
      listQuery: {
        page: 1,
        limit: 10,
        role: StorageClass.getSession('role').role
      },
      listLoading: false,
      total: 0,
      // 存储表单数据的临时对象
      temp: {
        positionName: '',
        deptName: '',
        address: '',
        userCode: '',
        requireNum: '',
        type: '',
        age: '',
        degree: '',
        english: '',
        professional: '',
        contactPhone: '',
        Handlestatus: '',
        status: '',
        desc: ''
      },
      rules: {
        positionName: [{ required: true, message: '请输入岗位名称', trigger: 'blur' }],
        deptName: [{ required: true, message: '请选择招聘科室', trigger: 'blur' }],
        address: [{ required: true, message: '请输入工作地点', trigger: 'blur' }],
        userCode: [{ required: true, message: '请输入职工号', trigger: 'blur' }],
        requireNum: [{ required: true, message: '请输需求人数', trigger: 'blur' }],
        type: [{ required: true, message: '请输入岗位类型', trigger: 'blur' }],
        age: [{ required: true, message: '请输入年龄要求', trigger: 'blur' }],
        degree: [{ required: true, message: '请选择学历要求', trigger: 'blur' }],
        english: [{ required: true, message: '请选择英语要求', trigger: 'blur' }],
        contactPhone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        professional: [{ required: true, message: '请输入专业要求', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入其他描述', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    // this.getPositionList()
    this.getAllPositionList()
  },
  methods: {
    // 过滤显示处理函数
    handleFilter(type) {
      if (type === '岗位名称') {
        this.searchList = this.list.filter(item => { return item.positionName.match(this.searchVal) })
      } else if (type === '部门名称') {
        this.searchList = this.list.filter(item => { return item.deptName.match(this.searchVal) })
      } else if (type === '职工号') {
        this.searchList = this.list.filter(item => { return item.userCode.match(this.searchVal) })
      } else if (type === '学历要求') {
        this.searchList = this.list.filter(item => { return item.degree.match(this.searchVal) })
      } else if (type === '英语要求') {
        this.searchList = this.list.filter(item => { return item.english.match(this.searchVal) })
      } else if (type === '专业要求') {
        this.searchList = this.list.filter(item => { return item.professional.match(this.searchVal) })
      }
    },
    resetTemp() {
      this.temp = {
        positionName: '',
        deptName: '',
        address: '',
        userCode: '',
        requireNum: '',
        type: '',
        age: '',
        degree: '',
        english: '',
        professional: '',
        Handlestatus: '',
        status: '',
        desc: ''
      }
    },
    // 开打新增对话框前的处理函数
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 添加的处理函数
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$confirm('是否创建岗位?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning' }).then(() => {
            this.temp.status = 1
            this.temp.Handlestatus = 3
            this.temp.type === '事业编' ? this.temp.type = 1 : this.temp.type = 2
            createPosition(this.temp).then((res) => {
              const { msg } = res
              this.dialogFormVisible = false
              // this.getPositionList()
              this.getAllPositionList()
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
    // 开打更新对话框前的处理函数
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 更新的处理函数
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$confirm('是否更新?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const tempData = Object.assign({}, this.temp)
            tempData.type === '事业编' ? tempData.type = 1 : tempData.type = 2
            updatePosition(tempData).then((res) => {
              const { msg } = res
              // this.getPositionList()
              this.getAllPositionList()
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
    // 删除岗位
    handleDelete(row, index) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePosition(row.id).then(() => {
          // this.getPositionList()
          this.getAllPositionList()
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    // 查询所有岗位
    getAllPositionList() {
      const temp = Object.assign({}, this.listQuery)
      getAllPositionList(temp).then(res => {
        this.listLoading = true
        const { positions, total } = res
        this.list = positions
        this.searchList = positions
        this.total = total
        setTimeout(() => {
          this.listLoading = false
        }, 1000)
      })
    },
    // switch触发
    handleSetStatus(row) {
      const temp = row
      temp.role = this.role
      // switch=true：表示通过审核,switch=false:表示未通过审核
      updatepositionStatus(temp).then(res => {
        const { msg } = res
        this.$notify({
          title: 'Success',
          message: msg,
          type: 'success',
          duration: 2000
        })
        this.getAllPositionList()
        // this.getPositionList()
      })
    },
    // 从"已结束"变为"在招"
    handleStatus(row) {
      const temp = row
      temp.role = this.role
      temp.status = 1 // 1=在招
      temp.Handlestatus = 3 // 已审核未通过
      recoverpositionStatus(temp).then(res => {
        const { msg } = res
        this.$notify({
          title: 'Success',
          message: msg,
          type: 'success',
          duration: 3000
        })
        this.getAllPositionList()
        // this.getPositionList()
      })
    },
    // 获取远程科室列表
    getRemoteDeptList(query) {
      this.select_loading = true
      searchDept(query).then(res => {
        const { items } = res
        if (!items) return
        this.deptOptions = items.map(v => v.name)
      })
      this.select_loading = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container{
    .title{
      width: 500px;
      display: flex;
      justify-content: space-between;
    }
    .table-container{
      .el-table{
        font-size: 12px;
      }
      .demo-table-expand{
        color: #99a9bf;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .el-form-item{
          margin-bottom: 0;
        }
      }
      margin-top: 20px;
    }
  }
</style>

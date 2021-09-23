<template>
    <!-- 医院管理--人员管理 -->
    <div class="app-container">
      <div class="title">
        <div>
          <span>系统人员管理</span>
        </div>
        <el-tooltip content="按回车键搜索" placement="bottom">
          <el-input v-model="searchVal" :placeholder="'按'+searchType+'搜索'" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter(searchType)" />
        </el-tooltip>
        <el-select v-model="searchType" placeholder="请选择搜索类型" style="width: 150px" class="filter-item">
          <el-option v-for="item in typeItems" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
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
          <el-table-column label="工号" prop="userCode" align="center" min-width="7px">
            <template slot-scope="{row}">
              <span>{{ row.userCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="username" align="center" min-width="8px">
            <template slot-scope="{row}">
              <span>{{ row.username }}</span>
            </template>
          </el-table-column>
          <el-table-column label="科室" prop="deptName" align="center" min-width="10px">
            <template slot-scope="{row}">
              <span>{{ row.deptName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="邮箱" prop="email" align="center" min-width="10px" :show-overflow-tooltip="true">
            <template slot-scope="{row}">
              <span>{{ row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户状态" prop="status" align="center" min-width="10px">
            <template slot-scope="{row}">
              <el-tag :type="row.status | statusFilter">
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="createDate" align="center" min-width="10px">
            <template slot-scope="{row}">
              <i class="el-icon-time" style="margin-right: 3px;"></i>
              <span>{{ row.createDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新状态" prop="Switch" align="center" min-width="10px">
            <template slot-scope="{row}">
              <el-switch
                :disabled="row.status==='已注销'"
                @change="handleSetStatus(row)"
                v-model="row.Switch"
                active-color="#13ce66"
                inactive-color="#ff4949"
                inactive-text="不通过"
                active-text="通过"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="24px" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" size="mini" @click="handleUpdate(row)" icon="el-icon-edit">编辑</el-button>
              <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)" icon="el-icon-delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>
<script>
import waves from '@/directive/waves'
import { StorageClass } from '@/utils/session'
import { getAllEmployees, updateUserStatus, deleteUser } from '@/api/hospital/employee'
export default {
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '审核已通过': 'success',
        '审核未通过': 'warning',
        '已注销': 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        role: StorageClass.getSession('role').role
      },
      listLoading: true,
      searchVal: '',
      searchType: '姓名',
      typeItems: ['姓名', '科室', '角色'],
      list: null,
      searchList: []
    }
  },
  mounted() {
    this.getAllEmployees()
  },
  computed: {
    role() {
      return StorageClass.getSession('role').role
    }
  },
  methods: {
    // 获取系统所有已注册用户的信息
    getAllEmployees() {
      const temp = Object.assign({}, this.listQuery)
      getAllEmployees(temp).then(res => {
        const { users, total } = res
        this.searchList = users
        this.list = users
        this.total = total
        this.listLoading = false
      })
    },
    handleFilter(type) {
      if (type === '姓名') {
        this.searchList = this.list.filter(item => { return item.username.match(this.searchVal) })
      } else if (type === '科室') {
        this.searchList = this.list.filter(item => { return item.deptName.match(this.searchVal) })
      } else if (type === '角色') {
        this.searchList = this.list.filter(item => { return item.role.match(this.searchVal) })
      }
    },
    // 状态更新
    handleSetStatus(row) {
      const temp = Object.assign({}, { id: row.id, role: this.role, Switch: row.Switch })
      updateUserStatus(temp).then(res => {
        const { msg } = res
        this.getAllEmployees()
        this.$notify({
          title: 'Success',
          message: msg,
          type: 'success'
        })
      })
    },
    // 更新用户信息
    handleUpdate() {},
    // 删除用户
    handleDelete(row, index) {
      this.$confirm('删除后该用户不可用，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning' }).then(() => {
        const temp = Object.assign({}, { id: row.id, role: this.role })
        deleteUser(temp).then(res => {
          const { msg } = res
          this.getAllEmployees()
          this.$notify({
            title: 'Success',
            message: msg,
            type: 'success'
          })
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container{
    .title{
      font-size: 20px;
      font-weight: bold;
      width: 500px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
  }
</style>

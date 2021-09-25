<template>
  <!-- 医院管理--人员管理 -->
  <div class="app-container">
    <h3>系统人员管理</h3>
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

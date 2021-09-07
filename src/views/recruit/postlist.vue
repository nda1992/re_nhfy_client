<template>
  <div class="app-container">
    <div class="title">
      <el-tooltip class="item" effect="dark" content="按下回车键搜索" placement="bottom">
        <el-input v-model="searchVal" :placeholder="'按'+searchType+'搜索'" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter(searchType)" />
      </el-tooltip>
      <el-select v-model="searchType" placeholder="请选择搜索类型" style="width: 150px" class="filter-item" type="primary">
        <el-option v-for="item in typeItems" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
    <div class="table-container">
      <el-table
        :row-class-name="rowClassName"
        :key="tableKey"
        v-loading="listLoading"
        :data="searchList"
        border
        fit
        highlight-current-row
        style="width: 100%;">
        <!--自增id-->
        <el-table-column label="序号" align="center" prop="xh" min-width="3px"></el-table-column>
        <!--创建时间-->
        <el-table-column label="投递时间" prop="createdTime" align="center" min-width="8px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <i class="el-icon-time" style="margin-right: 3px;"></i>
            <span>{{ row.createdTime }}</span>
          </template>
        </el-table-column>
        <!--岗位名称-->
        <el-table-column label="招聘岗位名称" prop="positionName" align="center" :show-overflow-tooltip="true" min-width="8px">
          <template slot-scope="{row}">
            <span>{{ row.positionName }}</span>
          </template>
        </el-table-column>
        <!--求职者姓名-->
        <el-table-column label="姓名" prop="username" align="center" :show-overflow-tooltip="true" min-width="5px">
          <template slot-scope="{row}">
            <span>{{ row.username }}</span>
          </template>
        </el-table-column>
        <!--毕业专业-->
        <el-table-column label="毕业专业" prop="professional" align="center" min-width="8px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.professional }}</span>
          </template>
        </el-table-column>
        <!--毕业学校-->
        <el-table-column label="毕业学校" prop="school" align="center" min-width="8px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.school }}</span>
          </template>
        </el-table-column>
        <!--毕业学校-->
        <el-table-column label="手机号" prop="phone" align="center" min-width="7px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.phone }}</span>
          </template>
        </el-table-column>
        <!--毕业学校-->
        <el-table-column label="邮箱" prop="email" align="center" min-width="8px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.email }}</span>
          </template>
        </el-table-column>
        <!--附件简历下载-->
        <el-table-column label="简历下载" prop="attachmentUrl" align="center" min-width="6px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>
              <el-tooltip class="item" effect="dark" content="点击查看简历" placement="bottom">
                <a :href="row.attachmentUrl" v-if="row.attachmentUrl.split('/').slice(-1)[0].indexOf('pdf')!==-1" style="color: #409EFF">简历</a>
                <el-button type="text" size="mini" @click="gotoResume(row.attachmentUrl)" v-else>简历</el-button>
              </el-tooltip>
            </span>
          </template>
        </el-table-column>
        <!--当前状态-->
        <el-table-column label="当前状态" prop="status" align="center" min-width="8px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <!--状态审核-->
        <el-table-column label="状态审核" prop="Switch" align="center" min-width="12px">
          <template slot-scope="{row}">
            <el-switch
              :disabled="row.status==='求职者已确认'"
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
        <!--操作-->
        <el-table-column label="操作" align="center" min-width="7px" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button
              v-if="row.status!='deleted'"
              size="mini" type="danger"
              @click="handleDelete(row,$index)"
              icon="el-icon-delete" :disabled="row.status==='求职者已确认'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPostedPosition()" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getPost2PositionListByUid, setPositionStatus, deletePost2Position } from '@/api/recruit/position'
export default {
  name: 'postlist',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '已审核通过': 'success',
        '审核未通过': 'danger',
        '未审核': 'info',
        '已确认': 'primary'
      }
      return statusMap[status]
    },
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        role: localStorage.getItem('role')
      },
      total: 0,
      tableKey: 0,
      listLoading: false,
      searchVal: '',
      searchType: '岗位名称',
      typeItems: ['岗位名称', '求职者姓名', '专业', '毕业学校'],
      list: [],
      searchList:[],
    }
  },
  mounted() {
    this.getPostedPosition()
  },
  methods: {
    rowClassName({ row, rowIndex }) {
      row.xh = rowIndex + 1;
    },
    // 过滤显示处理函数
    handleFilter(type) {
      if (type === '岗位名称') {
        this.searchList = this.list.filter(item => { return item.positionName.match(this.searchVal) })
      } else if (type === '求职者姓名') {
        this.searchList = this.list.filter(item => { return item.username.match(this.searchVal) })
      } else if (type === '专业') {
        this.searchList = this.list.filter(item => { return item.professional.match(this.searchVal) })
      } else if (type === '毕业学校') {
        this.searchList = this.list.filter(item => { return item.school.match(this.searchVal) })
      }
    },
    // 获取post2position对应jobseeker和position
    getPostedPosition() {
      this.listLoading = true
      getPost2PositionListByUid(this.listQuery).then(res => {
        const { items, msg, total } = res
        this.total = total
        this.searchList = items
        this.list = items
        this.$message.success(msg)
        this.listLoading = false
      })
    },
    // 触发switch按钮发送审核通过
    handleSetStatus(row) {
      setPositionStatus(row).then(res => {
        const { msg } = res
        this.$notify({
          title:'Success',
          message: msg,
          type: 'success'
        })
        this.getPostedPosition()
      })
    },
    // 删除
    handleDelete(row) {
      const temp = { pid: row.id, uid: row.jobseekerId }
      this.$confirm('删除该条记录的同时,也会删除求职者已投递的岗位,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning' }).then(() => {
        deletePost2Position().then(res => {
          const { msg } = res
          this.$notify({
            title: 'Success',
            message: msg,
            type: 'success'
          })
        })
      })
    },
    // 查看用户的用户简历
    gotoResume(url) {
      this.$router.push({ name: 'Download', params: { url: url } })
      // console.log(url)
    }
  }
}
</script>
<style scoped>
  .el-switch__label *{
    font-size: 11px !important;
  }
</style>

<style lang="scss" scoped>
  .app-container{
    .title{
      width: 400px;
      display: flex;
      justify-content: space-between;
    }
    .table-container{
      margin-top: 15px;
      .el-table{
        font-size: 12px;

      }
    }
  }
</style>

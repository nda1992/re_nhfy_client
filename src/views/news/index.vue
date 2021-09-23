<!--新闻管理首页-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="searchVal" :placeholder="'按'+searchType+'搜索'" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter(searchType)" clearable/>
      <el-select v-model="searchType" placeholder="请选择搜索类型" style="width: 150px" class="filter-item">
        <el-option v-for="item in typeItems" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter(searchType)">搜索</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload" style="margin-left: 0">导出表格</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="searchList"
      :default-sort="{prop: ['createTime','clickNum'], order: 'descending'}"
      border
      fit
      highlight-current-row
      style="width: 100%"
      stripe>
      <el-table-column label="ID" prop="id" align="center" min-width="3px">
        <template slot-scope="{row}">
          <el-tooltip effect="dark" content="点击查看文章" placement="bottom">
            <span class="link-type" @click="handleScan(row)">{{ row.id }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <!--新闻标题-->
      <el-table-column label="新闻标题" prop="title" align="center" min-width="15px" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <!--发布时间-->
      <el-table-column label="发布时间" sortable prop="createTime" align="center" min-width="13px">
        <template slot-scope="{row}">
          <i class="el-icon-time" style="margin-right: 3px;"></i>
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <!--作者-->
      <el-table-column label="作者" prop="userName" align="center" min-width="6px">
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>
      <!--所属部门-->
      <el-table-column label="所属部门" prop="deptName" align="center" min-width="9px">
        <template slot-scope="{row}">
          <span>{{ row.deptName }}</span>
        </template>
      </el-table-column>
      <!--所属类别-->
      <el-table-column label="所属类别" prop="category" align="center" min-width="7px">
        <template slot-scope="{row}">
          <span>{{ row.category }}</span>
        </template>
      </el-table-column>
      <!--浏览次数-->
      <el-table-column label="浏览次数" sortable prop="clickNum" align="center" min-width="9px">
        <template slot-scope="{row}">
          <span>{{ row.clickNum }}</span>
        </template>
      </el-table-column>
      <!--状态：发布未未审核，审核通过，审核未通过-->
      <el-table-column label="审核状态" prop="newsStatus" align="center" min-width="9px">
        <template slot-scope="{row}">
          <el-tag :type="row.newsStatus | newsStatusFilter" v-if="row.newsStatus !== '草稿'">
            {{ row.newsStatus }}
          </el-tag>
          <el-popconfirm v-else
            @onConfirm="handleStatus(row)"
            confirm-button-text='确定'
            cancel-button-text='取消'
            icon="el-icon-info"
            icon-color="red"
            title="确定发布新闻吗?"
          >
            <el-button slot="reference" :type="row.newsStatus | newsStatusFilter" size="mini" :disabled="role!=='admin'">{{ row.newsStatus }}</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <!--更新状态：审核通过，审核未通过-->
      <el-table-column label="更新状态" prop="newsStatus" align="center" min-width="15px">
        <template slot-scope="{row}">
          <el-switch
            @change="handleSetStatus(row)"
            :disabled="row.newsStatus === '草稿' || role !== 'admin'"
            v-model="row.Switch"
            active-color="#13ce66"
            inactive-color="#ff4949"
            inactive-text="不通过"
            active-text="通过"
            >
          </el-switch>
        </template>
      </el-table-column>
      <!--发布状态-->
      <el-table-column label="发布状态" prop="status" align="center" min-width="8px">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <!--操作按钮-->
      <el-table-column label="操作" align="center" min-width="15px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="'/news/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          </router-link>
          <el-button style="margin-left: 10px;" v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getNewsList" />
  </div>
</template>

<script>
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { deleteNewsById, getnewsList, updateNewsStatus, releaseNews } from '@/api/news/news'
// 对sessionStorage加密
import { StorageClass } from '@/utils/session'
const defaultForm = {
  loginuserCode: '',
  author: '',
  status: 'draft', // 导航条的状态
  title: '', // 文章题目
  content: '', // 文章内容
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: 0,
  platforms: ['院内网站'], // 1=院内网站，2=院外网站，3=院内网站和院外网站
  category: '',
  deptName: '',
  type: '', // 1=发布，2=草稿
  role: '',
  newsStatus: undefined
}
export default {
  directives: { waves },
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '已发布': 'success',
        '草稿': 'warning',
        '未发布': 'info',
        '已删除': 'danger'
      }
      return statusMap[status]
    },
    newsStatusFilter(status) {
      const statusMap = {
        '未审核': 'primary',
        '已审核': 'success',
        '草稿': 'warning',
        '已删除': 'danger',
        '不通过': 'info'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        role: StorageClass.getSession('role').role
      },
      total: 0,
      listLoading: false,
      searchVal: '',
      searchType: '新闻标题',
      typeItems: ['新闻标题', '发布作者', '新闻类别', '发布时间'],
      downloadLoading: false,
      list: null,
      searchList: [],
      temp: Object.assign({}, defaultForm)
    }
  },
  computed: {
    role() {
      return StorageClass.getSession('role').role
    }
  },
  mounted() {
    if (StorageClass.getSession('role').role !== 'admin') {
      this.$router.push({ name: 'Page401' })
    }
    this.getNewsList()
  },
  methods: {
    // 按关键字搜索内容
    handleFilter(type) {
      if (type === '新闻标题') {
        this.searchList = this.list.filter(item => { return item.title.match(this.searchVal) })
      } else if (type === '发布作者') {
        this.searchList = this.list.filter(item => { return item.userName.match(this.searchVal) })
      } else if (type === '新闻类别') {
        this.searchList = this.list.filter(item => { return item.category.match(this.searchVal) })
      } else if (type === '发布时间') {
        this.searchList = this.list.filter(item => { return item.createTime.match(this.searchVal) })
      }
    },
    // 根据文章id浏览
    handleScan(row) {
      this.$router.push({ path: `/news/scan/${row.id}` })
    },
    // 获取新闻列表
    getNewsList() {
      this.listLoading = true
      getnewsList(this.listQuery).then(res => {
        this.list = res.items
        this.searchList = res.items
        this.total = res.total
        setTimeout(() => {
          this.listLoading = false
        }, 1000)
      })
    },
    handleDelete(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteNewsById(row.id).then(() => {
          this.$notify({
            title: 'Success',
            message: '图片删除成功',
            type: 'success',
            duration: 2000
          })
          this.getNewsList()
        })
      })
    },
    // 从草稿发表为文章
    handleStatus(row) {
      const temp = row
      if (temp.title === '' || temp.content === '') {
        this.$message.error('请先完善标题或内容后提交')
        return
      }
      if (temp.userName === '' || temp.deptName === '' || temp.category === '') {
        this.$message.error('请先完善作者或部门信息后提交')
        return
      }
      temp.role = this.role
      temp.newsStatus = 2 // 2=已提交到数据库，但未审核
      temp.type = 2 // 草稿变为已提交
      temp.status = 'published' // 表示已提交
      releaseNews(temp).then(res => {
        const { msg } = res
        this.$notify({
          title: 'Success',
          message: msg,
          type: 'success',
          duration: 3000
        })
        this.getNewsList()
      })
    },
    // switch触发
    handleSetStatus(row) {
      let temp = row
      temp.role = this.role
      // const flag = temp.Switch
      // switch=true：表示通过审核,switch=false:表示未通过审核
      updateNewsStatus(temp).then(res => {
        const { msg } = res
        this.$notify({
          title: 'Success',
          message: msg,
          type: 'success',
          duration: 2000
        })
        this.getNewsList()
      })
    },
    // 导出表格
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['新闻标题', '新闻内容', '发布时间', '作者', '所属部门', '所属类别', '浏览次数','审核状态','发布状态']
        const filterVal = ['新闻标题', '新闻内容', '发布时间', '作者', '所属部门', '所属类别', '浏览次数','审核状态','发布状态']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'news'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      let data = []
      this.searchList.forEach(item => {
        let temp = []
        temp.push(item.title, item.content, item.createTime, item.userName, item.deptName, item.category,item.clickNum, item.newsStatus,item.status)
        data.push(temp)
      })
      return data
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container{
    margin-top: 30px;
    .filter-container{
      width: 600px;
      display: flex;
      justify-content: space-between;
    }
    .el-table{
      font-size: 12px;
      &:hover{
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
      }
    }
  }
</style>

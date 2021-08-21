<!--新闻管理首页-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="searchVal" :placeholder="'按'+searchType+'搜索'" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter(searchType)" />
      <el-select v-model="searchType" placeholder="请选择搜索类型" style="width: 150px" class="filter-item">
        <el-option v-for="item in typeItems" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter(searchType)">搜索</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload" style="margin-left: 0">导出表格</el-button>
    </div>
    <el-table v-loading="listLoading" :data="searchList" border fit highlight-current-row style="width: 100%" stripe>
      <!--新闻标题-->
      <el-table-column label="新闻标题" prop="title" align="center" min-width="30px">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <!--发布时间-->
      <el-table-column label="发布时间" prop="createTime" align="center" min-width="13px">
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
      <el-table-column label="所属部门" prop="deptName" align="center" min-width="8px">
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
      <el-table-column label="浏览次数" prop="clickNum" align="center" min-width="8px">
        <template slot-scope="{row}">
          <span>{{ row.clickNum }}</span>
        </template>
      </el-table-column>
      <!--状态：发布未未审核，审核通过，审核未通过-->
      <el-table-column label="审核状态" prop="newsStatus" align="center" min-width="8px">
        <template slot-scope="{row}">
          <span>{{ row.newsStatus }}</span>
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
import { deleteNewsById, getnewsList } from '@/api/news/news'
const defaultForm = {
  loginuserCode :'',
  author: '',
  status: 'draft', //导航条的状态
  title: '', // 文章题目
  content: '', // 文章内容
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: 0,
  platforms: ['院内网站'],  // 1=院内网站，2=院外网站，3=院内网站和院外网站
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
        '草稿': 'warning'
      }
      return  statusMap[status]
    }
  },
  data(){
    return {
      listQuery: {
        page: 1,
        limit: 7,
        role: localStorage.getItem('role')
      },
      total: 0,
      listLoading: false,
      searchVal: '',
      searchType: '新闻标题',
      typeItems: ['新闻标题', '发布作者', '新闻类别', '发布时间'],
      downloadLoading: false,
      list: null,
      searchList: [],
      temp: Object.assign({},defaultForm)
    }
  },
  mounted() {
    if (localStorage.getItem('role') !== 'admin'){
      this.$router.push({name: 'Page401'})
    }
    this.getNewsList()
  },
  methods:{
    //按关键字搜索内容
    handleFilter(type){
      if(type === '新闻标题'){
        this.searchList = this.list.filter(item => {return item.title.match(this.searchVal)})
      }else if(type === '发布作者'){
        this.searchList = this.list.filter(item => {return item.userName.match(this.searchVal)})
      }else if(type === '新闻类别'){
        this.searchList = this.list.filter(item => {return item.category.match(this.searchVal)})
      }else if(type === '发布时间'){
        this.searchList = this.list.filter(item => {return item.createTime.match(this.searchVal)})
      }
    },
    // 获取新闻列表
    getNewsList() {
      this.listLoading = true
      getnewsList(this.listQuery).then(res=>{
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
          this.getNewsList()
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['ID', '发布时间', '作者', '新闻标题', '所属部门', '所属类别', '浏览次数']
        const filterVal = ['ID', '发布时间', '作者', '新闻标题', '所属部门', '所属类别', '浏览次数']
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

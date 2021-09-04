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
        :key="tableKey"
        v-loading="listLoading"
        :data="searchList"
        border
        fit
        highlight-current-row
        style="width: 100%;">
        <!--自增id-->
        <el-table-column label="ID" prop="id" align="center" min-width="5px">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <!--创建时间-->
        <el-table-column label="投递时间" prop="createdTime" align="center" min-width="8px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <i class="el-icon-time" style="margin-right: 3px;"></i>
            <span>{{ row.createdTime }}</span>
          </template>
        </el-table-column>
        <!--岗位名称-->
        <el-table-column label="岗位名称" prop="positionName" align="center" :show-overflow-tooltip="true" min-width="8px">
          <template slot-scope="{row}">
            <span>{{ row.positionName }}</span>
          </template>
        </el-table-column>
        <!--求职者姓名-->
        <el-table-column label="姓名" prop="username" align="center" :show-overflow-tooltip="true" min-width="7px">
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
        <el-table-column label="手机号" prop="phone" align="center" min-width="8px" :show-overflow-tooltip="true">
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
        <el-table-column label="简历下载" prop="resume" align="center" min-width="8px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.resume }}</span>
          </template>
        </el-table-column>
        <!--状态审核-->
        <el-table-column label="状态审核" prop="status" align="center" min-width="8px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.status }}</span>
          </template>
        </el-table-column>
        <!--操作-->
        <el-table-column label="操作" align="center" min-width="8px" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getPost2PositionListByUid } from '@/api/recruit/position'
export default {
  name: 'postlist',
  data() {
    return {
      listLoading: false,
      searchVal: '',
      searchType: '岗位名称',
      typeItems: ['岗位名称', '求职者姓名', '专业', '毕业学校'],
      list: [],
      searchList:[],
    }
  },
  methods: {
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
      getPost2PositionListByUid().then(res => {
        const { items, msg } = res
        this.searchList = items
        this.list = items
        this.$message.success(msg)
        this.listLoading = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container{
    .title{
      width: 400px;
      display: flex;
      justify-content: space-between;
    }
    .table-container{
      margin-top: 15px;
    }
  }
</style>

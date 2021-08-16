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
    <el-divider></el-divider>
    <el-table v-loading="listLoading" :data="searchList" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        searchVal:'',
        searchType:'新闻标题',
        typeItems:['新闻标题','发布作者','新闻内容','发布时间'],
        downloadLoading:false,
        searchList:[]
      }
    },
    methods:{
      //按关键字搜索内容
      handleFilter(type){
        if(type ==='新闻标题'){
          this.searchList=this.list.filter(item=>{return item.deptName.match(this.searchVal)})
        }else if(type === '发布作者'){
          this.searchList=this.list.filter(item=>{return item.deptLeader.match(this.searchVal)})
        }else if(type === '新闻内容'){
          this.searchList=this.list.filter(item=>{return item.deptAddr.match(this.searchVal)})
        }else if(type === '发布时间'){
          this.searchList=this.list.filter(item=>{return item.deptAddr.match(this.searchVal)})
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .app-container{
    .filter-container{
      width: 600px;
      display: flex;
      justify-content: space-around;
    }
  }
</style>

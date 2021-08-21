<template>
  <div class="app-container">
    <div class="title">
      <h3>新闻模块管理</h3>
    </div>
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="新闻分类管理" name="first">
          <el-form ref="postForm" :model="postForm" label-width="100px">
            <el-form-item label="新闻类别">
              <el-input placeholder="请输入新闻类别" v-model="postForm.name" :clearable="true"></el-input>
            </el-form-item>
          </el-form>
          <div class="btn">
            <el-button type="primary" @click="createData">添加</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="发文作者管理" name="second">作者管理</el-tab-pane>
        <el-tab-pane label="发文科室管理" name="third">科室管理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { createCategory } from '@/api/news/news'
  export default {
    name: 'manager',
    data() {
      return {
        activeName: 'first',
        postForm: { username: '', name: '' }
      }
    },
    mounted() {
      this.postForm.username = localStorage.getItem('name')
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab,event)
      },
      createData() {
        this.$confirm('是否添加?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning' }).then(() => {
          createCategory(this.postForm).then((res) => {
            const { msg } = res
            this.$notify({
              title: 'Success',
              message: msg,
              type: 'success',
              duration: 2000
            })
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-container{
    .el-input{
      width: 200px;
    }
  }
</style>

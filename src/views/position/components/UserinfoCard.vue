<template>
    <!--岗位收藏列表-->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="font-size: 16px;color: #000">{{ title }}</span>
    </div>
    <el-table style="width: 100%" :data="showList">
      <el-table-column
        align="center"
        prop="id"
        label="序号"
        width="180">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="positionName"
        label="岗位名称"
        width="180">
        <template slot-scope="{row}">
          <span>{{ row.positionName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="createdTime"
        label="收藏时间">
        <template slot-scope="{row}">
          <i class="el-icon-time" style="margin-right: 3px;"></i>
          <span>{{ row.createdTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <el-button @click="HandleCollect" type="warning" size="mini">已收藏</el-button>
        <el-button @click="HandleDelete" type="danger" size="mini">删除</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  export default {
    name: 'UserinfoCard',
    props: {
      title: {
        type: String,
        default: () => {
          return  '已收藏的岗位'
        }
      },
      showList: {
        type: Array,
        default: ()=> {
          return [{ id:1, positionName: '消化内科医师', createdTime: '2021-08-31 15:02:31' }]
        }
      }
    },
    methods: {
      HandleCollect() {
        this.$emit('collect')
      },
      HandleDelete() {
        this.$emit('delete')
      }
    }
  }
</script>

<style lang="scss"  scoped>
  .box-card{
    margin: 0 !important;
    padding: 0 !important;
  }
</style>

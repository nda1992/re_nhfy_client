<template>
  <!-- 招聘管理主页：轮播图+已发布的岗位列表 -->
  <div class="app-container">
    <div>
      <el-backtop :bottom="100"></el-backtop>
    </div>
    <div class="header">
      <el-button type="text" @click="HandleRegister">注册</el-button>
      <el-button type="text" @click="HandleLogin">登录</el-button>
    </div>
    <!--<div class="tip"><span>需要发布招聘信息的老师请访问"新闻管理的新闻发布"页面</span></div>-->
    <div class="post">
      <div class="user-images">
        <el-carousel :interval="6000" type="card" height="320px">
          <el-carousel-item v-for="item in carouselImages" :key="item">
            <img :src="item" class="image">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!--岗位列表-->
    <div class="list">
      <h2 style="margin-left: 20px">在招岗位</h2>
      <PositionCard :positionInfo="position" v-for="(position,index) in positionList"></PositionCard>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPositionList()" />
    </div>
    <div class="footer">
      <div>南华大学附属第一医院</div>
      <div>©Copyright</div>
      <div>医院地址：衡阳市船山路69号</div>
    </div>
  </div>
</template>
<script>
  import PositionCard from '@/components/PositionCard/index'
  import { getPositionList } from '@/api/recruit/recruit'
  import Pagination from '@/components/Pagination'
  export default {

    components: {
      PositionCard,
      Pagination
    },
    data() {
      return {
        carouselImages: [
          `${process.env.BASE_URL}images/test1.png`,
          `${process.env.BASE_URL}images/test2.jpg`,
          `${process.env.BASE_URL}images/test3.jpg`,
          `${process.env.BASE_URL}images/test4.jpg`,
          `${process.env.BASE_URL}images/test5.png`,
          `${process.env.BASE_URL}images/test6.jpg`,
          `${process.env.BASE_URL}images/test7.jpg`,
          `${process.env.BASE_URL}images/test8.jpg`
        ],
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 10
          // role: localStorage.getItem('role')
        },
        total: 0,
        positionList: []
      }
    },
    mounted() {
      this.getPositionList()
    },
    methods: {
      // 获取所有岗位列表
      getPositionList() {
        getPositionList(this.listQuery).then(res => {
          this.listLoading = true
          this.positionList = res.positions
          this.total = res.total
          setTimeout(() => {
            this.listLoading = false
          }, 1000)
        })
      },
      // 处理注册
      HandleRegister() {

      }

    }
  }
</script>
<style lang="scss" scoped>
  .app-container{
    position: relative;
    padding: 0;
    .header{
      z-index: 10;
      width: 100%;
      position: fixed;
      top: 0;
      padding-right: 50px;
      height: 50px;
      background: #5c9291;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .el-button{
        color: #e7e7eb;
        &:hover{
          color: #1f3134;
        }
      }
    }
    .tip{
      width: 100%;
      display: inline-block;
      height: 20px;
      background: #99a9bf;
      color: #000;
    }
    .post {
      font-size: 14px;
      /*border-bottom: 1px solid #d2d6de;*/
      /*margin: 20px;*/
      padding-top: 32px;
      color: #666;
      .image {
        width: 100%;
        height: 100%;
      }
      .user-images {
        padding-top: 20px;
      }
    }
    .list{
      padding: 20px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }
    .footer{
      height: 150px;
      padding: 40px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      margin: 0 auto;
      color: #99a9bf;
    }
  }
</style>

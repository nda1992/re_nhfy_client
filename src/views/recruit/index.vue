<template>
<!-- 招聘管理主页：轮播图+已发布的岗位列表 -->
    <div class="app-container">
      <div>
        <el-backtop :bottom="100"></el-backtop>
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
        <PositionCard :positionInfo="position" v-for="(position,index) in positionList" @gotoPosition="gotoPosition"></PositionCard>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPositionList()" />
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
    //跳转到岗位列表页面
    gotoPosition() {
      // console.log(this.$route)
      this.$router.push({ path: '/position' })
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container{
    padding: 20px 0 20px 0;
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
      margin: 20px;
      padding-bottom: 15px;
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
      padding: 10px 0;
      &:hover{
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
      }
    }
  }
</style>

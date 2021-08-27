<template>
<!-- 招聘管理主页：轮播图+已发布的岗位列表 -->
    <div class="app-container">
      <!--<div class="tip"><span>需要发布招聘信息的老师请访问"新闻管理的新闻发布"页面</span></div>-->
      <div class="post">
        <div class="user-images">
          <el-carousel :interval="6000" type="card" height="220px">
            <el-carousel-item v-for="item in carouselImages" :key="item">
              <img :src="item" class="image">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <!--岗位列表-->
      <div class="list">
        <PositionCard></PositionCard>
      </div>
    </div>
</template>
<script>
import PositionCard from '@/components/PositionCard/index'
export default {
  components: {
    PositionCard
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
    }
  },
  computed() {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
  .app-container{
    padding: 0 0 20px 0;
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
      margin-bottom: 15px;
      padding-bottom: 15px;
      color: #666;
      .image {
        width: 100%;
        height: 100%;
      }
      .user-images {
        padding-top: 20px;
        .el-carousel{
          .el-carousel__container{
            height: 265px;
          }
        }
      }
    }
  }
</style>

<template>
  <!-- 招聘管理主页：轮播图+已发布的岗位列表 -->
  <div class="app-container">
    <div>
      <el-backtop :bottom="100" />
    </div>
    <!--<div class="tip"><span>需要发布招聘信息的老师请访问"新闻管理的新闻发布"页面</span></div>-->
    <div class="post">
      <el-row>
        <el-col>
          <SwiperItem :items="carouselImages" @getNewsById="getNewsById" />
        </el-col>
      </el-row>
    </div>
    <!--岗位列表-->

    <el-row>
      <el-col :xs="24">
        <div class="list">
          <h2 style="margin-left: 20px">在招岗位</h2>
          <PositionCard
            v-for="(position, index) in positionList"
            :position-info="position"
            :show-btns="false"
          />
          <el-row>
            <el-col :span="24">
              <pagination
                v-show="total > 0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="getPositionList()"
              />
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import PositionCard from '@/components/PositionCard/index'
import { getPositionList, getSwiperImgs2Run } from '@/api/recruit/recruit'
import Pagination from '@/components/Pagination'
import SwiperItem from '@/components/SwiperItem/index'
export default {
  components: {
    PositionCard,
    Pagination,
    SwiperItem
  },
  data() {
    return {
      // carouselImages: [
      //   `${process.env.BASE_URL}images/test1.jpg`,
      //   `${process.env.BASE_URL}images/test2.jpg`,
      //   `${process.env.BASE_URL}images/test6.jpg`,
      // ],
      carouselImages: [],
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 0,
      positionList: []
    }
  },
  mounted() {
    this.getPositionList()
    this.getSwiperImgs()
  },
  methods: {
    // 获取所有岗位列表
    getPositionList() {
      getPositionList(this.listQuery).then(res => {
        const { positions, total } = res
        this.listLoading = true
        this.positionList = positions
        this.total = total
        setTimeout(() => {
          this.listLoading = false
        }, 1000)
      })
    },
    // 获取所有的轮播图片
    getSwiperImgs() {
      getSwiperImgs2Run({}).then(res => {
        const { swipers } = res
        console.log(res)
        this.carouselImages = swipers.map(e => {
          return { id: e.id, url: e.url, text: e.text, newsid: e.newsid }
        })
      })
    },
    getNewsById(id) {
      this.$router.push({ path: `/recruit/getnews/${id}` })
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  margin: 0;
  padding-top: 10px;
  overflow: scroll;
  .tip {
    width: 100%;
    display: inline-block;
    height: 20px;
    background: #99a9bf;
    color: #000;
  }
  .post {
    font-size: 14px;
    color: #666;
    .image {
      width: 100%;
      height: 100%;
    }
  }
  .list {
    width: 100%;
    padding: 10px 20px 0 20px;
    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
  }
}
</style>

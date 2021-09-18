<template>
  <!--轮播图-->
  <div class="position-list">
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
      <div class="header">
        <h2 style="margin-left: 20px">在招岗位</h2>
        <span>筛选</span>
      </div>
      <PositionCard :positionInfo="position" v-for="(position,index) in positionList" :key="position.id" @gotoPosition="gotoPosition(position.id)" @gotoCollect="gotoCollect(position.id, position.isCollected)" />
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPositionList()" />
    </div>
  </div>
</template>

<script>
import PositionCard from '@/components/PositionCard/index'
import { getPositionList, UserinfoDetail, postPosition, handleCollect } from '@/api/recruit/position'
import { getSwiperImgs2Run } from '@/api/recruit/position'
import Pagination from '@/components/Pagination'
// 对sessionStorage加密
import { StorageClass } from '@/utils/session'
export default {
  name: 'positionList',
  components: {
    PositionCard,
    Pagination
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
      jobseekerId: undefined,
      total: 0,
      positionList: [],
      // 用户信息是否完整,如果不完整，不能投递简历
      doneUserinfo: undefined
    }
  },
  mounted() {
    this.getJobseekerId()
    this.getUserinfoDetail()
    this.getPositionList()
    this.getSwiperImgs()
  },
  computed: {
    isLogin() {
      return sessionStorage.getItem('isLogin')
    }
  },
  methods: {
    getJobseekerId() {
      if (this.isLogin) {
        this.jobseekerId = StorageClass.getSession('jobseekerId').jobseekerId
      }
    },
    // 获取所有的轮播图片
    getSwiperImgs() {
      getSwiperImgs2Run({}).then(res => {
        const { swipers } = res
        this.carouselImages = swipers.map(e => e.url)
      })
    },
    // 根据用户id拉取完整信息
    getUserinfoDetail() {
      if (this.jobseekerId === undefined) {
        return
      }
      UserinfoDetail(this.jobseekerId).then(res => {
        const { doneUserinfo } = res
        this.doneUserinfo = doneUserinfo
      })
    },
    // 获取所有岗位列表
    getPositionList() {
      const temp = Object.assign({}, this.listQuery, { jobseekerId: this.jobseekerId })
      getPositionList(temp).then(res => {
        this.listLoading = true
        this.positionList = res.positions
        this.total = res.total
        setTimeout(() => {
          this.listLoading = false
        }, 1000)
      })
    },
    // 岗位收藏
    gotoCollect(id, isCollected) {
      if (this.isLogin === false || this.isLogin === null) {
        this.$message.error('你还没有登录,请先登录')
        return
      }
      const temp = { positionId: id, jobSeekerId: this.jobseekerId, isCollected: isCollected }
      handleCollect(temp).then(res => {
        const { msg } = res
        this.$message.success(msg)
        this.getPositionList(this.listQuery)
      })
    },

    // 投递简历
    gotoPosition(id) {
      if (this.isLogin === false || this.isLogin === null) {
        this.$message.error('你还没有登录,请先登录')
        return
      }
      if (!this.doneUserinfo) {
        this.$message.error('你的个人信息还未完善，请先完善个人信息')
        return
      }
      const temp = { positionId: id, jobSeekerId: this.jobseekerId }
      this.$confirm('只能投递一次,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning' }).then(() => {
        postPosition(temp).then(res => {
          this.getPositionList(this.listQuery)
          const { msg } = res
          this.$notify({
            title: 'Success',
            message: msg,
            type: 'success'
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .position-list{
    margin-bottom: 80px;
    .post {
      font-size: 14px;
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
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .header{
        width: 500px;
        background: #ff6666;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
</style>

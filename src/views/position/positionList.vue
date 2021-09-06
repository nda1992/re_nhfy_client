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
      <h2 style="margin-left: 20px">在招岗位</h2>
      <PositionCard :positionInfo="position" v-for="(position,index) in positionList" @gotoPosition="gotoPosition(position.id)" @gotoCollect="gotoCollect(position.id, position.isCollected)"></PositionCard>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPositionList()" />
    </div>
  </div>
</template>

<script>
import PositionCard from '@/components/PositionCard/index'
import { getPositionList, UserinfoDetail, postPosition, handleCollect } from '@/api/recruit/position'
import Pagination from '@/components/Pagination'
export default {
  name: 'positionList',
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
        limit: 10,
        jobseekerId: sessionStorage.getItem('jobseekerId')
        // role: localStorage.getItem('role')
      },
      total: 0,
      positionList: [],
      // 用户信息是否完整,如果不完整，不能投递简历
      doneUserinfo: undefined
    }
  },
  mounted() {
    this.getUserinfoDetail()
    this.getPositionList(Object.assign({},this.listQuery,{jobseekerId: sessionStorage.getItem('jobseekerId')}))
  },
  computed: {
    isLogin() {
      return sessionStorage.getItem('isLogin')
    },
    jobseekerId() {
      return sessionStorage.getItem('jobseekerId')
    }
  },
  methods: {
    // 根据用户id拉取完整信息
    getUserinfoDetail() {
      UserinfoDetail(this.jobseekerId).then(res => {
        const { userinfo, doneUserinfo } = res
        this.doneUserinfo = doneUserinfo
      })
    },
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
      if(this.doneUserinfo){
        this.$message.error('你的个人信息还未完善，请先完善个人信息')
        return
      }
      const temp = {  positionId: id, jobSeekerId: this.jobseekerId }
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
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }
  }
</style>

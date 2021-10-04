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
      <div class="header" :style="scrollStyle">
        <h2 style="margin-left: 20px">在招岗位</h2>
        <div class="filter">
          <el-tooltip class="item" effect="dark" content="添加岗位筛选条件" placement="bottom">
            <div @click="openFilterDialog">
              <svg-icon icon-class="filter" />
              <span style="margin-left: 5px;">筛选</span>
            </div>
          </el-tooltip>
          <el-button v-show="isFilter" type="text" @click="clearFilter">清除筛选</el-button>
        </div>

      </div>
      <PositionCard
        v-for="(position) in positionList"
        :key="position.id"
        :position-info="position"
        @gotoPosition="gotoPosition(position.id)"
        @gotoCollect="gotoCollect(position.id, position.isCollected)"
      />
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPositionList()" />
    </div>
    <div>
      <el-dialog title="岗位条件筛选" :visible.sync="dialogFormVisible">
        <el-form ref="filterForm" :model="filterForm" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="岗位类型" prop="type">
            <el-select v-model="filterForm.type" default-first-option>
              <el-option v-for="(item,index) in typeOptions" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="英语要求" prop="english" default-first-option>
            <el-select v-model="filterForm.english">
              <el-option v-for="(item,index) in englishOptions" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="年龄要求" prop="age" default-first-option>
            <el-select v-model="filterForm.age">
              <el-option v-for="(item,index) in ageOptions" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="学历要求" prop="degree" default-first-option>
            <el-select v-model="filterForm.degree">
              <el-option v-for="(item,index) in degreeOptions" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="计划人数" prop="num" default-first-option>
            <el-select v-model="filterForm.num">
              <el-option v-for="(item,index) in numOptions" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="招聘科室" prop="deptName" default-first-option>
            <el-select v-model="filterForm.deptName">
              <el-option v-for="(item,index) in deptNameOptions" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitFilterForm">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import PositionCard from '@/components/PositionCard/index'
import { getPositionList, UserinfoDetail, postPosition, handleCollect, filterPositions } from '@/api/recruit/position'
import { getSwiperImgs2Run } from '@/api/recruit/position'
import Pagination from '@/components/Pagination'
// 对sessionStorage加密
import { StorageClass } from '@/utils/session'
export default {
  name: 'PositionList',
  components: {
    PositionCard,
    Pagination
  },
  data() {
    return {
      scrollStyle: { position: '', top: '', zIndex: '', left: '' },
      // 需要分享的岗位对象
      shareObj: { jobseekerId: undefined, positionId: undefined },
      // carouselImages: [
      //   `${process.env.BASE_URL}images/test1.jpg`,
      //   `${process.env.BASE_URL}images/test2.jpg`,
      //   `${process.env.BASE_URL}images/test6.jpg`,
      // ],
      SelectOptions: [{ label: '', value: '' }, {}, {}],
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
      doneUserinfo: undefined,
      // 是否使用了筛选
      isFilter: false,
      dialogFormVisible: false,
      // 收集所有过滤条件的表单
      filterForm: {
        type: '不限',
        english: '不限',
        age: '不限',
        degree: '不限',
        num: '不限',
        deptName: '不限'
      },
      // dialog中的条件选择
      typeOptions: ['不限', '事业编', '非事业编'],
      englishOptions: ['不限', '英语四级', '英语六级'],
      ageOptions: ['不限', '30岁及以下', '32岁及以下', '35岁及以下'],
      degreeOptions: ['不限', '本科及以上', '硕士研究生及以上', '博士'],
      numOptions: ['不限', 1, 2, 3, 4, '4人以上'],
      deptNameOptions: []
    }
  },
  computed: {
    isLogin() {
      return sessionStorage.getItem('isLogin')
    }
  },
  mounted() {
    this.getJobseekerId()
    this.getUserinfoDetail()
    this.getPositionList()
    this.getSwiperImgs()
    this.scroll()
  },
  methods: {
    getJobseekerId() {
      if (this.isLogin) {
        this.jobseekerId = StorageClass.getSession('jobseekerId').jobseekerId
      }
    },
    // 滚动鼠标实现固定定位
    scroll() {
      document.addEventListener('scroll', (event) => {
        var scrollDistance = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollDistance > 360) {
          this.scrollStyle.position = 'fixed'
          this.scrollStyle.top = '50px'
          this.scrollStyle.zIndex = 100
          this.scrollStyle.left = '0px'
        } else {
          this.scrollStyle.position = 'static'
          this.scrollStyle.top = 0
          this.scrollStyle.zIndex = 0
          this.scrollStyle.left = 0
        }
      })
    },
    // 获取所有的轮播图片
    getSwiperImgs() {
      getSwiperImgs2Run({ swiperFlag: 'recruit' }).then(res => {
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
        const temp = res.positions.map(e => e.deptName)
        this.deptNameOptions = ['不限', ...temp]
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
    },
    // 重置filterForm
    resetFilterForm() {
      this.filterForm = {
        type: '不限',
        english: '不限',
        age: '不限',
        degree: '不限',
        num: '不限',
        deptName: '不限'
      }
    },
    // 打开条件筛选对话框
    openFilterDialog() {
      // this.resetFilterForm()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['filterForm'].clearValidate()
      })
    },
    submitFilterForm() {
      const temp = Object.assign({}, this.filterForm, this.listQuery)
      filterPositions(temp).then(res => {
        const { positions, total, msg } = res
        this.positionList = positions
        this.total = total
        this.dialogFormVisible = false
        this.isFilter = true
        this.$message.success(msg)
      })
    },
    // 清除筛选条件
    clearFilter() {
      this.getPositionList()
      this.resetFilterForm()
      this.isFilter = false
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
        background: #ffffff;
        /*background: #409EFF;*/
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .filter{
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-right: 30px;
          cursor: pointer;
          &:hover{
            color: #409EFF;
          }
          .item{
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>

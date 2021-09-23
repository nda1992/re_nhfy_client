<template>
  <div class="app-container">
    <div class="title">
      <!--<h3>新闻模块管理</h3>-->
    </div>
    <div class="tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="新闻分类管理" name="first">
          <NewsCategory @createData="createData" />
        </el-tab-pane>
        <el-tab-pane label="发文作者和科室" name="second">发文作者和科室</el-tab-pane>
        <el-tab-pane label="招聘系统轮播图" name="third">
          <div class="swiper-header">
            <div style="color: #ff4949;font-size: 12px;margin-bottom: 10px;">(切换状态选择要播放的轮播图，最多6张)</div>
          </div>
          <ImgList
            :img-list="imgList"
            :src-list="srcList"
            :num="num"
            @handleDelete="handleDelete"
            @handleSetStatus="handleSetStatus"
          />
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getAllSwiperImgs" />
          <el-divider />
          <UploadImg :user-code="userCode" @getAllSwiperImgs="getAllSwiperImgs" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { createCategory } from '@/api/news/news'
import { getAllSwiperImgs, deleteImgById, SetSwiperStatus } from '@/api/recruit/recruit'
import NewsCategory from './components/Category/NewsCategory'
import ImgList from './components/SwiperImgs/ImgList'
import UploadImg from './components/SwiperImgs/UploadImg'
import Pagination from '@/components/Pagination'
export default {
  name: 'Manager',
  components: {
    NewsCategory,
    ImgList,
    UploadImg,
    Pagination
  },
  data() {
    return {
      total: 0,
      listQuery: {
        limit: 10,
        page: 1
      },
      activeName: 'third',
      // 轮播图的数量
      num: 0,
      imgList: [],
      srcList: [],
      selectList: []
    }
  },
  computed: {
    username() {
      return localStorage.getItem('name')
    },
    userCode() {
      return localStorage.getItem('userCode')
    }
  },
  mounted() {
    this.getAllSwiperImgs()
  },
  methods: {
    createData(form) {
      const temp = Object.assign({}, form, { username: this.username })
      this.$confirm('是否添加?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning' }).then(() => {
        createCategory(temp).then((res) => {
          const { msg } = res
          this.$notify({
            title: 'Success',
            message: msg,
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    // 查询已经上传的所有轮播图
    getAllSwiperImgs() {
      const temp = Object.assign({}, { userCode: this.userCode }, this.listQuery)
      getAllSwiperImgs(temp).then(res => {
        const { files, total, num } = res
        this.imgList = files
        this.total = total
        this.num = num
        this.srcList = this.imgList.map(e => e.url)
      })
    },
    handleDelete(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteImgById({ id: row.id, url: row.url }).then(res => {
          const { msg } = res
          this.$notify({
            title: 'Success',
            message: msg,
            type: 'success',
            duration: 2000
          })
          this.getAllSwiperImgs()
        })
      })
    },
    // 根据switch的值来更新status的状态，status=1：是轮播图，status=0：不是轮播图
    handleSetStatus(row) {
      const temp = Object.assign({}, { Switch: row.Switch, id: row.id })
      SetSwiperStatus(temp).then(res => {
        const { msg } = res
        this.$notify({
          title: 'Success',
          message: msg,
          type: 'success',
          duration: 2000
        })
        this.getAllSwiperImgs()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container{

  }
</style>

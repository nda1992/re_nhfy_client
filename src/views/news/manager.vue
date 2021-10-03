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
        <el-tab-pane label="官网菜单管理" name="second">
          <Menu @submit="submit"/>
        </el-tab-pane>
        <el-tab-pane label="招聘系统轮播图" name="third">
          <div class="swiper-header">
            <div style="color: #ff4949;font-size: 12px;margin-bottom: 10px;">(切换状态选择要播放的轮播图，最多6张)</div>
          </div>
          <ImgList
            :imgList="imgList"
            :num="num"
            @handleDelete="handleDelete"
            @handleSetStatus="handleSetStatus"
          />
          <pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getAllSwiperImgs" />
          <el-divider />
          <UploadImg
          :user-code="userCode"
          @getAllSwiperImgs="getAllSwiperImgs" />
        </el-tab-pane>
        <el-tab-pane label="官网视频" name="fourth">
          <div class="video-header">
            <div style="color: #ff4949;font-size: 12px;margin-bottom: 10px;">(切换状态选择在官网中要展示的视频，最多4个)</div>
          </div>
          <VideoList
          :videoList='videoList'
          :num='videoNum'
          @handleSetVideoStatus='handleSetVideoStatus'
          @handleDeleteVideo='handleDeleteVideo'
          @openVideoPlayerVisible='openVideoPlayerVisible'/>
          <pagination
          v-show="videoTotal>0"
          :total="videoTotal"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getAllVideosList" />
          <UploadVideo 
          :userCode='userCode'
          :deptName='deptName'
          @getAllVideosList='getAllVideosList'/>
        </el-tab-pane>
        <div>
          <VideoPlay
          :openDialogvisible='openDialogvisible'
          :video='videoConfig' />
        </div>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { createCategory, submitMenu } from '@/api/news/news'
import { getAllSwiperImgs, deleteImgById, SetSwiperStatus } from '@/api/recruit/recruit'
import { getAllVideos, deleteVideoById, SetVideoStatus } from '@/api/website/website'
import Pagination from '@/components/Pagination'
import VideoPlay from '@/components/VideoPlayer/index'
import NewsCategory from './components/Category/NewsCategory'
import ImgList from './components/SwiperImgs/ImgList'
import UploadImg from './components/SwiperImgs/UploadImg'
import Menu from './components/Menus/Menu'
import VideoList from './components/Video/VideoList'
import UploadVideo from './components/Video/UploadVideo'
import { StorageClass } from '@/utils/session'
export default {
  name: 'Manager',
  components: {
    NewsCategory,
    ImgList,
    UploadImg,
    Pagination,
    Menu,
    VideoList,
    UploadVideo,
    VideoPlay
  },
  data() {
    return {
      total: 0,
      listQuery: {
        limit: 10,
        page: 1
      },
      videoTotal: 0,
      activeName: 'fourth',
      // 轮播图的数量
      num: 0,
      imgList: [],
      // 视频相关的变量
      videoNum: 0,
      videoList: [],
      openDialogvisible: false,
      videoConfig: undefined
    }
  },
  computed: {
    username() {
      return StorageClass.getSession('name').name
    },
    userCode() {
      return StorageClass.getSession('userCode').userCode
    },
    deptName() {
      return StorageClass.getSession('deptName').deptName
    }
  },
  mounted() {
    this.getAllVideosList()
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
      })
    },
    handleDelete(row) {
      this.$confirm('是否删除图片?', '提示', {
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
    },
    submit(menuForm) {
      submitMenu(menuForm).then(res => {
        const { msg } = res
        this.$message.success(msg)
      })
    },
    // 获取某个管理员上传的所有视频列表
    getAllVideosList() {
      const temp = Object.assign({}, { userCode: this.userCode }, this.listQuery)
      getAllVideos(temp).then(res => {
        const { items, total, num } = res
        this.videoList = items
        this.videoNum = num
        this.videoTotal = total
      }) 
    },
    handleSetVideoStatus(row) {
      const temp = Object.assign({}, { Switch: row.Switch, id: row.id })
      SetVideoStatus(temp).then(res => {
        const { msg } = res
        this.$notify({
          title: 'Success',
          message: msg,
          type: 'success',
          duration: 2000
        })
        this.getAllVideosList()
      })
    },
    // 删除视频
    handleDeleteVideo(row) {
      this.$confirm('是否删除视频?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteVideoById({ id: row.id, url: row.url }).then(res => {
          const { msg } = res
          this.$notify({
            title: 'Success',
            message: msg,
            type: 'success',
            duration: 2000
          })
          this.getAllVideosList()
        })
      })
    },
    // 打开播放视频对话框
    openVideoPlayerVisible(row) {
      this.videoConfig = {
        url: row.url,
        title: row.title
      }
      this.openDialogvisible = true
    }
  }
}
</script>

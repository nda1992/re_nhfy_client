<template>
  <!--content的公共组件：15个cube跳转的第一个页面均到达这里-->
  <div class="content-main">
    <el-row>
      <el-col :span="24" :md="24">
        <!-- 视频列表和新闻列表分开处理 -->
        <showVideosCard
          v-if="category === '视频中心'"
          @getAllVideos="getAllVideos"
          @openDialog="openDialog"
          :videoList="videoList"
          :category="category"
          :listQuery="videoListQuery"
          :total="videoTotal"
        />
        <showNewsCard
          v-else
          @getNewsById="getNewsById"
          @getAllNews="getNewsByCategory"
          :category="category"
          :newsList="itemsList"
          :listQuery="listQuery"
          :total="total"
        />
      </el-col>
    </el-row>
    <VideoPlay
      :video="videoConfig"
      :openDialogvisible="visible"
      @closeDialog="closeVideoDialog"
    />
  </div>
</template>
<script>
import showNewsCard from './components/Center/showNewsCard'
import showVideosCard from './components/Content/showVideosCard'
import { getAllNewsByCategory } from '@/api/website/getnews'
import { getVideoListByStatus } from '@/api/website/website'
import VideoPlay from '@/components/VideoPlayer/index'
export default {
  components: {
    showNewsCard,
    showVideosCard,
    VideoPlay
  },
  data() {
    return {
      total: 0,
      listQuery: {
        limit: 10,
        page: 1
      },
      category: '',
      // 新闻列表
      itemsList: [],
      // 视频列表
      videoTotal: 0,
      videoListQuery: {
        limit: 10,
        page: 1
      },
      videoList: [],
      videoConfig: undefined,
      visible: false
    }
  },
  created() {
    this.category = this.$route.query.category
  },
  mounted() {
    this.getNewsByCategory()
    this.getAllVideos()
  },
  methods: {
    getNewsByCategory() {
      const temp = Object.assign({}, this.listQuery, {
        category: this.category
      })
      getAllNewsByCategory(temp).then(res => {
        const { items, total } = res
        this.total = total
        this.itemsList = items
      })
    },
    getNewsById(id) {
      this.$router.push({ path: `/nhfy/getnews/${id}` })
    },
    // 获取所有视频列表，category='视频中心'
    getAllVideos() {
      const temp = Object.assign({}, this.videoListQuery, {
        category: this.category
      })
      getVideoListByStatus(temp).then(res => {
        const { items, total } = res
        this.videoList = items
        this.videoTotal = total
      })
    },
    openDialog() {
      this.videoConfig = {
        title: item.title,
        url: item.url
      }
      this.visible = true
    },
    closeVideoDialog() {
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.content-main {
  padding: 20px;
}
</style>

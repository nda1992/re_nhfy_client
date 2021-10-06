<template>
  <div class="bottom-main">
    <el-row :gutter="20">
      <el-col :span="8">
        <VideoCenter :videoList="videoList" @openDialog="openDialog" />
      </el-col>
      <el-col :span="10">
        <MediaFocus />
      </el-col>
      <el-col :span="6">
        <UsuallyWebsite />
      </el-col>
    </el-row>
    <div>
      <VideoPlay
        :video="videoConfig"
        :openDialogvisible="dialogVisible"
        @closeDialog="closeVideoDialog"
      />
    </div>
  </div>
</template>

<script>
import VideoPlay from '@/components/VideoPlayer/index'
import VideoCenter from './Bottom/VideoCenter'
import MediaFocus from './Bottom/MediaFocus'
import UsuallyWebsite from './Bottom/UsuallyWebsite'
import { getVideoListByStatus } from '@/api/website/website'
export default {
  components: {
    VideoCenter,
    MediaFocus,
    UsuallyWebsite,
    VideoPlay
  },
  data() {
    return {
      videoList: [],
      dialogVisible: false,
      videoConfig: undefined,
      total: 0,
      listQuery: {
        limit: 4,
        page: 1
      }
    }
  },
  mounted() {
    this.getAllVideosList()
  },
  methods: {
    getAllVideosList() {
      const temp = Object.assign({}, { category: '视频中心' }, this.listQuery)
      getVideoListByStatus(temp).then(res => {
        const { items } = res
        this.videoList = items
      })
    },
    openDialog(item) {
      this.videoConfig = {
        title: item.title,
        url: item.url
      }
      this.dialogVisible = true
    },
    closeVideoDialog() {
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.bottom-main {
  position: relative;
  margin: 0 20px;
}
</style>

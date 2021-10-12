<template>
  <div class="app-container">
    <div class="news-title">
      <span>{{ newsItem.title }}</span>
    </div>
    <div class="news-info">
      <div class="info-container">
        <span>浏览次数: {{ newsItem.clickNum }}</span>
        <span>作者: {{ newsItem.userName }}</span>
        <span>来源: {{ newsItem.deptName }}</span>
        <span>发布时间: {{ createTime }}</span>
      </div>
    </div>
    <div class="news-content">
      <div v-html="newsItem.content" />
    </div>
  </div>
</template>
<script>
import { getNewsById } from '@/api/website/getnews'
import moment from 'moment'
export default {
  data() {
    return {
      newsItem: null,
      createTime: null
    }
  },
  mounted() {
    this.getNewsById()
  },
  methods: {
    getNewsById() {
      const temp = { id: this.$route.params.id }
      getNewsById(temp).then(res => {
        const { item } = res
        this.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
        this.newsItem = item
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding-left: 115px;
  padding-right: 115px;
  .news-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: #1f2d3d;
    margin: 20px 15px;
  }
  .news-info {
    width: 600px;
    margin: 0 auto;
    .info-container {
      display: flex;
      justify-content: space-around;
      font-size: 14px;
      color: #97a8be;
    }
  }
  .news-content {
    margin: 50px 150px;
  }
  a {
    text-decoration: none;
  }
}
</style>

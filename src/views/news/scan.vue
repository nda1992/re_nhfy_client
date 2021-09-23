<template>
  <div class="app-container">
    <div class="news-title"><span>{{ newsItem.title }}</span></div>
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
import { ScanById } from '../../api/news/news'
import moment from 'moment'
export default {
  name: 'Scan',
  data() {
    return {
      newsItem: null,
      createTime: null
    }
  },
  computed: {
    role() {
      return localStorage.getItem('role')
    }
  },
  mounted() {
    this.getNewsById()
  },
  methods: {
    // 根据id获取文章
    getNewsById() {
      const temp = { id: '', role: '' }
      temp.id = this.$route.params.id
      temp.role = this.role
      ScanById(temp).then(res => {
        const { item, msg } = res
        this.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
        this.$message.success(msg)
        this.newsItem = item
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container{
    padding-left:115px;
    padding-right: 115px;
    .news-title{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      color: #1f2d3d;
      margin-bottom: 15px;
    }
    .news-info{
      width: 600px;
      margin: 0 auto;
      .info-container{
        display: flex;
        justify-content: space-around;
        font-size: 14px;
        color: #97a8be;
      }
    }
    .news-content{
      margin-top: 50px;
    }
    a{
      text-decoration: none;
    }
  }
</style>

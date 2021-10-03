<template>
  <!--媒体聚焦-->
  <div>
    <div>
      <showNewsCard
      @getNewsById='getNewsById'
      :category='category'
      :newsList='itemsList'
      :getAllNews='getAllNews'
      :listQuery="listQuery"
      :total='total' />
    </div>
  </div>
</template>

<script>
import showNewsCard from '../Center/showNewsCard'
import { getAllNewsByCategory } from '@/api/website/getnews'
export default {
    components: {
        showNewsCard
    },
  data() {
    return {
      listQuery: {
        limit: 5,
        page: 1
      },
      total: 0,
      itemsList: [],
      category: '媒体聚焦'
    }
  },
  mounted(){
    this.getAllNews()
  },
  methods:{
    // 获取‘院务公开’下的所有新闻
    getAllNews(){
      const temp = Object.assign({}, this.listQuery, { category: this.category })
      getAllNewsByCategory(temp).then(res => {
        const { items, total } = res
        this.total = total
        this.itemsList = items
      })
    },
    getNewsById(id) {
      this.$router.push({ path: `/nhfy/getnews/${id}` })
    }
  }
}
</script>
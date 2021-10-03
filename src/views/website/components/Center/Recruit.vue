<template>
  <!--人事招聘-->
  <div>
    <div>
      <showNewsCard
      @getNewsById='getNewsById'
      :category='category'
      :newsList='itemsList'
      :getAllNews='getAllNews'
      :listQuery="listQuery"
      :total='total'/>
    </div>
  </div>
</template>

<script>
import showNewsCard from './showNewsCard'
import { getAllNewsByCategory } from '@/api/website/getnews'
export default {
  name: 'Recruit',
  components: {
    showNewsCard
  },
  data() {
    return {
      listQuery: {
        limit: 10,
        page: 1
      },
      total: 0,
      itemsList: [],
      category: '人事招聘'
    }
  },
  mounted(){
    this.getAllNews()
  },
  methods:{
    // 获取‘人事招聘’下的所有新闻
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
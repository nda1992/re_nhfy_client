<template>
  <!--采购信息-->
  <div>
    <el-row>
      <el-col :span="24" :md="24">
        <showNewsCard
          @getNewsById="getNewsById"
          @getAllNews="getAllNews"
          :category="category"
          :newsList="itemsList"
          :listQuery="listQuery"
          :total="total"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import showNewsCard from './showNewsCard'
import { getAllNewsByCategory } from '@/api/website/getnews'
export default {
  name: 'PurchaseMessage',
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
      category: '采购信息'
    }
  },
  mounted() {
    this.getAllNews()
  },
  methods: {
    // 获取‘采购信息’下的所有新闻
    getAllNews() {
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
    }
  }
}
</script>

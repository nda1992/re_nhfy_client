<template>
  <!--常用网站-->
  <div class="main">
    <div>
      <websiteList
        :category="category"
        :items="showlessList"
        :total="total"
        @openDialog="openDialog"
      />
    </div>
    <el-dialog :visible.sync="dialog" title="全部常用网站列表">
      <websiteList
        :category="category"
        :items="pageList"
        :total="total"
        :showmore="showmore"
        @getAllUsuallyWebsite="getAllUsuallyWebsite"
      />
    </el-dialog>
  </div>
</template>

<script>
import { getAllUsuallyWebsite } from '@/api/websitemanager/manager'
import websiteList from './websiteList'
export default {
  components: {
    websiteList
  },
  data() {
    return {
      category: '常用网站',
      total: 0,
      listQuery: {
        limit: 5,
        page: 1
      },
      showlessList: [],
      pageList: null,
      dialog: false,
      showmore: true
    }
  },
  mounted() {
    this.getAllUsuallyWebsite()
  },
  methods: {
    getAllUsuallyWebsite() {
      const temp = Object.assign({}, this.listQuery, { website: 'website' })
      getAllUsuallyWebsite(temp).then(res => {
        const { allItems, lessItems, total } = res
        // dialog中显示分页数据
        this.pageList = lessItems
        // 只显示4条,超出4条，显示在"更多"
        this.showlessList = allItems.slice(0, 4)
        this.total = total
      })
    },
    openDialog() {
      this.dialog = true
      this.showmore = false
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  .clearfix {
    font-weight: bold;
    font-size: 17px;
    color: #3b7960;
  }
  .list {
    .item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 60px;
      .content {
        display: flex;
        align-items: center;
        img {
          margin-right: 10px;
          width: 45px;
          height: 45px;
          border-radius: 5px;
        }
      }
    }
  }
  .more {
    margin-top: 10px;
    font-size: 14px;
    color: #3b7960;
    display: flex;
    justify-content: end;
  }
}
</style>

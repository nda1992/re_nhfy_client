<template>
<!--展示所有网站列表组件-->
    <div class="list-main">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
            <span>{{ category }}</span>
        </div>
        <div class="list">
          <div v-for="item in items" :key="item.id" class="item">
            <div class="content">
              <img :src="item.img">
              <a :href="item.url" target="_blank">{{ item.title }}</a>
            </div>
          </div>
        </div>
        <div v-if="total>5&&showmore" class="more" @click="openDialog">更多>></div>
        <pagination
        class='page'
        v-show="total > 0&&!showmore"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getAllUsuallyWebsite"
        />
      </el-card>
    </div>
</template>
<script>
import Pagination from "@/components/Pagination"
export default {
  name: 'websiteList',
  components: {
    Pagination
  },
  props: {
    category: {
      type: String,
      default: () => {
        return ''
      }
    },
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    total: {
      type: Number,
      default: () => {
        return 0
      }
    },
    showmore: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    listQuery: {
      type: Object,
      default: () => {
        return {
          limit: 5,
          page: 1
        }
      }
    }
  },
  methods: {
    openDialog() {
      this.$emit('openDialog')
    },
    getAllUsuallyWebsite() {
      this.$emit('getAllUsuallyWebsite')
    }
  }
}
</script>
<style lang="scss" scoped>
.list-main {
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
        a:hover {
          color: #3b7960;
        }
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
    color: #000;
    display: flex;
    justify-content: end;
    &:hover{
      cursor: pointer;
      color: #3b7960;
    }
  }
  .page {
    margin: 15px 0;
    padding: 0;
  }
}  
</style>
<template>
  <!-- 显示所有视频列表的组件 -->
  <div class="main">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>{{ category }}</span>
      </div>
      <div v-for="item in videoList" :key="item.id" class="videos">
        <div class="item" @click="openDialog">
          <img :src="item.cover" class="img" />
          <span class="title">{{ item.title }}</span>
        </div>
      </div>
      <pagination
        style="padding:0px;"
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getAllVideos"
      />
    </el-card>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'showVideosCard',
  components: {
    Pagination
  },
  props: {
    videoList: {
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
    listQuery: {
      type: Object,
      default: () => {
        return {
          limit: 10,
          page: 1
        }
      }
    },
    category: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  methods: {
    getAllVideos() {
      this.$emit('getAllVideos')
    },
    openDialog() {
      this.$emit('openDialog')
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  .box-card {
    .clearfix {
      font-weight: bold;
      font-size: 17px;
      color: #3b7960;
    }
    .videos {
      width: 500px;
      .item {
        padding: 0 20px;
        display: flex;
        justify-content: space-around;
        width: 100%;
        &:hover {
          cursor: pointer;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .img {
          height: 80px;
          width: 80px;
          border-radius: 6px;
        }
        .title {
          font-size: 15px;
          color: #dcdfe6;
        }
      }
    }
  }
}
</style>

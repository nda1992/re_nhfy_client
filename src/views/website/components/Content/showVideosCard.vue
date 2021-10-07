<template>
  <!-- 显示所有视频列表的组件 -->
  <div class="main">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>{{ category }}</span>
      </div>
      <div v-for="item in videoList" :key="item.id" class="videos">
        <div class="item" @click="openDialog(item)">
          <div>
            <img :src="item.cover" class="img" />
          </div>
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
    openDialog(item) {
      this.$emit('openDialog', item)
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
      .item {
        height: 105px;
        padding: 0 20px;
        display: flex;
        justify-content: start;
        align-items: center;
        width: 100%;
        &:hover {
          cursor: pointer;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        div {
          height: 90px;
          width: 90px;
          overflow: hidden;
          margin-right: 10px;
          .img {
            overflow: hidden;
            height: 90px;
            width: 90px;
            border-radius: 6px;
            transition: all 0.6s;
            &:hover {
              transform: scale(1.2);
            }
          }
        }
        .title {
          font-size: 15px;
          color: #123;
          &:hover {
            color: #3b7960;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header">{{ category }}</span>
      </div>
      <div>
        <el-collapse accordion>
          <el-collapse-item
            v-for="item in newsList"
            :title="item.deptName"
            :key="item.id"
            class="item-title"
          >
            <div class="item-content" @click="gotoDetail(item.id)">
              {{ item.title }}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <pagination
        class="page"
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getSubjectAssembleList"
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
    category: {
      type: String,
      default: () => {
        return '学科荟萃'
      }
    },
    newsList: {
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
          limit: 5,
          page: 1
        }
      }
    }
  },
  methods: {
    getSubjectAssembleList() {
      this.$emit('getSubjectAssembleList')
    },
    gotoDetail(id) {
      this.$emit('gotoDetail', id)
    }
  }
}
</script>
<style scoped>
.el-card {
  width: 810px;
}
</style>
<style lang="scss" scoped>
.box-card {
  .clearfix {
    .header {
      font-size: 18px;
      color: #3b7960;
      font-weight: bold;
    }
  }
  .item-title {
    .item-content {
      font-size: 12px;
      &:hover {
        cursor: pointer;
        color: #3b7960;
      }
    }
  }
  .page {
    margin: 15px 0;
    padding: 0;
  }
}
</style>

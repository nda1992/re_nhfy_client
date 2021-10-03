<template>
  <!--展示中间部分不同tab下的所有新闻内容-->
  <div class="main">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>{{ category }}</span>
        </div>
        <div v-for="(item, index) in newsList" :key="index" class="news">
            <div class="item">
            <span class="time">{{ item.createTime }}</span>
            <span @click="getNewsById(item.id)" class="title">{{ item.title }}</span>
            <span style='margin-right:8px;color:#C0C4CC'>|</span>
            <span>({{ item.deptName }})</span>
            </div>
        </div>
        <pagination style='padding:0px;' v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getAllNews" />
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'showNewsCard',
  components: {
    Pagination
  },
  props: {
      total: {
          type: Number,
          default: ()=> {
              return 0
          }
      },
      listQuery: {
          type: Object,
          default: () => {
              return {
                  limit: 10,
                  page:1
              }
          }
      },
      category: {
          type: String,
          default: () => {
              return ''
          }
      },
      newsList: {
          type: Array,
          default: () => {
              return []
          }
      }
  },
  methods: {
      getNewsById(id) {
          this.$emit('getNewsById', id)
      },
      getAllNews() {
          this.$emit('getAllNews')
      }
  }
}
</script>

<style lang='scss' scoped>
    .main{
        .box-card {
            .clearfix {
                font-weight: bold;
                font-size: 17px;
                color: #3b7960;
            }
            .news {
                height: 40px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .item {
                    .time {
                        font-size: 15px;
                        color: #97a8be;
                    }
                    .title {
                        margin: 0 8px;
                        cursor: pointer;
                        &:hover {
                            color: #3b7960;
                        }
                    }
                }
            }
        }
    }
</style>

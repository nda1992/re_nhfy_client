<template>
  <div class="swiper-main">
    <el-row>
      <el-col :span="24" :md="24">
        <div class="post">
          <div class="user-images">
            <el-carousel :interval="6000" type="card" height="320px">
              <el-carousel-item v-for="item in items" :key="item.id">
                <div class="item">
                  <img
                    :src="item.url"
                    class="image"
                    @click="getNewsById(item.newsid)"
                  />
                  <div class="text">
                    <span>{{ item.text }}</span>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'SwiperItem',
  props: {
    // items的每个元素至少要包含有：id、url、newsid和text
    items: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    getNewsById(id) {
      this.$emit('getNewsById', id)
    }
  }
}
</script>
<style lang="scss" scoped>
.swiper-main {
  .post {
    font-size: 14px;
    color: #666;
    .item {
      position: relative;
      .image {
        width: 100%;
        height: 100%;
      }
      .text {
        font-size: 14px;
        font-weight: bold;
        height: 45px;
        position: absolute;
        top: 275px;
        color: #000;
        background: #ffffff;
        opacity: 0.5;
        width: 100%;
        display: flex;
        align-items: center;
        span {
          margin-left: 5px;
          // 实现单行过长时省略...
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}
</style>

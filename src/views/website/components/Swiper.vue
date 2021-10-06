<template>
  <div class="swiper-main">
    <el-row>
      <el-col :span="24" :md="24">
        <div class="post">
          <div class="user-images">
            <el-carousel :interval="6000" type="card" height="320px">
              <el-carousel-item v-for="item in carouselImages" :key="item">
                <img :src="item" class="image" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getSwiperImgs2Run } from '@/api/recruit/position'
export default {
  name: 'Swiper',
  data() {
    return {
      carouselImages: []
    }
  },
  mounted() {
    this.getSwiperImgs()
  },
  methods: {
    // 获取所有的轮播图片
    getSwiperImgs() {
      getSwiperImgs2Run({ swiperFlag: 'website' }).then(res => {
        const { swipers } = res
        this.carouselImages = swipers.map(e => e.url)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-main {
  .post {
    font-size: 14px;
    color: #666;
    .image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<template>
  <div>
    <SwiperItem :items="carouselImages" @getNewsById="getNewsById" />
  </div>
</template>

<script>
import { getSwiperImgs2Run } from '@/api/recruit/position'
import SwiperItem from '@/components/SwiperItem/index'
export default {
  name: 'Swiper',
  components: {
    SwiperItem
  },
  data() {
    return {
      carouselImages: []
    }
  },
  created() {
    this.getSwiperImgs()
  },
  methods: {
    // 获取所有的轮播图片
    getSwiperImgs() {
      getSwiperImgs2Run({ swiperFlag: 'website' }).then(res => {
        const { swipers } = res
        this.carouselImages = swipers.map(e => {
          return { id: e.id, url: e.url, newsid: e.newsid, text: e.text }
        })
      })
    },
    getNewsById(id) {
      this.$router.push({ path: `/nhfy/getnews/${id}` })
    }
  }
}
</script>

<template>
  <div class="Main-container">
    <div class="main-swiper">
      <Swiper />
      <Content />
      <el-divider style="margin: 0 50px;"></el-divider>
      <Center />
    </div>
  </div>
</template>

<script>
import Swiper from './components/Swiper'
import Content from './components/Content'
import Center from './components/Center'
export default {
  name: 'MainContainer',
  components: {
    Swiper,
    Content,
    Center
  }
}
</script>

<style scoped>

</style>

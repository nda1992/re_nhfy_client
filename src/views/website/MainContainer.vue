<template>
  <div class="Main-container">
    <Swiper />
    <Content />
    <el-divider></el-divider>
    <Center />
    <el-divider></el-divider>
    <Bottom />
  </div>
</template>

<script>
import Swiper from './components/Swiper'
import Content from './components/Content'
import Center from './components/Center'
import Bottom from './components/Bottom'
export default {
  name: 'MainContainer',
  components: {
    Swiper,
    Content,
    Center,
    Bottom
  }
}
</script>

<style scoped>
  /deep/.el-tabs__item {
    font-size: 18px !important;
  }
</style>

<style lang='scss' scoped>
  .Main-container {
    position: relative;
    margin-bottom: 50px;
  }
</style>

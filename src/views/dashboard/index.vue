<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎您<span style="color:#45a">{{ name }}</span>使用系统</div>
    <div style="font-size: 14px;margin-top: 10px">为了您的账户安全，在您使用完系统时，请点击<span style="color:#ff6666;">更多操作</span>中的<span style="color:#ff6666;">退出</span>来关闭系统！</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  mounted() {
  },
  computed: {
    name() {
      return localStorage.getItem('name')
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 50px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

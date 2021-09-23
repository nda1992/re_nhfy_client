<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎<span style="color:#45a">{{ name }}</span>使用系统</div>
    <div style="font-size: 14px;margin-top: 10px"><span style="font-weight: bold;color: #ff6666">提示：</span>为了您的账户安全，在您使用完系统时，请点击<span style="color: #20a0ff">更多操作</span>中的<span style="color: #20a0ff">退出系统</span>来关闭系统！</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    name() {
      return localStorage.getItem('name')
    }
  },
  mounted() {
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

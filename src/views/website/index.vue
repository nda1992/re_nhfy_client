<template>
  <div class="app-container">
    <div><el-backtop :bottom="100" /></div>
    <div>
      <Header :MenuList="MenuList"/>
    </div>
    <div>
      <div>
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key" />
        </transition>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import Header from './components/Header'
import { getMenusList } from '@/api/website/website'
export default {
  name: 'index',
  components: {
    Header
  },
  data() {
    return {
      // MenuList
      MenuList: []
    }
  },
  mounted() {
    this.getMenus()
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  methods: {
    getMenus() {
      getMenusList().then(res => {
        const { items } = res
        this.MenuList = items
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container{
    height: 100%;
    width: 100%;
    background: #a6c8b2;
    padding: 0;
  }
</style>

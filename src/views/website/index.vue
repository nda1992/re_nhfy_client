<template>
  <div class="app-container">
    <div><el-backtop :bottom="100" /></div>
    <div class="header">
      <Header :MenuList="MenuList"/>
    </div>
    <div>
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </div>
    <div class='footer'>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import { getMenusList } from '@/api/website/website'
export default {
  name: 'index',
  components: {
    Header,
    Footer
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
    min-height: 100%;
    width: 100%;
    background: #fff;
    padding: 0;
    display: flex;
    flex-direction: column;
    .footer {
      background: #3b7960;
      color: #fff;
      width: 100%;
      margin-top: auto;
    }
  }
</style>

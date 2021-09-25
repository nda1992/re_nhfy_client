<template>
  <div class="header-main">
    <div class="header-img">
      <img :src="img_url" alt="">
      <div class="svg" @mouseover="mouseOver" @mouseleave="mouseLeave">
        <span class="title">微信公众号</span>
        <svg-icon icon-class="nhfy-wechat" style="width: 30px;height: 30px"/>
        <div class="wechat-img" v-show="active">
          <img :src="qrcode_url" style="width: 100px;height: 100px">
        </div>
      </div>
    </div>
    <div>
      <el-menu
        router
        :default-active="activeIndex1"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#3b7960"
        text-color="#fff"
        active-text-color="#edd3a1">
        <el-menu-item index="1">首页</el-menu-item>
        <el-submenu :index="item.parent.index" v-for="(item, index) in MenuList" :key="item.id">
          <template slot="title">{{ item.parent.name }}</template>
          <el-menu-item :index="subitem.index" v-for="(subitem, subindex) in item.children" :key="subindex">{{ subitem.name }}</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { BACKGROUND_IMAGE_DOWNLOAD, QRCODE_DOWNLOAD } from '@/utils/urlConfig'
export default {
  name: 'Header',
  props: {
    MenuList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      activeIndex1: '1',
      img_url: BACKGROUND_IMAGE_DOWNLOAD,
      qrcode_url: QRCODE_DOWNLOAD,
      active: false
    }
  },
  methods: {
    // 鼠标移入触发
    mouseOver() {
      this.active = true
    },
    mouseLeave() {
      this.active = false
    },
  }
}
</script>

<style lang="scss" scoped>
  .header-main{
    background: #ffffff;
    position: relative;
    .header-img{
      display: flex;
      justify-content: space-between;
      align-items: center;
      img{
        width: 300px;
        height: 50px;
      }
      .svg{
        position: absolute;
        right: 100px;
        .title{
          position: relative;
          top: -8px;
          margin-right: 10px;
          font-size: 14px;
        }
        .wechat-img{
          width: 125px;
          height: 125px;
          border: 1px solid #99a9bf;
          background: #ffffff;
          border-radius: 5px;
          padding: 10px;
          position: absolute;
          z-index: 10;
          top: 35px;
          right: -55px;
          img{
            margin: 0 auto;
          }
        }
      }
    }
  }
</style>

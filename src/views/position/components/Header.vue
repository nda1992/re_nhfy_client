<template>
  <div class="header">
    <div v-if="!isLogin" class="btns">
      <el-button type="text" @click="HandleRegister">注册</el-button>
      <el-button type="text" @click="HandleLogin">登录</el-button>
      <el-button type="text" @click="back2Login">回到登录页</el-button>
    </div>
    <div v-else class="userinfo">
      <el-dropdown trigger="click" style="float: right;cursor: pointer;">
        <span class="el-dropdown-link">
          更多操作<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-s-home" @click.native="home"
            >首页</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-s-custom" @click.native="Userinfo"
            >个人主页</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-message-solid" @click.native="notice"
            >消息
            <el-badge class="mark" :value="msgNum" :hidden="msgNum === 0" />
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-error" @click.native="logout"
            >退出系统</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <div style="float: right;margin-right: 50px;color: #e7e7eb;">
        {{ username }}，欢迎你使用招聘系统
      </div>
    </div>
  </div>
</template>

<script>
// 对sessionStorage加密
import { StorageClass } from '@/utils/session'
export default {
  name: 'Header',
  props: {
    isLogin: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    username: {
      type: String,
      default: () => {
        return ''
      }
    },
    // 收到的消息数量
    msgNum: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },

  methods: {
    HandleRegister() {
      this.$emit('HandleRegister')
    },
    HandleLogin() {
      this.$emit('HandleLogin')
    },
    notice() {
      this.$emit('notice')
    },
    home() {
      this.$emit('home')
    },
    Userinfo() {
      this.$emit('Userinfo')
    },
    logout() {
      this.$emit('logout')
    },
    back2Login() {
      this.$emit('back2Login')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  z-index: 10;
  width: 100%;
  position: fixed;
  top: 0;
  height: 50px;
  background: #3b7960;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .btns {
    position: absolute;
    right: 50px;
    .el-button {
      color: #e7e7eb;
      &:hover {
        color: #000;
      }
    }
  }
  .userinfo {
    position: absolute;
    right: 50px;
    .el-dropdown {
      color: #e7e7eb;
      &:hover {
        color: #1f3134;
      }
    }
  }
}
</style>

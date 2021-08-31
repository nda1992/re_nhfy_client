<template>
  <div class="header">
    <div class="btns" v-if="!isLogin">
      <el-button type="text" @click="HandleRegister">注册</el-button>
      <el-button type="text" @click="HandleLogin">登录</el-button>
    </div>
    <div class="userinfo" v-else>
      <el-dropdown trigger="click" style="float: right;cursor: pointer;">
        <span class="el-dropdown-link">
          更多操作<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-s-home" @click.native="home">首页</el-dropdown-item>
          <el-dropdown-item icon="el-icon-s-custom" @click.native="Userinfo">个人主页</el-dropdown-item>
          <el-dropdown-item icon="el-icon-message-solid" @click.native="advice">消息
            <el-badge class="mark" :value="12" />
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-error" @click.native="logout">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div style="float: right;margin-right: 50px;color: #e7e7eb;">{{username}}，欢迎你使用系统招聘系统</div>
    </div>
    <!--<el-button type="text" @click="back" style="position: absolute;right: 20px;">返回</el-button>-->
  </div>
</template>

<script>
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
      default: ()=> {
        return sessionStorage.getItem('jobseekerUsername')
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
    home() {
      this.$emit('home')
    },
    Userinfo() {
      this.$emit('Userinfo')
    },
    logout() {
      this.$emit('logout')
    }
  }
}
</script>

<style lang="scss" scoped>
  .header{
    z-index: 10;
    width: 100%;
    position: fixed;
    top: 0;
    /*padding-right: 50px;*/
    height: 50px;
    background: #5c9291;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .btns{
      position: absolute;
      right: 50px;
      .el-button{
        color: #e7e7eb;
        &:hover{
          color: #1f3134;
        }
      }
    }
    .userinfo{
      position: absolute;
      right: 50px;
      .el-dropdown{
        color: #e7e7eb;
        &:hover{
          color: #1f3134;
        }
      }
    }
  }
</style>

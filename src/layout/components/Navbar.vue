<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />
    <div class="title"><span>信息系统集成平台</span></div>

<!--    <div class="welcome">-->
<!--      <h2>欢迎{{name}}访问系统</h2>-->
<!--    </div>-->

    <div class="right-menu">
      <!-- 用户头像 -->
      <div class="avatar">
        <div class="block">
          <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          action="aaa"
          :before-upload="beforeUploadFile">
          <el-tooltip effect="dark" content="点击更换头像" placement="bottom-end">
            <el-avatar shape="square" :size="40" :src="avatar" v-if="avatar"></el-avatar>
          </el-tooltip>
          </el-upload>
        </div>
      </div>
      <!-- 更多操作按钮 -->
      <div class="userinfo">
        <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          更多操作<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-s-custom" @click.native="updateUserinfo">更新个人信息</el-dropdown-item>
          <el-dropdown-item icon="el-icon-warning-outline" @click.native="deleteUser">注销个人账号</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-close" @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { beforeUploadFile } from '@/api/user'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { uuid } from '@/utils/uuid'
import axios from 'axios'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
        avatar: localStorage.getItem('avatar')
      }
    },
  computed: {
    // avatar() {
    //   return localStorage.getItem('avatar')
    // },
    userCode() {
      return localStorage.getItem('userCode')
    },
    name() {
      return localStorage.getItem('name')
    },
    ...mapGetters(['sidebar', 'device', 'name'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push(`/login`)
    },
    deleteUser() {
      alert('该功能暂未开放，请联系管理员')
    },
    updateUserinfo() {
      alert('该功能暂未开放，请联系管理员')
    },
    // 头像上传处理函数
    beforeUploadFile(file) {
      let formdata = new FormData()
      formdata.append('file', file)
      formdata.append('userCode', localStorage.getItem('userCode'))
      formdata.append('avatar', localStorage.getItem('avatar'))
      const { data } = axios.post('http://localhost:3000/users/uploadAvatar', formdata, { headers: { token: localStorage.getItem('token'), uuid: uuid() }}).then(res => {
        const { data } = res
        if (data.code === 200) {
          this.avatar = data.avatar
          localStorage.setItem('avatar', data.avatar)
          this.$store.dispatch('/user/uploadavatar')
          this.$message.success(data.msg)
        } else {
          this.$message.success('头像上传失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  background: #ebf6f7;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    // float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    // float: left;
  }
  .title{
    color: #393f4c;
    font-size: 23px;
    font-weight: bold;
    line-height: 50px;
    position:absolute;
    left: 600px;
    letter-spacing: 2px;
  }

  .right-menu {
    width: 150px;
    position: absolute;
    left: 1140px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    .avatar{
        .block{
          .el-tooltip{
            display:flex;
            align-items:center;
            justify-content: center;
            .el-avatar{
            background-color: #E4E7ED;
            box-shadow: 0 0 1px 1px rgba(203, 220, 224, 0.333);
            img{padding: 2px;}
          }
          }
        }
      }
    .userinfo{
        display:flex;
        align-items: center;
        // justify-content: space-around;
        .el-dropdown-link {
          cursor: pointer;
          color: #409EFF;
        }
      }
  }
}
</style>

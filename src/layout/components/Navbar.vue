<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <el-tooltip effect="dark" content="全屏显示" placement="bottom">
          <screenfull id="screenfull" class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>
      <!-- 用户头像 -->
      <div class="avatar-container right-menu-item hover-effect">
        <div class="avatar-wrapper">
          <el-upload
            :headers="{ token: token }"
            :show-file-list="false"
            :data="{ userCode: userCode, avatar: avatar }"
            :action="upload_url"
            :on-success="hadndleSuccessUploadFile"
          >
            <el-tooltip effect="dark" content="点击更换头像" placement="bottom-end">
              <el-avatar v-if="avatar" shape="square" :size="40" :src="avatar" class="user-avatar" />
            </el-tooltip>
          </el-upload>
        </div>
      </div>
      <!-- 更多操作按钮 -->
      <div class="userinfo">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            更多操作<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user" @click.native="updateUserinfo">个人主页</el-dropdown-item>
            <el-dropdown-item icon="el-icon-bell" @click.native="notice">消息
              <el-badge class="mark" :value="msgNum" :hidden="msgNum===0" />
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-warning-outline" @click.native="deleteUser">注销账号</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-close" @click.native="logout">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import { getReceiveMsg } from '@/api/recruit/position'
import { ADMIN_AVATAR_UPLOAD } from '@/utils/urlConfig'
// 对sessionStorage加密
import { StorageClass } from '@/utils/session'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull
  },
  data() {
    return {
      avatar: StorageClass.getSession('avatar').avatar,
      msgNum: 0,
      upload_url: ADMIN_AVATAR_UPLOAD
    }
  },
  computed: {
    token() {
      // return localStorage.getItem('token')
      return StorageClass.getSession('token').token
    },
    userCode() {
      return StorageClass.getSession('userCode').userCode
    },
    name() {
      return StorageClass.getSession('name').name
    },
    ...mapGetters(['sidebar', 'device', 'name'])
  },
  mounted() {
    this.getNoReadMsgNum()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('是否退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login`)
      })
    },
    deleteUser() {
      alert('该功能暂未开放，请联系管理员')
    },
    updateUserinfo() {
      alert('该功能暂未开放，请联系管理员')
    },
    // 获取管理员未读的消息数量
    getNoReadMsgNum() {
      const temp = Object.assign({}, { receive_id: this.userCode })
      getReceiveMsg(temp).then(res => {
        const { no_read_num } = res
        this.msgNum = no_read_num
      })
    },
    // 打开消息页面
    notice() {
      this.$router.push({ name: 'Message' })
    },
    // 头像上传处理函数
    beforeUploadFile(file) {
      const formdata = new FormData()
      formdata.append('file', file)
    },
    // 头像上传成功
    hadndleSuccessUploadFile(file) {
      const { avatar, msg } = file
      this.$message.success(msg)
      StorageClass.setSession('avatar', { avatar: avatar })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #ebf6f7;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus{
      outline: none;
    }
    .right-menu-item{
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #3A71A8;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    .avatar-container{
      margin-right: 15px;
      .avatar-wrapper{
        margin-top: 5px;
        position: relative;
        .el-upload{
          .user-avatar {
            cursor: pointer;
            border-radius: 7px;
            display: flex;
            align-items: center;
            justify-content: center;
            /*background: #EBEEF5 !important;*/
            img{
              width: 40px;
              height: 40px;
            }
          }
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
    .userinfo{
        float: right;
        margin-right: 20px;
        .el-dropdown-link {
          cursor: pointer;
          color: #409EFF;
        }
      }
  }
}
</style>

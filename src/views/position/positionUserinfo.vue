<template>
    <!--求职者个人中心页-->
  <div class="userinfo-container">
    <div class="title">
      <h2>个人主页</h2>
      <div class="tip">
        <el-badge is-dot class="item"><span @click="completeUserinfo">完善个人简历信息</span></el-badge>
      </div>
    </div>
    <div class="userinfo-main">
      <div class="basic">
        <div class="avatar">
          <el-avatar shape="square" :size="105" :src="avatar"></el-avatar>
        </div>
        <div class="username">姓名：{{ jobseekerUsername }}</div>
        <div class="phone">手机号：{{ phone }}</div>
        <div class="email">邮箱：{{ email }}</div>
        <div class="edit"><el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button></div>
      </div>
      <!--岗位收藏列表-->
      <div class="collected">
        <UserinfoCard :statusTitle="positionStatus" :statusflag="2"></UserinfoCard>
      </div>
      <!--岗位投递列表-->
      <div class="posted">
        <UserinfoCard :showList="postedList" :title="Posttitle" :statusTitle="resumeStatus" :statusflag="1" @HandleCancelPost="HandleCancelPost" @handleConfirm="handleConfirm"></UserinfoCard>
      </div>
    </div>
  </div>
</template>

<script>
import UserinfoCard from './components/UserinfoCard'
import { getPost2PositionListByUid, cancelPostedByPid, confirmStauts } from '@/api/recruit/position'
export default {
  name: 'Userinfo',
  components: {
    UserinfoCard
  },
  data() {
    return {
      // 已投递的岗位列表
      postedList: [],
      Posttitle: '已投递的岗位',
      // 简历状态或在招状态
      resumeStatus: '简历状态',
      positionStatus: '在招状态',
      // 1=投递列表，2=收藏列表
      statusflag: 1
    }
  },
  computed: {
    avatar() {
      return sessionStorage.getItem('avatar')
    },
    jobseekerUsername() {
      return sessionStorage.getItem('jobseekerUsername')
    },
    phone() {
      return sessionStorage.getItem('phone')
    },
    email() {
      return sessionStorage.getItem('email')
    },
    jobseekerId() {
      return sessionStorage.getItem('jobseekerId')
    }
  },
  mounted() {
    this.getPost2PositionListByUid()
  },
  methods: {
    // 获取已投递的岗位列表
    getPost2PositionListByUid() {
      getPost2PositionListByUid(this.jobseekerId).then(res => {
        const { items } = res
        this.postedList = items
      })
    },
    // 取消投递
    HandleCancelPost(id) {
      this.$confirm('取消投递将会从列表中删除,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning' }).then(() => {
        const temp = { pid: id, uid: this.jobseekerId }
        cancelPostedByPid(temp).then(res => {
          const { msg } = res
          this.$message.success(msg)
          this.getPost2PositionListByUid()
        })
      })
    },
    // 用户确认参加考试
    handleConfirm(id) {
      const temp = { pid: id, uid: this.jobseekerId }
      confirmStauts().then(res => {

      })
    },
    completeUserinfo() {
      console.log('error')
    }
  }
}
</script>

<style lang="scss" scoped>
  .userinfo-container{
    position: relative;
    min-height: 100%;
    width: 100%;
    .title{
      position: absolute;
      height: 80px;
      width: 100%;
      top: 60px;
      padding: 0 20px;
    }
    .tip{
      position: absolute;
      top: 25px;
      left: 150px;
      color: #99a9bf;
      cursor:pointer;
      :hover{
        color: #409EFF;
      }
    }
    .userinfo-main{
      position: absolute;
      z-index: 999;
      top: 130px;
      left: 50%;
      margin-left: -750px;
      border: 0.5px dashed #99a9bf;
      border-radius: 5px;
      :after{
        content: '';
        display: block;
        clear: both;
        visibility: hidden;
      }
      /*height: 100px;*/
      width: 1500px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .basic{
        margin: 20px 0;
        .avatar,.username,.phone,.email,.edit{
          float: left;
        }
        .username,.phone,.email{
          transform: translateY(40px);
          color: #99a9bf;
        }
        .edit{
          transform: translateY(35px);
        }
        div{
          &:nth-child(n){
            margin: 20px 20px;
          }
        }
      }
      .collected,.posted{
        margin: 0 20px 20px 20px;
      }

    }
  }
</style>

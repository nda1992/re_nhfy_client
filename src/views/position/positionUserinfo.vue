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
        <UserinfoCard></UserinfoCard>
      </div>
      <!--岗位投递列表-->
      <div class="posted">
        <UserinfoCard></UserinfoCard>
      </div>
    </div>
  </div>
</template>

<script>
import UserinfoCard from './components/UserinfoCard'
import { getPost2PositionListByUid } from '@/api/recruit/position'
export default {
  name: 'Userinfo',
  components: {
    UserinfoCard
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
    }
  },
  methods: {
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

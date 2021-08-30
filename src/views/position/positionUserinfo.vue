<template>
    <!--求职者个人中心页-->
  <div class="userinfo-container">
    <div class="title">
      <h2>个人主页</h2>
      <div class="tip">
        <el-badge is-dot class="item">你还未完善个人信息</el-badge>
      </div>
    </div>
    <div class="userinfo-main">
      <div class="userinfo-line1">
        <div class="avatar">
          <el-avatar shape="square" :size="105"></el-avatar>
        </div>
        <div class="username">姓名：</div>
        <div class="phone">手机号：</div>
        <div class="email">邮箱：</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Userinfo',
  created() {
    console.log(this.$route)
  }
}
</script>

<style lang="scss" scoped>
  .userinfo-container{
    position: relative;
    height: 100%;
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
      top: 130px;
      left: 50%;
      margin-left: -750px;
      border: 0.5px dashed #99a9bf;
      border-radius: 5px;
      /*height: 100px;*/
      width: 1500px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .avatar,.username,.phone,.email{
        float: left;
      }
      .username,.phone,.email{
        transform: translateY(25px);
        color: #99a9bf;
      }
      div{
        &:nth-child(n){
          margin: 20px 20px;
        }
      }

    }
  }
</style>

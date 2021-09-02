<template>
  <div class="container">
    <el-card>
      <div slot="header" class="clearfix">
        <span style="font-size: 16px;font-weight: bold">{{ positionInfo.positionName }}</span>
        <el-tooltip class="item" effect="dark" content="分享" placement="bottom">
          <el-button style="float: right; padding: 0;margin-right: 15px;" type="text"><i class="el-icon-share">分享</i></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="收藏" placement="bottom">
          <el-button style="float: right; padding: 0;border: 0;margin-right: 15px;" type="text"><i class="el-icon-star-off">收藏</i></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="投递简历" placement="bottom">
          <el-button style="float: right; padding: 0" type="text" @click="gotoPosition" :disabled="positionInfo.isPosted">{{ positionInfo.isPosted===false?'投递简历': '已投递'}}</el-button>
        </el-tooltip>
      </div>
      <div class="card-main">
        <div class="line1">
          <span>学历要求：{{ positionInfo.degree }}</span>
          <span>专业要求：{{ positionInfo.professional }}</span>
          <span>英语要求：{{ positionInfo.english }}</span>
          <span>年龄要求：{{ positionInfo.age }}</span>
          <span>岗位类型：{{ positionInfo.type }}</span>
        </div>
        <div class="line2">
          <span>招聘科室：{{ positionInfo.deptName }}</span>
          <span>需求人数：{{ positionInfo.requireNum }}</span>
          <span>工作地点：{{ positionInfo.address }}</span>
          <span>发布时间：{{ positionInfo.simpleDate }}</span>
        </div>
        <div class="line3">
          <span>职位描述：{{ positionInfo.desc }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PositionCard',
  props: {
    positionInfo: {
      type: Object,
      default: () => {return {}}
    }
  },
  data() {
    return {
      // 岗位类别
      type: ''
    }
  },
  methods: {
    gotoPosition() {
      this.$emit('gotoPosition')
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    margin-bottom: 10px;
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both;
    }
    .card-main{
      font-size: 12px;
      .line1,.line2{
        margin-bottom: 18px;
      }
      .line1{
        width: 1250px;
        display: flex;
        justify-content: space-between;
        color: #909399;
        span{
          &:nth-child(1){
            width: 280px;
            height: 25px;
            padding: 2px;
            background: #F2F6FC;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
          }
          &:nth-child(2){
            width: 230px;
            height: 25px;
            padding: 2px;
            background: #F2F6FC;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
          }
          &:nth-child(3){
            width: 230px;
            height: 25px;
            padding: 2px;
            background: #F2F6FC;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
          }
          &:nth-child(4){
            width: 210px;
            height: 25px;
            padding: 2px;
            background: #F2F6FC;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
          }
          &:nth-child(5){
            width: 210px;
            height: 25px;
            padding: 2px;
            background: #F2F6FC;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
          }
        }
      }
      .line2{
        width: 1250px;
        display: flex;
        justify-content: space-between;
        color: #909399;
        span{
          &:nth-child(1){
            width: 380px;
            height: 25px;
            padding: 2px;
            background: #F2F6FC;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
          }
          &:nth-child(2){
            width: 130px;
            height: 25px;
            padding: 2px;
            background: #F2F6FC;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
          }
          &:nth-child(3){
            width: 310px;
            height: 25px;
            padding: 2px;
            background: #F2F6FC;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
          }
          &:nth-child(4){
            width: 200px;
            height: 25px;
            padding: 2px;
            background: #F2F6FC;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
          }
        }
      }
      .line3{
        color: #909399;
      }
    }
  }
</style>

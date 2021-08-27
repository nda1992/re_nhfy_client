<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text">查看</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="item">
        {{'列表内容 ' + o }}
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
  }
</script>

<style lang="scss" scoped>
  .app-container{
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }
    .item{
      margin-bottom: 18px;
    }
  }
</style>

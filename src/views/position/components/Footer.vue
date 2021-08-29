<template>
  <div class="footer">
    <div>南华大学附属第一医院</div>
    <div>©Copyright</div>
    <div>医院地址：衡阳市船山路69号</div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
  .footer{
    font-size: 13px;
    margin: 20px 0;
    height: 80px;
    width: 100%;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    /*margin: 0 auto;*/
    color: #99a9bf;
    clear: both;
  }
</style>

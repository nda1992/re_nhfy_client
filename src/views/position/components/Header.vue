<template>
  <div class="header">
    <el-button type="text" @click="HandleRegister" v-if="showBtn">注册</el-button>
    <el-button type="text" @click="HandleLogin" v-if="showBtn">登录</el-button>
    <el-button type="text" @click="back" v-if="!showBtn" style="position: absolute;right: 20px;">返回</el-button>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    showBtn: {
      type: Boolean,
      default: () => {
        return true
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
    back() {
      this.$emit('back')
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
    .el-button{
      color: #e7e7eb;
      &:hover{
        color: #1f3134;
      }
      &:nth-child(1){
        position: absolute;
        right: 100px;
      }
      &:nth-child(2){
        position: absolute;
        right: 50px;
      }
    }
  }
</style>

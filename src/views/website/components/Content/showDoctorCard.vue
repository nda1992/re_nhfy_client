<template>
  <!--显示医生信息列表的卡片组件-->
  <div class="main" @click="openDialog(id)">
    <img :src="avatar" />
    <div class="desc">
      <span>姓名：{{ username }}</span>
      <span>科室：{{ deptName }}</span>
      <span>职称：{{ jobTitle }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'showDoctorCard',
  props: {
    id: {
      type: Number,
      default: () => {
        return undefined
      }
    },
    avatar: {
      type: String,
      default: () => {
        return ''
      }
    },
    username: {
      type: String,
      default: () => {
        return ''
      }
    },
    deptName: {
      type: String,
      default: () => {
        return ''
      }
    },
    jobTitle: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  methods: {
    openDialog(id) {
      this.$emit('openDialog', id)
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  padding: 4px;
  height: 100px;
  width: 275px;
  border-radius: 6px;
  border: 1px solid #ebeef5;
  display: flex;
  justify-content: start;
  align-items: center;
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  img {
    border: 1px dashed #ebeef5;
    width: 75px;
    height: 75px;
    border-radius: 9px;
  }
  .desc {
    margin-left: 10px;
    height: 100%;
    font-size: 14px;
    color: #909399;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>

<template>
  <!-- 显示时间的组件 -->
  <div class="time">
    <span>今天是{{ date }}</span>
    <span>{{ week }}</span>
  </div>
</template>
<script>
import moment from 'moment'
import getWeek from '@/utils/getWeek'
export default {
  name: 'ShowTime',
  data() {
    return {
      date: undefined,
      week: undefined
    }
  },
  mounted() {
    this.getDate()
  },
  methods: {
    getDate() {
      this.date = moment().format('YYYY年MM月DD日')
      this.week = getWeek(moment().day())
    }
  }
}
</script>
<style lang="scss" scoped>
.time {
  width: 230px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 330px;
  line-height: 7px;
  color: #909399;
}
</style>

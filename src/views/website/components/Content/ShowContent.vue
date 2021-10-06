<template>
  <div class="show-main">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
      </div>
      <div v-for="item in newsList" :key="item.id" class="item">
        <span>{{ item.title }}</span>
        <span>{{ item.createTime }}</span>
        <span>{{ item.createTime }}</span>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: () => {
        return ''
      }
    },
    newsList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      category: this.title
    }
  }
}
</script>

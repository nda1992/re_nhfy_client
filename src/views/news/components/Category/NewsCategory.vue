<template>
  <div>
    <el-form ref="postForm" :model="postForm" label-width="100px">
      <el-form-item label="新闻类别">
        <el-input v-model="postForm.name" placeholder="请输入新闻类别" :clearable="true" />
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button type="primary" @click="createData">添加</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsCategory',
  data() {
    return {
      postForm: { name: '' }
    }
  },
  methods: {
    createData() {
      this.$emit('createData', this.postForm)
    }
  }
}
</script>

<style scoped>
  .el-input{
    width: 200px;
  }
</style>

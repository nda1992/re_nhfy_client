<template>
  <div>
    <el-form :model="menuForm">
      <el-form-item label="一级菜单">
        <el-input v-model="menuForm.parent" clearable/>
      </el-form-item>
      <el-form-item label="二级菜单">
        <el-input v-model="menuForm.children" clearable/>
        <span style="margin-left: 20px;color: #ff4949">(多个使用#隔开)</span>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit(menuForm)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      menuForm: {
        parent: '', children: ''
      }
    }
  },
  methods: {
    resetSubmitForm() {
      this.submitForm = {
        parent: '',
        children: ''
      }
    },
    submit(menuForm) {
      this.$emit('submit', menuForm)
      // this.resetSubmitForm()
    }
  }
}
</script>

<style scoped>
  .el-input{
    width: 800px;
  }
</style>

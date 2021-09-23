<template>
  <!-- 密码找回 -->
  <div class="app-container">
    <div class="title">
      <h3>密码找回页面</h3>
      <h3 @click="back">首页</h3>
    </div>
    <div class="input-form">
      <el-form ref="passwdForm" :model="passwdForm" :rules="rules" auto-complete="on" label-position="left">
        <el-form-item label="姓名" prop="username">
          <el-input ref="username" v-model="passwdForm.username" placeholder="姓名" name="username" clearable />
        </el-form-item>
        <el-form-item label="职工号" prop="userCode">
          <el-input ref="userCode" v-model="passwdForm.userCode" placeholder="职工号" name="userCode" clearable />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input ref="email" v-model="passwdForm.email" placeholder="邮箱" name="email" clearable />
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input ref="password" v-model="passwdForm.password" placeholder="密码" type="password" clearable name="password" />
        </el-form-item>
        <el-form-item label="再次输入新密码" prop="checkPassword">
          <el-input ref="checkPassword" v-model="passwdForm.checkPassword" placeholder="再次输入密码" type="password" clearable name="checkPassword" />
        </el-form-item>
        <div class="btns">
          <el-button type="primary" @click="confirm">确定</el-button>
          <el-button type="info" @click="reset('passwdForm')">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { updatePassword } from '@/api/user'
export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.passwdForm.checkPassword !== '') {
          this.$refs.passwodForm.validateField('checkPassword')
        }
        callback()
      }
    }
    const validateCheckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passwdForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      passwdForm: {
        username: '',
        userCode: '',
        email: '',
        password: '',
        checkPassword: ''
      },
      rules: {
        username: [{ required: true, trigger: 'blur', message: '请输入姓名' }],
        userCode: [{ required: true, trigger: 'blur', message: '请输入职工号' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' },
          { min: 5, max: 10, message: '长度在5~10个字符', trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validateCheckPassword, trigger: 'blur' },
          { min: 5, max: 10, message: '长度在5~10个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed() {},
  methods: {
    // 回到首页
    back() {
      this.$router.go(-1)
    },
    confirm() {
      this.$confirm('是否更新密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const temp = Object.assign({}, this.passwdForm)
        updatePassword(temp).then(res => {
          const { msg } = res
          this.$message.success(msg)
          this.back()
        })
      })
    },
    // 重置表单
    reset(passwdForm) {
      this.$refs[passwdForm].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container{
    height: 100%;
    background: #ffffff;
    .title{
      margin-bottom: 30px;
      h3 {
        &:nth-child(2){
          &:hover{
            cursor: pointer;
            color: #20a0ff;
          }
        }
      }
    }
    .input-form{
      position: relative;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      padding: 20px;
      background: #F2F6FC;
      width: 500px;
      height: 600px;
      margin: 0 auto;
      .btns{
        /*margin-bottom: 20px;*/
        position: absolute;
        bottom: 10px;
        left: 175px;
      }
    }
  }
</style>

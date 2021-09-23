<template>
  <!-- 用户注册 -->
  <div class="register-container">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title" style="letter-spacing:15px;">注册界面</h3>
      </div>
      <el-form-item prop="userCode">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="userCode"
          v-model="registerForm.userCode"
          placeholder="职工号"
          name="userCode"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="username" />
        </span>
        <el-input
          ref="username"
          v-model="registerForm.username"
          placeholder="姓名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password"
          :key="passwordType"
          v-model="registerForm.password"
          placeholder="密码"
          name="password"
          :type="passwordType"
          tabindex="1"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="checkPassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="checkPassword1"
          :key="passwordType1"
          v-model="registerForm.checkPassword"
          placeholder="确认密码"
          name="checkPassword"
          :type="passwordType1"
          tabindex="1"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd1">
          <svg-icon :icon-class="passwordType1 === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email" />
        </span>
        <el-input
          ref="email"
          v-model="registerForm.email"
          placeholder="邮箱"
          name="email"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="regcode">
        <span class="svg-container">
          <svg-icon icon-class="regcode" />
        </span>
        <el-input
          ref="regcode"
          v-model="registerForm.regcode"
          placeholder="注册码"
          name="regcode"
          type="text"
          tabindex="1"
          auto-complete="off"
        />
      </el-form-item>
      <el-form-item prop="deptName">
        <span class="svg-container">
          <svg-icon icon-class="deptname" />
        </span>
        <el-select v-model="registerForm.deptName" :loading="select_loading" placeholder="请选择部门" width="20px" :remote-method="getRemoteDeptList" filterable default-first-option remote>
          <el-option v-for="(item,index) in deptListOptions" :key="item+index" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <div class="btns">
        <el-button :loading="loading" type="primary" style="width:50%;margin-bottom:30px;" @click.native.prevent="handleRegister">注册</el-button>
        <el-button :loading="loading" type="primary" style="width:50%;margin-bottom:30px;" @click="resetForm('registerForm')">重置</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { userRegister, searchDepts } from '@/api/user'
export default {
  name: 'Register',
  data() {
    // 验证邮箱格式
    const checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    // 密码验证
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.checkPassword !== '') {
          this.$refs.registerForm.validateField('checkPassword')
        }
        callback()
      }
    }
    // 确认密码
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      passwordType: 'password',
      passwordType1: 'password',
      loading: false,
      redirect: undefined,
      registerForm: {
        userCode: '',
        username: '',
        password: '',
        checkPassword: '',
        email: '',
        deptName: '',
        regcode: ''
      },
      registerRules: {
        userCode: [
          { required: true, message: '请输入职工号', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在2到4个字符', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' },
          { min: 5, max: 10, message: '长度在5到10个字符', trigger: 'blur' },
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' },
          { min: 5, max: 10, message: '长度在5到10个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        regcode: [
          { required: true, message: '请输入注册码', trigger: 'blur' }
        ],
        deptName: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ]
      },
      deptListOptions: [],
      select_loading: false
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    showPwd1() {
      if (this.passwordType1 === 'password') {
        this.passwordType1 = ''
      } else {
        this.passwordType1 = 'password'
      }
      this.$nextTick(() => {
        this.$refs.checkPassword1.focus()
      })
    },
    // 远程获取科室列表
    getRemoteDeptList(query) {
      const temp = { keyword: query }
      this.select_loading = true
      searchDepts(temp).then(res => {
        const { items } = res
        if (!items) return
        this.deptListOptions = items.map(v => v.name)
      })
      this.select_loading = false
    },
    // 重置按钮
    resetForm(registerForm) {
      this.$refs[registerForm].resetFields()
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.$confirm('是否注册?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.loading = true
            const temp = Object.assign({}, this.registerForm)
            userRegister(temp).then(res => {
              const { code, msg } = res
              if (code === 200) {
                this.$router.push({ path: this.redirect || '/login' })
                this.loading = false
                this.$message.success('用户注册成功,审核完成后即可登录')
              } else if (code === 201) {
                this.$message.error(msg)
                this.loading = false
              } else if (code === 202) {
                this.$message.error(msg)
                this.loading = false
              } else {
                this.$message.error(msg)
                this.loading = false
              }
            }).catch(() => {
              this.loading = false
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.register-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    display:flex;
    justify-content: center;
    align-items: center;
    .register-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 20px 35px 0;
    // margin: 0 auto;
    overflow: hidden;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 30px auto;
      text-align: center;
      font-weight: bold;
    }
  }
    .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .btns{
    display: flex;
    justify-content: center;
  }
}
</style>

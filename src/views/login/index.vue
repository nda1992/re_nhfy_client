<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title" style="letter-spacing:15px;">登录界面</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="职工号"
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
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="off"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <div class="btns">
        <el-button
          :loading="loading"
          type="primary"
          style="width:50%;margin-bottom:30px;"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
        <el-button
          :loading="loading"
          type="primary"
          style="width:50%;margin-bottom:30px;"
          @click="resetForm('loginForm')"
          >重置</el-button
        >
      </div>

      <div class="tips">
        <router-link :to="{ path: 'passwd' }"
          ><span>忘记密码?</span></router-link
        >
        <span style="margin:0 2px;">|</span>
        <router-link :to="{ path: 'register' }"
          ><span style="margin-left:12px;">点击这里注册</span></router-link
        >
      </div>
    </el-form>

    <div class="footer">
      <div style="display: inline-block">更多链接:</div>
      <el-button type="text" @click="gotoPosition">职位招聘</el-button>
      <el-button type="text" @click="gotoOfficialWebsite">医院官网</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入职工号' }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
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
    // 重置表单
    resetForm(loginForm) {
      this.$refs[loginForm].resetFields()
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 跳转到position页面
    gotoPosition() {
      this.$router.push({ path: '/position' })
    },
    // 跳转到官方网站
    gotoOfficialWebsite() {
      this.$router.push({ path: '/nhfy' })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
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
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  position: relative;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
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
      margin: 0px auto 40px auto;
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

  .btns {
    display: flex;
    justify-content: center;
  }

  .tips {
    position: relative;
    left: 140px;
    span {
      &:nth-child(1) {
        cursor: pointer;
        &:hover {
          color: #409eff;
        }
      }
      &:nth-child(3) {
        cursor: pointer;
        &:hover {
          color: #409eff;
        }
      }
    }
  }
<<<<<<< HEAD
  .footer{
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    div{
=======
  .footer {
    position: relative;
    bottom: 0;
    margin-top: 20px;
    left: 44%;
    div {
>>>>>>> d9755f908c92509df4d2afa70d7c60c839419678
      color: #99a9bf;
      font-size: 14px;
      padding-right: 8px;
    }
    .el-button {
      color: #99a9bf;
      &:hover {
        color: #20a0ff;
      }
    }
  }
}
</style>

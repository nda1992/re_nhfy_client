<template>
  <!-- 岗位列表主页：轮播图+已发布的岗位列表 -->
  <div class="app-container">
    <div><el-backtop :bottom="100"></el-backtop></div>
    <!--顶部-->
    <Header @HandleRegister="HandleRegister" @HandleLogin="HandleLogin" @home="home" :username="jobseekerUsername" :isLogin="isLogin" @Userinfo="Userinfo" @logout="logout"/>
    <!--内容显示-->
    <div class="content">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </div>
    <!--顶部-->
    <Footer />
    <el-dialog title="用户登录" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="loginRules" :model="Logintemp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="账号" prop="account">
          <el-input v-model="Logintemp.account" placeholder="请使用手机号或邮箱登录" clearable/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="Logintemp.password" placeholder="请输入密码" name="password" type="password" clearable/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="Login">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="用户注册" :visible.sync="dialogRegisterFormVisible">
      <el-form ref="RegisterdataForm" :rules="registerRules" :model="registerTemp" label-position="left" label-width="120px" style="width: 500px; margin-left:50px;">
        <el-form-item prop="username" label="真实姓名">
          <el-input ref="username" v-model="registerTemp.username" placeholder="真实姓名" name="username" type="text" tabindex="1" auto-complete="on" clearable/>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input ref="password" v-model="registerTemp.password" placeholder="密码" name="password" type="password" tabindex="1" auto-complete="on" clearable/>
        </el-form-item>
        <el-form-item prop="checkPassword" label="再次输入密码">
          <el-input ref="checkPassword" v-model="registerTemp.checkPassword" placeholder="再次输入密码" name="checkPassword" type="password" tabindex="1" auto-complete="on" clearable/>
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input ref="phone" v-model="registerTemp.phone" placeholder="手机号" name="phone" type="text" tabindex="1" auto-complete="on" clearable/>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input ref="email" v-model="registerTemp.email" placeholder="邮箱" name="email" type="text" tabindex="1" auto-complete="on" clearable/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRegisterFormVisible = false">取消</el-button>
        <el-button type="primary" @click="Register">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getPositionList } from '@/api/recruit/position'
import Header from './components/Header'
import Footer from './components/Footer'
import { positionLogin, positionRegister } from '@/api/recruit/position'
import { mapState } from 'vuex'
export default {
  components: {
    Header,
    Footer
  },
  data() {
    // 验证邮箱格式
    const checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)||value.length === 11) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱或手机号格式'))
        }
      }, 100)
    }
    // 密码验证
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerTemp.checkPassword !== '') {
          this.$refs.RegisterdataForm.validateField('checkPassword')
        }
        callback()
      }
    }
    // 确认密码
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerTemp.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      show: true,
      isLogin: sessionStorage.getItem('isLogin'),
      dialogFormVisible: false,
      dialogRegisterFormVisible: false,
      Logintemp: {
        account: '',
        password: ''
      },
      loginRules: {
        account: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { validator: checkEmail, trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      registerTemp: {
        username: '',
        password: '',
        checkPassword: '',
        phone: '',
        email: ''
      },
      registerRules: {
        username: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }, { min: 2, max: 4, message: '名字长度在2到4个字符', trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }, { min: 5, max: 10, message: '长度在5到10个字符', trigger: 'blur' }, { required: true, message: '请输入密码', trigger: 'blur' }],
        checkPassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }, { validator: validatePass2, trigger: 'blur' }, { min: 5, max: 10, message: '长度在5到10个字符', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { min: 11, max: 11, message: '手机号长度为11位', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { validator: checkEmail, trigger: 'blur' }]
      },
      // 后端返回的用户信息
      userinfo: {}
    }
  },
  computed: {
    key() {
      return this.$route.path
    },
    ...mapState(['jobseekerUsername'])
  },
  methods: {
    resetLogintemp() {
      this.Logintemp = {
        account: '',
        password: ''
      }
    },
    resetRegisterTempData() {
      this.registerTemp = {
        username: '',
        password: '',
        checkPassword: '',
        phone: '',
        email: ''
      }
    },
    // 处理注册
    HandleRegister() {
      this.resetRegisterTempData()
      this.dialogRegisterFormVisible = true
      this.$nextTick(() => {
        this.$refs['RegisterdataForm'].clearValidate()
      })
    },
    // 用户注册
    Register() {
      this.$refs['RegisterdataForm'].validate((valid) => {
        if (valid) {
          this.$confirm('是否注册?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning' }).then(() => {
            positionRegister(this.registerTemp).then((res) => {
              const { msg } = res
              this.dialogRegisterFormVisible = false
              this.$notify({
                title: 'Success',
                message: msg,
                type: 'success',
                duration: 2000
              })
            })
          })
        }
      })
    },
    // 用户信息完善
    HandleComplete() {
      this.$router.push({ path: '/position/positionRegister' })
      this.show = !this.show
    },
    // 处理登录
    HandleLogin() {
      this.resetLogintemp()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    Login() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('position/positionLogin', this.Logintemp).then( res => {
            const { msg } = res
            this.dialogFormVisible = false
            this.isLogin = !this.isLogin
            this.$router.push({ path: '/position/list' })
            this.$notify({
              title: 'Success',
              message: msg,
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    home() {
      this.$router.push( { path: '/position/list' } )
    },
    // 用户中心
    Userinfo() {
      this.$router.push({ path: '/position/positionUserinfo' })
    },
    logout() {
      this.$store.dispatch('position/logout')
      this.$router.push({ path: '/position/list' })
      this.$notify({
        title: 'Success',
        message: '你已退出登录',
        type: 'success',
        duration: 2000
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container{
    position: relative;
    padding: 0;
    min-height: 100%;
    margin: 0;
  }
</style>

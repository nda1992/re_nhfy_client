<template>
  <!-- 岗位列表主页：轮播图+已发布的岗位列表 -->
  <div class="app-container">
    <div><el-backtop :bottom="100"></el-backtop></div>
    <!--顶部-->
    <Header @HandleRegister="HandleRegister" @HandleLogin="HandleLogin" @back="back" :showBtn="show"/>
    <!--内容显示-->
    <div class="content">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </div>
    <!--顶部-->
    <Footer />
    <el-dialog title="用户登录" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="Logintemp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="Logintemp.email" placeholder="请输入邮箱"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="Logintemp.password" placeholder="请输入密码"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="Login">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getPositionList } from '@/api/recruit/position'
import Header from './components/Header'
import Footer from './components/Footer'
import { positionLogin, positionRegister } from '@/api/recruit/position'

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
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    return {
      show: true,
      dialogFormVisible: false,
      Logintemp: {
        email: '',
        password: ''
      },
      rules: {
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  methods: {
    resetLogintemp() {
      this.Logintemp = {
        email: '',
        password: ''
      }
    },
    // 处理注册
    HandleRegister() {
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
          positionLogin(this.Logintemp).then( res => {
            console.log(res)
            const { msg } = res
            this.$message.success(msg)
          })
        }
      })
    },
    back() {
      this.$router.go(-1)
      this.show = !this.show
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container{
    position: relative;
    padding: 0;
    min-height: 100%;
  }
</style>

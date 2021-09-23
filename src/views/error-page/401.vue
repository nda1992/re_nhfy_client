<template>
  <div class="errPage-container">
    <el-button icon="el-icon-arrow-left" class="pan-back-btn" @click="back">
      返回
    </el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">
          Oops!
        </h1>
        <h2>您没有权限访问该页面</h2>
        <h6>如有不满请联系管理员</h6>
        <h6 class="list-unstyled"><a href="#" @click.prevent="handlerAdvice">请提交您需要反馈的建议</a></h6>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="建议反馈">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-input v-model="temp.content" type="textarea" placeholder="请输入您需要反馈的建议" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createData">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif'
import { createAdvice } from '@/api/report/report'
// 对sessionStorage加密
import { StorageClass } from '@/utils/session'
export default {
  name: 'Page401',
  data() {
    return {
      errGif: errGif + '?' + +new Date(),
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false,
      temp: { userCode: '', content: '' }
    }
  },
  methods: {
    back() {
      this.$router.push({ path: '/dashboard' })
    },
    // 重置表单
    resetTemp() {
      this.temp = {
        userCode: '',
        content: ''
      }
    },
    handlerAdvice() {
      this.resetTemp()
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.temp.userCode = StorageClass.getSession('userCode').userCode
      if (this.temp.content === '') {
        this.$message.error('提交的反馈不能为空')
        return
      }
      this.$confirm('是否提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning' }).then(() => {
        createAdvice(this.temp).then(() => {
          this.dialogVisible = false
          this.$notify({
            title: 'Success',
            message: '提交成功，感谢您的反馈',
            type: 'success',
            duration: 2000
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .errPage-container {
    width: 800px;
    max-width: 100%;
    margin: 100px auto;
    .pan-back-btn {
      background: #008489;
      color: #fff;
      border: none!important;
    }
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>

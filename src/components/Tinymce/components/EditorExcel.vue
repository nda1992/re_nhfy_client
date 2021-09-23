<template>
  <div class="upload-container">
    <el-button type="success" size="mini" icon="el-icon-upload2" @click="dialogVisible=true">上传文件</el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        ref="upload"
        accept=".xls,.xlsx,.doc,.docx"
        class="upload-demo"
        :action="upload_url"
        :headers="tempToken"
        :on-success="handleSuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :before-upload="beforeUpload"
        :auto-upload="false"
      >
        <div class="select-container">
          <div class="btns">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          </div>
          <div slot="tip" class="el-upload__tip">只能上传xls、xlsx、doc、docx文件，且不超过10MB</div>
        </div>
      </el-upload>
      <div class="confirm-btn">
        <el-button type="primary" style="float: right;margin-left: 13px;" @click="handleSubmit">确定</el-button>
        <el-button style="float: right;" @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { NEWS_ATTACHMENT_UPLOAD } from '@/utils/urlConfig'
export default {
  name: 'EditorExcel',
  props: {
    // 请求头带上token
    tempToken: {
      type: Object,
      default: () => { return { token: localStorage.getItem('token') } }
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      upload_url: NEWS_ATTACHMENT_UPLOAD
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    // 当用户点击确定时，在编辑器中显示文件名
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message.warning('上传失败，程序出错了~')
        return
      }
      // 触发父组件的方法
      this.$emit('successExcel', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    // 上传文件触发的函数
    submitUpload() {
      this.$refs.upload.submit()
    },
    // 点击已上传文件列表时的钩子
    handlePreview(event) {
      console.log(event)
    },
    // 删除文件列表时的钩子
    handleRemove(file, filelist) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    // 上传文件前的钩子
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        // 创建一个a标签
        const Atag = document.createElement('a')
        // 用户下载文件的URL地址
        Atag.href = _URL.createObjectURL(file)
        // filename是文件名（用户上传时的文件名）
        _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, filename: file.name }
        resolve(true)
      })
    },
    // 文件上传成功后的钩子
    handleSuccess(response, file) {
      const { files, msg } = response
      this.$message.success(msg)
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = files[0].file
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .upload-container{
    position: relative;
    .upload-demo{
      height: 300px;
      .select-container{
        .btns{
          margin: 0 auto;
        }
        .el-upload__tip{
          margin-top: 20px;
          display: block;
        }
      }
    }
    .confirm-btn{
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
</style>

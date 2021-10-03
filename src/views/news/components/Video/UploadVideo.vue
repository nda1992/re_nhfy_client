<template>
  <div class="upload">
    <div style='color:red;font-size:12px;'>(注意：请先上传视频、类别和标题，最后再上传视频封面)</div>
    <h4>上传视频</h4>
    <el-upload
      ref="upload"
      :headers="{ token: 'token' }"
      :action="upload_url"
      :data="{userCode: userCode, deptName: deptName, category: submitForm.category, title: submitForm.title}"
      accept=".mp4,.avi,.wmv,.rmvb,.ogg"
      :before-upload="beforeUpload"
      :on-success="handleSuccessFile"
      :on-progress="uploadProgress"
      :auto-upload="false"
    >
    <el-button slot="trigger" size="small" type="primary" style="margin-bottom:20px;">选择文件</el-button>
    </el-upload>
    
    <el-progress v-if="dialogVisible" :text-inside="true" :stroke-width="16" status="success" :percentage="videoUploadPercent"></el-progress>
    <el-form :model="submitForm" ref="submitForm" :rules="rules">
      <el-form-item label="视频类别" prop="category">
        <el-input v-model="submitForm.category" placeholder="请输入视频类别"/>
      </el-form-item>
      <el-form-item label="视频标题" prop="title">
        <el-input v-model="submitForm.title" placeholder="请输入视频标题"/>
      </el-form-item>
      <div class="btn">
        <el-button @click="uploadVideo" type="success">开始上传</el-button>
      </div>
    </el-form>

    <h4>上传视频封面</h4>
    <el-upload
      class="cover-uploader"
      :headers="{ token: 'token' }"
      :action="cover_url"
      :data="{ id: video_id }"
      accept=".png,.jpeg,.jpg,.bmp"
      :show-file-list="false"
      :on-success="handleCoverSuccess"
      :before-upload="beforeCoverUpload">
      <img v-if="coverUrl" :src="coverUrl" class="cover">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { VIDEO_UPLOAD, VIDEO_COVER_UPLOAD } from '@/utils/urlConfig'
export default {
  name: 'UploadVideo',
  props: {
    userCode: {
      type: String,
      default: () => {
        return ''
      }
    },
    deptName: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      dialogVideoUrl: '',
      dialogVisible: false,
      upload_url: VIDEO_UPLOAD,
      cover_url: VIDEO_COVER_UPLOAD,
      coverUrl: '',
      videoUploadPercent: 0,
      // 上传视频成功后返回的id，在上传封面之前必须提供该值，否则封面上传失败
      video_id: undefined,
      submitForm: {
        categry: '',
        title: ''
      },
      rules: {
        category: [{ required: true, message: '请输入视频类别', trigger: 'blur' }],
        title: [{ required: true, message: '请输入视频标题', trigger: 'blur' }]
      }
    }
  },
  methods: {
    uploadProgress(event, file, fileList) {
      this.dialogVisible = true
      this.videoUploadPercent = parseInt(file.percentage)
    },
    beforeUpload(file) {

    },
    handleSuccessFile(files) {
      const { msg, file } = files
      this.video_id = file.id
      this.$message.success(msg)
      this.$emit('getAllVideosList')
      this.submitForm = {
        categry: '',
        title: ''
      }
      this.dialogVisible = false
    },
    uploadVideo() {
      this.$refs['submitForm'].validate((valid) => {
        if (valid) {
          this.$confirm('是否上传?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning' }).then(() => {
            this.$refs.upload.submit()
          })
        }
      })
    },
    beforeCoverUpload() {
      if (this.video_id === undefined) {
        this.$message.error('请先上传视频，然后再上传封面')
        return false
      }
    },
    handleCoverSuccess(file) {
      console.log(file)
      const { item } = file
      this.coverUrl = item.url
      this.$emit('getAllVideosList')
    }
  }
}
</script>
<style scoped>
  .upload{
      margin-top: 10px 0;
    }
  .el-input {
    width: 400px;
  }
  .cover-uploader {
    width: 178px;
    height: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-top: 20px;
  }
  .cover-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .cover {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
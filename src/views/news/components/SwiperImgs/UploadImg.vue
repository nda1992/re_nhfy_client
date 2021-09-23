<template>
  <div class="upload">
    <h4>上传图片</h4>
    <el-upload
      ref="upload"
      :headers="{ token: 'token' }"
      :action="upload_url"
      :data="{userCode: userCode}"
      accept=".png,.jpg,.jpeg,.bmp"
      list-type="picture-card"
      :on-success="handleSuccessFile"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :file-list="fileList"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { SWIPER_IMAGES_UPLOAD } from '@/utils/urlConfig'
Array.prototype.remove = function(val) {
  var index = this.indexOf(val)
  if (index > -1) {
    this.splice(index, 1)
  }
}

export default {
  name: 'UploadImg',
  props: {
    userCode: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      upload_url: SWIPER_IMAGES_UPLOAD
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.fileList.remove(file.name)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccessFile(files) {
      const { msg, file } = files
      this.$message.success(msg)
      this.fileList.push({ name: 'image', url: file.url })
      this.$emit('getAllSwiperImgs')
    }
  }
}
</script>

<style scoped>
  .upload{
    margin-top: 10px;
  }
</style>

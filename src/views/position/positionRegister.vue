<template>
  <div class="register-container">
    <div class="title"><h2>请完善你的注册信息</h2></div>
    <el-divider></el-divider>
    <div class="register-form">
      <el-form ref="registerForm" :model="registerForm" :rules="registerRules" auto-complete="on" label-position="left" label-width="120px" style="width: 500px; margin-left:50px;">
        <el-form-item prop="sex" label="性别">
          <el-select v-model="registerForm.sex" placeholder="请选择性别" width="20px" clearable>
            <el-option v-for="(item,index) in sexOptions" :key="item+index" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="age" label="年龄">
          <el-select v-model="registerForm.age" placeholder="请选择年龄" width="20px" clearable>
            <el-option v-for="(item,index) in ageOptions" :key="item+index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="birthday" label="出生日期">
          <el-date-picker
            clearable
            v-model="registerForm.birthday"
            align="right"
            type="date"
            placeholder="选择出生日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="address" label="所在城市">
          <el-input ref="address" v-model="registerForm.address" placeholder="所在城市" name="address" type="text" tabindex="1" auto-complete="on" clearable/>
        </el-form-item>
        <el-form-item prop="professional" label="专业名称">
          <el-input ref="professional" v-model="registerForm.professional" placeholder="专业名称" name="professional" type="text" tabindex="1" auto-complete="on" clearable/>
        </el-form-item>
        <el-form-item prop="undergraduateTime" label="毕业时间">
          <el-date-picker
            clearable
            v-model="registerForm.undergraduateTime"
            align="right"
            type="date"
            placeholder="选择毕业时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="faceimgUrl" label="用户头像">
          <el-upload
            class="avatar-uploader"
            action="https://localhost:3000/position/uploadAvatar"
            :show-file-list="false"
            :on-success="handleSuccessAvatar"
            :on-remove="handleRemoveAvatar">
            <img v-if="registerForm.faceimgUrl" :src="registerForm.faceimgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="registerForm.faceimgUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item prop="attachmentUrl" label="附件简历">
          <el-upload
            accept=".doc, .docx, .pdf"
            ref="upload"
            action="https://localhost:3000/position/uploadFile"
            :on-success="handleSuccessFile"
            :on-remove="handleRemoveFile"
            :file-list="fileList">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传doc、docx或pdf文件，且不超过10MB</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'positionRegister',
  data() {
    return {
      dialogVisible: false,
      sexOptions: [{ key: 1, value:'男' }, { key: 2, value: '女' }],
      ageOptions: [20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],
      registerForm: {
        sex: '',
        age: '',
        birthday: '',
        nation: '',
        address: '',
        professional: '',
        undergraduateTime: '',
        attachmentUrl: null
      },
      registerRules: {
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        age: [{ required: true, message: '请选择年龄', trigger: 'blur' }],
        birthday: [{ required: true, message: '请选择出生日期', trigger: 'blur' }],
        nation: [{ required: true, message: '请选择民族', trigger: 'blur' }],
        address: [{ required: true, message: '请输入所在城市', trigger: 'blur' }],
        professional: [{ required: true, message: '请输入专业', trigger: 'blur' }],
        undergraduateTime: [{ required: true, message: '请选择毕业时间', trigger: 'blur' }],
        faceimgUrl: [{ required: true, message: '请上传头像', trigger: 'blur' }],
        attachmentUrl: [{ required: true, message: '请上传附件简历', trigger: 'blur' }],
      },
      fileList: []
    }
  },
  methods: {


    handleSuccessAvatar() {

    },
    handleRemoveAvatar() {},
    handleSuccessFile() {},
    handleRemoveFile() {}
  }
}
</script>

<style lang="scss" scoped>
  .register-container{
    .title{
      h2{
        margin-top: 60px;
      }
    }
  .el-form{
    .el-form-item{
      .avatar-uploader{
        width: 178px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover{
          border-color: #409EFF;
        }
        .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
      }
    }
  }
    padding: 0 20px;
    width: 100%;
    .register-form{
      padding-bottom: 110px;
      width: 600px;
      margin: 0 auto;
      .el-form{
        .el-form-item{

        }
      }
    }
  }
</style>

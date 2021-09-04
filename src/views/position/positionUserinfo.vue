<template>
    <!--求职者个人中心页-->
  <div class="userinfo-container">
    <div class="title">
      <h2>个人主页</h2>
      <div class="tip">
        <el-badge is-dot class="item" v-show="show_badge"><span @click="HandleupdateUserinfo">完善个人简历信息</span></el-badge>
      </div>
    </div>
    <div class="userinfo-main">
      <div class="basic">
        <div class="avatar">
          <el-avatar shape="square" :size="105" :src="avatar"></el-avatar>
        </div>
        <div class="username">姓名：{{ jobseekerUsername }}</div>
        <div class="phone">手机号：{{ phone }}</div>
        <div class="email">邮箱：{{ email }}</div>
        <div class="edit"><el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button></div>
      </div>
      <!--岗位收藏列表-->
      <div class="collected">
        <UserinfoCard :statusTitle="positionStatus" :statusflag="2"></UserinfoCard>
      </div>
      <!--岗位投递列表-->
      <div class="posted">
        <UserinfoCard  :total="total" :listQuery="listQuery" :getPostedPosition="getPost2PositionListByUid" :showList="postedList" :title="Posttitle" :statusTitle="resumeStatus" :statusflag="1" @HandleCancelPost="HandleCancelPost" @handleConfirm="handleConfirm"></UserinfoCard>
      </div>
    </div>
    <!--完善用户信息的对话框-->
    <el-dialog title="用户信息完善" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="registerForm" :rules="registerRules" auto-complete="on" label-position="left" label-width="120px" style="width: 500px; margin-left:50px;">
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateUserinfo">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPost2PositionListByUid, cancelPostedByPid, confirmStauts, UserinfoDetail, updateUserinfo } from '@/api/recruit/position'
import UserinfoCard from './components/UserinfoCard'
export default {
  name: 'Userinfo',
  components: {
    UserinfoCard
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        role: localStorage.getItem('role')
      },
      total: 0,
      // 已投递的岗位列表
      postedList: [],
      Posttitle: '已投递的岗位',
      // 简历状态或在招状态
      resumeStatus: '简历状态',
      positionStatus: '在招状态',
      // 1=投递列表，2=收藏列表
      statusflag: 1,
      show_badge: true,
      userinfo: {},
      // 用户信息完善表单信息
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
      }
    }
  },
  computed: {
    avatar() {
      return sessionStorage.getItem('avatar')
    },
    jobseekerUsername() {
      return sessionStorage.getItem('jobseekerUsername')
    },
    phone() {
      return sessionStorage.getItem('phone')
    },
    email() {
      return sessionStorage.getItem('email')
    },
    jobseekerId() {
      return sessionStorage.getItem('jobseekerId')
    }
  },
  mounted() {
    this.getUserinfoDetail()
    this.getPost2PositionListByUid()
  },
  methods: {
    // 获取已投递的岗位列表
    getPost2PositionListByUid() {
      const temp = Object.assign({}, this.listQuery, { jobseekerId: this.jobseekerId })
      getPost2PositionListByUid(temp).then(res => {
        const { items, total } = res
        this.postedList = items
        this.total = total
      })
    },
    // 取消投递
    HandleCancelPost(id) {
      this.$confirm('取消投递将会从列表中删除,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning' }).then(() => {
        const temp = { pid: id, uid: this.jobseekerId }
        cancelPostedByPid(temp).then(res => {
          const { msg } = res
          this.$message.success(msg)
          this.getPost2PositionListByUid()
        })
      })
    },
    // 用户确认参加考试
    handleConfirm(id) {
      const temp = { pid: id, uid: this.jobseekerId }
      confirmStauts(temp).then(res => {
        const { msg } = res
        this.$message.success(msg)
        this.getPost2PositionListByUid()
      })
    },
    /// 根据用户id再次拉取数据库中最新的用户所有信息
    getUserinfoDetail() {
      UserinfoDetail(this.jobseekerId).then(res => {
        const { userinfo, doneUserinfo } = items
        this.userinfo = userinfo
        this.show_badge = doneUserinfo
      })
    },
    // 用户信息完善或用户信息更新的相关方法
    // resetRegisterForm() {
    //   this.registerForm = {
    //     sex: '',
    //     age: '',
    //     birthday: '',
    //     nation: '',
    //     address: '',
    //     professional: '',
    //     undergraduateTime: '',
    //     attachmentUrl: null
    //   }
    // },
    HandleupdateUserinfo() {
      this.registerForm = Object.assign({},this.userinfo)
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateUserinfo() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$confirm('是否更新个人信息?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const tempData = Object.assign({}, this.registerForm)
            updateUserinfo(tempData).then((res) => {
              const { msg } = res
              this.getPositionList()
              this.dialogVisible = false
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
    handleSuccessAvatar() {

    },
    handleRemoveAvatar() {},
    handleSuccessFile() {},
    handleRemoveFile() {}
  }
}
</script>

<style lang="scss" scoped>
  .userinfo-container{
    position: relative;
    min-height: 100%;
    width: 100%;
    .title{
      position: absolute;
      height: 80px;
      width: 100%;
      top: 60px;
      padding: 0 20px;
    }
    .tip{
      position: absolute;
      top: 25px;
      left: 150px;
      color: #99a9bf;
      cursor:pointer;
      :hover{
        color: #409EFF;
      }
    }
    .userinfo-main{
      position: absolute;
      z-index: 999;
      top: 130px;
      left: 50%;
      margin-left: -750px;
      border: 0.5px dashed #99a9bf;
      border-radius: 5px;
      :after{
        content: '';
        display: block;
        clear: both;
        visibility: hidden;
      }
      /*height: 100px;*/
      width: 1500px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .basic{
        margin: 20px 0;
        .avatar,.username,.phone,.email,.edit{
          float: left;
        }
        .username,.phone,.email{
          transform: translateY(40px);
          color: #99a9bf;
        }
        .edit{
          transform: translateY(35px);
        }
        div{
          &:nth-child(n){
            margin: 20px 20px;
          }
        }
      }
      .collected,.posted{
        margin: 0 20px 20px 20px;
      }

    }
  }
</style>

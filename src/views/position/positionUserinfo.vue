<template>
  <!--求职者个人中心页-->
  <div class="userinfo-container">
    <div class="title">
      <h2>个人主页</h2>
      <div class="tip">
        <el-badge is-dot class="item" :hidden="show_badge"
          ><span @click="HandleupdateUserinfo"
            >更新或完善个人详细信息</span
          ></el-badge
        >
        <span
          style="color: #ff4949;font-size: 12px"
          @click="HandleupdateUserinfo"
          >（头像请使用个人证件照）</span
        >
      </div>
    </div>
    <div class="userinfo-main">
      <div class="basic">
        <div class="avatar">
          <el-avatar
            shape="square"
            :size="100"
            :src="avatar"
            fit="fill"
            style="height: 100px;width: 100%;!important;"
          />
        </div>
        <div class="username">姓名：{{ jobseekerUsername }}</div>
        <div class="phone">手机号：{{ phone }}</div>
        <div class="email">邮箱：{{ email }}</div>
        <div class="edit">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑基本信息"
            placement="bottom"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="HandleupdateBasicUserinfo"
            />
          </el-tooltip>
        </div>
      </div>
      <!--岗位收藏列表-->
      <div class="collected">
        <UserinfoCard
          :status-title="positionStatus"
          :statusflag="2"
          :total="collectedTotal"
          :get-posted-position="getPost2PositionListByUid"
          :show-list="collectedList"
          @HandleCollect="HandleCollect"
          @HandleCollectpost="HandleCollectpost"
        />
      </div>
      <!--岗位投递列表-->
      <div class="posted">
        <UserinfoCard
          :total="postedTotal"
          :list-query="listQuery"
          :get-posted-position="getPost2PositionListByUid"
          :show-list="postedList"
          :title="Posttitle"
          :status-title="resumeStatus"
          :statusflag="1"
          @HandleCancelPost="HandleCancelPost"
          @handleConfirm="handleConfirm"
        />
      </div>
    </div>
    <!--完善用户信息的对话框-->
    <el-dialog title="用户信息完善" :visible.sync="dialogVisible">
      <el-form
        ref="dataForm"
        :model="registerForm"
        :rules="registerRules"
        auto-complete="on"
        label-position="left"
        label-width="120px"
        style="width: 500px; margin-left:50px;"
      >
        <el-form-item prop="sex" label="性别">
          <el-select
            v-model="registerForm.sex"
            placeholder="请选择性别"
            width="20px"
            clearable
          >
            <el-option
              v-for="(item, index) in sexOptions"
              :key="item + index"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="age" label="年龄">
          <el-select
            v-model="registerForm.age"
            placeholder="请选择年龄"
            width="20px"
            clearable
          >
            <el-option
              v-for="(item, index) in ageOptions"
              :key="item + index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="民族"
          class="postInfo-container-item"
          prop="nation"
        >
          <el-select
            v-model="registerForm.nation"
            :loading="select_loading"
            :remote-method="getnationList"
            filterable
            clearable
            default-first-option
            remote
            placeholder="请输入民族"
          >
            <el-option
              v-for="(item, index) in nationListOptions"
              :key="item + index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="degree" label="学历">
          <el-select
            v-model="registerForm.degree"
            placeholder="请选择学历"
            width="20px"
            clearable
          >
            <el-option
              v-for="(item, index) in degreeOptions"
              :key="item + index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="毕业学校"
          class="postInfo-container-item"
          prop="school"
        >
          <el-select
            v-model="registerForm.school"
            :loading="select_school_loading"
            :remote-method="getSchoolList"
            filterable
            clearable
            default-first-option
            remote
            placeholder="输入最高学历毕业学校"
          >
            <el-option
              v-for="(item, index) in schoolOptions"
              :key="item + index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="birthday" label="出生日期">
          <el-date-picker
            v-model="registerForm.birthday"
            clearable
            align="right"
            type="date"
            placeholder="选择出生日期"
          />
        </el-form-item>
        <el-form-item
          label="所在城市"
          class="postInfo-container-item"
          prop="address"
        >
          <el-select
            v-model="registerForm.address"
            :remote-method="getcitiesList"
            filterable
            clearable
            default-first-option
            remote
            placeholder="请输入所在城市"
          >
            <el-option
              v-for="(item, index) in citiesListOptions"
              :key="item + index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="professional" label="专业名称">
          <el-input
            ref="professional"
            v-model="registerForm.professional"
            placeholder="专业名称"
            name="professional"
            type="text"
            tabindex="1"
            auto-complete="on"
            clearable
          />
        </el-form-item>
        <el-form-item prop="undergraduateTime" label="毕业时间">
          <el-date-picker
            v-model="registerForm.undergraduateTime"
            clearable
            align="right"
            type="date"
            placeholder="选择毕业时间"
          />
        </el-form-item>
        <el-form-item prop="faceimgUrl" label="证件照">
          <el-upload
            class="avatar-uploader"
            :action="avatarUpload_url"
            :data="queryAvatar"
            :show-file-list="false"
            :before-upload="handlebeforeUploadAvatar"
            :on-success="handleSuccessAvatar"
            :on-remove="handleRemoveAvatar"
          >
            <img
              v-if="registerForm.faceimgUrl"
              :src="registerForm.faceimgUrl"
              class="avatar"
              style="width: 88px;height: 93px"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <el-dialog :visible.sync="showdialogVisible">
            <img width="100%" :src="registerForm.faceimgUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item prop="attachmentUrl" label="附件简历">
          <el-upload
            ref="upload"
            accept=".docx, .pdf"
            :action="fileUpload_url"
            :data="queryFile"
            :limit="1"
            :on-success="handleSuccessFile"
            :on-remove="handleRemoveFile"
            :before-upload="handlebeforeUploadFile"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <div slot="tip" class="el-upload__tip">
              只能上传docx或pdf文件，且不超过3MB
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateUserinfo">确定</el-button>
      </div>
    </el-dialog>
    <!--更新基本信息的dialog-->
    <el-dialog title="基本信息更新" :visible.sync="BaiscdialogVisible">
      <el-form
        ref="basicForm"
        :model="basicForm"
        label-position="left"
        label-width="120px"
        style="width: 500px; margin-left:50px;"
      >
        <el-form-item prop="username" label="真实姓名">
          <el-input
            ref="username"
            v-model="basicForm.username"
            placeholder="真实姓名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
            clearable
          />
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input
            ref="phone"
            v-model="basicForm.phone"
            placeholder="手机号"
            name="phone"
            type="text"
            tabindex="1"
            auto-complete="on"
            clearable
          />
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input
            ref="email"
            v-model="basicForm.email"
            placeholder="邮箱"
            name="email"
            type="text"
            tabindex="1"
            auto-complete="on"
            clearable
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="BaiscdialogVisible = false">取消</el-button>
        <el-button type="primary" @click="UpdateBasicinfo">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPost2PositionListByUid,
  cancelPostedByPid,
  confirmStauts,
  UserinfoDetail,
  updateUserinfo,
  handleCollect
} from '@/api/recruit/position'
import UserinfoCard from './components/UserinfoCard'
// 对sessionStorage加密
import { StorageClass } from '@/utils/session'
import { postPosition } from '@/api/recruit/position'
import {
  JOBSEEKER_AVATAR_UPLOAD,
  JOBSEEKER_RESUME_UPLOAD
} from '@/utils/urlConfig'
export default {
  name: 'Userinfo',
  components: {
    UserinfoCard
  },
  data() {
    return {
      avatarUpload_url: JOBSEEKER_AVATAR_UPLOAD,
      fileUpload_url: JOBSEEKER_RESUME_UPLOAD,
      listQuery: {
        page: 1,
        limit: 10
      },
      collectedTotal: 0,
      collectedList: [],
      postedTotal: 0,
      // 已投递的岗位列表
      postedList: [],
      Posttitle: '已投递的岗位',
      // 简历状态或在招状态
      resumeStatus: '简历状态',
      positionStatus: '在招状态',
      // 1=投递列表，2=收藏列表
      statusflag: 1,
      show_badge: '',
      userinfo: {},
      // 用户信息完善表单信息
      dialogVisible: false,
      sexOptions: [
        { key: 1, value: '男' },
        { key: 2, value: '女' }
      ],
      ageOptions: [
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40
      ],
      degreeOptions: ['本科', '研究生', '博士'],
      registerForm: {
        sex: '',
        age: '',
        birthday: '',
        degree: '',
        school: '',
        nation: '',
        address: '',
        professional: '',
        undergraduateTime: '',
        faceimgUrl: '',
        attachmentUrl: null
      },
      registerRules: {
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        age: [{ required: true, message: '请选择年龄', trigger: 'blur' }],
        birthday: [
          { required: true, message: '请选择出生日期', trigger: 'blur' }
        ],
        nation: [{ required: true, message: '请选择民族', trigger: 'blur' }],
        degree: [{ required: true, message: '请选择学历', trigger: 'blur' }],
        school: [{ required: true, message: '请选择学校', trigger: 'blur' }],
        address: [
          { required: true, message: '请输入所在城市', trigger: 'blur' }
        ],
        professional: [
          { required: true, message: '请输入专业', trigger: 'blur' }
        ],
        undergraduateTime: [
          { required: true, message: '请选择毕业时间', trigger: 'blur' }
        ],
        faceimgUrl: [
          { required: true, message: '请上传头像', trigger: 'blur' }
        ],
        attachmentUrl: [
          { required: true, message: '请上传附件简历', trigger: 'blur' }
        ]
      },
      select_loading: false,
      nationListOptions: [],
      schoolOptions: [],
      select_school_loading: false,
      citiesListOptions: [],
      queryAvatar: { id: undefined, avatar: undefined },
      queryFile: { id: undefined, file: undefined },
      fileList: [],
      showdialogVisible: false,
      // 基本信息更新
      BaiscdialogVisible: false,
      basicForm: {
        username: '',
        phone: '',
        email: ''
      }
    }
  },
  computed: {
    avatar() {
      return StorageClass.getSession('avatar').avatar
    },
    jobseekerUsername() {
      return StorageClass.getSession('jobseekerUsername').jobseekerUsername
    },
    phone() {
      return StorageClass.getSession('phone').phone
    },
    email() {
      return StorageClass.getSession('email').email
    },
    jobseekerId() {
      return StorageClass.getSession('jobseekerId').jobseekerId
    }
  },
  mounted() {
    this.getUserinfoDetail()
    this.getPost2PositionListByUid()
    console.log('?????')
  },
  methods: {
    // 获取已投递的岗位列表
    getPost2PositionListByUid() {
      const temp = Object.assign({}, this.listQuery, {
        jobseekerId: this.jobseekerId
      })
      getPost2PositionListByUid(temp).then(res => {
        const {
          postedPositions,
          postedTotal,
          collectedPositions,
          collectedTotal
        } = res
        this.postedList = postedPositions
        this.postedTotal = postedTotal
        this.collectedTotal = collectedTotal
        this.collectedList = collectedPositions
      })
    },
    // 取消收藏或确定收藏岗位
    HandleCollect(data) {
      const temp = Object.assign({}, data, { jobSeekerId: this.jobseekerId })
      handleCollect(temp).then(res => {
        const { msg } = res
        this.$message.success(msg)
        this.getPost2PositionListByUid()
      })
    },
    // 在收藏列表中点击投递岗位
    HandleCollectpost(data) {
      const temp = { positionId: data.pid, jobSeekerId: this.jobseekerId }
      postPosition(temp).then(res => {
        const { msg } = res
        this.$message.success(msg)
        this.getPost2PositionListByUid()
      })
    },
    // 取消投递
    HandleCancelPost(id) {
      this.$confirm('取消投递将会从列表中删除,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
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
    // 根据用户id再次拉取数据库中用户最新的信息
    getUserinfoDetail() {
      UserinfoDetail(this.jobseekerId).then(res => {
        const { userinfo, doneUserinfo } = res
        this.userinfo = userinfo
        this.show_badge = doneUserinfo
        this.fileList.push({
          name: userinfo.attachmentUrl,
          url: userinfo.attachmentUrl
        })
      })
    },
    // 用户信息完善或用户信息更新的相关方法
    // 更新基本信息前的设置
    HandleupdateBasicUserinfo() {
      this.basicForm = Object.assign(
        {},
        {
          username: this.jobseekerUsername,
          email: this.email,
          phone: this.phone
        }
      )
      this.BaiscdialogVisible = true
      this.$nextTick(() => {
        this.$refs['basicForm'].clearValidate()
      })
    },
    // 用户基本信息更新
    UpdateBasicinfo() {
      this.$confirm('是否更新个人基本信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const tempData = Object.assign(
          {},
          this.basicForm,
          { basic: false },
          { id: this.jobseekerId, avatar: this.avatar }
        )
        updateUserinfo(tempData).then(res => {
          const { msg, data } = res
          this.BaiscdialogVisible = false
          this.$store.dispatch('position/resetSession', data)
          this.$notify({
            title: 'Success',
            message: msg,
            type: 'success',
            duration: 2000
          })
          window.location.reload()
        })
      })
    },
    // 更新详细信息前的设置
    HandleupdateUserinfo() {
      this.registerForm = Object.assign({}, this.userinfo)
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 获取民族列表
    getnationList(query) {
      this.nationListOptions = []
      import('@/utils/nation').then(res => {
        const { data } = res.default
        data.forEach(e => {
          if (e.name.indexOf(query) !== -1) {
            this.nationListOptions.push(e.name)
          }
        })
      })
    },
    // 获取高校列表
    getSchoolList(query) {
      this.schoolOptions = []
      import('@/utils/school').then(res => {
        res.default.forEach(e => {
          if (e.indexOf(query) !== -1) {
            this.schoolOptions.push(e)
          }
        })
      })
    },
    // 获取城市列表
    getcitiesList(query) {
      this.citiesListOptions = []
      import('@/utils/cities').then(res => {
        res.default.forEach(e => {
          if (e.indexOf(query) !== -1) {
            this.citiesListOptions.push(e)
          }
        })
      })
    },
    // 更新用户详细信息
    updateUserinfo() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$confirm('是否更新个人信息?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const tempData = Object.assign({}, this.registerForm, {
              basic: true
            })
            updateUserinfo(tempData).then(res => {
              const { msg, data } = res
              this.dialogVisible = false
              this.$store.dispatch('position/resetSession', data)
              this.$notify({
                title: 'Success',
                message: msg,
                type: 'success',
                duration: 2000
              })
              window.location.reload()
            })
          })
        }
      })
    },
    // 上传头像前的钩子
    handlebeforeUploadAvatar() {
      // 头像上传携带的用户id
      this.queryAvatar.id = StorageClass.getSession('jobseekerId').jobseekerId
      this.queryAvatar.avatar = StorageClass.getSession('avatar').avatar
    },
    // 头像上传成功后的钩子
    handleSuccessAvatar(file) {
      const { msg, files } = file
      this.$message.success(msg)
      this.registerForm.faceimgUrl = files[0].file
      this.$store.dispatch('position/resetAvatar', { avatar: files[0].file })
    },
    handleRemoveAvatar() {},
    // 文件上传前的钩子
    handlebeforeUploadFile(file) {
      this.queryFile.id = StorageClass.getSession('jobseekerId').jobseekerId
      this.queryFile.file = StorageClass.getSession('file').file
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isLt3M) {
        this.$message.error('文件不能超过3M')
      }
      return isLt3M
    },
    // 上传文件个数超出限制时的钩子
    handleExceed(limit) {
      this.$message.error('只能上传1个文件')
    },
    // 文件上传成功后的钩子
    handleSuccessFile(file) {
      const { msg, files } = file
      this.$message.success(msg)
      this.registerForm.attachmentUrl = files[0].file
      this.$store.dispatch('position/resetFile', { file: files[0].file })
    },
    handleRemoveFile() {}
  }
}
</script>

<style lang="scss" scoped>
.userinfo-container {
  margin-bottom: 80px;
  position: relative;
  min-height: 100%;
  width: 100%;
  .title {
    /*position: relative;*/
    margin-top: 50px;
    height: 80px;
    width: 100%;
    top: 60px;
    padding: 0 20px;
    h2 {
      float: left;
    }
    .tip {
      margin-left: 60px;
      float: left;
      position: relative;
      top: 23px;
      color: #99a9bf;
      cursor: pointer;
      :hover {
        color: #409eff;
      }
    }
  }
  .userinfo-main {
    height: 100%;
    padding-bottom: 60px;
    /*border: 0.5px dashed #99a9bf;*/
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /*:after{*/
    /*content: '';*/
    /*display: block;*/
    /*clear: both;*/
    /*visibility: hidden;*/
    /*}*/
    width: 100%;
    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .basic {
      margin: 10px 0;
      .avatar,
      .username,
      .phone,
      .email,
      .edit {
        float: left;
      }
      .username,
      .phone,
      .email {
        transform: translateY(40px);
        color: #99a9bf;
      }
      .edit {
        transform: translateY(35px);
      }
      div {
        &:nth-child(n) {
          margin: 20px 20px;
        }
      }
    }
    .collected,
    .posted {
      margin: 0 20px 20px 20px;
    }
  }
}
</style>

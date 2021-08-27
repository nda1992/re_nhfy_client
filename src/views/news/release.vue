<template>
    <!-- 新闻发布页面 -->
    <div class="createPost-container">
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
        <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
          <div class="stick">
            <PlatformDropdown v-model="postForm.platforms"/>
            <el-button v-loading="loading" style="margin-left: 10px" type="success" @click="submitForm" icon="el-icon-s-promotion" plain>发布</el-button>
            <el-button v-loading="loading" type="warning" @click="draftForm" icon="el-icon-document-checked" plain>存为草稿</el-button>
            <el-autocomplete
              clearable
              prefix-icon="el-icon-folder-opened"
              v-model="state"
              style="margin-left:10px;width: 150px"
              :fetch-suggestions="querySearchAsync"
              :placeholder="'草稿箱'+'('+draftNums+')'"
              @select="handleSelect"
            ></el-autocomplete>
          </div>
        </sticky>
        <div class="createPost-main-container">
          <el-row>
            <Warning/>
            <el-col :span="24">
              <el-form-item style="margin-bottom: 40px;" prop="title" name="name" required>
                <MDinput v-model="postForm.title" :maxlength="100">新闻标题</MDinput>
              </el-form-item>
              <div class="postInfo-container">
                <el-row>
                  <el-col :span="6">
                    <el-form-item label-width="40px" label="作者" class="postInfo-container-item">
                      <el-select :loading="select_loading" v-model="postForm.author" :remote-method="getRemoteUserList" filterable default-first-option remote placeholder="搜索作者">
                        <el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label-width="90px" label="发布时间" class="postInfo-container-item">
                      <el-date-picker v-model="postForm.display_time" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label-width="90px" label="新闻类别" class="postInfo-container-item">
                      <el-select :loading="select_loading" v-model="postForm.category" :remote-method="getRemoteCategoryList" filterable default-first-option remote placeholder="搜索新闻类别">
                        <el-option v-for="(item,index) in categoryListOptions" :key="item+index" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label-width="90px" label="所属部门" class="postInfo-container-item">
                      <el-select :loading="select_loading" v-model="postForm.deptName" :remote-method="getRemoteDeptList" filterable default-first-option remote placeholder="搜索部门">
                        <el-option v-for="(item,index) in deptListOptions" :key="item+index" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-form-item prop="content" style="margin-bottom: 30px;">
            <Tinymce ref="editor" v-model="postForm.content" :height="400" />
          </el-form-item>
        </div>
      </el-form>
    </div>
</template>
<script>
import { searchUser, searchCategory, searchDept, releaseNews, saveDraft, getDraftList, getDraftById } from '@/api/news/news'
import Tinymce from '@/components/Tinymce'
// import Upload from '@/components/Upload/SingleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import Warning from './components/Warning'
import { PlatformDropdown } from './components/Dropdown'
const defaultForm = {
  loginuserCode: '',
  author: '',
  status: 'draft', // 导航条的状态
  title: '', // 文章题目
  content: '', // 文章内容
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: 0,
  platforms: ['院内网站'], // 1=院内网站，2=院外网站，3=院内网站和院外网站
  category: '',
  deptName: '',
  type: '', // 1=发布，2=草稿
  role: '',
  newsStatus: undefined,
  currentRoute: ''
}
export default {
  components: { Tinymce, Sticky, MDinput, Warning, PlatformDropdown },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      draftTitleList: [],
      draftNums: 0,
      state: '',
      timeout: null,
      postForm: Object.assign({}, defaultForm),
      select_loading: false,
      loading: false,
      rules: {
        title: [{ validator: validateRequire }],
        category: [{ validator: validateRequire }],
        author: [{ validator: validateRequire }],
        deptName: [{ validator: validateRequire }]
      },
      tempRoute: {},
      userListOptions: [],
      categoryListOptions: [],
      deptListOptions: []
    }
  },
  mounted() {
    this.getdraftTitleList()
    this.postForm.currentRoute = this.$router.currentRoute.fullPath
  },
  methods: {
    // 重置postForm
    resetPostForm() {
      this.postForm = {
        loginuserCode: '',
        author: '',
        status: 'draft', // 导航条的状态
        title: '', // 文章题目
        content: '', // 文章内容
        image_uri: '', // 文章图片
        display_time: undefined, // 前台展示时间
        id: undefined,
        platforms: ['院内网站'], // 1=院内网站，2=院外网站，3=院内网站和院外网站
        category: '',
        deptName: '',
        type: '', // 1=发布，2=草稿
        role: '',
        newsStatus: undefined
      }
      this.$nextTick(() => {
        this.$refs['postForm'].clearValidate()
      })
    },
    // 点击发布按钮触发
    submitForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      if (this.postForm.author === '' || this.postForm.deptName === '' || this.postForm.category === '') {
        this.$message({
          message: '请填写作者相关信息',
          type: 'warning'
        })
        return
      }
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.$confirm('是否发布文章?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning' }).then(() => {
            this.postForm.status = 'published'
            this.loading = true
            this.postForm.loginuserCode = localStorage.getItem('userCode')
            this.postForm.type = 2 // 表示已经提交，申请发布
            this.postForm.newsStatus = 2 // 表示已经提交，但需要管理员审核
            this.postForm.role = localStorage.getItem('role')
            releaseNews(this.postForm).then(() => {
              this.$notify({
                title: '成功',
                message: '发布成功',
                type: 'success',
                duration: 2000
              })
              this.getdraftTitleList()
              this.loading = false
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /* 文章草稿相关方法 */
    // 获取该用户下所有的文章草稿标题
    getdraftTitleList() {
      const temp = { role: localStorage.getItem('role'), loginuserCode: localStorage.getItem('userCode') }
      getDraftList(temp).then(res => {
        const { items } = res
        this.draftTitleList = items.map(e => {
          return { value: e.title, id: e.id }
        })
        this.draftNums = items.length
      })
    },
    // 保存为草稿
    draftForm() {
      if (this.postForm.title === '' || this.postForm.content === '') {
        this.$message.warning('请输入必要的标题或内容')
        return
      }
      this.postForm.loginuserCode = localStorage.getItem('userCode')
      this.postForm.role = localStorage.getItem('role')
      this.postForm.newsStatus = 4 // 草稿
      this.postForm.type = 1 // 草稿
      this.$confirm('是否存为草稿?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning' }).then(() => {
        this.loading = true
        saveDraft(this.postForm).then((res) => {
          this.getdraftTitleList()
          this.$notify({
            message: '已经保存为草稿',
            type: 'success',
            showClose: true,
            duration: 2000
          })
          this.postForm.status = 'draft'
          this.loading = false
          this.resetPostForm()
        })
      })
    },

    // 获取草稿列表
    querySearchAsync(queryString, cb) {
      const draftList = this.draftTitleList
      this.draftNums = this.draftTitleList.length
      const results = queryString ? draftList.filter(this.createStateFilter(queryString)) : draftList
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 2000)
    },
    // 过滤草稿标题内容
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 选择草稿标题后触发
    handleSelect(item) {
      const value = { id: item.id }
      getDraftById(value).then(res => {
        const { result } = res
        this.postForm.id = result.id
        this.postForm.title = result.title
        this.postForm.content = result.content
        this.postForm.display_time = result.createTime
        this.postForm.category = result.category
        this.postForm.author = result.userName
        this.postForm.deptName = result.deptName
        this.postForm.status = result.status
      })
    },

    // 查询发布新闻的作者
    getRemoteUserList(query) {
      this.select_loading = true
      searchUser(query).then(response => {
        const { items } = response
        if (!items) return
        this.userListOptions = items.map(v => v.username)
      })
      this.select_loading = false
    },

    // 获取新闻类别
    getRemoteCategoryList(query) {
      this.select_loading = true
      searchCategory(query).then(response => {
        const { items } = response
        if (!items) return
        this.categoryListOptions = items.map(v => v.name)
      })
      this.select_loading = false
    },
    // 获取部门
    getRemoteDeptList(query) {
      this.select_loading = true
      searchDept(query).then(response => {
        const { items } = response
        if (!items) return
        this.deptListOptions = items.map(v => v.name)
      })
      this.select_loading = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.createPost-container{
  position: relative;
  .stick{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .createPost-main-container{
    padding: 40px 15px 20px 20px;
    .postInfo-container{
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item{
        float: left;
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}
.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>

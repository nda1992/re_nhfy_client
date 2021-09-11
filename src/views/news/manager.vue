<template>
  <div class="app-container">
    <div class="title">
      <!--<h3>新闻模块管理</h3>-->
    </div>
    <div class="tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="新闻分类管理" name="first">
          <NewsCategory @createData="createData"/>
        </el-tab-pane>
        <el-tab-pane label="发文作者和科室" name="second">发文作者和科室</el-tab-pane>
        <el-tab-pane label="招聘系统轮播图" name="third">
          <div class="swiper-header">
            <div style="color: #ff4949;font-size: 12px">(左侧第一列选择要在轮播图中展示的图片)</div>
            <el-tooltip class="item" effect="dark" content="提交要展示的轮播图" placement="bottom">
              <el-button type="success" @click="submit">提交</el-button>
            </el-tooltip>
          </div>
          <ImgList
            :imgList="imgList"
            :srcList="srcList"
            @handleDelete="handleDelete"
            @handleSelectionChange="handleSelectionChange"/>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getAllSwiperImgs" />
          <el-divider></el-divider>
          <UploadImg :userCode="userCode" @getAllSwiperImgs="getAllSwiperImgs"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { createCategory } from '@/api/news/news'
import { getAllSwiperImgs, deleteImgById, submitSwiper } from '@/api/recruit/recruit'
import NewsCategory from './components/Category/NewsCategory'
import ImgList from './components/SwiperImgs/ImgList'
import UploadImg from './components/SwiperImgs/UploadImg'
import Pagination from '@/components/Pagination'
export default {
  name: 'manager',
  components: {
    NewsCategory,
    ImgList,
    UploadImg,
    Pagination
  },
  data() {
    return {
      total: 0,
      listQuery: {
        limit: 10,
        page: 1
      },
      activeName: 'third',
      imgList: [],
      srcList: [],
      selectList: []
    }
  },
  mounted() {
    this.getAllSwiperImgs()
  },
  computed: {
    username() {
      return localStorage.getItem('name')
    },
    userCode() {
      return localStorage.getItem('userCode')
    }
  },
  methods: {
    createData(form) {
      const temp = Object.assign({}, form, { username: this.username })
      this.$confirm('是否添加?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning' }).then(() => {
        createCategory(temp).then((res) => {
          const { msg } = res
          this.$notify({
            title: 'Success',
            message: msg,
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    // 查询已经上传的所有轮播图
    getAllSwiperImgs() {
      const temp = Object.assign({}, { userCode: this.userCode }, this.listQuery)
      getAllSwiperImgs(temp).then(res => {
        const { files, total } = res
        this.imgList = files
        this.total = total
        this.srcList = this.imgList.map(e => e.url)
      })
    },
    handleDelete(id) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteImgById({ id: id }).then(res => {
          const { msg } = res
          this.$notify({
            title: 'Success',
            message: msg,
            type: 'success',
            duration: 2000
          })
          this.getAllSwiperImgs()
        })
      })
    },
    // 多选框
    handleSelectionChange(val) {
      this.selectList = val
    },
    // 提交要展示的轮播图
    submit() {
      if(this.selectList.length < 3 || this.selectList.length > 6) {
        this.$message.error('请选择3~6张轮播图片')
        return
      }
      const temp = this.selectList.map(e => e.id)
      submitSwiper({ selected: temp }).then(res => {
        const { msg } = res
        this.$message.success(msg)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container{
    .tabs{
      .swiper-header{
        width: 300px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
    }
  }
</style>

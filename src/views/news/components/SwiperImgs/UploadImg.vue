<template>
  <div class="upload">
    <h4>内容上传</h4>
    <div style="margin-bottom:20px;">
      <span>轮播图文字简介(使用新闻标题):</span>
      <div v-if="swiperText !== ''" style="margin:20px;">
        您选择的新闻标题是:<span style="color:red;">{{ swiperText }}</span>
      </div>
      <el-button @click="openDialog" type="primary" style="margin:20px;"
        >点击选择新闻标题</el-button
      >
    </div>
    <el-dialog title="所有新闻标题" :visible.sync="dialog">
      <el-table
        ref="multipTable"
        :data="newsList"
        @selection-change="selectChange"
        @select="handleSelectionChange"
        @row-click="handleRowClick"
        @select-all="selectAll"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="ID" prop="id" align="center" width="55">
          <template slot-scope="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <!--新闻标题-->
        <el-table-column
          label="新闻标题"
          prop="title"
          align="center"
          min-width="15px"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getNewsList"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取消</el-button>
        <el-button type="primary" @click="selectNewsTitle">确定</el-button>
      </div>
    </el-dialog>
    <el-upload
      ref="upload"
      :headers="{ token: 'token' }"
      :action="upload_url"
      :data="{ userCode: userCode, swiperText: swiperText, newsid: newsid }"
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
      <img width="100%" :src="dialogImageUrl" />
    </el-dialog>
  </div>
</template>

<script>
import { SWIPER_IMAGES_UPLOAD } from '@/utils/urlConfig'
import Pagination from '@/components/Pagination'
import { getnewsList } from '@/api/news/news'
Array.prototype.remove = function(val) {
  var index = this.indexOf(val)
  if (index > -1) {
    this.splice(index, 1)
  }
}

export default {
  name: 'UploadImg',
  components: { Pagination },
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
      upload_url: SWIPER_IMAGES_UPLOAD,
      // 点击轮播图需要访问的新闻内容（用户选择新闻题目）
      swiperText: '',
      newsid: undefined,
      dialog: false,
      newsList: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      selectedList: []
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
    },
    getNewsList() {
      const temp = Object.assign({}, { role: 'admin' }, this.listQuery)
      getnewsList(temp).then(res => {
        const { total, items } = res
        this.newsList = items
        this.total = total
      })
    },
    openDialog() {
      this.dialog = true
      this.getNewsList()
    },
    selectChange(e) {
      this.selectedList = e
    },
    handleSelectionChange(selection) {
      if (selection.length > 1) {
        const del_row = selection.shift()
        this.$refs.multipTable.toggleRowSelection(del_row, false)
      }
    },
    handleRowClick(row, column, event) {
      this.$refs.multipTable.toggleRowSelection(row)
      this.handleSelectionChange(this.selectedList)
    },
    selectAll(selection) {
      if (selection.length > 1) {
        selection.length = 1
      }
    },
    selectNewsTitle() {
      this.swiperText = this.selectedList[0].title
      this.newsid = parseInt(this.selectedList[0].id)
      this.dialog = false
    }
  }
}
</script>

<style scoped>
.upload {
  margin-top: 10px;
}
</style>

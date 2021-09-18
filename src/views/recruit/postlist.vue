<template>
  <div class="app-container">
    <div class="title">
      <el-tooltip class="item" effect="dark" content="按下回车键搜索" placement="bottom">
        <el-input v-model="searchVal" :placeholder="'按'+searchType+'搜索'" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter(searchType)" />
      </el-tooltip>
      <el-select v-model="searchType" placeholder="请选择搜索类型" style="width: 150px" class="filter-item" type="primary">
        <el-option v-for="item in typeItems" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button type="success" @click="HandlebulkSendMessageBox">群发通知</el-button>
      <span style="color: #ff6666;font-size: 12px;">(请根据左边的多选框选择)</span>
    </div>
    <div class="table-container">
      <el-table
        @selection-change="handleSelectionChange"
        :row-class-name="rowClassName"
        :key="tableKey"
        v-loading="listLoading"
        :data="searchList"
        border
        fit
        highlight-current-row
        ref="currentData"
        style="width: 100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <!--自增id-->
        <el-table-column label="序号" align="center" prop="xh" min-width="3px"></el-table-column>
        <!--创建时间-->
        <el-table-column label="投递时间" prop="createdTime" align="center" min-width="8px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <i class="el-icon-time" style="margin-right: 3px;"></i>
            <span>{{ row.createdTime }}</span>
          </template>
        </el-table-column>
        <!--岗位名称-->
        <el-table-column label="招聘岗位名称" prop="positionName" align="center" :show-overflow-tooltip="true" min-width="8px">
          <template slot-scope="{row}">
            <span>{{ row.positionName }}</span>
          </template>
        </el-table-column>
        <!--求职者姓名-->
        <el-table-column label="姓名" prop="username" align="center" :show-overflow-tooltip="true" min-width="5px">
          <template slot-scope="{row}">
            <span style="cursor: pointer;">{{ row.username }}</span>
          </template>
        </el-table-column>
        <!--毕业专业-->
        <el-table-column label="毕业专业" prop="professional" align="center" min-width="8px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.professional }}</span>
          </template>
        </el-table-column>
        <!--毕业学校-->
        <el-table-column label="毕业学校" prop="school" align="center" min-width="8px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.school }}</span>
          </template>
        </el-table-column>
        <!--毕业学校-->
        <el-table-column label="手机号" prop="phone" align="center" min-width="7px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.phone }}</span>
          </template>
        </el-table-column>
        <!--毕业学校-->
        <el-table-column label="邮箱" prop="email" align="center" min-width="8px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.email }}</span>
          </template>
        </el-table-column>
        <!--附件简历下载-->
        <el-table-column label="简历下载" prop="attachmentUrl" align="center" min-width="6px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>
              <el-tooltip class="item" effect="dark" content="点击查看简历" placement="bottom">
                <a :href="row.attachmentUrl" v-if="row.attachmentUrl.split('/').slice(-1)[0].indexOf('pdf')!==-1" style="color: #409EFF">简历</a>
                <el-button type="text" size="mini" @click="gotoResume(row.attachmentUrl)" v-else>简历</el-button>
              </el-tooltip>
            </span>
          </template>
        </el-table-column>
        <!--当前状态-->
        <el-table-column label="当前状态" prop="status" align="center" min-width="8px" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <!--状态审核-->
        <el-table-column label="状态审核" prop="Switch" align="center" min-width="12px">
          <template slot-scope="{row}">
            <el-switch
              :disabled="row.status==='求职者已确认'"
              @change="handleSetStatus(row)"
              v-model="row.Switch"
              active-color="#13ce66"
              inactive-color="#ff4949"
              inactive-text="不通过"
              active-text="通过"
            >
            </el-switch>
          </template>
        </el-table-column>
        <!--操作-->
        <el-table-column label="操作" align="center" min-width="7px" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button
              v-if="row.status!='deleted'"
              size="mini" type="danger"
              @click="handleDelete(row,$index)"
              icon="el-icon-delete" :disabled="row.status==='求职者已确认'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPostedPosition()" />
    </div>
    <!--消息的dialog-->
    <el-dialog title="消息发送对话框" :visible.sync="showMsgBox">
      <el-form ref="messageForm" :model="messageForm" label-position="left" label-width="20px" style="width: 700px;height: 120px" >
        <el-form-item prop="content">
          <el-input
            width="120"
            :rows="5"
            ref="username"
            v-model="messageForm.content"
            placeholder="请输入消息..."
            type="textarea"
            @keyup.enter.native="sendMessage"/>
        </el-form-item>
      </el-form>
      <el-popover placement="bottom" width="500" height="100%" trigger="click" v-model="emojiShow" >
        <el-button slot="reference" style="transform: translateX(640px)">😀</el-button>
        <div class="browBox">
          <ul><li v-for="(item, index) in faceList" :key="index" @click="getBrow(index)">{{ item }}</li></ul>
        </div>
      </el-popover>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showMsgBox = false">取消</el-button>
        <el-button type="primary" @click="sendMessage">发送</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getPost2PositionListByUid, setPositionStatus, deletePost2Position } from '@/api/recruit/position'
import { sendMessage } from '@/api/recruit/position'
export default {
  name: 'postlist',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '已审核通过': 'success',
        '审核未通过': 'danger',
        '未审核': 'info',
        '已确认': 'primary'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        role: localStorage.getItem('role')
      },
      total: 0,
      tableKey: 0,
      listLoading: false,
      searchVal: '',
      searchType: '岗位名称',
      typeItems: ['岗位名称', '求职者姓名', '专业', '毕业学校'],
      list: [],
      searchList: [],
      // 发送消息定义的变量
      showMsgBox: false,
      // 要发送目标用户的id
      uid: '',
      messageForm: {
        content: ''
      },
      // 临时保存多选结果
      tempSelect: [],
      // 批量要发送消息的用户
      bulkUid: [],
      // 表情框是否展示
      emojiShow: false,
      // 表情列表
      faceList: [],
      // 表情文本
      getBrowString: ''
    }
  },
  computed: {
    userCode() {
      return localStorage.getItem('userCode')
    }
  },
  mounted() {
    this.getPostedPosition()
    this.loadEmojis()
  },
  methods: {
    rowClassName({ row, rowIndex }) {
      row.xh = rowIndex + 1
    },
    // 过滤显示处理函数
    handleFilter(type) {
      if (type === '岗位名称') {
        this.searchList = this.list.filter(item => { return item.positionName.match(this.searchVal) })
      } else if (type === '求职者姓名') {
        this.searchList = this.list.filter(item => { return item.username.match(this.searchVal) })
      } else if (type === '专业') {
        this.searchList = this.list.filter(item => { return item.professional.match(this.searchVal) })
      } else if (type === '毕业学校') {
        this.searchList = this.list.filter(item => { return item.school.match(this.searchVal) })
      }
    },
    // 获取post2position对应jobseeker和position
    getPostedPosition() {
      this.listLoading = true
      getPost2PositionListByUid(this.listQuery).then(res => {
        const { items, msg, total } = res
        this.total = total
        this.searchList = items
        this.list = items
        this.$message.success(msg)
        this.listLoading = false
      })
    },
    // 触发switch按钮发送审核通过
    handleSetStatus(row) {
      setPositionStatus(row).then(res => {
        const { msg } = res
        this.$notify({
          title: 'Success',
          message: msg,
          type: 'success'
        })
        this.getPostedPosition()
      })
    },
    // 删除
    handleDelete(row) {
      this.$confirm('删除该条记录的同时,也会删除求职者已投递的岗位,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning' }).then(() => {
        deletePost2Position().then(res => {
          const { msg } = res
          this.$notify({
            title: 'Success',
            message: msg,
            type: 'success'
          })
        })
      })
    },
    // 查看用户的用户简历
    gotoResume(url) {
      this.$router.push({ name: 'Download', params: { url: url }})
      // console.log(url)
    },
    // 获取表情列表
    loadEmojis() {
      import('@/utils/emojis.js').then(res => {
        this.faceList = res.default
      })
    },
    // 多选按钮触发
    handleSelectionChange(val) {
      this.tempSelect = val
    },
    // 打开dialog批量发送消息
    HandlebulkSendMessageBox() {
      if (this.tempSelect.length === 0) {
        this.$message.error('请至少选择一个求职者发送消息')
        return
      }
      this.showMsgBox = true
      this.messageForm.content = ''
      this.$nextTick(() => {
        this.$refs['messageForm'].clearValidate()
      })
    },
    getBrow(index) {
      for (let i in this.faceList) {
        if (parseInt(index) === parseInt(i)) {
          this.getBrowString = this.faceList[index]
          this.messageForm.content += this.getBrowString
        }
      }
      this.emojiShow = false
    },
    // 执行批量发送消息
    sendMessage() {
      const send_date = new Date()
      this.bulkUid = this.tempSelect.map(e => e.jobseekerId)
      const msgList = this.bulkUid.map(e => {
        // remove_receive_id和remove_send_id默认值设置为0
        return { receive_id: e, send_id: this.userCode, content: this.messageForm.content, send_date: send_date, is_read: 0, remove_receive_id: 0, remove_send_id: 0 }
      })
      // const msgList = [{ receive_id: this.uid, send_id: this.userCode, content: this.messageForm.content, send_date: send_date, is_read: 0 }]
      const temp = Object.assign({}, { msgList: msgList })
      sendMessage(temp).then(res => {
        const { msg } = res
        this.$message.success(msg)
        this.showMsgBox = false
      })
    }
  }
}
</script>
<style scoped>
  .el-switch__label *{
    font-size: 11px !important;
  }
</style>

<style lang="scss" scoped>
  .app-container{
    .title{
      width: 650px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .table-container{
      margin-top: 15px;
      .el-table{
        font-size: 12px;
      }
    }
  }
  .el-popover{
    .browBox {
      width: 100%;
      height: 200px;
      background: #e6e6e6;
      /*position: absolute;*/
      z-index: 100;
      /*bottom: 0;*/
      right: 0;
      overflow: scroll;
      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        li {
          cursor: pointer;
          width: 10%;
          font-size: 26px;
          list-style: none;
          text-align: center;
        }
      }
    }
  }

</style>

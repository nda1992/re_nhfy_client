<template>
  <div class="app-container">
    <div class="title">
      <span class="show-title">消息列表</span>
      <el-badge :value="activeTab==='activity'?Receivetotal:sendTotal" class="item" :hidden="(activeTab==='activity'&&Receivetotal===0)||(activeTab==='account'&&sendTotal===0)">
        <span v-if="activeTab==='activity'" class="show-tips" @click="removeAllReceiveMsg">清空所有接收到的消息</span>
        <span v-else class="show-tips" @click="removeAllSendMsg">清空所有已发送的消息</span>
      </el-badge>
    </div>
    <div>
      <el-card>
        <el-tabs v-model="activeTab">
          <el-tab-pane label="已收到的消息列表" name="activity">
            <activity
              :receive-message-list="ReceiveMessageList"
              :total="Receivetotal"
              :list-query="listQuery"
              :show-msg-box="showMsgBox"
              @getAllReceiveMegList="getAllReceiveMsgList"
              @receiveRemoveMsg="receiveRemoveMsg"
              @HandlebulkSendMessageBox="HandlebulkSendMessageBox"
            />
          </el-tab-pane>
          <el-tab-pane label="已发送的消息列表" name="account">
            <account
              :content="content"
              :send-message-list="SendMessageList"
              :total="sendTotal"
              :list-query="listQuery"
              :avatar="avatar"
              @getAllSendMsg="getAllSendMsg"
              @removeSendMsg="removeSendMsg"
            />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!--发送消息的dialog-->
    <el-dialog title="消息发送对话框" :visible.sync="showMsgBox">
      <el-form ref="messageForm" :model="messageForm" label-position="left" label-width="20px" style="width: 700px;height: 120px">
        <el-form-item prop="content">
          <el-input
            ref="username"
            v-model="messageForm.content"
            width="120"
            :rows="5"
            placeholder="请输入消息..."
            type="textarea"
            @keyup.enter.native="sendMessage"
          />
        </el-form-item>
      </el-form>
      <el-popover v-model="emojiShow" placement="bottom" width="500" height="100%" trigger="click">
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
import { getReceiveMsg, getSendMsg, updateIsread, receiveRemoveMsg, removeAllReceiveMsg, replyMessage, removeSendMsg, removeAllSendMsg } from '@/api/recruit/position'
import Activity from './components/Activity'
import Account from './components/Account'
// 对sessionStorage加密
import { StorageClass } from '@/utils/session'
export default {
  components: { Activity, Account },
  data() {
    return {
      activeTab: 'activity',
      listQuery: {
        page: 1,
        limit: 10
      },
      Receivetotal: 0,
      // 已经接收到的消息列表
      ReceiveMessageList: [],
      sendTotal: 0,
      // 已经发送的消息列表
      SendMessageList: [],
      showMsgBox: false,
      messageForm: { content: '' },
      // 批量要发送消息的用户
      bulkUid: [],
      // 表情框是否展示
      emojiShow: false,
      // 表情列表
      faceList: [],
      // 表情文本
      getBrowString: '',
      // 回复的给谁？管理员的id
      mid: '',
      // 显示求职者回复的是哪一条消息
      content: ''
    }
  },
  computed: {
    jobseekerId() {
      return StorageClass.getSession('jobseekerId').jobseekerId
    },
    // 求职者头像
    avatar() {
      return StorageClass.getSession('avatar').avatar
    }
  },
  created() {
    // 发送一次请求，更新消息为已读（is_read=1）
    this.updateIsread()
    // 获取所有接收到的通知
    this.getAllReceiveMsgList()
    // 获取所有已发送的通知
    this.getAllSendMsg()
    // 加载表情列表
    this.loadEmojis()
  },
  methods: {
    // 更新消息为已读
    updateIsread() {
      const temp = { receive_id: this.jobseekerId }
      updateIsread(temp).then(res => {})
    },
    // 根据用户id查询接收到的所有消息
    getAllReceiveMsgList() {
      const temp = Object.assign({}, this.listQuery, { receive_id: this.jobseekerId })
      getReceiveMsg(temp).then(res => {
        const { msgList, total } = res
        this.Receivetotal = total
        this.ReceiveMessageList = msgList
        console.log(this.ReceiveMessageList)
      })
    },
    // 根据用户id查询已经发送的所有列表
    getAllSendMsg() {
      const temp = Object.assign({}, { send_id: this.jobseekerId }, this.listQuery)
      getSendMsg(temp).then(res => {
        const { msgList, total } = res
        this.sendTotal = total
        this.SendMessageList = msgList
      })
    },
    // 删除接收到的某条消息
    receiveRemoveMsg(id) {
      const temp = Object.assign({}, { id: id, receive_id: this.jobseekerId })
      receiveRemoveMsg(temp).then(res => {
        const { msg } = res
        this.$message.success(msg)
        this.getAllReceiveMsgList()
      })
    },
    // 删除所有接收到的消息
    removeAllReceiveMsg() {
      this.$confirm('是否清空所有接收到的消息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const temp = this.ReceiveMessageList.map(e => {
          return { id: e.id, remove_receive_id: this.jobseekerId }
        })
        removeAllReceiveMsg({ msgList: temp }).then(res => {
          const { msg } = res
          this.getAllReceiveMsgList()
          // this.showMsgBox = false
          this.$message.success(msg)
        })
      })
    },
    // 删除发送的某条消息
    removeSendMsg(id) {
      const temp = Object.assign({}, { send_id: this.jobseekerId, id: id })
      removeSendMsg(temp).then(res => {
        const { msg } = res
        this.$message.success(msg)
        this.getAllSendMsg()
      })
    },
    // 删除所有发送的消息
    removeAllSendMsg() {
      this.$confirm('是否清空所有已发送的消息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const temp = this.SendMessageList.map(e => {
          return { id: e.id, remove_send_id: this.jobseekerId }
        })
        removeAllSendMsg({ msgList: temp }).then(res => {
          const { msg } = res
          this.$message.success(msg)
          this.getAllSendMsg()
        })
      })
    },
    // 获取表情列表
    loadEmojis() {
      import('@/utils/emojis.js').then(res => {
        this.faceList = res.default
      })
    },
    // 打开dialog发送消息
    HandlebulkSendMessageBox(showMsgBox) {
      this.showMsgBox = showMsgBox.showMsgBox
      this.mid = showMsgBox.userCode
      this.content = showMsgBox.content
      this.messageForm.content = ''
      this.$nextTick(() => {
        this.$refs['messageForm'].clearValidate()
      })
    },
    getBrow(index) {
      for (const i in this.faceList) {
        if (parseInt(index) === parseInt(i)) {
          this.getBrowString = this.faceList[index]
          this.messageForm.content += this.getBrowString
        }
      }
      this.emojiShow = false
    },
    sendMessage() {
      const temp = { receive_id: this.mid, send_id: this.jobseekerId, content: this.messageForm.content, replycontent: this.content, send_date: new Date(), is_read: 0, remove_receive_id: 0, remove_send_id: 0 }
      replyMessage(temp).then(res => {
        const { msg } = res
        this.$message.success(msg)
        this.showMsgBox = false
        this.getAllSendMsg()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container{
    position: relative;
    top: 60px;
    padding: 0 20px;
    margin: 0;
    .title{
      margin-bottom: 25px;
      .show-title{
        font-size: 24px;
        font-weight: bold;
      }
      .item{
        .show-tips{
          margin-left: 50px;
          font-size: 15px;
          color: #97a8be;
          cursor: pointer;
        }
      }
    }
    .el-card{
      margin-bottom: 80px;
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

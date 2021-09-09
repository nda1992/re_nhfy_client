<template>
  <div class="app-container">
    <div class="title">
      <span class="show-title">消息列表</span>
      <el-badge :value="3" class="item">
        <span class="show-tips" @click="removeAllmsg">清空所有消息</span>
      </el-badge>
    </div>
    <div>
      <el-card>
        <el-tabs v-model="activeTab">
          <el-tab-pane label="已收到的消息列表" name="activity">
            <activity :ReceiveMessageList="ReceiveMessageList" :total="Receivetotal" :listQuery="listQuery" @getAllReceiveMegList="getAllReceiveMsgList"/>
          </el-tab-pane>
          <el-tab-pane label="已发送的消息列表" name="account">
            <account @getAllSendMsg="getAllSendMsg" :SendMessageList="SendMessageList" :total="sendTotal" :listQuery="listQuery"/>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getReceiveMsg, getSendMsg, updateIsread } from '@/api/recruit/position'
import Activity from './components/Activity'
import Account from './components/Account'
export default {
  components: { Activity, Account },
  data() {
    return {
      activeTab: 'activity',
      listQuery: {
        page: 1,
        limit: 10
        // role: localStorage.getItem('role')
      },
      Receivetotal: 0,
      // 已经接收到的消息列表
      ReceiveMessageList: [],
      sendTotal: 0,
      // 已经发送的消息列表
      SendMessageList: []
    }
  },
  computed: {
    jobseekerId() {
      return sessionStorage.getItem('jobseekerId')
    }
  },
  created() {
    // 发送一次请求，更新消息为已读（is_read=1）
    this.updateIsread()
    this.getAllReceiveMsgList()
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
      })
    },
    // 根据用户id查询已经发送的所有列表
    getAllSendMsg() {
      const temp = Object.assign({}, { send_id: this.jobseekerId })
      getSendMsg(temp).then(res => {
        const { msgList, total } = res
        this.sendTotal = total
        this.SendMessageList = msgList
      })
    },
    // 删除所有消息
    removeAllmsg() {}
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
</style>

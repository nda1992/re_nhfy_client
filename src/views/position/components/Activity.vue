<template>
  <div class="user-activity">
    <div v-if="ReceiveMessageList.length!==0">
      <div class="post" v-for="(msg,index) in ReceiveMessageList" :key="msg.id">
        <div class="user-block">
          <img class="img-circle" :src="'https://wpimg.wallstcn.com/57ed425a-c71e-4201-9428-68760c0537c4.jpg'+avatarPrefix">
          <span class="username text-muted">发送者是 {{ msg.send_id }} </span>
          <span class="description">发送时间 {{ msg.format_send_date }}</span>
        </div>
        <p style="color: #1f2d3d">{{ msg.content }}</p>
        <ul class="list-inline">
          <li>
            <span class="link-black text-sm" @click="HandlebulkSendMessageBox(!showMsgBox, msg.send_id,msg.content)">回复</span>
            <el-popconfirm title="确定删除该条消息吗?" @onConfirm="receiveRemoveMsg(msg.id)">
              <el-button slot="reference" type="text">
                <span class="link-black text-sm">删除</span>
              </el-button>
            </el-popconfirm>
          </li>
        </ul>
      </div>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getAllReceiveMsgList()" />
    </div>
    <div class="message" v-else>
      <img src="../../../icons/imgs/NoMessage.png" alt="" height="380" width="350" />
      <span>你还没有收到消息哦~</span>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
const avatarPrefix = '?imageView2/1/w/80/h/80'

export default {
  components: { Pagination },
  props: {
    ReceiveMessageList: {
      type: Array,
      default: () => {
        return []
      }
    },
    listQuery: {
      type: Object,
      default: () => {
        return {}
      }
    },
    total: {
      type: Number,
      default: () => {
        return 0
      }
    },
    showMsgBox: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      avatarPrefix
    }
  },
  methods: {
    // 获取所有收到的消息
    getAllReceiveMsgList() {
      this.$emit('getAllReceiveMsgList')
    },
    // 删除某条消息
    receiveRemoveMsg(id) {
      this.$emit('receiveRemoveMsg', id)
    },
    HandlebulkSendMessageBox(showMsgBox, send_id, content) {
      this.$emit('HandlebulkSendMessageBox', { showMsgBox: showMsgBox, userCode: send_id, content: content })
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-activity {
    min-height: 100%;
    margin-bottom: 80px;
    padding: 0 40px;
    /*position: relative;*/
    /*top: 80px;*/
    .user-block {
      .username,
      .description {
        display: block;
        margin-left: 50px;
        padding: 2px 0;
      }

      .username{
        font-size: 16px;
        color: #97a8be;
      }

      :after {
        clear: both;
      }

      .img-circle {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        float: left;
      }

      span {
        font-weight: 500;
        font-size: 12px;
      }
    }

    .post {
      font-size: 14px;
      border-bottom: 1px solid #d2d6de;
      margin-bottom: 15px;
      padding-bottom: 15px;
      color: #666;

      .image {
        width: 100%;
        height: 100%;

      }

      .user-images {
        padding-top: 20px;
      }
    }

    .list-inline {
      padding-left: 0;
      margin-left: -5px;
      list-style: none;
      li {
        display: inline-block;
        padding-right: 5px;
        padding-left: 5px;
        font-size: 13px;
      }
      .link-black {
        color: #999;
        font-size: 13px;
        margin-left: 5px;
        cursor: pointer;
        &:hover,
        &:focus {
          color: #409EFF;
        }
      }
      .el-button{
        padding: 0 !important;
      }
    }
    .message{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span{
        color: #97a8be;
      }
    }

  }

  .box-center {
    margin: 0 auto;
    display: table;
  }

  .text-muted {
    color: #777;
  }
</style>

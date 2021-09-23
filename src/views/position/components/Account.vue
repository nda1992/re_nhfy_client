<template>
  <div class="user-account">
    <div v-if="SendMessageList.length!==0">
      <div v-for="(msg,index) in SendMessageList" :key="msg.id" class="post">
        <div class="user-block">
          <img class="img-circle" :src="avatar">
          <span class="username text-muted">你回复的人是: {{ msg.username }} </span>
          <span class="description">回复时间 {{ msg.format_send_date }}</span>
        </div>
        <el-popover
          placement="top-start"
          title="你回复的消息是"
          width="400"
          trigger="hover"
          :content="msg.replycontent"
        >
          <p slot="reference" style="color: #1f2d3d">{{ msg.content }}</p>
        </el-popover>
        <ul class="list-inline">
          <li>
            <el-popconfirm title="确定删除该条消息吗?" @onConfirm="removeSendMsg(msg.id)">
              <el-button slot="reference" type="text">
                <span class="link-black text-sm">删除</span>
              </el-button>
            </el-popconfirm>
            <span v-if="msg.is_read" style="margin-left: 5px;color: #97a8be">已读</span>
            <span v-else style="margin-left: 5px;color: #4455aa">未读</span>
          </li>
        </ul>
      </div>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getAllSendMsg()" />
    </div>
    <div v-else class="nomessage">
      <img src="../../../icons/imgs/NoMessage.png" height="380" width="350">
      <span>你还没有发送消息哦~</span>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  props: {
    avatar: {
      type: String,
      default: () => {
        return ''
      }
    },
    SendMessageList: {
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
    content: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  methods: {
    getAllSendMsg() {
      this.$emit('getAllSendMsg')
    },
    removeSendMsg(id) {
      this.$emit('removeSendMsg', id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-account {
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
        margin-left: 5px;
        cursor: pointer;
        color: #999;
        &:hover,
        &:focus {
          color: #409EFF;
        }
      }
    }
    .el-button{
      padding: 0 !important;
    }
  .nomessage{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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

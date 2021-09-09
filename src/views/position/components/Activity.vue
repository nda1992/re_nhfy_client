<template>
  <div class="user-activity">
    <div v-if="ReceiveMessageList.length!==0">
      <div class="post" v-for="(msg,index) in ReceiveMessageList" :key="msg.id">
        <div class="user-block">
          <img class="img-circle" :src="'https://wpimg.wallstcn.com/57ed425a-c71e-4201-9428-68760c0537c4.jpg'+avatarPrefix">
          <span class="username text-muted">管理员ID {{ msg.send_id }} </span>
          <span class="description">发送时间 {{ msg.format_send_date }}</span>
        </div>
        <p>{{ msg.content }}</p>
        <ul class="list-inline">
          <li>
            <span class="link-black text-sm">回复</span>
            <span class="link-black text-sm">删除</span>
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
    }
  },
  data() {
    return {
      avatarPrefix
    }
  },
  methods: {
    getAllReceiveMsgList() {
      this.$emit('getAllReceiveMsgList')
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
        margin-left: 5px;
        cursor: pointer;
        &:hover,
        &:focus {
          color: #999;
        }
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

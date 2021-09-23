<template>
  <!--岗位收藏和投递列表-->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="font-size: 16px;color: #000">{{ title }}（共{{ showList.length }}个）</span>
    </div>
    <el-table style="width: 100%" :data="showList" :row-class-name="rowClassName">
      <!--可展开行-->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="岗位名称">
              <span>{{ props.row.positionName }}</span>
            </el-form-item>
            <el-form-item label="发布时间">
              <span>{{ props.row.createdTime }}</span>
            </el-form-item>
            <el-form-item label="招聘科室">
              <span>{{ props.row.deptName }}</span>
            </el-form-item>
            <el-form-item label="岗位类型">
              <span>{{ props.row.type }}</span>
            </el-form-item>
            <el-form-item label="学历要求">
              <span>{{ props.row.degree }}</span>
            </el-form-item>
            <el-form-item label="需求人数">
              <span>{{ props.row.requireNum }}</span>
            </el-form-item>
            <el-form-item label="年龄要求">
              <span>{{ props.row.age }}</span>
            </el-form-item>
            <el-form-item label="英语要求">
              <span>{{ props.row.english }}</span>
            </el-form-item>
            <el-form-item label="专业要求">
              <span>{{ props.row.professional }}</span>
            </el-form-item>
            <el-form-item label="工作地点">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="其他描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="序号" align="center" prop="xh" width="50" />
      <el-table-column
        align="center"
        prop="positionName"
        label="岗位名称"
        width="380"
      >
        <template slot-scope="{row}">
          <span>{{ row.positionName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="createdTime"
        width="280"
        :label="statusflag===1?'投递时间':'收藏时间'"
      >
        <template slot-scope="{row}">
          <i class="el-icon-time" style="margin-right: 3px;" />
          <span>{{ row.createdTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="statusflag===1"
        align="center"
        prop="approveDate"
        width="280"
        label="审核通过时间"
      >
        <template slot-scope="{row}">
          <i class="el-icon-time" style="margin-right: 3px;" />
          <span v-if="row.approveDate!=='Invalid date'">{{ row.approveDate }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="statusflag===2"
        align="center"
        prop="currentStatus"
        width="280"
        :label="statusTitle"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.currentStatus | statusFilter">
            {{ row.currentStatus }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        v-if="statusflag===1"
        align="center"
        prop="Handlestatus"
        :label="statusTitle"
        width="280"
      >
        <template slot-scope="{row}">
          <el-tag v-if="row.status==='未审核'||row.status==='审核未通过'||row.status==='已确认'" :type="row.status | HandlestatusFilter">
            {{ row.status }}
          </el-tag>
          <el-popconfirm
            v-else
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="是否确认参加考试?"
            @onConfirm="handleConfirm(row)"
          >
            <el-button slot="reference" type="primary" size="mini">{{ row.status }}</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{row,$index}">
          <el-button v-if="statusflag===2&&row.isCollected" type="warning" size="mini" icon="el-icon-star-on" @click="HandleCollect(row.isCollected,row.id)">取消收藏</el-button>
          <el-button v-if="statusflag===2&&row.isCollected" type="primary" size="mini" :disabled="row.isPosted===1" icon="el-icon-s-promotion" @click="HandleCollectpost(row.id)">投递简历</el-button>
          <el-button v-if="statusflag===1" type="danger" size="mini" :disabled="row.status==='已确认'" @click="HandleCancelPost(row)">取消投递</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" v-if="statusflag===1" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPostedPosition()" />
    <pagination v-show="total>0" v-if="statusflag===2" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPostedPosition()" />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'UserinfoCard',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '在招': 'success',
        '已结束': 'danger'
      }
      return statusMap[status]
    },
    HandlestatusFilter(status) {
      const statusMap = {
        '未审核': 'info',
        '已确认': 'success',
        '审核未通过': 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    title: {
      type: String,
      default: () => {
        return '已收藏的岗位'
      }
    },
    showList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 简历状态或在招状态
    statusTitle: {
      type: String,
      default: () => {
        return ''
      }
    },
    // 1=投递列表，2=收藏列表
    statusflag: {
      type: Number,
      default: () => {
        return 1
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
  methods: {
    rowClassName({ row, rowIndex }) {
      row.xh = rowIndex + 1
    },
    HandleCollect(isCollected, id) {
      this.$emit('HandleCollect', { isCollected: isCollected, positionId: id })
    },
    // 收藏列表投递岗位
    HandleCollectpost(id) {
      this.$emit('HandleCollectpost', { pid: id })
    },
    HandleDelete() {
      this.$emit('delete')
    },
    // 取消投递
    HandleCancelPost(row) {
      this.$emit('HandleCancelPost', row.id)
    },
    // 确认参加考试
    handleConfirm(row) {
      this.$emit('handleConfirm', row.id)
    },
    // 点击分页触发
    getPostedPosition() {
      this.$emit('getPostedPosition')
    }
  }
}
</script>

<style lang="scss"  scoped>
  .box-card{
    margin: 0 !important;
    padding: 0 !important;
  }
  .demo-table-expand{
    color: #99a9bf;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .el-form-item{
      margin-bottom: 0;
    }
  }
</style>

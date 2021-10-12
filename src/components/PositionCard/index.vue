<template>
  <div class="container">
    <el-card>
      <div slot="header" class="clearfix">
        <span style="font-size: 16px;font-weight: bold">{{
          positionInfo.positionName
        }}</span>
        <el-tooltip
          class="item"
          effect="dark"
          content="收藏岗位"
          placement="bottom"
        >
          <el-button
            v-if="showBtns"
            style="float: right; padding: 0;border: 0;margin-right: 15px;"
            type="text"
            @click="gotoCollect"
          >
            <i
              :class="
                positionInfo.isCollected === false
                  ? 'el-icon-star-off'
                  : 'el-icon-star-on'
              "
              >{{ positionInfo.isCollected === false ? '收藏' : '已收藏' }}</i
            >
          </el-button>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="投递简历"
          placement="bottom"
          style="margin-right: 20px"
        >
          <el-button
            v-if="showBtns"
            style="float: right; padding: 0;"
            type="text"
            :disabled="positionInfo.isPosted"
            @click="gotoPosition"
          >
            <i class="el-icon-s-promotion">
              {{ positionInfo.isPosted === false ? '投递简历' : '已投递' }}
            </i>
          </el-button>
        </el-tooltip>
      </div>
      <div class="card-main">
        <div class="line1">
          <el-row :gutter="30">
            <el-col :span="5">
              <span>学历要求：{{ positionInfo.degree }}</span>
            </el-col>
            <el-col :span="7">
              <span>专业要求：{{ positionInfo.professional }}</span>
            </el-col>
            <el-col :span="4">
              <span>英语要求：{{ positionInfo.english }}</span>
            </el-col>
            <el-col :span="4">
              <span>年龄要求：{{ positionInfo.age }}</span>
            </el-col>
            <el-col :span="4">
              <span>岗位类型：{{ positionInfo.type }}</span>
            </el-col>
          </el-row>
        </div>
        <div class="line2">
          <el-row :gutter="30">
            <el-col :span="6">
              <span>招聘科室：{{ positionInfo.deptName }}</span>
            </el-col>
            <el-col :span="3">
              <span>需求人数：{{ positionInfo.requireNum }}</span>
            </el-col>
            <el-col :span="6">
              <span>工作地点：{{ positionInfo.address }}</span>
            </el-col>
            <el-col :span="4">
              <span>发布时间：{{ positionInfo.simpleDate }}</span>
            </el-col>
            <el-col :span="5">
              <span>联系电话：{{ positionInfo.contactPhone }}</span>
            </el-col>
          </el-row>
        </div>
        <div class="line3">
          <el-row>
            <el-col :span="24">
              <span>职位描述：{{ positionInfo.desc }}</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PositionCard',
  props: {
    positionInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    showBtns: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  methods: {
    // 简历投递
    gotoPosition() {
      this.$emit('gotoPosition')
    },
    // 岗位收藏
    gotoCollect() {
      this.$emit('gotoCollect')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-bottom: 10px;
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }
  .card-main {
    font-size: 12px;
    .line1,
    .line2 {
      margin-bottom: 18px;
      span {
        &:nth-child(n) {
          width: 100%;
          height: 25px;
          background: #ebeef5;
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover {
            cursor: pointer;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
    .line3 {
      color: #909399;
    }
  }
}
</style>

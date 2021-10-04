<template>
    <!--医生详细信息的dialog-->
    <div>
      <el-dialog :visible.sync="openVisible" title="医生个人详细信息">
        <div class="main">
          <div class="basic">
            <img :src="doctorItem.avatar" />
            <div class="info">
              <span>科室名称：{{ doctorItem.deptName }}</span>
              <span>医生姓名：{{ doctorItem.username }}</span>
              <span>医生学历：{{ doctorItem.education }}</span>
              <span>医生职称：{{ doctorItem.jobTitle }}</span>
              <el-tooltip class="item" effect="dark" content="前往163邮箱发送邮件" placement="bottom">
                <a href="https://mail.163.com/" target="_blank">医生邮箱：{{ doctorItem.email }}</a>
              </el-tooltip>
              <span>擅长专业：{{ doctorItem.professional }}</span>
            </div>
          </div>
          <div class="desc">
            <span style="font-weight:bold;">简历：</span>{{ doctorItem.desc }}
          </div>
        </div>
      </el-dialog>
    </div>
</template>
<script>
export default {
  props: {
    openVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    doctorItem: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 390px;
    .basic {
        display: flex;
        justify-content: start;
        img {
          border-radius: 6px;
          width: 195px;
          height: 220px;
          &:hover {
            cursor: pointer;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          }
        }
        .info {
          margin-left: 20px;
          font-size: 15px;
          color: #909399;
          height: 220px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
    }
    .desc {
      margin-top: 20px;
      line-height: 20px;
    }
  }
</style>
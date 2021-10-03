<template>
  <div class="main">
    <div class="tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="医院动态" name="first">
          <HospitalTrend />
        </el-tab-pane>
        <el-tab-pane label="院务公开" name="second">
          <HospitalPublic />
        </el-tab-pane>
        <el-tab-pane label="政策法规" name="third">
          <PolicyLaw />
        </el-tab-pane>
        <el-tab-pane label="采购信息" name="fourth">
          <PurchaseMessage />
        </el-tab-pane>
        <el-tab-pane label="通知公告" name="fiveth">
          <NoticeAnnouncement />
        </el-tab-pane>
        <el-tab-pane label="人事招聘" name="sixth">
          <Recruit />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import HospitalTrend from './Center/HospitalTrend'
import HospitalPublic from './Center/HospitalPublic'
import PolicyLaw from './Center/PolicyLaw'
import PurchaseMessage from './Center/PurchaseMessage'
import NoticeAnnouncement from './Center/NoticeAnnouncement'
import Recruit from './Center/Recruit'
  export default {
    components: {
      HospitalTrend,
      HospitalPublic,
      PolicyLaw,
      PurchaseMessage,
      NoticeAnnouncement,
      Recruit
    },
    name: 'Center',
    data() {
      return {
        activeName: 'first'
      }
    }
  }
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  margin: 0 100px;
}
</style>

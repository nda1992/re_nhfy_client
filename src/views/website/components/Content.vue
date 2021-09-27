<template>
  <div class="main">
    <div class="tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="就医指南" name="first">
          <HospitalGuide />
        </el-tab-pane>
        <el-tab-pane label="学科荟萃" name="second">
          <SubjectAssemble />
        </el-tab-pane>
        <el-tab-pane label="专家介绍" name="third">
          <ExpertDesc />
        </el-tab-pane>
      </el-tabs>
      <div class="right">
        <div class="title">南华大学附属第一医院欢迎您~</div>
        <dropdown-menu class="document-btn" :items="articleList" title="医院概况" />
      </div>
    </div>
  </div>
</template>

<script>
import HospitalGuide from './Content/HospitalGuide'
import SubjectAssemble from './Content/SubjectAssemble'
import ExpertDesc from './Content/ExpertDesc'
import DropdownMenu from '@/components/Share/DropdownMenu'
export default {
  name: 'Content',
  components: {
    HospitalGuide,
    SubjectAssemble,
    ExpertDesc,
    DropdownMenu
  },
  data() {
    return {
      activeName: 'first',
      articleList: [
        { title: '医院文化', href: 'https://juejin.im/post/59097cd7a22b9d0065fb61d2' },
        { title: '院情通报', href: 'https://juejin.im/post/591aa14f570c35006961acac' },
        { title: '科研教学', href: 'https://juejin.im/post/593121aa0ce4630057f70d35' },
        { title: '党建动态', href: 'https://juejin.im/post/593121aa0ce4630057f70d35' },
        { title: '历史长廊', href: 'https://juejin.im/post/593121aa0ce4630057f70d35' }
      ]
    }
  }
}
</script>
<style scoped>
  /deep/.el-tabs__item {
    font-size: 18px !important;
  }
  /deep/.el-tabs{
    width: 810px;
  }
</style>
<style lang="scss" scoped>
  .main{
    margin: 0 100px;
    position: relative;
    .tabs{
      display: flex;
      justify-content: center;
      position: relative;
      left: -200px;
      .right {
        .title{
          position: absolute;
          top: 5px;
          right: -100px;
          margin-left: 15px;
          font-size: 16px;
        }
        .document-btn {
          position: absolute;
          right: -130px;
          top: 25px;
          flex-shrink: 0;
          display: block;
          cursor: pointer;
          background: #3b7960;
          color: white;
          height: 60px;
          padding: 0 16px;
          margin: 16px;
          line-height: 60px;
          font-size: 20px;
          text-align: center;
        }
      }
    }
  }
</style>

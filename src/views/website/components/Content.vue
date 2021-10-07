<template>
  <div class="main">
    <div class="tabs">
      <el-row :gutter="10">
        <el-col :span="19" :md="19">
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
        </el-col>
        <el-col :span="5" :md="5">
          <div class="right">
            <div class="title">南华大学附属第一医院欢迎您~</div>
            <dropdown-menu
              @gotoTargetPage="gotoTargetPage"
              class="document-btn"
              :items="articleList"
              title="医院概况"
            />
          </div>
        </el-col>
      </el-row>
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
        {
          title: '医院文化',
          href: '/yygk/yywh'
        },
        {
          title: '院情通报',
          href: '/yyxw/yqtg'
        },
        {
          title: '科研教学',
          href: '/kyjx/kydt'
        },
        {
          title: '党建动态',
          href: '/dqgz/djdt'
        },
        {
          title: '历史长廊',
          href: '/yygk/lscl'
        }
      ]
    }
  },
  methods: {
    gotoTargetPage(item) {
      this.$router.push({
        path: `content/${item.href}`,
        query: { category: item.title }
      })
    }
  }
}
</script>
<style scoped>
/deep/.el-tabs__item {
  font-size: 18px !important;
}
/deep/.el-tabs {
  width: 870px;
}
#pane-first {
  width: 95%;
}
#pane-second {
  width: 100%;
  display: flex;
  justify-content: center;
}
#pane-third {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 520px;
}
</style>
<style lang="scss" scoped>
.main {
  margin: 0 100px;
  position: relative;
  .tabs {
    display: flex;
    justify-content: center;
    .right {
      .title {
        margin-left: 14px;
        font-size: 16px;
      }
      .document-btn {
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

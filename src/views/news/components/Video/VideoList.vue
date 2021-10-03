<template>
  <div class="redio-main">
    <div>
      <el-table
        :data="videoList"
        border
        stripe
        fit
        highlight-current-row
        :row-class-name="rowClassName"
        :default-sort="{prop: 'createdDate'}"
        style="width: 100%"
      >
        <el-table-column label="序号" align="center" prop="xh" width="50" />
        <el-table-column label="上传者工号" prop="userCode" align="center" width="120">
          <template slot-scope="{row}">
            <span>{{ row.userCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="部门" prop="deptName" align="center" width="120">
          <template slot-scope="{row}">
            <span>{{ row.deptName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上传时间" sortable prop="createdDate" align="center" width="200">
          <template slot-scope="{row}">
            <i class="el-icon-time" style="margin-right: 3px" />
            <span>{{ row.createdDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="视频封面" prop="url" align="center" min-width="50px">
          <template slot-scope="{row}">
            <el-tooltip class="item" effect="dark" content="点击观看视频" placement="bottom">
              <img
              v-show='row.cover'
              :src="row.cover"
              @click="openVideoPlayerVisible(row)"
              id='scanVideo' />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="视频标题" prop="title" align="center" width="300">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否展示视频" prop="Switch" align="center" width="120">
          <template slot-scope="{row}">
            <el-switch
              v-model="row.Switch"
              :disabled="num>5&&row.Switch!==true"
              active-color="#13ce66"
              inactive-color="#ff4949"
              inactive-text="否"
              active-text="是"
              @change="handleSetVideoStatus(row)"
            />
          </template>
        </el-table-column>
        <!--操作按钮-->
        <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-if="row.status!='deleted'" size="mini" type="danger" icon="el-icon-delete" @click="handleDeleteVideo(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoList',
  props: {
    videoList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 展示视频的数量，最多4个
    num: {
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
    handleDeleteVideo(row) {
      this.$emit('handleDeleteVideo', row)
    },
    handleSetVideoStatus(row) {
      this.$emit('handleSetVideoStatus', row)
    },
    // 打开视频播放器
    openVideoPlayerVisible(row) {
      this.$emit('openVideoPlayerVisible', row)
    }
  }
}
</script>
<style  scoped>
  #scanVideo {
    height: 60px;
    width: 90px;
    cursor: pointer;
    border-radius: 6px;
  }
  #scanVideo:hover{
    color:blue; 
  }
</style>
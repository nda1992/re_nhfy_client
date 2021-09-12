<template>
  <div class="imglist-main">
    <div>
      <el-table :data="imgList"
                border
                stripe
                fit
                highlight-current-row
                :row-class-name="rowClassName"
                :default-sort = "{prop: 'createdDate'}"
                style="width: 100%">
        <el-table-column label="序号" align="center" prop="xh" width="50"></el-table-column>
        <el-table-column label="上传者工号" prop="userCode" align="center" width="120">
          <template slot-scope="{row}">
            <span>{{ row.userCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上传时间" sortable prop="createdDate" align="center" width="200">
          <template slot-scope="{row}">
            <i class="el-icon-time" style="margin-right: 3px"></i>
            <span>{{ row.createdDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="略缩图" prop="url" align="center" min-width="80px">
          <template slot-scope="{row}">
            <el-tooltip class="item" effect="dark" content="点击查看大图" placement="bottom">
              <el-image
                style="width: 100px; height: 50px"
                :src="row.url"
                :preview-src-list="srcList">
              </el-image>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="是否为轮播图" prop="Switch" align="center" width="120">
          <template slot-scope="{row}">
            <el-switch
              @change="handleSetStatus(row)"
              :disabled="num>5&&row.Switch!==true"
              v-model="row.Switch"
              active-color="#13ce66"
              inactive-color="#ff4949"
              inactive-text="否"
              active-text="是"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="下载图片" prop="url" align="center" width="200">
          <template slot-scope="{row}">
            <i class="el-icon-download" style="margin-right: 3px"></i>
            <span><a :href="row.url" style="color: #409EFF">下载图片</a></span>
          </template>
        </el-table-column>
        <!--操作按钮-->
        <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'ImgList',
  components: { Pagination },
  props: {
    imgList: {
      type: Array,
      default: () => {
        return []
      }
    },
    srcList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 轮播图的数量，最多限制为7张
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
    handleDelete(row) {
      this.$emit('handleDelete',row)
    },
    handleSetStatus(row) {
      this.$emit('handleSetStatus', row)
    }
  }
}
</script>

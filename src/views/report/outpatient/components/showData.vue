<template>
  <div class="table-container">
    <el-table
      :data="data"
      :key="tableKey"
      v-loading="listLoading"
      border
      stripe
      fix
      highlight-current-row
      :height="data.length===0?'auto':'600'">
      <el-table-column label="排名" prop="序号" align="center" min-width="3px">
        <template slot-scope="{row}">
          <span>{{ row.序号 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="colName" :prop="colName" align="center" min-width="7px" v-if="colName==='科室名称'">
        <template slot-scope="{row}">
          <span>{{ row.科室名称 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="colName" :prop="colName" align="center" min-width="7px" v-if="colName==='开单医生'">
        <template slot-scope="{row}">
          <span>{{ row.开单医生 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总费用" prop="总费用" align="center" min-width="7px">
        <template slot-scope="{row}">
          <span>{{ row.总费用 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总人次" prop="总人次" align="center" min-width="7px">
        <template slot-scope="{row}">
          <span>{{ row.总人次 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="人均费用" prop="人均费用" align="center" min-width="7px">
        <template slot-scope="{row}">
          <span>{{ row.人均费用 }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'showData',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableKey: {
      type: Number,
      default: () => {
        return 0
      }
    },
    listLoading: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    colName: {
      type: String,
      default: () => {
        return '科室名称'
      }
    }
  }
}
</script>

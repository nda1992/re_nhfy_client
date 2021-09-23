<template>
  <div class="app-container">
    <div class="title">
      <el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" clearable @change="pickerDate" />
      <el-tooltip effect="dark" content="按回车键搜索" placement="bottom">
        <el-input v-model="deptname" placeholder="请输入科室名称搜索" style="width: 200px" clearable :disabled="showItems.length===0?true:false" @keyup.enter.native="handleFilter" />
      </el-tooltip>
      <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
      <el-button icon="el-icon-download" type="success" @click="handleDownload">导出表格</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeptMaterialSorted'

}
</script>

<style scoped>

</style>

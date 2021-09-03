<template>
  <div class="app-container">
    <div class="title">
      <el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" clearable @change="pickerDate"></el-date-picker>
      <el-tooltip effect="dark" content="按回车键搜索" placement="bottom">
        <el-input placeholder="请输入科室名称搜索" style="width: 200px" clearable v-model="deptname" @keyup.enter.native="handleFilter" :disabled="showItems.length===0?true:false"></el-input>
      </el-tooltip>
      <el-button @click="search" icon="el-icon-search" type="primary">查询</el-button>
      <el-button @click="handleDownload" icon="el-icon-download" type="success">导出表格</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'deptMaterialSorted',

}
</script>

<style scoped>

</style>

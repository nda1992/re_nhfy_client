<template>
<!-- 报表定制首页 -->
  <div class="app-container">
    <div class="title">
      <span style="font-size: 20px;font-weight: bold;color: #393f4c">日常需要报送的其他表格</span>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handlerCreate">添加表格</el-button>
    </div>
    <el-divider></el-divider>
    <div class="list-unstyled">
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="tableTitleList"
        stripe
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <!--自增id-->
        <el-table-column label="ID" prop="id" align="center" min-width="5px">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <!--表格标题-->
        <el-table-column label="表格标题" prop="title" align="center" min-width="50px">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <!--创建时间-->
        <el-table-column label="创建时间" prop="createdDate" min-width="10px" align="center">
          <template slot-scope="{row}">
            <i class="el-icon-time" style="margin-right: 4px"></i>
            <span>{{ row.createdDate }}</span>
          </template>
        </el-table-column>
        <!--备注-->
        <el-table-column label="备注" prop="createdDate" min-width="60px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.desc }}</span>
          </template>
        </el-table-column>
        <!--操作按钮-->
        <el-table-column label="操作" align="center" min-width="20px" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)" icon="el-icon-edit">编辑</el-button>
            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
<!--    添加表格对话框-->
    <el-dialog :visible.sync="dialogCreateVisible" title="定制表格名称">
      <el-form ref="dataForm" :model="tableTitle" label-position="left" label-width="100px" style="width: 500px; margin-left:50px;">
        <el-input v-model="tableTitle.title" clearable type="text" placeholder="请输入表格名称" style="margin-bottom: 20px;"></el-input>
        <el-input v-model="tableTitle.desc" type="textarea" placeholder="请输入备注"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { createTableTitle, getTableTitleList, deleteTableTitle, updateTableTitle } from '@/api/reportmake/reportmake'
export default {
  data() {
    return {
      dialogStatus: '',
      listLoading: false,
      tableKey: 0,
      dialogCreateVisible: false,
      tableTitle: { id: '', title: '', desc: '' },
      tableTitleList: []
    }
  },
  mounted() {
    this.getTableTitleList()
  },
  methods: {
    // 获取表格标题列表
    getTableTitleList() {
      getTableTitleList(localStorage.getItem('role')).then((res) => {
        const { items } = res
        // this.$message.success(msg)
        this.tableTitleList = items
      })
    },
    // 重置表单
    resetTableTitle() {
      this.tableTitle = {
        id: undefined, title: '', desc: ''
      }
    },
    handlerCreate() {
      this.resetTableTitle()
      this.dialogStatus = 'create'
      this.dialogCreateVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      if (this.tableTitle === '') {
        this.$message.error('输入的内容不能为空')
        return
      }
      this.$confirm('是否提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning' }).then(() => {
        createTableTitle(this.tableTitle).then(() => {
          this.getTableTitleList()
          this.dialogCreateVisible = false
          this.$notify({
            title: 'Success',
            message: '提交成功，感谢您的反馈',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    handleUpdate(row) {
      this.tableTitle = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogCreateVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$confirm('是否更新?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const tempData = Object.assign({}, this.tableTitle)
            tempData.role = localStorage.getItem('role')
            updateTableTitle(tempData).then(() => {
              this.getTableTitleList()
              this.dialogCreateVisible = false
              this.$notify({
                title: 'Success',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const temp = { id: row.id, role: localStorage.getItem('role') }
        deleteTableTitle(temp).then(() => {
          this.getTableTitleList()
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container{
    .title{
      width: 400px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        list-style: none;
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>

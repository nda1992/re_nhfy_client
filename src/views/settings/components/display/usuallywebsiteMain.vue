<template>
  <div class="main">
    <div class="header">
      <el-button
        icon="el-icon-circle-plus-outline"
        type="success"
        @click="handleCreate"
        >添加</el-button
      >
    </div>
    <div>
      <el-table
        :row-class-name="rowClassName"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          align="center"
          prop="xh"
          width="50"
        ></el-table-column>
        <el-table-column
          label="发布者工号"
          prop="userCode"
          align="center"
          min-width="7px"
        >
          <template slot-scope="{ row }">
            <span>{{ row.userCode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="所属科室"
          prop="deptName"
          align="center"
          min-width="7px"
        >
          <template slot-scope="{ row }">
            <span>{{ row.deptName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="标题"
          prop="title"
          align="center"
          min-width="12px"
        >
          <template slot-scope="{ row }">
            <span class="link-type" @click="handleUpdate(row)">{{
              row.title
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="网站链接"
          prop="url"
          align="center"
          min-width="12px"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <a :href="row.url" target="_blank">{{ row.url }}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="图片"
          prop="img"
          align="center"
          min-width="10px"
        >
          <template slot-scope="{ row }">
            <img :src="row.img" style="width:50px;height:50px;" />
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime"
          align="center"
          min-width="12px"
        >
          <template slot-scope="{ row }">
            <i class="el-icon-time" style="margin-right:3px"></i>
            <span>{{ row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="当前状态"
          prop="status"
          align="center"
          min-width="7px"
        >
          <template slot-scope="{ row }">
            <el-tag :type="row.status | HandlestatusFilter">
              <span>{{ row.status }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <!--操作按钮-->
        <el-table-column
          label="操作"
          align="center"
          min-width="16px"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{ row, $index }">
            <el-button
              v-if="row.status === '正常'"
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="handleUpdate(row)"
              >编辑</el-button
            >
            <el-button
              v-if="row.status === '正常'"
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(row, $index)"
              >删除</el-button
            >
            <el-button
              v-if="row.status === '已删除'"
              size="mini"
              type="warning"
              icon="el-icon-delete"
              @click="handleRecover(row, $index)"
              >恢复</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getAllUsuallyWebsite"
      />
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item
          label="所属科室"
          class="postInfo-container-item"
          prop="deptName"
        >
          <el-select
            v-model="temp.deptName"
            :loading="select_loading"
            :remote-method="getRemoteDeptList"
            filterable
            default-first-option
            remote
            placeholder="请输入科室名称"
          >
            <el-option
              v-for="(item, index) in deptNameListOptions"
              :key="item + index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" clearable />
        </el-form-item>
        <el-form-item label="网站链接" prop="url">
          <el-input v-model="temp.url" clearable />
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <el-upload
            accept=".jpg,.png,.jpeg,.bmp"
            class="avatar-uploader"
            :action="upload_url"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import { searchDept } from "@/api/news/news";
import { StorageClass } from "@/utils/session";
import {
  getAllUsuallyWebsite,
  addUsuallyWebsite,
  updateUsuallyWebsite,
  deleteUsualleWebsiteById,
  recoverUsualleWebsiteById
} from "@/api/websitemanager/manager";
import { USUALLY_WEBSITE_IMG_UPLOAD } from "@/utils/urlConfig";
export default {
  components: {
    Pagination
  },
  filters: {
    HandlestatusFilter(status) {
      const statusMap = {
        正常: "success",
        已删除: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      total: 0,
      listQuery: {
        limit: 10,
        page: 1
      },
      list: null,
      temp: {
        userCode: StorageClass.getSession("userCode").userCode,
        deptName: "",
        title: "",
        url: "",
        img: ""
      },
      rules: {
        deptName: [
          { required: true, message: "请输入科室名称", trigger: "blur" }
        ],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        url: [{ required: true, message: "请输入网站链接", trigger: "blur" }],
        img: [{ required: true, message: "请上传图片", trigger: "blur" }]
      },
      // dialog
      dialogStatus: "",
      textMap: {
        update: "更新医生信息",
        create: "添加医生信息"
      },
      select_loading: false,
      deptNameListOptions: [],
      dialogFormVisible: false,
      upload_url: USUALLY_WEBSITE_IMG_UPLOAD,
      imageUrl: ""
    };
  },
  mounted() {
    this.getAllUsuallyWebsite();
  },
  methods: {
    rowClassName({ row, rowIndex }) {
      row.xh = rowIndex + 1;
    },
    // 查询全部常用网站
    getAllUsuallyWebsite() {
      const temp = Object.assign({}, this.listQuery, { website: "manager" });
      getAllUsuallyWebsite(temp).then(res => {
        const { items, total } = res;
        this.total = total;
        this.list = items;
      });
    },
    resetTemp() {
      this.temp = {
        userCode: StorageClass.getSession("userCode").userCode,
        deptName: "",
        title: "",
        url: "",
        img: ""
      };
    },

    handleCreate() {
      this.imageUrl = "";
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },

    // 添加常用网站
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$confirm("是否添加?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            addUsuallyWebsite(this.temp).then(res => {
              const { msg } = res;
              this.getAllUsuallyWebsite();
              this.dialogFormVisible = false;
              this.$notify({
                title: "Success",
                message: msg,
                type: "success",
                duration: 2000
              });
            });
          });
        }
      });
    },

    handleUpdate(row) {
      this.imageUrl = row.img;
      this.temp = Object.assign({}, row);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },

    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$confirm("是否更新?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            const tempData = Object.assign({}, this.temp);
            updateUsuallyWebsite(tempData).then(res => {
              const { msg } = res;
              this.getAllUsuallyWebsite();
              this.dialogFormVisible = false;
              this.$notify({
                title: "Success",
                message: msg,
                type: "success",
                duration: 2000
              });
            });
          });
        }
      });
    },

    handleDelete(row, index) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const temp = { id: row.id };
        deleteUsualleWebsiteById(temp).then(() => {
          this.getAllUsuallyWebsite();
          this.$notify({
            title: "Success",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
        });
      });
    },

    handleRecover(row) {
      this.$confirm("是否恢复医生信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const temp = { id: row.id };
        recoverUsualleWebsiteById(temp).then(() => {
          this.getAllUsuallyWebsite();
          this.$notify({
            title: "Success",
            message: "恢复成功",
            type: "success",
            duration: 2000
          });
        });
      });
    },

    beforeAvatarUpload(file) {},
    handleAvatarSuccess(file) {
      const { url, msg } = file;
      this.$message.success(msg);
      this.temp.img = url;
      this.imageUrl = url;
    },

    // 远程搜索部门
    getRemoteDeptList(query) {
      this.select_loading = true;
      searchDept(query).then(response => {
        const { items } = response;
        if (!items) return;
        this.deptNameListOptions = items.map(v => v.name);
      });
      this.select_loading = false;
    }
  }
};
</script>
<style scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100px;
  height: 100px;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
<style lang="scss" scoped>
.main {
  .header {
    margin-bottom: 10px;
  }
}
</style>

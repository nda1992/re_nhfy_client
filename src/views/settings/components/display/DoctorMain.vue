<template>
  <!--医生信息管理主页-->
  <div class="main">
    <div class="header">
      <el-tooltip class="item" effect="dark" content="回车键搜索" placement="bottom">
        <el-input
          prefix-icon="el-icon-search"
          v-model="searchVal"
          :placeholder="'按' + searchType + '搜索'"
          style="width: 200px"
          class="filter-item"
          clearable
          @keyup.enter.native="handleFilter(searchType)"
        />
      </el-tooltip>

      <el-select
        v-model="searchType"
        placeholder="请选择搜索类型"
        style="width: 150px"
        class="filter-item"
      >
        <el-option v-for="item in typeItems" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="success"
        icon="el-icon-circle-plus-outline"
        style="margin-left: 0"
        @click="handleCreate"
        >新增医生</el-button
      >
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        style="margin-left: 0"
        @click="handleDownload"
        >导出表格</el-button
      >
    </div>
    <div>
      <el-table
        v-loading="listLoading"
        :row-class-name="rowClassName"
        :data="searchList"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <!--可展开行-->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="医生工号">
                <span>{{ props.row.userCode }}</span>
              </el-form-item>
              <el-form-item label="医生姓名">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="医生年龄">
                <span>{{ props.row.age }}</span>
              </el-form-item>
              <el-form-item label="医生职称">
                <span>{{ props.row.jobTitle }}</span>
              </el-form-item>
              <el-form-item label="所属科室">
                <span>{{ props.row.deptName }}</span>
              </el-form-item>
              <el-form-item label="医生学历">
                <span>{{ props.row.education }}</span>
              </el-form-item>
              <el-form-item label="毕业学校">
                <span>{{ props.row.school }}</span>
              </el-form-item>
              <el-form-item label="专业名称">
                <span>{{ props.row.professional }}</span>
              </el-form-item>
              <el-form-item label="科室大类">
                <span>{{ props.row.topDept }}</span>
              </el-form-item>
              <el-form-item label="医生手机">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="医生邮箱">
                <span>{{ props.row.email }}</span>
              </el-form-item>
              <el-form-item label="医生级别">
                <span>{{ props.row.grade }}</span>
              </el-form-item>
              <el-form-item label="当前状态">
                <span>{{ props.row.currentStatus }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="序号"
          align="center"
          prop="xh"
          width="50"
        ></el-table-column>
        <el-table-column label="医生姓名" prop="username" align="center" min-width="7px">
          <template slot-scope="{ row }">
            <span class="link-type" @click="handleUpdate(row)">{{ row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="医生照片" prop="avatar" align="center" min-width="10px">
          <template slot-scope="{ row }">
            <el-tooltip
              class="item"
              effect="dark"
              content="点击查看大图"
              placement="bottom"
            >
              <el-image
                id="doctor-avatar"
                :src="row.avatar"
                style="width: 90px; height: 50px; border-radius: 5px"
                :preview-src-list="srcList"
              />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="当前状态"
          prop="currentStatus"
          align="center"
          min-width="7px"
        >
          <template slot-scope="{ row }">
            <el-tag :type="row.currentStatus | statusFilter">
              <span>{{ row.currentStatus }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="所属科室" prop="deptName" align="center" min-width="9px">
          <template slot-scope="{ row }">
            <span>{{ row.deptName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="职称" prop="jobTitle" align="center" min-width="9px">
          <template slot-scope="{ row }">
            <span>{{ row.jobTitle }}</span>
          </template>
        </el-table-column>
        <el-table-column label="年龄" prop="age" align="center" min-width="5px">
          <template slot-scope="{ row }">
            <span>{{ row.age }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学历" prop="education" align="center" min-width="7px">
          <template slot-scope="{ row }">
            <span>{{ row.education }}</span>
          </template>
        </el-table-column>
        <el-table-column label="毕业学校" prop="school" align="center" min-width="9px">
          <template slot-scope="{ row }">
            <span>{{ row.school }}</span>
          </template>
        </el-table-column>
        <el-table-column label="专业" prop="school" align="center" min-width="9px">
          <template slot-scope="{ row }">
            <span>{{ row.professional }}</span>
          </template>
        </el-table-column>
        <el-table-column label="信息状态" prop="status" align="center" min-width="7px">
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
          min-width="20px"
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
        @pagination="getdoctorList"
      />
    </div>
    <!--对话框dialog-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="医生工号" prop="userCode">
          <el-input v-model="temp.userCode" clearable />
        </el-form-item>
        <el-form-item label="医生姓名" prop="username">
          <el-input v-model="temp.username" clearable />
        </el-form-item>
        <el-form-item label="医生年龄" prop="age">
          <el-input v-model="temp.age" clearable />
        </el-form-item>
        <el-form-item label="医生职称" prop="jobTitle">
          <el-input v-model="temp.jobTitle" clearable />
        </el-form-item>
        <el-form-item label="毕业学校" prop="school">
          <el-input v-model="temp.school" clearable />
        </el-form-item>
        <el-form-item label="专业名称" prop="professional">
          <el-input v-model="temp.professional" clearable />
        </el-form-item>
        <el-form-item label="医生学历" prop="education">
          <el-select v-model="temp.education" class="filter-item" placeholder="请选择">
            <el-option
              v-for="(item, index) in educationOptions"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属科室" class="postInfo-container-item" prop="deptName">
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
        <el-form-item label="科室大类" prop="topDept">
          <el-select v-model="temp.topDept" class="filter-item" placeholder="请选择">
            <el-option
              v-for="(item, index) in topDeptOptions"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="医生手机" prop="phone">
          <el-input v-model="temp.phone" clearable />
        </el-form-item>
        <el-form-item label="医生邮箱" prop="email">
          <el-input v-model="temp.email" clearable />
        </el-form-item>
        <el-form-item label="医生照片" prop="avatar">
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
        <el-form-item label="医生等级" prop="grade">
          <el-select v-model="temp.grade" class="filter-item" placeholder="请选择">
            <el-option
              v-for="(item, index) in gradeOptions"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="在职状态" prop="currentStatus">
          <el-select
            v-model="temp.currentStatus"
            class="filter-item"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in currentStatusOptions"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="医生简介" prop="desc">
          <el-input v-model="temp.desc" type="textarea" placeholder="请输入医生简介" />
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
import waves from "@/directive/waves"
import Pagination from "@/components/Pagination"
import {
  getAllDoctorInfo,
  addDoctorInfo,
  updateDoctorInfo,
  deleteDoctorInfo,
  recoverDoctorInfo,
} from "@/api/websitemanager/manager"
import { searchDept } from "@/api/news/news"
import { DOCTOR_AVATAR_UPLOAD } from "@/utils/urlConfig"
export default {
  components: {
    Pagination,
  },
  directives: { waves },
  name: "DoctorMain",
  filters: {
    statusFilter(status) {
      const statusMap = {
        在职: "success",
        离职: "danger",
        退休: "warning",
        进修: "primary",
        升学: "",
      };
      return statusMap[status];
    },
    HandlestatusFilter(status) {
      const statusMap = {
        正常: "success",
        已删除: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    const checkPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号不能为空"));
      } else if (!/^1\d{10}$/.test(value)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    return {
      total: 0,
      listQuery: {
        limit: 10,
        page: 1,
      },
      tableKey: 0,
      searchVal: "",
      searchType: "医生姓名",
      typeItems: ["医生姓名", "科室名称", "职称", "学历"],
      downloadLoading: false,
      list: null,
      searchList: null,
      // 基本信息
      listLoading: false,
      temp: {
        userCode: "",
        username: "",
        age: undefined,
        jobTitle: "",
        grade: "",
        education: "",
        school: "",
        deptName: "",
        topDept: "",
        phone: "",
        email: "",
        avatar: "",
        desc: "",
        currentStatus: "",
        professional: "",
      },
      rules: {
        userCode: [{ required: true, message: "请输入医生工号", trigger: "blur" }],
        username: [{ required: true, message: "请输入医生姓名", trigger: "blur" }],
        age: [{ required: true, message: "请输入医生年龄", trigger: "blur" }],
        jobTitle: [{ required: true, message: "请输入医生职称", trigger: "blur" }],
        grade: [{ required: true, message: "请输入医生级别", trigger: "blur" }],
        education: [{ required: true, message: "请输入医生学历", trigger: "blur" }],
        school: [{ required: true, message: "请输入医生毕业学校", trigger: "blur" }],
        deptName: [{ required: true, message: "请输入医生所属科室", trigger: "blur" }],
        topDept: [{ required: true, message: "请输入医生所属一级科室", trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "change" }],
        email: [
          { required: true, message: "请输入医生邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] },
        ],
        avatar: [{ required: true, message: "请上传医生头像", trigger: "blur" }],
        desc: [{ required: true, message: "请输入医生简介", trigger: "blur" }],
        currentStatus: [
          { required: true, message: "请输入医生在职状态", trigger: "blur" },
        ],
        professional: [{ required: true, message: "请输入专业名称", trigger: "blur" }],
      },
      srcList: [],
      // 对话框
      // 对话框title
      dialogStatus: "",
      textMap: {
        update: "更新医生信息",
        create: "添加医生信息",
      },
      dialogFormVisible: false,
      educationOptions: ["大专", "本科", "硕士", "博士"],
      select_loading: false,
      deptNameListOptions: [],
      topDeptOptions: ["大内科", "大外科", "肿瘤预防中心", "医技系统", "其他科室"],
      gradeOptions: ["初级", "中级", "高级", "专家"],
      currentStatusOptions: ["在职", "离职", "升学", "进修", "退休"],
      upload_url: DOCTOR_AVATAR_UPLOAD,
      imageUrl: "",
    };
  },
  mounted() {
    this.getdoctorList();
  },
  methods: {
    rowClassName({ row, rowIndex }) {
      row.xh = rowIndex + 1;
    },
    // 按关键字进行搜索
    handleFilter(type) {
      if (type === "医生姓名") {
        this.searchList = this.list.filter((item) => {
          return item.username.match(this.searchVal);
        });
      } else if (type === "科室名称") {
        this.searchList = this.list.filter((item) => {
          return item.deptName.match(this.searchVal);
        });
      } else if (type === "职称") {
        this.searchList = this.list.filter((item) => {
          return item.jobTitle.match(this.searchVal);
        });
      } else if (type === "学历") {
        this.searchList = this.list.filter((item) => {
          return item.education.match(this.searchVal);
        });
      }
    },
    resetTemp() {
      this.temp = {
        userCode: "",
        username: "",
        age: undefined,
        jobTitle: "",
        grade: "",
        education: "",
        school: "",
        deptName: "",
        topDept: "",
        phone: "",
        email: "",
        avatar: "",
        desc: "",
        currentStatus: "",
        professional: "",
      };
    },
    // 新增医生信息
    handleCreate() {
      this.imageUrl = "";
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },

    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.$confirm("是否添加?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            addDoctorInfo(this.temp).then((res) => {
              const { msg } = res;
              this.getdoctorList();
              this.dialogFormVisible = false;
              this.$notify({
                title: "Success",
                message: msg,
                type: "success",
                duration: 2000,
              });
            });
          });
        }
      });
    },

    handleUpdate(row) {
      this.imageUrl = row.avatar;
      this.temp = Object.assign({}, row);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },

    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.$confirm("是否更新?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            const tempData = Object.assign({}, this.temp);
            updateDoctorInfo(tempData).then((res) => {
              const { msg } = res;
              this.getdoctorList();
              this.dialogFormVisible = false;
              this.$notify({
                title: "Success",
                message: msg,
                type: "success",
                duration: 2000,
              });
            });
          });
        }
      });
    },

    // 删除医生
    handleDelete(row, index) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const temp = { id: row.id };
        deleteDoctorInfo(temp).then(() => {
          this.getdoctorList();
          this.$notify({
            title: "Success",
            message: "删除成功",
            type: "success",
            duration: 2000,
          });
        });
      });
    },

    // 恢复已删除的医生信息
    handleRecover(row) {
      this.$confirm("是否恢复医生信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const temp = { id: row.id };
        recoverDoctorInfo(temp).then(() => {
          this.getdoctorList();
          this.$notify({
            title: "Success",
            message: "恢复成功",
            type: "success",
            duration: 2000,
          });
        });
      });
    },

    // 获取所有医生列表
    getdoctorList() {
      this.listLoading = true;
      const temp = this.listQuery;
      getAllDoctorInfo(temp).then((res) => {
        const { items, total } = res;
        this.listLoading = false;
        this.searchList = items;
        this.list = items;
        this.total = total;
        this.srcList = items.map((e) => e.avatar);
      });
    },

    // 远程搜索部门
    getRemoteDeptList(query) {
      this.select_loading = true;
      searchDept(query).then((response) => {
        const { items } = response;
        if (!items) return;
        this.deptNameListOptions = items.map((v) => v.name);
      });
      this.select_loading = false;
    },

    // 上传头像前的检查
    beforeAvatarUpload(file) {},
    // 头像上传成功后的回调
    handleAvatarSuccess(file) {
      const { url, msg } = file;
      this.$message.success(msg);
      this.temp.avatar = url;
      this.imageUrl = url;
    },

    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = [
          "医生工号",
          "医生姓名",
          "所属科室",
          "当前状态",
          "职称",
          "年龄",
          "学历",
          "毕业学校",
          "信息状态",
        ];
        const filterVal = [
          "医生工号",
          "医生姓名",
          "所属科室",
          "当前状态",
          "职称",
          "年龄",
          "学历",
          "毕业学校",
          "信息状态",
        ];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "doctor",
        });
        this.downloadLoading = false;
      });
    },

    formatJson(filterVal) {
      const data = [];
      this.searchList.forEach((item) => {
        const temp = [];
        temp.push(
          item.userCode,
          item.username,
          item.deptName,
          item.currentStatus,
          item.jobTitle,
          item.age,
          item.education,
          item.school,
          item.status
        );
        data.push(temp);
      });
      return data;
    },
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
  width: 178px;
  height: 178px;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
#doctor-avatar {
  border: 1px dashed #d9d9d9;
}
#doctor-avatar:hover {
  cursor: pointer;
}
</style>
<style lang="scss" scoped>
.main {
  .header {
    width: 600px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .demo-table-expand {
    color: #99a9bf;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>

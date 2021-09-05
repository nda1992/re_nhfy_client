# 信息化平台前端页面
## 该项目具有如下几大模块
- 新闻管理
- 招聘管理(包含求职者的信息和职位管理等)
- 医院管理
- 报表查询
- 数据分析
- 主题查询
- 业务办理
- 辅助系统
- 微信小程序管理
- 文档下载
- 系统设置

### 前端技术栈
- 框架：Vue + vue-router + vuex
- UI：element-ui
- ajax请求：axios
- 文本编辑器：Tinymce

### 运行项目
```shell
git clone https://github.com/nda1992/re_nhfy_client.git
cd re_nhfy_client
npm install
npm run dev
```

## warning
### 目前累计的bug
- 基于tinymce实现文件上传时，点击文件上传至服务器的按钮后，显示上传成功，但是又新打开一个选择文件的对话框；
- "住院科室收入"中手术费和治疗费的数据显示有问题，排序也出现了bug
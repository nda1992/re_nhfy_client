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

### 运行项目(二次开发使用)
```shell
git clone https://github.com/nda1992/re_nhfy_client.git
cd re_nhfy_client
npm install
npm run dev
```
### 部署到服务器
Note:需要具有一台可供用户在互联网上能访问到的服务器，为了能给用户更好的体验，还可以注册域名，并做好相关的备案工作。关于云服务器的配置请参考网上的相关教程 <br>
1.使用docker容器

*docker的安装请参考相关教程*
- 将前端项目进行打包
```shell
npm run build
```
- 将dist文件拷贝到后端项目的public文件夹中
- 修改DockerFile文件中的相关配置

## warning
### 目前累计的bug
- 基于tinymce实现文件上传时，点击文件上传至服务器的按钮后，显示上传成功，但是又新打开一个选择文件的对话框；
- "住院科室收入"中手术费和治疗费的数据显示有问题，排序也出现了bug
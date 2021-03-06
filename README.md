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
- 微信小程序管理（小程序项目点击这里，还在完善中...）
- 文档下载
- 系统设置
- animation(新增)

### 文件夹和文件说明📂

**源代码文件夹：src**

- api:所有的前端访问的API接口
- assets:公共的前端图片资源
- components:自定义组件
- directive:wave和样式
- icons:前端页面用到的icons
- layout:后台管理的父组件(相当于一个大的框框，里面放置各个组件，包含侧边栏、页头、父组件级别的工具)
- router:所有的路由
- store:使用vuex管理的全局变量
- styles:公共样式
- utils:工具函数
- vendor:ZIP和excel导出的工具函数
- **views（所有页面）**:**最重要的文件夹，包含所有的前端页面**

## 前端技术栈😀
- 框架：Vue + vue-router + vuex
- UI：element-ui
- ajax请求：axios
- 文本编辑器：Tinymce

## 主要功能🤗
#### 用户的注册、登录、密码找回、更换头像等
#### 使用token维持当前用户的登录状态，后端对每个请求都进行token验证
#### 新闻管理👏

![图1](./images/image-20210916221654570.png)



![image-20210916221742551](./images/image-20210916221742551.png)



1. 新闻编辑和发布（基于Tinymce富文本编辑器，支持图片和文件的上传）、
保存草稿、草稿箱、发布等
2. 管理员对提交发布的新闻进行审核、确认某个新闻是否可以发布、或将草稿的文章转为发布状态
3. 从多个唯独搜索新闻列表中的记录、支持导出excel表格
4. 发布新闻可视化分析（**未完成**）

#### 招聘管理🚀
![image-20210916221453106](./images/image-20210916221453106.png)



1. 独立于后台管理系统开发了一个求职者可以自由访问的招聘系统
2. 未登录求职者可以在首页查看招聘的岗位信息，岗位由后台管理员发布，具体页面如下

![image-20210916222837833](./images/image-20210916222837833.png)



1. 求职者的注册和登录
2. 个人中心：个人基本信息和详细信息的更新、收藏岗位和投递岗位的列表

![image-20210916222213425](./images/image-20210916222213425.png)



![image-20210916222259001](./images/image-20210916222259001.png)



4. 求职者收藏或取消岗位、投递或取消简历（求职者可以查看简历的审核状态、对通过审核的简历可以确认参加考试）.上述这些投递状态的更新是后台管理员进行操作产生的.具体页面如下，所有的投递都将会在该页面显示，管理员可以对简历进行审核、查看求职者简历、可以给某个（或多个）求职者发送信息

![image-20210916223004419](./images/image-20210916223004419.png)



![image-20210916223923470](./images/image-20210916223923470.png)

5. 求职者可以看到新消息

![image-20210916224220013](./images/image-20210916224220013.png)

6. 求职者可以查看已经收到和已经发送的所有消息，支持清空所有消息

![image-20210916224752810](./images/image-20210916224752810.png)



![image-20210916225006283](./images/image-20210916225006283.png)

7. 其他的功能模块主要就是一些数据的查询，都是重复的操作，就不贴出来了.

### 运行并调试项目(二次开发使用)🐱‍🏍
```shell
git clone https://github.com/nda1992/re_nhfy_client.git
cd re_nhfy_client
npm install
npm run dev
```
因为里面的各个API请求都是直接查询或更新数据库的，数据没有写死，所以需要配置[后端项目](https://github.com/nda1992/re_nhfy_server.git)项目一起使用，如何使用后端项目？[点击这里](https://github.com/nda1992/re_nhfy_server.git)

### 部署到服务器📺

- 进入到项目的根路径下，将前端项目进行打包
```shell
npm run build:prod
```
- 将dist文件夹下的所有文件拷贝到后端项目的public文件夹中<br>
[后端项目](https://github.com/nda1992/re_nhfy_server.git)
- 在[后端项目](https://github.com/nda1992/re_nhfy_server.git)的根目录下运行

```shell
supervisor .\bin\www
```

可实现热更新，不用重复启动服务器来调试代码.

## Warnings😐
### 目前累计的bug
- 基于tinymce实现文件上传时，点击文件上传至服务器的按钮后，显示上传成功，但是又新打开一个选择文件的对话框（解决办法：改为自动上传，并删除手动上传的按钮就行）；
- 消息映射表中的两个唯一id要确保数据类型是都是integer或string，项目中在users表的userCode是string，而在messages表中是integer，后面会修复
- 考虑到系统的安全性，后台管理的session管理应该使用加密和解密的方式进行处理（**已经修复了**）
- 呕吐操作，文件中定义很多变量名都是一时想起来的，没有很规范，懒得回去一个个想去改了~😂

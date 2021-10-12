# 整个项目的文档

> 包含前端和后端的设计。编写改文档的目的是为了找出项目的不足，为后期的重构提供基础，这里主要考虑一些变量和函数名称的命名、修复一些布局、部分 bug

## 前端

### 目录介绍

- dist

  打包生成的可在浏览器运行的文件（HTML\CSS\JS）

- images

  github 的截图

#### src（源代码文件夹）

1. api

   前端发往后端的所有请求

2. assets

   图片文件

3. icons
   前端项目中用到的所有 svg 格式图片

4. layout

   后台管理中的核心组件，根据路由的变换显示不同的页面，相当于所有侧边栏路由的父组件，是一个顶层组件

5. router

   前端项目所有的路由配置

6. store

   vuex 管理的配置

7. style

   全局样式配置

8. utils
   工具函数

#### views(包含所有页面)

- animation

  动画

- assistSys

  辅助系统

- bussinessManager

  业务管理

- dashboard

  后台管理的默认首页

- dataAna

  数据分析

- document

  文档管理

- error-page

  错误页面

- hospital

  医院模块

- login

  登录模块

- news

  新闻管理

- password
  密码找回

- pdf

  将 docx 文件生成 pdf

- position

  招聘网站模块

- recruit

  后端管理的招聘模块

- register

  管理注册

- report/reportmake

  报表查询

- settings

  项目中所有系统的设计（如文件夹、轮播图、视频的发布等）

- website

  官网

- wechat

  微信小程序管理

10. App.vue

整个项目的根组件

## 变量名的定义 🚀

### api

1. advice

```
前端使用submiteAdvice，后端也是用submiteAdvice来命名
```

2. hospital

```
文件夹对应四个模块：
1. 首页(没有请求)
2.系统人员管理(employee.js)
3.科室管理(room.js)
4.会议室管理(暂时未开发)
```

- employee.js

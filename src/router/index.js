import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    //用户注册页面
    path: '/register',
    component: () => import("@/views/register/index"),
    hidden: true,
  },
  {
    //用户登录
    path: '/login',
    // redirect:'/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    //密码找回
    path: '/passwd',
    component:()=>import("@/views/password/index"),
    hidden:true,
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  //新闻管理
  {
    path:"/news",
    component:Layout,
    redirect:'/news/home',
    name:'News',
    meta: { title: '新闻管理', icon: 'el-icon-document' },
    children:[
      {
          //新闻管理首页
          path:'home',
          name:'Home',
          component:()=>import("@/views/news/index"),
          meta: { title: '首页', icon: 'el-icon-house' },
      },
      {
          //新闻发布页面
          path:'release',
          name:'Release',
          component:()=>import("@/views/news/release"),
          meta: { title: '新闻发布', icon: 'el-icon-edit-outline' },
      },
      {
          //发文可视化分析
          path:'analysis',
          name:'Analysis',
          component:()=>import("@/views/news/analysis"),
          meta: { title: '发文可视化分析', icon: 'el-icon-magic-stick' },
      }
    ]
},

  //招聘管理
  {
    path:"/recruit",
    component:Layout,
    redirect:'/recruit/home',
    name:'Recruit',
    meta: { title: '招聘管理', icon: 'el-icon-user' },
    children:[
      {
          //招聘管理首页
          path:'home',
          name:'Home',
          component:()=>import("@/views/recruit/index"),
          meta: { title: '首页', icon: 'el-icon-house' },
      },
      {
          //人才招聘发文
          path:'release',
          name:'Release',
          component:()=>import("@/views/recruit/release"),
          meta: { title: '招聘发文', icon: 'el-icon-edit' },
      },
    ]
  },
  //医院管理
  {
    path:"/hospital",
    component:Layout,
    redirect:'/hospital/home',
    name:'Hospital',
    meta: { title: '医院管理', icon: 'el-icon-office-building' },
    children:[
        {
            //医院管理首页
            path:'home',
            name:'Home',
            component:()=>import("@/views/hospital/index"),
            meta: { title: '首页', icon: 'el-icon-house' },
        },
        {
            //人员管理
            path:'employee',
            name:'Employee',
            component:()=>import("@/views/hospital/employee"),
            meta: { title: '人员管理', icon: 'el-icon-paperclip' },
        },
        {
            //科室管理
            path:'room',
            name:'Room',
            component:()=>import("@/views/hospital/room"),
            meta: { title: '科室管理', icon: 'el-icon-set-up' },
        },
        {
            //会议室管理
            path:'meeting',
            name:'Meeting',
            component:()=>import("@/views/hospital/meeting"),
            meta: { title: '会议室管理', icon: 'el-icon-monitor' },
        },
    ]
},
  //报表查询
  {
    path:'/report',
    component:Layout,
    redirect:'/report/home',
    name:'Report',
    meta: { title: '报表查询', icon: 'el-icon-s-data' },
    children:[
        {
            //首页
            path:'home',
            name:'Home',
            component:()=>import("@/views/report/index"),
            meta: { title: '首页', icon: 'el-icon-house' },
        },
        {
            //常规报表查询
            path:'basic',
            name:'Basic',
            component:()=>import("@/views/report/basic"),
            meta: { title: '常规报表查询', icon: 'el-icon-notebook-1' },
        },
        //门诊报表查询
        {
            path:'outpatient',
            name:'Outpatient',
            component:()=>import("@/views/report/outpatient"),
            meta: { title: '门诊报表查询', icon: 'el-icon-s-fold' },
        },
        //住院报表查询
        {
            path:'inpatient',
            name:'Intpatient',
            component:()=>import("@/views/report/inpatient"),
            meta: { title: '住院报表查询', icon: 'el-icon-s-unfold' },
        },
    ]
},
//数据分析
{
  path:'/dataAna',
  component:Layout,
  redirect:'/dataAna/home',
  name:'DataAna',
  meta: { title: '数据分析', icon: 'el-icon-data-analysis' },
  children:[
      {
          //首页
          path:'home',
          name:'Home',
          component:()=>import("@/views/dataAna/index"),
          meta: { title: '首页', icon: 'el-icon-house' },
      },
      //门诊分析
      {
          path:'outpatient',
          name:'Outpatient',
          component:()=>import("@/views/dataAna/outpatient"),
          meta: { title: '门诊数据分析', icon: 'el-icon-data-line' },
      },
      //住院分析
      {
          path:'inpatient',
          name:'Intpatient',
          component:()=>import("@/views/dataAna/inpatient"),
          meta: { title: '住院数据分析', icon: 'el-icon-pie-chart' },
      },
  ]
},
//报表定制
{
  path:'/reportmake',
  component:Layout,
  redirect:'/reportmake/home',
  name:'reportMake',
  children:[
      {
          //首页
          path:'home',
          name:'Home',
          component:()=>import("@/views/reportmake/index"),
          meta: { title: '报表定制', icon: 'el-icon-document-checked' },
      },
  ]
},
//辅助系统
{
  path:'/assistSys',
  component:Layout,
  redirect:'/assistSys/home',
  name:'AssistSys',
  children:[
      {
          //首页
          /*
          可能的系统：
          考试系统
          档案管理系统
          患者心理测试系统
          */
          path:'home',
          name:'Home',
          component:()=>import("@/views/assistSys/index"),
          meta: { title: '辅助系统', icon: 'el-icon-copy-document' },
      },
  ]
},
//微信小程序管理
{
  path:'/wechat',
  component:Layout,
  redirect:'/wechat/home',
  name:'Wechat',
  children:[
      {
          //首页
          path:'home',
          name:'Home',
          component:()=>import("@/views/wechat/index"),
          meta: { title: '微信小程序管理', icon: 'el-icon-chat-dot-round'},
      },
  ]
},

//第三方工具
{
  path:'/others',
  component:Layout,
  redirect:'/others/home',
  name:'Others',
  children:[
      {
          //首页
          path:'home',
          name:'Home',
          component:()=>import("@/views/others/index"),
          meta: { title: '第三方工具', icon: 'el-icon-news' },
      },
  ]
},

//系统设置
{
  path:'/settings',
  component:Layout,
  redirect:'/settings/home',
  name:'settings',
  children:[
      {
          //首页
          path:'home',
          name:'Home',
          component:()=>import("@/views/settings/index"),
          meta: { title: '系统设置', icon: 'el-icon-setting' },
      },
  ]
},

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

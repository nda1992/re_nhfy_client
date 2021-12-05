import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/* Position */
import Position from '@/views/position/index'
/* Website */
import Website from '@/views/website/index'
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
    // 用户注册页面
    path: '/register',
    component: () => import ('@/views/register/index'),
    hidden: true
  },
  {
    // 用户登录
    path: '/login',
    // redirect:'/login',
    component: () => import ('@/views/login/index'),
    hidden: true },
  {
    // 密码找回
    path: '/passwd',
    component: () => import ('@/views/password/index'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import ('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import ('@/views/error-page/404'),
    hidden: true
  },
  {
  // 医院官网相关页面
    path: '/nhfy',
    component: Website,
    redirect: '/nhfy/home',
    children: [
      {
        // 首页
        path: 'home',
        name: 'Home',
        component: () => import ('@/views/website/MainContainer'),
        hidden: true
      },
      {
        // 查看新闻页面
        path: 'getnews/:id(\\d+)',
        name: 'getNews',
        component: () => import ('@/views/website/getNewsById'),
        hidden: true
      },
      {
      // 匹配content组件中的所有路径
        path: 'content/*',
        name: 'Content',
        component: () => import ('@/views/website/ContentTarget'),
        hidden: true
      }
    ]
  },
  {
    // 招聘模块相关页面
    path: '/position',
    component: Position,
    redirect: '/position/list',
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import ('@/views/position/positionList'),
        hidden: true
      },
      {
        path: 'positionNoticeList',
        name: 'PositionNoticeList',
        component: () => import ('@/views/position/positionNoticeList'),
        hidden: true
      },
      {
        path: 'positionUserinfo',
        name: 'PositionUserinfor',
        component: () => import ('@/views/position/positionUserinfo'),
        hidden: true
      },
      {
        // 查看新闻页面
        path: 'getnews/:id(\\d+)',
        name: 'getNews',
        component: () => import ('@/views/position/components/getNewsById'),
        hidden: true
      }
    ]
  },
  {
    path: '/pdf/download',
    name: 'Download',
    component: () => import ('@/views/pdf/download'),
    hidden: true }, {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import ('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      },
      {
        path: 'message',
        name: 'Message',
        component: () => import ('@/views/dashboard/MessagePage'),
        meta: { title: '个人消息中心', icon: 'el-icon-message' },
        hidden: true
      }
    ]
  },
  {
    path: '/news',
    component: Layout,
    redirect: '/news/home',
    name: 'News',
    meta: { title: '新闻管理', icon: 'el-icon-news' },
    children: [
      {
        // 新闻管理首页
        path: 'home',
        name: 'Home',
        component: () => import ('@/views/news/index'),
        meta: { title: '首页', icon: 'el-icon-house' }
      },
      {
        // 新闻发布页面
        path: 'release',
        name: 'Release',
        component: () => import ('@/views/news/release'),
        meta: { title: '新闻发布', icon: 'el-icon-edit-outline' }
      },
      {
        // 新闻更新页面
        path: 'edit/:id(\\d+)',
        name: 'Edit',
        component: () => import ('@/views/news/edit'),
        meta: { title: '新闻更新' },
        hidden: true
      },
      {
        // 新闻查看页面
        path: 'scan/:id(\\d+)',
        name: 'Scan',
        component: () => import ('@/views/news/scan'),
        meta: { title: '新闻浏览' },
        hidden: true
      },
      {
        // 发文可视化分析
        path: 'analysis',
        name: 'Analysis',
        component: () => import ('@/views/news/analysis'),
        meta: { title: '图表分析', icon: 'el-icon-magic-stick' }
      },
      {
        // 模块管理
        path: 'manager',
        name: 'Manager',
        component: () => import ('@/views/news/manager'),
        meta: { title: '模块管理', icon: 'el-icon-s-tools' }
      }
    ]
  },

  // 招聘管理
  {
    path: '/recruit',
    component: Layout,
    redirect: '/recruit/home',
    name: 'Recruit',
    meta: { title: '招聘管理', icon: 'el-icon-user' },
    children: [
      {
      // 招聘管理首页
        path: 'home',
        name: 'Home',
        component: () => import ('@/views/recruit/index'),
        meta: { title: '首页', icon: 'el-icon-house' }
      },
      {
        // 岗位管理
        path: 'release',
        name: 'Release',
        component: () => import ('@/views/recruit/release'),
        meta: { title: '岗位管理', icon: 'el-icon-edit' }
      },
      {
        // 投递列表
        path: 'postlist',
        name: 'Postlist',
        component: () => import ('@/views/recruit/postlist'),
        meta: { title: '投递列表', icon: 'list' }
      },
      {
        // 查看新闻页面
        path: 'getnews/:id(\\d+)',
        name: 'getNews',
        component: () => import('@/views/recruit/getNewsById'),
        meta: { title: '浏览新闻'},
        hidden: true
      }
    ]
  },
  // 医院管理
  {
    path: '/hospital',
    component: Layout,
    redirect: '/hospital/home',
    name: 'Hospital',
    meta: { title: '医院管理', icon: 'el-icon-office-building' },
    children: [{
      // 医院管理首页
      path: 'home',
      name: 'Home',
      component: () => import ('@/views/hospital/index'),
      meta: { title: '首页', icon: 'el-icon-house' }
    },
    {
      // 人员管理
      path: 'employee',
      name: 'Employee',
      component: () => import ('@/views/hospital/employee'),
      meta: { title: '人员管理', icon: 'el-icon-paperclip' }
    },
    {
      // 科室管理
      path: 'room',
      name: 'Room',
      component: () => import ('@/views/hospital/room'),
      meta: { title: '科室管理', icon: 'el-icon-set-up' }
    },
    {
      // 会议室管理
      path: 'meeting',
      name: 'Meeting',
      component: () => import ('@/views/hospital/meeting'),
      meta: { title: '会议室管理', icon: 'el-icon-monitor' }
    }
    ]
  },
  // 报表查询
  {
    path: '/report',
    component: Layout,
    redirect: '/report/home',
    name: 'Report',
    meta: { title: '报表查询', icon: 'el-icon-s-data' },
    children: [
      {
        // 首页
        path: 'home',
        name: 'Home',
        component: () => import ('@/views/report/index'),
        meta: { title: '首页', icon: 'el-icon-house' }
      },
      {
        // 常规报表查询
        path: 'basic',
        name: 'Basic',
        component: () => import ('@/views/report/basic'),
        meta: { title: '常规报表查询', icon: 'el-icon-notebook-1' },
        children: [
          {
            path: 'dc_accountQuery',
            name: 'Dc_accountQuery',
            component: () => import ('@/views/report/children/dc_accountQuery'),
            meta: { title: 'dc_account表的查询' },
            hidden: true
          },
          {
            path: 'basicMedicineAndMaterial',
            name: 'BasicMedicineAndMaterial',
            component: () => import ('@/views/report/children/basicMedicineAndMaterial'),
            meta: { title: 'basic表的查询' },
            hidden: true
          },
          {
            path: 'byDept',
            name: 'ByDept',
            component: () => import ('@/views/report/children/byDept'),
            meta: { title: '按科室查询' },
            hidden: true
          }
        ]
      },
      // 门诊报表查询
      {
        path: 'outpatient',
        name: 'Outpatient',
        component: () => import ('@/views/report/outpatient'),
        meta: { title: '门诊报表查询', icon: 'el-icon-s-fold' },
        children: [
          {
            path: 'avgRevenueByDept',
            name: 'AvgRevenueByDept',
            component: () => import ('@/views/report/outpatient/avgRevenueByDept'),
            meta: { title: '各科室门诊人均费用' },
            hidden: true
          },
          {
            path: 'avgRevenueByDoctor',
            name: 'AvgRevenueByDoctor',
            component: () => import ('@/views/report/outpatient/avgRevenueByDoctor'),
            meta: { title: '各科室门诊人均费用' },
            hidden: true
          }
        ]
      },
      // 住院报表查询
      {
        path: 'inpatient',
        name: 'Intpatient',
        component: () => import ('@/views/report/inpatient'),
        meta: { title: '住院报表查询', icon: 'el-icon-s-unfold' },
        children: [
          {
            path: 'inpatientMedicineMaterialProp',
            name: 'InpatientMedicineMaterialProp',
            component: () => import ('@/views/report/inpatient/inpatientMedicineMaterialProp'),
            meta: { title: '住院科室药耗占比' },
            hidden: true
          },
          {
            path: 'outpatientMedicineMaterialProp',
            name: 'OutpatientMedicineMaterialProp',
            component: () => import ('@/views/report/outpatient/outpatientMedicineMaterialProp'),
            meta: { title: '门诊科室药耗占比' },
            hidden: true
          }
        ]
      },
      // 401页面
      {
        path: '401',
        component: () => import ('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true },
        hidden: true
      },
      // 404页面
      {
        path: '404',
        component: () => import ('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true },
        hidden: true
      }
    ]
  },
  // 数据分析
  {
    path: '/dataAna',
    component: Layout,
    redirect: '/dataAna/home',
    name: 'DataAna',
    meta: { title: '数据展示', icon: 'el-icon-data-analysis' },
    children: [
      {
        // 首页
        path: 'home',
        name: 'Home',
        component: () => import ('@/views/dataAna/index'),
        meta: { title: '首页', icon: 'el-icon-house' }
      },
      // 全院汇总主题
      {
        path: 'summary',
        name: 'Summary',
        component: () => import ('@/views/dataAna/summary'),
        meta: { title: '全院数据主题', icon: 'el-icon-data-line' }
      },
      // 科室排名主题
      {
        path: 'deptRank',
        name: 'DeptRank',
        component: () => import ('@/views/dataAna/deptRank'),
        meta: { title: '科室排名主题', icon: 'el-icon-data-board' }
      },
      // 项目构成主题
      {
        path: 'componentPart',
        name: 'ComponentPart',
        component: () => import ('@/views/dataAna/componentPart'),
        meta: { title: '项目构成主题', icon: 'el-icon-pie-chart' }
      }
    ]
  },
  // 报表定制
  {
    path: '/reportmake',
    component: Layout,
    redirect: '/reportmake/home',
    name: 'reportMake',
    meta: { title: '报表定制', icon: 'el-icon-document-checked' },
    children: [
      {
        // 首页
        path: 'home',
        name: 'Home',
        component: () => import ('@/views/reportmake/index'),
        meta: { title: '首页', icon: 'el-icon-box' }
      },
      {
        // 特殊查询
        path: 'specialQuery',
        name: 'SpecialQuery',
        component: () => import ('@/views/reportmake/specialQuery'),
        meta: { title: '特殊查询', icon: 'el-icon-aim' },
        children: [
          {
            // 科室运营情况
            path: 'deptOperate',
            name: 'DeptOperate',
            component: () => import ('@/views/reportmake/children/deptOperate'),
            meta: { title: '科室收入情况' },
            hidden: true
          },
          {
            // 住院科室耗占比
            path: 'deptMaterialProportion',
            name: 'DeptMaterialProportion',
            component: () => import ('@/views/reportmake/children/deptMaterialProportion'),
            meta: { title: '住院科室耗占比' },
            hidden: true
          },
          {
            // 门诊和住院药占比
            path: 'deptMedicineProportion',
            name: 'DeptMedicineProportion',
            component: () => import ('@/views/reportmake/children/deptMedicineProportion'),
            meta: { title: '门诊和住院药占比' },
            hidden: true
          },
          {
            // 门诊住院药品和耗材明细
            path: 'deptMaterialMedicineDetail',
            name: 'DeptMaterialMedicineDetail',
            component: () => import ('@/views/reportmake/children/deptMaterialMedicineDetail'),
            meta: { title: '门诊住院的药品和耗材' },
            hidden: true
          },
          {
            // 科室使用金额排名前20的耗材
            path: 'deptMaterialAmountTop20',
            name: 'DeptMaterialAmountTop20',
            component: () => import ('@/views/reportmake/children/deptMaterialAmountTop20'),
            meta: { title: '科室使用金额排名前20的耗材' },
            hidden: true
          },
          {
            // 科室使用金额排名
            path: 'deptMaterialSorted',
            name: 'DeptMaterialSorted',
            component: () => import ('@/views/reportmake/children/deptMaterialSorted'),
            meta: { title: '科室使用金额排名' },
            hidden: true
          }
        ]
      }
    ]
  },
  // 业务办理
  {
    path: '/bussinessManager',
    component: Layout,
    redirect: '/bussinessManager/home',
    name: 'BussinessManager',
    meta: { title: '业务办理', icon: 'el-icon-thumb' },
    children: [{
      // 个人业务办理
      path: 'personal',
      name: 'Personal',
      component: () => import ('@/views/bussinessManager/index'),
      meta: { title: '个人业务办理', icon: 'el-icon-user-solid' }
    },
    {
      // 科室业务办理
      path: 'department',
      name: 'Department',
      component: () => import ('@/views/bussinessManager/department'),
      meta: { title: '部门业务办理', icon: 'el-icon-postcard' }
    }
    ]
  },
  // 官网管理
  {
    path: '/settings',
    component: Layout,
    redirect: '/settings/home',
    name: 'Settings',
    meta: { title: '官网管理', icon: 'el-icon-setting' },
    children: [
      {
        // 首页
        path: 'home',
        name: 'Home',
        component: () => import ('@/views/settings/index'),
        meta: { title: '首页', icon: 'el-icon-s-home' }
      },
      {
        // 展示管理
        path: 'display',
        name: 'Display',
        component: () => import ('@/views/settings/display'),
        meta: { title: '页面展示', icon: 'el-icon-s-platform' }
      }
    ]
  },
  // 辅助系统
  {
    path: '/assistSys',
    component: Layout,
    redirect: '/assistSys/home',
    name: 'AssistSys',
    children: [
      {
        // 首页
        /*
        可能的系统：
        考试系统
        档案管理系统
        患者心理测试系统
        */
        path: 'home',
        name: 'Home',
        component: () => import ('@/views/assistSys/index'),
        meta: { title: '辅助系统', icon: 'el-icon-copy-document' }
      }]
  },
  // 微信小程序管理
  {
    path: '/wechat',
    component: Layout,
    redirect: '/wechat/home',
    name: 'Wechat',
    children: [
      {
        // 首页
        path: 'home',
        name: 'Home',
        component: () => import ('@/views/wechat/index'),
        meta: { title: '微信小程序管理', icon: 'wechat' }
      }
    ]
  },
  // 文档下载
  {
    path: '/document',
    component: Layout,
    redirect: '/document/home',
    name: 'Document',
    children: [
      {
        // 首页
        path: 'home',
        name: 'Home',
        component: () => import ('@/views/document/index'),
        meta: { title: '文档下载', icon: 'el-icon-document' }
      }
    ]
  },

  // animation
  {
    path: '/animation',
    component: Layout,
    redirect: '/animation/home',
    name: 'Animation',
    children: [{
      // 首页
      path: 'xhtx',
      name: 'Animation',
      component: () => import ('@/views/animation/index'),
      meta: { title: 'animation', icon: 'el-icon-video-camera-solid' }
    }]
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


export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/register', '/passwd', '/position', '/position/list', '/position/positionRegister', '/position/positionUserinfo', '/position/positionNoticeList', '/nhfy', '/nhfy/home'] // no redirect whitelist
    // 官网的路径全部放通行
const websiteList = ['/nhfy']
router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    // const hasToken = getToken()
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
            NProgress.done()
        } else {
            const hasGetUserInfo = store.getters.name
            if (hasGetUserInfo) {
                next()
            } else {
                try {
                    // get user info
                    await store.dispatch('user/getInfo')
                    next()
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                        // next(`/login?redirect=${to.path}`)
                    next(`/login`)
                    NProgress.done()
                }
            }
        }
    } else {
        /* has no token*/
        let trueUrl = -1
        for (let p of websiteList) {
            if (to.path.search(p) !== -1) {
                trueUrl = 0
                break
            }
        }
        if (whiteList.indexOf(to.path) !== -1 || trueUrl !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            // next(`/login?redirect=${to.path}`)
            next(`/login`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
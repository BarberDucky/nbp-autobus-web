import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '../components/pages/LoginPage'
import RegisterPage from '../components/pages/RegisterPage'
import UserPage from '../components/pages/UserPage'
import PrevoznikPage from '../components/pages/PrevoznikPage'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: LoginPage,
            meta: {
                title: 'Login'
            },
        },
        {
            path: '/register',
            name: 'Register',
            component: RegisterPage,
            meta: {
                title: 'Register'
            },
        },
        {
            path: '/user',
            name: 'User',
            component: UserPage,
            meta: {
                title: 'User'
            },
        },
        {
            path: '/prevoznik',
            name: 'Prevoznik',
            component: PrevoznikPage,
            meta: {
                title: 'Prevoznik'
            },
        }, 
        {
            path: '/',
            redirect: '/login'
        },
    ]
})

router.afterEach((to) => {
    const {title} = to.meta
    document.title = title != null ? title : `NBP`
})

export default router
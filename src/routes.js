import Login from './pages/Login.vue'
import NotFound from './pages/404.vue'
import Home from './pages/Home.vue'
import Main from './pages/Main.vue'
import Table from './pages/nav1/Table.vue'
import Form from './pages/nav1/Form.vue'
import user from './pages/nav1/user.vue'
import Page4 from './pages/nav2/Page4.vue'
import Page5 from './pages/nav2/Page5.vue'
import Page6 from './pages/nav3/Page6.vue'
import echarts from './pages/charts/echarts.vue'
import invest from './pages/invest/Invest.vue'

import vueeditor from './pages/manage/VueEditor'
import markdown from './pages/manage/Markdown'
import upload from './pages/manage/Upload'
import basecharts from './pages/manage/BaseCharts'
import mixcharts from './pages/manage/MixCharts'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Invest',
        iconCls: 'fa fa-money',
        children: [
            { path: '/invest', component: invest, name: 'Invest' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Manage',
        iconCls: 'fa fa-money',
        children: [
            { path: '/vueeditor', component: vueeditor, name: 'VueEditor' },
            { path: '/markdown', component: markdown, name: 'Markdown' },
            { path: '/upload', component: upload, name: 'Upload' },
            { path: '/basecharts', component: basecharts, name: 'BaseCharts' },
            { path: '/mixcharts', component: mixcharts, name: 'MixCharts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
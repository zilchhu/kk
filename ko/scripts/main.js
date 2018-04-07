requirejs.config({
    baseUrl: 'scripts/lib',
    paths: {
        jquery: 'jquery-3.3.1.min',
        util: '../helper/util',
        vue: 'https://unpkg.com/vue/dist/vue',
        vue_router: 'https://unpkg.com/vue-router/dist/vue-router',
        axios: 'https://unpkg.com/axios/dist/axios',
        reader: '..test/reader',
        test: '..test/test',
        common: '../module/common',
        index: '../module/index',
        search: '../module/search'
    }
})

requirejs(['jquery', 'util', 'vue', 'vue_router', 'axios', 'common', 'index', 'search'], function ($, Util, Vue, VueRouter, axios, Common, Index, Search) {
    Vue.use(VueRouter)

    Vue.component('common-header', Common.Header)

    Vue.component('index-header', Index.Header)
    Vue.component('index', Index.Main)

    Vue.component('search-form', Search.Form)
    Vue.component('search-suggestion', Search.Suggestion)
    Vue.component('search-suggestionh', Search.SuggestionH)
    Vue.component('search-detail', Search.Detail)
    Vue.component('search', Search.Main)

    // const Foo = { template: '<div>foo</div>' }
    // const Bar = { template: '<div>bar</div>' }
    // console.log(Foo)
    // console.log(Bar)
    // 2. 定义路由
    // 每个路由应该映射一个组件。 其中"component" 可以是
    // 通过 Vue.extend() 创建的组件构造器，
    // 或者，只是一个组件配置对象。
    // 我们晚点再讨论嵌套路由。

    const routes = [
        {
            path: '/index', component: Index.Main,
            children: [
                { path: '/index/suggestionh', component: Search.SearchSuggestionH },
                { path: '/index*', redirect: '/index/suggestionh' }
            ]
        },
        {
            path: '/search', component: Search.Main,
            children: [
                { path: '/search/suggestionh', component: Search.SuggestionH },
                { path: '/search/suggestion/:words', component: Search.Suggestion, props: true },
                { path: '/search/detail/:words', component: Search.Detail, props: true }
            ]
        },

        { path: '*', redirect: '/index' }
    ]

    // 3. 创建 router 实例，然后传 `routes` 配置
    // 你还可以传别的配置参数, 不过先这么简单着吧。
    const router = new VueRouter({
        linkActiveClass: 'to-active',
        routes // （缩写）相当于 routes: routes
    })

    // 4. 创建和挂载根实例。
    // 记得要通过 router 配置参数注入路由，
    // 从而让整个应用都有路由功能
    const app = new Vue({
        router,
        data: {
            title: '搜索'
        },
        methods: {

        }
    }).$mount('#app')
})
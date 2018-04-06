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
        search: '../module/search'
    }
})

requirejs(['jquery', 'util', 'vue', 'vue_router', 'axios', 'common', 'search'], function ($, Util, Vue, VueRouter, axios, Common, Search) {
    Vue.use(VueRouter)
    Vue.component('cheader', Common.Header)
    Vue.component('csearch', Search.SearchForm)
    Vue.component('csuggestionv', Search.SearchSuggestion)
    Vue.component('csuggestionh', Search.SearchSuggestionH)
    Vue.component('chistory', Search.SearchHistory)
    const Foo = { template: '<div>foo</div>' }
    const Bar = Search.searchForm
    console.log(Foo)
    console.log(Bar)
    // 2. 定义路由
    // 每个路由应该映射一个组件。 其中"component" 可以是
    // 通过 Vue.extend() 创建的组件构造器，
    // 或者，只是一个组件配置对象。
    // 我们晚点再讨论嵌套路由。
    const routes = [
        { path: '/foo', component: Foo },
        { path: '/bar', component: Bar }
    ]

    // 3. 创建 router 实例，然后传 `routes` 配置
    // 你还可以传别的配置参数, 不过先这么简单着吧。
    const router = new VueRouter({
        routes // （缩写）相当于 routes: routes
    })

    // 4. 创建和挂载根实例。
    // 记得要通过 router 配置参数注入路由，
    // 从而让整个应用都有路由功能
    const app = new Vue({
        router,
        data: {
            title: 'Title'
        },
        methods: {

        }
    }).$mount('#app')
})
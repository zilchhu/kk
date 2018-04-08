define([
    'vue',
], function (Vue) {

    const _Tab = {
        template: `
            <header class="index-header">
                <router-link to="/person" tag="img" class="avator" src="imgs/avator.png" width="18px" height="18px"></router-link>
                <ul>
                    <router-link  v-for="to in tos" :key="to.key" class="to" :to="to.link" tag="li"  replace>{{to.name}}</router-link>
                </ul>
                <router-link to="/search" tag="img" class="search" src="imgs/search.png" width="16px" height="16px"></router-link>
            </header>
            `,
        data: function () {
            return {
                tos: [
                    { key: 1, name: '社区', link: '/index/quan' },
                    { key: 2, name: '书架', link: '/index/shelf' },
                    { key: 3, name: '书城', link: '/index/market' }
                ]
            }
        },
        methods: {

        }
    }


    const _Main = {
        template: `
            <div>
                <index-tab></index-tab>
                <router-view></router-view>
            </div>
            `
    }

    return {
        Tab: _Tab,
        Main: _Main
    }

});
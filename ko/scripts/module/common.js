define([
    'vue',
], function (Vue) {

    const _Header = {
        props: {
            title: {
                type: String,
                default: 'Index'
            }
        },
        template: `
            <header class="header">
                <p class="h-title">{{title}}</p>
                <span @click="back" class="h-back"><img src="imgs/back.png" width="14px" height="14px" alt="">返回</span>
            </header>
         `,
        methods: {
            back: function () {
                window.history.back()
            }
        }
    }

    return {
        Header: _Header
    }

});
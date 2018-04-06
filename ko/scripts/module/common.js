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
                <span class="h-back">back</span>
            </header>
         `
    }

    return {
        Header: _Header
    }

});
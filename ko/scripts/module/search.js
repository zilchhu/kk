define([
    'vue', 'axios', 'util'
], function (Vue, axios, Util) {
    var bus = new Vue()
    const _SearchForm = {
        template: `
            <div class="search-form">
                <form class="s-form" action="/search" method="get" >
                    <input ref="in" v-model="value"  class="s-input" type="text" name="words" id="" placeholder="输入关键词">
                    <img v-show="deleteShow" v-on:click="reset" class="s-delete" src="imgs/delete.png" alt="" width="16px" height="16px">
                    <input class="s-submit" type="submit" value="搜索">
                </form>
             </div>
            `,
        data: function () {
            return {
                value: ''
            }
        },
        computed: {
            deleteShow: function () {
                bus.$emit('words', this.value)
                return this.value != ''
            }
        },
        methods: {
            reset: function () {
                this.value = ''
                this.$refs.in.focus()
            }
        },
        mounted: function () {
            this.$refs.in.focus()
        }
    }
    const _SearchSuggestion = {
        template: `
            <div v-if="suggestionShow" class="search-suggestion-v">
                <ul>
                    <li  v-for="suggestion in suggestions" @click="search(suggestion)" class="s-title">{{suggestion}}</li>
                </ul>
            </div>
            `,
        data: function () {
            return {
                base_url: 'http://unionsug.baidu.com/su?wd=',
                words: '',
                suggestions: []
            }
        },
        computed: {
            suggestionShow: function () {
                return this.words != '' && this.suggestions.length > 0
            }
        },
        watch: {
            words: function (val) {
                axios.get(this.base_url + val)
                    .then(response => {
                        this.parse(response)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },
        mounted: function () {
            bus.$on('words', value => {
                this.words = value
            })
        },
        methods: {
            parse: function (res) {
                if (!res.data) return
                let d = res.data;
                let j = eval(d.substring(16, d.length - 1))
                let s = j.s
                this.suggestions.clear()
                s.forEach(value => {
                    this.suggestions.push(value)
                })
                console.log(this.suggestions)
            },
            search: function (value) {
                bus.$emit('search-words', value)
            }
        }
    }
    const _SearchSuggestionH = {
        template: `
            <div v-if="sugShow" class="search-suggestion-h">
                <ul>
                     <li @click="search(sug)" ref="sugItems" v-for="sug in sugs" class="s-title">{{sug}}</li>
                </ul>
                <p @click="refresh" class="s-refresh"><img src="imgs/aui-icon-refresh.png" width="14px" height="14px" alt="">换一批</p>
            </div>
            `,
        data: function () {
            return {
                sugs: [],
                words: ''
            }
        },
        computed: {
            sugShow: function () {
                return this.words == ''
            }
        },
        methods: {
            refresh: function () {
                let stop = this.$refs.sugItems[0].offsetTop
                this.$refs.sugItems.forEach((ele) => {
                    if (ele.offsetTop <= stop + 50) {
                        this.sugs.push(this.sugs.shift())
                    }
                })
            },
            search: function (value) {
                bus.$emit('search-words', value)
            }
        },
        mounted: function () {
            this.sugs.push('1 asdas')
            this.sugs.push('2 assadadas')
            this.sugs.push('3 asdadasds')
            this.sugs.push('4 asd的撒sadaas')
            this.sugs.push('5 asdadasds')
            this.sugs.push('6 as实打实的das')
            this.sugs.push('7 asdas')
            this.sugs.push('8 asd萨达as')
            bus.$on('words', value => {
                this.words = value
            })
        }
    }
    const _SearchHistory = {
        template: `
            <div v-if="historyShow" class="search-history">
                <ul>
                    <li v-for="history in historys" class="s-title"><img src="imgs/history.png" width="12px" height="12px" alt="">{{history}}</li>
                </ul>
                <p @click="clear" class="s-delete"><img src="imgs/clear.png" width="14px" height="14px" alt="">清空搜索历史</p>
            </div>
            `,
        data: function () {
            return {
                historys: [],
                words: ''
            }
        },
        computed: {
            historyShow: function () {
                return this.words == '' && this.historys.length > 0
            }
        },
        watch: {
            historys: function (vals) {
                let val = vals.last()
                if (!val) {
                    localStorage.clear()
                    return
                }
                localStorage.setItem(val, val)
            }
        },
        methods: {
            clear: function () {
                this.historys.clear()
            }
        },
        mounted: function () {
            bus.$on('words', value => {
                this.words = value
            })
            bus.$on('search-words', value => {
                if (!this.historys.includes(value)) {
                    this.historys.push(value)
                }
            })
            for (let i = 0, j = localStorage.length; i < j; i++) {
                let key = localStorage.key(i)
                this.historys.push(key)
            }
        }
    }
    return {
        SearchForm: _SearchForm,
        SearchSuggestion: _SearchSuggestion,
        SearchSuggestionH: _SearchSuggestionH,
        SearchHistory: _SearchHistory
    }

});
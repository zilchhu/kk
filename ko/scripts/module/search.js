define([
    'vue', 'axios', 'util'
], function (Vue, axios, Util) {
    var bus = new Vue()
    const _SearchForm = {
        template: `
            <div class="search-form">
                <form class="s-form">
                    <input  ref="in" v-model="value"  class="s-input" type="text" name="words" id="" placeholder="输入关键词">
                    <img v-show="deleteShow" v-on:click="reset" class="s-delete" src="imgs/delete.png" alt="" width="16px" height="16px">
                    <input @click="sendSearch(value)"class="s-submit" type="button" value="搜索">
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
                if (this.value != '') {
                    this.$router.push({ path: `/suggestionv/${this.value}` })
                    return true
                } else {
                    this.$router.push({ path: `/suggestionh` })
                    return false
                }
            }
        },
        methods: {
            reset: function () {
                this.value = ''
                this.$refs.in.focus()
            },
            sendSearch: function (value) {
                //bus.$emit('search-words', value)
                localStorage.setItem(value, value)
                this.$router.push({ path: `/detail/${value}` })
            }
        },
        mounted: function () {
            this.$refs.in.focus()
        }
    }
    const _SearchSuggestion = {
        props: {
            words: {
                type: String
            }
        },
        template: `
            <div  class="search-suggestion-v">
                <ul>
                    <li  v-for="suggestion in suggestions" @click="sendSearch(suggestion)" class="s-title">{{suggestion}}</li>
                </ul>
            </div>
            `,
        data: function () {
            return {
                forward_url: 'http://198.13.51.237/in.php?url=',
                base_url: 'http://unionsug.baidu.com/su?wd=',
                suggestions: []
            }
        },
        watch: {
            words: function (val) {
                this.getSearch(val)
            }
        },
        mounted: function () {
            this.getSearch(this.words)
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
            sendSearch: function (value) {
                // bus.$emit('search-words', value)
                localStorage.setItem(value, value)
                this.$router.push({ path: `/detail/${value}` })
            },
            getSearch: function (val) {
                console.log(val, 'new')
                axios.get(this.forward_url+this.base_url+val)
                    .then(response => {
                        this.parse(response)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }
    const _SearchSuggestionH = {
        props: {
            words: {
                type: String
            }
        },
        template: `
            <div>
            <div  class="search-suggestion-h">
                <ul>
                     <li @click="sendSearch(sug)" ref="sugItems" v-for="sug in sugs" class="s-title">{{sug}}</li>
                </ul>
                <p @click="refresh" class="s-refresh"><img src="imgs/aui-icon-refresh.png" width="14px" height="14px" alt="">换一批</p>
            </div>
            <div v-if="historyShow"  class="search-history">
                <ul>
                    <li @click="sendSearch(history)" v-for="history in historys" class="s-title"><img src="imgs/history.png" width="12px" height="12px" alt="">{{history}}</li>
                </ul>
                <p @click="clear" class="s-delete"><img src="imgs/clear.png" width="14px" height="14px" alt="">清空搜索历史</p>
            </div>
            </div>
            `,
        data: function () {
            return {
                sugs: [],
                historys: []
            }
        },
        computed: {
            historyShow: function () {
                return this.historys.length > 0
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
            sendSearch: function (value) {
                //bus.$emit('search-words', value)
                localStorage.setItem(value, value)
                this.$router.push({ path: `/detail/${value}` })
            },
            clear: function () {
                this.historys.clear()
                localStorage.clear()
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
            //history
            for (let i = 0, j = localStorage.length; i < j; i++) {
                let key = localStorage.key(i)
                this.historys.push(key)
            }
            // bus.$on('search-words', value => {
            //     if (!this.historys.includes(value)) {
            //         this.historys.push(value)
            //         console.log(this.historys)
            //     }
            // })
        }
    }

    const _SearchDetail = {
        props: {
            words: {
                type: String
            }
        },
        template: `
            <div class="search-detail">
                <p class="s-state">{{state}}{{words}}</p>
                <ul>
                    <p class="s-title">相关书籍</p>
                    <li v-for="book in books">
                        <div class="s-content">
                            <img :src="book.coverUrl" width="70px" height="100px"  alt="">
                            <div class="c-detail">
                                <h3 class="c-title">{{book.title}}</h3>
                                <p class="c-abstract">{{book.abstract}}</p>
                                <div class="c-author">{{book.author}}<ul><li v-for="mark in book.marks" class="c-mark">{{mark}}</li></ul></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            `,
        data: function () {
            return {
                state: '搜素',
                books: [
                    {
                        coverUrl: 'imgs/benbengou.jpg',
                        title: '解决',
                        abstract: '大大是',
                        author: '是',
                        marks: ['a', 's']
                    }
                ]
            }
        },
        mounted: function () {

        }

    }
    return {
        SearchForm: _SearchForm,
        SearchSuggestion: _SearchSuggestion,
        SearchSuggestionH: _SearchSuggestionH,
        SearchDetail: _SearchDetail
    }
});
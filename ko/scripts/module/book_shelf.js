define([
    'vue',
], function (Vue) {

    const _Recommendation = {
        template: `
            <div class="book-shelf-recommendation">
                <div class="book">
                    <img class="cover" src="imgs/benbengou.jpg" width="56px" height="80px" alt="">
                    <div class="text">
                        <h3 class="from">asda</h3>
                        <p class="to">dsfdsfsdfs</p>
                    </div>
                </div>
                <div class="check">
                    <img src="imgs/check-in.png" width="22px" height="20px" alt="">
                    <span>签到</span>
                </div>
            </div>
            `
    }

    const _Books = {
        template: `
            <div class="book-shelf-books">
                <section v-for="book in books">
                    <div class="book">
                        <img class="cover" :src="book.cover" width="94.5" height="135" alt="">
                        <h3 class="name">{{book.name}}</h3>
                        <div class="tip">{{book.tip}}</div>
                    </div>
                </section>
                <section>
                    <div class="book">
                        <div class="cover book-adder"></div>
                    </div>
                </section>
            </div>
            `,
        data: function () {
            return {
                books: [
                    {cover:'imgs/benbengou.jpg',name:'bsbdasdasbdas',tip:'sadasdasdsadsadasd'},
                    {cover:'imgs/benbengou.jpg',name:'bsbdasdasbdas',tip:'sadasdasdsadsadasd'},
                    {cover:'imgs/benbengou.jpg',name:'bsbda的撒sbdas',tip:'完全'},
                    {cover:'imgs/benbengou.jpg',name:'阿萨大打撒打撒十大',tip:'sadasd'}
                ]
            }
        }
    }

    const _Main = {
        template: `
            <div class="book-shelf">
                <book-shelf-recommendation></book-shelf-recommendation>
                <book-shelf-books></book-shelf-books>
            </div>
            `
    }
    return {
        Recommendation: _Recommendation,
        Books: _Books,
        Main: _Main
    }
})
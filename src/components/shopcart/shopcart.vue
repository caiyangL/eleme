<template>
    <div class="shop-cart">
        <div class="content" @click="toggleList">
            <div class="content-left">
                <div class="cart-wrap">
                    <div class="icon" :class="{highlight:totalCount>0}">
                        <i class="icon-shopping_cart"></i>
                    </div>
                    <div class="count" v-show="totalCount>0">{{totalCount}}</div>
                </div><div class="price">
                    <span class="total" :class="{highlight:totalPrice>0}">¥{{totalPrice}}元</span>
                    <span class="send">另需配送费¥{{deliveryPrice}}元</span>
                </div>
            </div>
            <div class="content-right">
                <div class="limit" :class="payClass" @click.stop="pay">{{payDesc}}</div>
            </div>
            <div class="balls-wrap">
                <div class="ball" v-for="(index,ball) in balls" transition="drop" v-show="ball.show" :key="index">
                    <div class="inner"></div>
                </div>
            </div>
        </div>
        <div class="selected-list" v-show="showList" transition="show">
            <div class="title">
                <span class="buy-cart">购物车</span>
                <span class="empty" @click="empty">清空</span>
            </div>
            <div class="list-wrap" v-el:list-wrap>
                <ul>
                    <li class="list-row" v-for="(index,food) in selectedFoods" :key="index">
                        <div class="food-name">{{food.name}}</div>
                        <div class="price">¥{{food.price}}</div>
                        <div class="ctrl-wrap">
                            <cart-ctrl :food="food"></cart-ctrl>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="list-mask" transition="mask" v-show="showList" @click="maskHide"></div>
    </div>
</template>

<script>
    import cartCtrl from 'components/cartCtrl/cartCtrl';
    import BSroll from 'better-scroll';

    export default {
        props: {
            selectedFoods: {
                type: Array,
                default () {
                    return [
                        {
                            price: 15,
                            count: 2
                        }
                    ];
                }
            },
            deliveryPrice: {
                type: Number
            },
            minPrice: {
                type: Number
            }
        },
        methods: {
            drop (el) {
                for (let i = 0, len = this.balls.length; i < len; i++) {
                    let ball = this.balls[i];
                    if (!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropingBalls.push(ball);
                        return;
                    }
                }
            },
            maskHide () {
                this.fold = true;
            },
            empty () {
                this.selectedFoods.forEach((food) => {
                    food.count = 0;
                });

                this.showList = false;
            },
            pay () {
                if (this.totalPrice > this.minPrice) {
                    window.alert(`需要支付${this.totalPrice}元`);
                }
            },
            toggleList () {
                if (!this.totalPrice) return;
                this.fold = !this.fold;
            }
        },
        data () {
            return {
                balls: [
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    }
                ],
                dropingBalls: [],
                fold: true
            };
        },
        computed: {
            totalPrice () {
                let total = 0;
                for (let i = 0, len = this.selectedFoods.length; i < len; i++) {
                    let food = this.selectedFoods[i];

                    total += food.price * food.count;
                }
                return total;
            },
            totalCount () {
                let count = 0;
                this.selectedFoods.forEach((v) => {
                    count += v.count;
                });
                return count;
            },
            payDesc () {
                if (this.totalPrice === 0) {
                    return `¥${this.minPrice}元起送`;
                } else if (this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice;
                    return `还差¥${diff}元起送`;
                } else {
                    return '去派送';
                }
            },
            payClass () {
                if (this.totalPrice >= this.minPrice) {
                    return 'enough';
                } else {
                    return 'not-enough';
                }
            },
            showList () {
                if (!this.totalPrice) {
                    this.fold = true;
                    return false;
                }
                if (!this.fold) {
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            this.scroll = new BSroll(this.$els.listWrap, {
                                click: true
                            });
                        } else {
                            this.scroll.refresh();
                        }
                    });
                }

                return !this.fold;
            }
        },
        transitions: {
            drop: {
                beforeEnter: function (el) {
                    let count = this.dropingBalls.length;
                    while (count--) {
                        let ball = this.dropingBalls[count];
                        let rect = ball.el.getBoundingClientRect();
                        let x = rect.left - 36;
                        let y = -(window.innerHeight - 32 - rect.top);
                        el.style.tranform = `translate3d(0,${y}px,0)`;
                        el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                        let inner = el.getElementsByClassName('inner')[0];
                        inner.style.tranform = `translate3d(${x}px,0,0)`;
                        inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    }
                },
                enter (el) {
                    /* eslint-disable no-unused-vars */
                    let rf = el.offsetHeight;
                    this.$nextTick(() => {
                        el.style.tranform = 'translate3d(0,0,0)';
                        el.style.webkitTransform = 'translate3d(0,0,0)';
                        let inner = el.getElementsByClassName('inner')[0];
                        inner.style.tranform = 'translate3d(0,0,0)';
                        inner.style.webkitTransform = 'translate3d(0,0,0)';
                    });
                },
                afterEnter (el) {
                    let ball = this.dropingBalls.shift();
                    if (ball) {
                        ball.show = false;
                        el.style.display = 'none';
                    };
                }
            }
        },
        components: {
            cartCtrl
        }
    };
</script>

<style lang="stylus">
    @import '../../common/stylus/mixin.styl'

    .shop-cart
        position fixed
        left 0
        bottom 0
        width 100%
        .content
            display flex
            height 48px
            .content-left
                flex 1
                background:#14172d
                .cart-wrap
                    display inline-block
                    position relative
                    left 0px
                    top -10px
                    margin-left 12px
                    padding 6px
                    box-sizing border-box
                    width 56px
                    height 56px
                    background #14172d
                    border-radius 50%
                    font-size 0
                    .icon
                        width 100%
                        height 100%
                        background #2b343c
                        border-radius 50%
                        line-height 44px
                        text-align center
                        color #80858a
                        font-size 24px
                        &.highlight
                            background-color rgb(0,160,220)
                            color rgb(255,255,255)
                    .count
                        position absolute
                        right 0
                        top 0
                        padding 0 6px
                        width 24px
                        height 16px
                        line-height 16px
                        font-size 9px
                        font-weight 700
                        text-align center
                        background rgb(240,20,20)
                        box-sizing border-box
                        border-radius 10px
                        box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
                        color #fff
                .price
                    display inline-block
                    vertical-align top
                    margin-left 12px
                    padding 12px 0
                    box-sizing border-box
                    height 100%
                    color #80858a
                    font-size 0
                    .total
                        padding-right 12px
                        border-right 1px solid rgba(255,255,255,0.1)
                        font-size 16px
                        line-height 24px
                        font-weight 700
                        &.highlight
                            color #fff
                    .send
                        padding-left 12px
                        vertical-align top
                        font-size 12px
                        line-height 24px
            .content-right
                flex 0 0 105px
                width 105px
                .limit
                    height 100%
                    line-height 48px
                    background-color #2b333b
                    font-size 12px
                    text-align center
                    color rgba(255,255,255,0.4)
                    &.not-enough
                        background-color #2b333b
                    &.enough
                        background-color #00873b
                        font-weight 700
                        color #fff

            .balls-wrap
                .ball
                    position fixed
                    left 36px
                    bottom 32px
                    z-index 200
                    &.drop-transition
                        transition transform 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
                        .inner
                            width 16px
                            height 16px
                            border-radius 50%
                            background rgb(0,160,220)
                            transition transform 0.4s
        .selected-list
            position absolute
            left 0
            bottom 48px
            z-index -1
            width 100%
            background-color #fff
            font-size 0
            transition transform 0.3s
            &.show
                transform translate3d(0,0,0)
            &.show-enter,&.show-leave
                transform translate3d(0,100%,0)
            .title
                height 40px
                padding 0 18px
                background-color #f3f5f7
                line-height 40px
                border-1px(rgba(7,17,27,0.1))
                .buy-cart
                    float left
                    font-size 14px
                    color rgb(7,17,27)
                .empty
                    float right
                    font-size 12px
                    color rgb(0,160,220)
            .list-wrap
                padding 0 18px
                overflow hidden
                max-height 200px
                .list-row
                    position relative
                    height 48px
                    line-height 48px
                    border-bottom 1px solid rgba(7,17,27,0.1)
                    .food-name
                        font-size 14px
                        color rgb(7,17,27)
                    .price
                        position absolute
                        top 0
                        right 100px
                        font-size 10px
                        font-weight 700
                        color rgb(240,20,20)
                    .ctrl-wrap
                        position absolute
                        top 7px
                        right 0px
                        line-height 0
                        vertical-align top
        .list-mask
            position fixed
            left 0
            top 0
            z-index -2
            width 100%
            height 100%
            background-color rgba(7,17,27,0.6)
            transition opacity 0.6s
            &.mask-transition
                opacity 1
            &.mask-enter,&.mask-leave
                opacity 0
</style>

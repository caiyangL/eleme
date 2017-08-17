<template>
    <div class="food-wrap" v-show="isShow" transition="food" v-el:food>
        <div>
            <div class="food-pic">
                <img :src="food.image" class="pic">
            </div>
            <div class="close-btn" @click="hide">
                <i class="icon-close"></i>
            </div>
            <div class="buy-info">
                <div class="name">
                    <h2>{{food.name}}</h2>
                </div>
                <div class="sell">
                    <span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}</span>
                </div>
                <div class="price-wrap">
                    <span class="price">¥{{food.price}}</span>
                    <del class="old-price" v-if="food.oldPrice">¥{{food.oldPrice}}</del>
                </div>
                <div class="buy">
                    <div class="add-cart" v-show="!food.count || food.count===0" @click="addCart($event)" transition="cart-change">加入购物车</div>
                    <div class="cart-ctrl-wrap" v-show="food.count>0">
                        <cart-ctrl :food="food"></cart-ctrl>
                    </div>
                </div>
            </div>
            <split v-show="food.info"></split>
            <div class="summary" v-show="food.info">
                <div class="title">商品介绍</div>
                <div class="info">{{food.info}}</div>
            </div>
            <split></split>
            <div class="ratings-wrap">
                <div class="title">商品评价</div>
                <rating-select :ratings-list="food.ratings" :only-content="onlyContent" :rates-text="ratesText" :rate-type="rateType"></rating-select>
                <div class="ratings-list" v-show="food.ratings && food.ratings.length">
                    <ul>
                        <li v-show="needShow(rating.rateType, rating.text)" v-for="(index,rating) in food.ratings" :key="index">
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                            <div class="username">{{rating.username}}</div>
                            <div class="content">
                                <p><i :class="{'icon-thumb_up':rating.rateType==0,'icon-thumb_down':rating.rateType==1}"></i>{{rating.text}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="no-ratings" v-show="!food.ratings || !food.ratings.length">暂无评论</div>
            </div>
        </div>
    </div>
</template>

<script>
    import cartCtrl from 'components/cartCtrl/cartCtrl';
    import Vue from 'vue';
    import BScroll from 'better-scroll';
    import split from 'components/split/split';
    import ratingSelect from 'components/ratingSelect/ratingSelect';
    import {formatDateFn} from '../../common/js/format.js';

    const ALL = 2;

    export default {
        props: {
            food: {
                type: Object
            }
        },
        data () {
            return {
                isShow: false,
                ratesText: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                },
                onlyContent: false,
                rateType: ALL
            };
        },
        methods: {
            show () {
                this.isShow = true;
                this.onlyContent = false;
                this.rateType = ALL;

                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$els.food, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            },
            hide () {
                this.isShow = false;
            },
            addCart (event) {
                if (!event._constructed) return;
                Vue.set(this.food, 'count', 1);

                this.$dispatch('add.cart', event.target);
            },
            needShow (type, text) {
                if (this.onlyContent && !text) {
                    return false;
                }

                if (this.rateType === ALL) {
                    return true;
                } else {
                    return type === this.rateType;
                }
            }
        },
        components: {
            cartCtrl,
            split,
            ratingSelect
        },
        events: {
            'changeOnly' (val) {
                this.onlyContent = val;

                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            'changeType' (val) {
                this.rateType = val;

                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            }
        },
        filters: {
            formatDate (time) {
                return formatDateFn(time, 'yyyy-MM-dd hh:mm');
            }
        }
    };
</script>

<style lang="stylus">
@import '../../common/stylus/mixin.styl'

.food-wrap
    position fixed
    width 100%
    height auto
    left 0
    top 0
    bottom 48px
    background-color #fff
    transition transform 0.3s,opacity 0.3s
    &.food-transition
        transform translate3d(0,0,0)
        opacity 1
    &.food-enter,&.food-leave
        transform translate3d(100%,0,0)
        opacity 0
    .food-pic
        position relative
        width 100%
        height 0
        padding-bottom 100%
        .pic
            position absolute
            left 0
            top 0
            width 100%
            height 100%
    .close-btn
        position absolute
        left 0
        top 0
        padding 6px
        font-size 24px
        color #fff
    .buy-info
        position relative
        padding 18px
        .name
            margin-bottom 6px
            h2
                font-size 16px
                font-weight 700
                color rgb(7,17,27)
                line-height 16px
        .sell
            font-size 12px
            color rgb(147,153,159)
            line-height 12px
            margin-bottom 18px
            .sell-count
                margin-right 12px
        .price-wrap
            line-height 24px
            .price
                font-size 14px
                font-weight 700
                color rgb(240,20,20)
            .old-price
                font-weight 700
                font-size 10px
                color rgb(147,153,159)
        .buy
            .add-cart
                position absolute
                right 18px
                bottom 18px
                padding 6px 12px
                border-radius 12px
                background-color rgb(0,160,220)
                font-size 10px
                color #fff
                transition opacity 0.3s
                &.cart-change-transition
                    opacity 1
                &.cart-change-enter,&.cart-change-leave
                    opacity 0  
            .cart-ctrl-wrap
                position absolute
                right 18px
                bottom 10px
    .summary
        padding 18px
        .title
            font-size 14px
            color #07111b
            margin-bottom 6px
        .info
            padding 0 8px
            font-size 12px
            color rgb(77,85,93)
            line-height 24px
    .ratings-wrap
        .title
            font-size 14px
            color #07111b
            margin: 18px 0 6px 18px
</style>

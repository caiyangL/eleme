<template>
    <div class="seller" v-el:seller>
        <div class="seller-wrap">
            <div class="seller-header">
                <div class="top">
                    <div class="name">
                        <h2>{{seller.name}}</h2>
                    </div>
                    <div class="sell">
                        <star :score="seller.score" :size="36"></star><span>({{seller.score}})</span><span>月售{{seller.sellCount}}单</span>
                    </div>
                    <div class="favorite" @click="toggleFavorite">
                        <div class="icon-favorite" :class="{'active': isFavorite}"></div>
                        <div class="text">{{favoriteText}}</div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="minPrice">
                        <p class="text">起送价</p>
                        <p class="price"><span class="strong">{{seller.minPrice}}</span>元</p>
                    </div>
                    <div class="deliveryPrice">
                        <p class="text">商家配送</p>
                        <p class="price"><span class="strong">{{seller.deliveryPrice}}</span>元</p>
                    </div>
                    <div class="deliveryTime">
                        <p class="text">平均配送时间</p>
                        <p class="price"><span class="strong">{{seller.deliveryTime}}</span>元</p>
                    </div>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <div class="title">公告与活动</div>
                <div class="content">{{seller.bulletin}}</div>
                <div class="activity">
                    <ul class="act-wrap">
                        <li class="act-item" v-for="(i,item) in seller.supports" :key="i">
                            <icon-active :size="16" :type="item.type"></icon-active><span class="text">{{item.description}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="pics">
                <div class="title">商家实景</div>
                <div class="pic-view"  v-el:picview>
                    <ul class="pic-wrap" v-el:picwrap>
                        <li class="pic" v-for="(i,item) in seller.pics" :key="i">
                            <img :src="item">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="infos">
                <div class="title">商家信息</div>
                <ul>
                    <li class="info-item" v-for="(i,item) in seller.infos" :key="i">{{item}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import star from 'components/star/star';
    import split from 'components/split/split';
    import iconActive from 'components/icon-active/icon-active';
    import BScroll from 'better-scroll';

    export default {
        props: {
            seller: {
                type: Object,
                default: []
            }
        },
        data () {
            return {
                isFavorite: false
            };
        },
        computed: {
            favoriteText () {
                return this.isFavorite ? '已收藏' : '收藏';
            }
        },
        methods: {
            _initPicScroll () {
                if (!this.picScroll) {
                    this.picScroll = new BScroll(this.$els.picview, {
                        scrollX: true
                    });
                } else {
                    this.picScroll.refresh();
                }
            },
            _initScroll () {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$els.seller);
                } else {
                    this.scroll.refresh();
                }
            },
            _setPicWrapWidth () {
                let width = 0;
                width = this.seller.pics.length * (120 + 6) - 6;
                this.$els.picwrap.style.width = width + 'px';
            },
            toggleFavorite () {
                this.isFavorite = !this.isFavorite;
            }
        },
        watch: {
            seller () {
                this.$nextTick(() => {
                    this._initScroll();
                    this._setPicWrapWidth();
                    this._initPicScroll();
                });
            }
        },
        ready () {
            this.$nextTick(() => {
                this._initScroll();
                this._setPicWrapWidth();
                this._initPicScroll();
            });
        },
        components: {
            star,
            split,
            iconActive
        }
    };
</script>

<style lang="stylus">
    .seller
        position absolute
        left 0
        top 174px
        bottom 0
        overflow hidden
        width 100%
        .seller-header
            position relative
            .top
                padding 0 18px
                .name
                    margin 18px 0 8px 0
                    font-size 14px
                    color rgb(7,17,27)
                    line-height 14px
                .sell
                    padding-bottom 18px
                    border-bottom 1px solid rgba(7,17,27,0.1)
                    .star-wrap
                        margin-right 8px
                        vertical-align top
                        line-height 18px
                    span
                        display inline-block
                        margin-right 12px
                        vertical-align top
                        line-height 18px
                        font-size 10px
                        color rgb(77,85,93)
                        &:last-child
                            margin-right 0
                .favorite
                    position absolute
                    right 18px
                    top 0px
                    width 36px
                    text-align center
                    .icon-favorite
                        font-size 24px
                        line-height 24px
                        color rgba(7,17,27,0.3)
                        margin-bottom 4px
                        &.active
                            color rgb(240,20,20)
                    .text
                        font-size 10px
                        color rgb(77,85,93)
                        line-height 10px
            .bottom
                display flex
                padding 18px 0
                text-align center
                .minPrice,.deliveryPrice,.deliveryTime
                    flex 1
                    border-right 1px solid rgba(7,17,27,0.1)
                    .text
                        margin-bottom 4px
                        font-size 10px
                        color rgb(147,153,159)
                        line-height 10px
                    .price
                        font-size 10px
                        color rgb(7,17,27)
                        line-height 24px
                        .strong
                            font-size 24px
                    &:last-child
                        border-right none
        .bulletin
            padding 18px 18px 0 18px
            color rgb(7,17,27)
            .title
                font-size 14px
                font-weight 700
                margin-bottom 8px
            .content
                margin-bottom 16px
                padding 0 12px
                font-size 12px
                line-height 24px
                color rgb(240,20,20)
            .activity
                .act-wrap
                    .act-item
                        padding 16px 12px
                        border-top 1px solid rgba(7,17,27,0.1)
                        font-size 12px
                        line-height 16px
                        .i-avtive
                            vertical-align top
                        .text
                            line-height 16px
        .pics
            padding 18px
            .title
                font-size 14px
                font-weight 700
                color rgb(7,17,27)
                margin-bottom 12px
            .pic-view
                width 100%
                overflow hidden
                .pic-wrap
                    white-space nowrap
                    .pic
                        display inline-block
                        width 120px
                        height 90px
                        margin-right 6px
                        &:last-child
                            margin-right 0
                        img
                            width 100%
                            height 100%
        .infos
            padding 18px
            .title
                margin-bottom 12px
                font-size 14px
                font-weight 700
                color rgb(7,17,27)
            .info-item
                    font-size 12px
                    line-height 16px
                    padding 16px
                    border-top 1px solid rgba(7,17,27,0.1)

</style>

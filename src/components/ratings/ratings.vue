<template>
    <div class="ratings" v-el:ratings>
        <div class="wrap">
            <div class="score-warp">
                <div class="score-left">
                    <div class="score">{{seller.score}}</div>
                    <div class="text">综合评分</div>
                    <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="score-right">
                    <div class="serviceScore">
                        <span class="text">服务态度</span><star :size="36" :score="seller.serviceScore"></star><span class="score-num">{{seller.serviceScore}}</span>
                    </div>
                    <div class="foodScore">
                        <span class="text">商品质量</span><star :size="36" :score="seller.foodScore"></star><span class="score-num">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-time"><span class="text">送达时间</span><span class="time">{{seller.deliveryTime}}分钟</span></div>
                </div>
            </div>
            <split></split>
            <rating-select :ratings-list="ratings" :rates-text="ratesText" :only-content="onlyContent" :rate-type="rateType"></rating-select>
            <div class="ratings-wrap">
                <ul>
                    <li class="rating-item" v-show="needShow(item.rateType,item.text)" v-for="(i,item) in ratings" :key="i">
                        <div class="left">
                            <div class="avatar">
                                <img class="pic" :src="item.avatar">
                            </div>
                        </div>
                        <div class="right">
                            <div class="name">{{item.username}}</div>
                            <star :size="24" :score="item.score"></star><span class="time" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
                            <div class="text">{{item.text}}</div>
                            <div class="recommend-wrap" v-show="item.recommend.length">
                                <ul class="recommend">
                                    <span class="icon-thumb_up"></span>
                                    <li class="recommend-item" v-for="(i,r) in item.recommend" :key="i">{{r}}</li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import star from 'components/star/star';
import split from 'components/split/split';
import ratingSelect from 'components/ratingSelect/ratingSelect';
import BScroll from 'better-scroll';

const ALL = 2;

export default {
    props: {
        seller: {
            type: Object
        }
    },
    data () {
        return {
            ratings: [],
            ratesText: {
                all: '全部',
                positive: '满意',
                negative: '不满意'
            },
            onlyContent: false,
            rateType: ALL
        };
    },
    methods: {
        getRatingsDate () {
            this.$http.get('/api/ratings').then(res => {
                res.body.errno === 0 && (this.ratings = res.body.data);

                this.$nextTick(() => {
                    this.scroll = new BScroll(this.$els.ratings, {
                        click: true
                    });
                });
            });
        },
        needShow (type, text) {
            if (this.onlyContent && !text) return false;

            if (this.rateType === ALL) {
                return true;
            } else {
                return type === this.rateType;
            }
        }
    },
    components: {
        star,
        split,
        ratingSelect
    },
    events: {
        'changeType' (val) {
            this.rateType = val;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        'changeOnly' (val) {
            this.onlyContent = val;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        }
    },
    created () {
        this.getRatingsDate();
    }
};
</script>

<style lang="stylus">
    .ratings
        position absolute
        top 174px
        bottom 0
        left 0
        width 100%
        overflow hidden
        .score-warp
            display flex
            padding 18px 0
            .score-left
                flex 0 0 137px
                width 137px
                text-align center
                border-right 1px solid rgba(7,17,27,0.1)
                .score
                    font-size 24px
                    color rgb(255,153,0)
                    line-height 28px
                    margin-bottom 6px
                .text
                    font-size 12px
                    color rgb(7,17,27)
                    line-height 12px
                    margin-bottom 8px
                .rankRate
                    font-size 10px
                    color rgba(7,17,27,0.4)
                    line-height 10px
                    margin-bottom 6px
            .score-right
                flex 1
                text-align center
                .serviceScore,.foodScore
                    margin-bottom 8px
                    .star-wrap
                        vertical-align top
                        line-height 18px
                    .score-num
                        font-size 12px
                        color rgb(255,153,0)
                        line-height 18px
                        vertical-align top
                        margin-left 12px
                .text
                    font-size 12px
                    color rgb(7,17,27)
                    line-height 18px
                    margin-right 12px
                    vertical-align top
                .time
                    font-size 12px
                    color rgb(147,153,159)
        .ratings-wrap
            padding 0 18px
            .rating-item
                display flex
                padding 18px 0
                border-bottom 1px solid rgba(7,17,27,0.1)
                .left
                    margin-right 12px
                    .avatar
                        width 28px
                        height 28px
                        border-radius 50%
                        overflow hidden
                        .pic
                            width 100%
                            height 100%
                .right
                    .name
                        font-size 12px
                        color rgb(7,17,27)
                        line-height 12px
                        margin-bottom 4px
                    .time
                        margin-left 6px
                        font-size 10px
                        color rgb(147,153,159)
                        line-height 12px
                    .text
                        margin-top 6px
                        font-size 12px
                        color rgb(7,17,27)
                        line-height 18px
                    .recommend-wrap
                        .icon-thumb_up
                            font-size 12px
                            color rgb(0,160,220)
                            line-height 16px
                        .recommend
                            display inline-block
                            .recommend-item
                                display inline-block
                                padding 2px 4px
                                border 1px solid rgba(7,17,27,0.1)
                                border-radius 1px
                                margin-top 8px
                                margin-right 8px
                                font-size 10px
                                color rgb(147,153,159)
                                line-height 16px
                                &:last-child
                                    margin-right 0
</style>

<template>
    <div class="ratings-select-wrap">
        <div class="ratings-select">
            <div class="rate-type-wrap">
                <div class="all" :class="{'active':rateType==2}" @click="changeRateType(2,$event)">
                    <span class="content">{{ratesText.all}}</span>
                    <span class="count">{{ratingsList.length}}</span>
                </div>
                <div class="positive" :class="{'active':rateType==0}" @click="changeRateType(0,$event)">
                    <span class="content">{{ratesText.positive}}</span>
                    <span class="count">{{positiveList.length}}</span>
                </div>
                <div class="negative" :class="{'active':rateType==1}" @click="changeRateType(1,$event)">
                    <span class="content">{{ratesText.negative}}</span>
                    <span class="count">{{negativeList.length}}</span>
                </div>
            </div>
            <div class="only-content" :class="{'on':onlyContent}" @click="changeOnly($event)">
                <i class="icon-check_circle"></i>
                <span class="text">只看有内容的评价</span>
            </div>
        </div>
    </div>
</template>

<script>
    const ALL = 2;

    export default {
        props: {
            ratingsList: {
                type: Array,
                default () {
                    return [];
                }
            },
            ratesText: {
                type: Object,
                default () {
                    return {
                        all: '全部',
                        positive: '好评',
                        negative: '差评'
                    };
                }
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            rateType: {
                type: Number,
                default: ALL
            }
        },
        methods: {
            changeRateType (type, event) {
                if (!event._constructed) return;
                this.rateType = type;
                this.$dispatch('changeType', this.rateType);
            },
            changeOnly (event) {
                if (!event._constructed) return;
                this.onlyContent = !this.onlyContent;
                this.$dispatch('changeOnly', this.onlyContent);
            }
        },
        computed: {
            positiveList () {
                return this.ratingsList.filter(rating => rating.rateType === 0);
            },
            negativeList () {
                return this.ratingsList.filter(rating => rating.rateType === 1);
            }
        }
    };
</script>

<style lang="stylus">
    .ratings-select-wrap
        .ratings-select
            border-bottom 1px solid rgba(7,17,27,0.1)
            padding 0 18px
            .rate-type-wrap
                padding 12px 0
                font-size 0
                border-bottom 1px solid rgba(7,17,27,0.1)
                .all,.positive,.negative
                    display inline-block
                    margin-right 8px
                    padding 8px 12px
                    border-radius 2px
                    font-size 12px
                    line-height 16px
                    color rgb(77,85,93)
                    .count
                        font-size 10px
                .all,.positive
                    background-color rgba(0,160,220,0.2)
                    &.active
                        background-color rgb(0,160,220)
                        color #fff
                .negative
                    background-color rgba(77,85,93,0.2)
                    &.active
                        color #fff
                        background-color rgb(77,85,93)
            .only-content
                padding 12px 0
                color rgb(147,153,159)
                &.on
                    .icon-check_circle
                        color: #00c850
                .icon-check_circle
                    font-size 24px
                    line-height 24px
                    vertical-align top
                .text
                    font-size 12px
                    line-height 24px
                    vertical-align top
</style>

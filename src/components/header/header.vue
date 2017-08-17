<template>
    <div class="header">
        <div class="content-wrap">
            <div class="avator">
                <img :src="seller.avatar">
            </div>
            <div class="content">
                <div class="name-wrap">
                    <i class="brand"></i>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="send">
                    {{seller.description}} / {{seller.deliveryTime}}分钟送达
                </div>
                <div class="activity" v-if="seller.supports">
                    <i class="icon" :class="classMap[seller.supports[0].type]"></i>
                    <span>{{seller.supports[0].description}}</span>
                </div>
                <div class="act-more" v-if="seller.supports" @click="changeDetail">
                    <span class="count">{{seller.supports.length}}个</span>
                    <i class="icon-keyboard_arrow_right"></i>
                </div>
            </div>
        </div>
        <div class="bulletin-wrap" @click="changeDetail">
            <span class="bulletin-icon"></span><span class="bulletin">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="bg">
            <img :src="seller.avatar">
        </div>
        <div class="detail" v-show="detailShow" transition="fade">
            <div class="detail-wrap">
                <div class="detail-main clearfix">
                    <div class="name">
                        <h1>{{seller.name}}</h1>
                    </div>
                    <div class="star-out">
                        <star :score="seller.score" :size="48"></star>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <div class="supports-wrap" v-if="seller.supports">
                        <ul>
                            <li v-for="item in seller.supports" class="supports-item">
                                <span class="icon" :class="classMap[item.type]"></span>
                                <span class="content">{{item.description}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                        <p>{{seller.bulletin}}</p>
                    </div>
                </div>
            </div>
            <div class="detail-close icon-close" @click="closeDetail"></div>
        </div>
    </div>
</template>

<script>
import star from 'components/star/star';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false
    };
  },
  methods: {
    changeDetail () {
      this.detailShow = true;
    },
    closeDetail () {
      this.detailShow = false;
    }
  },
  components: {
    star
  },
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
  }
};
</script>

<style lang="stylus">
    @import '../../common/stylus/mixin.styl'

    .header
        position relative
        overflow hidden
        background-color rgba(7,17,27,0.5)
        .bg
            position absolute
            left 0
            top 0
            z-index -1
            width 100%
            img
                width 100%
                filter blur(10px)
    .content-wrap
        padding:24px 12px 18px 24px
        position relative
        font-size 0
        .avator
            display:inline-block
            vertical-align top
            img
                width:64px
                height:64px
                border-radius:2px
        .content
            display:inline-block
            margin-left 16px
            color #fff
            .name-wrap
                .brand
                    display inline-block
                    vertical-align top
                    width 30px
                    height 18px
                    bg-transform('brand')
                    background-size 30px 18px
                    background-repeat no-repeat
                .name
                    margin-left 6px
                    font-size 16px
                    font-weight bold
                    line-height 18px
            .send
                margin-top 8px
                font-size 12px
                line-height 12px
            .activity
                margin-top 10px
                font-size 0px
                .icon
                    display:inline-block
                    width 16px
                    height 16px
                    margin-right 4px
                    background-color red
                    vertical-align top
                    background-repeat no-repeat
                    background-size 16px 16px
                    &.decrease
                        bg-transform(decrease_2)
                    &.discount
                        bg-transform(discount_2)
                    &.guarantee
                        bg-transform(guarantee_2)
                    &.invoice
                        bg-transform(invoice_2)
                    &.special
                        bg-transform(special_2)
                span
                    font-size 10px
                    line-height 16px
            .act-more
                position absolute
                right 12px
                bottom 14px
                background-color rgba(0,0,0,0.2)
                border-radius 12px
                font-size 10px
                padding 7px 8px
                i
                    display inline-block
                    height 16px
                    line-height 16px
    .bulletin-wrap
        position relative
        height 28px
        padding: 0 22px 0 12px
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        background-color rgba(7,17,27,0.2)
        color #fff
        .bulletin-icon
            display inline-block
            width 22px
            height 12px
            margin-top 8px
            bg-transform('bulletin')
            vertical-align top
            background-size 22px 12px
            background-repeat: no-repeat
        .bulletin
            margin 0 4px
            font-size 10px
            line-height 28px
        .icon-keyboard_arrow_right
            position absolute
            right 10px
            top 6px
    .detail
        position fixed
        z-index 100
        left 0
        top 0
        width 100%
        height 100%
        overflow auto
        color rgb(255,255,255)
        backdrop-filter: blur(10px)
        transition opacity 0.5s,background-color 0.5s
        &.fade-transition
            opacity 1
            background-color rgba(7,17,27,0.8)
        &.fade-enter,&.fade-leave
            opacity 0
            background-color rgba(7,17,27,0)
        .detail-wrap
            width 100%
            min-height 100%
            .detail-main
                padding: 0 36px 64px 36px
                .name
                    padding-top 64px
                    text-align center
                    h1
                    font-size 16px
                    font-weight 700
                    line-height 16px
                .star-out
                    margin 16px 0 28px 0
                    text-align center
                .title
                    display flex
                    .line
                        flex 1
                        height 1px
                        margin-top 7px
                        background-color rgba(255,255,255,0.2)
                    .text
                        font-size 14px
                        font-weight 700
                        line-height 14px
                        padding 0 12px
                .supports-wrap
                    margin 24px 0 28px
                    padding 0 12px
                    .supports-item
                        height 16px
                        margin-bottom 12px
                        &.last-child
                            margin-bottom 0
                        .content
                            font-size 12px
                            line-height 16px
                            vertical-align top
                        .icon
                            display inline-block
                            vertical-align top
                            width 16px
                            height 16px
                            background-size 16px 16px
                            &.decrease
                                bg-transform('decrease_2')
                            &.discount
                                bg-transform('discount_2')
                            &.guarantee
                                bg-transform('guarantee_2')
                            &.invoice
                                bg-transform('invoice_2')
                            &.special
                                bg-transform('special_2')
                .bulletin
                    margin-top 24px
                    padding 0 12px
                    p
                        font-size 12px
                        line-height 24px

        .detail-close
            position relative
            margin -64px auto 0 auto
            height 32px
            width 32px
            font-size 32px
            clear both
            color rgba(255,255,255,0.5)

</style>

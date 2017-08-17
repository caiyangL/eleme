<template>
  <div class="goods-wrap">
    <div class="menu-wrap" v-el:menu-wrap>
        <ul class="menu-items">
            <li v-for="item in goods" class="menu-item border-1px" :class="{current:currentIndex == $index}" @click="selectMenu($index, $event)">
                <span class="title"><span v-if="item.type>0" :class="classMap[item.type]" class="icon"></span>{{item.name}}</span>
            </li>
        </ul>
    </div>
    <div class="foods-wrap" v-el:foods-wrap>
        <ul>
            <li v-for="(index,good) in goods" class="good-item good-item-hook" :key="index">
                <h2 class="good-title">{{good.name}}</h2>
                <ul class="foods">
                    <li v-for="(index,food) in good.foods" class="food" @click.stop.prevent="_changeSelect(food, $event)" :key="index">
                        <div class="icon">
                            <img width="57" height="57" :src="food.icon">
                        </div>
                        <div class="content">
                            <div class="title">{{food.name}}</div>
                            <div class="desc">{{food.description}}</div>
                            <div class="sell">
                                <span class="month">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
                            </div>
                            <div class="price-wrap">
                                <span class="price">¥{{food.price}}</span><del class="old-price" v-if="food.oldPrice">¥{{food.oldPrice}}</del>
                                <div class="cart-ctrl-wrap">
                                    <cart-ctrl :food="food"></cart-ctrl>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <food :food="selectedFood" v-ref:food></food>
    <shopcart v-ref:shopcart :selected-foods="selectedFoods" :min-price="seller.minPrice" :delivery-price="seller.deliveryPrice"></shopcart>
  </div>
</template>

<script>
    import BScoll from 'better-scroll';
    import shopcart from '../shopcart/shopcart';
    import cartCtrl from '../cartCtrl/cartCtrl';
    import food from '../food/food';

    let ERRNO_OK = 0;

    export default {
        data () {
            return {
                goods: [],
                foodsHeight: [],
                currentIndex: 0,
                scrollY: 0,
                selectedFood: {}
            };
        },
        props: {
            seller: {
                type: Object
            }
        },
        created () {
            this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];

            this.$http.get('/api/goods').then((res) => {
                if (res.body.errno === ERRNO_OK) {
                    this.goods = res.body.data;

                    this.$nextTick(() => {
                        this._initScroll();
                        this._calculateHeight();
                    });
                }
            });
        },
        methods: {
            _initScroll () {
                this.menuScroll = new BScoll(this.$els.menuWrap, {
                    click: true
                });
                this.foodsScroll = new BScoll(this.$els.foodsWrap, {
                    click: true,
                    probeType: 3
                });

                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));

                    this.followMenu();
                });
            },
            _drop (el) {
                this.$nextTick(() => {
                    this.$refs.shopcart.drop(el);
                });
            },
            _calculateHeight () {
                let goodItem = this.$els.foodsWrap.getElementsByClassName('good-item-hook');
                this.foodsHeight.push(0);
                let height = 0;

                for (let i = 0, len = goodItem.length; i < len; i++) {
                    height += goodItem[i].clientHeight;
                    this.foodsHeight.push(height);
                }
            },
            _changeSelect (food, event) {
                if (!event._constructed) return;
                this.selectedFood = food;
                this.$refs.food.show();
            },
            selectMenu (index, event) {
                if (!event._constructed) return;
                let food = this.$els.foodsWrap.getElementsByClassName('good-item-hook')[index];

                this.foodsScroll.scrollToElement(food, 300);
            },
            followMenu () {
                let menuItem = this.$els.menuWrap.getElementsByClassName('menu-item')[this.currentIndex];
                this.menuScroll.scrollToElement(menuItem, 300);
            }
        },
        computed: {
            currentIndex () {
                for (let i = 0, len = this.foodsHeight.length; i < len; i++) {
                    let height1 = this.foodsHeight[i];
                    let height2 = this.foodsHeight[i + 1];
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            },
            selectedFoods () {
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food);
                        }
                    });
                });

                return foods;
            }
        },
        components: {
            shopcart,
            cartCtrl,
            food
        },
        events: {
            'add.cart' (target) {
                this._drop(target);
            }
        }
    };
</script>

<style lang="stylus">
    @import '../../common/stylus/base.styl'
    @import '../../common/stylus/mixin.styl'

    .goods-wrap
        display flex
        position absolute
        width 100%
        top 174px
        bottom 48px
        overflow hidden
        .menu-wrap
            flex 0 0 80
            width 80px
            background-color #f3f5f7
            .menu-items
                .menu-item
                    display table
                    height 54px
                    width 56px
                    padding 0 12px
                    &:last-child
                        .title
                            &:after
                                display none  
                    &.current
                        position relative
                        margin-top -1px
                        background-color #fff
                        .title
                            &:after
                                display none
                    .icon
                        display: inline-block
                        vertical-align: top
                        width: 12px
                        height: 12px
                        margin-right: 2px
                        background-size: 12px 12px
                        background-repeat: no-repeat
                        &.decrease
                            bg-transform('decrease_3')
                        &.discount
                            bg-transform('discount_3')
                        &.guarantee
                            bg-transform('guarantee_3')
                        &.invoice
                            bg-transform('invoice_3')
                        &.special
                            bg-transform('special_3')
                    .title
                        display table-cell
                        vertical-align middle
                        font-size 12px
                        line-height 14px
                        border-1px(rgba(7,17,27,0.1))
                        
        .foods-wrap
            flex 1
            .good-item
                .good-title
                    padding-left 14px
                    font-size 12px
                    color rgb(147,153,159)
                    line-height 26px
                    border-left 2px solid #d9dde1
                    background-color #f3f5f7
                .foods
                    padding 0 18px
                    .food
                        display flex
                        border-1px(rgba(7,17,27,0.1))
                        padding 18px 0
                        &:last-child
                            &:after
                                display none
                        .icon
                            flex 0 0 57px
                            margin-right 10px
                        .content
                            flex 1
                            .title
                                font-size 14px
                                color rgb(7,17,27)
                                line-height 14px
                                margin 2px 0 6px 0
                            .desc,.sell
                                font-size 12px
                                color rgb(147,153,159)
                                line-height 12px
                            .desc
                                margin-bottom 6px
                                line-height 14px
                            .sell
                                .month
                                    margin-right 8px
                            .price-wrap
                                position relative
                                line-height 24px
                                .price
                                    font-size 14px
                                    font-weight 700
                                    color red
                                    margin-right 8px
                                .old-price
                                    font-size 10px
                                    font-weight 700
                                    color rgb(147,153,159)
                                .cart-ctrl-wrap
                                    position absolute
                                    right 0
                                    top 0

        
</style>

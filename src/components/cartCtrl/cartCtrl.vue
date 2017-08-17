<template>
    <div class="cart-ctrl" v-el:cart-ctrl>
        <div class="minus" @click.stop.prevent="minusCount(food, $event)" v-show="food.count>0" transition="show">
            <i class="icon-remove_circle_outline"></i>
        </div>
        <div class="count" v-show="food.count>0" transition="show">{{food.count}}</div>
        <div class="add" @click.stop.prevent="addCount(food,$event)">
            <i class="icon-add_circle"></i>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addCount (food, event) {
                if (!event._constructed) return;
                if (!food.count) {
                    Vue.set(food, 'count', 1);
                } else {
                    food.count++;
                }

                this.$dispatch('add.cart', event.target);
            },
            minusCount (food, event) {
                if (!event._constructed) return;
                if (food.count > 0) food.count--;
            }
        }
    };
</script>

<style lang="stylus">
    .cart-ctrl
        font-size 0
        .minus, .add
            display inline-block
            padding 6px
            vertical-align top
            font-size 24px
            color rgb(0,160,220)
            line-height 24px
        .count
            display inline-block
            padding 6px 0
            vertical-align top
            font-size 10px
            color rgb(147,153,159)
            line-height 24px
        .minus ,.count
            transition opacity 0.3s,transform 0.3s
            &.show-transition
                opacity 1
                transform translate3D(0,0,0)
                rotate3D(0,0,1,0deg)
            &.show-enter,&.show-leave
                opacity 0
                transform translate3D(40px,0,0) rotate3D(0,0,1,-180deg)
</style>


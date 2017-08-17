<template>
    <div class="i-avtive" :class="[className,sizeType]"></div>
</template>

<script>
    export default {
        props: {
            type: {
                type: Number
            },
            size: {
                type: Number
            }
        },
        computed: {
            className () {
                return this.map[this.type];
            },
            sizeType () {
                if (this.size === 12) {
                    return 'size_1';
                } else if (this.size === 16) {
                    return 'size_2';
                }
            }
        },
        created () {
            this.map = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        }
    };
</script>

<style lang="stylus">
    @import '../../common/stylus/mixin.styl'

    .i-avtive
        display inline-block
    .size_1
        width 12px
        height 12px
        background-size 12px 12px
        background-repeat no-repeat
        &.decrease       
            bg-transform(decrease_1)
        &.discount       
            bg-transform(discount_1)
        &.special       
            bg-transform(special_1)
        &.invoice       
            bg-transform(invoice_1)
        &.guarantee       
            bg-transform(guarantee_1)
    .size_2
        width 16px
        height 16px
        background-size 16px 16px
        &.decrease       
            bg-transform(decrease_2)
        &.discount       
            bg-transform(discount_2)
        &.special       
            bg-transform(special_2)
        &.invoice       
            bg-transform(invoice_2)
        &.guarantee       
            bg-transform(guarantee_2)
</style>

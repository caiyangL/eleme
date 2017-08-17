<template>
    <div class="star-wrap">
        <div :class="starType">
            <span v-for="item in itemClasses" class="star-item" :class="item" track-by="$index"></span>
        </div>
    </div>
</template>

<script>
const CLS_ON = 'on';
const CLS_OFF = 'off';
const CLS_HALF = 'half';
let LENGTH = 5;

export default {
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    data () {
        return {};
    },
    computed: {
        starType () {
            return 'star-' + this.size;
        },
        itemClasses () {
            let result = [];
            /* let int = Math.floor(this.score);
            for (let i = 0; i < int; i++) {
                result.push('star_' + CLS_ON);
            };

            let float = this.score - int;

            if (float >= 0.5) {
                result.push('star_' + CLS_HALF);
            } else if (float < 0) {
                result.push('star_' + CLS_OFF);
            }; */

            let onCount = Math.floor(this.score * 2) / 2;
            let halfCount = onCount % 1 !== 0;

            for (let i = 0; i < onCount; i++) {
                result.push('star_' + CLS_ON);
            };

            if (halfCount) {
                result.push('star_' + CLS_HALF);
            };

            while (result.length < LENGTH) {
                result.push('star_' + CLS_OFF);
            };

            return result;
        }
    }
};

</script>

<style lang="stylus">
    @import '../../common/stylus/mixin.styl'

    .star-wrap
        font-size 0
        display inline-block
        .star-item
            display inline-block
            background-repeat no-repeat
        .star-48
            .star-item
                margin-right 22px
                width 20px
                height 19px
                background-size:20px 19px
                &:last-child
                    margin-right 0
                &.star_on
                    bg-transform('star48_on');
                &.star_off
                    bg-transform('star48_off');
                &.star_half
                    bg-transform('star48_half');
        .star-36
            .star-item
                margin-right 6px
                width 15px
                height 15px
                background-size:15px 15px
                &:last-child
                    margin-right 0
                &.star_on
                    bg-transform('star36_on');
                &.star_off
                    bg-transform('star36_off');
                &.star_half
                    bg-transform('star36_half');
        .star-24
            .star-item
                margin-right 3px
                width 10px
                height 10px
                background-size:10px 10px
                &:last-child
                    margin-right 0
                &.star_on
                    bg-transform('star24_on');
                &.star_off
                    bg-transform('star24_off');
                &.star_half
                    bg-transform('star24_half');

</style>

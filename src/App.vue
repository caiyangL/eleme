<template>
  <div>
    <sell-header :seller="seller"></sell-header>

    <!-- tab栏 -->
    <div class="tab">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>

    <!-- 内容组件 -->
    <router-view :seller="seller" keep-alive></router-view>

  </div>
</template>

<script>
  import header from './components/header/header';

  let ERR_OK = 0;

  export default {
    data () {
      return {
        seller: {}
      };
    },
    components: {
      sellHeader: header
    },
    created () {
      this.$http.get('/api/seller').then((res) => {
        if (res.body.errno === ERR_OK) {
          this.seller = res.body.data;
        }
      });
    }
  };
</script>

<style lang="stylus">
  @import "./common/stylus/index"
  .tab
    width:100%
    display:flex
    height:40px
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex:1
      line-height:40px
      text-align:center
      &>a
        display:block
        font-size:14px
        &.active
          color:rgb(240,20,20)
</style>

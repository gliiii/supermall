<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info  ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from  './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from "components/content/goods/GoodsList";
import {itemListenerMinxin, backTopMixin} from "common/mixin";
import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
import {debounce} from "common/utils";
import {mapActions} from "vuex"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  mixins: [itemListenerMinxin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      itemImageListener: null,
      themeTopYs: [],
      getThemeTopY: null
    }
  },
  created() {
    this.iid = this.$route.params.iid
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 1.获取顶部的图片轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 6.保存评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }

      //1.第一次获取，值不对
      //值不对的原因：this.$refs.params.$el压根没有渲染
      // this.themeTopYs = []
      //
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

      // this.$nextTick(() => {
      //   //根据最新的数据，对应的DOM是已经被渲染出来
      //   //但是图片依然没有加载完（目前获取到的offsetTop不包含图片的高度）
      //   this.themeTopYs = []
      //
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // })

    }),
    getRecommend().then(res => {
        this.recommends = res.data.list
    })

    //给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []

      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

      //默认取最大值范围
      this.themeTopYs.push(Number.MAX_VALUE)

      console.log(this.themeTopYs)
    },100)
  },
  mounted() {

  },
  destroyed() {
    //多余步骤
    this.$bus.$off('itemImageLoad', this.itemImageListener)
  },
  methods: {

    ...mapActions(['addCart']),

    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()

    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position) {

      this.listenShowBackTop(position)

      //1.获取Y值
      const positionY = -position.y

      //2.positionY和主题中值进行对比
      //[0, 7938, 9120, 9452]

      //positionY 在0和7938之间，index=0
      //positionY 在7938和9120之间，index=1
      //positionY 在9120和9452之间，index=2

      //positionY 大于等于9120值，index=3

      let length = this.themeTopYs.length
      // for (let i = 0; i < length; i++) {
      //   if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
      //     this.currentIndex = i
      //     this.$refs.nav.currentIndex = this.currentIndex
      //   }
      // }
      for (let i = 0; i < length-1; i++) {
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }


      }

    },
    addToCart() {
      // 1.创建对象
      const obj = {}
      // 2.对象信息
      obj.iid = this.iid;
      obj.imgURL = this.topImages[0]
      obj.title = this.goods.title
      obj.desc = this.goods.desc;
      obj.newPrice = this.goods.nowPrice;
      // 3.添加到Store中

      this.addCart(obj).then(res => {
        console.log(res);
        this.$toast.show(res)
      })

      // this.$store.dispatch('addCart', obj).then(res => {
      //   console.log(res)
      // })
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 49px);
}
</style>

<template>
  <div id="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车({{length}})</div></nav-bar>
    <cart-list class="cart-list" :cart-list="list"></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import BottomBar from './childComps/BottomBar'
  import {mapGetters} from 'vuex'

	export default {
		name: "Cart",
    components: {
		  NavBar,
      CartList,
      BottomBar
    },
    computed: {
      // cartList() {
      //   return this.$store.getters.cartList
      // },
      // cartCount() {
      //   return this.$store.getters.cartCount
      // }

      //两种语法，第一种
      // ...mapGetters(['cartLength', 'cartList'])
      //第二种
      ...mapGetters({
        length: 'cartLength',
        list: 'cartList'
      })

    }
	}
</script>

<style scoped>
  #cart {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
    position: relative;
    z-index: 9;
  }

  .cart-list {
    height: calc(100% - 44px - 49px - 40px)
  }
</style>

<template>
  <scroll class="content" ref="scroll">
    <div>
      <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'
  import {mapGetters} from 'vuex'

	export default {
		name: "CartList",
    components: {
		  Scroll, CartListItem
    },
    computed: {
		  ...mapGetters(['cartList'])
    },
    activated() {
		  this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>

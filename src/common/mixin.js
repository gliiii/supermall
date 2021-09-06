import {debounce} from "common/utils";
import {BACKTOP_DISTANCE} from  "common/const"

import BackTop from "@/components/content/backTop/BackTop";

export const itemListenerMinxin = {
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50)

    //对监听事件进行保存
    this.itemImageListener = () => {
      // this.$refs.scroll.refresh()
      refresh()
    }

    this.$bus.$on('itemImageLoad', this.itemImageListener)
  }
}

export const backTopMixin = {
  data: function () {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE
    }
  }
}

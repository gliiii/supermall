import {ADD_COUNTER,ADD_TO_CART} from "./mutation-type";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      const oldInfo = context.state.cartList.find(item => item.iid === payload.iid)

      if (oldInfo) {
        context.commit(ADD_COUNTER, oldInfo)
        resolve("商品数量+1")
      } else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve("添加新的商品")
      }
    })
  }
}

<template>
  <div class="toast-container" v-show='isShow'>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Toast',

  components: {},

  data() {
    return {
      isShow: false,
      message: ''
    };
  },

  mounted() {

  },

  methods: {
    show(message, durations = 2000) {
      this.isShow = true
      this.message = message
      setTimeout(() => {
        // durations 后关闭toast
        this.isShow = false
        this.message = ''
      }, durations);
    }
  },
};
</script>

<style scoped>
.toast-container {
  position: fixed;
  left: 50%;
  top: 50%;
  padding: 3px 10px;
  transform: translate(-50%, -50%);
  color: #fff;
  border-radius: 6px;
  background: rgba(0, 0, 0, .7);
  z-index: 999;
}
</style>

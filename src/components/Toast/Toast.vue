<template>
  <div class="toast" :class="{'hidden': !visible}">
    <div class="to_con">
      <p>{{msg}}</p>
    </div>
  </div>
</template>

<script>
// import {banner} from '../api/api'
export default {
  name: 'Toast',
  data () {
    return {
      visible: true,
      msg: ''
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  .toast {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .to_hide {
      position: absolute;
      width: 100%;
      height: 100%;
      background: transparent;
    }
    .to_con {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-40%, -50%);
      p {
        padding: 20px 80px;
        background: #333333;
        color: #fff;
        border-radius: 5px;
        line-height: 30px;
        font-size: 16px;
        opacity: 0.8;
      }
    }
  }
  .hidden {
    transform: scale(0);
    transition: 0.3s;
  }
</style>

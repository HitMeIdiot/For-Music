<template>
    <div class="toast" v-show="toShow">
      <div class="to_con">
        <p>{{msg}}</p>
      </div>
    </div>
</template>

<script>
// import {banner} from '../api/api'

export default {
  name: 'HelloWorld',
  data () {
    return {
      toShow: false
    }
  },
  props: {
    msg: {
      type: String,
      default: '操作失败'
    }
  },
  created () {
  },
  methods: {
    showToast () {
      this.toShow = true
      setTimeout(() => {
        this.toShow = false
      }, 3000)
    }
  }
}
</script>
<style lang="scss" scoped>
  .toast {
    position: absolute;
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
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      p {
        padding: 5px 25px;
        background: #333333;
        color: #fff;
        border-radius: 5px;
        line-height: 30px;
        font-size: 16px;
        opacity: 0.8;
      }
    }
  }
</style>

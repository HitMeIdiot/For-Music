<template>
    <div>
      <div class="title">
        <p v-show="isShow">
          <span>{{title}}</span>
          <span>
            <slot name="more"></slot>
          </span>
        </p>
        <p v-show="!isShow" class="m1">
          <b>{{title}}</b>
          <slot name="com"></slot>
        </p>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  created () {
  },
  methods: {
    go (path) {
      this.$router.push(path)
    }
  }
}
</script>
<style scoped lang="scss">
  .title {
    p {
      border-bottom: 1px solid #ddd;
      height: 38px;
      line-height: 38px;
      display: flex;
      margin-bottom: 10px;
      span {
        font-size: 20px;
      }
      span:last-child {
        flex: 1;
        font-size: 14px;
        text-align: right;
        i {
          font-size: 14px;
        }
      }
    }
    p.m1 {
      b {
        font-size: 12px;
      }
    }
  }
</style>

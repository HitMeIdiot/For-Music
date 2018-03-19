<template>
  <div class="m3">
    <span>{{list.name}}：</span>
    <ul class="top">
      <li v-for="(i, index) in list.list" :key="index" @click="screen(i)">
        <span :class="[i.name===tabName?'active':'']">{{i.name}}</span> <i></i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  watch: {
  },
  components: {},
  props: {
    list: {},
    tabName: ''
  },
  created () {
  },
  methods: {
    screen (i) {
      this.$emit('change', i.name, i.type)
    }
  }
}
</script>
<style scoped lang="scss">
  .m3 {
    display: flex;
    align-items: baseline;
    span {
      flex-shrink: 0;
      font-size: 14px;
      color: #666;
    }
    .top {
      flex: 1;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      text-align: center;
      li {
        padding: 0 13px;
        font-size: 14px;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        color: #666666;
        position: relative;
        span {
          padding: 2px 3px;
          border-radius: 3px;
        }
        i {
          position: absolute;
          right: 0;
          height: 10px;
          width: 1px;
          background: #666;
          top: 13px;
        }
        span.active {
          background: #8F9096;
          color: #fff;
        }
      }
      li:hover {
        color: #333333;
      }
      li:last-child {
        i {
          display: none;
        }
      }
    }
  }
</style>

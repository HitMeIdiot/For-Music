<template>
  <div  class="tab">
    <ul>
      <li v-for="(i, index) in list"
          :key="index"
          :class="[index===actIndex?'active':'']"
          @click="cutTab(i,index)"
          v-if="i.name">
        <i>{{i.name}}</i>
      </li>
      <li v-for="(i, index) in list"
          :key="index"
          :class="[i.css==types?'active':'']"
          @click="cutTab(i,index)"
          v-if="i.css">
        <span v-show="i.css" :class="[i.css, 'iconfont']"></span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      actIndex: 0
    }
  },
  components: {},
  props: {
    list: {
      type: Array
    },
    types: {
      type: String
    }
  },
  created () {
  },
  methods: {
    cutTab (i, index) {
      if (i.name) {
        this.actIndex = index
        this.$parent.actIndex = index
      } else {
        if (i.type === 1) {
          this.$store.state.upCss = i.css
        } else {
          this.$store.state.downCss = i.css
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .tab {
    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      li {
        border: 1px solid #DCDCDD;
        text-align: center;
        color: #666;
        background: #fff;
        font-size: 12px;
        border-right: 0;
        cursor: pointer;
        padding: 4px 0;
        .iconfont {
          font-size: 14px;
          padding: 0 7.5px;
        }
        i {
          padding: 0 30px;
        }
      }
      li.active {
        background: #7C7D85;
        color: #E5E5E7;
        border: 1px solid #7C7D85 !important;
      }
      li.active + li {
        border-left: 0;
      }
      li:first-child {
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      }
      li:last-child {
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        border-right: 1px solid #DCDCDD;
      }
    }
  }
</style>

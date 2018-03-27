<template>
    <div class="page" v-show="comLength>0">
      <span class="iconfont icon-arrowleft" @click="prePage"></span>
      <ul>
        <li v-for="(i, index) in groupList"
            :key="index"
            @click="goPage(i, index)"
            :class="[$store.state.offset===i?'active':'', i==='...'?'ell':'']">
          <em v-if="i!=='...'">{{i+1}}</em>
          <em v-else>{{i}}</em>
          <b></b>
        </li>
      </ul>
      <span class="iconfont icon-arrowright" @click="nextPage"></span>
    </div>
</template>
<script>
export default {
  data () {
    return {
      isPreEll: false,
      isNextEll: false,
      current: 0
    }
  },
  props: {
    // 评论页数
    comLength: 0
  },
  computed: {
    offset () {
      return this.$store.state.offset
    },
    groupList () {
      // 获取分页码
      console.log('当前页', this.$store.state.offset)
      let pageNum = this.comLength
      let index = this.$store.state.offset
      let arr = []
      if (pageNum < 9 || pageNum === 9) {
        for (let i = 0; i < pageNum; i++) {
          arr.push(i)
        }
        return arr
      } else {
        if (index <= 2) return [0, 1, 2, 3, '...', pageNum - 1]
        if (index >= pageNum - 1) return [0, '...', pageNum - 4, pageNum - 3, pageNum - 2, pageNum - 1]
        if (index === 3) return [0, 1, 2, 3, 4, '...', pageNum - 1]
        if (index === pageNum - 2) return [0, '...', pageNum - 5, pageNum - 4, pageNum - 3, pageNum - 2, pageNum - 1]
        return [0, '...', index - 1, index, index + 1, '...', pageNum - 1]
      }
    }
  },
  components: {
  },
  created () {
    this.current = this.$store.state.offset
  },
  methods: {
    // 上一页
    prePage () {
      if (this.$store.state.offset === 0) {
        return false
      } else {
        this.$store.state.offset--
      }
      this.$emit('jumpPage')
    },
    // 下一页
    nextPage () {
      if (this.$store.state.offset >= this.comLength - 1) {
        return false
      } else {
        this.$store.state.offset++
      }
      this.$emit('jumpPage')
    },
    goPage (i, index) {
      if (i !== '...') {
        this.$store.state.offset = i
        this.$emit('jumpPage')
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .page {
    display: flex;
    justify-content: center;
    font-size: 16px;
    align-items: center;
    span.iconfont {
      border: 1px solid #E1E1E2;
      display: inline-block;
      width: 24px;
    }
    li,span.iconfont {
      height:24px;
      line-height: 24px;
      text-align: center;
      font-size: 12px;
      margin-left: 10px;
      cursor: pointer;
      flex-shrink: 0;
    }
    ul {
      display: flex;
      max-width: 374px;
      overflow: hidden;
      position: relative;
      .ellPre,.ellNext {
        position: absolute;
        width: 24px;
        background: red;
        height: 24px;
        text-align: center;
      }
      .ellPre {
        left: 44px;
      }
      .ellNext {
        right: 34px;
      }
      li.ell:hover {
        cursor: unset;
        background: unset;
        border: 1px solid transparent;
      }
      li {
        padding: 0 10px;
        border: 1px solid transparent;
      }
      li:hover {
        border: 1px solid #BEBFC2;
        background: #ECEDF1;
        font-weight: bold;
      }
      li.active {
        em {
          position: relative;
        }
        em:after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          background: #c62f2f;
          height: 1px;
        }
      }
      li.active:hover {
        border: 1px solid transparent;
        background: unset;
        cursor: unset;
      }
    }
  }
</style>

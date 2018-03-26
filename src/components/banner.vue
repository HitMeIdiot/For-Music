<template>
  <div class="main"  @mouseleave="leaveUl" @mouseover="hoverUl">
    <ul id="ban">
      <li v-for="(i,index) in bannerList" :key="index"
          :class="[count===index?'':'vis']">
        <img :src="i.pic" alt="">
      </li>
    </ul>
    <b class="iconfont icon-arrowleft" @click="minus" v-show="isControl"></b>
    <b class="iconfont icon-arrowright" @click="add" v-show="isControl"></b>
    <ul class="tab">
      <li v-for="(i,index) in bannerList" :key="index"
          @mouseleave="leaveLi(index)"
          @mouseover="hoverLi(index)">
        <span :class="[count===index?'active':'']">{{index}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { banner } from '@/api/api'
export default {
  name: 'banner',
  data () {
    return {
      bannerList: [],
      count: 0,
      direction: true,
      timer: '',
      ban: '',
      isControl: false
    }
  },
  created () {
    this.getBanner()
  },
  mounted () {
    this.ban = document.getElementById('ban')
    this.$store.state.timer = setInterval(() => {
      this.autoPlay()
    }, 4000)
  },
  methods: {
    getBanner () {
      banner().then((res) => {
        if (res.code === 200) {
          this.bannerList = res.banners
          this.ban.style.width = res.banners.length * 760 + 'px'
        }
      })
    },
    autoPlay () {
      this.count++
      this.ban.style.transform = 'translate(' + (-760 * this.count) + 'px)'
      if (this.count > this.bannerList.length - 1) {
        this.count = this.bannerList.length - 1
        this.ban.style.transform = 'translate(0)'
        this.count = 0
      }
    },
    hoverLi (i, e) {
      if (i < this.bannerList.length) {
        this.count = i
        this.ban.style.transform = 'translate(' + (-760 * this.count) + 'px)'
        clearInterval(this.$store.state.timer)
        if (e) {
          this.isControl = true
        }
      }
    },
    leaveLi () {
      this.$store.state.timer = setInterval(() => {
        this.autoPlay()
      }, 4000)
    },
    hoverUl () {
      this.isControl = true
      clearInterval(this.$store.state.timer)
    },
    leaveUl () {
      this.isControl = false
      this.$store.state.timer = setInterval(() => {
        this.autoPlay()
      }, 4000)
    },
    add () {
      this.count++
      if (this.count > this.bannerList.length - 1) {
        this.count = 0
      }
      this.ban.style.transform = 'translate(' + (-760 * this.count) + 'px)'
    },
    minus () {
      if (this.count > 0) {
        this.count--
      }
      this.ban.style.transform = 'translate(' + (-760 * this.count) + 'px)'
    }
  }
}
</script>
<style lang="scss" scoped>
  .main {
    width: 760px;
    overflow: hidden;
    text-align: center;
    position: relative;
    ul#ban {
      margin-bottom: 15px;
      transition: all 2s;
      overflow: hidden;
      font-size: 0;
      background: rgba(0,0,0,0.8);
      li {
        height: 190px;
        float: left;
        width: 760px;
        text-align: center;
        img {
          width: 540px;
          height: 200px;
        }
        &.vis {
          visibility: hidden;
          transition: all 2s;
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
    b.iconfont {
      position: absolute;
      left: 10px;
      top: 81px;
      font-size: 20px;
      color: #fff;
      cursor: pointer;
    }
    b.iconfont:nth-of-type(2) {
      left: unset;
      right: 10px;
    }
    ul.tab {
      width: 171px;
      margin: 0 auto;
      display: flex;
      font-size: 0;
      li {
        height: 10px;
        &:not(:last-child) {
          margin-right: 5px;
        }
        &:hover {
          cursor: pointer;
        }
        span {
          display: inline-block;
          width: 17px;
          height: 2px;
          background: #C8C8C8;
        }
        span.active {
          background: #c62f2f;
        }
      }
    }
  }
</style>

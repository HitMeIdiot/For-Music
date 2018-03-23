<template>
  <div class="main">
    <ul id="ban">
      <li v-for="(i,index) in bannerList" :key="index">
        <img :src="i.pic" alt="">
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
      actIndex: 0,
      count: 0,
      direction: true
    }
  },
  created () {
    this.getBanner()
  },
  mounted () {
    setInterval(() => {
      this.autoPlay()
    }, 3000)
  },
  methods: {
    getBanner () {
      banner().then((res) => {
        if (res.code === 200) {
          this.bannerList = res.banners
        }
      })
    },
    autoPlay () {
      let ban = document.getElementById('ban')
      if (this.direction) {
        this.count++
        ban.style.transform = 'translate(' + (-760 * this.count) + 'px)'
        if (this.count > this.bannerList.length - 1) {
          this.count = this.bannerList.length - 1
          ban.style.transform = 'translate(0)'
          this.direction = false
          this.count = 0
        }
      } else {
        this.count++
        ban.style.transform = 'translate(' + (-760 * this.count) + 'px)'
        if (this.count >= this.bannerList.length - 1) {
          this.direction = true
          this.count = -1
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .main {
    width: 760px;
    overflow: hidden;
    ul {
      height: 190px;
      margin-bottom: 15px;
      transition: all 2s;
      width: 4560px;
      li {
        height: 100%;
        float: left;
        img {
          width: 760px;
          height: 190px;
        }
      }
    }
  }
</style>

<template>
  <div>
    <ul>
      <li v-for="(i,index) in bannerList" :key="index" v-show="index===actIndex">
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
      actIndex: 0
    }
  },
  created () {
    this.getBanner()
    setInterval(() => {
      this.autoPlay()
    }, 30000)
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
      this.actIndex++
      if (this.actIndex >= this.bannerList.length) {
        this.actIndex = 0
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  ul {
    height: 190px;
    overflow: hidden;
    margin-bottom: 15px;
    li {
        height: 100%;
      img {
        width: 760px;
        height: 190px;
      }
    }
  }
</style>

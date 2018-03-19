<template>
  <div>
    <banner></banner>
    <tit title="推荐歌单">
      <router-link to="/find/songSheet" slot="more">更多 <i class="iconfont icon-arrowright"></i></router-link>
    </tit>
    <songs :list="personalizedList" types='1'></songs>
    <tit title="独家放送">
      <router-link to="/find/songSheet" slot="more">更多 <i class="iconfont icon-arrowright"></i></router-link>
    </tit>
    <sole></sole>
    <tit title="最新音乐">
      <router-link to="/find/newMusic" slot="more">更多 <i class="iconfont icon-arrowright"></i></router-link>
    </tit>
    <newSong></newSong>
    <tit title="推荐MV">
      <router-link to="/mv" slot="more">更多 <i class="iconfont icon-arrowright"></i></router-link>
    </tit>
    <mv :mvList="mvList"></mv>
    <tit title="主播电台">
      <router-link to="/find/anchorsRadio" slot="more">更多 <i class="iconfont icon-arrowright"></i></router-link>
    </tit>
    <radio></radio>
  </div>
</template>
<script>
import { personalized, personalizedMv, recommendResource } from '@/api/api'
import banner from '@/components/banner'
import tit from '@/components/title'
import songs from '@/components/songs'
import sole from '@/components/sole'
import newSong from '@/components/newSong'
import mv from '@/components/mv'
import radio from '@/components/radio'
export default {
  data () {
    return {
      personalizedList: [],
      mvList: [],
      type: 1
    }
  },
  components: {
    banner,
    songs,
    sole,
    newSong,
    mv,
    radio,
    tit
  },
  created () {
    this.getPerList()
    this.getMvList()
  },
  methods: {
    // 获取推荐歌单
    getPerList () {
      personalized().then((res) => {
        console.log('推荐歌单', res)
        if (res.code === 200) {
          if (this.isAll) {
            this.personalizedList = res.result
          } else {
            res.result.forEach((item, index) => {
              if (index < 9) {
                this.personalizedList.push(res.result[index])
              }
            })
          }
        }
      })
    },
    getDaySong () {
      recommendResource().then((res) => {
        console.log('推荐歌单', res)
      })
    },
    // 获取推荐MV
    getMvList () {
      personalizedMv().then((res) => {
        console.log('推荐MV', res)
        if (res.code === 200) {
          if (this.isAll) {
            this.mvList = res.result
          } else {
            res.result.forEach((item, index) => {
              if (index < 3) {
                this.mvList.push(res.result[index])
              }
            })
          }
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
</style>

<template>
    <div>
      <tit title="精品歌单"></tit>
      <songs :list="topPlayList" types="2"></songs>
    </div>
</template>
<script>
import { topPlayListHighQuality } from '@/api/api'
import songs from '@/components/songs'
import tit from '@/components/title'
export default {
  data () {
    return {
      topPlayList: []
    }
  },
  components: {
    songs,
    tit
  },
  created () {
    this.getTopPlayList(this.$store.state.songTag)
  },
  methods: {
    getTopPlayList (name) {
      topPlayListHighQuality({params: {limit: 60, cat: name}}).then((res) => {
        console.log('歌单', res)
        if (res.code === 200) {
          if (res.playlists.length === 0) {
            this.$toast(res.msg)
          } else {
            this.topPlayList = res.playlists
          }
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
</style>

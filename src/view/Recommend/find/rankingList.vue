<template>
    <div>
      <tit title="官方榜"></tit>
      <tit title="全球榜"></tit>
      <songs :list="topList"></songs>
    </div>
</template>
<script>
import { toplist, topListArtist } from '@/api/api'
import songs from '@/components/songs'
import tit from '@/components/title'
export default {
  data () {
    return {
      topList: [],
      artistList: []
    }
  },
  components: {
    songs,
    tit
  },
  created () {
    this.getTopList()
    this.getArtistList()
  },
  methods: {
    getTopList () {
      toplist({params: {idx: 6}}).then((res) => {
        console.log('全球榜', res)
        if (res.code === 200) {
          this.topList = res.list
        }
      })
    },
    getArtistList () {
      topListArtist({params: {idx: 6}}).then((res) => {
        console.log('歌手榜', res)
        if (res.code === 200) {
          this.artistList = res.list
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
</style>

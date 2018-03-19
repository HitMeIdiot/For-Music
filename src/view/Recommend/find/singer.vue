<template>
    <div>
      <div class="con">
        <classTab :list="lang" @change="change" :tabName="$store.state.langName"></classTab>
        <classTab :list="classify" @change="change" :tabName="$store.state.classifyName"></classTab>
        <classTab :list="alphabet" @change="change" :tabName="$store.state.alphabetName"></classTab>
      </div>
      <singers :lists="artistList"></singers>
    </div>
</template>
<script>
import { topArtists } from '@/api/api'
import singers from '@/components/singers'
import classTab from '@/components/classTab'
export default {
  data () {
    return {
      lang: {
        name: '语种',
        list: [
          {type: 'lang', name: '全部'},
          {type: 'lang', name: '华语'},
          {type: 'lang', name: '欧美'},
          {type: 'lang', name: '日本'},
          {type: 'lang', name: '韩国'},
          {type: 'lang', name: '其他'}
        ]
      },
      classify: {
        name: '分类',
        list: [
          {type: 'class', name: '全部'},
          {type: 'class', name: '男歌手'},
          {type: 'class', name: '女歌手'},
          {type: 'class', name: '乐队组合'}
        ]
      },
      alphabet: {
        name: '筛选',
        list: [
          {type: 'letter', name: '热门'},
          {type: 'letter', name: 'A'},
          {type: 'letter', name: 'B'},
          {type: 'letter', name: 'C'},
          {type: 'letter', name: 'D'},
          {type: 'letter', name: 'E'},
          {type: 'letter', name: 'F'},
          {type: 'letter', name: 'G'},
          {type: 'letter', name: 'H'},
          {type: 'letter', name: 'J'},
          {type: 'letter', name: 'K'},
          {type: 'letter', name: 'L'},
          {type: 'letter', name: 'M'},
          {type: 'letter', name: 'N'},
          {type: 'letter', name: 'O'},
          {type: 'letter', name: 'P'},
          {type: 'letter', name: 'Q'},
          {type: 'letter', name: 'R'},
          {type: 'letter', name: 'S'},
          {type: 'letter', name: 'T'},
          {type: 'letter', name: 'U'},
          {type: 'letter', name: 'V'},
          {type: 'letter', name: 'W'},
          {type: 'letter', name: 'X'},
          {type: 'letter', name: 'Y'},
          {type: 'letter', name: 'Z'},
          {type: 'letter', name: '#'}
        ]
      },
      artistList: []
    }
  },
  components: {
    singers,
    classTab
  },
  created () {
    this.getArtistList()
  },
  methods: {
    change (val, type) {
      if (type === 'lang') {
        this.$store.state.langName = val
      } else if (type === 'class') {
        this.$store.state.classifyName = val
      } else if (type === 'letter') {
        this.$store.state.alphabetName = val
      }
    },
    getArtistList () {
      topArtists({params: {idx: 6}}).then((res) => {
        console.log('歌手榜', res)
        if (res.code === 200) {
          this.artistList = res.artists
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .con {
    border-bottom: 1px solid #E1E1E2;
    padding-bottom: 10px;
    margin-bottom: 30px;
  }
</style>

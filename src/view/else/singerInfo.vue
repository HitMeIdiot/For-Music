<template>
    <div>
      <div class="up">
        <img :src="artistInfo.picUrl" alt="">
        <div class="rf">
          <div>
            <p><span>歌手</span><b>{{artistInfo.name}}</b></p>
            <p><i v-for="(i, index) in artistInfo.alias" :key="index">{{i}}</i></p>
          </div>
          <ul>
            <li><span class="iconfont icon-bo"></span><i>单曲数：</i>{{artistInfo.musicSize}}</li>
            <li><span class="iconfont icon-bo"></span><i>专辑数：</i>{{artistInfo.albumSize}}</li>
            <li><span class="iconfont icon-bo"></span><i>MV数：</i>未知</li>
          </ul>
        </div>
      </div>
      <div class="down">
        <div class="d1">
          <span v-for="(i, index) in songCom"
                :class="[act===index?'active':'']"
                @click="cut(index)"
                :key="index"
          >
            {{i.name}}
          </span>
        </div>
        <div class="d2">
          <album :list="albumList" v-show="act===0"></album>
          <singerMv v-show="act===1" :mvList="mvList"></singerMv>
          <ul v-show="act===2" class="intro">
            <li v-for="(i,index) in introduction" :key="index">
              <h3>{{i.ti}}</h3>
              <pre>{{i.txt}}</pre>
            </li>
          </ul>
          <div v-show="act===3">
            <singers :lists="artistList"></singers>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { artistDec, artistsAlbum, artistMv, simiPlayArtist } from '@/api/api'
import album from '@/components/album'
import singerMv from '@/components/singerMv'
import singers from '@/components/singers'
export default {
  data () {
    return {
      id: '',
      topicData: '',
      introduction: [],
      briefDesc: '',
      act: 0,
      songCom: [
        {name: '专辑'},
        {name: 'MV'},
        {name: '歌手详情'},
        {name: '相似歌手'}
      ],
      albumList: [],
      artistInfo: '',
      actIndex: 0,
      mvList: [],
      artistList: []
    }
  },
  watch: {
  },
  components: {
    album,
    singers,
    singerMv
  },
  created () {
    this.id = this.$route.query.descId
    this.getSingerInfo()
    this.getAlbum()
    this.getMv()
    this.getSameSinger()
  },
  methods: {
    getAlbum () {
      artistsAlbum({params: {id: this.id}}).then((res) => {
        console.log('歌手专辑', res)
        if (res.code === 200) {
          this.albumList = res.hotAlbums
          this.artistInfo = res.artist
        }
      })
    },
    getMv () {
      artistMv({params: {id: this.id}}).then((res) => {
        console.log('歌手MV', res)
        if (res.code === 200) {
          this.mvList = res.mvs
        }
      })
    },
    getSingerInfo () {
      artistDec({params: {id: this.id}}).then((res) => {
        console.log('歌手描述', res)
        if (res.code === 200) {
          this.briefDesc = res.briefDesc
          this.topicData = res.topicData
          this.introduction = res.introduction
        }
      })
    },
    getSameSinger () {
      simiPlayArtist({params: {id: this.id}}).then((res) => {
        console.log('相似歌手', res)
        if (res.code === 200) {
          this.artistList = res.artists
        }
      })
    },
    cut (index) {
      this.act = index
    }
  }
}
</script>
<style scoped lang="scss">
  .up {
    padding: 25px 15px 30px 30px;
    display: flex;
    >img {
      width: 200px;
      height: 200px;
      margin-right: 30px;
      flex-shrink: 0;
    }
    .rf {
      >div {
        p {
          display: flex;
          align-items: center;
          span {
            background: #c62f2f;
            color: #fff;
            font-size: 14px;
            padding: 2px 5px;
            border-radius: 3px;
          }
          b {
            font-size: 20px;
            margin-left: 10px;
          }
        }
        p:last-child {
          margin: 10px 0 15px 0;
          padding-left: 48px;
          font-size: 12px;
        }
      }
      ul {
        li {
          line-height: 30px;
          font-size: 12px;
          span {
            font-size: 12px;
          }
          i {
            margin: 0 5px;
          }
        }
      }
    }
  }
  .down {
    .d1 {
      border-bottom: 1px solid #c62f2f;
      display: flex;
      align-items: center;
      position: relative;
      padding-left: 30px;
      span {
        border: 1px solid #E1E1E2;
        padding: 0 10px;
        width: 82px;
        flex-shrink: 0;
        font-size: 12px;
        height: 30px;
        line-height: 30px;
        border-bottom: 0;
        text-align: center;
        margin-right: 5px;
        cursor: pointer;
        background: #fff;
      }
      span.active {
        background: #c62f2f;
        color: #fff;
        border: 1px solid #c62f2f;
      }
    }
    .d2 {
      padding: 25px 15px 30px 30px;
      .intro {
        li {
          h3 {
            font-size: 16px;
            color: #000;
            font-weight: bold;
          }
          pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            margin: 10px 0;
            font-size: 16px;
            color: #666;
            line-height: 30px;
          }
        }
      }
    }
  }
</style>

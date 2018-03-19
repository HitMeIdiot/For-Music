<template>
    <div class="music">
      <!--<div class="test" :style="{background: $store.state.songImg}"></div>-->
      <div class="test" :style="{ background: 'url('+$store.state.songImg+')' + 'no-repeat center', backgroundSize: '100% 100%' }"></div>
      <div class="up">
        <div class="ul">
          <img src="../../assets/img/zhen.png" alt="" class="g1">
          <div class="g2">
            <img :src="$store.state.songImg" alt="">
          </div>
          <div class="g3">
            <p><span class="iconfont icon-love"></span>喜欢</p>
            <p><span class="iconfont icon-shoucang"></span>收藏</p>
            <p><span class="iconfont icon-download"></span>下载</p>
            <p><span class="iconfont icon-fenxiang"></span>分享</p>
          </div>
        </div>
        <div class="ur">
          <h3>{{$store.state.songName}}</h3>
          <p class="r1">
            <span>专辑：<i @click="goAlbumDet($store.state.albumId)">{{$store.state.album}}</i></span>
            <span>歌手：<i  v-for="(j, k) in $store.state.songSinger" :key="k" @click="goSingerInfo(j.id)">
                      {{j.name}}
              <em v-show="k<$store.state.songSinger.length-1">/</em></i>
            </span>
            <span>来源：<i @click="goSongDet($store.state.songSheetId)">{{$store.state.songSheetName}}</i></span>
          </p>
          <div id="lyc_con" v-if="html!==''">
            <ul id="lyric">
              <li v-for="(i, index) in html" :key="index" :class="[act===index?'on':'', i==='&nbsp;'?'vis':'']">
                {{i}}
              </li>
            </ul>
          </div>
          <!--<p class="r3" v-if="lyricUser.userid">-->
            <!--歌词贡献者：<span @click="goUser(lyricUser.userid)">{{lyricUser.nickname}}</span>-->
          <!--</p>-->
          <!--<p class="r4" v-if="transUser.userid">-->
            <!--翻译贡献者：<span @click="goUser(transUser.userid)">{{transUser.nickname}}</span>-->
          <!--</p>-->
        </div>
      </div>
      <div class="down">
        <div class="dl">
          <tit title="听友评论">
            <i slot="more" class="comToa">(已有{{comInfo.total}}评论)</i>
          </tit>
          <comment :comInfo="comInfo" type="2" :resId="id"></comment>
          <paging :comLength="comLength" @jumpPage="getMusCom"></paging>
        </div>
        <div class="dr">
          <tit title="包含这首歌的歌单"></tit>
          <ul class="dr1">
            <li v-for="(i, index) in simPlayList" :key="index" @click="goSongDet(i.id)">
              <img :src="i.coverImgUrl" alt="">
              <div>
                <span>{{i.name}}</span>
                <p>播放：{{i.playCount | numFormat}}</p>
              </div>
            </li>
          </ul>
          <div v-if="simSong.length>0">
            <tit title="相似歌曲"></tit>
            <ul class="dr2">
              <li v-for="(i, index) in simSong" :key="index" @click="playSong(i)">
                <img :src="i.album.picUrl" alt="">
                <div>
                  <span>{{i.name}}</span>
                  <p>
                    <i  v-for="(j, k) in i.artists" :key="k">
                      {{j.name}}
                    <em v-show="k<i.artists.length-1">/</em>
                    </i>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <tit title="喜欢这首歌的人"></tit>
          <ul class="dr3">
            <li v-for="(i, index) in simUser" :key="index" @click="goUser(i.userId)">
              <img :src="i.avatarUrl" alt="">
              <span>{{i.nickname}}</span>
              <b>{{i.recommendReason}}</b>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
import { commentMusic, lyric, simiPlayUser, simiPlaylist, simiPlaySong } from '@/api/api'
import comment from '@/components/comment'
import paging from '@/components/paging'
import tit from '@/components/title'
import Bus from '@/components/bus'
export default {
  data () {
    return {
      id: '',
      comLength: 0,
      comInfo: {},
      url: '',
      lyric: '',
      lyricUser: {},
      transUser: {},
      index: 0,
      simUser: [],
      simPlayList: [],
      simSong: [],
      html: [],
      lycHtml: '',
      lyc: '',
      text_temp: '',
      parsed: '',
      act: -1
    }
  },
  computed: {
    getLyr () {
      return this.$store.state.playSongId
    }
  },
  watch: {
    getLyr (val) {
      this.getLyric(val)
      this.getMusCom(val)
      this.getSim(val)
    }
  },
  components: {
    comment,
    paging,
    tit
  },
  created () {
    this.url = this.$store.state.songImg
    this.getMusCom(this.getLyr)
    Bus.$on('getTarget', target => {
      setTimeout(() => {
        this.updateLyric(target)
      }, 1000)
    })
  },
  mounted () {
    this.getLyric(this.getLyr)
    this.getSim(this.getLyr)
  },
  methods: {
    timeUp () {
      alert(3)
    },
    goAlbumDet (id) {
      this.$router.push({path: '/albumDet', query: {albumId: id}})
    },
    goSingerInfo (id) {
      this.$router.push({path: '/singerInfo', query: {descId: id}})
    },
    playSong (i) {
      this.playMusic(i.id, i.name, i.album.blurPicUrl, i.album.artists)
    },
    goSongDet (id) {
      this.$router.push({path: '/songDet', query: {songSheetId: id}})
    },
    goUser (id) {
      this.$router.push({path: '/userIndex/userInfo', query: {userId: id}})
    },
    getMusCom (id) {
      commentMusic({params: {id: id, limit: 60, offset: this.$store.state.offset}}).then(
        (res) => {
          console.log(res)
          if (res.code === 200) {
            this.comInfo = res
            if (res.hotComments) {
              this.comLength = Math.ceil(res.total / 60)
              this.$store.state.wonderCom = res.hotComments
            }
          }
        }
      )
    },
    getLyric (id) {
      lyric({params: {id: id}}).then((res) => {
        console.log('歌词', res)
        if (res.code === 200) {
          if (res.lrc) {
            this.parseLyric(res.lrc.lyric)
          }
          if (res.lyricUser) {
            this.lyricUser = res.lyricUser
          }
          if (res.transUser) {
            this.transUser = res.transUser
          }
        }
      })
    },
    getSim (id) {
      simiPlayUser({params: {id: id}}).then((res) => {
        console.log('相似用户', res)
        if (res.code === 200) {
          this.simUser = res.userprofiles
        }
      })
      simiPlaylist({params: {id: id}}).then((res) => {
        console.log('相似歌单', res)
        if (res.code === 200) {
          this.simPlayList = res.playlists
        }
      })
      simiPlaySong({params: {id: id}}).then((res) => {
        console.log('相似歌曲', res)
        if (res.code === 200) {
          this.simSong = res.songs
        }
      })
    },
    // 处理歌词
    parseLyric (lrc) {
      let lyrics = lrc.split('\n')
      let lrcObj = {}
      for (let i = 0; i < lyrics.length; i++) {
        let lyric = decodeURIComponent(lyrics[i])
        let timeReg = /\[.*?\]/g
        let timeRegExpArr = lyric.match(timeReg)
        // console.log(timeRegExpArr)
        if (!timeRegExpArr) continue
        let clause = lyric.replace(timeReg, '')
        for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
          let t = timeRegExpArr[k]
          // console.log(t)
          let min = Number(String(t.match(/\[\d*/i)).slice(1))
          let sec = Number(String(t.match(/:\d*/i)).slice(1))
          let time = min * 60 + sec
          lrcObj[time] = clause
          // console.log(clause)
        }
      }
      // console.log(lrcObj)
      this.renderLyc(lrcObj)
      return lrcObj
    },
    // 渲染歌词
    renderLyc (data) {
      let lycCon = document.getElementById('lyc_con')
      this.html = []
      data.parsed = {}
      let i = -1
      for (let k in data) {
        let txt = data[k]
        if (!txt)txt = '&nbsp;'
        data.parsed[k] = {
          index: i++,
          text: txt,
          top: i * 40 - lycCon.offsetTop
        }
        if ((typeof data[k]) === 'string') {
          this.html.push(txt)
        }
      }
      delete data.parsed['parsed']
      this.parsed = data.parsed
    },
    // 滚动歌词
    updateLyric (time) {
      time = Math.round(time)
      let data = this.parsed
      let lrc = data[time]
      if (!lrc) return false
      let text = lrc.text
      // console.log(text)
      if (text !== this.text_temp) {
        this.locationLrc(lrc)
        this.text_temp = text
      }
    },
    locationLrc (lrc) {
      let lyc = document.getElementById('lyric')
      this.act = lrc.index + 1
      lyc.style.webkitTransform = 'translate(0, -' + lrc.top + 'px)'
    }
  }
}
</script>
<style scoped lang="scss">
  .music {
    background: #fff;
    height: 570px;
    min-height: 570px;
    overflow-y: scroll;
    padding-bottom: 40px;
    position: relative;
    .test {
      filter: blur(48px);
      height: 450px;
      opacity: 0.4;
    }
    .up {
      top: 0;
      position: absolute;
      padding-left: 80px;
      display: flex;
      width: 92%;
      .ul {
        width: 435px;
        flex-shrink: 0;
        .g2 {
          position: relative;
          margin: 50px 0 0 0;
          background: #101014;
          width: 325px;
          height: 325px;
          border-radius: 50%;
          font-size: 0;
          border: 8px solid #CACACA;
          background: linear-gradient(30deg, transparent 40%, rgba(42, 41, 40, .85) 40%) no-repeat 100% 0, linear-gradient(60deg, rgba(42, 41, 40, .85) 60%, transparent 60%) no-repeat 0 100%, repeating-radial-gradient(#2a2928, #0F1012 2px, #0F1012 3px, #2a2928 4px);
          background-size: 0 100%, 100% 0, 100% 100%;
          img {
            position: absolute;
            width: 220px;
            height: 220px;
            border-radius: 50%;
            border: 8px solid #000;
            left: 44.5px;
            top: 44.5px;
            -webkit-animation:run 60s linear 0s infinite;
          }
        }
        .g1 {
          top: 0;
          left: 220px;
          position: absolute;
          z-index: 888;
        }
        .g3 {
          display: flex;
          align-items: center;
          margin-top: 35px;
          p {
            border: 1px solid #AEB0B2;
            border-radius: 3px;
            margin-right: 10px;
            font-size: 14px;
            padding: 2px 8px;
            cursor: pointer;
            span.iconfont {
              font-size: 14px;
              margin-right: 5px;
            }
          }
        }
      }
      .ur {
        margin: 25px 0 0 0;
        font-size: 12px;
        flex: 1;
        position: relative;
        h3 {
          font-size: 22px;
          display: flex;
        }
        p.r1 {
          display: flex;
          margin: 10px 0 20px 0;
          width: 100%;
          span {
            width: 32%;
            flex-shrink: 0;
            margin-right: 1.333%;
            i {
              color: #0A4BAD;
              cursor: pointer;
            }
          }
          span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        #lyc_con {
          overflow-y: scroll;
          height: 355px;
          #lyric {
            font-size: 15px;
            li {
              text-align: left;
              line-height: 40px;
              font-size: 14px;
              &.on {
                color: #FFf;
              }
              &.vis {
                visibility: hidden;
              }
            }
          }
        }
        pre.r2 {
          font-size: 14px;
          overflow-y: scroll;
          height: 355px;
          line-height: 40px;
        }
        p.r3,p.r4 {
          position: absolute;
          left: 0;
          text-align: left;
          bottom: 35px;
          font-size: 14px;
          span {
            text-decoration: underline;
            cursor: pointer;
          }
        }
        p.r4 {
          bottom: 10px;
        }
      }
    }
    .down {
      width: 92%;
      padding-left: 80px;
      display: flex;
      margin-top: 30px;
      .dl {
        width: 550px;
        flex-shrink: 0;
        .comToa {
          float: left;
          color: #888;
          font-size: 12px;
          margin-left: 15px;
        }
      }
      .dr {
        width: 250px;
        margin-left: 68px;
        flex-shrink: 0;
        .dr3,.dr1,.dr2 {
          margin-bottom: 40px;
          li {
            display: flex;
            align-items: center;
            padding: 5px 0;
            cursor: pointer;
            font-size: 12px;
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              flex-shrink: 0;
            }
            span,b {
              flex: 1;
            }
            span {
              margin-left: 10px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            b {
              text-align: right;
            }
          }
          li:hover {
            background: rgba(236,237,238,0.4);
          }
        }
        .dr1,.dr2 {
          li {
            img {
              border-radius: 0;
              width: 40px;
              height: 40px;
            }
            div {
              flex: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 100%;
              span,b {
                flex: unset;
              }
              p {
                margin-left: 10px;
                color: #999;
              }
            }
          }
        }
      }
    }
  }
  @-webkit-keyframes run{
    from{
      -webkit-transform:rotate(0deg);
    }
    to{
      -webkit-transform:rotate(360deg);
    }
  }
</style>

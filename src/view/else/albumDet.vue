<template>
    <div>
      <div class="up">
        <img :src="sheetDet.picUrl" alt="">
        <div class="rf">
          <div class="m1">
            <span>专辑</span>
            <em>{{sheetDet.name}}
              <b v-if="alias.length>0">(<i v-for="(i,index) in alias" :key="index">{{i}}</i>)</b>
            </em>
          </div>
          <div class="m3">
            <p><em class="iconfont icon-bo"></em>播放全部 <b class="iconfont icon-add"></b></p>
            <p><em class="iconfont icon-bo"></em>收藏({{albumInfo.subscribedCount}})</p>
            <p><em class="iconfont icon-bo"></em>分享({{albumInfo.shareCount}})</p>
            <p><em class="iconfont icon-download"></em>下载全部</p>
          </div>
          <div class="m2">
            <p>歌手：<span @click="goSingerInfo()">{{artist.name}}</span></p>
            <p>时间：<i>{{new Date(sheetDet.publishTime).toLocaleString()}}</i></p>
          </div>
        </div>
      </div>
      <div class="down">
        <div class="d1">
          <span v-for="(i, index) in songCom"
                :class="[act===index?'active':'']"
                @click="cut(index)"
                :key="index"
          >
            {{i.name}} <i v-show="index===1">({{albumInfo.commentCount}})</i>
          </span>
        </div>
        <div class="d2">
          <table v-show="act===0">
            <thead>
              <tr>
                <td></td>
                <td>操作</td>
                <td>音乐标题</td>
                <td>歌手</td>
                <td>专辑</td>
                <td>时长</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(i, index) in tracks" :key="index" @dblclick="playSong(i,index)">
                <td>
                  <p>
                    <span >
                      <span class="iconfont icon-shengyin" style="color: red" v-if="$store.state.playSongId===i.id"></span>
                      <span v-else><i v-show="index<9">0</i><b>{{index+1}}</b></span>
                    </span>
                  </p>
                </td>
                <td>
                  <span class="icon-love iconfont"></span>
                  <span class="icon-download iconfont"></span>
                </td>
                <td><span>{{i.name}}</span></td>
                <td><span v-for="(j,k) in i.ar" :key="k" @click="goSingerInfo(j.id)">{{j.name}} <b v-show="k<i.ar.length-1">/</b></span></td>
                <td><span>{{sheetDet.name}}</span></td>
                <td>{{i.dt | timeFormat}}</td>
              </tr>
            </tbody>
          </table>
          <div v-show="act===1" class="c1">
            <comment :comInfo="comInfo"></comment>
            <paging :comLength="comLength" @jumpPage="getComList"></paging>
          </div>
          <div v-show="act===2" class="c2">
            <h3>专辑介绍</h3>
            <pre>
              {{sheetDet.description}}
            </pre>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { album, commentAlbum } from '@/api/api'
import comment from '@/components/comment'
import paging from '@/components/paging'
export default {
  data () {
    return {
      id: '',
      sheetDet: '',
      tracks: '',
      creator: '',
      act: 0,
      comInfo: {},
      mp3Url: '',
      hideClass: false,
      play: -1,
      comLength: 0,
      songCom: [
        {name: '歌曲列表'},
        {name: '评论'},
        {name: '专辑详情'}
      ],
      albumInfo: '',
      artist: '',
      alias: ''
    }
  },
  components: {
    comment,
    paging
  },
  watch: {
  },
  created () {
    this.id = this.$route.query.albumId
    this.getMvDet()
  },
  methods: {
    goSingerInfo (id) {
      if (id) {
        this.$router.push({path: '/singerInfo', query: {descId: id}})
      } else {
        this.$router.push({path: '/singerInfo', query: {descId: this.artist.id}})
      }
    },
    // 双击播放歌曲
    playSong (i, index) {
      this.playMusic(i.id, i.name, i.al.picUrl, i.ar)
    },
    // 专辑详情
    getMvDet () {
      album({params: {id: this.id}}).then((res) => {
        console.log('专辑详情', res)
        let arr = []
        if (res.code === 200) {
          this.sheetDet = res.album
          this.albumInfo = res.album.info
          this.alias = res.album.alias
          this.artist = res.album.artist
          res.songs.forEach((item) => {
            item.isPlay = false
          })
          arr = res.songs
          this.tracks = arr
        }
      })
    },
    cut (index) {
      this.act = index
      this.hideClass = false
      if (index === 1) {
        this.getComList()
        this.$store.state.offset = 0
        this.$store.state.goPageIndex = 0
        this.$store.state.isFirstPage = true
      }
    },
    // 专辑评论
    getComList () {
      commentAlbum({params: {id: this.id, offset: this.$store.state.offset, limit: 60}}).then((res) => {
        console.log('歌单评论', res)
        if (res.code === 200) {
          this.comInfo = res
          this.comLength = Math.ceil(res.total / 60)
          // console.log('页数', this.comLength)
          if (res.hotComments) {
            this.$store.state.wonderCom = res.hotComments
          }
        }
      })
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
      flex: 1;
      .m1,.m3 {
        margin-bottom: 20px;
        display: flex;
      }
      .m2 {
        font-size: 14px;
        p{
          margin-bottom: 10px;
          span,i {
            color: #666;
          }
          span {
            cursor: pointer;
          }
          span:hover {
            color: #333;
          }
        }
      }
      .m1 {
        span {
          display: inline-block;
          width: 40px;
          border-radius: 3px;
          flex-shrink: 0;
          font-size: 14px;
          text-align: center;
          color: #fff;
          height: 22px;
          line-height: 22px;
          margin-top: 4px;
          background: #c62f2f;
        }
        em {
          margin-left: 5px;
          font-size: 22px;
          width: 475px;
          flex-shrink: 0;
          font-weight: bold;
          b {
            color: #666;
          }
        }
      }
      .m3 {
        p:first-child {
          color: #C62F2F;
          padding-right: 0;
          border: 1px solid #E5A7A7;
          b {
            padding: 0 5px;
            border-left: 1px solid #F4E4E4;
            margin-left: 10px;
          }
        }
        p {
          border: 1px solid #e1e2e3;
          border-radius: 3px;
          margin-right: 10px;
          padding: 0 10px;
          height: 25px;
          line-height: 25px;
          font-size: 13px;
          display: flex;
          align-items: center;
          cursor: pointer;
          em.iconfont {
            margin-right: 7px;
          }
        }
        p:hover {
          background: #F5F5F7;
        }
      }
      .m4 {
        ul {
          li {
            font-size: 12px;
          }
          li:first-child {
            b {
              cursor: pointer;
              color: #0C73C2;
              em {
                color: #6A6AAF;
                margin: 0 2px;
              }
            }
          }
          li:last-child {
            position: relative;
            pre {
              flex-grow: 1;
              color: #838383;
              white-space: pre-wrap;
              word-wrap: break-word;
              line-height: 24px;
              overflow: hidden;
              height: 20px;
              span {
                color: #333333;
              }
            }
            pre.hideClass {
              height: unset;
            }
            span.icon-arrowdown,span.icon-arrowup {
              font-size: 12px;
              position: absolute;
              right: 0;
              bottom: 0;
              font-weight: bold;
              cursor: pointer;
            }
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
      span:nth-child(2) {
        padding: 0 10px;
        width: unset;
      }
    }
    .d2 {
      .c1,.c2 {
        padding: 20px 25px 30px 30px;
      }
      .c2 {
        font-size: 16px;
        h3 {
          font-weight: bold;
        }
        pre {
          margin-left: 30px;
          color: #666;
          line-height: 30px;
          font-size: 14px;
        }
      }
      table {
        width: 100%;
        margin-bottom: 30px;
        td {
          height: 30px;
          line-height: 30px;
          font-size: 12px;
        }
        tbody,thead {
          tr {
            display: flex;
            td {
              padding-left: 10px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            td:nth-child(1) {
              border-left: 0;
              width: 50px;
              text-align: right;
              padding-right: 10px;
              padding-left: 0;
            }
            td:nth-child(2) {
              width: 55px;
            }
            td:nth-child(3) {
              width: 245px;
              i {
                color: #999;
              }
            }
            td:nth-child(4) {
              width: 166px;
            }
            td:nth-child(5) {
              width: 170px;
            }
            td:nth-child(4)>span, td:nth-child(5)>span {
              cursor: pointer;
            }
          }
        }
        tbody {
          tr:nth-child(add) {
            background: #F5F5F7;
          }
          tr:nth-child(even) {
            background: #fff;
          }
          tr:hover {
            background: #EBECED;
          }
          td:nth-child(1),td:nth-child(2) {
            color: #B2B2B4;
          }
          td:nth-child(2) {
            span {
              cursor: pointer;
            }
            span:first-child {
              margin-right: 5px;
            }
          }
        }
      }
      thead {
        border-bottom: 1px solid #ddd;
        td {
          border-left: 1px solid #ddd;
        }
        td:nth-child(n+3):hover {
          background: #EBECED;
        }
      }
    }
  }
</style>

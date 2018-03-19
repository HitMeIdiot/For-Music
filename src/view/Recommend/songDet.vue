<template>
    <div>
      <div class="up">
        <img :src="sheetDet.coverImgUrl" alt="">
        <div class="rf">
          <div class="m1">
            <span>歌单</span>
            <em>{{sheetDet.name}}</em>
            <div>
              <i>歌曲数</i>
              <p>{{sheetDet.trackCount}}</p>
            </div>
            <div>
              <i>播放数</i>
              <p>{{sheetDet.playCount | numFormat}}</p>
            </div>
          </div>
          <div class="m2">
            <img :src="creator.avatarUrl" alt="" @click="goUser(creator.userId)">
            <span @click="goUser(creator.userId)">{{creator.nickname}}</span>
            <i>{{turnTime(sheetDet.createTime, 'type')}} 创建</i>
          </div>
          <div class="m3">
            <p><em class="iconfont icon-bo"></em>播放全部 <b class="iconfont icon-add"></b></p>
            <p><em class="iconfont icon-bo"></em>收藏({{sheetDet.subscribedCount}})</p>
            <p><em class="iconfont icon-bo"></em>分享({{sheetDet.shareCount}})</p>
            <p><em class="iconfont icon-download"></em>下载全部</p>
          </div>
          <div class="m4">
            <ul>
              <li>
                <pre><span>标签：</span><b v-for="(i, index) in sheetDet.tags" :key="index" @click="goSongSheet(i)">{{i}}<em v-show="index<sheetDet.tags.length-1">/</em></b>
                </pre>
              </li>
              <li>
                <pre :class="[hideClass?'hideClass':'']"><span>简介：</span>{{sheetDet.description}}</pre>
                <p v-show="!hideClass">...</p>
                <span :class="[hideClass?'icon-arrowup':'icon-arrowdown', 'iconfont']" @click="hide"></span>
              </li>
            </ul>
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
            {{i.name}} <i v-show="index===1">({{sheetDet.commentCount}})</i>
          </span>
          <input type="search" placeholder="搜索歌单音乐" v-show="act===0">
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
                <td><span>{{i.name}} <i v-for="(j,k) in i.alias" :key="k" >({{j}})</i></span></td>
                <td><span v-for="(j,k) in i.artists" :key="k" @click="goSingerInfo(j.id)">{{j.name}} <b v-show="k<i.artists.length-1" >/</b></span></td>
                <td><span>{{i.album.name}}</span></td>
                <td>{{i.duration | timeFormat}}</td>
              </tr>
            </tbody>
          </table>
          <div v-show="act===1" class="c1">
            <comment :comInfo="comInfo" type="2" :resId="id"></comment>
            <paging :comLength="comLength" @jumpPage="getComList"></paging>
          </div>
          <div v-show="act===2" class="c2">
            <p>暂无收藏者</p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { playlistDetail, commentPlaylist } from '@/api/api'
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
        {name: '收藏者'}
      ]
    }
  },
  computed: {
    getNewId () {
      return this.$route.query.songSheetId
    }
  },
  components: {
    comment,
    paging
  },
  watch: {
    getNewId (val) {
      this.getSheetDet(val)
    }
  },
  created () {
    this.id = this.$route.query.songSheetId
    this.getSheetDet(this.id)
  },
  methods: {
    goSingerInfo (id) {
      this.$router.push({path: '/singerInfo', query: {descId: id}})
    },
    // 双击播放歌曲
    playSong (i, index) {
      console.log(i)
      this.$store.state.album = i.album.name
      this.$store.state.albumId = i.album.id
      this.playMusic(i.id, i.name, i.album.blurPicUrl, i.album.artists)
    },
    // 歌单详情
    getSheetDet (id) {
      playlistDetail({params: {id: id}}).then((res) => {
        console.log('歌单详情', res)
        let arr = []
        if (res.code === 200) {
          this.sheetDet = res.result
          this.creator = res.result.creator
          // this.tracks = res.result.tracks
          res.result.tracks.forEach((item) => {
            item.isPlay = false
          })
          arr = res.result.tracks
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
      }
    },
    // 歌单评论
    getComList () {
      let timestamp = new Date().getTime()
      commentPlaylist({params: {id: this.id, offset: this.$store.state.offset, limit: 60, timestamp: timestamp}}).then((res) => {
        console.log('歌单评论', res)
        if (res.code === 200) {
          this.comInfo = res
          this.comLength = Math.ceil(res.total / 60)
          console.log('页数', this.comLength)
          if (res.hotComments) {
            this.$store.state.wonderCom = res.hotComments
          }
        }
      })
    },
    hide () {
      this.hideClass = !this.hideClass
    },
    goSongSheet (i) {
      this.$store.state.songTag = i
      this.$router.push({path: '/find/songSheet'})
    },
    goUser (id) {
      this.$router.push({path: '/userIndex/userInfo', query: {userId: id}})
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
      .m1,.m2,.m3 {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
      }
      .m1 {
        span {
          display: inline-block;
          width: 40px;
          border-radius: 3px;
          flex-shrink: 0;
          border: 1px solid #C62F2F;
          font-size: 14px;
          text-align: center;
          color: #c62f2f;
          height: 21px;
          line-height: 21px;
        }
        em {
          margin-left: 5px;
          font-size: 20px;
          width: 330px;
          flex-shrink: 0;
          margin-right: 10px;
        }
        div {
          text-align: right;
          flex-grow: 1;
          font-size: 14px;
          color: #999999;
          border-right: 1px solid #999;
          padding-left: 10px;
          padding-right: 10px;
          p {
            font-weight: bold;
            text-align: right;
          }
        }
        div:nth-of-type(2) {
          border-right: none;
          padding-left: 10px;
          padding-right: 0;
        }
      }
      .m2 {
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        span {
          margin-left: 8px;
          font-size: 15px;
          color: #66667D;
        }
        span:hover,img:hover  {
          cursor: pointer;
        }
        i {
          font-size: 14px;
          color: #8C8C8C;
          margin-left: 20px;
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
      input {
        width: 174px;
        position: absolute;
        right: 0;
        border-radius: 10px;
        border: 1px solid #ddd;
        padding-left: 10px;
        font-size: 14px;
      }
      input::-webkit-input-placeholder {
        font-size: 14px;
        color: #CFCFCF;
      }
    }
    .d2 {
      .c1,.c2 {
        padding: 20px 25px 30px 30px;
      }
      .c2 {
        p {
          text-align: center;
          margin-top: 40px;
          font-size: 16px;
          color: #888888;
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

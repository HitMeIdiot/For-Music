<template>
    <div class="lf" @mousewheel="moreDyn($event)" id="dyn">
      <tit title="动态"></tit>
      <div class="con" v-for="(i, index) in eventList" :key="index">
        <div class="m">
          <img :src="i.user.avatarUrl" alt="" @click="goUser(i.user.userId)">
          <div>
            <p>
              <em @click="goUser(i.user.userId)">{{i.user.nickname}}</em>
              <b v-if="i.info.commentThread.resourceTitle">{{i.info.commentThread.resourceTitle.split('：')[0]}}</b>
            </p>
            <p>{{turnTime(i.eventTime)}}</p>
          </div>
        </div>
        <div class="m1">
          <h3>{{JSON.parse(i.json).msg}}</h3>
        </div>
        <div class="m2" v-if="JSON.parse(i.json).song" @click="play(JSON.parse(i.json).song)">
          <img :src="JSON.parse(i.json).song.album.picUrl" alt="" >
          <div>
            {{JSON.parse(i.json).song.name}}
            <b v-if="JSON.parse(i.json).song.alias.length>0">{{JSON.parse(i.json).song.alias}}</b>
            <p>
              <i v-for="(m,n) in JSON.parse(i.json).song.artists" :key="n">{{m.name}}</i>
            </p>
          </div>
        </div>
        <div class="m2 m3" v-if="JSON.parse(i.json).playlist" @click="goAlbum(JSON.parse(i.json).playlist)">
          <img :src="JSON.parse(i.json).playlist.coverImgUrl" alt="" >
          <div>
            <em>歌单</em>{{JSON.parse(i.json).playlist.name}}
            <p>
              by {{JSON.parse(i.json).playlist.creator.nickname}}
            </p>
          </div>
        </div>
        <div class="m2 m6" v-if="JSON.parse(i.json).mv" @click="goAlbum(JSON.parse(i.json).playlist)">
          <videoPlay></videoPlay>
        </div>
        <!--图片放大-->
        <div class="m7" v-if="i.pics.length>0&&zoom&&actDyn===index">
          <p>
            <span @click="zoom=false"><i class="iconfont icon-download"></i>收起</span>
            <span @click="tranImg(i.pics)"><i class="iconfont icon-download" @click="viewRec"></i>查看原图</span>
            <span><a class="iconfont icon-download"></a>下载</span>
          </p>
          <img :src="j.originUrl" alt=""
               v-for="(j,k) in i.pics"
               :key="k" :class="[i.pics.length>1?'normal':'', actImg===k?'active':'', path==='/userIndex/dynamic'?'paImg':'',actImg===k&&j.width>460?'overWidth':'' ]"
          @click="zoomIn(j,k)">
          <p v-if="i.pics.length>1">
            <b v-for="(j,k) in i.pics" :key="k" :class="[actImg===k?'active':'']" @click="cutImg(k)"></b>
          </p>
        </div>
        <!--正常显示的图片-->
        <div class="m4" v-else>
          <img :src="j.pcSquareUrl" alt="" v-for="(j,k) in i.pics" :key="k" :class="[i.pics.length>1?'normal':'']" @click="zoomOut(j,k,index)">
        </div>
        <!--查看原图-->
        <!--<div class="oriImg">-->
          <!--<span class="iconfont icon-left"></span>-->
          <!--<img :src="j.originUrl" alt="" v-for="(j,k) in i.pics" :key="k" :class="[i.pics.length>1?'normal':'']" @click="zoomOut(j,k,index)">-->
          <!--<span class="iconfont icon-right"></span>-->
        <!--</div>-->
        <div class="m5">
          <div>
            <span class="iconfont icon-zan"><b>({{i.info.likedCount}})</b></span>
            <span class="iconfont icon-fenxiang"><b>({{i.info.shareCount}})</b></span>
            <span class="iconfont icon-icon-test"><b>({{i.info.commentCount}})</b></span>
            <span>
              ...
              <!--<layer>-->
                <!--<div slot="lay" class="lay_con">-->
                  <!--<ul>-->
                    <!--<li>-->
                        <!--<p><i class="iconfont icon-bo"><b>下一首播放</b></i></p>-->
                      <!--</li>-->
                      <!--<li>-->
                        <!--<i class="iconfont icon-bo"><b>举报</b></i>-->
                      <!--</li>-->
                  <!--</ul>-->
                <!--</div>-->
              <!--</layer>-->
            </span>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import tit from '@/components/title'
import layer from '@/components/layer'
import videoPlay from '@/components/video'
import Bus from '@/components/bus'
export default {
  data () {
    return {
      profile: {},
      actImg: 0,
      zoom: false,
      actDyn: 0,
      path: ''
    }
  },
  props: {
    userId: '',
    eventList: {
      type: Array
    }
  },
  components: {
    tit,
    videoPlay,
    layer
  },
  created () {
    this.path = this.$route.path
  },
  methods: {
    tranImg (img) {
      this.$store.state.isCover = true
      Bus.$emit('getImg', img, this.actImg)
    },
    cutImg (k) {
      this.actImg = k
    },
    zoomOut (j, k, index) {
      // 放大
      this.actImg = k
      this.zoom = true
      this.actDyn = index
    },
    zoomIn (j, k) {
      this.actImg = k
      this.zoom = false
    },
    viewRec () {

    },
    play (i) {
      this.$store.state.album = i.album.name
      this.$store.state.duration = i.duration
      this.$store.state.albumId = i.album.id
      this.playMusic(i.id, i.name, i.album.blurPicUrl, i.album.artists)
    },
    goAlbum (i) {
      this.$router.push({path: '/songDet', query: {songSheetId: i.id}})
    },
    goUser (id) {
      this.$router.push({path: '/userIndex/userInfo', query: {userId: id}})
    },
    moreDyn (e) {
      // let dyn = document.getElementById('dyn')
      // console.log(dyn.scrollHeight)
      // console.log(dyn.clientHeight)
      // var oTop = document.body.scrollTop === 0 ? document.documentElement.scrollTop : document.body.scrollTop
      // console.log(oTop)
    }
  }
}
</script>
<style scoped lang="scss">
  .lf {
    padding: 15px 30px 0 0;
    flex: 1;
    .con:last-child {
      border-bottom: none;
    }
    .con {
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
      .m1 {
        h3 {
          font-size: 14px;
          line-height: 25px;
          margin-bottom: 10px;
        }
      }
      .m1,.m3,.m4,.m5 {
        padding-left: 50px;
      }
      .m3 {
        em {
          border: 1px solid #c62f2f;
          color: #c62f2f;
          padding: 0 2px;
          margin-right: 5px;
        }
      }
      .m4 {
        font-size: 0;
        width: 390px;
        img {
          width: 50%;
          margin: 0 5px 5px 0;
          cursor: zoom-in;
        }
        img.normal {
          width: 110px;
        }
        img.normal {
          margin-right: 5px;
        }
        img.normal:nth-child(3n) {
          margin-right: 0;
        }
      }
      .m2 {
        margin: 0 0 10px 50px;
        display: flex;
        background: #EEEEEF;
        padding: 10px;
        align-items: center;
        cursor: pointer;
        font-size: 14px;
        img {
          width: 40px;
          height: 40px;
          margin-right: 10px;
          flex-shrink: 0;
        }
        p {
          color: #888;
        }
        &:hover {
          background: #EAEAEB;
        }
      }
      .m6 {
        background: none;
        padding: 0;
      }
      .oriImg {
        position: absolute;
        width: 100%;
        left: 0;
        height: 100%;
        top: 0;
        background: red;
      }
      .m7 {
        margin: 0 0 10px 50px;
        background: #EAEAEB;
        padding: 10px;
        img {
          display: none;
        }
        img.active {
          display: block;
          margin: 0 auto;
        }
        img.paImg {
          padding: 0 120px;
        }
        img.overWidth {
          width: 100%;
        }
        img:hover {
          cursor: zoom-out;
        }
        p:nth-of-type(2) {
          display: flex;
          justify-content: center;
          padding-top: 10px;
          b {
            width: 7px;
            height: 7px;
            background: #BBBBBB;
            border-radius: 50%;
            margin: 0 5px;
            cursor: pointer;
          }
          b.active {
            background: #c62f2f;
          }
        }
        p:first-child {
          display: flex;
          margin-bottom: 10px;
          span {
            position: relative;
            cursor: pointer;
            font-size: 14px;
            padding-right: 20px;
            color: #444444;
            .iconfont {
              font-size: 14px;
            }
          }
          span:after {
            content: '';
            position: absolute;
            height: 12px;
            width: 1px;
            background: #D6D6D7;
            top: 3px;
            right: 10px;
          }
        }
      }
      .m5 {
        font-size: 14px;
        margin-top: 20px;
        >div {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          i {
            color: #888;
          }
          span {
            font-size: 14px;
            color: #888;
            float: right;
            padding-left: 40px;
            cursor: pointer;
            position: relative;
            b {
              margin-left: 5px;
            }
          }
          span:first-child {
            padding-left: 0;
          }
          span:last-child {
            position: relative;
            .lay_con {
              ul {
                li {
                  line-height: 30px;
                  .iconfont {
                    color: #010101;
                    font-size: 14px;
                    b {
                      margin-left: 10px;
                    }
                  }
                }
              }
            }
          }
          span:nth-of-type(n+2):after {
            content: '';
            position: absolute;
            height: 10px;
            left: 20px;
            background: #E3E3E5;
            width: 1px;
            top: 4.5px;
          }
        }
      }
      .m {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-right: 10px;
          cursor: pointer;
        }
        >div {
          height: 40px;
          line-height: 20px;
          p {
            font-size: 14px;
          }
          p:first-child {
            em {
              color: #0A63A8;
              margin-right: 10px;
              cursor: pointer;
            }
            b {
              color: #888;
            }
          }
          p:nth-of-type(2) {
            color: #888;
          }
        }
      }
    }
  }
</style>

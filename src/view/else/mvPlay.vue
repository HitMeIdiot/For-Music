<template>
    <div class="mv_play">
      <div class="lf">
        <div class="bar">
          <div>
            <span class="iconfont icon-arrowleft"></span>
            <em>MV</em>
            <b>{{mvInfo.name}}</b>
            <p><i v-for="(i,index) in mvInfo.artists" :key="index">{{i.name}} <span v-show="index<mvInfo.artists.length-1">/</span></i></p>
          </div>
        </div>
        <div class="play">
          <videoPlay></videoPlay>
        </div>
        <div class="c0">
          <ul>
            <li>
              <span class="iconfont icon-zan"></span>
              <b>赞({{mvInfo.likeCount}})</b>
            </li>
            <li>
              <span class="iconfont icon-zan"></span>
              <b>收藏({{mvInfo.subCount}})</b>
            </li>
            <li>
              <span class="iconfont icon-zan"></span>
              <b>分享({{mvInfo.shareCount}})</b>
            </li>
          </ul>
        </div>
        <div class="c1">
          <comment :comInfo="comInfo"></comment>
          <paging :comLength="comLength" @jumpPage="getMvCom"></paging>
        </div>
      </div>
      <div class="rf">
        <tit title="MV介绍"></tit>
        <div class="m2">
          <span>
            发布时间：{{mvInfo.publishTime}}
          </span>
          <b>播放次数：{{mvInfo.playCount}}</b>
        </div>
        <div class="m1">
          <p>{{mvInfo.briefDesc}}</p>
          <pre v-if="mvInfo.desc"><span>简介：</span>{{mvInfo.desc}}</pre>
        </div>
        <div class="m3">
          <tit title="相关推荐"></tit>
          <ul>
            <li v-for="(i, index) in sameMv" :key="index" @click="cutMv(i.id)">
              <img :src="i.cover" alt="">
              <div>
                <h4>{{i.name}}</h4>
                <span>{{i.duration | timeFormat}}</span>
                <p>
                  by
                  <b v-for="(j, k) in i.artists" :key="k">
                    {{j.name}}
                    <i v-show="k<i.artists.length"></i>
                  </b>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
import { mvUrl, mv, commentMv, simiPlayMv } from '@/api/api'
import videoPlay from '@/components/video'
import comment from '@/components/comment'
import paging from '@/components/paging'
import tit from '@/components/title'
export default {
  data () {
    return {
      mvId: '',
      mvInfo: '',
      comLength: '',
      comInfo: '',
      sameMv: []
    }
  },
  components: {
    videoPlay,
    paging,
    tit,
    comment
  },
  created () {
    this.mvId = this.$route.query.mvId
    this.getMvUrl(this.mvId)
    this.getMvCom(this.mvId)
    this.getSameMv(this.mvId)
  },
  methods: {
    cutMv (id) {
      this.getMvUrl(id)
      this.getMvCom(id)
      this.getSameMv(id)
    },
    getMvUrl (id) {
      mv({params: {mvid: id}}).then((res) => {
        console.log('MV详情', res)
        if (res.code === 200) {
          this.mvInfo = res.data
          this.url = res.data.brs[240]
          this.$store.state.mp4Url = res.data.brs[240]
        }
      })
    },
    playMv () {
      mvUrl({params: {url: this.url}}).then((res) => {
        console.log('播放mv', res)
      })
    },
    getMvCom (id) {
      commentMv({params: {id: id, offset: this.$store.state.offset, limit: 60}}).then((res) => {
        console.log('MV评论', res)
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
    getSameMv (id) {
      simiPlayMv({params: {mvid: id}}).then((res) => {
        console.log('相似MV', res)
        if (res.code === 200) {
          this.sameMv = res.mvs
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .mv_play{
    padding: 30px 20px;
    height: 620px;
    min-height: 620px;
    display: flex;
    overflow-y: scroll;
    position: relative;
    .lf {
      width: 690px;
      margin-right: 30px;
      flex-shrink: 0;
      .c0 {
        ul {
          display: flex;
          align-items: center;
          li {
            font-size: 12px;
            border: 1px solid #E1E1E2;
            padding: 3px  5px;
            border-radius: 3px;
            background: #fff;
            margin-right: 10px;
            cursor: pointer;
          }
        }
      }
      .c1 {
        padding-bottom: 30px;
      }
      .play {
        width: 690px;
        height: 400px;
      }
      .bar {
        text-align: left;
        div {
          height: 28px;
          line-height: 28px;
          position: relative;
          display: flex;
          span.iconfont {
            font-size: 20px;
            font-weight: bold;
          }
          b {
            display: inline-block;
            margin-left: 40px;
            font-size: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          em {
            position: absolute;
            top: 4px;
            left: 20px;
            border: 1px solid #c62f2f;
            color: #c62f2f;
            font-size: 14px;
            padding: 0 3px;
            margin: 0 5px;
            width: 30px;
            height: 20px;
            line-height: 20px;
          }
          p {
            margin-left: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            i {
              color: #888;
              font-size: 12px;
              vertical-align: sub;
            }
          }
        }
      }
    }
    .rf {
      width: 250px;
      flex-shrink: 0;
      .m1 {
        font-size: 12px;
        line-height: 20px;
        color: #666;
      }
      .m2 {
        display: flex;
        margin-bottom: 10px;
        font-size: 12px;
        color: #888;
        b {
          text-align: right;
          flex: 1;
        }
      }
      .m3 {
        margin-top: 30px;
        ul {
          li {
            display: flex;
            margin-bottom: 15px;
            align-items: center;
            position: relative;
            img {
              height: 70px;
              width: 120px;
              flex-shrink: 0;
              cursor: pointer;
            }
            div {
              width: 130px;
              padding-left: 10px;
              h4 {
                font-size: 14px;
              }
              span,p {
                font-size: 12px;
                color: #888;
              }
              p,h4 {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              h4,b {
                cursor: pointer;
              }
              p {
                position: absolute;
                left: 130px;
                bottom: 0;
                width: 130px;
              }
            }
          }
        }
      }
    }
  }
</style>

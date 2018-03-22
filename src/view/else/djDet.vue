<template>
    <div>
      <div class="up">
        <img :src="djDet.picUrl" alt="">
        <!--<img src="http://ox36g1rgh.bkt.clouddn.com/ava.jpg" alt="">-->
        <div class="rf">
          <div class="m1">
            <span>电台</span>
            <em>{{djDet.name}}</em>
          </div>
          <div class="m2">
            <img :src="dj.avatarUrl" alt="" @click="goUser(dj.userId)">
            <span @click="goUser(dj.userId)">{{dj.nickname}}</span>
          </div>
          <div class="m3">
            <p><em class="iconfont icon-bo"></em>播放全部 <b class="iconfont icon-add"></b></p>
            <p><em class="iconfont icon-bo"></em>订阅({{djDet.subCount}})</p>
            <p><em class="iconfont icon-bo"></em>分享({{djDet.shareCount}})</p>
          </div>
          <div class="m4">
            <ul>
              <li>
                <pre :class="[hideClass?'hideClass':'']"><span @click="go">{{djDet.category}}</span>{{djDet.desc}}</pre>
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
            {{i.name}}
          </span>
        </div>
        <ul class="d2">
          <li v-for="(i, index) in programs" :key="index" @dblclick="play(i,index)">
            <ul>
              <li>{{index}}</li>
              <li>
                <img :src="i.coverUrl" alt="">
              </li>
              <li>{{i.name}}</li>
              <li>播放：{{i.listenerCount}}</li>
              <li>赞：{{i.likedCount}}</li>
              <li>{{turnTime(i.createTime,'ty')}}</li>
              <li>{{i.duration | timeFormat}}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
import { djDetail, djProgram } from '@/api/api'
export default {
  data () {
    return {
      djDet: {},
      rid: '',
      hideClass: false,
      dj: {},
      songCom: [
        {name: '歌曲列表'},
        {name: '订阅者'}
      ],
      act: 0,
      programs: []
    }
  },
  components: {},
  created () {
    this.rid = this.$route.query.rid
    this.getDJDet(this.rid)
  },
  methods: {
    play (i, index) {
      this.$store.state.album = i.mainSong.album.name
      this.$store.state.duration = i.duration
      this.$store.state.albumId = i.mainSong.album.id
      this.playMusic(i.mainTrackId, i.name, i.coverUrl, i.mainSong.artists)
    },
    getDJDet (rid) {
      djDetail({params: {rid: rid}}).then((res) => {
        console.log('电台详情', res)
        if (res.code === 200) {
          this.djDet = res.djRadio
          this.dj = res.djRadio.dj
        }
      })
      djProgram({params: {rid: rid}}).then((res) => {
        console.log('电台节目', res)
        if (res.code === 200) {
          this.programs = res.programs
        }
      })
    },
    goUser (id) {
      this.$router.push({path: '/userIndex/userInfo', query: {userId: id}})
    },
    hide () {
      this.hideClass = !this.hideClass
    },
    go () {
      this.$router.push({path: 'find/anchorsRadio', query: {djId: this.djDet.categoryId}})
    },
    cut (index) {
      this.act = index
    }
  }
}
</script>
<style scoped lang="scss">
  .up {
    padding: 25px 40px 30px 30px;
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
          font-size: 14px;
          text-align: center;
          color: #fff;
          height: 21px;
          line-height: 21px;
          background: #c62f2f;
        }
        em {
          margin-left: 5px;
          font-size: 20px;
          width: 330px;
          flex-shrink: 0;
          margin-right: 10px;
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
          li {
            position: relative;
            pre {
              flex-grow: 1;
              color: #333333;
              white-space: pre-wrap;
              word-wrap: break-word;
              line-height: 24px;
              overflow: hidden;
              height: 24px;
              span {
                cursor: pointer;
                color: #c62f2f;
                border: 1px solid #c62f2f;
                padding: 2px;
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
      li {
        font-size: 12px;
        &:nth-child(2n) {
          background: #fafafa;
        }
        &:nth-child(2n-1) {
          background: #F5F5F7;
        }
        ul {
          padding: 10px 0;
          display: flex;
          align-items: center;
          li {
            flex: 1;
            background: unset !important;
            text-align: center;
            img {
              width: 40px;
              height: 40px;
            }
            &:nth-child(n+4) {
              flex: 2;
              color: #888;
            }
            &:nth-of-type(3) {
              width: 300px;
              flex-shrink: 0;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              flex: unset;
              text-align: left;
            }
          }
          &:hover {
            background: #EBECED;
          }
        }
      }
    }
  }
</style>

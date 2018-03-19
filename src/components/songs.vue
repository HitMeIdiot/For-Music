<template>
    <div  class="song">
      <ul :class="[types==='1'?'noAll':'', types==='2'?'fine':'', types?'':'all']">
        <li @click="goDaily" v-if="currentPath=='/find/personRecommend'" class="daily">
          <div>
            <h3>
              <em>{{day}}</em>
              <em>{{new Date().getDate()}}</em>
            </h3>
            <p>根据你的音乐口味生成每日更新</p>
          </div>
          <p>每日推荐</p>
        </li>
        <li @click="goFine" v-if="currentPath=='/find/songSheet'">
          <div>
            <img src="http://ox36g1rgh.bkt.clouddn.com/ava.jpg" alt="">
          </div>
          <p>精品歌单倾心推荐，给最懂音乐的你</p>
        </li>
        <li @click="goRec" v-if="currentPath=='/userIndex/userInfo'">
          <div>
            <img src="http://ox36g1rgh.bkt.clouddn.com/ava.jpg" alt="">
          </div>
          <p>听歌排行</p>
        </li>
        <li v-for="(i,index) in list" :key="index" @click="goSongDet(i)">
          <div>
            <img :src="i.picUrl" alt="" v-if="i.picUrl">
            <img :src="i.coverImgUrl" alt="" v-if="i.coverImgUrl" @click="goSongDets(i)">
            <p v-if="types==='1'||types==='2'" class="one">{{i.copywriter}}</p>
            <p v-if="types==='2'" class="two" @click="goUser(i.userId)">by {{i.creator.nickname}}</p>
            <i class="iconfont icon-bo"></i>
            <span><b class="iconfont icon-erji"></b><em>{{i.playCount | numFormat}}</em></span>
          </div>
          <p @click="goSongDets(i)">{{i.name}}</p>
        </li>
      </ul>
    </div>
</template>
<script>
export default {
  data () {
    return {
      currentPath: ''
    }
  },
  computed: {
    day () {
      let val = new Date().getDay()
      if (val === 1) {
        return '星期一'
      } else if (val === 2) {
        return '星期二'
      } else if (val === 3) {
        return '星期三'
      } else if (val === 4) {
        return '星期四'
      } else if (val === 5) {
        return '星期五'
      } else if (val === 6) {
        return '星期六'
      } else if (val === 7) {
        return '星期天'
      }
    }
  },
  props: {
    list: {
      type: Array
    },
    types: {
      type: String
    }
  },
  components: {
  },
  created () {
    this.currentPath = this.$router.history.current.path
  },
  methods: {
    goSongDet (i) {
      this.$store.state.songSheetId = i.id
      this.$store.state.songSheetName = i.name
      if (this.types !== '2') {
        this.$router.push({path: '/songDet', query: {songSheetId: i.id}})
      }
    },
    goSongDets (i) {
      this.$store.state.songSheetId = i.id
      this.$store.state.songSheetName = i.name
      if (this.types === '2') {
        this.$router.push({path: '/songDet', query: {songSheetId: i.id}})
      }
    },
    goDaily () {
      this.$router.push({path: '/dailyRec'})
    },
    goRec () {
      this.$router.push({path: '/userIndex/listenRec'})
    },
    goFine () {
      this.$router.push({path: '/find/fineSong'})
    },
    goUser (id) {
      this.$router.push({path: '/userIndex/userInfo', query: {userId: id}})
    }
  }
}
</script>
<style scoped lang="scss">
  .song {
    ul.all,ul.noAll {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      li {
        width: 18%;
        height: 184px;
        margin-bottom: 20px;
        margin-right: 2.5%;
        div {
          position: relative;
          height: 140px;
          margin-bottom: 7px;
          img {
            width: 100%;
            height: 100%;
            z-index: 80;
          }
          p {
            display: none;
          }
          i {
            display: none;
          }
          span {
            position: absolute;
            right: 0;
            top: 0;
            width: 100%;
            background: linear-gradient(right,rgba(132,132,139,.2),rgba(206,203,203,.1));
            text-align: right;
            b,em {
              padding-right: 5px;
              color: #fff;
              font-size: 12px;
            }
          }
        }
        div:hover {
          p {
            display: inline-block;
            position: absolute;
            padding: 8px;
            height: 40px;
            background: rgba(104,108,113, 0.6);
            z-index: 99;
            font-size: 12px;
            left: 0;
            top: 0;
            color: #fff;
            overflow:hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
          }
          i {
            display: inline-block;
            position: absolute;
            right: 5px;
            bottom: 0;
            color: rgba(255,255,255,.7);
            font-size: 28px;
          }
          span {
            display: none;
          }
        }
        p {
          font-size: 12px;
          width: 100%;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      li.daily {
        h3 {
          background: #fff;
          width: 100%;
          height: 100%;
          border: 1px solid #ddd;
          text-align: center;
          em:nth-of-type(1) {
            margin-top: 15px;
            display: block;
            color: #666;
          }
          em:nth-of-type(2) {
            font-size: 80px;
            color: #c62f2f;
          }
        }
      }
      li:hover {
        cursor: pointer;
        p {
          color: #111111;
        }
      }
    }
    ul.all {
      li {
        width: 23.5%;
        height: 224px;
        margin-right: 2%;
        div {
          height: 178px;
        }
        div:hover {
          span {
            display: block;
          }
        }
      }
      li:nth-child(4n) {
        margin-right: 0;
      }
    }
    ul.noAll {
      li:nth-child(5n) {
        margin-right: 0;
      }
    }
    ul.fine {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      li {
        width: 50%;
        position: relative;
        font-size: 0;
        img {
          width: 100px;
          height: 100px;
          flex-shrink: 0;
          cursor: pointer;
        }
        div {
          border-bottom: 1px solid #ddd;
          padding: 20px 0;
          i {
            display: none;
          }
          .iconfont {
            font-size: 12px;
          }
          p.one {
            top: 90px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 70%;
            color: #666;
            cursor: auto;
          }
          p.two {
            top: 60px;
            color: #888888;
          }
          p.two:hover {
            color: #666;
          }
        }
        span {
          position: absolute;
          left: 50px;
          top: 25px;
          color: #fff;
          font-size: 12px;
        }
        p {
          position: absolute;
          top: 30px;
          left: 110px;
          font-size: 12px;
          cursor: pointer;
        }
      }
      li:nth-child(1),li:nth-child(2) {
        p {
          top: 20px;
        }
        div {
          padding-top: 10px;
          span {
            top: 15px;
          }
          p.one {
            top: 80px;
          }
          p.two {
            top: 50px;
          }
        }
      }
    }
  }
</style>

<template>
  <div id="main">
    <div class="content">
      <div class="leftCon">
        <div class="lfMenu">
          <div v-for="(item, k) in menuList" :key="k">
            <p class="title">{{item.menuName}}</p>
            <ul class="menu">
              <li v-for="(i, index) in item.list"
                  :key="index">
                <router-link :to="i.path">
                  <span :class="[i.icon, 'iconfont']"></span>{{i.name}}
                  <i></i>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="songSheet">
            <p class="title" @click="create">
              <b>创建的歌单</b>
              <span class="iconfont icon-tianjia"></span>
              <span :class="[show?'icon-arrowdown':'icon-arrowright', 'iconfont']"></span>
            </p>
            <ul v-show="show">
              <li v-for="(i, index) in myCreate" :key="index" @click="goSongSheet(i.id)">
                <a href="javaScript:;">
                  <span class="iconfont icon-gedan"></span>{{i.name}}
                </a>
              </li>
            </ul>
            <p class="title" @click="creates">
              <b>收藏的歌单</b>
              <span :class="[show?'icon-arrowdown':'icon-arrowright', 'iconfont']"></span>
            </p>
            <ul v-show="shows">
              <li v-for="(i, index) in otherCreate" :key="index" @click="goSongSheet(i.id)">
                <a href="javaScript:;">
                  <span class="iconfont icon-gedan"></span>{{i.name}}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="play">
          <div @click="goMusPlay">
            <img :src="$store.state.songImg" alt="">
            <span>
              <i></i>
            </span>
          </div>
          <div>
            <p>
              <i>{{$store.state.songName}} </i>
              <span :class="[isLove?'icon-like':'icon-love', 'iconfont']" @click="addLove"></span>
            </p>
            <p>
              <b v-for="(i, index) in $store.state.songSinger" :key="index">
                {{i.name}}
                <em v-show="index<$store.state.songSinger.length-1">/</em>
              </b>
              <span class="iconfont icon-del"></span>
            </p>
          </div>
        </div>
      </div>
      <div class="rightCon">
        <router-view></router-view>
      </div>
    </div>
    <!--<footer>-->
      <!--<audioPlay></audioPlay>-->
    <!--</footer>-->
  </div>
</template>

<script>
import banners from '@/components/banner'
import audioPlay from '@/components/audio'
import { userPlaylist } from '@/api/api'
export default {
  data () {
    return {
      menuList: [
        {
          menuName: '推荐',
          list: [
            {icon: 'icon-yinle', name: '发现音乐', id: 1, path: '/find/personRecommend'},
            {icon: 'icon-xinhao', name: '私人FM', id: 2, path: '/privateFM'},
            {icon: 'icon-mv', name: 'MV', id: 3, path: '/mv'},
            {icon: 'icon-friend', name: '朋友', id: 4, path: '/friend'}
          ]
        }
        // {
        // menuName: '我的音乐',
        // list: [
        // {icon: 'icon-yinlemusic214', name: '本地音乐', id: 5, path: '/localMusic'},
        // {icon: 'icon-download', name: '下载管理', id: 6, path: '/download'},
        // {icon: 'icon-yun', name: '我的音乐云盘', id: 7, path: '/cloudMusic'},
        // {icon: 'icon-diantai', name: '我的电台', id: 8, path: '/radioSet'},
        // {icon: 'icon-shoucang', name: '我的收藏', id: 9, path: '/myCollect'}
        // ]
        // }
      ],
      actIndex: 1,
      show: false,
      shows: false,
      isLove: false,
      myId: '',
      myCreate: [],
      otherCreate: []
    }
  },
  components: {
    banners,
    audioPlay
  },
  created () {
    if (sessionStorage.myId) {
      this.getUserSongSheet(sessionStorage.myId)
    }
  },
  methods: {
    goMusPlay () {
      this.$router.push({path: '/musicPlay', query: ''})
    },
    create () {
      this.show = !this.show
    },
    creates () {
      this.shows = !this.shows
    },
    cutMenu (item) {
      this.actIndex = item.id
      this.$router.push({path: item.path})
    },
    // 添加喜欢歌曲
    addLove () {
      this.isLove = !this.isLove
    },
    goSongSheet (id) {
      this.$router.push({path: '/songDet', query: {songSheetId: id}})
    },
    getUserSongSheet (id) {
      userPlaylist({params: {uid: id}}).then((res) => {
        console.log('用户详情', res)
        if (res.code === 200) {
          res.playlist.forEach((item, index) => {
            if (item.userId === parseInt(id)) {
              this.myCreate.push(item)
            } else {
              this.otherCreate.push(item)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  #main {
    footer {
      border-top: 1px solid #E1E1E2;
      height: 49px;
      background: #F6F6F8;
      margin: 0 auto;
    }
    .content {
      display: flex;
      height: 570px;
      min-height: 570px;
      .leftCon {
        background: #F5F5F7;
        text-align: left;
        width: 199px;
        min-width: 199px;
        position: relative;
        border-right: 1px solid #E1E1E2;
        .lfMenu {
          height: 510px;
          overflow-x: hidden;
        }
        p.title {
          color: #7D7D7D;
          padding-left: 10px;
          height: 32px;
          line-height: 32px;
          font-size: 14px;
        }
        ul {
          li {
            height: 32px;
            line-height: 32px;
            cursor: pointer;
            position: relative;
            font-size: 12px;
            color: #5C5C5C;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            a {
              display: inline-block;
              width: 100%;
              padding-left: 15px;
              span.iconfont {
                margin-right: 10px;
                font-size: 14px;
              }
            }
            a.router-link-active {
              background: #E6E7EA;
              i {
                position: absolute;
                left: 0;
                width: 3px;
                background: #C62F2F;
                height: 32px;
              }
            }
          }
          li.active {
            background: #E6E7EA;
            i {
              position: absolute;
              left: 0;
              width: 3px;
              background: #C62F2F;
              height: 32px;
            }
          }
          li:hover {
            color: #000;
          }
        }
        .songSheet {
          margin-top: 10px;
          p.title {
            display: flex;
            align-items: center;
            cursor: pointer;
            margin-right: 20px;
            b {
              flex-grow: 8;
              font-weight: normal;
            }
            .iconfont {
              text-align: right;
              flex-grow: 1;
              font-size: 14px;
              color: #CFCFD1;
            }
            .icon-arrowright,.icon-arrowdown {
              font-size: 12px;
              text-align: right;
            }
            .iconfont:hover {
              color: #939394;
            }
          }
          p.title:nth-of-type(2) {
            margin-bottom: 0;
          }
        }
        .play {
          width: 198px;
          display: flex;
          height: 60px;
          background: #fff;
          padding: 7px;
          align-items: center;
          font-size: 12px;
          cursor: pointer;
          div:first-child {
            position: relative;
            width: 44px;
            height: 44px;
            margin-right: 8px;
            img {
              flex-grow: 2;
              width: 44px;
              height: 44px;
            }
          }
          div:first-child:hover {
            span, i {
              width: 44px;
              height: 44px;
              position: absolute;
              left: 0;
              top: 0;
            }
            span {
              background: rgba(40,40,40,.5);
              i {
                background: url("../assets/img/full.png") center no-repeat;
                background-size: 100%;
              }
            }
          }
          div:last-child {
            flex-grow: 8;
            width: 130px;
            p {
              width: 132px;
              padding-right: 20px;
              height: 17px;
              align-items: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              i,b{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              b:first-child{
                flex-shrink: 0;
              }
              span.iconfont {
                font-size: 12px;
                width: 20px;
                flex-shrink: 0;
                position: absolute;
                right: 0;
              }
              span.icon-like {
                color: #C62F2F;
              }
            }
            p:last-child {
              margin-top: 4px;
              color: #7D7D7D;
              i:hover {
                color: #2c3e50;
              }
            }
          }
        }
      }
      .rightCon {
        width: 820px;
        min-width: 820px;
        background: #FAFAFA;
        text-align: left;
        position: relative;
        overflow-x: hidden;
        /*padding: 15px 30px 30px 30px;*/
      }
    }
  }
</style>

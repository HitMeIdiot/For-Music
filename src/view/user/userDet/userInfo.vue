<template>
    <div class="user_index">
      <div>
        <div class="u_up">
          <img :src="profile.avatarUrl" alt="">
          <div class="upRg">
            <tit :title="profile.nickname">
              <div slot="more">
                <span class="edit">编辑个人信息</span>
              </div>
            </tit>
            <div class="r2">
              <p v-for="(i, index) in list" :key="index" @click="go(index)">
                <em v-if="index===0">{{profile.eventCount}}</em>
                <em v-else-if="index===1">{{profile.follows}}</em>
                <em v-else-if="index===2">{{profile.followeds}}</em>
                <i>{{i.name}}</i>
              </p>
            </div>
            <ul class="u_ul">
              <li>
                <p><span>个人介绍：</span>
                  <i v-if="profile.signature">{{profile.signature}}</i>
                  <i v-else>暂无介绍</i>
                </p>
              </li>
              <li>
                <p>
                  <span>社交网络：
                    <i v-for="(j ,k) in bind" :key="k">
                      <a v-if="j.url&&j.type===2" :href="j.url" class="iconfont icon-weibo" target="_Blank"></a>
                    </i>
                    <em v-if="bind.length===0||(!bind[0].url&&bind.length===1)">未绑定</em>
                  </span>
                </p>
              </li>
              <li>
                <p><span>所在地区：</span>{{profile.city}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="u_down">
          <div class="u_tit">
            <div>
              <div class="one">
                <p v-if="myId==userId">我创建的歌单</p>
                <p v-else>歌单</p>
                <tab :list="tabList" :types="$store.state.upCss"></tab>
              </div>
              <div class="userSong" v-show="$store.state.upCss==='icon-caidan1'">
                <songs :list="myCreate" types="1"></songs>
              </div>
              <self :list="myCreate" v-show="$store.state.upCss==='icon-caidan'"></self>
              <selfList :list="myCreate" v-show="$store.state.upCss==='icon-caidan2'"></selfList>
            </div>
            <div>
              <div class="one">
                <p v-if="myId==userId">我收藏的歌单</p>
                <p v-else>收藏</p>
                <tab :list="tabLists" :types="$store.state.downCss"></tab>
              </div>
              <div class="userSong" v-show="$store.state.downCss==='icon-caidan1'">
                <songs :list="otherCreate" types="1"></songs>
              </div>
              <self :list="otherCreate" v-show="$store.state.downCss==='icon-caidan'"></self>
              <selfList :list="otherCreate" v-show="$store.state.downCss==='icon-caidan2'"></selfList>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { userSubcount, userDetail, userPlaylist, userRecord } from '@/api/api'
import iconTit from '@/components/icon_tit'
import tit from '@/components/title'
import songs from '@/components/songs'
import tab from '@/components/tab_com'
import self from '@/components/selfSong'
import selfList from '@/components/self_list'
export default {
  data () {
    return {
      profile: {},
      list: [
        {name: '动态'},
        {name: '关注'},
        {name: '粉丝'}
      ],
      tabList: [
        {css: 'icon-caidan1', type: 1},
        {css: 'icon-caidan', type: 1},
        {css: 'icon-caidan2', type: 1}
      ],
      tabLists: [
        {css: 'icon-caidan1', type: 2},
        {css: 'icon-caidan', type: 2},
        {css: 'icon-caidan2', type: 2}
      ],
      userId: '',
      bind: [],
      myCreate: [],
      otherCreate: [],
      myId: '',
      act: 0
    }
  },
  components: {
    iconTit,
    songs,
    tab,
    self,
    selfList,
    tit
  },
  created () {
    this.userId = this.$route.query.userId
    sessionStorage.userId = this.$route.query.userId
    this.myId = sessionStorage.myId
    this.getUserDets()
    this.getUserDet(this.userId)
    this.getUserSongSheet(this.userId)
    this.getUserRecord(this.userId)
  },
  methods: {
    go (index) {
      if (index === 0) {
        this.$router.push({path: '/userIndex/dynamic', query: {userId: this.userId}})
      } else if (index === 1) {
        this.$router.push({path: '/userIndex/follow', query: {userId: this.userId}})
      } else if (index === 2) {
        this.$router.push({path: '/userIndex/fans', query: {userId: this.userId}})
      }
    },
    getUserDets () {
      userSubcount().then((res) => {
        console.log('用户歌单和收藏数量', res)
        if (res.code === 200) {
          this.userDet = res
        }
      })
    },
    getUserDet (id) {
      userDetail({params: {uid: id}}).then((res) => {
        console.log('用户详情', res)
        if (res.code === 200) {
          this.profile = res.profile
          this.bind = res.bindings
        }
      })
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
    },
    getUserRecord (id) {
      userRecord({params: {uid: id, type: 1}}).then((res) => {
        console.log('用户播放记录', res)
        if (res.code === 200) {
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .user_index{
    .u_up {
      display: flex;
      padding: 15px 30px 30px 30px;
      img {
        width: 200px;
        height: 200px;
        margin-right: 30px;
        flex-shrink: 0;
      }
      .upRg {
        flex: 1;
        .edit {
          background: #fff;
          padding: 3px;
          border: 1px solid #ddd;
          border-radius: 3px;
        }
        .r2 {
          display: flex;
          p {
            cursor: pointer;
            text-align: left;
            width: 15%;
            flex-shrink: 0;
            position: relative;
            font-size: 14px;
            color: #444444;
            em {
              display: block;
              font-weight: bold;
              font-size: 20px;
            }
          }
          p:not(:last-child):after {
            content: '';
            position: absolute;
            height: 100%;
            width: 1px;
            background: #ddd;
            top: 0;
            right: 35%;
          }
        }
        .u_ul {
          font-size: 12px;
          color: #666;
          li {
            margin: 10px 0;
            span {
              color: #010101;
            }
          }
          li:nth-of-type(2) {
            span {
              .iconfont {
                font-size: 16px;
                color: #EA4747;
              }
            }
            em {
              color: #666;
            }
          }
        }
      }
    }
    .u_down {
      .userSong {
        padding: 10px 30px;
      }
      .one {
        border-bottom: 1px solid #ddd;
        border-top: 1px solid #ddd;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        padding: 2px 30px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        p {
          flex: 1;
        }
      }
    }
  }
</style>

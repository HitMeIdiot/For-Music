<template>
  <div id="index">
    <over :list="imgList" :actImg="actImg"></over>
    <header>
      <div class="h1">
        我是LOGO
      </div>
      <div class="h2">
        <b>
          <span class="iconfont icon-arrowleft" @click="back"></span>
          <span class="iconfont icon-arrowright" @click="go"></span>
        </b>
        我是搜索框
      </div>
      <div class="h3">
        <!--<img :src="myId?'http://ox36g1rgh.bkt.clouddn.com/ava.jpg':''" alt="">-->
        <img src='http://ox36g1rgh.bkt.clouddn.com/ava.jpg' v-if="myId">
        <b class="iconfont icon-weidenglu-touxiang" v-else></b>
        <span @click="log">
          <em>{{myName?myName:'未登录'}}</em><i class="iconfont icon-xiala"></i>
        </span>
        <div class="drop" v-show="showDrop">
          <ul>
            <li>
              <img src='http://ox36g1rgh.bkt.clouddn.com/ava.jpg'>
              <em>{{myName?myName:'未登录'}}</em>
              <i @click="sign" :style="{color: isSign?'#C0C0C0':'',cursor: isSign?'initial':'pointer'}">{{isSign?'已签到':'签到'}}</i>
            </li>
            <li></li>
            <li @click="loginOut">
              <span class="iconfont icon-weidenglu-touxiang"></span>
              退出登录
            </li>
          </ul>
        </div>
      </div>
    </header>
    <login ref="log"></login>
    <transition name="fold">
      <router-view></router-view>
    </transition>
    <footer v-if="$route.path!=='/mvPlay'">
      <audioPlay></audioPlay>
    </footer>
  </div>
</template>
<script>
import login from '@/components/login'
import audioPlay from '@/components/audio1'
import over from '@/components/over'
import Bus from '@/components/bus'
import {dailySignIn} from '@/api/api'
export default {
  name: 'index',
  data () {
    return {
      myId: '',
      actImg: 0,
      imgList: [],
      showDrop: false,
      isSign: false
    }
  },
  components: {
    login,
    over,
    audioPlay
  },
  created () {
    this.myId = sessionStorage.myId
    this.myName = sessionStorage.myName
    this.isSign = JSON.parse(sessionStorage.user).pcSign
    Bus.$on('getImg', (target, actImg) => {
      this.imgList = target
      this.actImg = actImg
      console.log(this.imgList)
    })
  },
  methods: {
    log () {
      if (!this.myId) {
        this.$refs.log.showLog()
      } else {
        this.showDrop = !this.showDrop
      }
    },
    go () {
      window.history.go(1)
    },
    back () {
      window.history.go(-1)
    },
    loginOut () {
      sessionStorage.clear()
      window.location.reload()
    },
    // 签到
    sign () {
      if (!this.isSign) {
        dailySignIn({params: {type: 1}}).then(res => {
          console.log('签到', res)
          if (res.code === 200) {
            this.isSign = true
          } else {
            this.$toast(res.msg)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  #index {
    position: relative;
    width: 1020px;
    max-width: 1020px;
    margin: 0 auto;
    box-shadow: 0 0 8px 6px #E1E1E2;
    header {
      padding: 0 15px;
      height: 50px;
      background: #C62F2F;
      margin: 0 auto;
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 12px;
      .h1,.h2 {
        width: 190px;
        flex-shrink: 0;
      }
      .h2 {
        width: 475px;
        display: flex;
        align-items: center;
        b {
          width: 52px;
          border: 1px solid #A82828;
          display: flex;
          span {
            flex: 1;
            font-size: 12px;
            text-align: center;
            cursor: pointer;
            &:first-child {
              position: relative;
              &:after {
                position: absolute;
                content: '';
                right: 0;
                top: 0;
                height: 17px;
                width: 1px;
                background: #A82828;
              }
            }
          }
        }
      }
      .h3 {
        flex: 1;
        display: flex;
        align-items: center;
        position: relative;
        img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          cursor: pointer;
          border: 1px solid transparent;
        }
        b {
          font-size: 20px;
        }
        span {
          margin: 0 5px;
          cursor: pointer;
          position: relative;
          .iconfont {
            font-size: 12px;
            margin-left: 5px;
          }
        }
        .drop {
          width: 275px;
          height: 365px;
          position: absolute;
          top: 38px;
          left: -90px;
          background: #fff;
          z-index: 8888;
          box-shadow: 0 0 3px 1px #E1E1E2;
          border-radius: 3px;
          padding-top: 20px;
          ul {
            color: #666;
            font-size: 14px;
            li {
              display: flex;
              align-items: center;
              padding: 0 20px;
              cursor: pointer;
              &:first-child {
                em {
                  flex: 1;
                }
                img {
                  width: 40px;
                  height: 40px;
                  margin-right: 10px;
                  flex-shrink: 0;
                }
                i {
                  border: 1px solid #ddd;
                  padding: 3px 14px;
                  border-radius: 3px;
                  font-size: 12px;
                }
              }
              &:nth-child(2) {
                height: 255px;
              }
              &:nth-of-type(3) {
                border-top: 1px solid #ddd;
                height: 50px;
              }
              &:not(:first-child):hover {
                background: #EBECED;
              }
            }
          }
        }
      }
    }
    footer {
      border-top: 1px solid #E1E1E2;
      height: 50px;
      background: #F6F6F8;
      margin: 0 auto;
    }
  }
</style>

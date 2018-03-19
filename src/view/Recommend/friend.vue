<template>
  <div class="main" ref="viewBox">
    <dyn :eventList="eventList"></dyn>
    <div class="rf">
      <div class="r1">
        <img :src="profile.avatarUrl" alt=""  @click="goUser()">
        <div>
          <b @click="goUser()">{{profile.nickname}}</b>
          <p>{{profile.signature}}</p>
        </div>
      </div>
      <div class="r2">
        <p v-for="(i, index) in list" :key="index" @click="go(index)">
          <em v-if="index===0">{{profile.eventCount}}</em>
          <em v-else-if="index===1">{{profile.follows}}</em>
          <em v-else-if="index===2">{{profile.followeds}}</em>
          <i>{{i.name}}</i>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { event } from '@/api/api'
import tit from '@/components/title'
import layer from '@/components/layer'
import dyn from '@/components/dyn'
export default {
  data () {
    return {
      eventList: [],
      profile: {},
      list: [
        {name: '动态'},
        {name: '关注'},
        {name: '粉丝'}
      ],
      userId: ''
    }
  },
  components: {
    tit,
    layer,
    dyn
  },
  created () {
    this.getEvent()
    if (sessionStorage.user) {
      this.profile = JSON.parse(sessionStorage.user).profile
      this.userId = this.profile.userId
    }
  },
  mounted () {
    this.box = this.$refs.viewBox
    this.box.addEventListener('scroll', () => {
      console.log(' scroll ' + this.$refs.viewBox.scrollTop)
    }, false)
  },
  methods: {
    getEvent () {
      event().then((res) => {
        console.log('好友动态', res)
        if (res.code === 200) {
          this.eventList = res.event
        }
      })
    },
    go (index) {
      if (index === 0) {
        this.$router.push({path: '/userIndex/dynamic', query: {userId: this.userId}})
      } else if (index === 1) {
        this.$router.push({path: '/userIndex/follow', query: {userId: this.userId}})
      } else if (index === 2) {
        this.$router.push({path: '/userIndex/fans', query: {userId: this.userId}})
      }
    },
    goUser () {
      this.$router.push({path: '/userIndex/userInfo', query: {userId: this.userId}})
    }
  }
}
</script>
<style scoped lang="scss">
  .main {
    width: 820px;
    padding: 0 15px 0 30px;
    display: flex;
    min-height: 620px;
    .rf {
      border-left: 1px solid #ddd;
      width: 245px;
      flex-shrink: 0;
      .r1,.r2 {
        background: #F5F5F7;
      }
      .r1 {
        padding: 25px 0 0 15px;
      }
      .r1 {
        display: flex;
        justify-content: center;
        font-size: 14px;
        >img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-right: 10px;
          cursor: pointer;
        }
        div {
          b {
            cursor: pointer;
          }
          p {
            color: #888;
            margin-top: 5px;
          }
        }
      }
      .r2 {
        padding: 15px 0;
        display: flex;
        justify-content: center;
        p {
          cursor: pointer;
          width: 33.33%;
          flex-shrink: 0;
          text-align: center;
          position: relative;
          font-size: 14px;
          color: #444444;
          em {
            display: block;
            font-weight: bold;
            font-size: 16px;
          }
        }
        p:not(:last-child):after {
          content: '';
          position: absolute;
          height: 100%;
          width: 1px;
          background: #ddd;
          top: 0;
          right: 0;
        }
      }
    }
  }
</style>

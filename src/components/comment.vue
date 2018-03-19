<template>
    <div class="com">
      <div v-show="this.$store.state.offset === 0 && $store.state.wonderCom.length>0">
        <tit title="精彩评论" :isShow="isShow"></tit>
        <ul>
          <li v-for="(i, index) in  $store.state.wonderCom" :key="index">
            <img :src="i.user.avatarUrl" alt="" @click="goUser(i.user.userId)">
            <div>
              <p>
                <b @click="goUser(i.user.userId)">{{i.user.nickname}}：</b>
                <span>{{i.content}}</span>
              </p>
              <h5>
                <span></span>
              </h5>
              <p>
                <i>{{turnTime(i.time)}}</i>
                <span>回复</span>
                <span>分享<em>|</em></span>
                <span @click="like(i.commentId)"><b class="iconfont icon-zan"></b>({{i.likedCount}}) <em>|</em></span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <tit title="最新评论" :isShow="isShow">
        <i slot="com" class="com">({{comInfo.total}})</i>
      </tit>
      <ul>
        <li v-for="(i, index) in  comInfo.comments" :key="index">
          <img :src="i.user.avatarUrl" alt="" @click="goUser(i.user.userId)">
          <div>
            <p>
              <b @click="goUser(i.user.userId)">{{i.user.nickname}}：</b>
              <span>{{i.content}}</span>
            </p>
            <div v-if="i.beReplied&&i.beReplied.length>0" v-for="(j,k) in i.beReplied" :key="k" class="reply">
              <b @click="goUser(j.user.userId)">{{j.user.nickname}}：</b>
              <span>{{j.content}}</span>
            </div>
            <p>
              <i>{{turnTime(i.time)}}</i>
              <span>回复</span>
              <span>分享<em>|</em></span>
              <span @click="like(i.commentId)"><b class="iconfont icon-zan"></b>({{i.likedCount}}) <em>|</em></span>
            </p>
          </div>
        </li>
      </ul>
      <!--<paging></paging>-->
    </div>
</template>
<script>
import tit from '@/components/title'
import paging from '@/components/paging'
export default {
  data () {
    return {
      isShow: false
    }
  },
  props: {
    comInfo: {},
    type: '',
    resId: ''
  },
  components: {
    tit,
    paging
  },
  created () {
  },
  methods: {
    goUser (id) {
      if (id) {
        this.$router.push({path: '/userIndex/userInfo', query: {userId: id}})
      }
    },
    like (cid) {
      this.giveLove(this.resId, cid, this.type)
    }
  }
}
</script>
<style scoped lang="scss">
  .com {
    .com {
      font-size: 12px;
    }
    ul {
      li {
        font-size: 12px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #EFEFEF;
        padding: 15px 0;
        position: relative;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-right: 10px;
          cursor: pointer;
          flex-shrink: 0;
          position: absolute;
          left: 0;
          top: 15px;
        }
        div {
          flex-grow: 1;
          margin-left: 50px;
          p:first-child {
            margin-bottom: 10px;
            b {
              color: #0C73C2;
              cursor: pointer;
            }
            span {
              color: #333333;
            }
          }
        }
        .reply {
          margin: 0 0 10px 0;
          background: #F1F1F4;
          padding: 10px 5px;
          b {
            color: #0C73C2;
            cursor: pointer;
          }
        }
        p:last-child {
          height: 16px;
          line-height: 16px;
          color: #999999;
          i {
            font-size: 12px;
          }
          span {
            cursor: pointer;
            text-align: right;
            float: right;
            padding: 0 5px;
            b {
              font-size: 12px;
            }
            em {
              margin-left: 5px;
            }
          }
          span:nth-of-type(3) {
            padding-right: 0;
          }
        }
      }
      li:last-child {
        border-bottom: 0;
      }
    }
  }
</style>

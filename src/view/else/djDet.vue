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
      <div class="down"></div>
    </div>
</template>
<script>
import { djDetail } from '@/api/api'
export default {
  data () {
    return {
      djDet: {},
      rid: '',
      hideClass: false,
      dj: {}
    }
  },
  components: {},
  created () {
    this.rid = this.$route.query.rid
    this.getDJDet(this.rid)
  },
  methods: {
    getDJDet (rid) {
      djDetail({params: {rid: rid}}).then((res) => {
        console.log('电台详情', res)
        if (res.code === 200) {
          this.djDet = res.djRadio
          this.dj = res.djRadio.dj
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
</style>

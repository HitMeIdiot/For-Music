<template>
    <div class="rec">
      <tit title="听歌排行榜" class="lisUp">
        <div slot="more" class="m1">
          <b v-for="(j,k) in list" :key="k" @click="cut(j,k)" :class="[k===act?'active':'']">
            {{j.name}}
          </b>
        </div>
      </tit>
      <div class="lisDown">
        <ul>
          <li v-for="(i,index) in listenList" :key="index" @dblclick="play(i)">
            <p>
              <span>{{index>8? index+1 : '0'+(index+1)}}</span>
              <span class="iconfont icon-love"></span>
              <span class="iconfont icon-download"></span>
            </p>
            <h3>{{i.song.name}}</h3>
            <h4 v-show="userId===myId">
              <span>{{i.playCount}}次</span>
              <b :style="{width: i.playCount/playCount*100 + '%'}"></b>
            </h4>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
import tit from '@/components/title'
import { userRecord } from '@/api/api'
export default {
  data () {
    return {
      type: 1,
      listenList: [],
      act: 0,
      list: [
        {name: '最近一周'},
        {name: '所有时间'}
      ],
      playCount: 0
    }
  },
  components: {
    tit
  },
  created () {
    this.userId = sessionStorage.userId
    this.myId = sessionStorage.myId
    this.getUserRecord(this.userId)
  },
  methods: {
    cut (i, index) {
      this.act = index
      if (index === 0) {
        this.type = 1
      } else {
        this.type = 0
      }
      this.getUserRecord(this.userId)
    },
    play (i) {
      this.playMusic(i.song.id, i.song.name, 'http://ox36g1rgh.bkt.clouddn.com/ava.jpg', i.song.ar)
    },
    getUserRecord (id) {
      userRecord({params: {uid: id, type: this.type}}).then((res) => {
        console.log('用户播放记录', res)
        if (res.code === 200) {
          if (this.type === 0) {
            this.listenList = res.allData
            if (res.allData.length > 0) {
              this.playCount = res.allData[0].playCount
            }
          } else {
            this.listenList = res.weekData
            if (res.weekData.length > 0) {
              this.playCount = res.weekData[0].playCount
            }
          }
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .lisUp {
    padding: 15px 30px 0 30px;
    .m1 {
      b {
        cursor: pointer;
        font-size: 12px;
        color: #888;
      }
      b:first-child {
        position: relative;
        margin-right: 5px;
      }
      b:first-child:after {
        content: '';
        position: absolute;
        height: 12px;
        width: 1px;
        top: 0;
        right: -2px;
        background: #666;
      }
      b.active {
        color: #2c3e50;
      }
      b:hover {
        color: #2c3e50;
      }
    }
  }
  .lisDown {
    padding: 0 30px;
    li {
      display: flex;
      line-height: 30px;
      height: 30px;
      font-size: 12px;
      position: relative;
      .iconfont {
        font-size: 12px;
      }
      h3,h4 {
        flex: 1;
      }
      h4 {
        position: relative;
        span {
          left: 10px;
          position: absolute;
          color: #888;
        }
        b {
          width: 100%;
          background: #EBECED;
          display: inline-block;
          height: 30px;
        }
      }
      h3 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p {
        width: 110px;
        display: flex;
        flex-shrink: 0;
        span:first-child {
          width: 50px;
          padding-right: 10px;
          text-align: center;
        }
        span:not(:first-child) {
          width: 27.5px;
        }
      }
    }
    li:first-child {
      h4 {
        width: 100%;
      }
    }
    li:nth-child(even) {
      background: #F5F5F7;
      h4 {
        b {
          background: #E6E7EA;
        }
      }
    }
    li:nth-child(odd) {
      background: #fff;
    }
    li:hover {
      background: #EBECED;
    }
  }
</style>

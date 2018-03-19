<template>
    <div class="sole">
      <ul>
        <li v-for="(i,index) in perPriList" :key="index" @click="go(i)">
          <img :src="i.sPicUrl" alt="">
          <span>
            <i class="iconfont icon-bo"></i>
          </span>
          <p>{{i.name}}</p>
        </li>
      </ul>
    </div>
</template>
<script>
import { personalizedPrivateContent } from '@/api/api'
export default {
  data () {
    return {
      perPriList: []
    }
  },
  components: {
    isAll: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.getPerPriList()
  },
  methods: {
    // 获取推荐歌单
    getPerPriList () {
      personalizedPrivateContent().then((res) => {
        console.log('独家放送', res)
        if (res.code === 200) {
          if (this.isAll) {
            this.perPriList = res.result
          } else {
            res.result.forEach((item, index) => {
              if (index < 4) {
                this.perPriList.push(res.result[index])
              }
            })
          }
        }
      })
    },
    go (i) {
    }
  }
}
</script>
<style scoped lang="scss">
  .sole {
    margin-bottom: 50px;
    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      li {
        position: relative;
        width: 240px;
        height: 136px;
        margin-right: 20px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          z-index: 88;
        }
        span {
          position: absolute;
          left: 5px;
          top: 5px;
          width: 30px;
          height: 30px;
          background: rgba(148,151,145,.6);
          z-index: 99;
          border-radius: 50%;
          i {
            position: absolute;
            left: 7px;
            top: 4px;
            color: #fff;
          }
        }
        p {
          font-size: 12px;
          color: #333333;
        }
        p:hover {
          color: #111111;
        }
      }
      li:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
</style>

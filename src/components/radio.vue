<template>
    <div class="radio">
      <ul>
        <li v-for="(i,index) in radioList" :key="index"  @click="play(i)">
          <h3>
            <img :src="i.picUrl" alt="">
            <span>
              <i class="iconfont icon-bo"></i>
            </span>
          </h3>
          <div>
            <p>{{i.name}}</p>
            <p>{{i.copywriter}}</p>
          </div>
        </li>
      </ul>
    </div>
</template>
<script>
import { personalizedDjProgram, musicUrl } from '@/api/api'
export default {
  data () {
    return {
      radioList: []
    }
  },
  components: {
    isAll: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.getRadioList()
  },
  methods: {
    getRadioList () {
      personalizedDjProgram().then((res) => {
        console.log('主播电台', res)
        if (res.code === 200) {
          if (this.isAll) {
            this.radioList = res.result
          } else {
            res.result.forEach((item, index) => {
              if (index < 6) {
                this.radioList.push(res.result[index])
              }
            })
          }
        }
      })
    },
    play (i) {
      console.log(i)
      this.$store.state.songImg = i.picUrl
      this.$store.state.songName = i.name
      // this.$store.state.songSinger = i.copywriter
      musicUrl({params: {id: i.id}}).then((res) => {
        console.log('歌曲url', res)
        if (res.code === 200) {
          if (res.data[0].url) {
            this.$store.state.playSongId = i.id
            this.$store.state.mp3Url = res.data[0].url
          } else {
            this.$toast('暂无资源')
          }
          console.log(this.$store.state.mp3Url)
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .radio {
    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      li:nth-child(odd) {
        margin-right: 20px;
      }
      li {
        display: flex;
        align-items: center;
        width: 370px;
        padding: 10px 0;
        cursor: pointer;
        border-bottom: 1px solid #EDEDED;
        h3 {
          position: relative;
          width: 80px;
          height: 80px;
          flex-shrink: 0;
          img {
            width: 100%;
            height: 100%;
          }
          span {
            position: absolute;
            bottom: 5px;
            left: 50px;
            background: rgba(104, 108, 113, 0.4);
            width: 25px;
            height: 25px;
            border-radius: 50%;
            i {
              position: absolute;
              font-size: 25px;
              color: #fff;
              left: 0;
              bottom: -5px;
            }
          }
          span:hover {
            background: rgba(104, 108, 113, 0.8);
          }
        }
        div {
          margin-left: 10px;
          font-size: 14px;
          line-height: 30px;
          width: 280px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          p:last-child {
            color: #888888;
          }
          p {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          p:last-child:hover {
            color: #666666;
          }
        }
      }
      li:nth-child(1),li:nth-child(2) {
        padding-top: 0;
      }
      li:nth-child(5),li:nth-child(6) {
        border-bottom: 0;
      }
    }
  }
</style>

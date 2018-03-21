<template>
    <div class="audio">
      <div class="con">
        <span class="iconfont icon-last"></span>
        <span class="iconfont icon-zanting" @click="stop" v-if="isPlay"></span>
        <span class="iconfont icon-play" @click="play" v-else ></span>
        <span class="iconfont icon-next"></span>
      </div>
      <div class="pro">
        <span>{{currentTime | timeFormat}}</span>
        <p @mousemove="mousemove($event)" @mouseleave="mouseEnd($event)" id="pro">
          <i @click="jumpTime($event)">
            <b :style="{left: step + '%'}" id="steps" @mousedown="mousedown($event)" @mouseup="mouseEnd($event)"></b>
            <em :style="{width: step + '%'}"></em>
          </i>
        </p>
        <span>{{$store.state.duration | timeFormat}}</span>
      </div>
      <audio class="play" id="playSong" @timeupdate="updateLyric">
        <source :src="mp3Url" type="audio/ogg" />
      </audio>
    </div>
</template>
<script>
import Bus from './bus.js'
export default {
  data () {
    return {
      mp3Url: '',
      isPlay: false,
      step: 0,
      currentTime: 0,
      locked: false,
      lastStep: 0,
      time: 0
    }
  },
  computed: {
    getPlayState () {
      return this.$store.state.mp3Url
    }
  },
  watch: {
    getPlayState (val) {
      this.step = 0
      this.mp3Url = val
      let playSong = document.getElementById('playSong')
      playSong.load()
      this.isPlay = true
      this.play()
    }
  },
  components: {},
  created () {
  },
  mounted () {
  },
  methods: {
    updateLyric () {
      let playSong = document.getElementById('playSong')
      let t = playSong.currentTime
      if (this.$route.path === '/musicPlay') {
        Bus.$emit('getTarget', t)
      }
      this.currentTime = playSong.currentTime * 1000
      if (this.step <= 100) {
        this.step = this.currentTime / this.$store.state.duration * 100
      }
    },
    play () {
      let playSong = document.getElementById('playSong')
      this.isPlay = true
      playSong.play()
    },
    stop () {
      let playSong = document.getElementById('playSong')
      playSong.pause()
      this.isPlay = false
    },
    mousedown (e) {
      this.locked = true
      this.lastStep = this.step
    },
    mouseEnd (e) {
      this.locked = false
    },
    mousemove (e) {
      if (this.locked) {
        this.same(e)
      }
    },
    jumpTime (e) {
      this.same(e)
    },
    same (e) {
      // 点击或移动时根据step计算time赋值给playSong.currentTime
      this.step = e.offsetX / 445 * 100
      this.time = this.step * this.$store.state.duration / 1000 / 100
      let playSong = document.getElementById('playSong')
      playSong.currentTime = this.time
    }
  }
}
</script>
<style scoped lang="scss">
  .audio {
    display: flex;
    align-items: center;
    .con {
      width: 200px;
      padding: 0 25px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        text-align: center;
        flex: 1;
        font-size: 30px;
        color: #c62f2f;
        cursor: pointer;
      }
      span:nth-of-type(2) {
        font-size: 35px;
      }
    }
    .pro {
      width: 535px;
      flex-shrink: 0;
      display: flex;
      height: 50px;
      line-height: 50px;
      p {
        flex: 1;
        width: 100%;
        display: flex;
        align-items: center;
        margin: 0 10px;
        i {
          width: 445px;
          flex-shrink: 0;
          height: 4px;
          background: #C2C2C4;
          border-radius: 5px;
          position: relative;
          em {
            position: absolute;
            width: 0;
            height: 4px;
            background: #c62f2f;
            z-index: 86;
            border-radius: 5px;
          }
          b {
            position: absolute;
            left: 0;
            top: -5px;
            width: 14px;
            height: 14px;
            background: #fff;
            border-radius: 50%;
            border: 0.5px solid #ddd;
            cursor: pointer;
            z-index: 88;
            &:after {
              position: absolute;
              content: '';
              width: 4px;
              height: 4px;
              background: #c62f2f;
              border-radius: 50%;
              top: 4.5px;
              left: 4.5px;
            }
          }
        }
      }
      span {
        flex: 1;
        font-size: 12px;
        text-align: center;
      }
    }
  }
</style>

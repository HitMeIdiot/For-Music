<template>
  <div class="audio">
    <div class="con">
      <span>
        <i class="iconfont icon-last" @click="last"></i>
      </span>
      <span v-if="isPlay">
        <i class="iconfont icon-zanting" @click="stop" ></i>
      </span>
      <span v-else >
        <i class="iconfont icon-play" @click="play" ></i>
      </span>
      <span>
        <i class="iconfont icon-next" @click="add"></i>
      </span>
      <!--<span class="iconfont icon-next" @click="next"></span>-->
    </div>
    <div class="pro">
      <span>{{currentTime | timeFormat}}</span>
      <p id="pro" @click="jumpTime($event)"  >
        <i id="line"></i>
        <em id="ems"></em>
        <b id="steps"></b>
      </p>
      <span>{{duration | timeFormat}}</span>
    </div>
    <div class="voice pro">
      <span :class="[!isQuiet?'icon-shengyin':'icon-wusheng', 'iconfont']" @click="mute"></span>
      <p>
        <i @click="jumpVoice($event)">
          <em :style="{width: vos + '%'}"></em>
        </i>
        <b :style="{left: vo + '%'}"></b>
      </p>
    </div>
    <audio class="play" id="playSong" @timeupdate="updateLyric">
      <source :src="mp3Url" type="audio/ogg" />
    </audio>
  </div>
</template>
<script>import Bus from './bus.js'
import {mapActions, mapState} from 'vuex'
export default {
  data () {
    return {
      mp3Url: '',
      isPlay: false,
      step: 0,
      currentTime: 0,
      locked: false,
      isQuiet: false,
      lastStep: 0,
      time: 0,
      vo: 100,
      vos: 100,
      volume: 0,
      audio: '',
      oDiv1: '',
      oDiv2: '',
      oDiv3: '',
      proWidth: 0
    }
  },
  computed: {
    getPlayState () {
      return this.$store.state.mp3Url
    },
    getNewId () {
      return this.$route.query.songSheetId
    },
    // 使用mapGetters后，里面的属性赋值时需要使用set，不然会报错
    // Computed property "xxx" was assigned to but it has no setter.如下面album的写法
    ...mapState([
      'curSongIndex',
      'duration',
      'tracks'
    ]),
    album: {
      get () {
        return this.$store.state.album
      },
      set () {}
    }
  },
  watch: {
    getPlayState (val) {
      this.step = 0
      this.mp3Url = val
      this.audio.load()
      this.isPlay = true
      this.play()
    },
    getNewId () {
      this.$store.state.curSongIndex = 0
    }
  },
  components: {},
  created () {
  },
  mounted () {
    this.audio = document.getElementById('playSong')
    this.oDiv1 = document.querySelector('#pro')
    this.oDiv2 = document.querySelector('#ems')
    this.oDiv3 = document.querySelector('#steps')
    this.proWidth = document.querySelector('#line').offsetWidth
    this.oDiv3.addEventListener('mousedown', (ev) => {
      document.addEventListener('mousemove', this.fnMove, false)
      document.addEventListener('mouseup', this.fnEnd, false)
      this.fnMove(ev)
    }, false)
    this.fnEnd()
  },
  methods: {
    ...mapActions({
    }),
    updateLyric () {
      let t = this.audio.currentTime
      let d = this.duration
      if (this.$route.path === '/musicPlay') {
        Bus.$emit('getTarget', t)
      }
      this.currentTime = this.audio.currentTime * 1000
      if (t <= d / 1000) {
        this.step = this.currentTime / d * this.proWidth
        this.oDiv3.style.left = this.step + 'px'
        this.oDiv2.style.width = this.step + 'px'
      }
      if (t >= (d - 200) / 1000) {
        this.isPlay = false
        this.step = 0
        this.oDiv3.style.left = 0
        this.oDiv2.style.width = 0
        this.currentTime = 0
        this.add()
      }
    },
    play () {
      this.isPlay = true
      if (this.getPlayState) {
        this.audio.play()
      }
    },
    stop () {
      this.isPlay = false
      this.audio.pause()
    },
    fnMove (e) {
      this.same(e)
    },
    fnEnd () {
      document.removeEventListener('mouseup', this.fnEnd, false)
      document.removeEventListener('mousemove', this.fnMove, false)
    },
    jumpTime (e) {
      this.same(e)
    },
    same (e) {
      let oDiv1W = this.oDiv1.offsetWidth
      let x = e.clientX - 250
      if (x >= oDiv1W) {
        x = oDiv1W
      } else if (x <= 0) {
        x = 0
      }
      this.oDiv3.style.left = x + 'px'
      this.oDiv2.style.width = x + 'px'
      // 点击或移动时根据step计算time赋值给this.audio.currentTime
      this.step = x / this.proWidth * 100
      this.time = this.step * this.duration / 1000 / 100
      this.audio.currentTime = this.time
    },
    // 调声音大小
    jumpVoice (e) {
      this.vo = e.offsetX - 7
      this.vos = e.offsetX
      this.volume = e.offsetX
      if (this.vo > -0.07) {
        this.audio.volume = this.vo / 100
        this.isQuiet = false
      } else {
        this.audio.volume = 0
        this.isQuiet = true
      }
    },
    mute () {
      this.isQuiet = !this.isQuiet
      if (this.isQuiet) {
        this.audio.volume = 0
        this.vos = 0
        this.vo = -7
      } else {
        this.audio.volume = this.volume / 100
        this.vos = this.volume
        this.vo = this.volume - 7
      }
    },
    add () {
      this.$store.commit('INCREMENT')
      this.playMus(this.curSongIndex)
    },
    last () {
      this.$store.commit('DECREMENT')
      this.playMus(this.curSongIndex)
    },
    playMus (index) {
      if (index <= this.tracks.length) {
        let i = this.tracks[index]
        this.$store.commit('AD', i)
        this.playMusic(i.id, i.name, i.album.blurPicUrl, i.album.artists)
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .audio {
    display: flex;
    align-items: center;
    line-height: 0;
    .con {
      width: 200px;
      padding: 0 20px;
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
        line-height: unset;
        i {
          font-size: 35px;
        }
        &:nth-of-type(2) {
          i {
            font-size: 40px;
          }
        }
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
        margin: 0 20px 0 10px;
        position: relative;
        b {
          position: absolute;
          left: 0;
          top: 18px;
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
        i {
          width: 445px;
          flex-shrink: 0;
          height: 4px;
          background: #C2C2C4;
          border-radius: 5px;
          position: relative;
        }
        em {
          position: absolute;
          width: 0;
          height: 4px;
          background: #c62f2f;
          z-index: 86;
          border-radius: 5px;
        }
      }
      span {
        flex: 1;
        font-size: 12px;
        text-align: center;
      }
    }
    .voice {
      width: unset;
      margin-left: 20px;
      .iconfont {
        font-size: 14px;
      }
      p {
        position: relative;
        i {
          width: 100px;
        }
      }
    }
  }
</style>

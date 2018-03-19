<template>
    <div>
      <audio class="play" controls id="playSong" @timeupdate="updateLyric">
        <source :src="mp3Url" type="audio/ogg" />
      </audio>
      <!--<button @click="addCart">测5试</button>-->
    </div>
</template>
<script>
import Bus from './bus.js'
export default {
  data () {
    return {
      mp3Url: ''
    }
  },
  computed: {
    getPlayState () {
      return this.$store.state.mp3Url
    }
  },
  watch: {
    getPlayState (val) {
      this.mp3Url = val
      let playSong = document.getElementById('playSong')
      playSong.load()
      playSong.play()
      this.$store.state.isPlay = true
    }
  },
  components: {},
  created () {
  },
  methods: {
    updateLyric (event) {
      let playSong = document.getElementById('playSong')
      if (this.$route.path === '/musicPlay') {
        Bus.$emit('getTarget', playSong.currentTime)
      }
    }
  }
}
</script>
<style scoped lang="scss">
</style>

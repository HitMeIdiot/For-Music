<template>
    <div>
      <video controls id="playMv">
        <!--<source :src="mp4Url" type="video/mp4">-->
        <source src="http://v4.music.126.net/20180308033620/e5aaa0d2893559c7dfc697cfb8724f31/web/cloudmusic/mv/20180306094957/bfdb8f3b-63b8-45fc-baa2-3d3f79fabc63/9a64d7d6622acb46d8b8d2821f721d74.mp4" type="video/mp4" />
      </video>
      <!--{{mp3Url}}-->
    </div>
</template>
<script>
export default {
  data () {
    return {
      mp4Url: ''
    }
  },
  computed: {
    getPlayState () {
      return this.$store.state.mp4Url
    }
  },
  watch: {
    getPlayState (val) {
      this.mp4Url = val
      var playMv = document.getElementById('playMv')
      playMv.load()
      playMv.play()
    }
  },
  components: {},
  created () {
  },
  methods: {}
}
</script>
<style scoped lang="scss">
  video {
    width: 100%;
    height: 100%;
  }
</style>

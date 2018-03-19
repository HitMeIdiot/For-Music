<template>
    <div class="daily">
        <div class="d1">
          <p>
            <span>{{day}}</span>
            <b>{{new Date().getDate()}}</b>
          </p>
          <div>
            <h3>每日歌曲推荐</h3>
            <i>根据你的音乐口味生成，每天6：00更新</i>
          </div>
        </div>
      <div>
        <songList :list="daySongs"></songList>
      </div>
    </div>
</template>
<script>
import { recommendSongs } from '@/api/api'
import songList from '@/components/songList'
export default {
  data () {
    return {
      daySongs: []
    }
  },
  computed: {
    day () {
      let val = new Date().getDay()
      if (val === 1) {
        return '星期一'
      } else if (val === 2) {
        return '星期二'
      } else if (val === 3) {
        return '星期三'
      } else if (val === 4) {
        return '星期四'
      } else if (val === 5) {
        return '星期五'
      } else if (val === 6) {
        return '星期六'
      } else if (val === 7) {
        return '星期天'
      }
    }
  },
  components: {
    songList
  },
  created () {
    this.getDaySong()
  },
  methods: {
    getDaySong () {
      recommendSongs().then((res) => {
        console.log('每日推荐歌曲', res)
        if (res.code === 200) {
          this.daySongs = res.recommend
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .daily {
    padding: 30px 20px 20px 30px;
    .d1 {
      display: flex;
      margin-bottom: 10px;
      div {
        flex: 1;
        h3 {
          font-size: 22px;
          margin: 10px 0;
        }
        i {
          color: #666;
          font-size: 12px;
        }
      }
      >p {
       background: #fff;
        width: 100px;
        height: 100px;
        border: 1px solid #ddd;
        text-align: center;
        margin-right: 25px;
        span {
          display: block;
          color: #666;
          margin-top: 5px;
        }
        b {
          font-size: 55px;
          color: #c62f2f;
        }
      }
    }
  }
</style>

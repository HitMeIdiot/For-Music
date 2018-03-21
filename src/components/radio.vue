<template>
    <div class="radio">
      <ul v-if="types==='1'" class="one">
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
      <ul v-if="types==='2'" class="two">
        <li v-for="(i,index) in radioList" :key="index"  @click="goDet(i.id)" v-if="index<5">
          <img :src="i.picUrl" alt="">
          <h3>{{i.name}}</h3>
          <span>{{i.rcmdtext}}</span>
        </li>
      </ul>
    </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  components: {
  },
  props: {
    radioList: {
      type: Array
    },
    types: {
      type: String
    }
  },
  created () {
  },
  methods: {
    play (i) {
      console.log(i)
      this.$store.state.album = i.program.mainSong.album.name
      this.$store.state.duration = i.program.duration
      this.$store.state.albumId = i.program.mainSong.album.id
      this.playMusic(i.program.mainTrackId, i.name, i.picUrl, i.program.mainSong.artists)
    },
    goDet (id) {
      this.$router.push({path: '/djDet', query: {rid: id}})
    }
  }
}
</script>
<style scoped lang="scss">
  .radio {
    ul.one {
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
    ul.two {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      li {
        width: 18%;
        height: 184px;
        margin-right: 2.5%;
        font-size: 12px;
        img {
          width: 100%;
          cursor: pointer;
        }
        &:nth-of-type(5n) {
          margin-right: 0;
        }
        span {
          color: #888;
        }
      }
    }
  }
</style>

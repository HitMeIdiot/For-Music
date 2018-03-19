<template>
    <div class="newSong">
      <ul>
        <li v-for="(i,index) in perSongList" :key="index" @click="go(i)">
          <b class="in"><i v-show="index<9">0</i>{{index+1}}</b>
          <h3>
            <!--<img :src="i.picUrl" alt="">-->
            <img :src="i.song.album.blurPicUrl" alt="">
            <span>
              <i  class="iconfont icon-bo"></i>
            </span>
          </h3>
          <div>
            <span>{{i.name}} <b v-for="(h, i) in i.song.alias" :key="i">({{h}})</b></span>
            <p>
              <i v-for="(j, k) in i.song.artists" :key="k">{{j.name}} <span v-show="k < i.song.artists.length - 1">/</span></i>
              <b></b>
              <em></em>
            </p>
          </div>
        </li>
      </ul>
    </div>
</template>
<script>
import { personalizedNewSong } from '@/api/api'
export default {
  data () {
    return {
      perSongList: []
    }
  },
  components: {
    isAll: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.getPerSongList()
  },
  methods: {
    getPerSongList () {
      personalizedNewSong().then((res) => {
        console.log('最新音乐', res)
        if (res.code === 200) {
          if (this.isAll) {
            this.perSongList = res.result
          } else {
            res.result.forEach((item, index) => {
              if (index < 10) {
                this.perSongList.push(res.result[index])
              }
            })
          }
        }
      })
    },
    go (i) {
      this.playMusic(i.id, i.song.name, i.song.album.blurPicUrl, i.song.artists)
    }
  }
}
</script>
<style scoped lang="scss">
  .newSong {
    margin-bottom: 35px;
    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      border: 1px solid #EDEDED;
      border-bottom: 0;
      border-right: 0;
      li {
        width: 50%;
        height: 60px;
        display: flex;
        cursor: pointer;
        align-items: center;
        border-bottom: 1px solid #EDEDED;
        border-right: 1px solid #EDEDED;
        .in {
          display: inline-block;
          width: 38px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          font-size: 12px;
          color: #888888;
        }
        h3 {
          width: 40px;
          height: 40px;
          position: relative;
          margin-right: 10px;
          background: rgba(255,255,255,.8);
          flex-shrink: 0;
          img {
            width: 100%;
            height: 100%;
          }
          span {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(148, 151, 145, 0.3);
            i {
              position: absolute;
              left: 9px;
              top: 4.5px;
              font-size: 22px;
              color: #fff;
            }
          }
        }
        div {
          flex: 1;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {
            font-size: 14px;
            b {
              color: #888;
            }
          }
          p {
            i {
              color: #888888;
            }
            i:hover {
              color: #333;
            }
          }
        }
      }
      li:hover {
        background: #E3E3E5;
      }
    }
  }
</style>

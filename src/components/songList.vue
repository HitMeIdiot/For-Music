<template>
  <ul>
    <li>
      <span>
        <em @click="plays">
          <i class="iconfont icon-bo"></i>
          播放全部
          <i class="iconfont icon-add"></i>
        </em>
      </span>
      <span>
        <em>
          <i class="iconfont icon-addfile"></i>
          收藏全部
        </em>
      </span>
    </li>
    <li v-for="(i,index) in list" :key="index" @dblclick="playSong(i,index)">
      <p>
        <span class="iconfont icon-shengyin" style="color: red" v-if="playSongId===i.id"></span>
        <span v-else><i v-show="index<9">0</i><b>{{index+1}}</b></span>
        <span class="iconfont icon-love"></span>
        <span class="iconfont icon-download"></span>
      </p>
      <h3>{{i.name}}</h3>
      <h4>
        <em v-for="(j,k) in i.artists" :key="k">
          {{j.name}} <em v-show="k<i.artists.length-1">/</em>
        </em>
      </h4>
      <b>{{i.album.name}}</b>
      <i>{{i.duration | timeFormat}}</i>
    </li>
  </ul>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {}
  },
  props: {
    list: {
      type: Array
    }
  },
  components: {},
  computed: {
    ...mapState([
      'playSongId'
    ])
  },
  created () {
  },
  methods: {
    // 双击播放歌曲
    playSong (i, index) {
      this.$store.commit('SET_INDEX', index)
      this.$store.commit('AD', i)
      this.playMusic(i.id, i.name, i.album.blurPicUrl, i.album.artists)
    },
    plays () {
      this.playAll()
    }
  }
}
</script>
<style scoped lang="scss">
  ul {
    border: 1px solid #ECE9EA;
    li:first-child {
      padding: 0 10px;
      height: 40px;
      line-height: 40px;
      span {
        flex: 1;
        em {
          display: inline-block;
          width: 100px;
          height: 26px;
          line-height: 26px;
          border: 1px solid #c62f2f;
          color: #c62f2f;
          text-align: center;
          border-radius: 3px;
          background: #fff;
          cursor: pointer;
        }
      }
      span:last-child {
        text-align: right;
        em {
          border: 1px solid #ddd;
          color: #666;
        }
      }
    }
    li {
      display: flex;
      line-height: 30px;
      height: 30px;
      font-size: 12px;
      .iconfont {
        font-size: 12px;
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
      h3 {
        width: 300px;
      }
      h4 {
        width: 120px;
      }
      b {
        width: 150px;
      }
      h3,h4,b {
        flex-shrink: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      i {
        flex: 1;
        text-align: center;
      }
    }
    li:nth-child(odd) {
      background: #F5F5F7;
    }
    li:nth-child(even) {
      background: #fff;
    }
    li:hover {
      background: #E3E3E5;
    }
    li:first-child:hover {
      background: #F5F5F7;
    }
  }
</style>

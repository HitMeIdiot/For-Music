<template>
    <div  class="song">
      <ul lass="noAll">
        <li v-if="$store.state.langName==='全部'&&$store.state.classifyName==='全部'&&$store.state.alphabetName==='热门'&&$route.path==='/find/singer'">
          <div>
            <img src="../assets/img/rank.png" alt="">
          </div>
          <p>歌手排行榜</p>
        </li>
        <li v-for="(i,index) in lists" :key="index" @click="goSongDet(i)">
          <div>
            <img :src="i.picUrl" alt="" v-if="i.picUrl">
          </div>
          <p>{{i.name}}</p>
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
  props: {
    isAll: {
      type: Boolean,
      default: false
    },
    lists: {
      type: Array
    }
  },
  components: {
  },
  created () {
  },
  methods: {
    goSongDet (i) {
      this.$router.push({path: '/singerInfo', query: {descId: i.id}})
    }
  }
}
</script>
<style scoped lang="scss">
  .song {
    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      li {
        width: 18%;
        height: 184px;
        margin-bottom: 20px;
        margin-right: 2.5%;
        div {
          position: relative;
          height: 140px;
          margin-bottom: 7px;
          img {
            width: 100%;
            height: 100%;
            z-index: 80;
          }
        }
        p {
          font-size: 12px;
          width: 100%;
          color: #333333;
          overflow: hidden;
        }
      }
      li:hover {
        cursor: pointer;
      }
      li:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
</style>

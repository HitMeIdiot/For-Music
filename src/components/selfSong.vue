<template>
    <div>
      <ul>
        <li v-for="(i,index) in list" :key="index">
          <img :src="i.coverImgUrl" alt="">
          <h3>{{i.name}}</h3>
          <i>歌曲：{{i.trackCount}}首</i>
          <b>by {{i.creator.nickname}}</b>
          <p><em class="iconfont icon-addfile"></em>{{i.subscribedCount}}</p>
          <h5><span class="iconfont icon-bo"></span>{{i.playCount | numFormat}}</h5>
        </li>
      </ul>
    </div>
</template>
<script>
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
  created () {
  },
  methods: {}
}
</script>
<style scoped lang="scss">
  ul {
    li {
      display: flex;
      padding: 10px 0 10px 30px;
      align-items: center;
      font-size: 12px;
      color: #888;
      img {
        width: 40px;
        height: 40px;
        flex-shrink: 0;
        margin-right: 10px;
      }
      h3 {
        flex: 1.8;
        color: #010101;
      }
      i {
        flex: 0.6;
      }
      b {
        flex: 0.6;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p, h5 {
        flex: 0.5;
        .iconfont {
          margin-right: 5px;
        }
      }
      h5 {
        flex: 0.4;
      }
      .iconfont {
        font-size: 14px;
      }
    }
    li:nth-child(odd) {
      background: #fff;
    }
    li:nth-child(even) {
      background: #F5F5F7;
    }
    li:hover {
      background: #EBECED;
    }
  }
</style>

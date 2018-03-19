<template>
    <div class="mv">
      <ul>
        <li v-for="(i,index) in mvList" :key="index" @click="go(i)">
          <div>
            <img :src="i.picUrl" alt="" v-if="i.picUrl">
            <img :src="i.cover" alt="" v-if="i.cover">
            <p>{{i.copywriter}}</p>
            <!--<span v-if="i.playCount>10e3">-->
              <!--<b class="iconfont icon-video"></b><em>{{parseInt(i.playCount/10000)}}万</em>-->
            <!--</span>-->
            <!--<span v-else><b class="iconfont icon-video"></b><em>{{i.playCount}}</em></span>-->
            <span><b class="iconfont icon-video"></b><em>{{i.playCount | numFormat}}</em></span>
          </div>
          <p>{{i.name}}</p>
          <p>{{i.artistName}}</p>
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
    isAll: {
      type: Boolean,
      default: false
    },
    mvList: {
      type: Array
    }
  },
  created () {
  },
  methods: {
    go (i) {
      console.log(i)
      this.$router.push({path: '/mvPlay', query: {mvId: i.id}})
    }
  }
}
</script>
<style scoped lang="scss">
  .mv {
    margin-bottom: 20px;
    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      li {
        position: relative;
        width: 240px;
        height: 136px;
        cursor: pointer;
        margin: 0 20px 50px 0;
        div {
          position: relative;
          width: 100%;
          height: 135px;
          margin-bottom: 5px;
          img {
            width: 100%;
            height: 100%;
            z-index: 80;
          }
          p {
            display: none;
          }
          i {
            display: none;
          }
          span {
            position: absolute;
            right: 0;
            top: 0;
            width: 100%;
            background: linear-gradient(right,rgba(132,132,139,.2),rgba(206,203,203,.1));
            text-align: right;
            b,em {
              padding-right: 5px;
              color: #fff;
              font-size: 12px;
              vertical-align: middle;
            }
          }
        }
        div:hover {
          p {
            display: inline-block;
            position: absolute;
            width: 100%;
            padding: 8px;
            height: 40px;
            background: rgba(104,108,113, 0.6);
            z-index: 99;
            font-size: 12px;
            left: 0;
            top: 0;
            color: #fff;
            overflow:hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
          }
          i {
            display: inline-block;
            position: absolute;
            right: 5px;
            bottom: 0;
            color: rgba(255,255,255,.7);
            font-size: 28px;
          }
          span {
            display: none;
          }
        }
        p {
          font-size: 12px;
          color: #333333;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        p:nth-of-type(2) {
          color: #888888;
        }
        p:hover {
          color: #111111;
        }
      }
      li:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
</style>

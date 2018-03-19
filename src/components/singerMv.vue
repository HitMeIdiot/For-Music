<template>
    <div class="mv">
      <ul>
        <li v-for="(i,index) in mvList" :key="index" @click="go(i)">
          <div>
            <img :src="i.imgurl16v9" alt="">
            <span v-if="i.playCount>10e3">
              <b class="iconfont icon-video"></b><em>{{parseInt(i.playCount/10000)}}万</em>
            </span>
            <span v-else><b class="iconfont icon-video"></b><em>{{i.playCount}}</em></span>
            <i>{{i.duration | timeFormat}}</i>
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
        cursor: pointer;
        margin-bottom: 30px;
        width: 23.5%;
        margin-right: 2%;
        div {
          position: relative;
          height: 90px;
          img {
            width: 100%;
            height: 100%;
            z-index: 80;
          }
          i {
            position: absolute;
            left: 5px;
            bottom: 5px;
            color: #fff;
            font-size: 12px;
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
        p {
          font-size: 14px;
          color: #333333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 5px;
        }
        p:hover {
          color: #111111;
        }
      }
      li:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
</style>

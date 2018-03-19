<template>
    <div class="self_list">
      <div v-for="(i,index) in list" :key="index" class="s1">
        <img :src="i.coverImgUrl" alt="">
        <div>
          <h3 @click="goSongDet(i)">{{i.name}}</h3>
          <ul>
            <li v-for="(j,k) in 3" :key="k">
              {{j}}
            </li>
          </ul>
          <h4 @click="goSongDet(i)">查看全部{{i.trackCount}}首</h4>
        </div>
      </div>
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
  methods: {
    goSongDet (i) {
      this.$router.push({path: '/songDet', query: {songSheetId: i.id}})
    }
  }
}
</script>
<style scoped lang="scss">
  .self_list {
    padding: 20px 30px 0 30px;
    .s1 {
      display: flex;
      margin-bottom: 40px;
      img {
        width: 138px;
        height: 138px;
        flex-shrink: 0;
        margin-right: 70px;
      }
      div {
        flex: 1;
        h3,h4 {
          cursor: pointer;
          margin-bottom: 10px;
          font-size: 14px;
        }
        h4 {
          margin-top: 10px;
          color: #888;
          padding-left: 10px;
        }
        ul {
          border: 1px solid #ddd;
          li {
            line-height: 30px;
            padding-left: 20px;
          }
          li:nth-child(odd) {
            background: #fff;
          }
          li:nth-child(even) {
            background: #F5F5F7;
          }
          li:hover {
            background: #E3E3E5;
          }
        }
      }
    }
    .s1:last-child {
      margin-bottom: 0;
    }
  }
</style>

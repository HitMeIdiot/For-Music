<template>
    <div  class="song">
      <ul>
        <li v-for="(i,index) in list" :key="index" @click="goAlbumDet(i)">
          <div>
            <img :src="i.picUrl" alt="">
            <i class="iconfont icon-bo"></i>
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
    list: {
      type: Array
    }
  },
  components: {
  },
  created () {
  },
  methods: {
    goAlbumDet (i) {
      this.$router.push({path: '/albumDet', query: {albumId: i.id}})
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
        width: 23.5%;
        height: 224px;
        margin-right: 2%;
        margin-bottom: 20px;
        div {
          position: relative;
          height: 178px;
          margin-bottom: 7px;
          img {
            width: 100%;
            height: 100%;
            z-index: 80;
          }
          i {
            display: none;
          }
        }
        p {
          font-size: 14px;
        }
        div:hover {
          i {
            display: inline-block;
            position: absolute;
            right: 5px;
            bottom: 0;
            color: rgba(255,255,255,.7);
            font-size: 28px;
          }
        }
      }
      li:hover {
        cursor: pointer;
        p {
          color: #111111;
        }
      }
      li:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
</style>

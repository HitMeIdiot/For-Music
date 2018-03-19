<template>
    <div>
      <ul class="follow">
        <li v-for="(i,index) in list" :key="index">
          <img :src="i.avatarUrl" alt="" @click="goUser(i.userId)">
          <div>
            <span @click="goUser(i.userId)">{{i.nickname}}</span>
            <p>{{i.signature}}</p>
            <p>
              <span>歌单：{{i.playlistCount}}</span>
              <span>粉丝：{{i.followeds}}</span>
            </p>
          </div>
          <em><i class="iconfont icon-email"></i>私信</em>
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
    goUser (id) {
      this.$router.push({path: '/userIndex/userInfo', query: {userId: id}})
    }
  }
}
</script>
<style scoped lang="scss">
  .follow {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    li {
      width: 49%;
      border: 1px solid #ddd;
      margin-bottom: 20px;
      padding: 15px;
      display: flex;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        cursor: pointer;
        flex-shrink: 0;
        margin-right: 15px;
      }
      div {
        flex: 1;
        >span {
          font-weight: bold;
          cursor: pointer;
        }
        p {
          color: #888;
          font-size: 12px;
        }
        p:nth-of-type(1) {
          width: 185px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 5px 0;
          height: 17px;
        }
        p:nth-of-type(2) {
          display: flex;
          span {
            flex: 1;
            flex-shrink: 0;
            position: relative;
          }
          span:first-child:after {
            position: absolute;
            content: '';
            width: 1px;
            height: 12px;
            background: #ddd;
            right: 20%;
            top: 2.5px;
          }
        }
      }
      em {
        width: 65px;
        text-align: center;
        border-radius: 3px;
        flex-shrink: 0;
        border: 1px solid #ddd;
        background: #fff;
        font-size: 14px;
        cursor: pointer;
        i {
          margin-right: 3px;
        }
      }
    }
    li:nth-child(2n) {
      margin-left: 2%;
    }
  }
</style>

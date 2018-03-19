<template>
    <div class="find">
      <div class="tab">
        <ul>
          <li v-for="(i, index) in tabList" :key="index">
            <router-link :to="i.path">{{i.name}}<i></i></router-link>
          </li>
        </ul>
      </div>
      <router-view></router-view>
    </div>
</template>
<script>
export default {
  data () {
    return {
      tabList: [
        {path: '/find/personRecommend', name: '个性推荐', id: 1},
        {path: '/find/songSheet', name: '歌单', id: 2},
        {path: '/find/anchorsRadio', name: '主播电台', id: 3},
        {path: '/find/rankingList', name: '排行榜', id: 4},
        {path: '/find/singer', name: '歌手', id: 5},
        {path: '/find/newMusic', name: '最新音乐', id: 6}
      ],
      actIndex: 0
    }
  },
  components: {
  },
  created () {
    // this.$router.push({path: '/find/personRecomment'})
  },
  methods: {
    cutTab (i, index) {
      this.actIndex = index
      this.$router.push({path: i.path})
    }
  }
}
</script>
<style scoped lang="scss">
  .find {
    width: 820px;
    padding: 15px 30px 30px 30px;
  }
  .tab {
    border-bottom: 1px solid #E1E1E2;
    margin-bottom: 20px;
    text-align: center;
    ul {
      display: flex;
      width: 480px;
      margin: 0 auto;
      li {
        position: relative;
        flex: 1;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        a {
          display: inline-block;
          width: 100%;
        }
        a.router-link-active {
          i {
            position: absolute;
            bottom: 0;
            left: 12px;
            width: 56px;
            height: 2px;
            background: #C62F2F;
          }
        }
      }
      li:hover {
        a {
          color: #C62F2F;
        }
      }
    }
  }
</style>

<template>
    <div>
      <!--主播电台-->
      <ul class="video">
        <li v-for="(i, index) in videoClass" :key="index">
          <div :class="[act>0&&act===index?'active':'']" @click="cut(index)">
            <span class="iconfont icon-video"></span>
            <p>{{i.name}}</p>
          </div>
        </li>
      </ul>
      <div v-show="act===0">
        <tit title="精彩节目推荐"></tit>
        <radio></radio>
      </div>
    </div>
</template>
<script>
import radio from '@/components/radio'
import tit from '@/components/title'
// import { djProgram } from '@/api/api'
export default {
  data () {
    return {
      videoClass: [
        {name: '排行榜'},
        {name: '有声书'},
        {name: '只是技能'},
        {name: '商业财经'},
        {name: '人文历史'},
        {name: '外语世界'},
        {name: '亲子宝贝'},
        {name: '创作|翻唱'},
        {name: '音乐故事'},
        {name: '3D电子'},
        {name: '相声曲艺'},
        {name: '情感调频'},
        {name: '美文读物'},
        {name: '脱口秀'},
        {name: '广播剧'},
        {name: '二次元'},
        {name: '明星做主播'},
        {name: '娱乐|影视'},
        {name: '科技科学'},
        {name: '校园|教育'},
        {name: '旅途|城市'}
      ],
      act: 0
    }
  },
  components: {
    radio,
    tit
  },
  created () {
  },
  methods: {
    cut (index) {
      if (index !== 0) {
        this.act = index
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .video {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    li {
      width: 11%;
      color: #888888;
      div {
        width: 85%;
        padding: 10px 5px;
        text-align: center;
        height: 80px;
        line-height: 30px;
        p {
          font-size: 12px;
        }
        span {
          font-size: 30px;
        }
      }
      div:hover {
        background: #E8E8E8;
      }
      div.active {
        background: #E8E8E8;
      }
    }
    li:first-child {
      color: #c62f2f;
    }
  }
</style>

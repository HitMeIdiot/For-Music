<template>
    <div>
      <!--主播电台-->
      <ul class="video">
        <li>
          <div>
            <img src="http://ox36g1rgh.bkt.clouddn.com/ava.jpg" alt="">
            <p>排行榜</p>
          </div>
        </li>
        <li v-for="(i, index) in cateList" :key="index">
          <!--<div :class="[act>0&&act===index?'active':'']" @click="cut(index)" :style="{background: 'url('+i.picWebUrl+') 18px -2px no-repeat'}">-->
          <div :class="[act===index?'active':'']" @click="cut(i.id,index)">
            <img :src="i.picUWPUrl" alt="">
            <p>{{i.name}}</p>
          </div>
        </li>
      </ul>
      <div v-show="act!==-1">
        <tit title="优秀新电台"></tit>
        <radio :radioList="djRadios" types="2"></radio>
      </div>
      <div v-show="act===-1">
        <tit title="精彩节目推荐"></tit>
        <radio :radioList="radioList" types="1"></radio>
        <tit :title="djRec.name"></tit>
        <radio :radioList="djRec.djRadios" types="2"></radio>
      </div>
    </div>
</template>
<script>
import radio from '@/components/radio'
import tit from '@/components/title'
import { djCatelist, djRecommendType, djRecommend, personalizedDjProgram } from '@/api/api'
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
      act: -1,
      cateList: [],
      djRec: [],
      radioList: [],
      djRadios: [],
      djId: ''
    }
  },
  components: {
    radio,
    tit
  },
  created () {
    this.getCateList()
    this.getDjRec()
    this.getRadio()
    if (this.$route.query.djId) {
      this.djId = this.$route.query.djId
      this.cut(this.djId)
    }
  },
  methods: {
    cut (id, index) {
      this.act = index
      this.cutVideo(id)
    },
    getRadio () {
      personalizedDjProgram().then((res) => {
        console.log('推荐电台', res)
        this.radioList = res.result
      })
    },
    getCateList () {
      djCatelist().then((res) => {
        console.info('电台分类', res)
        if (res.code === 200) {
          this.cateList = res.categories
        }
      })
    },
    cutVideo (type) {
      djRecommendType({params: {type: type}}).then((res) => {
        console.log('电台 - 分类推荐', res)
        if (res.code === 200) {
          this.djRadios = res.djRadios
        }
      })
    },
    getDjRec () {
      djRecommend().then((res) => {
        console.log('电台-推荐', res)
        if (res.code === 200) {
          this.djRec = res
        }
      })
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
      padding: 5px 0;
      div {
        width: 85%;
        padding: 10px 5px;
        text-align: center;
        height: 80px;
        p {
          font-size: 12px;
          margin-top: 5px;
        }
        span {
          font-size: 30px;
        }
        img {
          width: 30px;
          height: 30px;
        }
        &:hover {
          background: #E8E8E8;
        }
        &.active {
          background: #E8E8E8;
        }
      }
      &:first-child {
        color: #c62f2f;
      }
    }
  }
  .dj {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    li {
      width: 18%;
      height: 184px;
      margin-right: 2.5%;
      font-size: 12px;
      img {
        width: 100%;
        cursor: pointer;
      }
      &:nth-of-type(5n) {
        margin-right: 0;
      }
      span {
        color: #888;
      }
    }
  }
</style>

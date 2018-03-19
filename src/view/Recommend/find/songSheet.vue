<template>
    <div class="songSheet">
      <div class="tag">
        <h3 @click="isTap=true">
          {{$store.state.songTag}} <span class="iconfont icon-arrowdown"></span>
        </h3>
        <div class="tagLayer" v-show="isTap">
          <h4>选择标签</h4>
          <div class="con">
            <h5 @click="cutTag('全部歌单')" :class="['全部歌单'===$store.state.songTag?'active':'']">全部歌单 <i></i><b></b></h5>
            <div class="cons" v-for="(i, index) in list" :key="index">
              <p class="lf">{{i.tag}}</p>
              <table class="rg">
                <tr>
                  <td  v-for="(j, k) in i.arr" @click="cutTag(j.name,k,index)" :key="k" :class="[j.name===$store.state.songTag?'active':'']">
                    <span>{{j.name}}</span>
                    <i></i>
                    <b></b>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <classTab :list="tag" @change="change" :tabName="$store.state.alphabetName" class="songTag"></classTab>
      <songs :list="topPlayList"></songs>
    </div>
</template>
<script>
import { topPlayListHighQuality } from '@/api/api'
import songs from '@/components/songs'
import classTab from '@/components/classTab'
export default {
  data () {
    return {
      isAll: true,
      isTap: false,
      topPlayList: [],
      tag: {
        name: '热门标签',
        list: [
          {type: 'tag', name: '华语'},
          {type: 'tag', name: '流行'},
          {type: 'tag', name: '摇滚'},
          {type: 'tag', name: '民谣'},
          {type: 'tag', name: '电子'},
          {type: 'tag', name: '轻音乐'},
          {type: 'tag', name: '影视原声'},
          {type: 'tag', name: 'ACG'},
          {type: 'tag', name: '怀旧'},
          {type: 'tag', name: '治愈'}
        ]
      },
      list: [
        {tag: '语种',
          arr: [
            {name: '华语', hot: true},
            {name: '欧美'},
            {name: '日语'},
            {name: '韩语'},
            {name: '粤语'},
            {name: '小语种'}
          ]
        },
        {tag: '风格',
          arr: [
            {name: '流行', hot: true},
            {name: '摇滚'},
            {name: '民谣'},
            {name: '电子'},
            {name: '舞曲'},
            {name: '说唱'},
            {name: '轻音乐'},
            {name: '爵士'},
            {name: '乡村'},
            {name: 'R&B/Soul'},
            {name: '古典'},
            {name: '民族'},
            {name: '英伦'},
            {name: '金属'},
            {name: '朋克'},
            {name: '蓝调'},
            {name: '雷鬼'},
            {name: '世界音乐'},
            {name: '拉丁'},
            {name: '另类/独立'},
            {name: 'New Age'},
            {name: '古风'},
            {name: '后摇'},
            {name: 'Bossa Nova'}
          ]
        },
        {tag: '场景',
          arr: [
            {name: '清晨'},
            {name: '夜晚'},
            {name: '学习'},
            {name: '工作'},
            {name: '午休'},
            {name: '地铁'},
            {name: '驾车'},
            {name: '运动'},
            {name: '旅行'},
            {name: '散步'}
          ]
        },
        {tag: '情感',
          arr: [
            {name: '怀旧'},
            {name: '清新'},
            {name: '浪漫'},
            {name: '性感'},
            {name: '伤感'},
            {name: '治愈'},
            {name: '放送'},
            {name: '孤独'},
            {name: '感动'},
            {name: '兴奋'},
            {name: '快乐'},
            {name: '安静'},
            {name: '思念'}
          ]
        },
        {tag: '情感',
          arr: [
            {name: '影视原声'},
            {name: 'ACG'},
            {name: '校园'},
            {name: '游戏'},
            {name: '70后'},
            {name: '80后'},
            {name: '90后'},
            {name: '网络歌曲'},
            {name: 'KTV'},
            {name: '经典'},
            {name: '翻唱'},
            {name: '吉他'},
            {name: '钢琴'},
            {name: '乐器'},
            {name: '儿童'},
            {name: '榜单'},
            {name: '00后'}
          ]
        }
      ]
    }
  },
  components: {
    songs,
    classTab
  },
  created () {
    this.getTopPlayList(this.$store.state.songTag)
  },
  methods: {
    change (val, type) {
      if (type === 'tag') {
        this.isTap = false
        this.$store.state.songTag = val
        this.getTopPlayList(val)
      }
    },
    // 歌单
    getTopPlayList (name) {
      topPlayListHighQuality({params: {limit: 60, cat: name}}).then((res) => {
        console.log('歌单', res)
        if (res.code === 200) {
          if (res.playlists.length === 0) {
            this.$toast(res.msg)
          } else {
            this.topPlayList = res.playlists
          }
        }
      })
    },
    cutTag (name, k, index) {
      this.isTap = false
      this.$store.state.songTag = name
      this.getTopPlayList(this.$store.state.songTag)
    }
  }
}
</script>
<style scoped lang="scss">
  .songSheet{
    .tag {
      position: relative;
      h3 {
        width: 80px;
        height: 25px;
        line-height: 25px;
        background: #fff;
        border-radius: 5px;
        font-size: 12px;
        padding: 0 5px;
        cursor: pointer;
        text-align: center;
        color: #333333;
        span {
          font-size: 12px;
        }
      }
      h3:hover {
        background: #f5f6f7;
      }
      .tagLayer {
        position: absolute;
        width: 540px;
        height: 420px;
        box-shadow: -2px -2px 5px #ddd;
        border: 1px solid #ddd;
        background: #FAFAFA;
        z-index: 100;
        border-radius: 5px;
        h4 {
          height: 49px;
          line-height: 49px;
          border-bottom: 1px solid #E2E2E3;
          font-size: 14px;
          padding-left: 20px;
        }
        .con {
          margin-left: 20px;
          height: 340px;
          overflow-y: scroll;
          h5 {
            width: 500px;
            height: 34px;
            line-height: 34px;
            border: 1px solid #E2E2E3;
            text-align: center;
            margin-top: 10px;
            cursor: pointer;
            color: #868686;
          }
          h5:hover {
            background: #F5F5F7;
            color: #333333;
          }
          .cons {
            display: flex;
            align-items: center;
            margin-top: 10px;
            .lf {
              width: 80px;
              flex-shrink: 0;
            }
            .rg {
              display: flex;
              width: 420px;
              align-items: center;
              flex-direction: row;
              flex-wrap: wrap;
              tr {
                width: 100%;
                display: flex;
                align-items: center;
                flex-direction: row;
                flex-wrap: wrap;
                border-top: 1px solid #ddd;
                border-left: 1px solid #ddd;
                td {
                  width: 20%;
                  cursor: pointer;
                  text-align: center;
                  height: 34px;
                  flex-shrink: 0;
                  line-height: 34px;
                  border-bottom: 1px solid #ddd;
                  border-right: 1px solid #ddd;
                  background: #FAFAFA;
                  span {
                    font-size: 12px;
                    color: #868686;
                  }
                }
                td:hover {
                  background: #F5F5F7;
                  span {
                    color: #333333;
                  }
                }
                td.active {
                  border: 1px solid #C62F2F;
                  position: relative;
                }
              }
            }
          }
        }
      }
    }
    .active {
      border: 1px solid #C62F2F;
      position: relative;
      i {
        position: absolute;
        width: 1px;
        height: 8px;
        background: #fff;
        right: 3px;
        bottom: 0;
        z-index: 99;
        transform: rotate(45deg);
      }
      b {
        content: '';
        position: absolute;
        width: 1px;
        height: 4px;
        background: #fff;
        right: 7px;
        bottom: 0.905px;
        z-index: 99;
        transform: rotate(-45deg);
      }
    }
    .active:after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      right: 0;
      bottom: 0;
      border-bottom: 16px solid #C62F2F;
      border-left: 16px solid transparent;
      z-index: 88;
    }
    .songTag{
      margin-bottom: 10px;
    }
  }
</style>

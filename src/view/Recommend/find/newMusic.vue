<template>
    <div>
      <tab :list="tabList"></tab>
      <div class="m1">
        <ul>
          <li v-for="(i, index) in tabClass"
              :key="index"
              :class="[index===act?'active':'']"
              @click="cutTab(i,index)">
            {{i.name}}
            <i></i>
          </li>
        </ul>
      </div>
      <div class="m2">
        <div v-show="actIndex===1">新歌速递</div>
        <album v-show="actIndex===0" :list="newAlbumList"></album>
      </div>
    </div>
</template>
<script>
import tab from '@/components/tab_com'
import album from '@/components/album'
import { topAlbum } from '@/api/api'
export default {
  data () {
    return {
      tabList: [
        {name: '新碟上架'},
        {name: '新歌速递'}
      ],
      tabClass: [
        {name: '全部'},
        {name: '华语'},
        {name: '欧美'},
        {name: '韩国'},
        {name: '日本'}
      ],
      actIndex: 0,
      act: 0,
      newAlbumList: []
    }
  },
  components: {
    tab,
    album
  },
  created () {
    this.getNewAlbum()
  },
  methods: {
    cutTab (i, index) {
      this.act = index
    },
    getNewAlbum () {
      topAlbum({params: {tag: '全部'}}).then((res) => {
        console.log(res)
        if (res.code === 200) {
          this.newAlbumList = res.albums
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .m1 {
    margin-bottom: 10px;
    >ul {
      display: flex;
      width: 100%;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
      li {
        padding-right: 20px;
        position: relative;
      }
      li.active:after {
        content: '';
        position: absolute;
        width: 70%;
        height: 2px;
        background: #999999;
        bottom: -5px;
      }
    }
  }
</style>

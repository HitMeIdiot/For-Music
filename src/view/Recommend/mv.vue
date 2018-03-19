<template>
    <div class="mv_con">
      <tab :list="tabList"></tab>
      <div v-show="actIndex===0">
        <tit title="最新MV"></tit>
        <mv :mvList="newMv"></mv>
      </div>
      <div v-show="actIndex===2">
        <div class="m2">
          <classTab :list="area" @change="change" :tabName="$store.state.areaName"></classTab>
          <classTab :list="type" @change="change" :tabName="$store.state.typeName"></classTab>
          <classTab :list="rank" @change="change" :tabName="$store.state.sortName"></classTab>
        </div>
        <mv :mvList="allMv"></mv>
      </div>
    </div>
</template>
<script>
import { mvFirst, topMv } from '@/api/api'
import tab from '@/components/tab_com'
import tit from '@/components/title'
import mv from '@/components/mv'
import classTab from '@/components/classTab'
export default {
  data () {
    return {
      tabList: [
        {name: 'MV精选'},
        {name: '网易出品'},
        {name: '全部MV'}
      ],
      actIndex: 0,
      newMv: [],
      allMv: [],
      area: {
        name: '地区',
        list: [
          {name: '全部', type: 'area'},
          {name: '内地', type: 'area'},
          {name: '港台', type: 'area'},
          {name: '欧美', type: 'area'},
          {name: '韩国', type: 'area'},
          {name: '日本', type: 'area'}
        ]
      },
      rank: {
        name: '排序',
        list: [
          {type: 'sort', name: '上升最快'},
          {type: 'sort', name: '最热'},
          {type: 'sort', name: '最新'}
        ]
      },
      type: {
        name: '类型',
        list: [
          {type: 'type', name: '全部'},
          {type: 'type', name: '官方版'},
          {type: 'type', name: '原生'},
          {type: 'type', name: '现场版'},
          {type: 'type', name: '网易出品'}
        ]
      },
      areaName: '全部',
      typeName: '全部',
      sortName: '上升最快'
    }
  },
  computed: {
  },
  components: {
    tab,
    classTab,
    mv,
    tit
  },
  created () {
    this.getNewMv()
    this.getAllMv()
  },
  methods: {
    change (val, type) {
      if (type === 'area') {
        this.$store.state.areaName = val
      } else if (type === 'type') {
        this.$store.state.typeName = val
      } else if (type === 'sort') {
        this.$store.state.sortName = val
      }
    },
    getNewMv () {
      mvFirst().then((res) => {
        console.log('最新MV', res)
        if (res.code === 200) {
          this.newMv = res.data
        }
      })
    },
    getAllMv () {
      topMv().then((res) => {
        console.log('全部MV', res)
        if (res.code === 200) {
          this.allMv = res.data
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .mv_con {
    width: 820px;
    padding: 15px 30px 30px 30px;
    .m2 {
      border-bottom: 1px solid #E1E1E2;
      padding-bottom: 10px;
      margin-bottom: 30px;
    }
  }
</style>

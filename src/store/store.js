import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

export default new vuex.Store({
  state: {
    // 歌单详情里播放音乐
    mp3Url: '',
    isPlay: false,
    playSongId: '',
    songImg: 'http://ox36g1rgh.bkt.clouddn.com/ava.jpg',
    songName: '',
    songSinger: '',
    album: '',
    albumId: '',
    songSheetId: '',
    songSheetName: '',
    // 歌词
    lyric: '',
    // 歌单标签
    songTag: '全部歌单',
    // 精彩评论
    wonderCom: '',
    // 分页的第几页
    offset: 0,
    // 歌手
    areaName: '全部',
    typeName: '全部',
    sortName: '上升最快',
    langName: '全部',
    classifyName: '全部',
    alphabetName: '热门',
    // 播放mv
    mp4Url: '',
    eventList: [],
    // 个人信息里的菜单切换
    upCss: 'icon-caidan1',
    downCss: 'icon-caidan1',
    isCover: false
  },
  mutations: {
    test () {

    }
  },
  actions: {
    mes () {
      alert(1)
    }
  }
})

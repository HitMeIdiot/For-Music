import { musicUrl, commentLike, playlistTracks } from '@/api/api'
export default{
  install (Vue, options) {
    // 播放歌曲
    Vue.prototype.playMusic = function (id, name, img, singer) {
      this.$store.state.songName = name
      this.$store.state.playSongId = id
      this.$store.state.songImg = img
      this.$store.state.songSinger = singer
      musicUrl({params: {id: id}}).then((res) => {
        console.log('歌曲url', res)
        if (res.code === 200) {
          if (res.data[0].url) {
            this.$store.state.mp3Url = res.data[0].url
          } else {
            this.$toast('暂无资源')
          }
          // console.log(this.$store.state.mp3Url)
        }
      })
    }
    // 转时间格式
    Vue.prototype.turnTime = function (time, type) {
      if (time) {
        time = new Date(time)
        let now = new Date()
        let year = time.getFullYear()
        let mon = time.getMonth() + 1
        let day = time.getDate()
        let hou = time.getHours()
        let min = time.getMinutes()
        let tamp = time.getTime()
        // console.log(year + '年' + mon + '月' + day + '日' + hou + '时')
        if (type) {
          mon = (mon < 10 ? '0' + mon : mon)
          day = (day < 10 ? '0' + day : day)
          time = year + '-' + mon + '- ' + day
        } else {
          hou = (hou < 10 ? '0' + hou : hou)
          min = (min < 10 ? '0' + min : min)
          if (year < now.getFullYear()) {
            time = year + '年' + mon + '月' + day + '日' + ' ' + hou + ':' + min
          } else {
            if (Math.abs(now.getDate() - day) >= 2) {
              time = mon + '月' + day + '日' + ' ' + hou + ':' + min
            } else if (now.getDate() - day === 1) {
              time = '昨天' + ' ' + hou + ':' + min
            } else if (now.getDate() - day === 0) {
              if (now.getTime() - tamp < 3600000 && parseInt(min) !== 0) {
                if (now.getHours() <= hou) {
                  time = now.getMinutes() - parseInt(min) + '分钟前'
                  if (now.getMinutes() - parseInt(min) === 0) {
                    time = '刚刚'
                  }
                } else {
                  time = 60 + now.getMinutes() - parseInt(min) + '分钟前'
                }
              } else {
                time = hou + ':' + min
              }
            }
          }
        }
        return time
      }
    }
    // 给评论点赞或取消赞
    Vue.prototype.giveLove = function (id, cid, type) {
      let t = 1
      commentLike({params: {id: id, cid: cid, t: t, type: type}}).then((res) => {
        console.log('点赞', res)
        if (res.code === 200) {
          alert('成功')
        }
      })
    }
    Vue.prototype.addLove = function (tracks) {
      playlistTracks({params: {op: 'add', pid: '460522980', tracks: tracks}}).then((res) => {
        console.log('添加歌曲', res)
        if (res.code === 200) {
          alert('成功')
        }
      })
    }
    Vue.prototype.playAll = function () {
      this.$store.state.curSongIndex = 0
      if (this.$store.state.curSongIndex <= this.$store.state.tracks.length) {
        let i = this.$store.state.tracks[this.$store.state.curSongIndex]
        this.$store.commit('AD', i)
        this.playMusic(i.id, i.name, i.album.blurPicUrl, i.album.artists)
      }
    }
  }
}

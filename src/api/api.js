import axios from 'axios'

// 获取专辑内容
export const album = params => {
  return axios.get(`api/album`, params).then(res => res)
}

// 获取歌手单曲
export const artists = params => {
  return axios.get(`api/artists`, params).then(res => res)
}

// 获取歌手专辑列表
export const artistsAlbum = params => {
  return axios.get(`api/artist/album`, params).then(res => res)
}
// 艺术家-信息
export const artistDec = params => {
  return axios.get(`api/artist/desc`, params).then(res => res)
}
// 艺术家-mv
export const artistMv = params => {
  return axios.get(`api/artist/mv`, params).then(res => res)
}

// 获取 banner
export const banner = params => {
  return axios.get(`api/banner`, params).then(res => res)
}

export const checkMusic = params => {
  return axios.get(`api/check/music`, params).then(res => res)
}

export const commentMusic = params => {
  return axios.get(`api/comment/music`, params).then(res => res)
}

export const commentMv = params => {
  return axios.get(`api/comment/mv`, params).then(res => res)
}

export const commentAlbum = params => {
  return axios.get(`api/comment/album`, params).then(res => res)
}

export const commentPlaylist = params => {
  return axios.get(`api/comment/playlist`, params).then(res => res)
}

// 未知 api
export const commentLike = params => {
  return axios.get(`api/comment/like`, params).then(res => res)
}

export const commentDj = params => {
  return axios.get(`api/comment/dj`, params).then(res => res)
}

// 签到
export const dailySignIn = params => {
  return axios.get(`api/daily_signin`, params).then(res => res)
}
// djradio detail
export const djDetail = params => {
  return axios.get(`api/dj/detail`, params).then(res => res)
}

// dj主播 radio
export const djProgram = params => {
  return axios.get(`api/dj/program`, params).then(res => res)
}

export const djProgramDetail = params => {
  return axios.get(`api/dj/program/detail`, params).then(res => res)
}
export const djRecommendType = params => {
  return axios.get(`api/dj/recommend/type`, params).then(res => res)
}

export const djSub = params => {
  return axios.get(`api/dj/sub`, params).then(res => res)
}

export const djCatelist = params => {
  return axios.get(`api/dj/catelist`, params).then(res => res)
}

export const djHot = params => {
  return axios.get(`api/dj/hot`, params).then(res => res)
}

// 电台 - 推荐
export const djRecommend = params => {
  return axios.get(`api/dj/recommend`, params).then(res => res)
}

// 获取动态
export const event = params => {
  return axios.get(`api/event`, params).then(res => res)
}

// 垃圾桶
export const fmTrash = params => {
  return axios.get(`api/fm_trash`, params).then(res => res)
}

export const follow = params => {
  return axios.get(`api/follow`, params).then(res => res)
}

// 喜欢歌曲
export const like = params => {
  return axios.get(`api/like`, params).then(res => res)
}

export const likeList = params => {
  return axios.get(`api/likelist`, params).then(res => res)
}

// 手机登录
export const loginCellphone = params => {
  return axios.get(`api/login/cellphone`, params).then(res => res)
}

// 邮箱登录
export const login = params => {
  return axios.get(`api/login?email=forheyin@163.com&password=caizhi1117`, params).then(res => res)
}

// 登录刷新
export const loginRefresh = params => {
  return axios.get(`api/login/refresh`, params).then(res => res)
}

// 不明 api
export const logWeb = params => {
  return axios.get(`api/log/web`, params).then(res => res)
}

// 获取歌词
export const lyric = params => {
  return axios.get(`api/lyric`, params).then(res => res)
}

// 获取音乐 url
export const musicUrl = params => {
  return axios.get(`api/music/url`, params).then(res => res)
}

// 最新 mv
export const mvFirst = params => {
  return axios.get(`api/mv/first`, params).then(res => res)
}

// 播放 mv
export const mvUrl = params => {
  return axios.get(`api/mv/url`, params).then(res => res)
}

// mv
export const mv = params => {
  return axios.get(`api/mv`, params).then(res => res)
}

// 私人 FM
export const personalFm = params => {
  return axios.get(`api/personal_fm`, params).then(res => res)
}

// 推荐歌单
export const personalized = params => {
  return axios.get(`api/personalized`, params).then(res => res)
}

// 推荐dj
export const personalizedDjProgram = params => {
  return axios.get(`api/personalized/djprogram`, params).then(res => res)
}

// 推荐新音乐
export const personalizedNewSong = params => {
  return axios.get(`api/personalized/newsong`, params).then(res => res)
}

// 独家放送
export const personalizedPrivateContent = params => {
  return axios.get(`api/personalized/privatecontent`, params).then(res => res)
}

// 推荐mv
export const personalizedMv = params => {
  return axios.get(`api/personalized/mv`, params).then(res => res)
}

// 获取歌单内列表
export const playlistDetail = params => {
  return axios.get(`api/playlist/detail`, params).then(res => res)
}

// 收藏单曲到歌单,从歌单删除歌曲 op=del,add;pid=歌单id,tracks=歌曲id
export const playlistTracks = params => {
  return axios.get(`api/playlist/tracks`, params).then(res => res)
}

export const playlistHot = params => {
  return axios.get(`api/playlist/hot`, params).then(res => res)
}

export const playlistCatList = params => {
  return axios.get(`api/playlist/catlist`, params).then(res => res)
}

// 推荐节目
export const programRecommend = params => {
  return axios.get(`api/program/recommend`, params).then(res => res)
}

// 获取每日推荐歌曲
export const recommendSongs = params => {
  return axios.get(`api/recommend/songs`, params).then(res => res)
}

// 获取每日推荐歌单
export const recommendResource = params => {
  return axios.get(`api/recommend/resource`, params).then(res => res)
}

// 取消推荐
export const recommendDislike = params => {
  return axios.get(`api/recommend/dislike`, params).then(res => res)
}

// 获取每日推荐歌曲
export const recommendLike = params => {
  return axios.get(`api/recommend/like`, params).then(res => res)
}

// 搜索
export const search = params => {
  return axios.get(`api/search`, params).then(res => res)
}

// 搜索 multimatch
export const searchMultimatch = params => {
  return axios.get(`api/search/multimatch`, params).then(res => res)
}

// 搜索 suggest,搜索结果包含单曲,歌手,歌单,mv信息
export const searchSuggest = params => {
  return axios.get(`api/search/suggest`, params).then(res => res)
}

// simi ,相似歌单
export const simiPlaylist = params => {
  return axios.get(`api/simi/playlist`, params).then(res => res)
}

// simi ,相似歌曲
export const simiPlaySong = params => {
  return axios.get(`api/simi/song`, params).then(res => res)
}

// simi ,相似mv
export const simiPlayMv = params => {
  return axios.get(`api/simi/mv`, params).then(res => res)
}

// simi ,相似关注的用户
export const simiPlayUser = params => {
  return axios.get(`api/simi/user`, params).then(res => res)
}

// simi ,相似歌手
export const simiPlayArtist = params => {
  return axios.get(`api/simi/artist`, params).then(res => res)
}

// 获取音乐详情
export const songDetail = params => {
  return axios.get(`api/song/detail`, params).then(res => res)
}

// 新碟上架 http://music.163.com/#/discover/album/
export const topAlbum = params => {
  return axios.get(`api/top/album`, params).then(res => res)
}

// 热门歌手 http://music.163.com/#/discover/artist/
export const topArtists = params => {
  return axios.get(`api/top/artists`, params).then(res => res)
}

export const topList = params => {
  return axios.get(`api/top/list`, params).then(res => res)
}

export const topMv = params => {
  return axios.get(`api/top/mv`, params).then(res => res)
}

export const topPlaylist = params => {
  return axios.get(`api/top/playlist`, params).then(res => res)
}

export const topPlayListHighQuality = params => {
  return axios.get(`api/top/playlist/highquality`, params).then(res => res)
}

export const topSong = params => {
  return axios.get(`api/top/song`, params).then(res => res)
}

export const toplist = params => {
  return axios.get(`api/toplist`, params).then(res => res)
}

export const topListArtist = params => {
  return axios.get(`api/toplist/artist`, params).then(res => res)
}

export const topListDetail = params => {
  return axios.get(`api/toplist/detail`, params).then(res => res)
}

// 获取用户歌单
export const userPlaylist = params => {
  return axios.get(`api/user/playlist`, params).then(res => res)
}

// 获取用户电台
export const userAudio = params => {
  return axios.get(`api/user/audio`, params).then(res => res)
}

export const userCloud = params => {
  return axios.get(`api/user/cloud`, params).then(res => res)
}

// 云盘数据详情? 暂时不要使用
export const userCloudSearch = params => {
  return axios.get(`api/user/cloud/search`, params).then(res => res)
}

// 用户动态
export const userEvent = params => {
  return axios.get(`api/user/event`, params).then(res => res)
}

export const userDetail = params => {
  return axios.get(`api/user/detail`, params).then(res => res)
}

export const userDj = params => {
  return axios.get(`api/user/dj`, params).then(res => res)
}

export const userFolloweds = params => {
  return axios.get(`api/user/followeds`, params).then(res => res)
}

export const userFollows = params => {
  return axios.get(`api/user/follows`, params).then(res => res)
}

export const userSubcount = params => {
  return axios.get(`api/user/subcount`, params).then(res => res)
}
export const userRecord = params => {
  return axios.get(`api/user/record`, params).then(res => res)
}

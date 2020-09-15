const api = 'http://122.51.183.169:3000'

// 首页的api
export const banner = api + '/banner?type=1'
export const recommondList = api + '/personalized?limit=6'
export const newsong = api + '/personalized/newsong'
export const newRadio = api + '/personalized/djprogram'
// 歌单相关
export const songList = api + '/playlist/detail'
export const nowSong = api + '/song/url'
export const listType = api + '/playlist/hot'
export const musicList = api + '/top/playlist'

// 用户相关
export const phoneLogin = api + '/login/cellphone'
export const loginStatus = api + '/login/status'
export const userInfo = api + '/user/detail'
export const userPlayList = api + '/user/playlist'

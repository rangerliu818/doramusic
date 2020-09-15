import axios from 'axios'
import { banner, recommondList, songList, newsong, newRadio, nowSong, listType, musicList, phoneLogin, loginStatus, userInfo, userPlayList } from './config'

axios.defaults.timeout = 30000

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCredentials = true

export default {
  getBannerInfo () {
    return axios.get(banner)
  },
  getRecommondList () {
    return axios.get(recommondList)
  },
  getSongList (id) {
    return axios.get(songList + `?id=${id}`)
  },
  getNewSong () {
    return axios.get(newsong)
  },
  getNewRadio () {
    return axios.get(newRadio)
  },
  getNowSong (id) {
    return axios.get(nowSong + `?id=${id}`)
  },
  getListType () {
    return axios.get(listType)
  },
  getMusicList (title) {
    return axios.get(musicList + `?cat=${title}`)
  },
  // login
  phoneLogin (data) {
    return axios.post(phoneLogin, data)
  },
  loginStatus () {
    return axios.get(loginStatus)
  },
  userInfo (id) {
    return axios.get(userInfo + `?uid=${id}`)
  },
  userPlayList (id) {
    return axios.get(userPlayList + `?uid=${id}`)
  }
}

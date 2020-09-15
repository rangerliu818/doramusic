import * as types from './mutation-type'

const mutations = {
  [types.SET_LIST_ID] (state, listId) {
    state.listId = listId
  },
  [types.SET_NOW_SONG] (state, nowSong) {
    state.nowSong = nowSong
  },
  [types.SET_PLAY_LIST] (state, playList) {
    state.playList = playList
  },
  [types.SET_PLAY_STATE] (state, flag) {
    state.playing = flag
  }
}

export default mutations

<template>
  <div class="song-container">
      <div class="song-title">
          <div class="title1">推荐歌曲</div>
          <div class="title2">查看更多</div>
      </div>
      <div class="song-name">
          <ul>
              <li class="song-list" v-for="(item,index) in songList" :key="index">
                <img class="song-img" :src="item.picUrl">
                <div class="song-text">
                    <div class="text-title">{{item.song.name}}</div>
                    <div class="text-artist">
                        <span class="artist-sq">SQ</span>
                        <span class="artist">{{item.song.artists[0].name}}</span>
                    </div>
                </div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import api from '../../../api/index'
export default {
  data () {
    return {
      songList: []
    }
  },
  methods: {
    _getNewSong () {
      api.getNewSong()
        .then((res) => {
          if (res.status === 200 && res.statusText === 'OK') {
            // 在这把新歌的全部放进state
            console.log(res.data.result[1].song.artists.name)
            this.songList = res.data.result.slice(0, 3)
          }
        })
    }
  },
  created () {
    this._getNewSong()
  }
}
</script>

<style lang="less" scoped>
@import url('../../../assets/style/global.less');

  .song-container {
    margin: 0 auto;
    margin-top: 1rem;
    width: 95%;
    .song-title {
      display: flex;
      justify-content: space-between;
      .title1 {
        font-size: 1rem;
        font-weight: bold;
      }
      .title2 {
          font-size: 0.7rem;
          border: 0.1rem solid #737373;
          padding: 0.1rem 0.3rem;
          border-radius: 2rem;
          box-shadow: 0.1rem 0.1rem 0.01rem #828282;
      }
    }
    .song-name {
      .song-list{
        display: flex;
        padding-top: 0.5rem;
        .song-img {
          width: 15vw;
          height: 15vw;
          // padding-right: 0.8rem;
          margin-right: 0.8rem;
          border-radius: 0.3rem
        }
        .song-text {
            display: flex;
            flex-direction: column;
            text-align: left;
            justify-content: center;
            .text-title{
                font-size: 1rem;
                font-weight: bold;
                padding-bottom: 0.3rem;
            }
            .text-artist{
                .artist-sq{
                    font-size: 0.05rem;
                    color: @bgcolor;
                    border: 0.05rem solid @bgcolor;
                    font-weight: 520;
                    padding: 0.1rem;
                }
                .artist{
                    font-size: 0.5rem;
                    color: #737373;
                    margin-left: 0.2rem;
                }
            }
        }
      }
    }
  }
</style>>

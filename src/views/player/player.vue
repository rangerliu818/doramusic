<template>
  <div class="player">
      <transition>
        <div class="full-player" style="display:none">
            <div class="player-head">
                <div @click="goMini">
                    <i class="iconfont icon-fanhui"></i>
                </div>
                <div class="head-name" v-if="currentSong == null">
                  <div>歌曲名</div>
                  <div>作者</div>
                </div>
                <div class="head-name" v-else>
                  <div>{{currentSong.name}}</div>
                  <div>{{author}}</div>
                </div>
                <div><i class="iconfont icon-fenxiang"></i></div>
            </div>
            <div class="player-middle">
                <div></div>
                <div class="cd-img">
                  <div class="img"><img class="song-img playing" ></div>
                </div>
                <div class="menu1">
                    <ul>
                        <li class="iconfont icon-xihuan"></li>
                        <li class="iconfont icon-pinglun"></li>
                        <li class="iconfont icon-gengduo1"></li>
                    </ul>
                </div>
              <!--  <div>歌词</div> -->
            </div>
            <div class="player-menu">
                <div class="menu-progress">
                </div>
                <div class="menu2">
                  <div class="music-playway">
                    <i class="iconfont icon-iconsMusicyemianbofangmoshiAlrepeatOnejiaodian"></i>
                  </div>
                  <div class="music-before" @click="prevSong">
                      <i class="iconfont icon-shangyishouxianxing"></i>
                  </div>
                  <div class="music-play" @click="playOrpause">
                      <i class="iconfont icon-1"></i>
                  </div>
                  <div class="music-next" @click="nextSong">
                      <i class="iconfont icon-xiayishouxianxing"></i>
                  </div>
                  <div class="music-list">
                      <i class="iconfont icon-iconsMusicyemianbofangmoshiPlayList"></i>
                  </div>
                </div>
            </div>
        </div>
      </transition>
      <transition>
        <div class="mini-player" @click="goFull">
          <img class="img-mini" />
        </div>
      </transition>
      <audio class="audio" :src='nowSong.url' @ended="nextSong" autoplay></audio>
     <!-- <audio id="music-audio" ref="audio" @ended="end" autoplay @canplay="ready" @error="error" @timeupdate="updateTime"></audio> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../../api/index'
export default {
  data () {
    return {
      currentSong: {},
      currentIndex: -1,
      author: '歌手'
    }
  },
  created () {
    this.judgeState()
  },
  computed: {
    ...mapGetters([
      'nowSong',
      'playList',
      'playing'
    ])
  },
  watch: {
    nowSong (nowSong) {
      const audio = document.querySelector('.audio')
      const img1 = document.querySelector('.song-img')
      const img2 = document.querySelector('.img-mini')
      const current = this.$store.state.playList.find((item) => item.id === nowSong.id)
      this.currentSong = current
      this.author = current.ar[0].name
      this.currentIndex = this.$store.state.playList.findIndex((item) => item.id === nowSong.id)
      audio.src = nowSong.url
      audio.pause()
      img1.src = current.al.picUrl
      img2.src = current.al.picUrl
      // setTimeout(audio.play(), 2000)
    },
    playing (playing) {
      console.log(playing)
      this.changIcon(playing)
    }
  },
  methods: {
    goMini () {
      const full = document.querySelector('.full-player')
      const mini = document.querySelector('.mini-player')
      mini.style.display = ''
      full.style.display = 'none'
    },
    goFull () {
      const full = document.querySelector('.full-player')
      const mini = document.querySelector('.mini-player')
      mini.style.display = 'none'
      full.style.display = 'flex'
    },
    playOrpause () {
      const audio = document.querySelector('.audio')
      const playstate = this.$store.state.playing
      if (!playstate) {
        audio.play()
        this.$store.commit('SET_PLAY_STATE', true)
        this.changIcon(true)
      } else {
        audio.pause()
        this.$store.commit('SET_PLAY_STATE', false)
        this.changIcon(false)
      }
    },
    changIcon (state) {
      const playicon = document.querySelector('.menu2 div:nth-child(3) i')
      const cd = document.querySelector('.song-img')
      const minicd = document.querySelector('.img-mini')
      if (state === true) {
        console.log(1)
        playicon.setAttribute('class', 'iconfont icon-zanting')
        cd.classList.add('playing')
        minicd.classList.add('playing')
      } else {
        console.log(2)
        playicon.setAttribute('class', 'iconfont icon-1')
        cd.classList.remove('playing')
        minicd.classList.remove('playing')
      }
    },
    judgeState () {
      const audio = document.querySelector('.audio')
      if (!this.$store.state.nowSong) {
        this.changIcon(false)
        audio.pause()
      }
    },
    prevSong () {
      if (this.currentIndex > 0) {
        this.currentIndex--
        this.changeSong()
      } else {
        this.currentIndex = this.$store.state.playList.length - 1
        this.changeSong()
      }
    },
    nextSong () {
      if (this.currentIndex === this.$store.state.playList.length - 1) {
        this.currentIndex = 0
        this.changeSong()
      } else {
        this.currentIndex++
        this.changeSong()
      }
    },
    changeSong () {
      this.currentSong = this.$store.state.playList[this.currentIndex]
      this.author = this.currentSong.ar[0].name
      api.getNowSong(this.currentSong.id)
        .then((res) => {
          if (res.status === 200 && res.statusText === 'OK') {
            const nowSong = res.data.data[0]
            // console.log(this.songList.tracks)
            this.$store.commit('SET_NOW_SONG', nowSong)
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/icon/player/player-icon.css';
.player{
    position: relative;
}
    .full-player{
        width: 100vw;
        height: 100vh;
        background-color: #2e3030;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 301;
        .player-head{
            display: flex;
            justify-content: space-between;
            padding:1rem 1rem;
            .head-name{
              display: flex;
              flex-direction: column;
              div:nth-child(1){
                font-size: 1.2rem;
              }
              div:nth-child(2){
                font-size: 0.8rem;
              }
            }
            i{
               font-size: 1.5rem;
            }
        }
        .player-middle{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 0 auto;
            align-self: auto;
            flex-grow: 1;
            padding: 3rem 0;
            .cd-img{
              .img{
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 85vw;
                height: 85vw;
                background-image: url('../../assets/images/cd.png');
                background-size:100% 100%;
                background-repeat: no-repeat;
                line-height: 70vw;
                .song-img{
                  width: 50vw;
                  height: 50vw;
                  margin: auto;
                  border-radius: 50%;
                }
              }
            }
            .menu1{
              padding: 0 1rem;
              ul{
                display: flex;
                justify-content: space-between;
                li{
                  font-size: 1.5rem
                }
              }
            }
        }
        .player-menu{
            .menu-progress{

            }
            .menu2{
                display: flex;
                justify-content: space-between;
                padding-bottom: 2rem;
                padding-left: 2.5rem;
                padding-right: 2.5rem;
                line-height: 3rem;
                i{
                    font-size: 1.7rem
                }
                div:nth-child(3) i{
                    font-size: 2.7rem;
                }
            }
        }
    }
    .mini-player{
        position: fixed;
        width: 2rem;
        height: 2rem;
        background-image: url('../../assets/images/cd.png');
        background-size:100% 100%;
        background-repeat: no-repeat;
        border-radius: 50%;
        right: 0.8rem;
        top: 1rem;
        display: flex;
        .img-mini{
          align-self: center;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          margin: auto;
        }
    }
    .playing{animation:10s linear infinite CDturn;}/*3秒转一圈，均速，无限，应用CDturn样式*/

    @keyframes CDturn{
      from{transform:rotate(0deg)}
      to{transform:rotate(360deg)}
    }
</style>

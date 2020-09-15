<template>
  <div class="song-container">
      <div class="list-head">
          <div @click="goBack">
              <i class="iconfont icon-fanhui"></i>
          </div>
          <div class="head-title">歌单</div>
      </div>
      <div class="list-middle">
        <div class="middle-view">
            <img class="middle-img" :src='songList.coverImgUrl'  />
            <div class="middle-a">
                <div class="middle-title">{{songList.name}}</div>
                <div class="middle-user" v-if="songList.creator">
                    <img class="user-img"  :src='songList.creator.avatarUrl'  />
                    <span>{{songList.creator.nickname}}</span>
                </div>
                <div class="middle-text">{{songList.description}}</div>
            </div>
        </div>
        <div>
            <div class="middle-menu">
                <ul>
                    <li>
                        <i class="iconfont icon-pinglun"></i>
                        <div>{{songList.commentCount}}</div>
                    </li>
                    <li>
                        <i class="iconfont icon-fenxiang"></i>
                        <div>{{songList.shareCount}}</div>
                    </li>
                    <li>
                        <i class="iconfont icon-gengduo1"></i>
                        <div>更多</div>
                    </li>
                </ul>
            </div>
        </div>
      </div>
      <div class="list-foot">
          <div class="foot-menu">
            <div class="foot-all">
                <i class="iconfont icon-1">播放全部</i>
            </div>
            <div class="menu-insert">+收藏(<span>{{songList.subscribedCount}}</span>)</div>
          </div>
          <ul class="song-list" v-for="(item,index) in songList.tracks" :key="index">
              <li  @click="playSong(item.id)">
                <div class="index">{{index + 1}}</div>
                <div class="view">
                    <div class="name">{{item.name}}</div>
                    <div class="artist">{{item.ar[0].name}}</div>
                </div>
                <div>
                    <i></i>
                </div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import api from '../../api/index'
export default {
  data () {
    return {
      songList: [],
      nowSong: {}
    }
  },
  methods: {
    _getSongList (id) {
      api.getSongList(id)
        .then((res) => {
          if (res.status === 200 && res.statusText === 'OK') {
            this.songList = res.data.playlist
          }
        })
    },
    playSong (id) {
      console.log(id)
      api.getNowSong(id)
        .then((res) => {
          if (res.status === 200 && res.statusText === 'OK') {
            this.nowSong = res.data.data[0]
            console.log(this.songList.tracks)
            this.$store.commit('SET_NOW_SONG', this.nowSong)
            this.$store.commit('SET_PLAY_LIST', this.songList.tracks)
            this.$store.commit('SET_PLAY_STATE', true)
          }
        })
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  created () {
    console.log(this.$route.params.id)
    console.log(this.$store.state.listId)
    this._getSongList(this.$route.params.id || this.$store.state.listId)
  }
}
</script>

<style lang="less" scoped>
@import url('../../assets/icon/player/player-icon.css');
.song-container{
    background-color: rgb(77, 77, 77);
    overflow: hidden;
    .list-head{
        display: flex;
        color: #fff;
        width: 100%;
        padding-top: 1rem;
        i{
            font-size: 1rem;
            padding-left: 0.2rem;
        }
        .head-title{
            font-size: 1rem;
            margin: 0 auto;
        }
    }
    .list-middle{
       .middle-view{
           display: flex;
           padding: 1rem 1rem;
           .middle-img{
               width: 30vw;
               height: 30vw;
               margin-left: 1rem;
               border-radius: 0.5rem;
           }
           .middle-a{
               width: 40vw;
               display: flex;
               flex-direction: column;
               justify-content: space-between;
               color: #fff;
               padding:0  1rem;
               text-align: left;
               overflow: hidden;
               white-space:nowrap;
               text-overflow:ellipsis;
               .middle-user{
                   display:flex;
                  flex-direction:row;
                  align-items:center;
                   .user-img{
                       width: 5vw;
                       height: 5vw;
                       border-radius: 50%
                   }
                   span{
                       margin-left: 0.5rem;
                       font-size: 0.8rem;
                       color: gray;
                   }
               }
           }
           .middle-text{
               font-size: 0.7rem;
               color: gray;
           }
       }
       .middle-menu{
            padding: 0.5rem 3rem;
            color: #fff;
           ul{
               display: flex;
               justify-content: space-between;
               li{
                   i{
                       font-size: 1.3rem;
                   }
               }
           }
       }
    }
    .list-foot{
        background-color: #fff;
        border-top-left-radius: 2rem;
        border-top-right-radius: 2rem;
        .foot-menu{
            display: flex;
            justify-content:space-between;
            .foot-all{
                padding: 1rem 1rem;
                i{
                    font-size: 1rem
                }
            }
            .menu-insert{
                //width: 1rem;
                color: #fff;
                //height: 2rem;
                padding: 0.3rem 1.4rem;
                line-height: 2rem;
                background-color:#dd001b;
                border-radius: 2rem;
                margin-top: 0.4rem;
                font-size: 0.9rem;
            }
        }
        .song-list{
            li{
                display: flex;
                line-height: 1.5rem;
                .index{
                    line-height: 1.5rem;
                    font-weight: bold;
                    display: flex;
                    flex-direction: column;
                    align-self: center;
                    padding: 0 1rem;
                }
                .view{
                    display: flex;
                    flex-direction: column;
                    text-align: left;
                    .name{
                        font-weight: bold;
                    }
                    .artist{
                        font-size: 0.8rem;
                    }
                }
            }
        }
    }
}
</style>

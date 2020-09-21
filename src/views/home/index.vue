<template>
<div class="home-container">
  <div v-show="isLogin" class="home-all">
      <div class="home-user">
          <div class="user-views">
              <img class="user-avator" :src='userInfo.profile.avatarUrl'>
              <div class="user-name">
                 <div class="name">{{userInfo.profile.nickname}}</div>
                 <div class="level">LV{{userInfo.level}}</div>
              </div>
          </div>
          <div>
              <i></i>
          </div>
      </div>
      <div class="home-menu">
        <ul>
          <li v-for="(item,index) in homeIcon" :key="index">
              <i :class="item.icon"></i>
              <div>{{item.text}}</div>
          </li>
        </ul>
      </div>
      <div class="home-like">
        <div class="list" @click="goSongList(loveMudic.id)">
          <img class="list-img" :src='loveMudic.coverImgUrl'>
                <div class="list-text">
                  <div class="name">{{loveMudic.name}}</div>
                  <div class="num">{{loveMudic.trackCount}}首</div>
                </div>
        </div>
      </div>
      <div class="home-list">
        <van-tabs sticky swipeable animated background='#F5F5F5'>
          <van-tab title="创建歌单">
            <div class="list-container">
              <div class="list" v-for="(item,index) in userPlayList" :key='index' @click="goSongList(item.id)">
                <img class="list-img" :src='item.coverImgUrl'>
                <div class="list-text">
                  <div class="name">{{item.name}}</div>
                  <div class="num">{{item.trackCount}}首</div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="收藏歌单">
            <div class="list-container">
              <div class="list" v-for="(item,index) in collectPlayList" :key='index' @click="goSongList(item.id)">
                <img class="list-img" :src='item.coverImgUrl'>
                <div class="list-text">
                  <div class="name">{{item.name}}</div>
                  <div class="num">{{item.trackCount}}首</div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
  </div>
  <div v-show="!isLogin" class="login">
      <van-button color='#dd001b' block round to="/login">跳转登录</van-button>
  </div>
</div>
</template>

<script>
import api from '../../api/index'
import { homeIcon } from '../../common/icon'
// import hex_md5 from '../../common/md5.js'
export default {
  data () {
    return {
      isLogin: false,
      uid: '',
      userInfo: {},
      loveMudic: {},
      userPlayList: [],
      collectPlayList: [],
      homeIcon
    }
  },
  methods: {
    _phoneLogin (data) {
      api.phoneLogin(data)
        .then((res) => {
          console.log(res)
          this.jugdeCookie()
        })
    },
    jugdeCookie () {
      const cookie = document.cookie
      console.log(cookie)
    },
    _loginStatus () {
      api.loginStatus()
        .then((res) => {
          if (res.data.code === 200) {
            this.isLogin = true
            this.uid = res.data.profile.userId
            api.userInfo(this.uid)
              .then((res) => {
                if (res.status === 200 && res.statusText === 'OK') {
                  this.userInfo = res.data
                }
              })
            api.userPlayList(this.uid)
              .then((res) => {
                if (res.status === 200 && res.statusText === 'OK') {
                  this.loveMudic = res.data.playlist[0]
                  this.userPlayList = res.data.playlist.filter((item) => item.subscribed === false)
                  this.userPlayList.shift()
                  this.collectPlayList = res.data.playlist.filter((item) => item.subscribed === true)
                }
              })
          }
        })
    },
    goSongList (id) {
      this.$nextTick(() => {
        this.$router.push({
          path: `/songList/${id}`
        })
      })
    }
  },
  created () {
    console.log(this.homeIcon)
    this._loginStatus()
    // this._phoneLogin(this.login)
  }
}
</script>

<style lang="less" scoped>
@import url('../../assets/icon/home/home-icon.css');
@import url('../../assets/style/global.less');

.home-container{
  background-color: #F5F5F5;
  .home-all{
    padding-top: 4rem;
    .home-user{
      display: flex;
      justify-content: space-between;
      .user-views{
        display: flex;
        padding: 0 2rem;
        .user-avator{
          width: 15vw;
          height: 15vw;
          border-radius: 50%;
        }
        .user-name{
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 0.5rem;
          .name{
            font-size: 1.2rem;
            font-weight: bold;
            padding: 0.5rem 0;
          }
          .level{
            width: 2rem;
            height: 1rem;
            line-height: 1rem;
            background-color: #fff;
            border-radius: 0.5rem;

          }
        }
      }
    }
    .home-menu{
      margin: 1rem;
      background: #fff;
      border-radius: 1rem;
      ul{
        display: flex;
        flex-wrap: wrap;
        li{
          padding: 1rem;
          width: 21vw;
          i{
            font-size: 1.5rem;
            color: @bgcolor;
          }
          div{
            padding: 0.5rem 0;
            font-size: 0.8rem;
            font-weight: bold;
          }
        }
      }
    }
    .home-like{
      margin: 1rem;
      background: #fff;
      border-radius: 1rem;
      .list{
        display: flex;
        padding: 1rem 1rem;
        .list-img{
            width: 17vw;
            height: 17vw;
            border-radius: 0.5rem;
          }
        .list-text{
            padding-left: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: left;
            .name{
              font-size: 1rem;
              font-weight: bold;
              }
            }
          }
    }
    .home-list{
        .list-container{
          margin: 0.5rem 1rem;
          background: #fff;
          border-radius: 1rem;
          .list{
            display: flex;
            padding: 1rem 1rem;
            .list-img{
              width: 17vw;
              height: 17vw;
              border-radius: 0.5rem;
            }
            .list-text{
              padding-left: 1rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              text-align: left;
              .name{
                font-size: 1rem;
                font-weight: bold;
              }
            }
        }
      }
    }
  }
  .login{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
  }
}
</style>

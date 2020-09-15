<template>
<div>
  <div v-show="isLogin">
      <div>
        <div>
            <div>
                <img>
                <div>
                    昵称
                </div>
            </div>
            <div>
                <i></i>
            </div>
        </div>
      </div>
      <div>
        <ul v-for="(item,index) in homeIcon" :key="index">
          <li>
              <i :class="item.icon"></i>
              <div>{{item.text}}</div>
          </li>
        </ul>
      </div>
      <div>我喜欢的音乐</div>
      <div>我的歌单</div>
  </div>
  <div v-show="!isLogin">
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
      userPlayList: {},
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
                  this.userPlayList = res.data
                }
              })
          }
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
</style>

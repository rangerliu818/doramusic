<template>
  <div class="banner-container">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for='(item,index) in bannerList' :key='index'>
        <img class="banner-img" :src="item.pic">
        <span class="tltle" :style="{background:item.titleColor}">{{item.typeTiltle}}</span>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import api from '../../../api/'
// import axios from 'axios'

export default {
  data () {
    return {
      bannerList: []
    }
  },
  methods: {
    _getBannerInfo () {
      api.getBannerInfo()
      // axios.get('http://localhost:3000/banner?type=1')
        .then(this.getBanner)
    },
    getBanner (res) {
      if (res.status === 200 && res.statusText === 'OK') {
        this.bannerList = res.data.banners
      }
    }
  },
  created () {
    this._getBannerInfo()
    console.dir(this.bannerList)
  }

}
</script>

<style lang="less" scoped>
@import url('../../../assets/style/global.less');

  .banner-container{
    overflow: hidden;
    padding: 0.2rem;
    width: 100%;
    height: 0;
    padding-bottom: 40%;
    .banner-img{
      width: 100%;
      height: 100%;
      border-radius: @imgBorderRadius;
    }
    .tltle{
      position: absolute;
      right: 0;
      bottom: 0;
      color: #fff;
      font-size: smaller;
      padding: 3px 6px;
      opacity: 0.8;
      border-top-left-radius: @imgBorderRadius;
    }
  }
</style>

<template>
  <div class="list-container">
      <div class="title">
          <div class="title1">推荐歌单</div>
          <div class="title2"><router-link to="/musicList">歌单广场</router-link></div>
      </div>
      <div class="music-list">
          <div class="list-item" v-for="(item,index) in recommondList" :key='index' @click="selectList(item)">
              <span class="item-count">
                <i>{{Math.floor(item.playCount / 10000) }}万</i>
              </span>
              <div class="item-img" >
                  <img class="img" :src='item.picUrl'>
              </div>
              <div class="item-text">{{item.name}}</div>
          </div>
      </div>
  </div>
</template>

<script>
import api from '../../../api/'
export default {
  data () {
    return {
      recommondList: []
    }
  },
  methods: {
    _getRecomnondList () {
      api.getRecommondList()
        .then((res) => {
          if (res.status === 200 && res.statusText === 'OK') {
            this.recommondList = res.data.result
          }
        })
    },
    selectList (item) {
      this.$store.commit('SET_LIST_ID', item.id)
      this.$nextTick(() => {
        this.$router.push({
          path: `/songList/${item.id}`
        })
      })
      // console.log(item)
      // this.setMuiscList(item)
    }
  },
  created () {
    this._getRecomnondList()
  }

}
</script>

<style lang="less" scoped>
@import url('../../../assets/style/global.less');

  .list-container {
    margin: 0 auto;
    margin-top: 1rem;
    width: 95%;
    .title {
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
    .music-list {
      padding-top: 0.7rem;
      display: flex;
      flex-wrap: wrap;
      .list-item{
        width: 33%;
        position: relative;
        .item-count{
          position: absolute;
          right: 0.8rem;
          top: 0.2rem;
          font-size: 0.5rem;
          color: white;
          font-weight :bold;
        }
        .item-img {
          .img{
              width: 29vw;
              border-radius: 0.3rem;
          }
        }
      }
      .item-text{
          font-size: 0.7rem;
          text-align: left;
          font-weight: 550;
          overflow: hidden;
      }
    }
  }
</style>

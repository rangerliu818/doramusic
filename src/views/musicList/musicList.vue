<template>
  <div>
      <div>
          <i></i>
          <div>歌单广场</div>
      </div>
      <nav>
          <van-tabs sticky swipeable animated @change="_getMusicList">
            <van-tab v-for="(item,index) in listType" :title='item.name ' :key="index">
                <div class="music-list">
                    <div class="list-item" v-for="(item,index) in musicList" :key='index' @click="selectList(item)">
                        <span class="item-count">
                        <i>{{Math.floor(item.playCount / 10000) }}万</i>
                        </span>
                        <div class="item-img" >
                            <img class="img" :src='item.coverImgUrl'>
                        </div>
                        <div class="item-text">{{item.name}}</div>
                    </div>
                </div>
            </van-tab>
          </van-tabs>
      </nav>
      <div></div>
  </div>
</template>

<script>
import api from '../../api'
export default {
  data () {
    return {
      listType: [],
      musicList: []
    }
  },
  methods: {
    _getListType () {
      api.getListType()
        .then((res) => {
          if (res.status === 200 && res.statusText === 'OK') {
            this.listType = res.data.tags
            this._getMusicList(0, res.data.tags[0].name)
          }
        })
    },
    _getMusicList (index, title) {
      api.getMusicList(title)
        .then((res) => {
          if (res.status === 200 && res.statusText === 'OK') {
            this.musicList = res.data.playlists
          }
        })
      console.log(title)
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
    this._getListType()
  }
}
</script>

<style lang="less" scoped>
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

</style>

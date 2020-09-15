<template>
  <div class="radio-container">
    <div class="radio-title">
          <div class="title1">柔情入耳 温暖了时光</div>
          <div class="title2">查看更多</div>
    </div>
    <div>
        <ul class="radio-name">
            <li class="radio-list" v-for="(item,index) in radioList" :key="index">
              <img class="radio-img" :src="item.picUrl">
              <div class="radio-text">
                <div class="text-title">{{item.name}}</div>
                <div class="text-copywriter">{{item.copywriter}}</div>
              </div>
              </li>
          </ul>
    </div>
  </div>
</template>

<script>
import api from '../../../api'
export default {
  data () {
    return {
      radioList: []
    }
  },
  methods: {
    _getNewRadio () {
      api.getNewRadio()
        .then((res) => {
          if (res.status === 200 && res.statusText === 'OK') {
            this.radioList = res.data.result
          }
        })
    }
  },
  created () {
    this._getNewRadio()
  }

}
</script>

<style lang="less" scoped>
@import url('../../../assets/style/global.less');

  .radio-container {
    margin: 0 auto;
    margin-top: 1rem;
    width: 95%;
    .radio-title {
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
    .radio-name {
      padding-top: 0.7rem;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      overflow: scroll;
      .radio-list {
        width: 33%;
        position: relative;
        margin-right: 0.5rem;
        .radio-img {
          width: 27vw;
          border-radius: 0.3rem;
        }
      }
      .radio-text{
        .text-title{
          font-size: 0.7rem;
          text-align: left;
          font-weight: 550;
          overflow: hidden;
          white-space:nowrap;
          text-overflow:ellipsis;
        }
        .text-copywriter{
          font-size: 0.5rem;
          color: #737373;
          text-align: left;
          overflow: hidden;
          white-space:nowrap;
          text-overflow:ellipsis;
        }
      }
    }
  }
</style>>

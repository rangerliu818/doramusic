<template>
  <div class="nav-container">
      <div class="nav-icon" v-for="(item,index) in recommendIcon" :key='index'>
          <router-link replace :to='item.link'>
            <div class="icon-img">
              <i :class="item.icon"></i>
          </div>
          <div class="icon-text">{{item.text}}</div>
          </router-link>
      </div>
  </div>
</template>

<script>
import { recommendIcon } from '../../../common/icon'
export default {
  data () {
    return {
      recommendIcon
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../../assets/style/global.less');
@import '../../../assets/icon/recommend/recommend-icon.css';
 .nav-container{
    margin: 0 auto;
    margin-top: 1rem;
    width: 95%;
    display: flex;
    justify-content: space-between;
    .nav-icon{
        width: 20vw;
        .icon-img{
            width: 12vw;
            height: 12vw;
            background-color: @bgcolor;
            margin: 0 auto;
            border-radius: 50%;
            i{
                color:white;
                display: block;
                font-size: 7vw;
                line-height: 12vw;
            }
        }
        .icon-text{
            font-size: 0.8rem;
            font-weight: bold;
            padding-top: 0.4rem;
        }
    }
 }
</style>

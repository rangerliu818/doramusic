<template>
  <nav class="nav-container">
      <nav class="nav-menu">
          <ul class="menu-list">
              <li v-for="(item,index) in navRouter" :key="index" v-on:click="addClass(index)"
 v-bind:class="{ bgColors:index==current}">
                    <router-link replace :to="item.link">
                        <i :class="item.icon"></i>
                        <div>{{item.text}}</div>
                     </router-link>
              </li>
          </ul>
      </nav>
  </nav>
</template>

<script>
import { navRouter } from '../../common/icon'
export default {
  data () {
    return {
      navRouter,
      current: 0
    }
  },
  methods: {
    addClass (index) {
      this.current = index
      console.log(index)
      console.log(this.current)
    }
  },
  created () {
    console.log(this.navRouter)
  }
}
</script>

<style lang="less" scoped>
@import url('../../assets/style/global.less');
.nav-container{
    height: 5rem;
    .nav-menu{
        display: flex;
        width: 100vw;
        position: fixed;
        bottom: 0;
        z-index: 350;
        background-color: #fff;
        .menu-list{
                width: 100%;
                display: flex;
                padding: 1rem;
                justify-content: space-between;
                li{
                    color: red;
                    i{
                        font-size: 1.5rem;
                    }
                    div{
                        font-weight: bold
                    }
                }
        }
    }
}
.bgColors{
    i{
      color: @bgcolor
    }
    div{
      color: @bgcolor
    }
}
</style>

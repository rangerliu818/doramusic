<template>
  <div id="app">
    <Player style="z-index:400"></Player>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/recommend">About</router-link>
    </div> -->
    <router-view/>
    <Nav></Nav>
  </div>
</template>

<script>
import Player from './views/player/player'
import Nav from './views/nav/nav'
import './assets/style/reset.css'
export default {
  data () {
    return {
    }
  },
  components: {
    Player,
    Nav
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

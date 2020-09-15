<template>
  <div style='width:100vw;overflow:hidden'>
      <FontNav></FontNav>
      <Banner></Banner>
      <Menu></Menu>
      <RecommendList></RecommendList>
      <NewSong></NewSong>
      <NewRadio></NewRadio>
  </div>
</template>

<script>
import Banner from './components/banner'
import RecommendList from './components/recommendList'
import NewSong from './components/newsSong'
import NewRadio from './components/newRadio'
import Menu from './components/menu'
import FontNav from '../nav/fontNav'
export default {
  components: {
    Banner,
    RecommendList,
    NewSong,
    NewRadio,
    Menu,
    FontNav
  }
}
</script>

<style lang="scss" scoped>

</style>

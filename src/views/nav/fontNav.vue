<template>
    <div class="nav">
        <div class="nav-container">
            <div class="more">
                <i class="iconfont icon-gengduo"></i>
            </div>
            <div class="search-button">
          <div class="search-bar">
              <i class="iconfont icon-iconfontsousuo">搜索</i>
          </div>
      </div>
      <div class="null"></div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import url('../../assets/icon/nav/nav-icon.css');
.nav{
    height: 3.5rem;
    // background-color: #fff;
}
.nav-container{
    width: 100%;
    position: fixed;
    top:0;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    padding-bottom: 0.5rem;
    z-index: 301;
    overflow: hidden;
    background-color: #fff;
    .more{
        line-height: 2rem;
    }
    .search-button{
        margin: 0 auto;
        .search-bar{
            width: 15rem;
            height: 2rem;
            background-color:#f6f5ec;
            line-height: 2rem;
            border-radius: 2rem;
            i{
                color: #d3d7d4;
            }
        }
    }
    .null{
      width: 3rem;
    }
}
</style>
